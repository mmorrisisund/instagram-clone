import { useEffect, useState } from 'react'

import { useAuth } from '../../context/auth'
import { getSuggestions } from '../../services/db'
import Account from './Account'
import Suggestions from './Suggestions'

const Sidebar = () => {
  const [users, setUsers] = useState([])
  const { user, fetching } = useAuth()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!fetching) {
        const suggestions = await getSuggestions(user.username)

        setUsers(suggestions.map(user => user._id))
      }
    }
    fetchSuggestions()
  }, [fetching, user.username])

  return (
    <div className='space-y-4 px-4'>
      <Account />
      <Suggestions userIds={users} />
    </div>
  )
}

export default Sidebar
