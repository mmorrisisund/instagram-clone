import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../services/db'

import Suggestion from './Suggestion'

const Suggestions = ({ userIds = [] }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const userPromises = userIds.map(getUser)
      const userData = await Promise.all(userPromises)

      setUsers(
        userData.reduce((users, user) => (user ? [...users, user] : users), [])
      )
    }
    fetchUsers()
  }, [userIds])

  const handleOnFollow = id => setUsers(users.filter(user => user._id !== id))

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-semibold text-gray-400 text-sm capitalize'>
          suggestions for you
        </h3>
        <Link to='/'>
          <span className='font-semibold text-gray-800 text-xs capitalize'>
            see all
          </span>
        </Link>
      </div>

      <div>
        {users.map(user => (
          <Suggestion key={user._id} {...user} onFollow={handleOnFollow} />
        ))}
      </div>
    </div>
  )
}

export default Suggestions
