"use client"

import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useCallback } from "react"
import bgImg from "@/public/bgM.jpg"
import { GlitchText } from "../glitch-text"

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
    <div className="relative min-h-screen p-4 overflow-hidden z-0 font-sans">
      <div className="fixed inset-0 z-0">
        <Image
          src={bgImg}
          alt="Anime background"
          placeholder="blur"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#fffcf5]/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-b from-[#fffcf5]/20 via-transparent to-[#fecaca]/10" />
      </div>

      {/* Header */}
      <div className="relative mb-10 z-20 pt-4">
        <button
          onClick={handleBackClick}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-stone-950 hover:bg-white/40 transition-all active:scale-90 focus:outline-none rounded-full z-50 border border-transparent hover:border-white/60 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="relative text-center">
          <div
            className="absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-pink-400/40 to-transparent"
            style={{ top: -12 }}
          />
          <h1 className="text-2xl font-black text-stone-950 tracking-tighter uppercase drop-shadow-sm">
            {title}
          </h1>
          <div className="flex justify-center gap-1 mt-1 opacity-20">
            <div className="w-1 h-1 bg-stone-950 rounded-full" />
            <div className="w-8 h-px bg-stone-950 self-center" />
            <div className="w-1 h-1 bg-stone-950 rounded-full" />
          </div>
          <div
            className="absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-amber-400/40 to-transparent"
            style={{ bottom: -12 }}
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
