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
import { useSearchParams, useRouter } from "next/navigation"

import bgImg from "@/public/bgM.jpg"
import { CyberpunkBoot } from "./cyberpunk-boot"

function OSContent() {
  const [currentTime, setCurrentTime] = useState<string>("")

  const router = useRouter()
  const searchParams = useSearchParams()

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
    { type: "profile", icon: "/desktopLogo/Profile.jpg", name: "Profile" },
    { type: "projects", icon: "/desktopLogo/Projects.jpg", name: "Projects" },
    { type: "techstack", icon: "/desktopLogo/Techstack.jpg", name: "Tech Stack" },
    { type: "contact", icon: "/desktopLogo/Contact.jpg", name: "Contact" },
    { type: "resume", icon: "/desktopLogo/Resume.jpg", name: "Resume" },

  ]

  const handleOpenApp = (type: string) => {
    if (type === "resume") {
      window.open("/resume/Dyari Ali Tahir - Fullstack Developer.pdf", "_blank")
      return
    }
    router.push(`/?app=${type}`, { scroll: false })
  }

  const handleBack = () => {
    router.push("/", { scroll: false })
  }

  return (
    <div className="relative h-screen w-full bg-[#fffcf5] overflow-hidden font-sans text-stone-900 selection:bg-orange-200/40">

      {/* Wallpaper */}
      <div className="fixed inset-0 z-0">
        <Image src={bgImg} alt="Background" fill priority className="object-cover opacity-90 scale-105" />
        <div className="absolute inset-0 bg-linear-to-t from-white/60 via-white/20 to-transparent backdrop-blur-[1px]" />
      </div>

      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-6 z-60 font-black text-xs tracking-[0.2em] text-stone-950/80 pointer-events-none uppercase">
        <span>{currentTime}</span>
        <div className="flex items-center gap-3">
          <Signal className="w-4 h-4 text-stone-950/60" />
          <Wifi className="w-4 h-4 text-stone-950/60" />
          <div className="flex items-center gap-1">
            <span className="text-[10px]">88%</span>
            <Battery className="w-5 h-5 text-stone-950/60" />
          </div>
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
              <div className="w-full aspect-square rounded-3xl bg-white/40 backdrop-blur-3xl flex items-center justify-center shadow-2xl group-active:scale-95 transition-all duration-300 relative overflow-hidden ring-1 ring-white/80 hover:bg-white/60">
                <div className="w-full h-full relative z-10 p-4">
                  <Image src={app.icon || "/placeholder.svg"} alt={app.name} className="object-contain drop-shadow-sm" width={100} height={100} />
                </div>
              </div>
              <span className="text-stone-950 text-[10px] font-black tracking-widest uppercase drop-shadow-sm opacity-60">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={`fixed left-0 right-0 bottom-0 z-50 bg-[#fffcf5] transition-transform duration-500 cubic-bezier(0.32,0.72,0,1) ${currentApp ? 'translate-y-0 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]' : 'translate-y-full'
          }`}
        style={{ top: '3.5rem', borderTopLeftRadius: '2.5rem', borderTopRightRadius: '2.5rem' }}
      >
        <div className="h-full w-full overflow-y-auto no-scrollbar">
          <div className="w-full max-w-md mx-auto min-h-full px-4 pb-10">

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
    <Suspense fallback={<div className="h-screen w-full bg-zinc-950 flex items-center justify-center text-white"><CyberpunkBoot onComplete={function (): void {
      throw new Error("Function not implemented.")
    }} /></div>}>
      <OSContent />
    </Suspense>
  )
}
