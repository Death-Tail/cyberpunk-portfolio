"use client"

import dynamic from 'next/dynamic'
import { Loader2, Minus, X } from 'lucide-react'
import { Suspense } from 'react'

const WINDOW_CONFIGS: Record<string, { width: number; height: number; x: number; y: number }> = {
  profile: { width: 550, height: 620, x: 100, y: 80 },
  projects: { width: 900, height: 650, x: 100, y: 50 },
  terminal: { width: 1000, height: 500, x: 200, y: 0 },
  contact: { width: 600, height: 800, x: 100, y: 100 },
  techstack: { width: 860, height: 620, x: 250, y: 120 },
  properties: { width: 320, height: 420, x: 150, y: 150 },
}

const WindowSkeleton = ({ title, type, zIndex }: { title: string, type: string, zIndex: number }) => {
  const config = type.startsWith('properties-') ? WINDOW_CONFIGS.properties : (WINDOW_CONFIGS[type] || { width: 500, height: 400, x: 100, y: 100 })

  return (
    <div
      style={{
        position: 'absolute',
        left: `${config.x}px`,
        top: `${config.y}px`,
        width: `${config.width}px`,
        height: `${config.height}px`,
        zIndex: zIndex
      }}
      className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[20px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300"
    >
      <div className="px-5 py-4 flex items-center justify-between border-b bg-white/40 border-white/50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-memory-pink/40 border border-white/30" />
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-600">
            {title}
          </h2>
        </div>
        <div className="flex gap-2 opacity-50">
          <div className="w-8 h-8 rounded-xl bg-mist-300/20" />
          <div className="w-8 h-8 rounded-xl bg-red-400/20" />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-memory-pink animate-spin opacity-30" />
      </div>
    </div>
  )
}

const ProfileWindow = dynamic(() => import("./windows/profile-window").then(mod => mod.ProfileWindow), { ssr: false })
const ProjectsWindow = dynamic(() => import("./windows/projects-window").then(mod => mod.ProjectsWindow), { ssr: false })
const TerminalWindow = dynamic(() => import("./windows/terminal-window").then(mod => mod.TerminalWindow), { ssr: false })
const ContactWindow = dynamic(() => import("./windows/contact-window").then(mod => mod.ContactWindow), { ssr: false })
const TechStackWindow = dynamic(() => import("./windows/tech-stack-window").then(mod => mod.TechStackWindow), { ssr: false })
const PropertiesWindow = dynamic(() => import("./windows/properties-window").then(mod => mod.PropertiesWindow), { ssr: false })

interface Window {
  id: string
  title: string
  type: string
  isMinimized: boolean
  zIndex: number
}

interface WindowManagerProps {
  windows: Window[]
  activeWindow: string
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onFocus: (id: string) => void
}

export function WindowManager({ windows, activeWindow, onClose, onMinimize, onFocus }: WindowManagerProps) {

  const renderWindow = (window: Window) => {
    const commonProps = {
      id: window.id,
      title: window.title,
      isActive: activeWindow === window.id,
      isMinimized: window.isMinimized,
      zIndex: window.zIndex,
      onClose: () => onClose(window.id),
      onMinimize: () => onMinimize(window.id),
      onFocus: () => onFocus(window.id),
    }

    const getContent = () => {
      if (window.type.startsWith("properties-")) {
        const targetType = window.type.split("-")[1]
        return <PropertiesWindow {...commonProps} targetType={targetType} />
      }
      switch (window.type) {
        case "profile":
          return <ProfileWindow {...commonProps} />
        case "projects":
          return <ProjectsWindow {...commonProps} />
        case "terminal":
          return <TerminalWindow {...commonProps} />
        case "contact":
          return <ContactWindow {...commonProps} />
        case "techstack":
          return <TechStackWindow {...commonProps} />
        default:
          return null
      }
    }

    return (
      <Suspense fallback={<WindowSkeleton title={window.title} type={window.type} zIndex={window.zIndex} />}>
        {getContent()}
      </Suspense>
    )
  }

  return (
    <div className="fixed inset-0 z-80 pointer-events-none">
      {windows.map((window) => (
        <div key={window.id} style={{ position: "absolute", zIndex: window.zIndex, pointerEvents: "auto" }}>
          {renderWindow(window)}
        </div>
      ))}
    </div>
  )
}
