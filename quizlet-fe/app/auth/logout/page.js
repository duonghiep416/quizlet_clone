'use client'
import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
const LogoutPage = () => {
  const router = useRouter()
  const accessToken = Cookies.get('accessToken')
  useEffect(() => {
    const logout = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/logout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      const data = await response.json()
      if (data.status === 200) {
        Cookies.remove('accessToken')
        router.push('/auth/login')
      } else {
        router.push('/')
      }
    }
    logout()
  }, [])
  return <Loading isLoading={true} />
}

export default LogoutPage
