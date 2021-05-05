const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const passwordSchema = new Schema({
  password: String,
})

passwordSchema.pre('save', async function (next) {
  if (this.isModified() || this.isNew) {
    try {
      const hashed = await bcrypt.hash(this.password, 10)
      this.password = hashed
      next()
    } catch (error) {
      next(error)
    }
  }
  next()
})

module.exports = model('Password', passwordSchema)
