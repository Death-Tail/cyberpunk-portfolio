"use client"

import { useState, useEffect } from "react"
import Image from 'next/image'
import {
  Settings,
  Power,
  Wifi,
  Battery,
  Volume1,
  ExternalLink,
  Star
} from 'lucide-react'
import logoImg from '@/public/logoImg.webp'

interface Window {
  id: string
  title: string
  type: string
  isMinimized: boolean
  zIndex: number
}

interface TaskbarProps {
  windows: Window[]
  onOpenWindow: (type: string) => void
  onFocusWindow: (id: string) => void
  onMinimizeWindow: (id: string) => void
}

export function Taskbar({ windows, onOpenWindow, onFocusWindow, onMinimizeWindow }: TaskbarProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString())
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const applications = [
    { type: "profile", icon: <Image src="/desktopLogo/Profile.webp" alt="profile Logo" property="true" width={100} height={100}/>, name: "Profile" },
    { type: "projects", icon: <Image src="/desktopLogo/projects.webp" alt="projects Logo" property="true" width={100} height={100}/>, name: "Projects"},
    // { type: "terminal", icon: <Image src="/desktopLogo/Terminal.webp" alt="terminal Logo" property="true" width={100} height={100}/>, name: "Terminal" },
    { type: "contact", icon: <Image src="/desktopLogo/Contact.webp" alt="contact Logo" property="true" width={100} height={100}/>, name: "Contact" },
    { type: "techstack", icon: <Image src="/desktopLogo/Techstack.webp" alt="techstack Logo" property="true" width={100} height={100}/>, name: "Tech Stack" },
    { type: "resume", icon: <Image src="/desktopLogo/Resume.webp" alt="resume Logo" property="true" width={100} height={100}/>, name: "Resume" },
  ]

  const contactLinks = [
    {
      platform: "EMAIL",
      link: "mailto:dyarialitaher03@gmail.com",
      handle: "dyarialitaher03",
      iconPath: "/Icons/gmail.avif",
      description: "Professional inquiries",
      preferred: false,
    },
    {
      platform: "GITHUB",
      link: "https://github.com/Death-Tail",
      handle: "Death-Tail",
      iconPath: "/Icons/github.avif",
      description: "Code & Contributions",
      preferred: false,
    },
    {
      platform: "LINKEDIN",
      link: "https://www.linkedin.com/in/dyarialitahir/",
      handle: "Dyari Ali Tahir",
      iconPath: "/Icons/linkedin.avif",
      description: "Network & Career",
      preferred: false,
    },
    {
      platform: "DISCORD",
      link: "https://discord.com/users/death_tail",
      handle: "death_tail",
      iconPath: "/Icons/discord.avif",
      description: "Chat & Collab",
      preferred: true,
    },
    {
      platform: "X",
      link: "https://x.com/Death_Tail0331",
      handle: "@Death_Tail0331",
      iconPath: "/Icons/x.avif",
      description: "Social Updates",
      preferred: false,
    },
    {
      platform: "INSTAGRAM",
      link: "https://www.instagram.com/dyari_ali_taher/",
      handle: "@dyari_ali_taher",
      iconPath: "/Icons/instagram.avif",
      description: "Brain rot reels at 3am.",
      preferred: false,
    },
  ]

  const handleWindowClick = (window: Window) => {
    if (window.isMinimized) {
      onFocusWindow(window.id)
    } else {
      onMinimizeWindow(window.id)
    }
  }

  return (
    <>
      {/* Start Menu */}
      {startMenuOpen && (
        <div className="fixed bottom-12 left-0 flex flex-row items-stretch bg-stone-950/50 backdrop-blur-xl z-50 border border-indigo-900/50 shadow-[0_0_40px_rgba(0,0,0,0.6)] rounded-tr-lg overflow-hidden animate-in slide-in-from-bottom-2 duration-200">

          {/* LEFT COLUMN: Applications List */}
          <div className="w-64 flex flex-col border-r border-white/5 bg-stone-900/40">
            <div className="p-4 pb-2">
              <div className="border-l-2 border-indigo-500 pl-3">
                <span className="text-stone-400 text-[10px] font-bold tracking-widest uppercase">System Apps</span>
              </div>
            </div>

            {/* Scrollable App List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {applications.map((app) => (
                <button
                  key={app.type}
                  onClick={() => {
                    if(app.type === "resume") {
                      window.open("/resume/Dyari Ali - Web Developer.pdf", "_blank")
                      return
                    }
                    onOpenWindow(app.type)
                    setStartMenuOpen(false)
                  }}
                  className="w-full flex items-center p-2 hover:bg-white/5 transition-colors rounded group cursor-pointer"
                >
                  <div className="mr-3 flex items-center justify-center w-10 h-10 bg-stone-800/50 rounded p-1 border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                    {typeof app.icon.type === 'string' && app.icon.type === 'img' ? (
                      <span className="inline-block w-full h-full group-hover:scale-110 transition-transform">
                        {app.icon}
                      </span>
                    ) : (
                      <span className="w-full h-full flex items-center justify-center">{app.icon}</span>
                    )}
                  </div>
                  <span className="text-stone-200 text-sm font-medium group-hover:text-indigo-400 transition-colors">{app.name}</span>
                </button>
              ))}
            </div>

            <div className="p-2 border-t border-white/5 bg-black/20">
              <button className="w-full flex items-center p-2 hover:bg-red-500/10 hover:text-red-400 text-stone-400 transition-colors rounded mb-1 cursor-pointer">
                <Power className="w-4 h-4 mr-3" />
                <span className="text-xs font-medium">Shutdown System</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Tiles (Socials) */}
          <div className="w-80 bg-black/20 p-4 flex flex-col">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-stone-400 text-[10px] font-bold tracking-widest uppercase">Social Grid</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 gap-2 auto-rows-[100px]">
                {contactLinks.map((item) => (
                    <a
                        key={item.platform}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            relative flex flex-col justify-between p-3
                            bg-stone-800/40 border border-white/5 overflow-hidden
                            transition-all duration-300 group
                            hover:bg-stone-800/80 hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(20,184,166,0.1)]
                            ${item.preferred ? 'ring-1 ring-indigo-500/30 bg-indigo-900/10' : ''}
                        `}
                    >
                        {/* Preferred Badge */}
                        {item.preferred && (
                           <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl shadow-sm z-10">
                            PREFERED
                           </div>
                        )}

                        <div className="flex items-start justify-between z-10">
                            <div className="w-8 h-8 relative rounded-md overflow-hidden bg-black/20 p-1 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                                <Image
                                  src={item.iconPath}
                                  alt={item.platform}
                                  width={32}
                                  height={32}
                                  className="object-contain w-full h-full"
                                />
                            </div>
                            <ExternalLink className="w-3 h-3 text-stone-600 opacity-0 group-hover:opacity-100 group-hover:text-indigo-400 transition-all -translate-y-2 group-hover:translate-y-2" />
                        </div>

                        {/* Content: Handle vs Description on Hover */}
                        <div className="z-10 relative">
                             {/* Default View */}
                            <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
                                <div className="text-[10px] font-bold text-stone-300 tracking-wider">{item.platform}</div>
                                <div className="text-[10px] text-stone-500 truncate">{item.handle}</div>
                            </div>

                            {/* Hover View (Slide Up) */}
                            <div className="absolute inset-0 pt-1 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-[-0.4rem]">
                                <p className="text-[10px] leading-tight text-indigo-300 font-medium">
                                  {item.description}
                                </p>
                            </div>
                        </div>

                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="text-[10px] text-stone-500">
                    <span className="block">Logged in as Guest</span>
                </div>
                <Settings className="w-4 h-4 text-stone-600 hover:text-indigo-400 cursor-pointer transition-colors" />
            </div>
          </div>

        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-stone-950 border-t-2 border-indigo-500 flex items-center px-2 z-40">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-indigo-500/40 via-emerald-500/40 to-cyan-500/40"></div>

        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="h-8 px-4 flex items-center mr-2 border-r-2 border-indigo-900/30 hover:bg-indigo-500/10 transition-colors rounded"
        >
          <div className="w-7 h-7 mr-2">
            <Image
              src={logoImg}
              placeholder="blur"
              width={500}
              height={500}
              alt="Logo of the start menu button"
              className="object-cover object-center select-none pointer-events-none"
            />
          </div>
        </button>


        <div className="flex space-x-1 flex-1">
          {windows.map((window) => {
            const app = applications.find(app => app.type === window.type);
            return (
              <button
                name={`${window.title}-button`}
                key={window.id}
                onClick={() => handleWindowClick(window)}
                className={`h-8 px-3 transition-colors flex items-center rounded ${window.isMinimized
                  ? "hover:bg-indigo-500/10 text-stone-400"
                  : "bg-indigo-500/20 text-indigo-300"
                }`}
              >
                <span className="flex items-center justify-center" style={{ width: 24, height: 24 }}>
                  {app?.icon}
                </span>
              </button>
            );
          })}
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-stone-400">
            <Wifi className="w-4 h-4 text-white" />
            <div className="pr-1"></div>
            <Volume1 className="w-4 h-4 text-white" />
            <div className="pr-1"></div>
            <Battery className="w-4 h-4 text-red-700" />
            <div className="pr-1"></div>
          </div>
          <div className="text-white text-xs font-mono">{currentTime}</div>
        </div>
      </div>
    </>
  )
}
