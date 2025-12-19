"use client"

import type React from "react"
import Image from "next/image"
import { Icons } from "@/public/desktopLogo"
import bgImg from "@/public/bg.jpg"
import { useEffect, useRef, useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { DateWeatherWidget } from "./windows/widgets/DateWeatherWidget"
// import { MusicPlayerWidget } from "./windows/widgets/MusicPlayerWidget"

// Widgets


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

  const desktopIcons: DesktopIcon[] = [
    {
      id: "profile-icon",
      type: "profile",
      name: "Profile",
      icon: <Image placeholder="blur" src={Icons.Profile} alt="profile logo" property="true" width={100} height={100} />
    },
    {
      id: "projects-icon",
      type: "projects",
      name: "Projects",
      icon: <Image placeholder="blur" src={Icons.Projects} alt="project logo" property="true" width={100} height={100} />
    },
    // {
    //   id: "terminal-icon",
    //   type: "terminal",
    //   name: "Terminal",
    //   icon: <Image placeholder="blur" src={Icons.Terminal} alt="terminal logo" property="true" width={100} height={100} />
    // },
    {
      id: "contact-icon",
      type: "contact",
      name: "Contact",
      icon: <Image placeholder="blur" src={Icons.Contact} alt="contact logo" property="true" width={100} height={100} />
    },
    {
      id: "techstack-icon",
      type: "techstack",
      name: "Tech Stack",
      icon: <Image placeholder="blur" src={Icons.Techstack} alt="tech stack logo" property="true" width={100} height={100} />
    },
    {
      id: "Resume",
      type: "resume",
      name: "Resume",
      icon: <Image placeholder="blur" src={Icons.Resume} alt="resume logo" property="true" width={100} height={100} />
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
      window.open("/resume/Dyari Ali - Web Developer.pdf", "_blank")
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
    const baseClasses = "flex flex-col items-center p-2 rounded cursor-pointer transition-all duration-150"
    if (isSelected) {
      return cn(baseClasses, "bg-neutral-600/30 shadow-[0_0_10px_rgba(220,38,38,0.3)]")
    }
    return cn(baseClasses, "hover:bg-neutral-500/20")
  }

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ pointerEvents: "none" }} />

      <div className="fixed inset-0 z-0 opacity-85 overflow-hidden">
        <Image
          src={bgImg}
          alt="Background logo"
          fill
          className="object-cover object-bottom select-none pointer-events-none"
          priority
        />
      </div>

      {/* --- Widgets --- */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in duration-1000 pointer-events-none">
        <div className="pointer-events-auto">
          <DateWeatherWidget />
        </div>
      </div>


      {/* <div className=" fixed bottom-15 right-3 z-20">
        <MusicPlayerWidget />
      </div> */}


      {/* --- Desktop Icons --- */}
      <div className="fixed top-4 left-4 grid grid-cols-1 gap-4 z-10">
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
            <div className={cn(
              "w-14 h-14 rounded-md flex items-center justify-center mb-1",
              "backdrop-blur-sm bg-black/20",
              "shadow-[0_0_8px_var(--glow-color),inset_0_0_8px_var(--glow-color)]",
            )}>
              {icon.icon}
            </div>
            <span className="text-[12px] mt-1 text-center font-mono tracking-wide text-white text-shadow">
              {icon.name}
            </span>
            {selectedIcon === icon.id && (
              <div className="absolute inset-0 border border--500 rounded pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>

      {/* --- Context Menu --- */}
      {contextMenu.visible && (
        <div
          className="fixed z-50 bg-zinc-900 border border-neutral-600 shadow-lg py-1 w-48"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
            transform: `translate(${contextMenu.x + 192 > window.innerWidth ? "-100%" : "0"}, 0)`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.iconId && (
            <>
              <div className="px-3 py-1 text-xs text-purple-300 border-b border-neutral-600/30">
                {desktopIcons.find((icon) => icon.id === contextMenu.iconId)?.name || "Options"}
              </div>

              <button
                className="w-full text-left px-3 py-1.5 text-sm text-white hover:bg-neutral-600/20 flex items-center"
                onClick={() => {
                  const icon = desktopIcons.find((icon) => icon.id === contextMenu.iconId)
                  if (icon) {
                    if (icon.type === "resume") {
                      window.open("/resume/Dyari Ali - Web Developer.pdf", "_blank")
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
                className="w-full text-left px-3 py-1.5 text-sm text-white hover:bg-neutral-500/20 flex items-center"
                onClick={() => setContextMenu({ ...contextMenu, visible: false })}
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
