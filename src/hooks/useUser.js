import { useQuery, useQueryClient } from 'react-query'

const fetchUser = async () => {
  const response = await fetch('/api/v1/auth/user')
  const result = await response.json()

  if (result.status === 'error') {
    throw new Error(result.message)
  }
  if (result.status === 'fail') {
    return null
  }

  return result.data.user
}

export default function useAuthUser() {
  const queryClient = useQueryClient()

  return {
    ...useQuery('user', fetchUser),
    refresh: () => queryClient.invalidateQueries('user'),
  }
}
