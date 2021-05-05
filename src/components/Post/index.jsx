import { PostProvider } from '../../context/post'
import Header from './Header'
import Image from './Image'
import Footer from './Footer'
import { useState } from 'react'

const Post = ({ post }) => {
  const [postObj, setPostObj] = useState(post)

  return (
    <PostProvider value={{ post: postObj, setPost: setPostObj }}>
      <article className='flex flex-col border rounded mb-8'>
        <Header />
        <Image />
        <Footer />
      </article>
    </PostProvider>
  )
}

export default Post
