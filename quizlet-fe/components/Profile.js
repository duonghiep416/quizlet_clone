'use client'
import { useSelector } from 'react-redux'

const Profile = ({ styleContainer, styleImage, styleName, styleEmail }) => {
  const user = useSelector((state) => state.user.userData)
  return (
    <div className='flex items-center gap-7 mb-10' style={styleContainer || {}}>
      <div
        className='left-side w-16 h-16 rounded-full bg-white overflow-hidden flex items-center justify-center'
        style={styleImage || {}}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${user?.avatar}`}
          alt='avatar'
          className='object-cover h-full w-full'
        />
      </div>
      <div className='right-side'>
        <h1
          className='font-bold text-2xl text-white mb-1'
          style={styleName || {}}
        >
          {user?.name}
        </h1>
        <p className='text-gray-600' style={styleEmail || {}}>
          {user?.email}
        </p>
      </div>
    </div>
  )
}

export default Profile
