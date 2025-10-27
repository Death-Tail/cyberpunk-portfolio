import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Dyari Ali Tahir",
  authors: [{ name: "Dyari Ali Tahir", url: "https://dyarialitahir.com" }],
  applicationName: "Dyari Ali Tahir Portfolio",
  generator: "Next.js",
  metadataBase: new URL("https://dyariali.com"),
  referrer: "origin-when-cross-origin",
  description: "Full-stack developer specializing in Next.js ecosystem and modern web architecture.",
  keywords: "full-stack, developer, portfolio, cyberpunk, web architecture , Next.js, React, Node.js, TypeScript, JavaScript, Tailwind CSS, Prisma, PostgreSQL",
  creator: "Dyari Ali Tahir",
  openGraph: {
    title: "Dyari Ali Tahir",
    description: "Full-stack developer specializing in Next.js ecosystem and modern web architecture.",
    url: "https://dyariali.com",
    siteName: "Dyari Ali Tahir Portfolio",
    images: [
      {
        url: "https://dyariali.com/desktop%20logo/profile.avif",
        width: 1024,
        height: 1024,
        alt: "Dyari Ali Tahir Portfolio",
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
      "https://dyariali.com/SHIN.png",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  )
}
