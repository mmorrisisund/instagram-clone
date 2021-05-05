const {
  checkUser,
  getSuggestions,
  getUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require('./users.controller')
const { verifyJWT } = require('../../middleware/jwt')

module.exports = Router => {
  const router = new Router()

  router.get('/:userId', verifyJWT, getUser)
  router.post('/checkuser', checkUser)
  router.post('/suggestions', verifyJWT, getSuggestions)
  router.post('/follow', verifyJWT, followUser)
  router.post('/unfollow', verifyJWT, unfollowUser)
  router.post('/followers', verifyJWT, getFollowers)
  router.post('/following', verifyJWT, getFollowing)

  return { prefix: '/users', router }
}
