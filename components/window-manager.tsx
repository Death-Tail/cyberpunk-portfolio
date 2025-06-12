"use client"

import { ProfileWindow } from "./windows/profile-window"
import { ProjectsWindow } from "./windows/projects-window"
import { TerminalWindow } from "./windows/terminal-window"
import { ContactWindow } from "./windows/contact-window"
import { TechStackWindow } from "./windows/tech-stack-window"

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

    switch (window.type) {
      case "profile":
        return <ProfileWindow key={window.id} {...commonProps} />
      case "projects":
        return <ProjectsWindow key={window.id} {...commonProps} />
      case "terminal":
        return <TerminalWindow key={window.id} {...commonProps} />
      case "contact":
        return <ContactWindow key={window.id} {...commonProps} />
      case "techstack":
        return <TechStackWindow key={window.id} {...commonProps} />
      default:
        return null
    }
  }

  return <div className="fixed inset-0 z-20">{windows.map(renderWindow)}</div>
}
