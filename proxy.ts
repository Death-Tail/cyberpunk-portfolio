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

export function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? ""

  const asOrg = req.headers.get("x-vercel-ip-as-org") ?? ""


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

  if (blockedOrgs.some(org => asOrg.toUpperCase().includes(org))) {
    // Return 403 (Forbidden) instead of 204
    return new NextResponse(null, { status: 403, statusText: "Forbidden" })
  }


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
