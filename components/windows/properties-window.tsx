"use client"

import { BaseWindow } from "./base-window"

interface PropertiesWindowProps {
  id: string
  title: string
  targetType: string
  isActive: boolean
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
}

export function PropertiesWindow({
  id,
  title,
  targetType,
  isActive,
  isMinimized,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
}: PropertiesWindowProps) {

  // Data for the properties
  const metaData: Record<string, any> = {
    profile: { size: "8 KB", type: "Admin Information", created: "2077-05-12" },
    projects: { size: "128 MB", type: "Projects Collection", created: "2077-01-10" },
    contact: { size: "8 KB", type: "Communication Link", created: "2077-02-15" },
    techstack: { size: "12 KB", type: "Skill Manifest", created: "2023-11-20" },
    resume: { size: "91 KB", type: "PDF Document", created: "2077-08-01" },
  }

  const data = metaData[targetType] || { size: "0 KB", type: "Unknown", created: "N/A" }

  return (
    <BaseWindow
      id={id}
      title={title}
      isActive={isActive}
      isMinimized={isMinimized}
      zIndex={zIndex}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      initialSize={{ width: 320, height: 420 }} // Properties windows are usually smaller
      initialPosition={{ x: 150, y: 150 }}
    >
      <div className="space-y-4 font-sans text-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-2xl">
            <img
              src={`/desktopLogo/${targetType}.webp`} // Or .svg / .webp depending on your file extension
              alt={`${targetType} icon`}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <div className="font-bold text-white uppercase">{targetType}</div>
            <div className="text-[10px] text-zinc-500">{data.type}</div>
          </div>
        </div>

        <div className="h-px bg-zinc-800" />

        <div className="grid grid-cols-2 gap-y-3 text-xs">
          <span className="text-zinc-500 font-semibold">Type:</span>
          <span className="text-zinc-300">File Folder</span>

          <span className="text-zinc-500 font-semibold">Location:</span>
          <span className="text-zinc-300 truncate">C:/Portfolio/{targetType}</span>

          <span className="text-zinc-500 font-semibold">Size:</span>
          <span className="text-zinc-300">{data.size}</span>

          <span className="text-zinc-500 font-semibold">Created:</span>
          <span className="text-zinc-300">{data.created}</span>
        </div>

        <div className="pt-6 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs border border-neutral-600 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </BaseWindow>
  )
}
