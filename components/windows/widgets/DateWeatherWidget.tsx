"use client"

import { useEffect, useState } from "react"
import { Cloud, CloudLightning, CloudRain, CloudSnow, CloudSun, Loader2, MapPin, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

// Hawler Coordinates
const LAT = 36.19
const LON = 44.01

export function DateWeatherWidget({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null)

  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetching data from Open-Meteo (Free, No Key required)
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
        )
        const data = await res.json()

        setWeather({
          temp: Math.round(data.current_weather.temperature),
          code: data.current_weather.weathercode
        })
      } catch (error) {
        console.error("Failed to fetch weather", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()

    const interval = setInterval(fetchWeather, 1800000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className="w-8 h-8 text-yellow-300" />
    if (code === 2 || code === 3) return <Cloud className="w-8 h-8 text-neutral-300" />
    if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-neutral-300" />
    if (code >= 71 && code <= 77) return <CloudSnow className="w-8 h-8 text-white" />
    if (code >= 95) return <CloudLightning className="w-8 h-8 text-purple-300" />
    return <Cloud className="w-8 h-8 text-neutral-300" />
  }

  const getWeatherText = (code: number) => {
    if (code === 0 || code === 1) return "Sunny"
    if (code === 2 || code === 3) return "Cloudy"
    if (code >= 51 && code <= 67) return "Rainy"
    if (code >= 71 && code <= 77) return "Snowy"
    if (code >= 95) return "Storms"
    return "Clear"
  }
  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!time) return null

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
      {/* Time - Soft pink glow shadow */}
      <h1 className="text-8xl font-thin tracking-tight text-white font-mono drop-shadow-[0_0_12px_rgba(249,168,212,0.4)]">
        {timeString}
      </h1>

      {/* Date */}
      <div className="text-lg font-medium text-white/90 tracking-[0.25em] uppercase mb-6 drop-shadow-[0_0_8px_rgba(249,168,212,0.3)]">
        {dateString}
      </div>

      {/* Weather Widget */}
      <div className="flex items-center gap-4 bg-white/20 backdrop-blur-xl border border-white/40 px-8 py-3 rounded-2xl shadow-xl">
        {loading ? <Loader2 className="w-6 h-6 text-white/60 animate-spin" /> : weather && getWeatherIcon(weather.code)}
        <div className="flex items-baseline gap-1 font-bold text-white tracking-wide">
          {weather?.temp}° {weather ? getWeatherText(weather.code) : "Unavailable"}
        </div>

        <span className="w-px h-5 bg-white/30 mx-2"></span>

        <div className="flex items-center gap-2 text-xs text-white/80 font-bold uppercase tracking-[0.15em]">
          <MapPin className="w-3.5 h-3.5 text-memory-pink" />
          <span>Hawler, IQ</span>
        </div>
      </div>
    </div>
  )
}
