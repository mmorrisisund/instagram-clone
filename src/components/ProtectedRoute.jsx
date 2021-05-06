import { Redirect, Route } from 'react-router'
import { useAuth } from '../context/auth'

const ProtectedRoute = props => {
  const { user, loading } = useAuth()

  if (loading) {
    return <p>route loading...</p>
  }

  if (!user) {
    return <Redirect to='/login' />
  }

  return <Route {...props} />
}

export default ProtectedRoute
