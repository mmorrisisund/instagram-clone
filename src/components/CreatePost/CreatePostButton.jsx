import { useHistory } from 'react-router'
import { AddPostOutline } from '../Icons'

const CreatePostButton = () => {
  const history = useHistory()

  const handleFiles = e => {
    const [file] = e.target.files
    history.push('/create', { file })
  }

  return (
    <label>
      <input type='file' onChange={handleFiles} hidden />
      <AddPostOutline className='w-6 h-6' />
    </label>
  )
}

export default CreatePostButton
