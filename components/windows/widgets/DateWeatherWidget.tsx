"use client"

import { useEffect, useState } from "react"
import { CloudSun, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export function DateWeatherWidget({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!time) return null

  // Formatters for Erbil Time
  const timeString = time.toLocaleTimeString("en-US", {
    timeZone: "Asia/Baghdad",
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  const dateString = time.toLocaleDateString("en-US", {
    timeZone: "Asia/Baghdad",
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className={cn("flex flex-col items-center text-white select-none", className)}>
      {/* Time - Added strong text shadow */}
      <h1 className="text-8xl font-thin tracking-tighter text-white font-mono drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
        {timeString}
      </h1>

      {/* Date */}
      <div className="text-xl font-light text-white tracking-[0.2em] uppercase mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        {dateString}
      </div>

      {/* Weather Widget */}
      {/* CHANGED: Used bg-black/60 instead of zinc to ensure it works in all configs */}
      <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-2xl">
        <CloudSun className="w-6 h-6 text-yellow-400" />

        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-white">24°C</span>
        </div>

        <span className="w-px h-5 bg-white/30 mx-1"></span>

        <div className="flex items-center gap-1.5 text-sm text-white/90 font-medium">
          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
          <span className="uppercase tracking-wider">Erbil</span>
        </div>
      </div>
    </div>
  )
}
