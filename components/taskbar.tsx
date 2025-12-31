"use client"

import { useState, useEffect } from "react"
import Image from 'next/image'
import { version, name } from "../package.json"
import { GlitchText } from "./glitch-text"
import {
  Settings,
  Power,
  Wifi,
  Battery,
  Volume1,
  ExternalLink,
  Clipboard,
  Check
} from 'lucide-react'
import logoImg from '@/public/L.webp'

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
  const [isShuttingDown, setIsShuttingDown] = useState(false)
  const [time, setTime] = useState<Date | null>(null)

  const [copied, setCopied] = useState(false);
  const username = "death_tail";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(username);
      setCopied(true);
      // Reset the "Copied" state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!time) return null

  // Formatters for Erbil Time
  const timeString = time.toLocaleTimeString("en-US", {
    timeZone: "Asia/Baghdad",
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })

  const dateString = time.toLocaleDateString("en-US", {
    timeZone: "Asia/Baghdad",
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })


  const applications = [
    { type: "profile", icon: <Image src="/desktopLogo/Profile.webp" alt="profile Logo" property="true" width={100} height={100} />, name: "Profile" },
    { type: "projects", icon: <Image src="/desktopLogo/Projects.webp" alt="projects Logo" property="true" width={100} height={100} />, name: "Projects" },
    // { type: "terminal", icon: <Image src="/desktopLogo/Terminal.webp" alt="terminal Logo" property="true" width={100} height={100}/>, name: "Terminal" },
    { type: "contact", icon: <Image src="/desktopLogo/Contact.webp" alt="contact Logo" property="true" width={100} height={100} />, name: "Contact" },
    { type: "techstack", icon: <Image src="/desktopLogo/Techstack.webp" alt="techstack Logo" property="true" width={100} height={100} />, name: "Tech Stack" },
    { type: "resume", icon: <Image src="/desktopLogo/Resume.webp" alt="resume Logo" property="true" width={100} height={100} />, name: "Resume" },
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
      {isShuttingDown && (
        <div className="fixed inset-0 bg-black z-100 flex flex-col items-center justify-center font-mono">
          {/* Subtitle / System Status UI */}
          <div className="mb-8 text-center animate-pulse">
            <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] mb-2">System Status: Off</p>
            <div className="w-12 h-1px bg-zinc-800 mx-auto" />
          </div>

          {/* Main Button */}
          <button
            onClick={() => setIsShuttingDown(false)}
            className="group relative px-8 py-4 bg-green-950 hover:border-green-500 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />



            <span className="text-zinc-200 group-hover:text-white font-medium tracking-widest uppercase text-sm">
              Initialize System
            </span>

            {/* Subtle Glow Effect on Hover */}
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
          </button>

          {/* Bottom Info Bar (Optional, matches your site footer style) */}
          <div className="absolute bottom-10 flex gap-6 text-[12px] text-zinc-200 uppercase tracking-widest">
            <span>  <GlitchText
              text={name}
              className="text-xl font-bold mb-2"
              glitchColors={["#dc2626", "#eab308", "#3b82f6"]}
            />
            </span>

            <span>
              <GlitchText
                text={version}
                className="text-xl font-bold mb-2"
                glitchColors={["#dc2626", "#eab308", "#3b82f6"]}
              />
            </span>
          </div>
        </div>
      )}
      {/* Start Menu */}
      {startMenuOpen && (
        <div className="fixed bottom-12 left-0 flex flex-row items-stretch bg-neutral-900/50 backdrop-blur-xl z-40 border border-neutral-900/50 shadow-[0_0_40px_rgba(0,0,0,0.6)] rounded-tr-lg overflow-hidden animate-in slide-in-from-bottom-2 duration-200">

          {/* LEFT COLUMN: Applications List */}
          <div className="w-64 flex flex-col border-r border-white/5 bg-neutral-900/40">
            <div className="p-4 pb-2">
              <div className="border-l-2 border-neutral-500 pl-3">
                <span className="text-neutral-400 text-[10px] font-bold tracking-widest uppercase">System Apps</span>
              </div>
            </div>

            {/* Scrollable App List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {applications.map((app) => (
                <button
                  key={app.type}
                  onClick={() => {
                    if (app.type === "resume") {
                      window.open("/resume/Dyari Ali Tahir - Fullstack Developer.pdf", "_blank")
                      return
                    }
                    onOpenWindow(app.type)
                    setStartMenuOpen(false)
                  }}
                  className="w-full flex items-center p-2 hover:bg-white/5 transition-colors rounded group cursor-pointer"
                >
                  <div className="mr-3 flex items-center justify-center w-10 h-10 p-1 group-hover:border-neutral-500/30 transition-colors">
                    {typeof app.icon.type === 'string' && app.icon.type === 'img' ? (
                      <span className="inline-block w-full h-full group-hover:scale-110 transition-transform">
                        {app.icon}
                      </span>
                    ) : (
                      <span className="w-full h-full flex items-center justify-center">{app.icon}</span>
                    )}
                  </div>
                  <span className="text-neutral-200 text-sm font-medium group-hover:text-neutral-400 transition-colors">{app.name}</span>
                </button>
              ))}
            </div>

            <div className="p-2 border-t border-white/5 bg-black/20">
              <button className="w-full flex items-center p-2 hover:bg-red-500/10 hover:text-red-400 text-neutral-400 transition-colors rounded mb-1 cursor-pointer"
                onClick={() => setIsShuttingDown(true)}>
                <Power className="w-4 h-4 mr-3" />
                <span className="text-xs font-medium">Shutdown System</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Tiles (Socials) */}
          <div className="w-80 bg-black/20 p-4 flex flex-col">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-neutral-400 text-[10px] font-bold tracking-widest uppercase">Social Grid</span>
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
                            bg-neutral-800/10 border border-white/5 overflow-hidden
                            transition-all duration-300 group
                            hover:bg-neutral-800/80 hover:border-neutral-500/40 hover:shadow-[0_0_30px_rgba(97,95,255,0.1)]
                            ${item.preferred ? 'ring-1 ring-neutral-500/30 bg-neutral-900/10' : ''}
                        `}
                >
                  {/* Preferred Badge */}
                  {item.preferred && (
                    <div className="absolute top-0 right-0 bg-neutral-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl shadow-sm z-10">
                      PREFERED
                    </div>
                  )}

                  <div className="flex items-start justify-between z-10">
                    <div className="w-8 h-8 relative rounded-md overflow-hidden  group-hover:border-neutral-500/50 transition-colors">
                      <Image
                        src={item.iconPath}
                        alt={item.platform}
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <ExternalLink className="w-3 h-3 text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:text-neutral-400 transition-all -translate-y-2 group-hover:translate-y-2" />
                  </div>

                  {/* Content: Handle vs Description on Hover */}
                  <div className="z-10 relative">
                    {/* Default View */}
                    <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
                      <div className="text-[10px] font-bold text-neutral-300 tracking-wider">{item.platform}</div>
                      <div className="text-[10px] text-neutral-500 truncate">{item.handle}</div>
                    </div>

                    {/* Hover View (Slide Up) */}
                    <div className="absolute inset-0 pt-1 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-[-0.4rem]">
                      <p className="text-[10px] leading-tight text-neutral-300 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-neutral-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
              <span
                onClick={copyToClipboard}
                title="Click to copy username"
                rel="noopener noreferrer"
                className={`
                            relative flex flex-col justify-between p-3 cursor-pointer
                            bg-neutral-800/10 border border-white/5 overflow-hidden
                            transition-all duration-300 group
                            hover:bg-neutral-800/80 hover:border-neutral-500/40 hover:shadow-[0_0_30px_rgba(97,95,255,0.1)]
                            {'ring-1 ring-neutral-500/30 bg-neutral-900/10'}
                        `}
              >
                {/* Preferred Badge */}
                <div className="absolute top-0 right-0 bg-neutral-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl shadow-sm z-10">
                  PREFERED
                </div>


                <div className="flex items-start justify-between z-10">
                  <div className="w-8 h-8 relative rounded-md overflow-hidden  group-hover:border-neutral-500/50 transition-colors">
                    <Image
                      src="/Icons/discord.avif"
                      alt="death_tail"
                      width={32}
                      height={32}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="text-neutral-600 group-hover:text-neutral-400 transition-all pt-2">
                    {copied ? (
                      <span className="text-white text-xs rounded">Copied!</span>
                    ) : (
                      <Clipboard className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all" />
                    )}
                  </div>
                </div>

                {/* Content: Handle vs Description on Hover */}
                <div className="z-10 relative">
                  {/* Default View */}
                  <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
                    <div className="text-[10px] font-bold text-neutral-300 tracking-wider">DISCORD</div>
                    <div className="text-[10px] text-neutral-500 truncate">death_tail</div>
                    <div className="text-[10px] text-neutral-500 truncate"></div>
                  </div>

                  {/* Hover View (Slide Up) */}
                  <div className="absolute inset-0 pt-1 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-[-0.4rem]">
                    <p className="text-[10px] leading-tight text-neutral-300 font-medium">
                      Chat & Collab
                    </p>
                  </div>
                </div>
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-neutral-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="text-[10px] text-neutral-500">
                <span className="block">Logged in as Guest</span>
              </div>
              <Settings className="w-4 h-4 text-neutral-100 hover:text-neutral-400 cursor-pointer transition-colors" />
            </div>
          </div>

        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-neutral-900/80 flex items-center px-2 z-40">

        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="h-10 px-4 flex items-center mr-2 border-r-3 border-neutral-500/30 hover:bg-neutral-500/10 transition-colors rounded"
        >
          <div className="w-10 h-10 mr-2">
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
            // 1. Determine the icon to show
            let iconToDisplay = null;

            if (window.type.startsWith("properties-")) {
              // Get the base type (e.g., "profile" from "properties-profile")
              const baseType = window.type.split("-")[1];
              const baseApp = applications.find(app => app.type === baseType);

              // Wrap the icon in a container with a small "info" badge or just use the base icon
              iconToDisplay = (
                <div className="relative">
                  {baseApp?.icon}
                </div>
              );
            } else {
              // Normal application icon
              const app = applications.find(app => app.type === window.type);
              iconToDisplay = app?.icon;
            }

            return (
              <button
                key={window.id}
                onClick={() => handleWindowClick(window)}
                className={`h-10 px-3 transition-all flex items-center rounded gap-2 group ${window.isMinimized
                  ? "hover:bg-neutral-500/10 text-neutral-400"
                  : "bg-neutral-500/20 text-neutral-300 border-b-2 border-neutral-400"
                  }`}
              >
                <span className="flex items-center justify-center w-6 h-6 transform group-hover:scale-110 transition-transform">
                  {iconToDisplay}
                </span>
              </button>
            );
          })}
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-neutral-400">
            <Wifi className="w-4 h-4 text-white" />
            <div className="pr-1"></div>
            <Volume1 className="w-4 h-4 text-white" />
            <div className="pr-1"></div>
            <Battery className="w-4 h-4 text-red-700" />
            <div className="pr-1"></div>
          </div>
          <div className="flex flex-col items-end mr-2 text-white select-none">
            <div className="text-white text-xs font-mono">{timeString}</div>
            <div className="text-white text-xs font-mono ml-4">{dateString}</div>
          </div>

        </div>
      </div>
    </>
  )
}
