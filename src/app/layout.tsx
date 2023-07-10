import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '어이, 김씨!',
  description: '인력 중개 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*header of the page. It includes name of the page, simple user profile*/}
        <div className="flex flex-row justify-between items-center p-4 text-3xl">
          Hey, MR. KIM!
        </div>
        {children}
      </body>
    </html>
  )
}
