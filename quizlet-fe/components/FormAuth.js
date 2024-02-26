'use client'
import Input from './Input'
import Button from './Button'
import { useRouter } from 'next/navigation'
import { checkInputLogin, checkInputRegister } from '@/utils/checkAuth.utils'
import { useState } from 'react'
import { handleAuth } from '@/utils/handleAuth.utils'
import { avatars } from '@/public/images/avatar-default/avatar'
const FormAuth = ({ type }) => {
  const router = useRouter()
  const messageInit = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null
  }
  const [message, setMessage] = useState(messageInit)
  const [error, setError] = useState('')
  return (
    <>
      <p className='error-message text-red text-center'>{error}</p>
      <form
        action=''
        className=''
        onSubmit={async (e) => {
          e.preventDefault()
          const { name, email, password, confirmPassword } = e.target.elements
          if (type === 'signup') {
            const result = await checkInputRegister(
              name.value,
              email.value,
              password.value,
              confirmPassword.value
            )
            if (!result.status) {
              return setMessage({
                ...messageInit,
                ...result.errors
              })
            }
            const response = await handleAuth(
              {
                name: name.value,
                email: email.value,
                password: password.value,
                avatar: `/images/avatar-default/${
                  avatars[Math.floor(Math.random() * avatars.length)]
                }`
              },
              'register'
            )
            if (response.status === 200) {
              router.push('/auth/login')
            } else {
              setError(response.error)
            }
          }
          if (type === 'login') {
            const result = await checkInputLogin(email.value, password.value)
            if (!result.status) {
              return setMessage({
                ...messageInit,
                ...result.errors
              })
            }
            const response = await handleAuth(
              {
                email: email.value,
                password: password.value
              },
              'login'
            )
            if (response.status === 200) {
              localStorage.setItem('accessToken', response.access_token)
              router.push('/')
            } else {
              setError(response.error)
            }
          }
        }}
      >
        {type === 'signup' && (
          <Input
            label='Full Name'
            placeholder='Enter your full name'
            id='name'
            isRequired={true}
            message={message.name}
          />
        )}
        <Input
          label='Email'
          placeholder='Enter your email address or username'
          id='email'
          isRequired={true}
          message={message.email}
        />
        <Input
          label='Password'
          placeholder='Enter your password'
          id='password'
          type='password'
          isForgotPassword={type === 'login'}
          isRequired={true}
          message={message.password}
        />
        {type === 'signup' && (
          <Input
            label='Confirm Password'
            placeholder='Enter your password'
            id='confirmPassword'
            type='password'
            isRequired={true}
            message={message.confirmPassword}
          />
        )}
        <p>
          By clicking Log in, you accept Quizlet's <span>Terms of Service</span>{' '}
          and <span>Privacy Policy</span>
        </p>
        <Button
          content={type === 'login' ? 'Log in' : 'Sign up'}
          btnType='large-secondary'
          style={{ fontSize: '17px' }}
        />
        <Button
          content={
            type === 'login'
              ? 'New to Quizlet? Create an account'
              : 'Already have an account? Log in'
          }
          onClick={() => {
            type === 'login'
              ? router.push('/auth/signup')
              : router.push('/auth/login')
          }}
          btnType='large-transparent'
          style={{ fontSize: '17px', marginTop: '20px' }}
          type='button'
        />
      </form>
    </>
  )
}

export default FormAuth
