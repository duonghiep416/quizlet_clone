import { redirect } from 'next/navigation'

const Home = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/google/redirect`
  )
  const data = await result.json()
  const urlRedirect = data.data
  redirect(urlRedirect)
}

export default Home
