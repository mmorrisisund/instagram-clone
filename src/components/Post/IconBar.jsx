import { useEffect, useState } from 'react'

import {
  HeartIconOutline,
  HeartIconFilled,
  InboxIconOutline,
  SpeechBubbleIconOutline,
  RibbonIconOutline,
  RibbonIconFilled,
} from '../Icons'
import { useAuth } from '../../context/auth'
import { likePost, savePost, unlikePost, unsavePost } from '../../services/db'
import { usePost } from '../../context/post'

const IconBar = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { user, fetching } = useAuth()
  const { post, setPost } = usePost()

  useEffect(() => {
    if (!fetching) {
      setIsLiked(user.postsLiked.includes(post._id))
      setIsSaved(user.postsSaved.includes(post._id))
    }
  }, [fetching, post._id, setPost, user])

  const handleClickLike = async () => {
    if (isLiked) {
      const result = await unlikePost(post._id)
      if (result) {
        setIsLiked(false)
        setPost(post => ({ ...post, likes: post.likes - 1 }))
      }
    } else {
      const result = await likePost(post._id)
      if (result) {
        setIsLiked(result)
        setPost(post => ({ ...post, likes: post.likes + 1 }))
      }
    }
  }

  const handleClickSave = async () => {
    if (isSaved) {
      const result = await unsavePost(post._id)
      if (result) {
        setIsSaved(false)
      }
    } else {
      const result = await savePost(post._id)
      if (result) {
        setIsSaved(result)
      }
    }
  }

  return (
    <section className='flex justify-between items-center px-4 mt-1'>
      <div className='flex'>
        <button className='p-2 focus:outline-none' onClick={handleClickLike}>
          {isLiked ? (
            <HeartIconFilled className='h-6 w-6' />
          ) : (
            <HeartIconOutline className='h-6 w-6' />
          )}
        </button>
        <button className='p-2'>
          <SpeechBubbleIconOutline className='h-6 w-6' />
        </button>
        <button className='p-2'>
          <InboxIconOutline className='h-6 w-6' />
        </button>
      </div>
      <div className='flex'>
        <button className='p-2 focus:outline-none' onClick={handleClickSave}>
          {isSaved ? (
            <RibbonIconFilled className='h-6 w-6' />
          ) : (
            <RibbonIconOutline className='h-6 w-6' />
          )}
        </button>
      </div>
    </section>
  )
}

export default IconBar
