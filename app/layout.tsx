import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elder Care Meal Image Generator',
  description: 'Generate photorealistic elder-care-appropriate meal images using Gemini',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}


