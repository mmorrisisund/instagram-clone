import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'

import * as ROUTES from '../constants/routes'
import { AuthProvider } from '../context/auth'
import ProtectedRoute from './ProtectedRoute'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Signup = lazy(() => import('../pages/Signup'))
const Inbox = lazy(() => import('../pages/Inbox'))
const CreatePost = lazy(() => import('../pages/CreatePost'))

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Suspense fallback={<p>App Loading...</p>}>
            <Switch>
              <ProtectedRoute exact path={ROUTES.HOME} component={Home} />
              <ProtectedRoute path={ROUTES.CREATE} component={CreatePost} />
              <ProtectedRoute path={ROUTES.INBOX} component={Inbox} />
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGNUP} component={Signup} />
            </Switch>
          </Suspense>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App
