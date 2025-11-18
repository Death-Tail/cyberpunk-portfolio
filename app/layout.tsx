import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Dyari Ali Tahir",
  authors: [{ name: "Dyari Ali Tahir", url: "https://dyariali.com" }],
  applicationName: "Dyari Ali Tahir Portfolio",
  generator: "Next.js",
  metadataBase: new URL("https://dyariali.com"),
  referrer: "origin-when-cross-origin",
  description: "Full-stack developer specializing in Next.js ecosystem and modern web architecture.",
  keywords: "full-stack, developer, portfolio, aesthetic, web architecture , Next.js, React, Node.js, TypeScript, Tailwind CSS, PostgreSQL, erbil, hawler, death tail, SHIN尾, dyari ali, dyari ali taher, dyari",
  creator: "Dyari Ali Tahir",
  openGraph: {
    title: "Dyari Ali Tahir",
    description: "Full-stack developer specializing in Next.js ecosystem and modern web architecture.",
    url: "https://dyariali.com",
    siteName: "Dyari Ali Tahir Portfolio",
    images: [
      {
        url: "https://dyariali.com/OGbanner.jpg",
        width: 3000,
        height: 1568,
        alt: "Dyari Ali Tahir Portfolio",
        type: "image/jpg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dyari Ali Tahir",
    description: "Full-stack developer specializing in Next.js ecosystem and modern web architecture.",
    site: "@dyariali",
    creator: "@death_tail0331",
    images: [
      "https://dyariali.com/OGbanner.jpg",
    ],
  },
  manifest: "/manifest.json",
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="canonical" href="https://dyariali.com" />
        <link property="fb:app_id" content="1574339983752418" />


        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dyari Ali",
              "url": "https://dyariali.com",
              "sameAs": [
                "https://github.com/Death-Tail",
                "https://www.linkedin.com/in/dyarialitahir/",
                "https://discord.com/users/death_tail",
                "https://x.com/Death_Tail0331",
                "https://www.instagram.com/dyari_ali_taher/"
              ]
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
