'use client'
import { useSelector } from 'react-redux'

const Profile = ({ size, style }) => {
  const user = useSelector((state) => state.user.userData)
  return (
    <div className='flex items-center gap-7' style={style || {}}>
      <div className='leftside w-16 h-16 rounded-full bg-white overflow-hidden flex items-center justify-center'>
        <img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${user?.avatar}`}
          alt='avatar'
          className='object-cover h-full w-full'
        />
      </div>
      <div className='right-side'>
        <h1 className='font-bold text-2xl text-white mb-1'>{user?.name}</h1>
        <p className='text-gray-600'>{user?.email}</p>
      </div>
    </div>
  )
}

export default Profile
