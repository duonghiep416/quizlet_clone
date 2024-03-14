import Navigation from '@/components/Navigation'
import Profile from '@/components/Profile'

export default function ProfileLayout({ children }) {
  return (
    <div>
      <Profile style={{ marginBottom: '30px' }} />
      <Navigation />
      {children}
    </div>
  )
}
