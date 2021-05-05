import { createContext, useContext } from 'react'

const PostContext = createContext()

export const PostProvider = PostContext.Provider

export const usePost = () => {
  return useContext(PostContext)
}
