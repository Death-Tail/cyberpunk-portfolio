"use client"

import { useState, useEffect } from "react"
import { version } from "../package.json"

interface SimpleBootProps {
  onComplete: () => void
}

export function CyberpunkBoot({ onComplete }: SimpleBootProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number; width: number; height: number; rotation: number }>>([])

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const particleData = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      width: Math.random() * 12 + 8,
      height: Math.random() * 10 + 6,
      rotation: Math.random() * 360,
    }))
    setParticles(particleData)
  }, [])

  // Show logo after initial delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Progress animation
  useEffect(() => {
    if (showLogo && loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const increment = prev > 85 ? 5 : prev > 60 ? 7 : 9
          const newProgress = Math.min(prev + increment, 100)

          if (newProgress === 100) {
            setIsComplete(true)
            setTimeout(() => {
              onComplete()
            }, 800)
          }

          return newProgress
        })
      }, 80)

      return () => clearInterval(interval)
    }
  }, [showLogo, loadingProgress, onComplete])

  return (
    <div className="fixed inset-0 bg-memory-white flex flex-col items-center justify-center p-4 overflow-hidden font-sans select-none">
      {/* Warm Music Room Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#fff5f5] via-[#ffedd5] to-[#fecaca] -z-10" />

      {/* Animated Sunbeams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[repeating-linear-gradient(45deg,transparent,transparent_100px,rgba(251,191,36,0.1)_110px,rgba(251,191,36,0.1)_150px,transparent_160px)] animate-[pulse_8s_infinite] mix-blend-overlay" />
      </div>

      {/* Floating Sunset Petals */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute floating-petals"
            style={{
              left: `${particle.left}%`,
              top: `-10%`,
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              backgroundColor: i % 2 === 0 ? '#fb923c' : '#fca5a5',
              borderRadius: '100% 0% 100% 0% / 100% 0% 100% 0%',
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration + 4}s`,
              transform: `rotate(${particle.rotation}deg)`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-16 max-w-sm w-full">
        {/* Logo container */}
        <div
          className={`relative transition-all duration-700 ease-out ${showLogo ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-12"
            }`}
        >
          <div className="relative group">
            {/* warm golden glow behind logo */}
            <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-3xl scale-150 animate-pulse" />

            {/* Logo */}
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 drop-shadow-[0_20px_50px_rgba(45,27,30,0.15)] transition-transform duration-1000 group-hover:scale-105">
              <img src="/ll.webp" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* Loading section */}
        <div
          className={`w-full space-y-8 transition-all duration-500 delay-300 ${showLogo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {/* Progress bar */}
          <div className="w-full space-y-4">
            <div className="w-full h-1.5 bg-stone-950/5 rounded-full overflow-hidden backdrop-blur-sm border border-stone-950/5 relative">
              <div
                className="h-full bg-linear-to-r from-orange-400 via-amber-400 to-orange-400 rounded-full transition-all duration-300 ease-out relative shadow-[0_0_10px_rgba(251,146,60,0.4)]"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
              </div>
            </div>

            {/* Progress text */}
            <div className="flex justify-between items-center text-[10px] font-black tracking-[0.4em] text-stone-950/40 uppercase">
              <span>{isComplete ? "Composition Ready" : "Aligning Harmony..."}</span>
              <span className="font-mono tabular-nums">{loadingProgress}%</span>
            </div>
          </div>

          {/* Status message */}
          <div className="text-center">
            <p className="text-stone-950 font-black text-[11px] tracking-[0.3em] uppercase opacity-60 animate-pulse">
              {isComplete
                ? "Welcome Home"
                : loadingProgress > 80
                  ? "Finding the last note..."
                  : loadingProgress > 50
                    ? "Synchronizing Memories..."
                    : "Lighting the room..."}
            </p>
          </div>
        </div>
      </div>

      {/* Fine text at bottom */}
      <div className="absolute bottom-12 flex items-center gap-6 opacity-30">
        <div className="h-px w-8 bg-stone-950" />
        <div className="text-[9px] font-black text-stone-950 uppercase tracking-[0.5em]">
          Memory Protocol v{version}
        </div>
        <div className="h-px w-8 bg-stone-950" />
      </div>
    </div>
  )
}
