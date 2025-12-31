"use client"

import { useEffect, useState } from "react"
import { Cloud, CloudLightning, CloudRain, CloudSnow, CloudSun, Loader2, MapPin, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

// Erbil Coordinates
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
       {loading ? <Loader2 className="w-6 h-6 text-neutral-200 animate-spin" /> : weather && getWeatherIcon(weather.code)}
        <div className="flex items-baseline gap-1">
          {weather?.temp}° {weather ? getWeatherText(weather.code) : "Unavailable"}
        </div>

        <span className="w-px h-5 bg-white/30 mx-1"></span>

        <div className="flex items-center gap-1.5 text-sm text-white/90 font-medium">
          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
          <span className="uppercase tracking-wider">Erbil, IQ</span>
        </div>
      </div>
    </div>
  )
}
