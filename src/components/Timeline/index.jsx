import StoryBox from './StoryBox'
import Post from '../Post'
import useRecentPosts from '../../hooks/useRecentPosts'

const Timeline = () => {
  const { isError, isLoading, data: posts, error } = useRecentPosts(20, 1)

  if (isError) {
    console.log(error)
  }

  return (
    <div>
      <StoryBox />
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <div className='mt-8'>
          {posts.map(post => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Timeline
