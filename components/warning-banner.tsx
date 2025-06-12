"use client"

import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"

export function WarningBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-orange-600/10 border border-orange-600/30 mb-4 relative">
      <div className="p-3 flex items-center">
        <AlertTriangle className="w-5 h-5 text-orange-500 mr-3" />
        <div className="flex-1">
          <div className="text-orange-500 text-xs mb-1">WARNING: UNAUTHORIZED ACCESS DETECTED</div>
          <div className="text-orange-500/70 text-xs">
            This portfolio contains classified information. Proceed with caution. All activity is being monitored.
          </div>
        </div>
        <button onClick={() => setIsVisible(false)} className="p-1 text-orange-500 hover:text-orange-400">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600/50"></div>
    </div>
  )
}
