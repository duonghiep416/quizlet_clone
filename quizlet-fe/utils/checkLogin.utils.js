export const checkLogin = async (apiUrl, dispatch, setUser, removeUser) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    try {
      const result = await fetch(`${apiUrl}/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      const user = await result.json()
      if (user.status === 200) {
        localStorage.setItem('user', JSON.stringify(user.data))
        dispatch(setUser(user.data))
      } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        dispatch(removeUser())
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  } else {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    dispatch(removeUser())
  }
}
