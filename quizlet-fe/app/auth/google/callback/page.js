const Home = async (request) => {
  console.log('req', request)
  const path = new URLSearchParams(request.searchParams).toString()
  console.log(path)
  const result = await fetch(
    `http://localhost:3000/api/auth/google/callback?${path}`
  )
  const data = await result.json()
  const user = data.data
  console.log('user', user)
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
