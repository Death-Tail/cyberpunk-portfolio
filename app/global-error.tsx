"use client"

import { useEffect, useState } from "react"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"


const generateId = () => {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

const errorId = generateId()


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [particles, setParticles] = useState<Array<{ left: number; delay: number; duration: number; width: number; height: number; rotation: number }>>([])

  useEffect(() => {
    console.error("Global error:", error)
    const particleData = Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 5,
      width: 8 + Math.random() * 12,
      height: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
    }))
    setParticles(particleData)
  }, [error])

  return (
    <html>
      <body className="bg-[#fffcf5] text-stone-900 font-sans select-none">
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
          {/* Warm Sunset Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-[#fff7ed] via-[#ffedd5] to-[#fecaca] -z-10" />

          {/* Floating Sunset Petals */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {particles.map((particle: { left: number; delay: number; duration: number; width: number; height: number; rotation: number }, i: number) => (
              <div
                key={i}
                className="absolute floating-petals"
                style={{
                  left: `${particle.left}%`,
                  top: `-10%`,
                  width: `${particle.width}px`,
                  height: `${particle.height}px`,
                  backgroundColor: i % 2 === 0 ? '#fb923c' : '#f87171',
                  borderRadius: '100% 0% 100% 0% / 100% 0% 100% 0%',
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                  transform: `rotate(${particle.rotation}deg)`,
                  opacity: 0.2,
                }}
              />
            ))}
          </div>

          <div className="
            w-full max-w-lg text-center
            bg-white/40 backdrop-blur-3xl
            border border-white/80
            rounded-4xl shadow-2xl relative
            p-12 ring-1 ring-white/60
          ">

            {/* Header */}
            <div className="mb-10">
              <div className="text-3xl font-black text-stone-950 tracking-tighter uppercase drop-shadow-sm">
                Harmonic Syncing
              </div>
              <p className="text-stone-800 font-bold text-sm mt-4 leading-relaxed max-w-75 mx-auto">
                A melodic fragment is currently vibrating out of sync.<br />
                Allow us to retune your experience.
              </p>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-10">
              <div className="
                h-24 w-24 flex items-center justify-center rounded-4xl
                bg-white shadow-inner border border-stone-50 relative
              ">
                <div className="absolute inset-0 bg-pink-400/10 animate-ping rounded-4xl" />
                <AlertTriangle className="w-12 h-12 text-pink-500 relative z-10 animate-pulse" />
              </div>
            </div>

            {/* Error Details */}
            <div className="bg-white/60 border border-white/60 rounded-3xl p-8 mb-10 text-left shadow-sm">
              <div className="text-[10px] text-stone-950/40 font-black mb-4 tracking-[0.4em] uppercase">
                COMPOSITION_LOG
              </div>

              <p className="text-sm text-stone-950 font-bold font-mono leading-relaxed break-all">
                {error.message || "Unknown harmonic anomaly."}
              </p>

              {error.digest && (
                <div className="mt-5 pt-5 border-t border-stone-100">
                  <p className="text-[10px] text-stone-950/30 font-black uppercase tracking-[0.2em]">
                    TOKEN: {error.digest}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={reset}
                className="
                  w-full flex items-center justify-center gap-4 py-5
                  bg-stone-950 text-white
                  rounded-2xl font-black text-xs tracking-[0.4em] uppercase
                  hover:bg-stone-800 transition-all shadow-[0_20px_40px_rgba(45,27,30,0.2)] active:scale-95
                "
              >
                <RefreshCw className="w-4 h-4 text-pink-400" />
                REALIGN NOTES
              </button>

              <Link
                href="/"
                className="
                  flex w-full items-center justify-center gap-4 py-5
                  bg-white border border-stone-100
                  rounded-2xl text-stone-950 font-black text-xs tracking-[0.4em] uppercase
                  hover:bg-pink-50 transition-all shadow-sm active:scale-95
                "
              >
                <Home className="w-4 h-4 text-amber-500" />
                RETURN HOME
              </Link>
            </div>

            {/* Error ID */}
            <div className="mt-10 text-[10px] text-stone-950/30 font-black uppercase tracking-[0.5em]">
              SYNC_ID: {errorId.split('-')[0].toUpperCase()}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
