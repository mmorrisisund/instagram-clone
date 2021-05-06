import { createContext, useContext } from 'react'
import { useHistory } from 'react-router'

import useAuthUser from '../hooks/useUser'
import { userLogin, userLogout, userSignUp } from '../services/auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const history = useHistory()
  const { data: user, isLoading: loading, refresh } = useAuthUser()

  const login = async (username, password) => {
    const response = await userLogin(username, password)
    const result = await response.json()

    if (result.status === 'success') {
      await refresh()
      history.push('/')
    }

    return result
  }

  const logout = async () => {
    await userLogout()
    await refresh()
    history.push('/login')
  }

  const signup = async (username, email, fullName, password) => {
    const response = await userSignUp(email, password, fullName, username)
    const result = await response.json()

    if (result.status === 'success') {
      await refresh()
    }

    return result
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
