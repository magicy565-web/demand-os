import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Noto_Serif_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/providers/theme-provider'
// MainHeader removed - navigation only on home page
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
  display: 'swap', // 优化字体加载
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  variable: '--font-noto-serif-sc',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// 移动端视口优化配置
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // 支持 iPhone X+ 刘海屏
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1729' },
  ],
}

export const metadata: Metadata = {
  title: 'Demand-OS | Global Trade Operating System',
  description: 'Connecting Eastern supply chains with Western demand through rigorous data science. Strategic consulting for cross-border e-commerce.',
  generator: 'v0.app',
  // 移动端 Web App 配置
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Demand-OS',
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
        sizes: '32x32',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
        sizes: '32x32',
      },
    ],
    apple: [
      '/apple-icon.png',
    ],
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        {/* Apple Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} ${notoSerifSC.variable} font-sans antialiased min-h-[100svh]`}>
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
