"use client"

import { useState, useEffect, Suspense } from "react"
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
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import bgImg from "@/public/bg.webp"

function OSContent() {
  const [currentTime, setCurrentTime] = useState<string>("")

  // Routing Hooks
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current app from URL (default to null if empty)
  const currentApp = searchParams.get("app")

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
    router.push(`/?app=${type}`, { scroll: false })
  }

  const handleBack = () => {
    router.push("/", { scroll: false })
  }

  return (
    <div className="relative h-screen w-full bg-zinc-950 overflow-hidden font-sans text-os-accent selection:bg-os-accent/30">

      {/* Wallpaper */}
      <div className="fixed inset-0 z-0">
        <Image src={bgImg} alt="Background" fill priority className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-transparent to-zinc-950/30" />
      </div>

      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-6 z-60 font-medium text-sm tracking-wide text-white/90 pointer-events-none">
        <span>{currentTime}</span>
        <div className="flex items-center gap-2.5">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-5 h-5" />
        </div>
      </div>

      {/* --- HOME SCREEN --- */}
      <div className={`relative z-10 h-full overflow-y-auto pt-16 pb-8 px-5 no-scrollbar transition-opacity duration-300 ${currentApp ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <WeatherWidget />
            <SystemWidget />
            <MusicWidget />
            <div className="col-span-4 h-4" />

            {apps.map((app) => (
                <button
                    key={app.type}
                    onClick={() => handleOpenApp(app.type)}
                    className="col-span-1 flex flex-col items-center gap-2 group"
                >
                    <div className="w-full aspect-square rounded-[1.2rem] bg-black/20 backdrop-blur-md flex items-center justify-center shadow-lg group-active:scale-95 transition-transform duration-200 relative overflow-hidden hover:bg-os-accent/10">
                        <div className="w-full h-full relative z-10 theme-filter">
                            <Image src={app.icon || "/placeholder.svg"} alt={app.name} fill className="object-contain drop-shadow-md" />
                        </div>
                    </div>
                    <span className="text-os-accent/80 text-[11px] font-medium tracking-wide">
                        {app.name}
                    </span>
                </button>
            ))}
        </div>
      </div>

      {/* --- APP OVERLAY --- */}
      <div
        className={`fixed left-0 right-0 bottom-0 z-50 bg-black transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          currentApp ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ top: '3rem' }}
      >
        <div className="h-full w-full overflow-y-auto no-scrollbar">
           <div className="w-full max-w-md mx-auto min-h-full px-4 pb-10">

              {/* THE FIX:
                  We render ALL components, but hide the ones that aren't active.
                  This preserves their internal state (scroll position, expanded accordions, etc.)
              */}

              <div style={{ display: currentApp === 'profile' ? 'block' : 'none' }}>
                <ProfilePage onBack={handleBack} />
              </div>

              <div style={{ display: currentApp === 'projects' ? 'block' : 'none' }}>
                <ProjectsPage onBack={handleBack} />
              </div>

              <div style={{ display: currentApp === 'techstack' ? 'block' : 'none' }}>
                <TechStackPage onBack={handleBack} />
              </div>

              <div style={{ display: currentApp === 'contact' ? 'block' : 'none' }}>
                <ContactPage onBack={handleBack} />
              </div>

           </div>
        </div>
      </div>

    </div>
  )
}

export default function MobileOS() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-zinc-950 flex items-center justify-center text-white">Loading OS...</div>}>
      <OSContent />
    </Suspense>
  )
}
