"use client"

import { useState, useEffect } from "react"
import { Battery, Signal, Wifi } from "lucide-react"
import Image from "next/image"
// App Imports
import ProfilePage from "./mobile/profile-page"
import ProjectsPage from "./mobile/projects-page"
import TechStackPage from "./mobile/tech-stack-page"
import ContactPage from "./mobile/contact-page"
// Widget Imports
import WeatherWidget from "./mobile/widgets/weather"
import SystemWidget from "./mobile/widgets/system"
import MusicWidget from "./mobile/widgets/music"

import bgImg from "@/public/bg.webp"

export default function MobileOS() {
  const [currentApp, setCurrentApp] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
        const now = new Date()
        setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const apps = [
    { type: "profile", icon: "/desktopLogo/Profile.webp", name: "Profile" },
    { type: "projects", icon: "/desktopLogo/Projects.webp", name: "Projects" },
    { type: "techstack", icon: "/desktopLogo/Techstack.webp", name: "Tech Stack" },
    { type: "contact", icon: "/desktopLogo/Contact.webp", name: "Contact" },
    { type: "resume", icon: "/desktopLogo/Resume.webp", name: "Resume" },
  ]

  const handleOpenApp = (type: string) => {
    if (type === "resume") {
      window.open("/resume/Dyari Ali - Web Developer.pdf", "_blank")
      return
    }
    setCurrentApp(type)
  }

  const handleBack = () => setCurrentApp(null)

  // App Rendering Logic
  if (currentApp) {
    switch (currentApp) {
      case "profile": return <ProfilePage onBack={handleBack} />
      case "projects": return <ProjectsPage onBack={handleBack} />
      case "techstack": return <TechStackPage onBack={handleBack} />
      case "contact": return <ContactPage onBack={handleBack} />
    }
  }

  return (
    <div className="relative h-screen w-full bg-zinc-950 overflow-hidden font-sans">

      {/* Wallpaper */}
      <div className="fixed inset-0 z-0">
        <Image src={bgImg} alt="Background" fill priority className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-transparent to-zinc-950/30" />
      </div>

      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-6 z-50 text-white font-medium text-sm tracking-wide">
        <span>{currentTime}</span>
        <div className="flex items-center gap-2.5">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-5 h-5" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 h-full overflow-y-auto pt-16 pb-8 px-5 no-scrollbar">
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">

            {/* Widgets */}
            <WeatherWidget />
            <SystemWidget />
            <MusicWidget />

            <div className="col-span-4 h-4" />

            {/* Apps */}
            {apps.map((app) => (
                <button
                    key={app.type}
                    onClick={() => handleOpenApp(app.type)}
                    className="col-span-1 flex flex-col items-center gap-2 group"
                >
                    <div className="w-full aspect-square rounded-[1.2rem] bg-zinc-800/40 backdrop-blur-md border border-white/5 flex items-center justify-center shadow-lg shadow-black/20 group-active:scale-95 transition-transform duration-200 relative overflow-hidden">
                        <div className="w-full h-full relative z-10">
                            <Image
                                src={app.icon || "/placeholder.svg"}
                                alt={app.name}
                                fill
                                className="object-contain drop-shadow-md"
                            />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <span className="text-zinc-200 text-[11px] font-medium tracking-wide drop-shadow">
                        {app.name}
                    </span>
                </button>
            ))}
        </div>
      </div>
    </div>
  )
}
