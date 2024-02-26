export async function checkLogin(accessToken) {
  const apiUrl = process.env.NEXT_PUBLIC_API
  const response = await fetch(`${apiUrl}/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  const user = await response.json()
  if (user.status === 200) {
    return user.data
  }
  return false
}
