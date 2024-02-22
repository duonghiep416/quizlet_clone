'use client'
import React, { useEffect } from 'react'
import Header from '@/components/Header'
import { userSlice } from '@/redux/slice/userSlice'
import { useDispatch } from 'react-redux'

const { setUser, removeUser } = userSlice.actions

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        try {
          const result = await fetch(
            `${process.env.NEXT_PUBLIC_API}/auth/profile`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
              }
            }
          )
          const user = await result.json()
          if (user.status === 200) {
            dispatch(setUser(user.data))
          } else {
            localStorage.removeItem('accessToken')
            dispatch(removeUser())
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      } else {
        localStorage.removeItem('accessToken')
        dispatch(removeUser())
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <main className='bg-primary'>
      <Header />
    </main>
  )
}
