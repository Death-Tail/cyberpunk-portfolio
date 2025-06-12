"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [bootStage, setBootStage] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [bootText, setBootText] = useState<string[]>([])
  const [glitchActive, setGlitchActive] = useState(false)

  // Boot sequence text lines
  const bootSequenceText = [
    "CYBERPUNK OS v2.077",
    "INITIALIZING SYSTEM KERNEL...",
    "LOADING NEURAL INTERFACE...",
    "ESTABLISHING SECURE CONNECTION...",
    "SCANNING FOR THREATS...",
    "LOADING USER PROFILE: LINGREED",
    "MOUNTING VIRTUAL FILESYSTEMS...",
    "INITIALIZING DESKTOP ENVIRONMENT...",
    "SYSTEM READY",
  ]

  // Simulate typing effect for terminal text
  useEffect(() => {
    if (bootStage < bootSequenceText.length) {
      const timer = setTimeout(
        () => {
          setBootText((prev) => [...prev, bootSequenceText[bootStage]])
          setBootStage((prev) => prev + 1)

          // Trigger random glitch effects
          if (Math.random() > 0.7) {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 150)
          }
        },
        bootStage === 0 ? 500 : Math.random() * 500 + 300,
      )

      return () => clearTimeout(timer)
    }
  }, [bootStage])

  // Progress bar animation
  useEffect(() => {
    if (loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          // Accelerate loading near the end
          const increment = prev > 80 ? 5 : prev > 60 ? 3 : 1
          return Math.min(prev + increment, 100)
        })
      }, 80)

      return () => clearInterval(interval)
    } else if (bootStage >= bootSequenceText.length) {
      // Complete boot sequence after text is done and loading is 100%
      const timer = setTimeout(() => {
        onComplete()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [loadingProgress, bootStage, bootSequenceText.length, onComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-1000",
        bootStage >= bootSequenceText.length && loadingProgress >= 100 ? "opacity-0" : "opacity-100",
      )}
    >
      {/* Cyberpunk logo */}
      <div className="mb-8 relative">
        <div
          className={cn(
            "text-4xl font-bold font-mono text-red-500 relative z-10",
            glitchActive && "animate-[glitch_0.2s_ease-in-out]",
          )}
        >
          CYBERPUNK OS
        </div>

        {/* Logo glitch effects */}
        {glitchActive && (
          <>
            <div
              className="text-4xl font-bold font-mono text-cyan-500 absolute top-0 left-0 opacity-70 z-0"
              style={{ transform: "translate(-2px, 2px)" }}
            >
              CYBERPUNK OS
            </div>
            <div
              className="text-4xl font-bold font-mono text-yellow-500 absolute top-0 left-0 opacity-70 z-0"
              style={{ transform: "translate(2px, -2px)" }}
            >
              CYBERPUNK OS
            </div>
          </>
        )}
      </div>

      {/* Terminal window */}
      <div className="w-[600px] h-[300px] bg-black border-2 border-red-600 mb-6 overflow-hidden relative">
        {/* Terminal header */}
        <div className="bg-red-600/20 border-b border-red-600/50 p-2 flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <div className="text-xs text-red-400 font-mono">system_boot.sh</div>
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-sm text-green-500 h-[calc(100%-36px)] overflow-hidden">
          {bootText.map((line, index) => (
            <div
              key={index}
              className={cn("mb-1", index === bootText.length - 1 && "border-r-2 border-green-500 animate-pulse pr-1")}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Scan lines effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)",
            backgroundSize: "100% 2px",
            opacity: 0.3,
          }}
        ></div>

        {/* Random glitch blocks */}
        {glitchActive && (
          <>
            <div
              className="absolute h-1 bg-cyan-500/50"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0,
              }}
            ></div>
            <div
              className="absolute w-10 h-4 bg-red-500/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-[600px] h-2 bg-zinc-900 overflow-hidden mb-2 relative">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-cyan-500 transition-all duration-100"
          style={{ width: `${loadingProgress}%` }}
        ></div>

        {/* Loading flicker effect */}
        {loadingProgress > 0 && loadingProgress < 100 && Math.random() > 0.7 && (
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        )}
      </div>

      {/* Progress percentage */}
      <div className="text-red-500 font-mono text-sm mb-8 flex items-center">
        <span className="mr-2">SYSTEM INITIALIZATION:</span>
        <span className={loadingProgress === 100 ? "text-green-500" : ""}>{loadingProgress}%</span>
        {loadingProgress === 100 && <span className="ml-2 text-green-500">COMPLETE</span>}
      </div>

      {/* Warning message */}
      <div className="text-yellow-500 text-xs font-mono max-w-[600px] text-center">
        WARNING: UNAUTHORIZED ACCESS DETECTED. ALL ACTIVITIES ARE BEING MONITORED.
        <br />
        NEURAL INTERFACE ACTIVE. PROCEED WITH CAUTION.
      </div>
    </div>
  )
}
