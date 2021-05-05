import { followUser } from '../../services/db'

import Avatar from '../Avatar'

const Suggestion = ({ username, _id }) => {
  return (
    <div className='flex items-center py-2 px-4'>
      <Avatar />

      <div className='flex flex-col items-start flex-grow ml-3'>
        <span className='text-sm font-semibold text-gray-800'>{username}</span>
        <span className='text-xs text-gray-400'>Suggested for you</span>
      </div>

      <button onClick={() => followUser(_id)}>
        <span className='text-xs font-semibold text-blue-500'>Follow</span>
      </button>
    </div>
  )
}

export default Suggestion
