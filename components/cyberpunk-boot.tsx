"use client"

import { useState, useEffect } from "react"

interface SimpleBootProps {
  onComplete: () => void
}

export function CyberpunkBoot({ onComplete }: SimpleBootProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([])

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const particleData = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
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
      }, 120)

      return () => clearInterval(interval)
    }
  }, [showLogo, loadingProgress, onComplete])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Animated circuit lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal lines */}
          <line x1="0" y1="200" x2="1000" y2="200" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="x2" values="0;1000;0" dur="8s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="400" x2="1000" y2="400" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="x2" values="1000;0;1000" dur="6s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="600" x2="1000" y2="600" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="x2" values="0;1000;0" dur="10s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="800" x2="1000" y2="800" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="x2" values="1000;0;1000" dur="7s" repeatCount="indefinite" />
          </line>

          {/* Vertical lines */}
          <line x1="200" y1="0" x2="200" y2="1000" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="y2" values="0;1000;0" dur="9s" repeatCount="indefinite" />
          </line>
          <line x1="500" y1="0" x2="500" y2="1000" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="y2" values="1000;0;1000" dur="5s" repeatCount="indefinite" />
          </line>
          <line x1="800" y1="0" x2="800" y2="1000" stroke="url(#lineGradient)" strokeWidth="1">
            <animate attributeName="y2" values="0;1000;0" dur="11s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            >
              <div className="w-full h-full bg-red-400/50 rounded-full animate-ping"></div>
            </div>
          ))}
        </div>

        {/* Geometric shapes */}
        <div
          className="absolute top-10 left-10 w-32 h-32 border border-red-600/20 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-red-500/15 rotate-12 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-10 w-16 h-16 border-2 border-red-600/25 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute bottom-1/3 left-20 w-20 h-20 border border-red-400/20 transform rotate-45 animate-pulse"></div>


        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Diagonal lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-red-500 to-transparent transform rotate-12 origin-left"></div>
          <div className="absolute top-20 left-0 w-full h-px bg-linear-to-r from-transparent via-red-400 to-transparent transform -rotate-12 origin-left"></div>
          <div className="absolute bottom-20 left-0 w-full h-px bg-linear-to-r from-transparent via-red-600 to-transparent transform rotate-6 origin-left"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 max-w-sm w-full">
        {/* Logo container */}
        <div
          className={`relative transition-all duration-1000 ease-out ${
            showLogo ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
          }`}
        >
          <div className="relative">
            {/* Enhanced glow effect behind logo */}
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl scale-150 animate-pulse"></div>
            <div className="absolute inset-0 bg-red-400/10 rounded-full blur-2xl scale-200 animate-pulse delay-500"></div>

            {/* Logo */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
              <img src="/Logop.webp" alt="Logo" className="object-contain drop-shadow-2xl" />
            </div>

            {/* Orbiting elements around logo */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s" }}>
              <div className="absolute -top-2 left-1/2 w-2 h-2 bg-red-500/60 rounded-full transform -translate-x-1/2"></div>
            </div>
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "12s", animationDirection: "reverse" }}
            >
              <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-red-400/60 rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Loading section */}
        <div
          className={`w-full space-y-4 transition-all duration-1000 delay-500 ${
            showLogo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Progress bar */}
          <div className="w-full space-y-2">
            <div className="w-full h-1 bg-zinc-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-red-900/20">
              <div
                className="h-full bg-linear-to-r from-red-600 via-red-500 to-red-400 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                <div className="absolute right-0 top-0 w-4 h-full bg-white/40 blur-sm rounded-full"></div>
              </div>
            </div>

            {/* Progress text */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-red-400/70 font-medium">{isComplete ? "Ready" : "Loading..."}</span>
              <span className="text-red-400 font-mono">{loadingProgress}%</span>
            </div>
          </div>

          {/* Status message */}
          <div className="text-center">
            <p className="text-red-300/80 text-sm font-light tracking-wide">
              {isComplete
                ? "Welcome back"
                : loadingProgress > 80
                  ? "Almost ready..."
                  : loadingProgress > 50
                    ? "Loading interface..."
                    : "Starting up..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
