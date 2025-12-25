import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const blockedOrgs = [
  "DIGITALOCEAN",
  "CLOUDFLARENET",
  "MICROSOFT",
  "GOOGLE",
  "AMAZON",
  "OVH",
  "HETZNER",
  "TENCENT",
  "CHINANET",
]

const allowedBots = [
  "googlebot",
  "bingbot",
  "duckduckbot",
  "yandex",
  "baiduspider",
  "applebot",
  "twitterbot",
  "facebookexternalhit",
  "discordbot",
  "linkedinbot",
  "slackbot",
  "telegrambot",
  "whatsapp",
  "embedly",
]

export function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? ""
  const asOrg = (req.headers.get("x-vercel-ip-as-org") ?? "").toUpperCase()

  // 1. Allow Whitelisted Bots immediately (Bypasses Org & Generic block)
  if (allowedBots.some(bot => ua.includes(bot))) {
    return NextResponse.next()
  }

  // 2. Block Known Hosting/Data-Center Orgs
  if (blockedOrgs.some(org => asOrg.includes(org))) {
    return new NextResponse(null, { status: 403, statusText: "Forbidden" })
  }

  // 3. Block Generic Scrapers
  if (
    ua.includes("bot") ||
    ua.includes("crawler") ||
    ua.includes("spider") ||
    ua.includes("scraper") ||
    ua.includes("python") ||
    ua.includes("curl") ||
    ua.includes("wget")
  ) {
    return new NextResponse(null, { status: 403, statusText: "Forbidden" })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
