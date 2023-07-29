import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/components/ModalProvider'
import CrispProvider from '@/components/CrispProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arriba',
  description:
    'Awe-striking, Really, Radiant, Intelligence, Being, Awesome  - Arriba AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
