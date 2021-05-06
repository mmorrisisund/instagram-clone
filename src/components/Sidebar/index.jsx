import { useAuth } from '../../context/auth'
import useSuggestions from '../../hooks/useSuggestions'
import Account from './Account'
import Suggestions from './Suggestions'

const Sidebar = () => {
  const { user } = useAuth()
  const { data: users } = useSuggestions(user?.username)

  return (
    <div className='space-y-4 px-4'>
      <Account />
      <Suggestions users={users} />
    </div>
  )
}

export default Sidebar
