export const userSignUp = async (email, password, fullName, username) =>
  await fetch('/api/v1/auth/signup', {
    body: JSON.stringify({ username, email, fullName, password }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const userLogin = async (username, password) =>
  await fetch('/api/v1/auth/login', {
    body: JSON.stringify({ username, password }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const userLogout = async () => await fetch('/api/v1/auth/logout')
