require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

const createApiRoutes = require('./api')

const app = express()

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to mongo'))
  .catch(() => console.log('ruh roh, something went wrong with mongo'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

createApiRoutes(app)

module.exports = app
