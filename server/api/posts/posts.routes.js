const { verifyJWT } = require('../../middleware/jwt')
const {
  createPost,
  getPosts,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
} = require('./posts.controllers')

module.exports = Router => {
  const router = new Router()

  router.post('/create', verifyJWT, createPost)
  router.post('/recent', verifyJWT, getPosts)
  router.post('/like', verifyJWT, likePost)
  router.post('/unlike', verifyJWT, unlikePost)
  router.post('/save', verifyJWT, savePost)
  router.post('/unsave', verifyJWT, unsavePost)

  return { prefix: '/posts', router }
}
