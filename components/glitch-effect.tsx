"use client"

import { useState, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlitchEffectProps {
  children: ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
}

export function GlitchEffect({ children, className, intensity = "medium" }: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchStyle, setGlitchStyle] = useState({})

  useEffect(() => {
    // Set up glitch intervals based on intensity
    let minInterval = 5000
    let maxInterval = 10000
    let minDuration = 100
    let maxDuration = 300

    switch (intensity) {
      case "low":
        minInterval = 7000
        maxInterval = 15000
        minDuration = 50
        maxDuration = 150
        break
      case "high":
        minInterval = 2000
        maxInterval = 6000
        minDuration = 150
        maxDuration = 500
        break
    }

    // Random glitch effect
    const scheduleNextGlitch = () => {
      const nextGlitchIn = minInterval + Math.random() * (maxInterval - minInterval)

      const glitchTimeout = setTimeout(() => {
        // Create random glitch effect
        const glitchType = Math.floor(Math.random() * 4)

        switch (glitchType) {
          case 0: // RGB split
            setGlitchStyle({
              textShadow: `
                2px 0 0 rgba(255, 0, 255, 0.7),
                -2px 0 0 rgba(0, 255, 224, 0.7),
                0 0 3px rgba(57, 255, 20, 0.7)
              `,
              transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
            })
            break
          case 1: // Horizontal shift
            setGlitchStyle({
              transform: `translateX(${Math.random() * 8 - 4}px)`,
              filter: "brightness(1.2) contrast(1.2)",
            })
            break
          case 2: // Vertical shift
            setGlitchStyle({
              transform: `translateY(${Math.random() * 8 - 4}px)`,
              filter: "hue-rotate(25deg)",
            })
            break
          case 3: // Scale glitch
            setGlitchStyle({
              transform: `scale(${1 + (Math.random() * 0.1 - 0.05)})`,
              filter: "brightness(1.3)",
            })
            break
        }

        setIsGlitching(true)

        // End glitch effect
        const glitchDuration = minDuration + Math.random() * (maxDuration - minDuration)
        setTimeout(() => {
          setIsGlitching(false)
          setGlitchStyle({})
          scheduleNextGlitch()
        }, glitchDuration)
      }, nextGlitchIn)

      return () => clearTimeout(glitchTimeout)
    }

    const cleanup = scheduleNextGlitch()
    return cleanup
  }, [intensity])

  return (
    <div className={cn("relative transition-all duration-100", className)} style={isGlitching ? glitchStyle : {}}>
      {children}

      {isGlitching && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse pointer-events-none"></div>
      )}
    </div>
  )
}
