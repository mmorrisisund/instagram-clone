const { verifyJWT } = require('../../middleware/jwt')
const {
  signUp,
  login,
  logout,
  getUser,
  getCloudinaryKey,
} = require('./auth.controller')

module.exports = Router => {
  const router = new Router()

  router.post('/signup', signUp)
  router.post('/login', login)
  router.get('/logout', logout)
  router.get('/user', verifyJWT, getUser)
  router.post('/cloudinary', verifyJWT, getCloudinaryKey)

  return { prefix: '/auth', router }
}
