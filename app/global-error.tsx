"use client"

import { useEffect } from "react"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"

const errorId = globalThis.crypto.randomUUID()

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
    <html>
      <body className="bg-black text-white">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="
            w-full max-w-lg text-center
            bg-zinc-900/40 backdrop-blur-xl
            border border-white/10
            rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.4)]
            p-8 relative
          ">

            {/* Soft glowing orb background */}
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-teal-600/20 to-emerald-500/10 blur-3xl" />

            {/* Header */}
            <div className="mb-6">
              <div className="text-3xl font-bold text-white drop-shadow-lg">
                Something Went Wrong
              </div>
              <p className="text-teal-400/80 text-sm mt-2">
                The system encountered an unexpected problem
              </p>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="
                h-20 w-20 flex items-center justify-center rounded-2xl
                bg-zinc-900/70 border border-white/5
                shadow-[0_0_20px_rgba(0,255,200,0.08)]
              ">
                <AlertTriangle className="w-10 h-10 text-teal-400 animate-pulse" />
              </div>
            </div>

            {/* Error Details */}
            <div className="bg-black/30 border border-white/10 rounded-2xl p-5 mb-8 text-left">
              <div className="text-xs text-teal-400/70 mb-3 tracking-wider">
                ERROR DETAILS
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {error.message || "Unknown error occurred."}
              </p>

              {error.digest && (
                <p className="text-xs text-zinc-500 mt-3">
                  DIGEST: {error.digest}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={reset}
                className="
                  w-full flex items-center justify-center gap-2 py-3
                  bg-teal-500/10 border border-teal-500/20
                  rounded-xl text-teal-400
                  hover:bg-teal-500/20 transition-all duration-300
                  shadow-[0_0_15px_rgba(0,255,200,0.05)]
                "
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Try Again</span>
              </button>

              <Link
                href="/"
                className="
                  flex w-full items-center justify-center gap-2 py-3
                  bg-zinc-800/40 border border-white/10
                  rounded-xl text-white
                  hover:bg-zinc-700/40 transition-all duration-300
                "
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Go Home</span>
              </Link>
            </div>

            {/* Error ID */}
            <div className="mt-6 text-xs text-zinc-500">
              ERROR ID: {errorId}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
