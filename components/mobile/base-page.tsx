"use client"

import { ArrowLeft } from "lucide-react"
import { useCallback } from "react"

interface BasePageProps {
  title: string
  onBack: () => void
  children: React.ReactNode
}

export default function BasePage({ title, onBack, children }: BasePageProps) {
  // Use useCallback to memoize the click handler to prevent unnecessary re-renders
  const handleBackClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()  // Prevent any default behavior
    e.stopPropagation() // Stop event bubbling
    onBack()
  }, [onBack])

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white p-4">
      {/* Neural network background */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.4) 1px, transparent 0),
              linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px",
          }}
        />
      </div>

      {/* Scan lines effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(220, 38, 38, 0.3) 2px,
            rgba(220, 38, 38, 0.3) 4px
          )`,
        }}
      />

      {/* Header */}
      <div className="relative mb-6">
        <button
          onClick={handleBackClick}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors active:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded-lg z-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="relative text-center">
          <div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
            style={{ top: -8 }}
          />
          <h1 className="text-red-400 font-bold tracking-wider">{title}</h1>
          <div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
            style={{ bottom: -8 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  )
}
