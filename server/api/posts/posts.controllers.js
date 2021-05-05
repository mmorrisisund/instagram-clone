const Post = require('../../models/post')
const User = require('../../models/user')
const catchAsync = require('../../utils/catchAsync')

exports.createPost = catchAsync(async (req, res) => {
  const { image, caption, location, tags, altText } = req.body
  const { userId } = req.state

  const post = new Post({
    image,
    caption,
    location,
    tags,
    altText,
    author: userId,
  })
  const user = await User.findById(userId)

  if (!user) {
    return res.json({ status: 'fail', data: { message: 'User not found.' } })
  }
  user.posts.push(post.id)
  await post.save()
  await user.save()

  return res.json({ status: 'success', data: { post } })
})

exports.getPost = catchAsync(async (req, res) => {})

exports.getPosts = catchAsync(async (req, res) => {
  const { page, limit } = req.body
  const maxLimit = Math.min(limit, 20)

  const posts = await Post.find()
    .sort({ $natural: -1 })
    .limit(maxLimit)
    .skip((page - 1) * maxLimit)
    .populate('author')
    .populate('comments')
    .exec()

  res.json({ status: 'success', data: { posts } })
})

exports.likePost = catchAsync(async (req, res) => {
  const { postId } = req.body
  const { userId } = req.state
  const post = await Post.findById(postId)
  const user = await User.findById(userId)

  if (user.postsLiked.includes(postId)) {
    return res.json({
      status: 'fail',
      data: { message: 'Post already liked.' },
    })
  }

  post.likes = post.likes + 1
  user.postsLiked.push(postId)
  await post.save()
  await user.save()

  res.json({ status: 'success', data: null })
})

exports.unlikePost = catchAsync(async (req, res) => {
  const { postId } = req.body
  const { userId } = req.state
  const post = await Post.findById(postId)
  const user = await User.findById(userId)

  if (!user.postsLiked.includes(postId)) {
    return res.json({ status: 'fail', data: { message: 'Post not liked.' } })
  }

  post.likes = post.likes - 1
  user.postsLiked = user.postsLiked.filter(post => !post.equals(postId))
  await post.save()
  await user.save()

  res.json({ status: 'success', data: null })
})

exports.savePost = catchAsync(async (req, res) => {
  const { postId } = req.body
  const { userId } = req.state

  const user = await User.findById(userId)

  user.postsSaved.push(postId)
  await user.save()

  res.json({ status: 'success', data: null })
})

exports.unsavePost = catchAsync(async (req, res) => {
  const { postId } = req.body
  const { userId } = req.state

  const user = await User.findById(userId)

  user.postsSaved = user.postsSaved.filter(id => !id.equals(postId))
  await user.save()

  res.json({ status: 'success', data: null })
})
