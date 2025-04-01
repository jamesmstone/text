import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Text convert',
  description: 'Text converter allowing encoding and decoding',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
