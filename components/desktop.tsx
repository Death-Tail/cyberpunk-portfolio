"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { User, FolderOpen, Terminal, Mail, Code, Settings, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DesktopProps {
  onOpenWindow: (type: string) => void
}

interface DesktopIcon {
  id: string
  type: string
  name: string
  icon: React.ReactNode
  color: "red" | "yellow" | "blue"
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
      icon: <img src="/desktop logo/profile.avif" />,
      color: "red",
    },
    {
      id: "projects-icon",
      type: "projects",
      name: "Projects",
      icon: <img src="/desktop logo/project.avif" />,
      color: "yellow",
    },
    {
      id: "terminal-icon",
      type: "terminal",
      name: "Terminal",
      icon: <img src="/desktop logo/terminal.avif" />,
      color: "blue",
    },
    {
      id: "contact-icon",
      type: "contact",
      name: "Contact",
      icon: <img src="/desktop logo/contact.avif" />,
      color: "red",
    },
    {
      id: "techstack-icon",
      type: "techstack",
      name: "Tech Stack",
      icon: <img src="/desktop logo/techstack.avif" />,
      color: "yellow",
    }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateSize = () => {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawBackground()
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    function drawBackground() {
      if (!canvas || !ctx) return;
      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#0f0f0f")
      gradient.addColorStop(0.5, "#1a1a1a")
      gradient.addColorStop(1, "#0f0f0f")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add circuit-like lines
      ctx.strokeStyle = "rgba(220, 38, 38, 0.1)"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let i = 0; i < canvas.height; i += 100) {
        if (Math.random() > 0.7) {
          ctx.beginPath()
          ctx.moveTo(0, i)
          ctx.lineTo(canvas.width, i)
          ctx.stroke()
        }
      }

      // Vertical lines
      for (let i = 0; i < canvas.width; i += 100) {
        if (Math.random() > 0.7) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i, canvas.height)
          ctx.stroke()
        }
      }

      // Add some yellow lines
      ctx.strokeStyle = "rgba(234, 179, 8, 0.1)"
      for (let i = 0; i < 10; i++) {
        const x1 = Math.random() * canvas.width
        const y1 = Math.random() * canvas.height
        const x2 = x1 + (Math.random() * 200 - 100)
        const y2 = y1 + (Math.random() * 200 - 100)

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      // Add some blue dots
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 3 + 1
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add some glowing red dots
      ctx.fillStyle = "rgba(220, 38, 38, 0.3)"
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  const handleIconClick = (iconId: string) => {
    setSelectedIcon(iconId)
  }

  const handleIconDoubleClick = (iconType: string) => {
    onOpenWindow(iconType)
    setSelectedIcon(null)
  }

  const handleContextMenu = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault()
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      iconId,
    })
  }

  const handleDocumentClick = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false })
    }
    setSelectedIcon(null)
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick)
    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [contextMenu.visible])

  const getIconColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = "flex flex-col items-center p-2 rounded cursor-pointer transition-all duration-150"

    if (isSelected) {
      return cn(baseClasses, "bg-red-600/30 shadow-[0_0_10px_rgba(220,38,38,0.3)]")
    }

    if (color === "yellow") {
      return cn(baseClasses, "hover:bg-yellow-500/20")
    } else if (color === "blue") {
      return cn(baseClasses, "hover:bg-blue-500/20")
    } else {
      return cn(baseClasses, "hover:bg-red-500/20")
    }
  }

  const getIconBgClasses = (color: string) => {
    if (color === "yellow") {
      return "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
    } else if (color === "blue") {
      return "bg-blue-500/20 border-blue-500/50 text-blue-400"
    } else {
      return "bg-red-600/20 border-red-600/50 text-red-400"
    }
  }

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ pointerEvents: "none" }} />

      {/* Centered Logo Overlay */}
      <img
        src="/logoT.avif"
        alt="LogoT"
        className="fixed left-1/2 top-1/2 z-0"
        style={{
          transform: "translate(-50%, -50%)",
          maxWidth: "30vw",
          maxHeight: "30vh",
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />

      {/* Desktop Icons */}
      <div className="fixed top-4 left-4 grid grid-cols-1 gap-4 z-10">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className={getIconColorClasses(icon.color, selectedIcon === icon.id)}
            onClick={(e) => {
              e.stopPropagation()
              handleIconClick(icon.id)
            }}
            onDoubleClick={() => handleIconDoubleClick(icon.type)}
            onContextMenu={(e) => handleContextMenu(e, icon.id)}
          >
            <div className={`w-10 h-10 border ${getIconBgClasses(icon.color)} flex items-center justify-center mb-1`}>
              {icon.icon}
            </div>
            <span
              className={`text-${icon.color === "yellow" ? "yellow" : icon.color === "blue" ? "blue" : "red"}-400 text-xs text-center px-1`}
            >
              {icon.name}
            </span>

            {/* Selection indicator */}
            {selectedIcon === icon.id && (
              <div className="absolute inset-0 border border-red-500 rounded pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="fixed z-50 bg-zinc-900 border border-red-600 shadow-lg py-1 w-48"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
            transform: `translate(${contextMenu.x + 192 > window.innerWidth ? "-100%" : "0"}, 0)`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.iconId && (
            <>
              <div className="px-3 py-1 text-xs text-red-500 border-b border-red-600/30">
                {desktopIcons.find((icon) => icon.id === contextMenu.iconId)?.name || "Options"}
              </div>

              <button
                className="w-full text-left px-3 py-1.5 text-sm text-red-400 hover:bg-red-600/20 flex items-center"
                onClick={() => {
                  const icon = desktopIcons.find((icon) => icon.id === contextMenu.iconId)
                  if (icon) {
                    onOpenWindow(icon.type)
                    setContextMenu({ ...contextMenu, visible: false })
                  }
                }}
              >
                <span>Open</span>
                <ChevronRight className="w-3 h-3 ml-auto" />
              </button>

              <button
                className="w-full text-left px-3 py-1.5 text-sm text-yellow-400 hover:bg-yellow-500/20 flex items-center"
                onClick={() => {
                  setContextMenu({ ...contextMenu, visible: false })
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
