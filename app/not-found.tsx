"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, AlertTriangle, Zap, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404")
  const [scanLines, setScanLines] = useState(0)
  const [isScanning, setIsScanning] = useState(true)
  const [foxEyes, setFoxEyes] = useState(true)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

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

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Hexagonal Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25px 25px, rgba(220, 38, 38, 0.4) 2px, transparent 2px),
              radial-gradient(circle at 75px 75px, rgba(234, 179, 8, 0.3) 1px, transparent 1px),
              linear-gradient(45deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px, 100px 100px, 25px 25px",
          }}
        />

        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Animated Neural Pathways */}
          <path d="M0,200 Q250,100 500,200 T1000,200" stroke="url(#redGradient)" strokeWidth="3" fill="none">
            <animate
              attributeName="d"
              values="M0,200 Q250,100 500,200 T1000,200;M0,200 Q250,300 500,200 T1000,200;M0,200 Q250,100 500,200 T1000,200"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M0,500 Q250,400 500,500 T1000,500" stroke="url(#yellowGradient)" strokeWidth="2" fill="none">
            <animate
              attributeName="d"
              values="M0,500 Q250,400 500,500 T1000,500;M0,500 Q250,600 500,500 T1000,500;M0,500 Q250,400 500,500 T1000,500"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M0,800 Q250,700 500,800 T1000,800" stroke="url(#blueGradient)" strokeWidth="2" fill="none">
            <animate
              attributeName="d"
              values="M0,800 Q250,700 500,800 T1000,800;M0,800 Q250,900 500,800 T1000,800;M0,800 Q250,700 500,800 T1000,800"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>

          {/* Vertical Neural Lines */}
          <path d="M200,0 Q100,250 200,500 T200,1000" stroke="url(#redGradient)" strokeWidth="2" fill="none">
            <animate
              attributeName="d"
              values="M200,0 Q100,250 200,500 T200,1000;M200,0 Q300,250 200,500 T200,1000;M200,0 Q100,250 200,500 T200,1000"
              dur="9s"
              repeatCount="indefinite"
            />
          </path>
          <path d="M800,0 Q700,250 800,500 T800,1000" stroke="url(#blueGradient)" strokeWidth="2" fill="none">
            <animate
              attributeName="d"
              values="M800,0 Q700,250 800,500 T800,1000;M800,0 Q900,250 800,500 T800,1000;M800,0 Q700,250 800,500 T800,1000"
              dur="11s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* Floating Data Particles */}
        <div className="absolute inset-0">
          {mounted &&
            Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full animate-pulse ${
                  i % 3 === 0 ? "bg-teal-500/40" : i % 3 === 1 ? "bg-yellow-500/40" : "bg-blue-500/40"
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              >
                <div className="w-full h-full rounded-full animate-ping"></div>
              </div>
            ))}
        </div>

        {/* Scanning Lines */}
        {isScanning && (
          <>
            <div
              className="absolute left-0 w-full h-0.5 bg-linear-to-r from-transparent via-teal-500 to-transparent opacity-80 transition-all duration-75"
              style={{ top: `${scanLines}%` }}
            />
            <div
              className="absolute left-0 w-full h-0.5 bg-linear-to-r from-transparent via-yellow-500/60 to-transparent opacity-60 transition-all duration-75"
              style={{ top: `${(scanLines + 10) % 100}%` }}
            />
          </>
        )}

        {/* Corner Fox Markers */}
        <div className="absolute top-6 left-6">
          <div className="relative">
            <div className="w-8 h-8 border-l-2 border-t-2 border-teal-500 animate-pulse"></div>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-teal-500 rounded-full"></div>
            <div className="absolute top-2 left-2 text-teal-400 text-xs">狐</div>
          </div>
        </div>
        <div className="absolute top-6 right-6">
          <div className="relative">
            <div className="w-8 h-8 border-r-2 border-t-2 border-yellow-500 animate-pulse delay-300"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="absolute top-2 right-2 text-yellow-400 text-xs">九</div>
          </div>
        </div>
        <div className="absolute bottom-6 left-6">
          <div className="relative">
            <div className="w-8 h-8 border-l-2 border-b-2 border-blue-500 animate-pulse delay-700"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-2 left-2 text-blue-400 text-xs">尾</div>
          </div>
        </div>
        <div className="absolute bottom-6 right-6">
          <div className="relative">
            <div className="w-8 h-8 border-r-2 border-b-2 border-teal-500 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-teal-500 rounded-full"></div>
            <div className="absolute bottom-2 right-2 text-teal-400 text-xs">狐</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Error Info */}
        <div className="space-y-6">
          {/* Glitch 404 */}
          <div className="text-center lg:text-left">
            <div
              className="text-7xl md:text-8xl  font-bold text-teal-500 mb-4 relative inline-block"
            >
              {glitchText}
              <div className="absolute inset-0 text-yellow-400 opacity-20 animate-pulse">{glitchText}</div>
              <div className="absolute inset-0 text-blue-400 opacity-15 animate-pulse delay-100">{glitchText}</div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-xs  tracking-wider">NEURAL_PATHWAY_SEVERED</span>
              <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Error Terminal */}
          <div className="border-2 border-teal-500/30 bg-linear-to-br from-teal-950/20 to-black/80 backdrop-blur-sm">
            <div className="border-b border-teal-500/30 p-3 bg-teal-500/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-teal-400 text-xs  ml-2">KITSUNE_OS_ERROR.log</span>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h1 className="text-xl font-bold text-teal-400 ">PAGE_NOT_FOUND</h1>
              <div className="space-y-2 text-sm ">
                <p className="text-teal-400/90">
                  <span className="text-yellow-500">[ERROR]</span> Target resource vanished like a fox in the mist
                </p>
                <p className="text-teal-400/90">
                  <span className="text-blue-500">[INFO]</span> Nine pathways searched, none found
                </p>
                <p className="text-teal-400/90">
                  <span className="text-teal-500">[WARN]</span> Tails are pointing to alternative routes
                </p>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-teal-500/40 bg-teal-500/10 p-3 text-center backdrop-blur-sm">
              <div className="text-teal-400 text-lg font-bold ">404</div>
              <div className="text-teal-400/70 text-xs">ERROR</div>
            </div>
            <div className="border border-yellow-500/40 bg-yellow-500/10 p-3 text-center backdrop-blur-sm">
              <div className="text-yellow-400 text-lg font-bold ">九尾</div>
              <div className="text-yellow-400/70 text-xs">KITSUNE</div>
            </div>
            <div className="border border-blue-500/40 bg-blue-500/10 p-3 text-center backdrop-blur-sm">
              <div className="text-blue-400 text-lg font-bold ">OS</div>
              <div className="text-blue-400/70 text-xs">SYSTEM</div>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Content */}
        <div className="space-y-6">
          {/* Nine-Tailed Fox Visual Area */}
          <div className="border-2 border-teal-500/40 bg-linear-to-br from-teal-950/10 to-black/60 backdrop-blur-sm">
            <div className="border-b border-teal-500/30 p-3 bg-teal-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span className="text-teal-400 text-xs  tracking-wider">KITSUNE_INTERFACE</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye
                    className={`w-3 h-3 text-teal-400 transition-opacity duration-150 ${foxEyes ? "opacity-100" : "opacity-30"}`}
                  />
                  <Eye
                    className={`w-3 h-3 text-teal-400 transition-opacity duration-150 ${foxEyes ? "opacity-100" : "opacity-30"}`}
                  />
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Placeholder for Nine-Tailed Fox Image/GIF */}
              <div className="relative w-full h-80 border-2 border-dashed border-teal-400/30 rounded-lg flex items-center justify-center bg-linear-to-br from-teal-900/20 to-yellow-900/10">
                <div className="text-center">
                  {/* ASCII Fox Art */}
                  <div className="text-teal-400  text-sm mb-4 leading-tight">
                    <img src="/SHIN尾.avif" alt="Nine Tailed Fox" className="w-40 h-40 mx-auto mb-2" />
                  </div>
                  <div className="text-yellow-400/70 text-xs ">NINE_TAILED_FOX_OFFLINE</div>
                </div>

                {/* Animated border effect */}
                <div className="absolute inset-0 border-2 border-teal-400/20 rounded-lg animate-pulse"></div>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-400/60"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blue-400/60"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blue-400/60"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-400/60"></div>
              </div>
            </div>
          </div>

          {/* Recovery Protocol */}
          <div className="border border-blue-500/40 bg-blue-500/5 p-4 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 bg-blue-500 mr-2 animate-pulse"></div>
              <span className="text-blue-400 text-xs tracking-wider ">RECOVERY_PROTOCOL</span>
            </div>

            <button
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-3 p-4 border-2 border-teal-500/40 bg-linear-to-r from-teal-500/10 to-teal-600/5 text-teal-400 hover:from-teal-500/20 hover:to-teal-600/10 transition-all duration-300 group backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 group-hover:-translate-x-1 transition-transform" />
              <span className=" text-sm tracking-wide">RETURN_TO_PREVIOUS_DIMENSION</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all delay-100"></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all delay-200"></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all delay-300"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-teal-400/60 text-xs ">KITSUNE_OS v2.077 | Nine Tails Computing Corp.</div>
        <div className="text-teal-400/40 text-xs  mt-1">
          ERROR_ID: {mounted ? Date.now().toString(16).toUpperCase() : "LOADING..."}
        </div>
      </div>

      {/* Scan Line Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(220, 38, 38, 0.3) 2px,
            rgba(220, 38, 38, 0.3) 4px
          )`,
        }}
      />
    </div>
  )
}
