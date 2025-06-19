import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "SHIN尾",
  description: "Full-stack developer portfolio with cyberpunk aesthetics",
  keywords: "full-stack, developer, portfolio, cyberpunk",
  creator: "Dyari Ali Tahir",
  openGraph: {
    title: "SHIN尾",
    description: "Full-stack developer portfolio with cyberpunk aesthetics",
    url: "https://lingreed.vercel.app/",
    siteName: "SHIN尾",
    images: [
      {
        url: "https://imgur.com/a/7L6FtZ6",
        width: 1024,
        height: 1024,
        alt: "SHIN尾 Portfolio",
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
      </body>
    </html>
  )
}
