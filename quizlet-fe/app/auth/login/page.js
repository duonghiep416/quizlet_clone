'use client'
import { useState, useEffect, CSSProperties } from 'react'
import Button from '@/components/Button'
import { userSlice } from '@/redux/slice/userSlice'
import { checkLogin } from '@/utils/checkLogin.utils'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@/components/Loading'

const { setUser, removeUser } = userSlice.actions

const UserAuthenticationPage = ({ type }) => {
  const router = useRouter()
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
      <div className='left-side h-full relative bg-login-thumb w-[47%] bg-cover bg-right'>
        <p className='slogan absolute top-14 left-14 font-bold text-5xl text-black w-96 leading-tight'>
          Smash sets in your sweats.
        </p>
        <img
          src='/svg-export/logo.svg'
          alt='logo-quizlet'
          className='absolute bottom-14 left-14 w-52'
        />
      </div>
      <div className='right-side flex-grow py-24'>
        <div className='right-side-container w-[68%] mx-auto'>
          <Button
            content='Continue with Google'
            image='/images/social-icon/google.png'
            btnType='large-transparent'
            onClick={() => {
              router.push('/auth/google/redirect')
            }}
          />
          <div className='separate flex items-center my-10'>
            <span className='flex-grow h-px bg-gray'></span>
            <span className='text-gray-600 px-2 font-semibold'>or email</span>
            <span className='flex-grow h-px bg-gray'></span>
          </div>
          <form action=''>
            <Button
              content='Login'
              btnType='large-secondary'
              style={{ fontSize: '18px' }}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserAuthenticationPage
