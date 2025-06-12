"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  glitchColors?: string[]
}

export function GlitchText({ text, className, glitchColors = ["#dc2626", "#b91c1c", "#fca5a5"] }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <span className="relative z-10">{text}</span>

      {isGlitching && (
        <>
          <span
            className="absolute inset-0 z-0 opacity-70"
            style={{
              color: glitchColors[0],
              transform: "translate(-2px, 1px)",
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 z-0 opacity-70"
            style={{
              color: glitchColors[1],
              transform: "translate(2px, -1px)",
              clipPath: "polygon(0 45%, 100% 45%, 100% 75%, 0 75%)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  )
}
