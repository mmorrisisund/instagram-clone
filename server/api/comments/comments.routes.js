const { verifyJWT } = require('../../middleware/jwt')
const {
  createComment,
  getComment,
  getComments,
  getReplies,
} = require('./comments.controllers')

module.exports = Router => {
  const router = new Router()

  router.post('/create', verifyJWT, createComment)
  router.post('/', verifyJWT, getComment)
  router.post('/all', verifyJWT, getComments)
  router.post('/replies', verifyJWT, getReplies)

  return { prefix: '/comments', router }
}
