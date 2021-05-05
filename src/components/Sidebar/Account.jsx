import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

import Avatar from '../Avatar'
import { useAuth } from '../../context/auth.js'

const Account = () => {
  const { user } = useAuth()

  return (
    <div className='flex items-center mt-5'>
      {user ? (
        <Avatar className='mr-4' size='large' />
      ) : (
        <Skeleton circle={true} height={56} width={56} />
      )}

      <div className='flex flex-col flex-grow'>
        {user ? (
          <>
            <Link to='/'>
              <span className='font-semibold text-gray-800 text-sm'>
                {user.username}
              </span>
            </Link>
            <span className='text-gray-500 text-sm'>{user.fullName}</span>
          </>
        ) : (
          <Skeleton count={2} />
        )}
      </div>
      {user && (
        <button className='text-blue-500 text-xs font-semibold'>Switch</button>
      )}
    </div>
  )
}

export default Account
