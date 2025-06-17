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
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Dramatic cyberpunk logo with glitch effect */}
      <div className="mb-8 relative select-none">
        <div className="text-4xl font-extrabold font-mono text-red-500 relative z-10 tracking-widest drop-shadow-lg uppercase" style={{letterSpacing: '0.2em'}}>
          CYBERPUNK OS
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="text-4xl font-extrabold font-mono text-cyan-500 opacity-20 absolute left-1 top-1 select-none" style={{filter: 'blur(1px)'}}>CYBERPUNK OS</div>
          <div className="text-4xl font-extrabold font-mono text-yellow-500 opacity-10 absolute left-2 top-2 select-none" style={{filter: 'blur(2px)'}}>CYBERPUNK OS</div>
        </div>
      </div>

      {/* Terminal-style boot text */}
      <div className="w-[480px] max-w-full bg-black/90 border border-red-700 rounded-lg shadow-2xl mb-8 overflow-hidden relative">
        <div className="bg-red-700/30 border-b border-red-700/50 p-2 flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-700 mr-2"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-600 mr-2"></div>
          <div className="w-2 h-2 rounded-full bg-green-700 mr-2"></div>
          <div className="text-xs text-red-400 font-mono tracking-widest">system_boot.sh</div>
        </div>
        <div className="p-4 font-mono text-xs text-green-400 h-32 overflow-hidden" style={{fontFamily: 'Fira Mono, monospace'}}>
          <span className="text-red-600">[BOOT]</span> Initializing neural interface...<br/>
          <span className="text-yellow-600">[SEC]</span> Loading encrypted modules...<br/>
          <span className="text-cyan-600">[NET]</span> Establishing secure uplink...<br/>
          <span className="text-green-600">[AUTH]</span> Authenticating user...<br/>
          <span className="text-green-500">[SYS]</span> System integrity: <span className="text-green-400">OK</span><br/>
          <span className="text-red-600">[ENV]</span> Launching desktop environment...
        </div>
      </div>

      {/* Progress bar with scanline and flicker */}
      <div className="w-72 h-2 bg-zinc-900 overflow-hidden mb-6 relative rounded shadow-inner border border-red-700">
        <div className="h-full bg-gradient-to-r from-red-700 via-yellow-600 to-cyan-700 transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" style={{opacity:0.3}}></div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-500/20 animate-[scanline_3s_linear_infinite]"></div>
      </div>
      <div className="text-red-400 text-xs font-mono mt-2 tracking-widest" style={{letterSpacing: '0.15em'}}>
        SYSTEM BOOTING<span className="text-red-600">...</span>
      </div>
      <div className="text-yellow-600 text-xs font-mono mt-4 text-center max-w-xs opacity-80" style={{fontWeight:600, letterSpacing:'0.1em'}}>
        Unauthorized access is strictly prohibited.<br/>All activities are monitored.<br/>Neural interface active.
      </div>
    </div>
  )
}
