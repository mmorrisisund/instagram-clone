const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2

const User = require('../../models/user')
const Password = require('../../models/password')
const { createToken } = require('../../utils/auth')
const catchAsync = require('../../utils/catchAsync')

exports.signUp = catchAsync(async function (req, res) {
  const userProps = { ...req.body } // TODO: add validation

  try {
    const password = new Password({ password: userProps.password })
    const user = new User({ ...userProps, password: password.id })

    const pwPromise = password.save()
    const userPromise = user.save()
    await Promise.all([pwPromise, userPromise])

    const token = createToken({ id: user.id })
    res.cookie = ('token', token, { httpOnly: true }) // TODO: add secure: true for https

    return res.json({ status: 'success', data: { user } })
  } catch (error) {
    return res.json({ status: 'error', message: error.message })
  }
})

exports.login = catchAsync(async function (req, res) {
  const { username, password } = req.body
  if (!username) {
    return res.json({
      status: 'fail',
      data: { message: 'Username must be supplied.' },
    })
  }

  const userDoc = await User.findOne({
    $or: [{ username }, { email: username }],
  })
  if (!userDoc) {
    return res.json({
      status: 'fail',
      data: { message: 'Username not found.' },
    })
  }

  const passwordDoc = await Password.findById(userDoc?.password)
  const pwMatch = await bcrypt.compare(password, passwordDoc.password)
  if (pwMatch) {
    const token = createToken({ id: userDoc.id })
    res.cookie('token', token, { httpOnly: true }) // TODO: add secure: true for https

    return res.json({ status: 'success', data: { user: userDoc } })
  } else {
    return res.json({
      status: 'fail',
      data: { message: 'User credentials do not match.' },
    })
  }
})

exports.logout = catchAsync(async function (req, res) {
  res.clearCookie('token')
  res.send({ status: 'success' })
})

exports.getUser = catchAsync(async function (req, res) {
  const { userId } = req.state
  const user = await User.findById(userId)

  res.json({ status: 'success', data: { user } })
})

exports.getCloudinaryKey = function (req, res) {
  const { folder } = req.body
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    process.env.CLOUDINARY_API_SECRET
  )
  res.json({ status: 'success', data: { timestamp, signature } })
}
