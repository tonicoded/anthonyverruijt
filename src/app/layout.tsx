import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Anthony Verruijt - Developer & Creator',
  description: 'Anthony Verruijt maakt ideeën werkelijkheid op schermen, groot en klein.',
  keywords: ['Anthony Verruijt', 'developer', 'web developer', 'frontend', 'backend', 'fullstack'],
  authors: [{ name: 'Anthony Verruijt' }],
  creator: 'Anthony Verruijt',
  metadataBase: new URL('https://anthonyverruijt.com'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://anthonyverruijt.com',
    title: 'Anthony Verruijt - Developer & Creator',
    description: 'Anthony Verruijt maakt ideeën werkelijkheid op schermen, groot en klein.',
    siteName: 'Anthony Verruijt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anthony Verruijt - Developer & Creator',
    description: 'Anthony Verruijt maakt ideeën werkelijkheid op schermen, groot en klein.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-status-bar-style" content="dark-content" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}