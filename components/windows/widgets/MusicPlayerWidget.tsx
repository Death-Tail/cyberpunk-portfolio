"use client"

import { useEffect, useRef, useState } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Disc
} from "lucide-react"
import { cn } from "@/lib/utils"

export function MusicPlayerWidget({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Single Lofi Girl Stream URL
  const STREAM_URL = "https://play.streamafrica.net/lofiradio"
  const THEME_COLOR = "text-teal-400"

  // Initialize Audio
  useEffect(() => {
    if (audioRef.current) return; // prevent double mount init
    // Create a local variable to ensure we clean up the EXACT instance we created
    const audioInstance = new Audio(STREAM_URL)
    audioInstance.preload = "none"
    audioInstance.volume = volume

    audioRef.current = audioInstance

    return () => {
      // CLEANUP: This runs when the component unmounts or reloads
      if (audioInstance) {
        audioInstance.pause()
        // CRITICAL FIX: Detach the source and force load to kill the stream connection
        audioInstance.src = ""
        audioInstance.load()
        audioRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle Volume Updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)

      // Ensure we are trying to play the correct URL in case it was wiped
      if (!audioRef.current.src) {
          audioRef.current.src = STREAM_URL
      }

      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error("Playback failed", error)
            setIsPlaying(false)
            setIsLoading(false)
          })
      }
    }
  }

  return (
    <div className={cn(
      "w-80 bg-zinc-950/70 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden",
      "shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 group",
      "hover:border-teal-500/30 hover:shadow-[0_0_20px_rgba(225,29,72,0.1)]",
      className
    )}>

      {/* --- Header / Display Area --- */}
      <div className="relative p-5 flex items-center gap-4 bg-linear-to-b from-white/5 to-transparent">

        {/* Spinning Record Art */}
        <div className="relative shrink-0">
          <div className={cn(
            "w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center shadow-lg",
            isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
          )}>
            <div className={cn("w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center", THEME_COLOR)}>
               <Disc className="w-4 h-4" />
            </div>
            {/* Shine effect on vinyl */}
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Playing Indicator Dot */}
          <div className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full flex items-center justify-center",
            isPlaying ? "text-green-400" : "text-zinc-600"
          )}>
             <div className={cn("w-2 h-2 rounded-full bg-current", isPlaying && "animate-pulse shadow-[0_0_8px_currentColor]")} />
          </div>
        </div>

        {/* Track Info (Hardcoded for Lofi Girl) */}
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-white/40 mb-1">
            <Radio className="w-3 h-3" />
            <span>LIVE STATION</span>
          </div>
          <h3 className="text-white font-medium truncate w-full leading-tight">
            Lofi Girl Radio
          </h3>
          <p className={cn("text-xs truncate w-full mt-0.5 font-medium", THEME_COLOR)}>
            {isLoading ? "Connecting..." : "Beats to relax/study to"}
          </p>
        </div>
      </div>

      {/* --- Visualizer --- */}
      <div className="px-5 mb-2 h-8 flex items-center gap-1 opacity-80">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-all duration-150 ease-in-out",
              isPlaying ? "bg-teal-400" : "bg-zinc-800 h-1"
            )}
            style={{
              height: isPlaying ? `${Math.max(15, Math.random() * 100)}%` : '4px',
              opacity: isPlaying ? 0.6 : 0.3,
              animationDelay: `${i * 0.05}s`
            }}
          />
        ))}
      </div>

      {/* --- Controls --- */}
      <div className="px-5 pb-5 pt-2">

        <div className="flex items-center gap-4">
           {/* Big Play Button */}
           <button
            onClick={togglePlay}
            className={cn(
              "w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95",
              "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(225,29,72,0.4)]"
            )}
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-1" />
            )}
          </button>

          {/* Volume Slider */}
          <div className="flex items-center gap-3 flex-1 group/vol bg-zinc-900/50 p-2 rounded-full border border-white/5">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-zinc-400 hover:text-white transition-colors pl-1"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <div className="relative flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden cursor-pointer mr-2">
              {/* Interactive Input Range */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value))
                  setIsMuted(false)
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {/* Visual Progress Bar */}
              <div
                className={cn("h-full rounded-full transition-all duration-100", "bg-teal-400")}
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
