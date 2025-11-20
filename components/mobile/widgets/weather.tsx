"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, CloudLightning, CloudSnow, Loader2, MapPin } from "lucide-react"

// Erbil Coordinates
const LAT = 36.19
const LON = 44.01

export default function WeatherWidget() {
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

    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 1800000)
    return () => clearInterval(interval)
  }, [])

  // Helper to get Icon based on WMO Weather Code
  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className="w-8 h-8 text-yellow-300" /> // Clear/Mainly Clear
    if (code === 2 || code === 3) return <Cloud className="w-8 h-8 text-gray-300" /> // Cloudy
    if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-blue-300" /> // Rain
    if (code >= 71 && code <= 77) return <CloudSnow className="w-8 h-8 text-white" /> // Snow
    if (code >= 95) return <CloudLightning className="w-8 h-8 text-purple-300" /> // Thunderstorm
    return <Cloud className="w-8 h-8 text-gray-300" /> // Default
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
    <div className="col-span-2 h-32 rounded-3xl bg-indigo-600/40 backdrop-blur-xl border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12" />

      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col">
            <span className="text-xs font-medium text-indigo-200 uppercase tracking-wider">My Location</span>
            <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-indigo-300" />
                <span className="text-[10px] font-bold text-white">ERBIL, IQ</span>
            </div>
        </div>

        {/* Dynamic Icon */}
        <div className="drop-shadow-lg">
            {loading ? <Loader2 className="w-6 h-6 text-indigo-200 animate-spin" /> : weather && getWeatherIcon(weather.code)}
        </div>
      </div>

      {/* Temperature Display */}
      <div className="z-10">
        {loading ? (
            <div className="h-8 w-16 bg-white/10 animate-pulse rounded-md" />
        ) : (
            <>
                <div className="text-4xl font-bold text-white tracking-tight">
                    {weather?.temp}°
                </div>
                <div className="text-xs text-indigo-200 font-medium mt-1">
                    {weather ? getWeatherText(weather.code) : "Unavailable"}
                </div>
            </>
        )}
      </div>
    </div>
  )
}
