import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Website Laten Maken Nederland | Anthony Verruijt - Webdesign & App Ontwikkeling',
  description: 'Professionele websites laten maken vanaf €350. Specialist in webdesign, iOS apps en webapplicaties in Nederland. Snelle oplevering binnen 3-7 dagen. ✓ SEO geoptimaliseerd ✓ Mobile-first ✓ CMS integratie',
  keywords: [
    // Nederlandse SEO keywords
    'website laten maken', 'webdesign nederland', 'website maken', 'webdesigner', 'webdeveloper',
    'goedkope website', 'professionele website', 'responsive webdesign', 'website bouwen',
    'webshop laten maken', 'wordpress website', 'custom website', 'website ontwikkeling',
    
    // App development
    'app laten maken', 'ios app ontwikkeling', 'mobiele app', 'app developer nederland',
    'swift developer', 'iphone app maken', 'app design',
    
    // Technical keywords
    'react developer', 'next.js developer', 'typescript developer', 'python developer',
    'frontend developer', 'fullstack developer', 'webapplicatie ontwikkeling',
    
    // Location-based
    'webdesign amsterdam', 'website maken amsterdam', 'developer nederland',
    'webbureau', 'digitale oplossingen', 'online marketing', 'seo optimalisatie',
    
    // Business keywords
    'zakelijke website', 'bedrijfswebsite', 'portfolio website', 'landing page',
    'website onderhoud', 'hosting', 'domeinnaam', 'ssl certificaat'
  ],
  authors: [{ name: 'Anthony Verruijt', url: 'https://anthonyverruijt.nl' }],
  creator: 'Anthony Verruijt - Webdesign & App Ontwikkeling',
  publisher: 'Anthony Verruijt',
  metadataBase: new URL('https://anthonyverruijt.nl'),
  alternates: {
    canonical: 'https://anthonyverruijt.nl',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://anthonyverruijt.nl',
    title: 'Website Laten Maken Nederland | Anthony Verruijt - Webdesign & App Ontwikkeling',
    description: 'Professionele websites laten maken vanaf €350. Specialist in webdesign, iOS apps en webapplicaties in Nederland. Snelle oplevering binnen 3-7 dagen.',
    siteName: 'Anthony Verruijt - Webdesign & App Ontwikkeling',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anthony Verruijt - Website laten maken Nederland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@anthonyverruijt',
    creator: '@anthonyverruijt',
    title: 'Website Laten Maken Nederland | Anthony Verruijt - Webdesign & App Ontwikkeling',
    description: 'Professionele websites laten maken vanaf €350. Snelle oplevering binnen 3-7 dagen. ✓ SEO geoptimaliseerd ✓ Mobile-first',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
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
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Anthony Verruijt",
              "jobTitle": "Web Developer & App Developer",
              "description": "Professionele websites en iOS apps laten maken in Nederland",
              "url": "https://anthonyverruijt.nl",
              "sameAs": [
                "https://github.com/anthonyverruijt",
                "https://linkedin.com/in/anthonyverruijt",
                "https://instagram.com/anthonyverruijt"
              ],
              "knowsAbout": [
                "Website ontwikkeling", "iOS App ontwikkeling", "React", "Next.js", 
                "TypeScript", "Swift", "Python", "Webdesign", "SEO", "UI/UX Design"
              ],
              "offers": {
                "@type": "Service",
                "serviceType": "Website & App Ontwikkeling",
                "areaServed": "Nederland",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Web & App Development Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Website Laten Maken",
                        "description": "Professionele responsive websites met SEO optimalisatie"
                      },
                      "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "350",
                        "priceCurrency": "EUR",
                        "valueAddedTaxIncluded": "false"
                      }
                    },
                    {
                      "@type": "Offer", 
                      "itemOffered": {
                        "@type": "Service",
                        "name": "iOS App Ontwikkeling",
                        "description": "Native iPhone en iPad apps in Swift"
                      },
                      "priceSpecification": {
                        "@type": "PriceSpecification",
                        "price": "750",
                        "priceCurrency": "EUR",
                        "valueAddedTaxIncluded": "false"
                      }
                    }
                  ]
                }
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NL",
                "addressRegion": "Nederland"
              }
            })
          }}
        />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Anthony Verruijt - Webdesign & App Ontwikkeling",
              "description": "Specialist in website laten maken en iOS app ontwikkeling in Nederland",
              "url": "https://anthonyverruijt.nl",
              "telephone": "+31640470662",
              "email": "anthonyverruijt@hotmail.com",
              "priceRange": "€350-€1200",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "52.3676",
                "longitude": "4.9041"
              },
              "serviceArea": {
                "@type": "Country",
                "name": "Nederland"
              },
              "openingHours": "Mo-Fr 09:00-18:00"
            })
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}