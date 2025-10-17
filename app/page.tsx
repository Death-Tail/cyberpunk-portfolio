"use client"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { WindowManager } from "@/components/window-manager"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import MobileOS from "@/components/mobile-os"
import { CyberpunkBoot } from "@/components/cyberpunk-boot"

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
  const [isBooting, setIsBooting] = useState(true)
  const [showDesktop, setShowDesktop] = useState(false)
  const isMobile = useIsMobile()


  // Handle boot sequence completion
  const handleBootComplete = () => {
    setIsBooting(false)
    setTimeout(() => {
      setShowDesktop(true)
      // Generate unique IDs for initial windows
      const profileId = `profile-${Date.now()}`
      setOpenWindows([{ id: profileId, title: "Profile", type: "profile", isMinimized: false, zIndex: 3 }])
      setActiveWindow(profileId)
    }, 500)


  }
  const openWindow = (windowType: string) => {
    // Check if window of this type already exists
    const existingWindow = openWindows.find((w) => w.type === windowType)

    if (existingWindow) {
      // If it exists, just focus it and unminimize if needed
      focusWindow(existingWindow.id)
      if (existingWindow.isMinimized) {
        setOpenWindows((prev) => prev.map((w) => (w.id === existingWindow.id ? { ...w, isMinimized: false } : w)))
      }
      return
    }

    // Create new window with proper positioning
    const windowId = `${windowType}-${Date.now()}`

    const newWindow = {
      id: windowId,
      title: `${windowType.charAt(0).toUpperCase() + windowType.slice(1)}`,
      type: windowType,
      isMinimized: false,
      zIndex: Math.max(...openWindows.map((w) => w.zIndex), 0) + 1,
    }

    setOpenWindows((prev) => [...prev, newWindow])
    setActiveWindow(windowId)
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId))

    // Update active window
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

    // If minimizing the active window, find next active window
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
    const maxZ = Math.max(...openWindows.map((w) => w.zIndex), 0)
    setOpenWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w)))
    setActiveWindow(windowId)
  }
  if (isMobile) {
    return <MobileOS />
  }

  return (
    <main className="fixed inset-0 bg-zinc-900 text-red-50 overflow-hidden font-mono">
      {isBooting ? (
        <CyberpunkBoot onComplete={handleBootComplete} />
      ) : (
        <>
          {/* Desktop Background */}
          <div className={`transition-opacity duration-1000 ${showDesktop ? "opacity-100" : "opacity-0"}`}>
            <Desktop onOpenWindow={openWindow} />
            {/* Window Manager */}
            <WindowManager
              windows={openWindows}
              activeWindow={activeWindow}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={focusWindow}
            />

            {/* Taskbar */}
            <Taskbar
              windows={openWindows}
              onOpenWindow={openWindow}
              onFocusWindow={focusWindow}
              onMinimizeWindow={minimizeWindow}
            />
          </div>
        </>
      )}
    </main>
  )
}
