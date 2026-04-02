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
        bg-white/80 backdrop-blur-2xl
        border rounded-[20px]
        flex flex-col
        transition-all duration-300 outline outline-white/40
        ${isActive
          ? 'border-white/60 shadow-[0_16px_40px_rgba(249,168,212,0.2)]'
          : 'border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)]'
        }
      `}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className={`
          px-5 py-4 flex items-center justify-between
          cursor-grab active:cursor-grabbing
          border-b transition-colors duration-200 rounded-t-[20px]
          ${isActive
            ? 'bg-white/40 border-white/50'
            : 'bg-white/10 border-white/20'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full transition-colors border shadow-sm ${isActive ? 'bg-memory-pink border-white/80' : 'bg-memory-pink/40 border-white/30'}`} />
          <h2 className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-stone-950' : 'text-stone-600'}`}>
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleMinimize}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-black hover:text-memory-brown hover:bg-mist-300 hover:shadow-sm transition-all duration-300"
            title="Minimize"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-black hover:text-white hover:bg-red-400 hover:shadow-sm transition-all duration-300"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      {!isMinimized && (
        <div className="flex-1 overflow-auto p-6 text-stone-950 custom-scrollbar">
          {children}
        </div>
      )}
    </div>
  )
}
