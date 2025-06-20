"use client"

import type React from "react"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { Minus, X } from "lucide-react"

interface BaseWindowProps {
  id: string
  title: string
  children: ReactNode
  isActive: boolean
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
}

export function BaseWindow({
  id,
  title,
  children,
  isActive,
  isMinimized,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 },
}: BaseWindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hasInitialized, setHasInitialized] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasInitialized) {
      // Calculate proper offset based on window type and existing windows
      let baseOffset = 0

      // Different base positions for different window types
      switch (id.split("-")[0]) {
        case "profile":
          baseOffset = 0
          break
        case "projects":
          baseOffset = 50
          break
        case "terminal":
          baseOffset = 100
          break
        case "contact":
          baseOffset = 150
          break
        case "techstack":
          baseOffset = 200
          break
        default:
          baseOffset = 0
      }

      // Add additional offset based on window number
      const windowNumber = Number.parseInt(id.split("-")[1] || "0") || Date.now()
      const additionalOffset = (windowNumber % 10) * 30

      setPosition({
        x: initialPosition.x + baseOffset + additionalOffset,
        y: initialPosition.y + baseOffset + additionalOffset,
      })
      setHasInitialized(true)
    }
  }, [id, initialPosition, hasInitialized])

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest(".window-header") && !target.closest("button")) {
      e.preventDefault()
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
      onFocus()
    }
  }

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onMinimize()
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onClose()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault()
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y

        // Allow windows to go outside viewport bounds
        // Only constrain the top to prevent losing the title bar
        const minY = -initialSize.height + 40 // Keep at least title bar visible
        const maxX = window.innerWidth + initialSize.width - 100 // Allow most of window to go off-screen
        const minX = -initialSize.width + 100 // Allow most of window to go off-screen

        setPosition({
          x: Math.max(minX, Math.min(newX, maxX)),
          y: Math.max(minY, newY), // No max Y constraint - can go below screen
        })
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault()
        setIsDragging(false)
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = ""
    }
  }, [isDragging, dragOffset, initialSize.width, initialSize.height])

  if (isMinimized) return null

  return (
    <div
      ref={windowRef}
      className={`absolute bg-zinc-900 border-2 ${
        isActive
          ? "border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          : "border-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.1)]"
      } transition-shadow duration-200`}
      style={{
        left: position.x,
        top: position.y,
        width: initialSize.width,
        height: initialSize.height,
        zIndex,
      }}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div
        className={`window-header flex items-center justify-between p-2 ${
          isActive ? "bg-red-600/20" : "bg-red-600/10"
        } border-b border-red-600/30 cursor-move select-none`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500/20 border border-yellow-500/50 mr-2 flex items-center justify-center">
            <span className="text-yellow-400 text-xs">⚡</span>
          </div>
          <span className="text-red-400 text-sm font-mono">{title}</span>
          {isDragging && <span className="ml-2 text-blue-400 text-xs animate-pulse">MOVING...</span>}
        </div>

        <div className="flex items-center space-x-1">
          <button
          aria-label="Minimize window"
          name="minimize-button"
            onClick={handleMinimize}
            className="w-6 h-6 bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500/30 flex items-center justify-center transition-colors"
          >
            <Minus className="w-3 h-3 text-yellow-400" />
          </button>
          <button
          aria-label="Close window"
            name="close-button"
            onClick={handleClose}
            className="w-6 h-6 bg-red-600/20 border border-red-600/50 hover:bg-red-600/30 flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3 text-red-400" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="p-4 overflow-auto bg-zinc-900/95" style={{ height: `calc(100% - 40px)` }}>
        {children}
      </div>

      {/* Accent borders */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/30 via-yellow-500/30 to-red-500/30"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/30 via-yellow-500/30 to-blue-500/30"></div>
    </div>
  )
}
