const jwt = require('jsonwebtoken')
const { getErrorMessage } = require('../utils/auth')

exports.verifyJWT = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res.json({
      status: 'fail',
      data: { message: 'Authorization token required.' },
    })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    })
    req.state = { userId: payload.id }
    next()
  } catch (error) {
    res.json({
      status: 'fail',
      data: { message: getErrorMessage(error) },
    })
  }
}
