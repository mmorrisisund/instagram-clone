import { usePost } from '../../context/post'
import AvatarWithRing from '../AvatarWithRing'

const Header = () => {
  const { post } = usePost()

  return (
    <header className='bg-white p-4 h-16'>
      <div className='flex items-center h-full'>
        <AvatarWithRing image={post.author.image} size='medium' />
        <div className='flex flex-col ml-4 justify-center'>
          <span className='text-sm text-gray-800 font-medium'>
            {post.author.username}
          </span>
          <span className='text-xs text-gray-400'>{post.location}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
