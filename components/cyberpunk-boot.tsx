"use client"

import { useState, useEffect } from "react"

interface CyberpunkBootProps {
  onComplete: () => void
}

export function CyberpunkBoot({ onComplete }: CyberpunkBootProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Progress animation
  useEffect(() => {
    if (loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const increment = prev > 90 ? 2 : prev > 70 ? 3 : prev > 50 ? 4 : 5
          const newProgress = Math.min(prev + increment, 100)

          if (newProgress === 100) {
            setIsComplete(true)
            setTimeout(() => {
              onComplete()
            }, 1000)
          }

          return newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [loadingProgress, onComplete])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      {/* Background geometric pattern */}
      <div className="absolute inset-0">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 0, 0, 0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Diagonal lines */}
          <g stroke="rgba(255, 0, 0, 0.15)" strokeWidth="1" fill="none">
            <line x1="0" y1="0" x2="1920" y2="1080" />
            <line x1="0" y1="1080" x2="1920" y2="0" />
            <line x1="960" y1="0" x2="960" y2="1080" />
            <line x1="0" y1="540" x2="1920" y2="540" />
          </g>

          {/* Corner elements */}
          <g stroke="rgba(255, 0, 0, 0.3)" strokeWidth="2" fill="none">
            <rect x="50" y="50" width="30" height="30" />
            <rect x="1840" y="50" width="30" height="30" />
            <rect x="50" y="1000" width="30" height="30" />
            <rect x="1840" y="1000" width="30" height="30" />
          </g>
        </svg>
      </div>

      {/* Main loading interface */}
      <div className="relative z-10 w-[800px] h-[200px]">
        {/* Top decorative elements */}
        <div className="absolute -top-8 left-0 right-0 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-500/50 rounded-full"></div>
          </div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-red-500/50 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text and percentage */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-red-500 font-mono text-xl tracking-wider">LOADING</div>
          <div className="text-red-500 font-mono text-4xl font-bold">{loadingProgress}</div>
        </div>

        {/* Main loading bar container */}
        <div className="relative">
          {/* Side decorative elements */}
          <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-1 bg-red-500"></div>
              <div className="w-4 h-4 border-2 border-red-500 bg-red-500/20"></div>
              <div className="w-8 h-1 bg-red-500"></div>
            </div>
          </div>

          <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-1 bg-red-500"></div>
              <div className="w-4 h-4 border-2 border-red-500 bg-red-500/20"></div>
              <div className="w-8 h-1 bg-red-500"></div>
            </div>
          </div>

          {/* Loading bar background */}
          <div className="relative h-8 bg-zinc-900 border-2 border-red-500/30 overflow-hidden">
            {/* Progress fill with diagonal stripes */}
            <div
              className="h-full bg-gradient-to-r from-red-600 to-orange-500 relative transition-all duration-200 ease-out"
              style={{ width: `${loadingProgress}%` }}
            >
              {/* Diagonal stripe pattern */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 4px,
                    rgba(255, 255, 255, 0.2) 4px,
                    rgba(255, 255, 255, 0.2) 8px
                  )`,
                }}
              ></div>

              {/* Animated glow effect */}
              {loadingProgress > 0 && (
                <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-white/50 to-transparent animate-pulse"></div>
              )}
            </div>

            {/* Loading bar border glow */}
            <div className="absolute inset-0 border-2 border-red-500 pointer-events-none"></div>
          </div>
        </div>

        {/* Bottom status indicators */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border border-red-500 bg-red-500/20"></div>
              <div className="text-red-500/70 font-mono text-xs">22:42</div>
            </div>
            <div className="w-px h-4 bg-red-500/30"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border border-red-500 bg-red-500/20"></div>
              <div className="text-red-500/70 font-mono text-xs">47:39</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="w-3 h-3 border border-red-500 bg-red-500/20"></div>
            <div className="w-3 h-3 border border-red-500 bg-red-500/20"></div>
          </div>
        </div>

        {/* Additional UI elements */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-1 bg-red-500/50"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-8 h-1 bg-red-500/50"></div>
          </div>
        </div>
      </div>

      {/* Completion effect */}
      {isComplete && <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>}

      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 0, 0.1) 2px,
            rgba(255, 0, 0, 0.1) 4px
          )`,
        }}
      ></div>
    </div>
  )
}
