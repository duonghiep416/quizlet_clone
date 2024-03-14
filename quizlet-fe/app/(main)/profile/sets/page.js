'use client'
import SetItem from '@/components/SetsPage/SetItem'
import FilterBtn from '@/components/SettingsPage/FilterBtn'
import InputSearch from '@/components/SettingsPage/InputSearch'
import { Skeleton } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import moment from 'moment'
import Link from 'next/link'
const SetsPage = () => {
  const accessToken = Cookies.get('accessToken')
  const { isPending, error, data } = useQuery({
    queryKey: ['sets'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API}/${'courses'}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res) => res.json())
  })
  const sets = data?.data?.rows
  sets?.forEach((set) => {
    set.created_at = moment(set.created_at).format('dddd, DD MMMM YYYY')
    set.updated_at = moment(set.updated_at).format('dddd, DD MMMM YYYY')
  })
  return (
    <div className='py-10'>
      <div className='filter py-8 flex justify-between items-center'>
        <FilterBtn />
        <InputSearch label='Tìm kiếm học phần' />
      </div>
      <div className='content'>
        {isPending && (
          <>
            <div className='w-full flex items-center gap-3 px-4 py-3'>
              <div>
                <Skeleton className='flex rounded-full w-12 h-12' />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <Skeleton className='h-3 w-3/5 rounded-lg' />
                <Skeleton className='h-3 w-4/5 rounded-lg' />
              </div>
            </div>
            <div className='w-full flex items-center gap-3 px-4 py-3'>
              <div>
                <Skeleton className='flex rounded-full w-12 h-12' />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <Skeleton className='h-3 w-3/5 rounded-lg' />
                <Skeleton className='h-3 w-4/5 rounded-lg' />
              </div>
            </div>
          </>
        )}
        {sets &&
          sets.map((item, index) => {
            return (
              <Link href={`/detail/sets/${item.id}`} key={index}>
                <SetItem key={index} item={item} />
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default SetsPage
