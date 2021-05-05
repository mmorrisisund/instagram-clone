const Comment = require('../../models/comment')
const Post = require('../../models/post')
const catchAsync = require('../../utils/catchAsync')

exports.createComment = catchAsync(async (req, res) => {
  const { content, postId } = req.body
  const { userId } = req.state

  const comment = new Comment({ content, author: userId })
  const post = await Post.findById(postId)

  post.comments.push(comment._id)

  await comment.save()
  await post.save()

  res.json({ status: 'success', data: { content } })
})

exports.getComment = catchAsync(async (req, res) => {
  const { commentId } = req.body

  const comment = await Comment.findById(commentId).populate('author').exec()

  res.json({ status: 'success', data: { comment } })
})

exports.getComments = catchAsync(async (req, res) => {
  const { postId } = req.body

  const post = await Post.findById(postId)
  const commentPromises = post.comments.map(Comment.findById)
  const comments = await Promise.all(commentPromises)

  res.json({ status: 'success', data: { comments } })
})

exports.getReplies = catchAsync(async (req, res) => {
  const { commentId } = req.body

  const comment = await Comment.findById(commentId)
  const replyPromises = comment.replies.map(Comment.findById)
  const comments = Promise.all(replyPromises)

  res.json({ status: 'success', data: { comments } })
})
