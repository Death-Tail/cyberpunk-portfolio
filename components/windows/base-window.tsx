'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Minus } from 'lucide-react'

interface BaseWindowProps {
  id: string
  title: string
  isActive: boolean
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  children: React.ReactNode
}

export function BaseWindow({
  id,
  title,
  isActive,
  isMinimized,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 500, height: 400 },
  children
}: BaseWindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const constrainPosition = (x: number, y: number) => {
    const BOUNDARY_TOP = 20
    const BOUNDARY_BOTTOM = 20
    const maxX = Math.max(0, window.innerWidth - size.width)
    const maxY = Math.max(BOUNDARY_TOP, window.innerHeight - size.height - BOUNDARY_BOTTOM)

    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(BOUNDARY_TOP, Math.min(y, maxY))
    }
  }

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button')) return
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
      onFocus()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      const constrained = constrainPosition(newX, newY)
      setPosition(constrained)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    header.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      header.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, position, onFocus, size])

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onMinimize()
  }

  if (isMinimized) return null

  return (
    <div
      ref={windowRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: isMinimized ? 'auto' : `${size.height}px`,
        zIndex: isActive ? zIndex : zIndex - 1,
      }}
      className={`
        bg-zinc-900/95 backdrop-blur-xl
        border rounded-lg
        flex flex-col
        transition-shadow duration-300
        ${isActive
          ? 'border-zinc-600/50 shadow-2xl shadow-black/50'
          : 'border-zinc-700/30 shadow-lg shadow-black/30'
        }
      `}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className={`
          px-4 py-3 flex items-center justify-between
          cursor-grab active:cursor-grabbing
          border-b transition-colors duration-200
          ${isActive
            ? 'bg-zinc-800/80 border-zinc-700/50'
            : 'bg-zinc-800/50 border-zinc-800/50'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
          <h2 className={`text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-zinc-100' : 'text-zinc-400'}`}>
            {title}
          </h2>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={handleMinimize}
            className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700/50 transition-all duration-150"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-white hover:bg-red-500/80 transition-all duration-150"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      {!isMinimized && (
        <div className="flex-1 overflow-auto p-5 text-zinc-100">
          {children}
        </div>
      )}
    </div>
  )
}
