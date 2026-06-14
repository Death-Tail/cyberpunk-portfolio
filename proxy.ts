import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/* ══════════════════════════════════════════════════════════
   Middleware — runs on the Vercel edge for every matched route.
   Handles: proxy/bot blocking, security headers, rate limiting,
   and admin route protection.
   ══════════════════════════════════════════════════════════ */

/* ── Bot / Scraper blocking (from proxy.ts) ────────────── */
const blockedOrgs = [
  "DIGITALOCEAN", "CLOUDFLARENET", "MICROSOFT", "GOOGLE",
  "AMAZON", "OVH", "HETZNER", "TENCENT", "CHINANET",
]

const socialAndSearchBots = [
  "googlebot", "bingbot", "duckduckbot", "yandex", "baiduspider", "applebot",
  "twitterbot", "facebookexternalhit", "discordbot", "whatsapp", "slackbot",
  "linkedinbot", "telegrambot",
]

const genericBotKeywords = ["bot", "crawler", "spider", "scraper", "python", "curl", "wget"]

function proxyCheck(req: NextRequest): NextResponse | null {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? ""
  const asOrg = (req.headers.get("x-vercel-ip-as-org") ?? "").toUpperCase()

  /* Allow good bots (search engines, social previews) */
  if (socialAndSearchBots.some((bot) => ua.includes(bot))) return null

  /* Block known cloud provider orgs (scrapers) */
  if (blockedOrgs.some((org) => asOrg.includes(org))) {
    return new NextResponse(null, { status: 403, statusText: "Forbidden" })
  }

  /* Block generic scrapers */
  if (genericBotKeywords.some((kw) => ua.includes(kw))) {
    return new NextResponse(null, { status: 403, statusText: "Forbidden" })
  }

  return null
}

/* ── Rate limiter (in-memory, per-IP, sliding window) ──── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMITS = {
  api: { maxRequests: 60, windowMs: 60_000 },           /* 60 req/min for public API */
  admin: { maxRequests: 20, windowMs: 60_000 },          /* 20 req/min for admin API */
  revalidate: { maxRequests: 10, windowMs: 60_000 },     /* 10 req/min for revalidation */
  auth: { maxRequests: 5, windowMs: 300_000 },            /* 5 attempts per 5 minutes */
} as const

function getRateLimitKey(ip: string, bucket: string) {
  return `${bucket}:${ip}`
}

function checkRateLimit(
  ip: string,
  bucket: keyof typeof RATE_LIMITS
): { limited: boolean; remaining: number; resetAt: number } {
  const { maxRequests, windowMs } = RATE_LIMITS[bucket]
  const key = getRateLimitKey(ip, bucket)
  const now = Date.now()

  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    /* New window */
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
    return { limited: false, remaining: maxRequests - 1, resetAt: now + windowMs }
  }

  entry.count++
  if (entry.count > maxRequests) {
    return { limited: true, remaining: 0, resetAt: entry.resetAt }
  }

  return { limited: false, remaining: maxRequests - entry.count, resetAt: entry.resetAt }
}

/* Clean stale entries periodically (every 100 requests) */
let cleanCounter = 0
function cleanStaleEntries() {
  cleanCounter++
  if (cleanCounter % 100 !== 0) return
  const now = Date.now()
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key)
  }
}

/* ── Security headers ──────────────────────────────────── */
function addSecurityHeaders(response: NextResponse): NextResponse {
  /* Prevent clickjacking */
  response.headers.set("X-Frame-Options", "DENY")
  /* Prevent MIME-type sniffing */
  response.headers.set("X-Content-Type-Options", "nosniff")
  /* Referrer policy */
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  /* XSS protection (legacy browsers) */
  response.headers.set("X-XSS-Protection", "1; mode=block")
  /* Permissions policy */
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  )
  /* Strict transport security (HTTPS) */
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  )
  return response
}

/* ── Main proxy (Next.js 16 edge middleware) ───────────── */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown"

  cleanStaleEntries()

  /* 1. Proxy / bot check (skip for API routes — bots don't call APIs) */
  if (!pathname.startsWith("/api/")) {
    const proxyResult = proxyCheck(req)
    if (proxyResult) return proxyResult
  }

  /* 2. Rate limiting for API routes */
  if (pathname.startsWith("/api/admin/")) {
    const { limited, remaining, resetAt } = checkRateLimit(ip, "admin")
    if (limited) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        }
      )
    }
  } else if (pathname === "/api/revalidate") {
    const { limited } = checkRateLimit(ip, "revalidate")
    if (limited) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
  } else if (pathname.startsWith("/api/")) {
    const { limited } = checkRateLimit(ip, "api")
    if (limited) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
  }

  /* 3. Auth page rate limiting (prevent brute force on /admin login) */
  if (pathname === "/admin" && req.method === "POST") {
    const { limited } = checkRateLimit(ip, "auth")
    if (limited) {
      return NextResponse.json({ error: "Too many login attempts" }, { status: 429 })
    }
  }

  /* 4. Build response and add security headers */
  const response = NextResponse.next()
  addSecurityHeaders(response)

  /* 5. API-specific CORS: restrict admin API to same-origin only */
  if (pathname.startsWith("/api/admin/") || pathname === "/api/revalidate") {
    const origin = req.headers.get("origin")
    const host = req.headers.get("host")
    /* Block cross-origin requests to admin endpoints */
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match everything except static assets:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files with extensions
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|avif|woff2?)$).*)",
  ],
}
