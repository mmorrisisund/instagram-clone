const { Schema, model } = require('mongoose')
const { AVATAR_URL } = require('../constants/user')

const requiredString = { type: String, required: true }

const userSchema = new Schema({
  username: { ...requiredString, unique: true },
  password: { type: Schema.Types.ObjectId, required: true },
  fullName: requiredString,
  email: { ...requiredString, unique: true },
  avatar: { type: String, default: AVATAR_URL, required: true },
  followers: [Schema.Types.ObjectId],
  following: [Schema.Types.ObjectId],
  dateCreated: { type: Date, default: Date.now },
  posts: [Schema.Types.ObjectId],
  postsLiked: [Schema.Types.ObjectId],
  commentsLiked: [Schema.Types.ObjectId],
  postsSaved: [Schema.Types.ObjectId],
})

module.exports = model('User', userSchema)
