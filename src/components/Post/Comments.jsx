import { usePost } from '../../context/post'
import { HeartIconOutline } from '../Icons'

const Comments = ({ comments }) => {
  const { post } = usePost()

  return (
    <section className='px-4 mt-1'>
      <span className='text-sm text-gray-400'>
        View all {post.comments.length} comments
      </span>
      {comments[0] && <Comment {...comments[0]} />}
      {comments[1] && <Comment {...comments[1]} />}
    </section>
  )
}

export default Comments

const Comment = ({ author, content }) => (
  <div className='flex justify-between'>
    <div className='flex'>
      <span className='font-medium text-small text-gray-900 mr-1'>
        {author.username}
      </span>
      <p className='text-gray-800'>{content}</p>
    </div>
    <HeartIconOutline className='h-3 w-3' />
  </div>
)
