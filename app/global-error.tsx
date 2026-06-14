"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RefreshCw, Home } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-ink text-bone font-sans antialiased">
        <main className="fixed inset-0 bg-ink text-bone overflow-hidden grain">
          {/* Vignette + radials */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_120%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_75%_25%,rgba(217,119,87,0.10),transparent_60%)]" />

          {/* HUD corners */}
          <div className="hud-corner tl" />
          <div className="hud-corner tr" />
          <div className="hud-corner bl" />
          <div className="hud-corner br" />

          {/* Decorative kana */}
          <span
            className="kana-stamp z-0 select-none"
            style={{ top: "-3rem", right: "-3rem", color: "var(--color-ember)" }}
          >
            乱
          </span>

          <div className="relative z-10 h-full grid place-items-center px-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-ember" />
                <span className="eyebrow text-ember!">Fatal · 乱 · System</span>
              </div>

              <h1 className="font-display text-bone text-[3.5rem] lg:text-[5rem] leading-[0.92] mb-6">
                Something broke<span className="text-ember">.</span>
              </h1>

              <p className="font-display italic text-amber text-xl lg:text-2xl leading-tight mb-3">
                The archive caught fire for a second.
              </p>

              <p className="font-sans text-bone-dim text-[13px] leading-[1.75] max-w-md mb-8">
                A page failed to render. You can try reloading the section, or return to the
                index and start fresh. If this keeps happening, it&apos;s a real bug — feel free to flag it.
              </p>

              {/* Error capsule */}
              <div className="surface-ink-2 border border-line p-5 mb-10 max-w-lg">
                <div className="eyebrow mb-2">Log</div>
                <p className="font-mono-tight text-[11px] text-bone-dim leading-relaxed break-all">
                  {error.message || "Unknown error."}
                </p>
                {error.digest && (
                  <div className="mt-3 pt-3 border-t border-line">
                    <span className="font-mono-tight text-[9px] uppercase tracking-[0.25em] text-bone-mute">
                      Digest · <span className="text-bone-dim">{error.digest}</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-8 flex-wrap">
                <button
                  onClick={reset}
                  className="group inline-flex items-center gap-3 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone hover:text-amber transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="relative pb-1">
                    Try again
                    <span className="absolute left-0 bottom-0 h-px w-full bg-amber" />
                  </span>
                </button>

                <Link
                  href="/"
                  className="group inline-flex items-center gap-3 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone-mute hover:text-ember transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Return to the archive</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <footer className="absolute bottom-0 left-0 right-0 z-20 h-6 border-t border-line flex items-center px-8 lg:px-12 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-bone-mute bg-ink/70 backdrop-blur-sm">
            <span className="text-bone-dim">!!</span>
            <span className="mx-3 text-bone-mute/40">/</span>
            <span>乱</span>
            <span className="mx-3 text-bone-mute/40">·</span>
            <span className="text-bone-dim">UNHANDLED EXCEPTION</span>
            <span className="ml-auto hidden md:inline">DYARI ALI TAHIR · 2026</span>
          </footer>
        </main>
      </body>
    </html>
  )
}
