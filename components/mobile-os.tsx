"use client"

import { useState, useEffect } from "react"
import { Battery, Signal, Wifi } from "lucide-react"
import Image from "next/image"
import ProfilePage from "./mobile/profile-page"
import ProjectsPage from "./mobile/projects-page"
import TechStackPage from "./mobile/tech-stack-page"
import ContactPage from "./mobile/contact-page"
import bgImg from "@/public/bg.webp"
import { Icons } from "@/public/desktopLogo";

type MobileOSProps = {}

export default function MobileOS() {
  const [currentApp, setCurrentApp] = useState<string | null>(null)
  const [isBooting, setIsBooting] = useState(true)
  const [currentTime, setCurrentTime] = useState<string>("")

  const handleBootComplete = () => {
    setIsBooting(false)
  }

  // Update time on client side only
  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString())

    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const apps = [
    { type: "profile", icon: "/desktopLogo/Profile.webp", name: "Profile" },
    { type: "projects", icon: "/desktopLogo/Projects.webp", name: "Projects" },
    { type: "contact", icon: "/desktopLogo/Contact.webp", name: "Contact" },
    { type: "techstack", icon: "/desktopLogo/Techstack.webp", name: "Tech Stack" },
  ]

  const dockApps = apps.slice(0, 4)

  const handleOpenApp = (type: string) => {
    setCurrentApp(type)
  }

  const handleBack = () => {
    setCurrentApp(null)
  }

  // Render current app page if one is selected
  if (currentApp) {
    switch (currentApp) {
      case "profile":
        return <ProfilePage onBack={handleBack} />
      case "projects":
        return <ProjectsPage onBack={handleBack} />
      case "techstack":
        return <TechStackPage onBack={handleBack} />
      case "contact":
        return <ContactPage onBack={handleBack} />
      case "terminal":
        handleBack() // Go back if terminal is selected as it's not implemented for mobile
        return null
    }
  }

  // Render home screen
  return (
    <div className="relative h-screen w-full bg-zinc-900 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Image
          src={bgImg}
          alt="Anime background"
          placeholder="blur"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </div>


      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-6 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-between px-4 z-50 border-b border-teal-600/30">
        <div className="text-white text-xs font-mono">{currentTime}</div>
        <div className="flex items-center gap-2">
          <Signal className="w-3 h-3 text-white" />
          <Wifi className="w-3 h-3 text-white" />
          <Battery className="w-4 h-4 text-red-600" />
        </div>
      </div>

      {/* App Grid */}
      <div className="pt-8 px-4 pb-20 relative z-10">
        <div className="grid grid-cols-4 gap-4">
          {apps.map((app) => (
            <button key={app.type} onClick={() => handleOpenApp(app.type)} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-1 hover:bg-teal-600/10 transition-colors">
                <div className="w-10 h-10 relative">
                  <Image src={app.icon || "/placeholder.svg"} alt={app.name} fill className="object-contain" priority />
                </div>
              </div>
              <span className="text-white text-xs">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
