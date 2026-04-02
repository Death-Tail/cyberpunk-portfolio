"use client"

import type React from "react"
import Image from "next/image"
import { Icons } from "@/public/desktopLogo"
import bgImg from "@/public/bg4.png"
import { useEffect, useRef, useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { DateWeatherWidget } from "./windows/widgets/DateWeatherWidget"
import { MusicPlayerWidget } from "./windows/widgets/MusicPlayerWidget"

interface DesktopProps {
  onOpenWindow: (type: string) => void
}

interface DesktopIcon {
  id: string
  type: string
  name: string
  icon: React.ReactNode
}

export function Desktop({ onOpenWindow }: DesktopProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean
    x: number
    y: number
    iconId: string | null
  }>({
    visible: false,
    x: 0,
    y: 0,
    iconId: null,
  })
  const [isMounted, setIsMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number; width: number; height: number; rotation: number }>>([])

  useEffect(() => {
    setIsMounted(true)
    const particleData = Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: -(Math.random() * 20),
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 5,
      width: 8 + Math.random() * 8,
      height: 6 + Math.random() * 6,
      rotation: Math.random() * 360,
    }))
    setParticles(particleData)
  }, [])

  const desktopIcons: DesktopIcon[] = [
    {
      id: "profile-icon",
      type: "profile",
      name: "Profile",
      icon: (
        <Image
          placeholder="blur"
          src={Icons.Profile || "/placeholder.svg"}
          alt="profile logo"
          property="true"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: "projects-icon",
      type: "projects",
      name: "Projects",
      icon: (
        <Image
          placeholder="blur"
          src={Icons.Projects || "/placeholder.svg"}
          alt="project logo"
          property="true"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: "contact-icon",
      type: "contact",
      name: "Contact",
      icon: (
        <Image
          placeholder="blur"
          src={Icons.Contact || "/placeholder.svg"}
          alt="contact logo"
          property="true"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: "techstack-icon",
      type: "techstack",
      name: "Tech Stack",
      icon: (
        <Image
          placeholder="blur"
          src={Icons.Techstack || "/placeholder.svg"}
          alt="tech stack logo"
          property="true"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: "Resume",
      type: "resume",
      name: "Resume",
      icon: (
        <Image
          placeholder="blur"
          src={Icons.Resume || "/placeholder.svg"}
          alt="resume logo"
          property="true"
          width={100}
          height={100}
        />
      ),
    },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const updateSize = () => {
      if (!canvas || !ctx) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const handleIconClick = (iconId: string) => setSelectedIcon(iconId)

  const handleIconDoubleClick = (iconType: string) => {
    if (iconType === "resume") {
      window.open("/resume/Dyari Ali Tahir - Fullstack Developer.pdf", "_blank")
      return
    }
    onOpenWindow(iconType)
    setSelectedIcon(null)
  }

  const handleContextMenu = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault()
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, iconId })
  }

  const handleDocumentClick = () => {
    if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false })
    setSelectedIcon(null)
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick)
    return () => document.removeEventListener("click", handleDocumentClick)
  }, [contextMenu.visible])

  const getIconColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = "flex flex-col items-center p-2 rounded-xl cursor-pointer transition-all duration-300 group"
    if (isSelected) {
      return cn(baseClasses, "bg-white/40 backdrop-blur-md shadow-lg ring-2 ring-memory-pink/60")
    }
    return cn(baseClasses, "hover:bg-white/20 hover:backdrop-blur-sm")
  }

  return (
    <>
      {/* Canvas: constrained to end above the taskbar so it doesn't draw under it */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 right-0 bottom-12 z-0" style={{ pointerEvents: "none" }} />

      {/* Floating Petals */}
      {isMounted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute floating-petals"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                backgroundColor: i % 2 === 0 ? '#f9a8d4' : '#fff1f2',
                borderRadius: '100% 0% 100% 0% / 100% 0% 100% 0%',
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                transform: `rotate(${particle.rotation}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Wallpaper */}
      <div className="fixed top-0 left-0 right-0 bottom-14 z-0 opacity-90 overflow-hidden pointer-events-none">
        <Image
          src={bgImg || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover object-center select-none pointer-events-none"
          priority
        />
      </div>

      {/* --- Widgets --- */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in duration-1000 pointer-events-none">
        <div className="pointer-events-auto">
          <DateWeatherWidget />
        </div>
      </div>

      {/* --- Music Widget --- */}
      <div className="fixed bottom-16 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <MusicPlayerWidget />
      </div>

      {/* --- Desktop Icons --- */}
      <div className="fixed top-4 left-4 grid grid-cols-1 gap-4 z-40">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={getIconColorClasses(icon.type, selectedIcon === icon.id)}
            onClick={(e) => {
              e.stopPropagation()
              handleIconClick(icon.id)
            }}
            onDoubleClick={() => handleIconDoubleClick(icon.type)}
            onContextMenu={(e) => handleContextMenu(e, icon.id)}
          >
            <div
              className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center mb-1",
                "backdrop-blur-md bg-white/10 border border-white/20 transition-transform group-hover:scale-105 duration-300",
                "shadow-sm",
              )}
            >
              {icon.icon}
            </div>
            <span className="text-[12px] mt-1 text-center font-black tracking-tight text-stone-950 drop-shadow-sm">
              {icon.name}
            </span>
            {selectedIcon === icon.id && (
              <div className="absolute inset-0 border-2 border-memory-pink/50 rounded-xl pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>

      {/* --- Context Menu --- */}
      {contextMenu.visible && (
        <div
          className="fixed z-50 bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl py-1 w-48 rounded-lg overflow-hidden"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
            transform: `translate(${contextMenu.x + 192 > window.innerWidth ? "-100%" : "0"}, 0)`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.iconId && (
            <>
              <div className="px-3 py-1.5 text-[10px] text-stone-500 border-b border-white/20 font-black uppercase tracking-widest bg-white/20">
                {desktopIcons.find((icon) => icon.id === contextMenu.iconId)?.name || "Options"}
              </div>

              <button
                className="w-full text-left px-3 py-1.5 text-sm text-stone-900 font-bold hover:bg-memory-pink/20 flex items-center transition-colors"
                onClick={() => {
                  const icon = desktopIcons.find((icon) => icon.id === contextMenu.iconId)
                  if (icon) {
                    if (icon.type === "resume") {
                      window.open("/resume/Dyari Ali Tahir - Fullstack Developer.pdf", "_blank")
                    } else {
                      onOpenWindow(icon.type)
                    }
                    setContextMenu({ ...contextMenu, visible: false })
                  }
                }}
              >
                <span>Open</span>
                <ChevronRight className="w-3 h-3 ml-auto" />
              </button>
              <button
                className="w-full text-left px-3 py-1.5 text-sm text-fg-primary hover:bg-taskbar-hover flex items-center"
                onClick={() => {
                  const icon = desktopIcons.find((i) => i.id === contextMenu.iconId);
                  if (icon) {
                    // Logic: Tell the system to open the properties window for this specific type
                    onOpenWindow(`properties-${icon.type}`);
                    setContextMenu({ ...contextMenu, visible: false });
                  }
                }}
              >
                <span>Properties</span>
                <ChevronRight className="w-3 h-3 ml-auto" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
