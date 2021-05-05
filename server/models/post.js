const { Schema, model } = require('mongoose')

const requiredString = { type: String, required: true }

const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  caption: requiredString,
  image: requiredString,
  location: String,
  tags: [String],
  altText: String,
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

module.exports = model('Post', postSchema)
