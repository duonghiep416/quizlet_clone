'use client'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Tooltip, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
const LibraryDropdown = ({ setIsDropdownOpen }) => {
  const accessToken = Cookies.get('accessToken')
  const user = useSelector((state) => state.user.userData)
  const [page, setPage] = useState('courses')
  const { isPending, error, data } = useQuery({
    queryKey: [page],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API}/${page}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res) => res.json())
  })
  return (
    <div
      className='absolute top-16 left-0 z-10 min-w-96 max-w-sm rounded-md bg-primary overflow-hidden border border-[#313131]'
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className='dropdown-header'>
        <ul className='flex border-b border-bottomHeader font-semibold text-center'>
          <li
            className='dropdown-nav flex-grow hover:bg-bottomHeader px-1 py-2 cursor-pointer'
            onClick={() => {
              setPage('courses')
            }}
          >
            Học phần
          </li>
          <li className='dropdown-nav flex-grow hover:bg-bottomHeader px-1 py-2 cursor-pointer'>
            Lời giải chuyên gia
          </li>
          <li
            className='dropdown-nav flex-grow hover:bg-bottomHeader px-1 py-2 cursor-pointer'
            onClick={() => {
              setPage('categories')
            }}
          >
            Thư mục
          </li>
        </ul>
      </div>
      <ul>
        {isPending && (
          <div className='max-w-[300px] w-full flex items-center gap-3 px-4 py-3'>
            <div>
              <Skeleton className='flex rounded-full w-12 h-12' />
            </div>
            <div className='w-full flex flex-col gap-2'>
              <Skeleton className='h-3 w-3/5 rounded-lg' />
              <Skeleton className='h-3 w-4/5 rounded-lg' />
            </div>
          </div>
        )}
        {error && <p>Có lỗi xảy ra, vui lòng thử lại sau</p>}
        {user &&
          data &&
          data.data?.rows.map((item, index) => {
            return (
              <Tooltip
                content={item.name}
                showArrow
                placement='right'
                classNames={{
                  base: [
                    // arrow color
                    'before:bg-neutral-400 dark:before:bg-white'
                  ],
                  content: [
                    'py-2 px-4 shadow-xl',
                    'text-black bg-gradient-to-br from-white to-neutral-400'
                  ]
                }}
                closeDelay={0}
                key={index}
              >
                <li className='hover:bg-bottomHeader'>
                  <Link
                    href={`/detail/${page === 'courses' ? 'sets' : 'folders'}/${
                      item.id
                    }`}
                    className='text-base font-bold flex flex-col w-full h-full justify-center gap-2 px-4 py-3 hover:bg-bottomHeader'
                    onClick={() => {
                      setIsDropdownOpen(false)
                    }}
                  >
                    <span className='line-clamp-1'>{item.name}</span>
                    <div className='profile flex items-center gap-2'>
                      <img
                        src={process.env.NEXT_PUBLIC_SERVER_URL + user?.avatar}
                        alt='Avatar'
                        className='w-4 h-4 rounded-full '
                      />
                      <p className=' text-xs text-[#bbbbbb]'>{user?.name}</p>
                    </div>
                  </Link>
                </li>
              </Tooltip>
            )
          })}
      </ul>
      <div>
        <Link
          href={`/profile/${page === 'courses' ? 'sets' : 'folders'}`}
          className='text-sm font-semibold flex flex-col w-full h-full justify-center gap-2 px-3 py-3 hover:bg-bottomHeader border-t border-[#313131] text-secondary hover:text-white'
          onClick={() => {
            setIsDropdownOpen(false)
          }}
        >
          Xem tất cả {page === 'courses' ? 'học phần' : 'thư mục'}
        </Link>
      </div>
    </div>
  )
}

export default LibraryDropdown
