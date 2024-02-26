'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
const Home = (request) => {
  const router = useRouter()
  const path = new URLSearchParams(request.searchParams).toString()
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/google/callback?${path}`
      )
      const data = await result.json()
      if (data.status === 200) {
        Cookies.set('accessToken', data.access_token, { expires: 30 })
        router.push('/')
      }
    }
    fetchData()
  }, [])
  return <div></div>
}

export default Home
