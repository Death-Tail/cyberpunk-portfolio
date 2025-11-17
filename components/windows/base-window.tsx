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
      className="bg-slate-900/95 border border-slate-700 rounded shadow-lg flex flex-col"
      onClick={onFocus}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className="bg-linear-to-r from-slate-800 to-slate-900 border-b border-slate-700 p-3 flex items-center justify-between cursor-grab active:cursor-grabbing"
      >
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleMinimize}
            className="hover:bg-slate-700 p-1 rounded text-slate-400 hover:text-slate-100 transition-colors"
            title="Minimize"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="hover:bg-red-500/20 p-1 rounded text-slate-400 hover:text-red-400 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      {!isMinimized && (
        <div className="flex-1 overflow-auto p-4 text-slate-100">
          {children}
        </div>
      )}
    </div>
  )
}
