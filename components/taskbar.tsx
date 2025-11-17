"use client"

import { useState, useEffect } from "react"
import Image from 'next/image'
import { Settings, Power, Wifi, Battery, Volume1 } from 'lucide-react'


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

  // Update time on client side only
  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString())

    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const applications = [
    { type: "profile", icon:
    <Image
    src="/desktopLogo/Profile.avif"
      alt="profile Logo"
      property="true"
      width={100}
      height={100}
      />, name: "Profile", color: "slate" },
    { type: "projects", icon: <Image src="/desktopLogo/Projects.avif" alt="projects Logo" property="true" width={100} height={100}/>, name: "Projects", color: "teal" },
    { type: "terminal", icon: <Image src="/desktopLogo/Terminal.avif" alt="terminal Logo" property="true" width={100} height={100}/>, name: "Terminal", color: "emerald" },
    { type: "contact", icon: <Image src="/desktopLogo/Contact.avif" alt="contact Logo" property="true" width={100} height={100}/>, name: "Contact", color: "slate" },
    { type: "techstack", icon: <Image src="/desktopLogo/Techstack.avif" alt="techstack Logo" property="true" width={100} height={100}/>, name: "Tech Stack", color: "cyan" },
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
        <div className="fixed bottom-12 left-0 w-80 bg-slate-950 z-50 border-r border-teal-900/30">
          <div className="p-4">
            <div className="border-l-2 border-teal-500 pl-4 mb-4">
              <div className="flex items-center mb-2">
                <span className="text-slate-200 text-xs tracking-wider">APPLICATIONS</span>
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
                  className="w-full flex items-center p-2 hover:bg-teal-500/10 transition-colors rounded"
                >
                  <div
                    className={`mr-3 flex items-center justify-center p-0 border-0 bg-transparent`}
                    style={{ width: 32, height: 32 }}
                  >
                    {typeof app.icon.type === 'string' && app.icon.type === 'img' ? (
                      <span style={{ display: 'inline-block', width: 24, height: 24 }}>
                        {app.icon}
                      </span>
                    ) : (
                      <span className="w-6 h-6 flex items-center justify-center">{app.icon}</span>
                    )}
                  </div>
                  <span className="text-slate-200 text-sm">{app.name}.exe</span>
                </button>
              ))}
            </div>

            <div className="border-t border-teal-900/30 mt-4 pt-4">
              <button className="w-full flex items-center p-2 hover:bg-teal-500/10 transition-colors rounded">
                <div className="p-2 text-slate-300 mr-3">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="text-slate-300 text-sm">Settings</span>
              </button>
              <button className="w-full flex items-center p-2 hover:bg-teal-500/10 transition-colors rounded">
                <div className="p-2 text-slate-300 mr-3">
                  <Power className="w-4 h-4" />
                </div>
                <span className="text-slate-300 text-sm">Shutdown</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-slate-950 border-t-2 border-teal-500 flex items-center px-2 z-40">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-teal-500/40 via-emerald-500/40 to-cyan-500/40"></div>

        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="h-8 px-4 flex items-center mr-2 border-r-2 border-teal-900/30 hover:bg-teal-500/10 transition-colors rounded"
        >
          <div className="w-7 h-7 mr-2">
            <Image
              src="/bgLogo.avif"
              width={500}
              height={500}
              alt="Logo of the start menu button"
              className="object-cover object-center select-none pointer-events-none"
            />
          </div>
        </button>

        {/* Window Buttons */}
        <div className="flex space-x-1 flex-1">
          {windows.map((window) => {
            const app = applications.find(app => app.type === window.type);
            return (
              <button
                name={`${window.title}-button`}
                key={window.id}
                onClick={() => handleWindowClick(window)}
                className={`h-8 px-3 transition-colors flex items-center rounded ${window.isMinimized
                  ? "hover:bg-teal-500/10 text-slate-400"
                  : "bg-teal-500/20 text-teal-300"
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
          <div className="flex items-center space-x-1 text-slate-400">
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
