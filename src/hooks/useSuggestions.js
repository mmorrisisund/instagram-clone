import { useQuery } from 'react-query'

const getSuggestions = async username => {
  const response = await fetch('/api/v1/users/suggestions', {
    body: JSON.stringify({ username }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  if (result.status === 'error') {
    throw new Error(result.message)
  }
  if (result.status === 'fail') {
    throw new Error(result.data.message)
  }

  return result.data.users ?? []
}

export default function useSuggestions(username) {
  return useQuery('suggestions', () => getSuggestions(username), {
    enabled: !!username,
  })
}
