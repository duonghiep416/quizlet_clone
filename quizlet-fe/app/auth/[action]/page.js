'use client'
import { useState, useEffect, CSSProperties } from 'react'
import Button from '@/components/Button'
import { userSlice } from '@/redux/slice/userSlice'
import { checkLogin } from '@/utils/checkLogin.utils'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@/components/Loading'
import Input from '@/components/Input'
import FormAuth from '@/components/FormAuth'

const { setUser, removeUser } = userSlice.actions

const UserAuthenticationPage = ({ type, params }) => {
  const router = useRouter()
  const { action } = params
  const user = useSelector((state) => state.user.userData)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    checkLogin(process.env.NEXT_PUBLIC_API, dispatch, setUser, removeUser).then(
      () => setIsLoading(false)
    )
  }, [dispatch])

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  if (isLoading) {
    return <Loading isLoading={isLoading} />
  }
  return (
    <div className='auth-container flex h-screen bg-white'>
      <div className='left-side h-full relative bg-login-thumb w-[50%] bg-cover bg-right'>
        <p className='slogan absolute top-14 left-14 font-bold text-5xl text-black w-[33rem] leading-tight'>
          {action === 'login'
            ? 'Smash sets in your sweats.'
            : 'The best way to study. Sign up for free.'}
        </p>
        <img
          src='/svg-export/logo.svg'
          alt='logo-quizlet'
          className='absolute bottom-14 left-14 w-52'
        />
      </div>
      <div className='right-side flex-grow py-20'>
        <div className='right-side-container w-[68%] mx-auto'>
          <Button
            content='Continue with Google'
            image='/images/social-icon/google.png'
            btnType='large-transparent'
            onClick={() => {
              router.push('/auth/google/redirect')
            }}
          />
          <div className='separate flex items-center my-5'>
            <span className='flex-grow h-px bg-gray'></span>
            <span className='text-gray-600 px-2 font-semibold'>or email</span>
            <span className='flex-grow h-px bg-gray'></span>
          </div>
          <FormAuth type={action} />
        </div>
      </div>
    </div>
  )
}

export default UserAuthenticationPage
