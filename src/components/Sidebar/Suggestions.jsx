import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

import Suggestion from './Suggestion'

const Suggestions = ({ users = [] }) => {
  const queryClient = useQueryClient()

  const handleOnFollow = id => queryClient.invalidateQueries('suggestions')

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
