import { useForm } from 'react-hook-form'

import { SmileyIconOutline } from '../Icons'
import { createComment } from '../../services/db'

const AddComment = ({ onCommentAdded, postId }) => {
  const { register, handleSubmit, formState } = useForm({ mode: 'onChange' })

  const handleOnSubmit = async ({ content }) => {
    const comment = await createComment(content, postId)
    onCommentAdded?.(comment)
  }

  return (
    <section className='p-4 flex items-center border-t w-full'>
      <SmileyIconOutline className='h-6 w-6' />
      <form
        className='flex-grow flex ml-4'
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <textarea
          className='flex-grow resize-none h-5 text-sm outline-none'
          placeholder='Add a comment...'
          {...register('content', { required: true })}
        ></textarea>
        <button type='submit' disabled={!formState.isValid}>
          Post
        </button>
      </form>
    </section>
  )
}

export default AddComment
