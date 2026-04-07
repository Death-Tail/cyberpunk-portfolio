"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, CloudLightning, CloudSnow, Loader2, MapPin } from "lucide-react"

// Hawler Coordinates
const LAT = 36.19
const LON = 44.01

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

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
      } catch (err) {
        console.error("Failed to fetch weather", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()

    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 1800000)
    return () => clearInterval(interval)
  }, [])

  // Helper to get Icon based on WMO Weather Code
  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className="w-8 h-8 text-yellow-300" /> // Clear/Mainly Clear
    if (code === 2 || code === 3) return <Cloud className="w-8 h-8 text-neutral-300" /> // Cloudy
    if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-neutral-300" /> // Rain
    if (code >= 71 && code <= 77) return <CloudSnow className="w-8 h-8 text-white" /> // Snow
    if (code >= 95) return <CloudLightning className="w-8 h-8 text-purple-300" /> // Thunderstorm
    return <Cloud className="w-8 h-8 text-neutral-300" /> // Default
  }

  // Helper to get Text based on WMO Weather Code
  const getWeatherText = (code: number) => {
    if (code === 0 || code === 1) return "Sunny"
    if (code === 2 || code === 3) return "Cloudy"
    if (code >= 51 && code <= 67) return "Rainy"
    if (code >= 71 && code <= 77) return "Snowy"
    if (code >= 95) return "Storms"
    return "Clear"
  }

  return (
    <div className="col-span-2 h-32 rounded-4xl bg-white/40 backdrop-blur-3xl border border-white/60 p-5 flex flex-col justify-between relative overflow-hidden shadow-xl ring-1 ring-white/60 group">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-400/20 rounded-full blur-3xl -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-stone-950/40 uppercase tracking-[0.2em] leading-none">Composition</span>
          <div className="flex items-center gap-1.5 mt-2">
            <MapPin className="w-3.5 h-3.5 text-pink-500" />
            <span className="text-[10px] font-black text-stone-950 uppercase tracking-widest">Hawler, IQ</span>
          </div>
        </div>

        {/* Dynamic Icon */}
        <div className="drop-shadow-sm scale-110">
          {loading ? <Loader2 className="w-8 h-8 text-stone-950/20 animate-spin" /> : weather && getWeatherIcon(weather.code)}
        </div>
      </div>

      {/* Temperature Display */}
      <div className="z-10">
        {loading ? (
          <div className="h-10 w-20 bg-white/20 animate-pulse rounded-full" />
        ) : error ? (
          <>
            <div className="text-4xl font-black text-stone-950/30 tracking-tighter leading-none">--°</div>
            <div className="text-[10px] text-stone-950/30 font-black uppercase tracking-[0.2em] mt-1.5 leading-none">Offline</div>
          </>
        ) : (
          <>
            <div className="text-4xl font-black text-stone-950 tracking-tighter leading-none">
              {weather?.temp}°
            </div>
            <div className="text-[10px] text-stone-950/40 font-black uppercase tracking-[0.2em] mt-1.5 leading-none">
              {weather ? getWeatherText(weather.code) : "Unknown"}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
