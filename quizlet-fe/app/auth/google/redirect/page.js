import { redirect } from 'next/navigation'

const Home = async () => {
  const result = await fetch(`http://localhost:3000/api/auth/google/redirect`)
  const data = await result.json()
  const urlRedirect = data.data
  redirect(urlRedirect)
}

export default Home
