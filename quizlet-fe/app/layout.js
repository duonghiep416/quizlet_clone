import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/redux/Providers'
import Header from '@/components/Header'
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Quizlet',
  description:
    'Quizlet is a global learning platform that provides engaging study tools to help people practice and master whatever they are learning.'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <main className='bg-primary'>
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
