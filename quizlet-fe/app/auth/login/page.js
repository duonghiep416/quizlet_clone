'use client'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const UserAuthenticationPage = ({ type }) => {
  const router = useRouter()
  const user = useSelector((state) => state.user.userData)
  console.log(user)
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [])
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
