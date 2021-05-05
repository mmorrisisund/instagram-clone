import { createContext, useContext, useEffect, useState } from 'react'
import { userLogin, userLogout, userSignUp } from '../services/auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/v1/auth/user')
      const { status, data } = await res.json()

      if (status === 'success') {
        setUser(data.user)
      }
      setFetching(false)
    }
    fetchUser()
  }, [])

  const login = async (username, password) => {
    const response = await userLogin(username, password)
    const result = await response.json()

    if (result.status === 'success') {
      setUser(result.data.user)
    }

    return result
  }

  const logout = async () => {
    await userLogout()
    setUser(undefined)
  }

  const signup = async (username, email, fullName, password) => {
    const response = await userSignUp(email, password, fullName, username)
    const result = await response.json()

    if (result.status === 'success') {
      setUser(result.data.user)
    }

    return result
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, fetching }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
