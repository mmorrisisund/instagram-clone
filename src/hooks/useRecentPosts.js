import { useQuery } from 'react-query'

const getRecentPosts = async (limit, page) => {
  const response = await fetch('/api/v1/posts/recent', {
    method: 'POST',
    body: JSON.stringify({ limit, page }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  if (result.status === 'error') {
    throw new Error(result.message)
  }
  if (result.status === 'fail') {
    throw new Error(result.data.message)
  }

  return result.data.posts
}

export default function useRecentPosts(limit, page) {
  return useQuery('recentPosts', () => getRecentPosts(limit, page))
}
