import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 1. Rename to 'blockedOrgs' because these are names, not ASNs
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

// 2. In Next.js 16, the function MUST be named 'proxy'
export function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? ""

  // 3. FIX: Use 'x-vercel-ip-as-org' to match your list of names.
  // ('x-vercel-ip-asn' would return numbers like '13335')
  const asOrg = req.headers.get("x-vercel-ip-as-org") ?? ""

  // ⭐ Allow SEO Crawlers ⭐
  if (
    ua.includes("googlebot") ||
    ua.includes("bingbot") ||
    ua.includes("duckduckbot") ||
    ua.includes("yandex") ||
    ua.includes("baiduspider") ||
    ua.includes("applebot") ||
    ua.includes("twitterbot") ||
    ua.includes("facebookexternalhit")
  ) {
    return NextResponse.next()
  }

  // 🛑 Block Hosting/Cloud Providers (Anti-Scraping)
  if (blockedOrgs.some(org => asOrg.toUpperCase().includes(org))) {
    // Return 403 (Forbidden) instead of 204
    return new NextResponse(null, { status: 403, statusText: "Forbidden" })
  }

  // 🛑 Block Generic Bots
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

// 4. Matcher config remains the same
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
