import './globals.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import Header from '@/components/Header'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Real Estate - Properties',
  description: 'Properties directory'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ReactQueryProvider>
          <Header />
          <div className="container px-6 py-10">
            {children}
            <Toaster position="top-right" />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
