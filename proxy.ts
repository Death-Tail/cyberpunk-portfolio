import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const blockedOrgs = [
  "DIGITALOCEAN", "CLOUDFLARENET", "MICROSOFT", "GOOGLE",
  "AMAZON", "OVH", "HETZNER", "TENCENT", "CHINANET",
]

// These bots MUST be allowed to see your site to generate previews
const socialAndSearchBots = [
  "googlebot", "bingbot", "duckduckbot", "yandex", "baiduspider", "applebot",
  "twitterbot", "facebookexternalhit", "discordbot", "whatsapp", "slackbot",
  "linkedinbot", "telegrambot"
]

export function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? ""
  const asOrg = (req.headers.get("x-vercel-ip-as-org") ?? "").toUpperCase()

  // 1. ALLOW LIST (Priority #1)
  // If it's a "Good Bot", we exit immediately and let them in.
  if (socialAndSearchBots.some(bot => ua.includes(bot))) {
    return NextResponse.next()
  }

  // 2. ORG BLOCKING (Priority #2)
  // We only block these IF they weren't in the "Good Bot" list above.
  if (blockedOrgs.some(org => asOrg.includes(org))) {
    return new NextResponse(null, { status: 403, statusText: "Forbidden" })
  }

  // 3. GENERIC SCRAPER BLOCKING (Priority #3)
  // Check for generic strings like 'bot' or 'scraper' last.
  const genericBotKeywords = ["bot", "crawler", "spider", "scraper", "python", "curl", "wget"]
  if (genericBotKeywords.some(keyword => ua.includes(keyword))) {
    return new NextResponse(null, { status: 403, statusText: "Forbidden" })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
