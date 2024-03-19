'use client'

import { useSelector } from 'react-redux'
import UserInfo from './UserInfo'
import { LockClosedIcon } from '@heroicons/react/24/solid'
const SetItem = ({ item }) => {
  const user = useSelector((state) => state.user.userData)
  return (
    <div className='set-item w-full bg-slate-400/25 h-24 flex flex-col justify-between mb-10 rounded-md px-5 pt-3 pb-4 relative overflow-hidden'>
      {user && (
        <UserInfo avatar={user.avatar} name={user.name}>
          | {item.created_at}
        </UserInfo>
      )}
      <div>
        <h2 className='font-bold text-xl line-clamp-1 flex gap-4 items-center'>
          {item.name} {!item.is_public && <LockClosedIcon width={14} />}
        </h2>
        <p className='text-slate-300 text-xs line-clamp-1'>
          {item?.description}
        </p>
      </div>
      <div className='absolute w-full h-1 left-0 bottom-0 transition'></div>
    </div>
  )
}

export default SetItem
