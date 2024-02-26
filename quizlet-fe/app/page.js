'use client'
import React, { useEffect } from 'react'
import Header from '@/components/Header'
import { userSlice } from '@/redux/slice/userSlice'
import { useDispatch } from 'react-redux'
import { getProfileUser } from '@/utils/getProfileUser.utils'

const { setUser, removeUser } = userSlice.actions

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    getProfileUser(process.env.NEXT_PUBLIC_API, dispatch, setUser, removeUser)
  }, [dispatch])

  return (
    <main className='bg-primary'>
      <Header />
    </main>
  )
}
