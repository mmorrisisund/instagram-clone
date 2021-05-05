import { useHistory } from 'react-router'
import { Close } from '../Icons'

const Header = ({ onShare = () => {} }) => {
  const history = useHistory()

  return (
    <header className='w-full h-11 px-4 border bg-white flex justify-between items-center'>
      <button onClick={() => history.goBack()}>
        <Close className='w-6 h-6' />
      </button>
      <span className='text-lg text-gray-800 font-medium'>New Post</span>
      <button onClick={onShare}>
        <span className='text-blue-400 font-medium'>Share</span>
      </button>
    </header>
  )
}

export default Header
