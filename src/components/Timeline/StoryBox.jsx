import { useState, useEffect } from 'react'

import { getFollowing } from '../../services/db'

import { useAuth } from '../../context/auth'
import Avatar from '../AvatarWithRing'

const StoryBox = () => {
  const [followers, setFollowers] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchFollowers = async () => {
      const users = await getFollowing(user._id)
      setFollowers(users)
    }
    fetchFollowers()
  }, [user._id])

  return (
    <div className='bg-white border rounded-sm'>
      <div className='flex justify-start items-center py-4 px-4 space-x-4'>
        {followers.map(user => (
          <div key={user._id} className='flex flex-col items-center'>
            <Avatar image={user.avatar} size='large' />
            <p className='text-xs text-gray-600 mt-1'>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StoryBox
