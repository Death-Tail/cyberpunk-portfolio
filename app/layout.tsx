import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Fraunces, JetBrains_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dyari Ali Tahir — Archive",
  authors: [{ name: "Dyari Ali Tahir", url: "https://dyariali.com" }],
  applicationName: "SHIN尾 Archive",
  generator: "Next.js",
  metadataBase: new URL("https://dyariali.com"),
  alternates: { canonical: "./" },
  referrer: "origin-when-cross-origin",
  description: "Personal archive of Dyari Ali Tahir — works, watched, read, played, written.",
  keywords: "full-stack developer, Dyari Ali Tahir, SHIN尾, Death Tail, portfolio, anime log, watch log, archive",
  creator: "Dyari Ali Tahir",
  openGraph: {
    title: "Dyari Ali Tahir — Archive",
    description: "Personal archive of works, watched, read, played, written.",
    url: "https://dyariali.com",
    siteName: "SHIN尾 Archive",
    images: [
      {
        url: "https://dyariali.com/openGraph.jpg",
        width: 3000,
        height: 1567,
        alt: "Dyari Ali Tahir",
        type: "image/jpg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dyari Ali Tahir — Archive",
    description: "Personal archive of works, watched, read, played, written.",
    site: "@dyariali",
    creator: "@death_tail0331",
    images: ["https://dyariali.com/openGraph.jpg"],
  },
  manifest: "/manifest.json",
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${jetbrains.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0b" />
        <meta property="fb:app_id" content="1574339983752418" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dyari Ali Tahir",
              alternateName: ["SHIN尾", "Death Tail"],
              url: "https://dyariali.com",
              jobTitle: "Full-Stack Developer",
              knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
              sameAs: [
                "https://github.com/Death-Tail",
                "https://www.linkedin.com/in/dyarialitahir/",
                "https://discord.com/users/death_tail",
                "https://x.com/Death_Tail0331",
                "https://www.instagram.com/dyari_ali_taher/",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans bg-ink text-bone antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
