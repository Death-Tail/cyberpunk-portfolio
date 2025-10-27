"use client"

import { useState, useEffect } from "react"
import { Battery, Signal, Wifi } from "lucide-react"
import Image from "next/image"
import ProfilePage from "./mobile/profile-page"
import ProjectsPage from "./mobile/projects-page"
import TechStackPage from "./mobile/tech-stack-page"
import ContactPage from "./mobile/contact-page"
import { CyberpunkBoot } from "./cyberpunk-boot"

type MobileOSProps = {}

export default function MobileOS() {
  const [currentApp, setCurrentApp] = useState<string | null>(null)
  const [isBooting, setIsBooting] = useState(true)
  const [currentTime, setCurrentTime] = useState<string>("")

  const handleBootComplete = () => {
    setIsBooting(false);
    setTimeout(() => {
      setCurrentApp(null); // Ensure the mobile layout is reset properly
    }, 100); // Small delay to ensure smooth transition
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
    { type: "profile", icon: "/desktopLogo/profile.avif", name: "Profile" },
    { type: "projects", icon: "/desktopLogo/project.avif", name: "Projects" },
    { type: "contact", icon: "/desktopLogo/contact.avif", name: "Contact" },
    { type: "techstack", icon: "/desktopLogo/techstack.avif", name: "Tech Stack" },
  ]

  const dockApps = apps.slice(0, 4)

  const handleOpenApp = (type: string) => {
    setCurrentApp(type)
  }

  const handleBack = () => {
    setCurrentApp(null)
  }
  if (isBooting) {
    return <CyberpunkBoot onComplete={handleBootComplete} />
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
        handleBack() // Go back if terminal is selected as it's not implemented for mobile
        return null
    }
  }

  // Render home screen
  return (
    <div className="relative h-screen w-full bg-zinc-900 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Image
          src="/backgroundImageMobile.avif"
          alt="Neural Network Background"
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-5 z-[1]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.4) 1px, transparent 0),
              linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div
        className="fixed inset-0 pointer-events-none opacity-10 z-[1]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(220, 38, 38, 0.3) 2px,
            rgba(220, 38, 38, 0.3) 4px
          )`,
        }}
      />

      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-6 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-between px-4 z-50 border-b border-red-600/30">
        <div className="text-red-400 text-xs font-mono">{currentTime}</div>
        <div className="flex items-center gap-2">
          <Signal className="w-3 h-3 text-blue-400" />
          <Wifi className="w-3 h-3 text-yellow-400" />
          <Battery className="w-4 h-4 text-red-400" />
        </div>
      </div>

      {/* App Grid */}
      <div className="pt-8 px-4 pb-20 relative z-10">
        <div className="grid grid-cols-4 gap-4">
          {apps.map((app) => (
            <button key={app.type} onClick={() => handleOpenApp(app.type)} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl border border-red-600/30 bg-red-600/5 flex items-center justify-center mb-1 hover:bg-red-600/10 transition-colors">
                <div className="w-10 h-10 relative">
                  <Image src={app.icon || "/placeholder.svg"} alt={app.name} fill className="object-contain" priority  />
                </div>
              </div>
              <span className="text-red-400 text-xs">{app.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900/80 backdrop-blur-sm border-t border-red-600/30 z-50">
        <div className="h-full max-w-sm mx-auto flex items-center justify-around px-4">
          {dockApps.map((app) => (
            <button key={app.type} onClick={() => handleOpenApp(app.type)} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl border border-red-600/30 bg-red-600/5 flex items-center justify-center hover:bg-red-600/10 transition-colors">
                <div className="w-8 h-8 relative">
                  <Image
                    src={app.icon || "/placeholder.svg"}
                    alt={`${app.name} screen Icon`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Lines */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 via-yellow-500/50 to-red-500/50 z-50"></div>
      <div className="fixed bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/50 via-yellow-500/50 to-blue-500/50 z-50"></div>
    </div>
  )
}
