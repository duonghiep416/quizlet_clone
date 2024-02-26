'use client'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import FormAuth from '@/components/FormAuth'

const UserAuthenticationPage = ({ type, params }) => {
  const router = useRouter()
  const { action } = params
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
