import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Dyari Ali Tahir",
  authors: [{ name: "Dyari Ali Tahir", url: "https://dyarialitahir.com" }],
  colorScheme: "dark",
  applicationName: "Dyari Ali Tahir Portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  description: "Full-stack developer portfolio with cyberpunk aesthetics",
  keywords: "full-stack, developer, portfolio, cyberpunk",
  creator: "Dyari Ali Tahir",
  openGraph: {
    title: "Dyari Ali Tahir",
    description: "Full-stack developer portfolio with cyberpunk aesthetics",
    url: "https://death-tail.vercel.app",
    siteName: "Dyari Ali Tahir Portfolio",
    images: [
      {
        url: "https://death-tail.vercel.app/desktop%20logo/profile.avif",
        width: 1024,
        height: 1024,
        alt: "Dyari Ali Tahir Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
