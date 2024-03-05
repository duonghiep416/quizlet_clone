import Navigation from '@/components/Navigation'
import Profile from '@/components/Profile'

export default function ProfileLayout({ children }) {
  return (
    <div>
      <div className='container w-3/4 mx-auto'>
        <Profile style={{ marginBottom: '30px' }} />
        <Navigation />
        {children}
      </div>
    </div>
  )
}
