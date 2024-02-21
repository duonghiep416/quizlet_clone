import { redirect } from 'next/navigation'

const Home = async () => {
  const result = await fetch(`http://localhost:3000/api/auth/google/redirect`)
  const data = await result.json()
  const urlRedirect = data.data
  console.log('urlRedirect', urlRedirect)
  redirect(urlRedirect)
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
