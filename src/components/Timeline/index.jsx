import { useEffect, useState } from 'react'

import { getRecentPosts } from '../../services/db'
import StoryBox from './StoryBox'
import Post from '../Post'

const Timeline = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getRecentPosts(20, 1)
      setPosts(posts)
    }
    fetchPosts()
  }, [])

  return (
    <div>
      <StoryBox />
      <div className='mt-8'>
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Timeline
