import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TranslationProvider from '../components/TranslationProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Iwate DX Unified Business System',
  description: 'Unified business management system solving data silos, manual re-entry, and accounting integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        <TranslationProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </TranslationProvider>
      </body>
    </html>
  )
}
