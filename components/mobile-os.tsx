"use client"
import Image from "next/image"
import { useState } from "react"
import { Wifi, Battery, Signal } from "lucide-react"

// Example app icons (replace with your own as needed)
const apps = [
  { name: "Profile", icon: "/pfp.png" },
  { name: "Projects", icon: "/placeholder-logo.png" },
  { name: "Contact", icon: "/logo.png" },
  { name: "Tech Stack", icon: "/logoT.png" },
  { name: "Terminal", icon: "/logoT.png" },
]

export default function MobileOS() {
  const [activeApp, setActiveApp] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-foreground flex flex-col">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/60 backdrop-blur-md border-b border-zinc-800 text-xs select-none">
        <div className="flex items-center gap-2 text-zinc-300">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
        </div>
        <span className="font-semibold tracking-widest text-zinc-100">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center gap-1 text-zinc-300">
          <Battery className="w-4 h-4" />
          <span className="text-xs">87%</span>
        </div>
      </div>

      {/* App Grid (Scrollable) */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="grid grid-cols-4 gap-6 justify-items-center">
          {apps.map((app) => (
            <button
              key={app.name}
              className="flex flex-col items-center group"
              onClick={() => setActiveApp(app.name)}
            >
              <div className="rounded-2xl bg-zinc-800/80 shadow-lg p-3 group-hover:bg-zinc-700 transition-all">
                <Image src={app.icon} alt={app.name} width={48} height={48} className="rounded-xl" />
              </div>
              <span className="mt-2 text-xs text-zinc-200 group-hover:text-yellow-400 font-medium drop-shadow">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="fixed bottom-0 left-0 right-0 pb-4">
        <div className="mx-auto w-fit px-6 py-2 rounded-3xl bg-black/60 backdrop-blur-md shadow-2xl flex gap-8 border border-zinc-800">
          {apps.slice(0, 4).map((app) => (
            <button
              key={app.name + "-dock"}
              className="flex flex-col items-center"
              onClick={() => setActiveApp(app.name)}
            >
              <Image src={app.icon} alt={app.name} width={36} height={36} className="rounded-xl" />
            </button>
          ))}
        </div>
      </div>

      {/* Simple App Modal */}
      {activeApp && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <div className="bg-zinc-900 border border-yellow-500/30 rounded-2xl p-6 w-4/5 max-w-xs text-center shadow-2xl">
            <h2 className="text-yellow-400 text-lg font-bold mb-2">{activeApp}</h2>
            <p className="text-zinc-200/80 mb-4">This is a placeholder for the {activeApp} app.</p>
            <button
              className="mt-2 px-4 py-2 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-400 transition"
              onClick={() => setActiveApp(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
