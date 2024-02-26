const handleAuth = async (body, type = 'login') => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const result = await response.json()
  return result
}

export { handleAuth }
