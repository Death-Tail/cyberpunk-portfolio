"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, AlertTriangle, Zap, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { version } from "../package.json"

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404")
  const [scanLines, setScanLines] = useState(0)
  const [isScanning, setIsScanning] = useState(true)
  const [foxEyes, setFoxEyes] = useState(true)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: number; delay: number; duration: number; width: number; height: number; rotation: number }>>([])

  useEffect(() => {
    setMounted(true)
    const particleData = Array.from({ length: 25 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 5,
      width: 8 + Math.random() * 12,
      height: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
    }))
    setParticles(particleData)
  }, [])

  // Glitch effect for 404 text
  useEffect(() => {
    const glitchChars = ["4", "0", "4", "█", "▓", "▒", "░", "■", "□", "▪", "▫", "狐", "九", "尾"]
    const originalText = "404"

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const glitched = originalText
          .split("")
          .map((char) => (Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char))
          .join("")
        setGlitchText(glitched)

        setTimeout(() => setGlitchText(originalText), 100)
      }
    }, 500)

    return () => clearInterval(glitchInterval)
  }, [])

  // Fox eyes blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        setFoxEyes(false)
        setTimeout(() => setFoxEyes(true), 150)
      },
      3000 + Math.random() * 2000,
    )

    return () => clearInterval(blinkInterval)
  }, [])

  // Scanning animation
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLines((prev) => (prev + 1) % 100)
    }, 50)

    const scanTimeout = setTimeout(() => {
      setIsScanning(false)
    }, 3000)

    return () => {
      clearInterval(scanInterval)
      clearTimeout(scanTimeout)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#fffcf5] flex items-center justify-center p-4 overflow-hidden relative font-sans">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Warm Golden Sunset Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-[#fff7ed] via-[#ffedd5] to-[#fecaca] -z-10" />

        {/* Floating Sunset Petals */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {mounted &&
            particles.map((particle, i) => (
              <div
                key={i}
                className="absolute floating-petals"
                style={{
                  left: `${particle.left}%`,
                  top: `-10%`,
                  width: `${particle.width}px`,
                  height: `${particle.height}px`,
                  backgroundColor: i % 2 === 0 ? '#fb923c' : '#f87171',
                  borderRadius: '100% 0% 100% 0% / 100% 0% 100% 0%',
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                  transform: `rotate(${particle.rotation}deg)`,
                  opacity: 0.3,
                }}
              />
            ))}
        </div>

        {/* Organic Corner Accents */}
        <div className="absolute top-12 left-12 w-16 h-16 border-l-2 border-t-2 border-orange-200/60 rounded-tl-3xl shadow-inner animate-pulse" />
        <div className="absolute bottom-12 right-12 w-16 h-16 border-r-2 border-b-2 border-orange-200/60 rounded-br-3xl shadow-inner animate-pulse" />
      </div>

      {/* Main Content Grid Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Error Info */}
        <div className="space-y-10">
          {/* Piano-Key 404 */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block">
              <h1 className="text-8xl md:text-[10rem] font-black text-stone-950 tracking-tighter drop-shadow-xl">
                {glitchText}
              </h1>
              <div className="absolute -inset-1 text-orange-400/30 animate-pulse -z-10 blur-md">{glitchText}</div>
              <div className="absolute -inset-4 text-amber-200/20 animate-pulse delay-75 -z-20 blur-xl">{glitchText}</div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 mt-6">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" />
              <span className="text-stone-950 font-black text-[13px] tracking-[0.5em] uppercase opacity-40">Composition Error</span>
            </div>
          </div>

          {/* Error Terminal */}
          <div className="border border-stone-950/5 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/60">
            <div className="border-b border-stone-950/5 p-5 bg-white/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-orange-300 rounded-full" />
                <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                <div className="w-2.5 h-2.5 bg-rose-300 rounded-full" />
                <span className="text-stone-950/40 text-[9px] font-black uppercase tracking-[0.3em] ml-3 font-mono">Sunset_Lost.txt</span>
              </div>
            </div>

            <div className="p-10 space-y-6">
              <h2 className="text-3xl font-black text-stone-950 tracking-tight">MELODY_INTERRUPTED</h2>
              <div className="space-y-4 font-bold text-stone-800 leading-relaxed max-w-md">
                <p className="flex items-start gap-3">
                  <span className="text-orange-500 font-black">/</span>
                  The specific moment you seek has faded into the golden hour.
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-amber-500 font-black">/</span>
                  A musical note has been lost in the breeze.
                </p>
                <p className="flex items-start gap-3 opacity-40 italic text-xs font-medium">
                  Wait for the next sunrise?
                </p>
              </div>
            </div>
          </div>

          {/* Recovery Action */}
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-5 p-6 bg-stone-950 text-white rounded-2xl font-black text-xs tracking-[0.4em] uppercase hover:bg-stone-800 transition-all shadow-[0_20px_40px_rgba(45,27,30,0.2)] group active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-orange-400" />
            Return to the previous page
          </button>
        </div>

        {/* Right Side - Visual Area (Music Room Vibe) */}
        <div className="hidden lg:block relative group">
          <div className="absolute inset-0 bg-orange-200/20 rounded-[4rem] blur-3xl group-hover:bg-orange-300/30 transition-all duration-1000" />
          <div className="relative border border-white/80 bg-white/30 backdrop-blur-xl rounded-[4rem] p-12 overflow-hidden shadow-2xl">
            <div className="aspect-square flex items-center justify-center relative">
              <div className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-orange-400/20 to-transparent top-10" />
              <div className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-amber-400/20 to-transparent bottom-10" />

              <div className="text-center">
                <div className="w-72 h-72 mx-auto mb-10 relative">
                  <div className="absolute inset-0 bg-orange-400/10 rounded-full animate-pulse blur-3xl" />
                  <img
                    src="/L.jpg"
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-stone-950 font-black tracking-[0.6em] text-[11px] uppercase">Harmony_Lost</div>
                  <div className="text-stone-400 font-black text-[9px] uppercase tracking-[0.3em]">Drifting into the void</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative bits */}
          <div className="absolute -top-6 -right-6 w-20 h-20 border-r-2 border-t-2 border-orange-400/40 rounded-tr-[3rem]" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 border-l-2 border-b-2 border-amber-400/40 rounded-bl-[3rem]" />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 left-0 right-0 text-center space-y-2 opacity-40">
        <div className="text-stone-950 font-black text-[10px] uppercase tracking-[0.5em]">
          Memory Protocol v{version} | Echo 404
        </div>
        <div className="text-stone-950 font-black text-[8px] uppercase tracking-[0.3em] font-mono">
          SN: {mounted ? Date.now().toString(16).toUpperCase() : "SYNCING"}
        </div>
      </div>
    </div>
  )
}
