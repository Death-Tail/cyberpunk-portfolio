"use client"

import { useState } from "react"
import Image from 'next/image'
import { User, FolderOpen, Terminal, Mail, Code, Settings, Power, Wifi, Battery, Volume2 } from "lucide-react"

interface Window {
  id: string
  title: string
  icon: string
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

  const applications = [
    { type: "profile", icon: <User className="w-4 h-4" />, name: "Profile", color: "red" },
    { type: "projects", icon: <FolderOpen className="w-4 h-4" />, name: "Projects", color: "yellow" },
    { type: "terminal", icon: <Terminal className="w-4 h-4" />, name: "Terminal", color: "blue" },
    { type: "contact", icon: <Mail className="w-4 h-4" />, name: "Contact", color: "red" },
    { type: "techstack", icon: <Code className="w-4 h-4" />, name: "Tech Stack", color: "yellow" },
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
        <div className="fixed bottom-12 left-0 w-80 bg-zinc-900 border-2 border-red-600 z-50 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
          <div className="p-4">
            <div className="border-l-2 border-red-600 pl-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-yellow-500 mr-2"></div>
                <span className="text-red-500 text-xs tracking-wider">APPLICATIONS</span>
              </div>
            </div>

            <div className="space-y-2">
              {applications.map((app) => (
                <button
                  key={app.type}
                  onClick={() => {
                    onOpenWindow(app.type)
                    setStartMenuOpen(false)
                  }}
                  className="w-full flex items-center p-2 hover:bg-red-600/10 border border-red-600/30 transition-colors"
                >
                  <div
                    className={`p-2 border mr-3 ${app.color === "yellow"
                        ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                        : app.color === "blue"
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                          : "bg-red-600/20 border-red-600/50 text-red-400"
                      }`}
                  >
                    {app.icon}
                  </div>
                  <span className="text-red-400 text-sm">{app.name}.exe</span>
                </button>
              ))}
            </div>

            <div className="border-t border-red-600/30 mt-4 pt-4">
              <button className="w-full flex items-center p-2 hover:bg-red-600/10 border border-red-600/30 transition-colors">
                <div className="p-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 mr-3">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="text-red-400 text-sm">Settings</span>
              </button>
              <button className="w-full flex items-center p-2 hover:bg-red-600/10 border border-red-600/30 transition-colors">
                <div className="p-2 bg-red-600/20 border border-red-600/50 text-red-400 mr-3">
                  <Power className="w-4 h-4" />
                </div>
                <span className="text-red-400 text-sm">Shutdown</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-zinc-900 border-t-2 border-red-600 flex items-center px-2 z-40">
        {/* Accent line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 via-yellow-500/50 to-red-500/50"></div>

        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="h-8 px-4 bg-red-600/0  flex items-center mr-2  border-r-2 border-red-600/30"
        >
          <div className="w-7 h-7 mr-2">
            <Image
              src="/logo.png"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </button>

        {/* Window Buttons */}
        <div className="flex space-x-1 flex-1">
          {windows.map((window) => (
            <button
              key={window.id}
              onClick={() => handleWindowClick(window)}
              className={`h-8 px-3 transition-colors flex items-center ${window.isMinimized
                  ? "hover:bg-red-600/10 text-red-400/70"
                  : "bg-red-600/20 text-red-400"
                }`}
            >
              <span className="text-xs font-mono truncate max-w-32">{applications.find(app => app.type === window.type)?.icon}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4 text-blue-400" />
            <Volume2 className="w-4 h-4 text-yellow-400" />
            <Battery className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-red-400 text-xs font-mono">{new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    </>
  )
}
