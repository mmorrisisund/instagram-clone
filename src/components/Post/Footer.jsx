import { useEffect, useState } from 'react'

import IconBar from './IconBar'
import Comments from './Comments'
import AddComment from './AddComment'
import { usePost } from '../../context/post'
import { getComment } from '../../services/db'

const Footer = () => {
  const { post } = usePost()
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getComments = async () => {
      if (post) {
        const promises = []
        promises.push(getComment(post.comments[0]))
        promises.push(getComment(post.comments[1]))

        const comments = await Promise.all(promises)
        setComments(comments)
      }
    }
    getComments()
  }, [post])

  return (
    <footer className='flex flex-col bg-white pt-2'>
      <IconBar />
      <span className='font-medium text-gray-800 px-4'>{post.likes} likes</span>
      <Comments comments={comments} />
      <span className='text-xs text-gray-400 px-4 my-2'>{post.createdAt}</span>
      <AddComment postId={post?._id} />
    </footer>
  )
}
export default Footer
