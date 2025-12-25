import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Orgs typically associated with scrapers. 
// Note: We are cautious with 'GOOGLE' and 'MICROSOFT' as they house real users (VPNs/Corporate).
const blockedOrgs = [
  "DIGITALOCEAN", "CLOUDFLARENET", "OVH", "HETZNER", "TENCENT", "CHINANET", "LINODE"
];

// 2. High-priority Whitelist for Good Crawlers & Social Embeds
const goodBots = [
  "googlebot", "bingbot", "duckduckbot", "yandex", "baiduspider", "applebot",
  "twitterbot", "facebookexternalhit", "discordbot", "linkedinbot", 
  "slackbot", "telegrambot", "whatsapp", "embedly"
];

export function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? "";
  const asOrg = (req.headers.get("x-vercel-ip-as-org") ?? "").toUpperCase();

  // STEP 1: Immediate Pass for Legitimate Bots
  // This must come first so they aren't accidentally blocked by the Org check
  if (goodBots.some(bot => ua.includes(bot))) {
    return NextResponse.next();
  }

  // STEP 2: Block Data Centers
  // These are rarely used by real humans for browsing
  if (blockedOrgs.some(org => asOrg.includes(org))) {
    return new NextResponse(null, { status: 403, statusText: "Forbidden" });
  }

  // STEP 3: Block Harmful/Generic Scraper Patterns
  // We exclude common strings that overlap with good bots (like 'bot')
  const genericScrapers = [
    "python", "curl", "wget", "headless", "selenium", "puppeteer", 
    "playwright", "urllib", "gobot", "node-fetch"
  ];

  if (genericScrapers.some(scraper => ua.includes(scraper))) {
    return new NextResponse(null, { status: 403, statusText: "Forbidden" });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (often handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
