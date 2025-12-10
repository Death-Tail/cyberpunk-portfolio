"use client"

import { useEffect, useRef, useState } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
} from "lucide-react"
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

  const STREAM_URL = "https://play.streamafrica.net/lofiradio"

  // init shared audio
  useEffect(() => {
    let audio = getAudioInstance()

    if (!audio) {
      audio = createAudioInstance(STREAM_URL)
    }

    audioRef.current = audio

    return () => {
      destroyAudioInstance()
    }
  }, [])

  // volume control
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

      if (!audioRef.current.src) {
        audioRef.current.src = STREAM_URL
      }

      audioRef.current
        .play()
        .then(() => {
          setIsLoading(false)
          setIsPlaying(true)
        })
        .catch((err) => {
          console.error("Playback error:", err)
          setIsLoading(false)
          setIsPlaying(false)
        })
    }
  }

  return (
    <div
      className={cn(
        "w-[400px] pl-1.5 rounded-3xl bg-linear-to-br from-indigo-900 via-zinc-900 to-indigo-800",
        "border border-black/40 shadow-[0_18px_40px_rgba(0,0,0,0.6)]",
        "relative overflow-hidden",
        className
      )}
    >
      {/* subtle wood grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light bg-[radial-gradient(circle_at_10%_0,rgba(255,255,255,0.25),transparent_55%),repeating-linear-gradient(90deg,rgba(0,0,0,0.4)_0,rgba(0,0,0,0.4)_1px,transparent_1px,transparent_6px)]" />

      <div className="relative p-4 flex gap-4">
        {/* LEFT: turntable */}
        <div className="relative w-32 h-32 shrink-0">
          {/* vinyl */}
          <div
            className={cn(
              "absolute inset-0 rounded-full border border-black/60 shadow-[0_0_25px_rgba(0,0,0,0.8)]",
              "bg-[radial-gradient(circle_at_30%_30%,#444,transparent_55%),radial-gradient(circle_at_70%_70%,#050505,transparent_60%),conic-gradient(from_90deg,#111_0deg,#222_45deg,#111_90deg,#222_135deg,#111_180deg,#222_225deg,#111_270deg,#222_315deg,#111_360deg)]",
              isPlaying ? "animate-[spin_6s_linear_infinite]" : ""
            )}
          >
            {/* center label */}
            <div className="absolute inset-[26%] rounded-full bg-cyan-400/80 border border-cyan-200/60 shadow-inner" />
            {/* spindle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-100 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />

            {/* simple grooves */}
            <div className="absolute inset-[10%] rounded-full border border-black/40 opacity-70" />
            <div className="absolute inset-[18%] rounded-full border border-black/30 opacity-60" />
            <div className="absolute inset-[34%] rounded-full border border-black/40 opacity-50" />
          </div>


          <div
            className={cn(
              "absolute -top-2  w-20 h-24 origin-top-left",
              "transition-transform duration-500 ease-out",
              isPlaying ? "rotate-[-5deg]" : "rotate-18"
            )}
          >
            {/* base circle */}
            <div className="absolute left-[-5] top-[-5] w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-zinc-700 border border-zinc-500" />
            </div>

            {/* arm */}
            <div className="absolute left-2 top-2 w-[3px] h-16 bg-zinc-300 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.6)]" />

            {/* head */}
            <div className="absolute left-1 top-[60px] w-4 h-4 bg-zinc-900 border border-zinc-400 rounded-sm rotate-45 shadow-[0_0_8px_rgba(0,0,0,0.8)]" />
          </div>
        </div>

        {/* RIGHT: info + meter + LEDs */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] uppercase text-emerald-200/80 mb-1">
              <Radio className="w-3 h-3" />
              <span>LIVE STATION</span>
            </div>
            {/* one main line for title (truncate) */}
            <h3 className="text-sm font-semibold text-zinc-50">
              {isLoading ? "Connecting..." : "Lofi Girl Radio"}
            </h3>
            <h4>beats to relax / study </h4>
          </div>

          {/* LEDs + meter */}
          <div className="mt-3 flex items-center gap-3">
            {/* LEDs */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.0)]",
                  isPlaying ? "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" : "bg-emerald-900/60"
                )}
              />
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  isPlaying ? "bg-indigo-900/70" : "bg-indigo-500/90 shadow-[0_0_6px_rgba(248,113,113,0.7)]"
                )}
              />
            </div>

            {/* simplified meter */}
            <div className="w-[120px] h-5 rounded-full bg-black/40 border border-black/70 px-1 flex items-center">
              <div className="flex-1 h-2 rounded-full bg-linear-to-r from-emerald-400 via-yellow-300 to-indigo-400/80 overflow-hidden">
                <div
                  className="h-full bg-black/40"
                  style={{
                    width: isPlaying ? "15%" : "80%",
                    transition: "width 400ms ease-out",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLS BAR */}
      <div className="px-4 pb-4 pt-1">
        <div className="flex items-center gap-4">
          {/* Play button */}
          <button
            onClick={togglePlay}
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center",
              "bg-emerald-400 text-black shadow-[0_0_18px_rgba(16,185,129,0.7)]",
              "hover:scale-105 active:scale-95 transition-all"
            )}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-emerald-900 border-t-emerald-50 rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* Volume slider */}
          <div className="flex items-center gap-3 flex-1 bg-black/40 rounded-full border border-black/60 px-3 py-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <div className="relative flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden cursor-pointer">
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
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-100"
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
