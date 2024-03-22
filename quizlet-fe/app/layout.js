import { Toaster } from 'sonner'
import './globals.css'
import Providers from '@/components/Providers'
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Quizlet',
  description:
    'Quizlet is a global learning platform that provides engaging study tools to help people practice and master whatever they are learning.'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='dark'>
      <body className='min-h-screen'>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  )
}
