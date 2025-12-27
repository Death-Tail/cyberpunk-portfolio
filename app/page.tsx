"use client"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { WindowManager } from "@/components/window-manager"
import { useState } from "react"
import MobileOS from "@/components/mobile-os"

interface WindowType {
  id: string
  title: string
  type: string
  isMinimized: boolean
  zIndex: number
}

export default function Home() {
  const [openWindows, setOpenWindows] = useState<WindowType[]>([])
  const [activeWindow, setActiveWindow] = useState("")

  const openWindow = (windowType: string) => {
    // 1. Check if this specific window type is already open
    const existingWindow = openWindows.find((w) => w.type === windowType)

    if (existingWindow) {
      focusWindow(existingWindow.id)
      if (existingWindow.isMinimized) {
        setOpenWindows((prev) => prev.map((w) => (w.id === existingWindow.id ? { ...w, isMinimized: false } : w)))
      }
      return
    }

    // 2. Generate a Unique ID
    const windowId = `${windowType}-${Date.now()}`

    // 3. Logic to handle Titles (Normal windows vs Properties windows)
    let displayTitle = ""
    if (windowType.startsWith("properties-")) {
      // Turns "properties-profile" into "Properties: profile"
      const target = windowType.split("-")[1]
      displayTitle = `Properties: ${target.charAt(0).toUpperCase() + target.slice(1)}`
    } else {
      // Standard capitalization for normal windows
      displayTitle = windowType.charAt(0).toUpperCase() + windowType.slice(1)
    }

    const newWindow = {
      id: windowId,
      title: displayTitle,
      type: windowType,
      isMinimized: false,
      zIndex: Math.max(...openWindows.map((w) => (w.zIndex ? w.zIndex : 0)), 0) + 1,
    }

    setOpenWindows((prev) => [...prev, newWindow])
    setActiveWindow(windowId)
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId))
    if (activeWindow === windowId) {
      const remaining = openWindows.filter((w) => w.id !== windowId)
      if (remaining.length > 0) {
        const topWindow = remaining.reduce((prev, current) => (prev.zIndex > current.zIndex ? prev : current))
        setActiveWindow(topWindow.id)
      } else {
        setActiveWindow("")
      }
    }
  }

  const minimizeWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w)))
    if (activeWindow === windowId) {
      const visibleWindows = openWindows.filter((w) => w.id !== windowId && !w.isMinimized)
      if (visibleWindows.length > 0) {
        const topWindow = visibleWindows.reduce((prev, current) => (prev.zIndex > current.zIndex ? prev : current))
        setActiveWindow(topWindow.id)
      } else {
        setActiveWindow("")
      }
    }
  }

  const focusWindow = (windowId: string) => {
    const maxZ = Math.max(...openWindows.map((w) => (w.zIndex ? w.zIndex : 0)), 0)
    setOpenWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w)))
    setActiveWindow(windowId)
  }

  return (
    <>
      <div className="block md:hidden">
        <MobileOS />
      </div>

      <main className="hidden md:block fixed inset-0 bg-zinc-900 text-red-50 overflow-hidden font-mono">
        <div className="transition-opacity duration-1000">
          <Desktop onOpenWindow={openWindow} />

          <WindowManager
            windows={openWindows}
            activeWindow={activeWindow}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={focusWindow}
          />

          <Taskbar
            windows={openWindows}
            onOpenWindow={openWindow}
            onFocusWindow={focusWindow}
            onMinimizeWindow={minimizeWindow}
          />
        </div>
      </main>
    </>
  )
}
