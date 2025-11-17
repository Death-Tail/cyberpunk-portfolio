"use client"

import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useCallback } from "react"

interface BasePageProps {
  title: string
  onBack: () => void
  children: React.ReactNode
}

export default function BasePage({ title, onBack, children }: BasePageProps) {
  const handleBackClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onBack()
  }, [onBack])

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white p-4 overflow-hidden z-0">
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg.webp" // ← place your mobile vertical image here
          alt="Anime background"
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
      </div>



      {/* Header */}
      <div className="relative mb-6 z-20">
        <button
          onClick={handleBackClick}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-teal-400 hover:text-teal-300 transition-colors active:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-lg z-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="relative text-center">
          <div
            className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-teal-500/50 to-transparent"
            style={{ top: -8 }}
          />
          <h1 className="text-teal-400 font-bold tracking-wider drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
            {title}
          </h1>
          <div
            className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-teal-500/50 to-transparent"
            style={{ bottom: -8 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  )
}
