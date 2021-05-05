const jwt = require('jsonwebtoken')

exports.createToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '90d',
  })

exports.getErrorMessage = error => {
  switch (error.name) {
    case 'TokenExpiredError':
      return 'Authorization token is expired.'
    case 'JsonWebTokenError':
      return 'Authorization token is invalid.'
    default:
      return error.message
  }
}
