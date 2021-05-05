import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Button from '../components/Button'
import Input from '../components/Input'
import useSetTitle from '../hooks/use-set-title'
import { useAuth } from '../context/auth'
import * as ROUTES from '../constants/routes'

const Login = () => {
  useSetTitle('Instagram - Log in')
  const [error, setError] = useState('')
  const history = useHistory()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'onChange' })

  const onSubmit = async ({ username, password }) => {
    const result = await login(username, password)

    if (result.status === 'success') {
      history.push('/')
    } else {
      setError(result.data.message)
    }
  }

  return (
    <div className='container flex items-center justify-center mx-auto  xs:mt-10'>
      <div className='hidden md:block w-1/2'>
        <img src='/images/iphone-with-profile.jpg' alt='iphone with profile' />
      </div>

      <div className='flex flex-col items-center w-full max-w-[350px]'>
        <div className='flex flex-col items-center w-full xs:bg-white xs:border xs:border-gray-200 pb-10'>
          <img
            className='my-8 h-12 w-44'
            src='/images/logo-big.png'
            alt='logo'
          />

          <div className='w-full'>
            <form className='mx-10' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-2'>
                <Input
                  placeholder='Username or email'
                  type='text'
                  {...register('username', { required: true })}
                />
              </div>

              <div className='mb-4'>
                <Input
                  placeholder='Password'
                  type='password'
                  {...register('password', { required: true })}
                />
              </div>

              <Button className='text-center' type='submit' disabled={!isValid}>
                Log In
              </Button>
              {error && (
                <div className='text-center mt-4'>
                  <p className='text-red-500 text-sm'>{error}</p>
                </div>
              )}
            </form>

            <div className='text-center mt-8'>
              <Link className='text-xs text-gray-600' to={ROUTES.RESET}>
                Forgot password?
              </Link>
            </div>
          </div>
        </div>

        <div className='w-full flex items-center justify-center flex-col text-center xs:bg-white xs:border xs:border-gray-200 mt-2 py-5'>
          <p className='text-sm text-gray-800'>
            Don't have an account?{' '}
            <Link className='font-bold text-blue-400' to={ROUTES.SIGNUP}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
