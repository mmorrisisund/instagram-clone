import { usePost } from '../../context/post'

const Image = () => {
  const { post } = usePost()

  return (
    <div className='w-full'>
      <img className='mx-auto' src={post.image} alt={post.altText ?? ''} />
    </div>
  )
}
export default Image
