import Header from '@/components/Header'
import Providers from '@/redux/Providers'

export const metadata = {
  title: 'Quizlet',
  description:
    'Quizlet is a global learning platform that provides engaging study tools to help people practice and master whatever they are learning.'
}

export default function MainLayout({ children }) {
  return (
    <main className='bg-primary'>
      <Header />
      {children}
    </main>
  )
}
