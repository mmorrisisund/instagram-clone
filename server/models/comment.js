const { Schema, model } = require('mongoose')

const requiredString = { type: String, required: true }

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: requiredString,
  createdAt: { type: Date, default: Date.now },
  likes: Number,
  replies: [Schema.Types.ObjectId],
})

module.exports = model('Comment', commentSchema)
