"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, getSession } from "@/lib/supabase/admin"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  /* If already logged in, redirect straight to dashboard */
  useEffect(() => {
    getSession().then(({ data }) => {
      if (data.session) router.replace("/admin/dashboard")
      else setChecking(false)
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error: authError } = await signIn(email, password)

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      router.replace("/admin/dashboard")
    }
  }

  if (checking) {
    return (
      <main className="fixed inset-0 bg-ink text-bone grid place-items-center grain">
        <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute animate-pulse">
          Checking session…
        </span>
      </main>
    )
  }

  return (
    <main className="fixed inset-0 bg-ink text-bone overflow-hidden grain">
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_120%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_75%_20%,rgba(217,119,87,0.10),transparent_60%)]" />

      {/* Kana stamp */}
      <span className="kana-stamp z-0 select-none" style={{ top: "-5rem", right: "-4rem" }}>管</span>

      <div className="relative z-10 h-full grid place-items-center px-6">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-ember" />
            <span className="eyebrow text-ember!">Admin · 管理</span>
          </div>

          <h1 className="font-display text-bone text-[2.5rem] leading-[0.95] mb-2">
            Archive<span className="text-ember">.</span>
          </h1>
          <p className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute mb-10">
            SHIN<span className="text-ember">尾</span> · CMS Access
          </p>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="eyebrow block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-ink-2 border border-line-strong text-bone font-mono-tight text-sm px-4 py-3 focus:border-ember focus:outline-none transition-colors placeholder:text-bone-mute/40"
                placeholder="email"
              />
            </div>

            <div>
              <label className="eyebrow block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-ink-2 border border-line-strong text-bone font-mono-tight text-sm px-4 py-3 focus:border-ember focus:outline-none transition-colors placeholder:text-bone-mute/40"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="font-mono-tight text-[11px] text-ember bg-ember-glow border border-line-ember px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ember text-bone font-mono-tight text-[11px] uppercase tracking-[0.3em] py-3.5 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Authenticating…" : "Enter the Archive"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a
              href="/"
              className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute hover:text-ember transition-colors"
            >
              ← back to site
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 h-6 border-t border-line flex items-center px-8 lg:px-12 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-bone-mute bg-ink/70 backdrop-blur-sm">
        <span className="text-bone-dim">ADM</span>
        <span className="mx-3 text-bone-mute/40">/</span>
        <span>管</span>
        <span className="mx-3 text-bone-mute/40">·</span>
        <span className="text-bone-dim">AUTHENTICATION</span>
        <span className="ml-auto hidden md:inline">DYARI ALI TAHIR · 2026</span>
      </footer>
    </main>
  )
}
