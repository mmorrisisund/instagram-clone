import { useHistory, useLocation } from 'react-router'
import { useForm } from 'react-hook-form'

import useUploadFile from '../hooks/use-upload-file'
import { useAuth } from '../context/auth'
import Header from '../components/CreatePost/Header'
import Avatar from '../components/Avatar'
import { useEffect, useRef, useState } from 'react'
import { createPost, getSignature, uploadImage } from '../services/db'
import { POSTS_PATH } from '../constants/cloudinary'

const CreatePost = () => {
  const [signature, setSignature] = useState('')
  const [timestamp, setTimestamp] = useState('')
  const location = useLocation()
  const history = useHistory()
  const submitRef = useRef()
  const { user } = useAuth()
  const { register, handleSubmit } = useForm()

  const { file, isLoading } = useUploadFile(location.state.file)

  useEffect(() => {
    const fetchSignature = async () => {
      const result = await getSignature(POSTS_PATH)
      setSignature(result.signature)
      setTimestamp(result.timestamp)
    }
    fetchSignature()
  }, [])

  const handleOnShare = () => submitRef.current.click()

  const handleOnSubmit = async postData => {
    try {
      const url = await uploadImage(file, POSTS_PATH, timestamp, signature)
      await createPost({ ...postData, image: url })
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) return <p>loading image...</p>

  return (
    <main className='w-screen h-screen'>
      <Header onShare={handleOnShare} />
      <section className='bg-white border border-t-0 p-8'>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className='grid gap-2 grid-cols-3 grid-rows-2 sm:grid-rows-1'
        >
          <div className='row-start-2 col-span-3 sm:row-start-1 sm:col-span-2 space-y-8'>
            <div className='flex'>
              <Avatar size='large' image={user.avatar} />
              <textarea
                {...register('caption')}
                className='w-full h-14 ml-4 border py-1 px-2'
                placeholder='Write a caption...'
              ></textarea>
            </div>
            <div>
              <label>Location</label>
              <input
                type='text'
                {...register('location')}
                className='border w-full mt-2'
              />
            </div>
            <div>
              <label>Tag People</label>
              <input
                type='text'
                {...register('tags')}
                className='border w-full mt-2'
              />
            </div>
            <div>
              <label>Alt Text</label>
              <input
                type='text'
                {...register('altText')}
                className='border w-full my-2'
              />
              <p className='text-xs text-gray-400'>
                Alt text describes your photos for people with visual
                impairments. Alt text will be automatically created for your
                photos or you can choose to write your own.
              </p>
            </div>
            <input type='submit' hidden ref={submitRef} />
          </div>
          <div className='row-start-1 col-span-3 sm:col-span-1 flex items-center justify-center max-h-full'>
            <img
              className=''
              src={file}
              alt='upload preview'
              {...register('image')}
            />
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreatePost
