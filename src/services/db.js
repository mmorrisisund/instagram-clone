import generateURL from '../utils/generate-url'

export const usernameExists = async (username, email) => {
  const response = await fetch('/api/v1/users/checkuser', {
    body: JSON.stringify({ username, email }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return result.data
}

export const getUser = async userId => {
  const response = await fetch(`/api/v1/users/${userId}`)
  const result = await response.json()

  if (result.status === 'success') {
    return result.data.user
  }
  return null
}

export const followUser = async followerId => {
  const response = await fetch('/api/v1/users/follow', {
    body: JSON.stringify({ followerId }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return result.status === 'success'
}

export const unfollowUser = async followerId => {
  const response = await fetch('/api/v1/users/unfollow', {
    body: JSON.stringify({ followerId }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return result.status === 'success'
}

export const getFollowers = async userId => {
  const response = await fetch('/api/v1/users/followers', {
    body: JSON.stringify({ id: userId }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return result.status === 'success' ? result.data.followers : []
}

export const getFollowing = async userId => {
  const response = await fetch('/api/v1/users/following', {
    body: JSON.stringify({ id: userId }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return result.status === 'success' ? result.data.following : []
}

export const createPost = async post => {
  const response = await fetch('/api/v1/posts/create', {
    body: JSON.stringify({ ...post }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  if (result.status === 'success') {
    return result.data.post
  } else if (result.status === 'fail') {
    throw new Error(result.data.message)
  } else {
    throw new Error(result.message)
  }
}

export const getSignature = async folder => {
  const response = await fetch('/api/v1/auth/cloudinary', {
    method: 'POST',
    body: JSON.stringify({ folder }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  return result.data
}

export const uploadImage = async (file, folder, timestamp, signature) => {
  const data = new FormData()
  data.append('file', file)
  const url = generateURL(folder, timestamp, signature)

  const response = await fetch(url, { body: data, method: 'POST' })
  const result = await response.json()

  return result.secure_url
}

export const likePost = async postId => {
  const response = await fetch('/api/v1/posts/like', {
    method: 'POST',
    body: JSON.stringify({ postId }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  return result.status === 'success'
}

export const unlikePost = async postId => {
  const response = await fetch('/api/v1/posts/unlike', {
    method: 'POST',
    body: JSON.stringify({ postId }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  return result.status === 'success'
}

export const savePost = async postId => {
  const response = await fetch('/api/v1/posts/save', {
    method: 'POST',
    body: JSON.stringify({ postId }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  return result.status === 'success'
}

export const unsavePost = async postId => {
  const response = await fetch('/api/v1/posts/unsave', {
    method: 'POST',
    body: JSON.stringify({ postId }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  return result.status === 'success'
}

export const createComment = async (content, postId) => {
  const response = await fetch('/api/v1/comments/create', {
    method: 'POST',
    body: JSON.stringify({ content, postId }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  if (result.status === 'success') {
    return result.data.comment
  } else {
    throw new Error(result.message)
  }
}

export const getComment = async commentId => {
  const response = await fetch('/api/v1/comments/', {
    method: 'POST',
    body: JSON.stringify({ commentId }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  if (result.status === 'success') {
    return result.data.comment
  } else {
    throw new Error(result.message)
  }
}

export const getComments = async postId => {
  const response = await fetch('/api/v1/comments/all', {
    method: 'POST',
    body: JSON.stringify({ postId }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  if (result.status === 'success') {
    return result.data.comments
  } else {
    throw new Error(result.message)
  }
}

export const getReplies = async commentId => {
  const response = await fetch('/api/v1/comments/replies', {
    method: 'POST',
    body: JSON.stringify({ commentId }),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await response.json()

  if (result.status === 'success') {
    return result.data.comments
  } else {
    throw new Error(result.message)
  }
}
