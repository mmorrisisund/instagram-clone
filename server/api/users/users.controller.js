const catchAsync = require('../../utils/catchAsync')
const User = require('../../models/user')

exports.checkUser = catchAsync(async (req, res) => {
  const { email, username } = req.body

  try {
    const emailPromise = User.findOne({ email })
    const usernamePromise = User.findOne({ username })
    const [emailDoc, usernameDoc] = await Promise.all([
      emailPromise,
      usernamePromise,
    ])

    res.json({
      status: 'success',
      data: { email: !!emailDoc, username: !!usernameDoc },
    })
  } catch (error) {
    res.json({ status: 'error', message: error.message })
  }
})

exports.getSuggestions = catchAsync(async (req, res) => {
  const { username } = req.body
  const { userId } = req.state

  const user = await User.findById(userId)
  const users = await User.aggregate([
    { $sample: { size: 5 } },
    {
      $match: {
        $and: [
          { username: { $ne: username } },
          { _id: { $nin: user.following } },
        ],
      },
    },
    { $project: { username: 1, avatar: 1 } },
  ])

  return res.json({ status: 'success', data: { users } })
})

exports.getUser = catchAsync(async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    if (user) {
      res.json({ status: 'success', data: { user } })
    } else {
      res.json({ status: 'fail', data: { message: 'User not found.' } })
    }
  } catch (error) {
    res.json({ status: 'error', message: error.message })
  }
})

exports.followUser = catchAsync(async (req, res) => {
  const { userId } = req.state
  const { followerId } = req.body

  const user = await User.findById(userId)
  const follower = await User.findById(followerId)

  user.following.push(follower.id)
  follower.followers.push(user.id)

  await user.save()
  await follower.save()

  res.json({ status: 'success', data: null })
})

exports.unfollowUser = catchAsync(async (req, res) => {
  const { userId } = req.state
  const { followerId } = req.body

  const user = await User.findById(userId)
  const follower = await User.findById(followerId)

  user.following = user.following.filter(user => !user._id.equals(followerId))
  follower.followers = follower.followers.filter(
    user => !user._id.equals(userId)
  )

  await user.save()
  await follower.save()

  res.json({ status: 'success', data: null })
})

exports.getFollowers = catchAsync(async (req, res) => {
  const { id } = req.body

  const user = await User.findById(id)

  if (!user) {
    return res.json({ status: 'fail', data: { message: 'User not found.' } })
  }

  const promises = user.followers.map(id => User.findById(id))
  const followers = await Promise.all(promises)

  res.json({ status: 'success', data: { followers } })
})

exports.getFollowing = catchAsync(async (req, res) => {
  const { id } = req.body

  const user = await User.findById(id)

  if (!user) {
    return res.json({ status: 'fail', data: { message: 'User not found.' } })
  }

  const promises = user.following.map(id => User.findById(id))
  const following = await Promise.all(promises)

  res.json({ status: 'success', data: { following } })
})
