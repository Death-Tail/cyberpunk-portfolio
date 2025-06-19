"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

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
      <body className="bg-black text-red-400 font-mono">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Error Animation */}
            <div className="mb-8">
              <div className="text-6xl font-bold text-red-500 mb-4 animate-pulse">SYSTEM ERROR</div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <AlertTriangle className="w-6 h-6 text-yellow-400 animate-bounce" />
                <span className="text-yellow-400 text-sm tracking-wider">CRITICAL_FAILURE</span>
                <AlertTriangle className="w-6 h-6 text-yellow-400 animate-bounce" />
              </div>
            </div>

            {/* Error Details */}
            <div className="border border-red-600/30 bg-red-600/5 p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-red-600 mr-2"></div>
                <span className="text-red-500 text-xs tracking-wider">SYSTEM_DIAGNOSTIC</span>
              </div>

              <h1 className="text-xl font-bold text-red-400 mb-4">NEURAL INTERFACE MALFUNCTION</h1>

              <div className="text-red-400/80 text-sm space-y-2">
                <p>
                  <span className="text-yellow-500">&gt;</span> Critical system error detected
                </p>
                <p>
                  <span className="text-blue-500">&gt;</span> Error: {error.message || "Unknown system failure"}
                </p>
                {error.digest && (
                  <p>
                    <span className="text-green-500">&gt;</span> Digest: {error.digest}
                  </p>
                )}
              </div>
            </div>

            {/* Recovery Options */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-blue-500 mr-2"></div>
                <span className="text-blue-400 text-xs tracking-wider">RECOVERY_PROTOCOLS</span>
              </div>

              <div className="grid gap-3">
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-3 p-4 border border-green-500/30 bg-green-500/5 text-green-400 hover:bg-green-500/10 transition-all duration-300 group"
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-sm tracking-wide">RESTART SYSTEM</span>
                </button>

                <Link
                  href="/"
                  className="flex items-center justify-center gap-3 p-4 border border-blue-500/30 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 group"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm tracking-wide">RETURN TO BASE</span>
                </Link>
              </div>
            </div>

            {/* Error ID */}
            <div className="mt-8 text-center">
              <div className="text-red-400/60 text-xs">ERROR_ID: {Date.now().toString(16).toUpperCase()}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
