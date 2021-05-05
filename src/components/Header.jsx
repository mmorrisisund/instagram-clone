import { Link, useRouteMatch } from 'react-router-dom'

import {
  ExploreIconFill,
  ExploreIconOutline,
  HeartIconOutline,
  HomeIconFill,
  HomeIconOutline,
  InboxIconFill,
  InboxIconOutline,
} from './Icons'
import Avatar from './Avatar'
import * as ROUTES from '../constants/routes'
import { useAuth } from '../context/auth'
import CreatePostButton from './CreatePost/CreatePostButton'

const Header = () => {
  const { path } = useRouteMatch()
  const { logout } = useAuth()

  return (
    <nav className='h-14 w-full px-5 bg-white border-b border-gray-200'>
      <div className='container mx-auto flex items-center justify-between h-full max-w-screen-md'>
        <div>
          <Link to='/'>
            <img src='/images/logo-small.png' alt='logo' />
          </Link>
        </div>

        <div>
          <ul className='flex space-x-6'>
            <li>
              <Link to={ROUTES.HOME}>
                {path === ROUTES.HOME ? (
                  <HomeIconFill className='w-6 h-6' />
                ) : (
                  <HomeIconOutline className='w-6 h-6' />
                )}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.INBOX}>
                {path === ROUTES.INBOX ? (
                  <InboxIconFill className='w-6 h-6' />
                ) : (
                  <InboxIconOutline className='w-6 h-6' />
                )}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.EXPLORE}>
                {path === ROUTES.EXPLORE ? (
                  <ExploreIconFill className='w-6 h-6' />
                ) : (
                  <ExploreIconOutline className='w-6 h-6' />
                )}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.ACTIVITY}>
                <HeartIconOutline className='w-6 h-6' />
              </Link>
            </li>
            <li>
              <CreatePostButton />
            </li>
            <li>
              <button onClick={() => logout()}>
                <Avatar size='small' />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
