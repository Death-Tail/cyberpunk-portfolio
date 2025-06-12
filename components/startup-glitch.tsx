"use client"

import { useEffect, useState } from "react"

export function StartupGlitch() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Hide the glitch effect after the boot sequence
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Random glitch blocks */}
      <div className="absolute top-1/4 left-0 right-0 h-1 bg-cyan-500/50 animate-[scanline_3s_linear_infinite]"></div>
      <div className="absolute top-3/4 left-0 right-0 h-2 bg-red-500/30 animate-[scanline_5s_linear_infinite]"></div>

      {/* Flicker effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-[flicker_0.3s_ease-in-out_infinite]"></div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  )
}
