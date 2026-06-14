"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="fixed inset-0 bg-ink text-bone overflow-hidden grain">
      {/* Vignette + warm/cool radials */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_120%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_75%_25%,rgba(217,119,87,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_85%,rgba(106,144,152,0.08),transparent_70%)]" />

      {/* HUD corners */}
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

      {/* Decorative kana */}
      <span
        className="kana-stamp z-0 select-none"
        style={{ top: "-4rem", right: "-4rem", color: "var(--color-ember)" }}
      >
        失
      </span>

      <div className="relative z-10 h-full grid place-items-center px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-ember" />
            <span className="eyebrow text-ember!">Error · 404 · 迷</span>
          </div>

          <h1 className="font-display text-bone text-[6rem] lg:text-[9rem] leading-[0.85] mb-8 tabular-nums">
            4<span className="text-ember">0</span>4<span className="text-ember">.</span>
          </h1>

          <p className="font-display italic text-amber text-2xl lg:text-3xl leading-tight mb-3">
            You wandered off the page.
          </p>

          <p className="font-sans text-bone-dim text-[14px] leading-[1.75] max-w-md mb-12">
            The chapter you&apos;re looking for isn&apos;t in this archive — maybe it was renamed,
            maybe it was never written. Try the index, or go back the way you came.
          </p>

          <div className="flex items-center gap-8 flex-wrap">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-3 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone hover:text-amber transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span className="relative pb-1">
                Go back
                <span className="absolute left-0 bottom-0 h-px w-full bg-amber" />
              </span>
            </button>

            <Link
              href="/"
              className="group inline-flex items-center gap-3 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone-mute hover:text-ember transition-colors"
            >
              <span>Return to the archive</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom status strip */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 h-6 border-t border-line flex items-center px-8 lg:px-12 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-bone-mute bg-ink/70 backdrop-blur-sm">
        <span className="text-bone-dim">XX</span>
        <span className="mx-3 text-bone-mute/40">/</span>
        <span>迷</span>
        <span className="mx-3 text-bone-mute/40">·</span>
        <span className="text-bone-dim">PAGE NOT FOUND</span>
        <span className="ml-auto hidden md:inline">DYARI ALI TAHIR · 2026</span>
      </footer>
    </main>
  )
}
