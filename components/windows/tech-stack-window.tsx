"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { BaseWindow } from "./base-window"
import { GitBranch } from "lucide-react"

interface TechStackWindowProps {
  id: string
  title: string
  isActive: boolean
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
}

interface SkillNode {
  id: string
  name: string
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "MASTER"
  icon: React.ReactNode
  unlocked: boolean
  x: number
  y: number
  connections: string[]
  category: "frontend" | "backend" | "database" | "tools" | "core"
  description: string
  bgColor: string
  iconColor: string
}

// Custom SVG icons for each technology
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <circle cx="12" cy="12" r="2" />
    <path d="M12 1c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
    <ellipse cx="12" cy="12" rx="11" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
    <ellipse
      cx="12"
      cy="12"
      rx="11"
      ry="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      transform="rotate(60 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="11"
      ry="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      transform="rotate(120 12 12)"
    />
  </svg>
)

const NextIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" fill="white" />
  </svg>
)

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM6.5 7.5L12 5l5.5 2.5L12 10 6.5 7.5zM4 8.5l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z" />
  </svg>
)

const JavaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" />
  </svg>
)

const PostgreSQLIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M17.128 0C15.892 0 14.758.256 13.726.768c-.515.256-1.03.64-1.288 1.152-.128.256-.128.512-.128.768v.384c0 .256.128.512.256.768.256.512.64.896 1.152 1.152.512.256 1.024.384 1.536.384h.384c.256 0 .512-.128.768-.256.512-.256.896-.64 1.152-1.152.256-.512.384-1.024.384-1.536V1.92c0-.256-.128-.512-.256-.768C16.616.64 16.232.256 15.72 0h-1.408z" />
  </svg>
)

const MySQLIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 72.892 0 00-.195 4.41H.002c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 1.966.384 3.84.422 5.53z" />
  </svg>
)

const FlutterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.159 11.871L11.91 14.456l4.132 4.132 4.135-4.132-2.263-2.263-2.441 2.44z" />
  </svg>
)

const skillNodes: SkillNode[] = [
  // Core center node
  {
    id: "core",
    name: "FULL STACK",
    level: "INTERMEDIATE",
    icon: (
      <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center text-xs">FS</div>
    ),
    unlocked: true,
    x: 400,
    y: 300,
    connections: ["react", "nodejs", "typescript", "database"],
    category: "core",
    description: "Core development competencies",
    bgColor: "bg-gradient-to-br from-red-500/30 to-orange-600/30",
    iconColor: "text-red-200",
  },

  // Frontend branch
  {
    id: "react",
    name: "REACT",
    level: "INTERMEDIATE",
    icon: <ReactIcon />,
    unlocked: true,
    x: 200,
    y: 150,
    connections: ["nextjs", "typescript"],
    category: "frontend",
    description: "Component-based UI development",
    bgColor: "bg-gradient-to-br from-cyan-500/30 to-blue-600/30",
    iconColor: "text-cyan-200",
  },
  {
    id: "nextjs",
    name: "NEXT.JS",
    level: "INTERMEDIATE",
    icon: <NextIcon />,
    unlocked: true,
    x: 100,
    y: 100,
    connections: ["react", "typescript"],
    category: "frontend",
    description: "Full-stack React framework",
    bgColor: "bg-gradient-to-br from-gray-800/80 to-black/80",
    iconColor: "text-white",
  },
  {
    id: "typescript",
    name: "TYPESCRIPT",
    level: "ADVANCED",
    icon: <TypeScriptIcon />,
    unlocked: true,
    x: 300,
    y: 100,
    connections: ["react", "nextjs", "nodejs"],
    category: "frontend",
    description: "Type-safe JavaScript development",
    bgColor: "bg-gradient-to-br from-blue-600/30 to-blue-800/30",
    iconColor: "text-blue-200",
  },

  // Backend branch
  {
    id: "nodejs",
    name: "NODE.JS",
    level: "ADVANCED",
    icon: <NodeIcon />,
    unlocked: true,
    x: 600,
    y: 150,
    connections: ["core", "typescript", "database"],
    category: "backend",
    description: "Server-side JavaScript runtime",
    bgColor: "bg-gradient-to-br from-green-600/30 to-green-800/30",
    iconColor: "text-green-200",
  },
  {
    id: "java",
    name: "JAVA",
    level: "INTERMEDIATE",
    icon: <JavaIcon />,
    unlocked: true,
    x: 700,
    y: 100,
    connections: ["nodejs"],
    category: "backend",
    description: "Enterprise application development",
    bgColor: "bg-gradient-to-br from-orange-600/30 to-red-600/30",
    iconColor: "text-orange-200",
  },

  // Database branch
  {
    id: "database",
    name: "SQL",
    level: "INTERMEDIATE",
    icon: <div className="w-5 h-5 border border-current rounded flex items-center justify-center text-xs">DB</div>,
    unlocked: true,
    x: 600,
    y: 450,
    connections: ["postgresql", "mysql", "nodejs"],
    category: "database",
    description: "Database design and optimization",
    bgColor: "bg-gradient-to-br from-blue-600/30 to-blue-800/30",
    iconColor: "text-blue-200",
  },
  {
    id: "postgresql",
    name: "POSTGRESQL",
    level: "INTERMEDIATE",
    icon: <PostgreSQLIcon />,
    unlocked: true,
    x: 700,
    y: 500,
    connections: ["database"],
    category: "database",
    description: "Advanced relational database",
    bgColor: "bg-gradient-to-br from-blue-600/30 to-blue-800/30",
    iconColor: "text-blue-200",
  },
  {
    id: "mysql",
    name: "MYSQL",
    level: "INTERMEDIATE",
    icon: <MySQLIcon />,
    unlocked: true,
    x: 500,
    y: 500,
    connections: ["database"],
    category: "database",
    description: "Web application database",
    bgColor: "bg-gradient-to-br from-blue-600/30 to-blue-800/30",
    iconColor: "text-blue-200",
  },

  // Tools branch
  {
    id: "git",
    name: "GIT",
    level: "ADVANCED",
    icon: <GitBranch className="w-5 h-5" />,
    unlocked: true,
    x: 200,
    y: 450,
    connections: ["core"],
    category: "tools",
    description: "Version control workflows",
    bgColor: "bg-gradient-to-br from-gray-800/80 to-black/80",
    iconColor: "text-white",
  },
  {
    id: "flutter",
    name: "FLUTTER",
    level: "INTERMEDIATE",
    icon: <FlutterIcon />,
    unlocked: true,
    x: 100,
    y: 500,
    connections: ["git"],
    category: "tools",
    description: "Cross-platform mobile development",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-600/10",
    iconColor: "text-blue-200",
  },
]

// Define the virtual map boundaries
const MAP_BOUNDS = {
  width: 2000, // Increase from 1200 to 2000
  height: 1600, // Increase from 800 to 1600
  minX: -600, // Increase range from -300 to -600
  maxX: 600, // Increase range from 300 to 600
  minY: -400, // Increase range from -200 to -400
  maxY: 400, // Increase range from 200 to 400
}

export function TechStackWindow(props: TechStackWindowProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  const handleMapMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if clicking on the map container, not on nodes
    if (e.target === mapRef.current || (e.target as HTMLElement).closest(".map-background")) {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
      setDragStart({
        x: e.clientX - mapPosition.x,
        y: e.clientY - mapPosition.y,
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault()

        // Calculate new position
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y

        // Apply boundaries to prevent dragging too far
        const constrainedX = Math.max(MAP_BOUNDS.minX, Math.min(MAP_BOUNDS.maxX, newX))
        const constrainedY = Math.max(MAP_BOUNDS.minY, Math.min(MAP_BOUNDS.maxY, newY))

        setMapPosition({
          x: constrainedX,
          y: constrainedY,
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
      document.body.style.cursor = "grabbing"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [isDragging, dragStart])

  const getLevelColor = (level: string, unlocked: boolean) => {
    if (!unlocked) return "border-zinc-600 bg-zinc-800/50 text-zinc-500"

    switch (level) {
      case "MASTER":
        return "border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.4)]"
      case "ADVANCED":
        return "border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.4)]"
      case "INTERMEDIATE":
        return "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]"
      default:
        return "border-red-300 shadow-[0_0_15px_rgba(252,165,165,0.4)]"
    }
  }

  const getConnectionPath = (from: SkillNode, to: SkillNode) => {
    const fromX = from.x + mapPosition.x
    const fromY = from.y + mapPosition.y
    const toX = to.x + mapPosition.x
    const toY = to.y + mapPosition.y

    // Create circuit-like path with multiple segments
    const midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2

    // Add some circuit-like bends
    const bendOffset = 15

    if (Math.abs(fromX - toX) > Math.abs(fromY - toY)) {
      // Horizontal dominant path
      return `M ${fromX} ${fromY} L ${fromX + bendOffset} ${fromY} L ${fromX + bendOffset} ${midY} L ${toX - bendOffset} ${midY} L ${toX - bendOffset} ${toY} L ${toX} ${toY}`
    } else {
      // Vertical dominant path
      return `M ${fromX} ${fromY} L ${fromX} ${fromY + bendOffset} L ${midX} ${fromY + bendOffset} L ${midX} ${toY - bendOffset} L ${toX} ${toY - bendOffset} L ${toX} ${toY}`
    }
  }

  const isConnectionActive = (nodeId: string, connectionId: string) => {
    return (
      hoveredNode === nodeId || hoveredNode === connectionId || selectedNode === nodeId || selectedNode === connectionId
    )
  }

  // Generate neural nodes for the entire map area
  const generateNeuralNodes = (count: number, area: { width: number; height: number }) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (i * 47 + 23) % area.width,
      y: (i * 31 + 17) % area.height,
      delay: i * 0.3,
      duration: 2 + (i % 3),
    }))
  }

  const neuralNodes = generateNeuralNodes(80, MAP_BOUNDS)
  const neuralClusters = generateNeuralNodes(30, MAP_BOUNDS)

  return (
    <BaseWindow {...props} initialPosition={{ x: 250, y: 120 }} initialSize={{ width: 800, height: 700 }}>
      <div className="space-y-4 h-full overflow-hidden">
        {/* Header */}
        <div className="border-l-2 border-red-500 pl-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 mr-2"></div>
              <span className="text-red-400 text-xs tracking-wider">NEURAL_INTERFACE</span>
            </div>
            <div className="text-red-400 text-xs">RELIC_v2.077 | DRAG TO NAVIGATE</div>
          </div>
        </div>

        {/* Skill Map Container */}
        <div
          ref={mapRef}
          className={`relative h-96 overflow-hidden rounded-lg border border-red-500/30 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMapMouseDown}
        >
          {/* Extended Neural Network Background */}
          <div
            className="map-background absolute bg-gradient-to-br from-black via-zinc-950 to-red-950/20"
            style={{
              width: MAP_BOUNDS.width,
              height: MAP_BOUNDS.height,
              left: mapPosition.x - (MAP_BOUNDS.width - 800) / 2,
              top: mapPosition.y - (MAP_BOUNDS.height - 384) / 2,
              pointerEvents: "none", // Add this to ensure clicks pass through to the draggable area
            }}
          >
            {/* Neural network pattern overlay - covers entire map */}
            <div
              className="map-background absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.4) 1px, transparent 0),
                  linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px, 40px 40px, 40px 40px",
              }}
            />

            {/* Neural pathways - extended across entire map */}
            <div className="map-background absolute inset-0 pointer-events-none">
              {/* Main neural pathways */}
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-red-500/20 via-red-500/40 to-red-500/20"></div>
              <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-red-600/15 via-red-600/35 to-red-600/15"></div>
              <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-red-500/20 via-red-500/40 to-red-500/20"></div>

              <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-red-500/20 via-red-500/40 to-red-500/20"></div>
              <div className="absolute left-2/4 top-0 w-px h-full bg-gradient-to-b from-red-600/15 via-red-600/35 to-red-600/15"></div>
              <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-red-500/20 via-red-500/40 to-red-500/20"></div>

              {/* Diagonal neural connections */}
              <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`diagonal-${i}`}
                    className="absolute bg-gradient-to-br from-red-500/20 to-transparent"
                    style={{
                      width: "2px",
                      height: "120px",
                      top: `${(i * 15 + 10) % 80}%`,
                      left: `${(i * 23 + 15) % 90}%`,
                      transform: `rotate(${45 + i * 15}deg)`,
                      transformOrigin: "top",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Neural nodes - distributed across entire map */}
            <div className="map-background absolute inset-0 pointer-events-none">
              {neuralNodes.map((node) => (
                <div
                  key={`neural-${node.id}`}
                  className="absolute w-1 h-1 bg-red-500/60 rounded-full animate-pulse"
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    animationDelay: `${node.delay}s`,
                    animationDuration: `${node.duration}s`,
                  }}
                />
              ))}

              {/* Larger neural clusters */}
              {neuralClusters.map((cluster) => (
                <div
                  key={`cluster-${cluster.id}`}
                  className="absolute w-2 h-2 bg-red-400/40 rounded-full"
                  style={{
                    left: `${cluster.x}px`,
                    top: `${cluster.y}px`,
                    boxShadow: "0 0 8px rgba(220, 38, 38, 0.3)",
                  }}
                />
              ))}
            </div>

            {/* Ambient neural glow */}
            <div className="map-background absolute inset-0 bg-gradient-to-br from-red-950/10 via-transparent to-red-900/5 pointer-events-none"></div>

            {/* Subtle scan lines for cyberpunk effect */}
            <div
              className="map-background absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(220, 38, 38, 0.3) 2px,
                  rgba(220, 38, 38, 0.3) 4px
                )`,
              }}
            />
          </div>

          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <filter id="connectionGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Neural circuit pattern for connections */}
              <pattern id="neuralPattern" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="none" />
                <circle cx="3" cy="3" r="0.8" fill="rgba(220, 38, 38, 0.6)" />
                <circle cx="1" cy="1" r="0.3" fill="rgba(220, 38, 38, 0.4)" />
                <circle cx="5" cy="5" r="0.3" fill="rgba(220, 38, 38, 0.4)" />
              </pattern>
            </defs>

            {skillNodes.map((node) =>
              node.connections.map((connectionId) => {
                const targetNode = skillNodes.find((n) => n.id === connectionId)
                if (!targetNode) return null

                const isActive = isConnectionActive(node.id, connectionId)
                const bothUnlocked = node.unlocked && targetNode.unlocked

                return (
                  <g key={`${node.id}-${connectionId}`}>
                    {/* Main connection line */}
                    <path
                      d={getConnectionPath(node, targetNode)}
                      stroke={
                        isActive && bothUnlocked
                          ? "rgba(220, 38, 38, 0.9)"
                          : bothUnlocked
                            ? "rgba(220, 38, 38, 0.5)"
                            : "rgba(113, 113, 122, 0.2)"
                      }
                      strokeWidth={isActive ? "3" : "2"}
                      fill="none"
                      filter={isActive ? "url(#connectionGlow)" : "none"}
                      className="transition-all duration-300"
                    />

                    {/* Neural pattern overlay */}
                    {bothUnlocked && (
                      <path
                        d={getConnectionPath(node, targetNode)}
                        stroke="url(#neuralPattern)"
                        strokeWidth="1"
                        fill="none"
                        opacity={isActive ? "0.8" : "0.4"}
                        className="transition-all duration-300"
                      />
                    )}
                  </g>
                )
              }),
            )}
          </svg>

          {/* Skill Nodes */}
          {skillNodes.map((node) => {
            const isSelected = selectedNode === node.id
            const isHovered = hoveredNode === node.id

            return (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 ${
                  node.unlocked ? "hover:scale-110" : "opacity-60"
                } ${isSelected ? "scale-110" : ""}`}
                style={{
                  left: node.x + mapPosition.x,
                  top: node.y + mapPosition.y,
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onMouseDown={(e) => {
                  e.stopPropagation()
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedNode(selectedNode === node.id ? null : node.id)
                }}
              >
                {/* Node container */}
                <div
                  className={`
                    relative w-20 h-20 border-2 transition-all duration-300 backdrop-blur-sm
                    ${getLevelColor(node.level, node.unlocked)} ${node.bgColor}
                    ${isSelected ? "scale-110" : ""}
                    ${isHovered ? "scale-105" : ""}
                  `}
                  style={{
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  {/* Inner neural pattern */}
                  <div
                    className="absolute inset-2 opacity-20"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.6) 0.5px, transparent 0)
                      `,
                      backgroundSize: "4px 4px",
                      clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                    }}
                  />

                  {/* Icon */}
                  <div className={`absolute inset-0 flex items-center justify-center ${node.iconColor} z-10`}>
                    {node.icon}
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div
                      className="absolute inset-0 border-2 border-red-300 animate-pulse opacity-75"
                      style={{
                        clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                      }}
                    />
                  )}

                  {/* Corner indicators */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-400 rounded-full opacity-60"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-400 rounded-full opacity-60"></div>
                </div>

                {/* Node label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-center pointer-events-none">
                  <div className={`text-xs font-semibold tracking-wide ${node.iconColor}`}>{node.name}</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">[{node.level}]</div>
                </div>
              </div>
            )
          })}

          {/* Map boundaries indicator */}
          {(mapPosition.x <= MAP_BOUNDS.minX + 10 ||
            mapPosition.x >= MAP_BOUNDS.maxX - 10 ||
            mapPosition.y <= MAP_BOUNDS.minY + 10 ||
            mapPosition.y >= MAP_BOUNDS.maxY - 10) && (
            <div className="absolute top-2 right-2 text-red-400 text-xs bg-red-500/10 border border-red-500/30 px-2 py-1 rounded">
              MAP BOUNDARY REACHED
            </div>
          )}
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="border border-red-500/30 p-4 bg-red-500/5 rounded-lg">
            {(() => {
              const node = skillNodes.find((n) => n.id === selectedNode)
              if (!node) return null

              return (
                <div>
                  <div className="flex items-center mb-2">
                    <div
                      className={`p-3 border-2 ${getLevelColor(node.level, node.unlocked)} ${node.bgColor} rounded-lg mr-3`}
                    >
                      <div className={node.iconColor}>{node.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-red-400 font-bold text-lg">{node.name}</h3>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getLevelColor(node.level, node.unlocked)} ${node.iconColor}`}
                      >
                        {node.level}
                      </span>
                    </div>
                  </div>
                  <p className="text-red-400/70 text-sm mb-3">{node.description}</p>

                  {/* Connected skills */}
                  <div className="text-xs text-red-400/50">
                    CONNECTED TO:{" "}
                    {node.connections
                      .map((id) => {
                        const connectedNode = skillNodes.find((n) => n.id === id)
                        return connectedNode?.name
                      })
                      .join(", ")}
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2 bg-red-500/10 border border-red-500/30 rounded">
            <div className="text-sm font-bold text-red-400">{skillNodes.filter((n) => n.unlocked).length}</div>
            <div className="text-red-500/70 text-xs">UNLOCKED</div>
          </div>
          <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded">
            <div className="text-sm font-bold text-orange-400">
              {skillNodes.filter((n) => n.level === "ADVANCED").length}
            </div>
            <div className="text-orange-500/70 text-xs">ADVANCED</div>
          </div>
          <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
            <div className="text-sm font-bold text-yellow-400">
              {skillNodes.filter((n) => n.level === "INTERMEDIATE").length}
            </div>
            <div className="text-yellow-500/70 text-xs">INTERMEDIATE</div>
          </div>
          <div className="p-2 bg-red-400/10 border border-red-400/30 rounded">
            <div className="text-sm font-bold text-red-300">85%</div>
            <div className="text-red-400/70 text-xs">MASTERY</div>
          </div>
        </div>
      </div>
    </BaseWindow>
  )
}
