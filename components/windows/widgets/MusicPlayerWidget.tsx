"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  createAudioInstance,
  getAudioInstance,
  destroyAudioInstance,
} from "@/lib/audio-player"

export function MusicPlayerWidget({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const STREAM_URL = "https://listen.moe/stream"

  useEffect(() => {
    let audio = getAudioInstance()
    if (!audio) audio = createAudioInstance(STREAM_URL)
    audioRef.current = audio
    return () => { destroyAudioInstance() }
  }, [])

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
      if (!audioRef.current.src) audioRef.current.src = STREAM_URL
      audioRef.current.play()
        .then(() => { setIsLoading(false); setIsPlaying(true) })
        .catch((err) => { console.error("Playback error:", err); setIsLoading(false); setIsPlaying(false) })
    }
  }

  return (
    <div
      className={cn(
        "w-85 rounded-3xl relative overflow-hidden",
        "bg-white/40 backdrop-blur-3xl border border-white/70",
        "shadow-[0_8px_40px_rgba(0,0,0,0.08)] ring-1 ring-white/60",
        className
      )}
    >
      {/* Warm amber glow blob */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 w-32 h-32 bg-amber-300/15 rounded-full blur-2xl" />

      <div className="relative p-4 flex gap-4 items-center">
        {/* Vinyl turntable */}
        <div className="relative w-28 h-28 shrink-0">
          {/* Vinyl disc */}
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
              "bg-[conic-gradient(from_0deg,#1c1917_0deg,#292524_45deg,#1c1917_90deg,#292524_135deg,#1c1917_180deg,#292524_225deg,#1c1917_270deg,#292524_315deg,#1c1917_360deg)]",
              isPlaying ? "animate-[spin_5s_linear_infinite]" : ""
            )}
          >
            {/* Groove rings */}
            <div className="absolute inset-[8%] rounded-full border border-white/5" />
            <div className="absolute inset-[16%] rounded-full border border-white/5" />
            <div className="absolute inset-[28%] rounded-full border border-white/5" />
            {/* Center label — warm amber */}
            <div className="absolute inset-[32%] rounded-full bg-linear-to-br from-orange-300 to-amber-400 border border-orange-200/60 shadow-inner flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/80 shadow-sm" />
            </div>
          </div>

          {/* Tonearm */}
          <div
            className={cn(
              "absolute -top-1 left-[60%] w-16 h-20 origin-top-left",
              "transition-transform duration-700 ease-out",
              isPlaying ? "rotate-[-8deg]" : "rotate-18"
            )}
          >
            {/* Pivot */}
            <div className="absolute -left-1.5 -top-1.5 w-6 h-6 rounded-full bg-white/70 border border-stone-950/10 shadow-md flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-300 border border-stone-400/40" />
            </div>
            {/* Arm */}
            <div className="absolute left-0.5 top-1 w-0.5 h-14 bg-stone-300/80 rounded-full shadow-sm" />
            {/* Head */}
            <div className="absolute left-0 top-13.5 w-3 h-3 bg-stone-700 border border-stone-500 rounded-sm rotate-45 shadow-sm" />
          </div>
        </div>

        {/* Info + meter */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Station badge */}
          <div className="flex items-center gap-1.5">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors",
              isPlaying ? "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.8)]" : "bg-stone-400"
            )} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-950/40">
              Live
            </span>
          </div>

          {/* Title */}
          <div>
            <div className="text-sm font-black text-stone-950 leading-tight truncate">
              {isLoading ? "Connecting..." : "Listen.moe Anime"}
            </div>
            <div className="text-[10px] text-stone-950/40 font-bold mt-0.5 truncate">
              anime music · jpop
            </div>
          </div>

          {/* VU Meter bars */}
          <div className="flex items-end gap-0.5 h-5 mt-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-0.75 rounded-full transition-all",
                  isPlaying ? "bg-linear-to-t from-orange-400 to-amber-300" : "bg-stone-200"
                )}
                style={{
                  height: isPlaying
                    ? `${35 + Math.sin(i * 1.3) * 45}%`
                    : "25%",
                  transition: `height ${200 + i * 30}ms ease-in-out`,
                  animationDelay: `${i * 60}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controls bar */}
      <div className="relative px-4 pb-4 pt-0 flex items-center gap-3">
        {/* Play button */}
        <button
          onClick={togglePlay}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
            "bg-stone-950 text-white shadow-md",
            "hover:scale-105 active:scale-95 transition-all duration-200"
          )}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>

        {/* Volume control */}
        <div className="flex items-center gap-2 flex-1 bg-white/50 rounded-full border border-stone-950/8 px-3 py-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-stone-950/40 hover:text-stone-950 transition-colors"
          >
            {isMuted || volume === 0
              ? <VolumeX className="w-3.5 h-3.5" />
              : <Volume2 className="w-3.5 h-3.5" />
            }
          </button>

          <div className="relative flex-1 h-1 bg-stone-950/10 rounded-full overflow-hidden cursor-pointer">
            <input
              type="range" min="0" max="1" step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false) }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className="h-full rounded-full bg-linear-to-r from-orange-400 to-amber-400 transition-all duration-100"
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            />
          </div>

          <span className="text-[9px] font-black text-stone-950/30 tabular-nums w-6 text-right">
            {Math.round((isMuted ? 0 : volume) * 100)}
          </span>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1 shrink-0">
          <Radio className={cn("w-3 h-3", isPlaying ? "text-orange-500" : "text-stone-400")} />
        </div>
      </div>
    </div>
  )
}
