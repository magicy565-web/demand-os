import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Inter, Noto_Serif_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600']
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  variable: '--font-noto-serif-sc',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Demand-OS | Global Trade Operating System',
  description: 'Connecting Eastern supply chains with Western demand through rigorous data science. Strategic consulting for cross-border e-commerce.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${playfair.variable} ${inter.variable} ${notoSerifSC.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
