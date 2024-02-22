'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
const Home = (request) => {
  const router = useRouter()
  // const [dataInit, setDataInit] = useState({ status: null })
  const path = new URLSearchParams(request.searchParams).toString()
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/google/callback?${path}`
      )
      const data = await result.json()
      if (data.status === 200) {
        localStorage.setItem('accessToken', data.access_token)
        router.push('/')
      }
    }
    fetchData()
  }, [])
  return <div></div>
}

export default Home
