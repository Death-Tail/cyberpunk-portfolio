"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { BaseWindow } from "./base-window"
import { Code, Database, Film, Gamepad2, Layers, PenTool, Server, Workflow, WorkflowIcon, Wrench } from "lucide-react"
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql, SiMysql, SiFlutter, SiGit, SiFirebase, SiUikit,
  SiDart,
  SiBlender,
  SiUnrealengine
} from "react-icons/si";
import { DiJava } from "react-icons/di";

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

const skillNodes: SkillNode[] = [
  // ===== CORE =====
  {
    id: "core",
    name: "FULL STACK",
    level: "MASTER",
    icon: <Layers className="w-7 h-7" />,
    unlocked: true,
    x: 400,
    y: 300,
    connections: [],
    category: "core",
    description: "Core development competencies",
    bgColor: "bg-linear-to-br from-red-500/30 to-orange-600/30",
    iconColor: "text-",
  },

  // ===== FRAMEWORKS / FRONTEND =====
  {
    id: "frontend",
    name: "FRONTEND",
    level: "ADVANCED",
    icon: <SiUikit className="w-7 h-7" />,
    unlocked: true,
    x: 200,
    y: 175,
    connections: ["core"],
    category: "frontend",
    description: "User interface and experience design",
    bgColor: "bg-linear-to-br from-pink-500/30 to-purple-600/30",
    iconColor: "text-white",
  },
  {
    id: "react",
    name: "REACT",
    level: "INTERMEDIATE",
    icon: <SiReact className="w-7 h-7" />,
    unlocked: true,
    x: 200,
    y: 25,
    connections: ["frontend"],
    category: "frontend",
    description: "Component-based UI development",
    bgColor: "bg-linear-to-br from-cyan-500/30 to-blue-600/30",
    iconColor: "text-cyan-200",
  },
  {
    id: "nextjs",
    name: "NEXT.JS",
    level: "ADVANCED",
    icon: <SiNextdotjs className="w-7 h-7" />,
    unlocked: true,
    x: 300,
    y: 115,
    connections: ["frontend"],
    category: "frontend",
    description: "Full-stack React framework",
    bgColor: "bg-linear-to-br from-gray-800/80 to-black/80",
    iconColor: "text-white",
  },
  {
    id: "flutter",
    name: "FLUTTER",
    level: "ADVANCED",
    icon: <SiFlutter className="w-7 h-7" />,
    unlocked: true,
    x: 100,
    y: 115,
    connections: ["frontend", "dart"],
    category: "tools",
    description: "Cross-platform mobile development",
    bgColor: "bg-linear-to-br from-blue-500/10 to-cyan-600/10",
    iconColor: "text-blue-600",
  },

  // =====BACKEND =====
  {
    id: "backend",
    name: "BACKEND ",
    level: "ADVANCED",
    icon: <Server className="w-7 h-7" />,
    unlocked: true,
    x: 600,
    y: 175,
    connections: ["core"],
    category: "backend",
    description: "Server-side development and APIs",
    bgColor: "bg-linear-to-br from-green-600/30 to-green-800/30",
    iconColor: "text-red-200",
  },
  {
    id: "nodejs",
    name: "NODE.JS (Express.js)",
    level: "ADVANCED",
    icon: <SiNodedotjs className="w-7 h-7" />,
    unlocked: true,
    x: 600,
    y: 0,
    connections: ["backend"],
    category: "backend",
    description: "Server-side JavaScript runtime",
    bgColor: "bg-linear-to-br from-green-600/30 to-green-800/30",
    iconColor: "text-green-200",
  },
  {
    id: "nextjs api",
    name: "Next.js API Routes",
    level: "ADVANCED",
    icon: <SiNodedotjs className="w-7 h-7" />,
    unlocked: true,
    x: 750,
    y: 175,
    connections: ["backend"],
    category: "backend",
    description: "Server-side JavaScript runtime",
    bgColor: "bg-linear-to-br from-green-600/30 to-green-800/30",
    iconColor: "text-green-200",
  },

  // ===== DATABASE =====
  {
    id: "database",
    name: "DATABASE",
    level: "ADVANCED",
    icon: < Database className="w-7 h-7" />,
    unlocked: true,
    x: 600,
    y: 450,
    connections: ["core"],
    category: "database",
    description: "Database design and optimization",
    bgColor: "bg-linear-to-br from-blue-600/30 to-blue-800/30",
    iconColor: "text-blue-200",
  },
  {
    id: "firebase",
    name: "FIREBASE",
    level: "INTERMEDIATE",
    icon: < SiFirebase className="w-7 h-7" />,
    unlocked: true,
    x: 600,
    y: 600,
    connections: ["database"],
    category: "database",
    description: "Realtime NoSQL database",
    bgColor: "bg-linear-to-br from-red-600/30 to-orange-800/30",
    iconColor: "text-yellow-800",
  },
  {
    id: "postgresql",
    name: "POSTGRESQL",
    level: "INTERMEDIATE",
    icon: <SiPostgresql className="w-7 h-7" />,
    unlocked: true,
    x: 700,
    y: 475,
    connections: ["database"],
    category: "database",
    description: "Advanced relational database",
    bgColor: "bg-linear-to-br from-blue-600/30 to-blue-800/30",
    iconColor: "text-blue-200",
  },
  {
    id: "mysql",
    name: "MYSQL",
    level: "INTERMEDIATE",
    icon: <SiMysql className="w-7 h-7" />,
    unlocked: true,
    x: 500,
    y: 475,
    connections: ["database"],
    category: "database",
    description: "Popular relational database management",
    bgColor: "bg-linear-to-br from-blue-600/30 to-blue-800/30",
    iconColor: "text-blue-200",
  },

  // ===== TOOLS =====
  {
    id: "tools",
    name: "TOOLS",
    level: "ADVANCED",
    icon: <Wrench className="w-7 h-7" />,
    unlocked: true,
    x: 250,
    y: 450,
    connections: ["core"],
    category: "tools",
    description: "Development and collaboration tools",
    bgColor: "bg-linear-to-br from-gray-800/80 to-black/80",
    iconColor: "text-white",
  },
  {
    id: "git",
    name: "GIT",
    level: "ADVANCED",
    icon: <SiGit className="w-7 h-7" />,
    unlocked: true,
    x: 150,
    y: 500,
    connections: ["tools"],
    category: "tools",
    description: "Version control workflows",
    bgColor: "bg-linear-to-br from-gray-800/80 to-black/80",
    iconColor: "text-white",
  },


   // ===== Languages =====
   {
    id: "language",
    name: "PROGRAMMING LANGUAGES",
    level: "ADVANCED",
    icon: <Code className="w-7 h-7" />,
    unlocked: true,
    x: 0,
    y: 300,
    connections: ["core"],
    category: "backend",
    description: "Proficient in multiple programming languages",
    bgColor: "bg-linear-to-br from-gray-600/30 to-gray-800/30",
    iconColor: "text-gray-200",
  },
  {
    id: "dart",
    name: "DART",
    level: "INTERMEDIATE",
    icon: <SiDart className="w-7 h-7" />,
    unlocked: true,
    x: -50,
    y: 150,
    connections: ["language"],
    category: "backend",
    description: "Cross-platform mobile development",
    bgColor: "bg-linear-to-br from-blue-500/10 to-cyan-600/10",
    iconColor: "text-blue-600",
  },
   {
    id: "typescript",
    name: "TYPESCRIPT",
    level: "ADVANCED",
    icon: <SiTypescript className="w-7 h-7" />,
    unlocked: true,
    x: -150,
    y: 300,
    connections: ["language"],
    category: "backend",
    description: "Type-safe JavaScript development",
    bgColor: "bg-linear-to-br from-blue-600/30 to-blue-800/30",
    iconColor: "text-blue-200",
  },
  {
    id: "java",
    name: "JAVA",
    level: "INTERMEDIATE",
    icon: <DiJava className="w-7 h-7" />,
    unlocked: true,
    x: -50,
    y: 450,
    connections: ["language"],
    category: "backend",
    description: "Enterprise application development",
    bgColor: "bg-linear-to-br from-orange-600/30 to-red-600/30",
    iconColor: "text-orange-200",
  },
  {
    id: "gaming",
    name: "GAMING & 3D DESIGN",
    level: "BEGINNER",
    icon: <Gamepad2 className="w-7 h-7" />,
    unlocked: false,
    x: 900,
    y: 350,
    connections: ["core"],
    category: "tools",
    description: "Game development and 3D content creation",
    bgColor: "bg-linear-to-br from-indigo-700/30 to-purple-800/30",
    iconColor: "text-purple-300",
  },
  {
    id: "unreal",
    name: "UNREAL ENGINE",
    level: "BEGINNER",
    icon: <SiUnrealengine className="w-7 h-7" />,
    unlocked: false,
    x: 925,
    y: 200,
    connections: ["gaming"],
    category: "tools",
    description: "AAA game development engine",
    bgColor: "bg-linear-to-br from-blue-800/30 to-gray-900/30",
    iconColor: "text-white",
  },
  {
    id: "blender",
    name: "BLENDER",
    level: "BEGINNER",
    icon: <SiBlender className="w-7 h-7" />,
    unlocked: false,
    x: 1050,
    y: 350,
    connections: ["gaming"],
    category: "tools",
    description: "3D modeling and animation software",
    bgColor: "bg-linear-to-br from-orange-600/30 to-yellow-700/30",
    iconColor: "text-orange-200",
  },
  {
    id: "animation",
    name: "ANIMATION",
    level: "BEGINNER",
    icon: <Film className="w-7 h-7" />,
    unlocked: false,
    x: 925,
    y: 500,
    connections: ["gaming", "blender"],
    category: "tools",
    description: "Character and motion animation fundamentals",
    bgColor: "bg-linear-to-br from-pink-600/30 to-red-700/30",
    iconColor: "text-pink-200",
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
        return "border-teal-400 shadow-[0_0_15px_rgba(248,113,113,0.4)]"
      case "ADVANCED":
        return "border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.4)]"
      case "INTERMEDIATE":
        return "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]"
      default:
        return "border-teal-300 shadow-[0_0_15px_rgba(252,165,165,0.4)]"
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
    <BaseWindow {...props} initialPosition={{ x: 250, y: 120 }} initialSize={{ width: 800, height: 600 }}>
      <div className="space-y-4 h-none overflow-hidden">
        {/* Header */}
        <div className="border-l-2 border-teal-500 pl-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-500 mr-2"></div>
              <span className="text-teal-400 text-xs tracking-wider">NEURAL_INTERFACE</span>
            </div>
            <div className="text-teal-400 text-xs">RELIC_v2.077 | DRAG TO NAVIGATE</div>
          </div>
        </div>

        {/* Skill Map Container */}
        <div
          ref={mapRef}
          className={`relative h-96 overflow-hidden rounded-lg border border-teal-500/30 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMapMouseDown}
        >
          {/* Extended Neural Network Background */}
          <div
            className="map-background absolute bg-linear-to-br from-black via-zinc-950 to-teal-950/20"
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
              {/* Diagonal neural connections */}
              <div className="absolute inset-0">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`diagonal-${i}`}
                    className="absolute bg-linear-to-br from-teal-500/20 to-transparent"
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
                  className="absolute w-1 h-1 bg-teal-500/60 rounded-full animate-pulse"
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
                  className="absolute w-2 h-2 bg-teal-400/40 rounded-full"
                  style={{
                    left: `${cluster.x}px`,
                    top: `${cluster.y}px`,
                    boxShadow: "0 0 8px rgba(220, 38, 38, 0.3)",
                  }}
                />
              ))}
            </div>

            {/* Ambient neural glow */}
            <div className="map-background absolute inset-0 bg-linear-to-br from-teal-950/10 via-transparent to-teal-900/5 pointer-events-none"></div>

            {/* Subtle grid overlay */}
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
                    {/* Main connection line with smoother curve and glow */}
                    <path
                      d={getConnectionPath(node, targetNode)} // Keep your function
                      stroke={
                        isActive && bothUnlocked
                          ? "rgba(220, 38, 38, 0.9)"
                          : bothUnlocked
                            ? "rgba(106, 90, 205, 0.5)"
                            : "rgba(113, 113, 122, 0.2)"
                      }
                      strokeWidth={isActive ? "3" : "2"}
                      fill="none"
                      filter={isActive ? "url(#connectionGlow)" : "none"}
                      className="transition-all duration-300"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Neural pattern overlay with subtle animation */}
                    {bothUnlocked && (
                      <path
                        d={getConnectionPath(node, targetNode)}
                        stroke="url(#neuralPattern)"
                        strokeWidth="1"
                        fill="none"
                        opacity={isActive ? "0.8" : "0.4"}
                        className="transition-all duration-300"
                        strokeLinecap="round"
                      />
                    )}
                  </g>
                );

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
                      className="absolute inset-0 border-2 border-yellow-300 animate-pulse opacity-75"
                      style={{
                        clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
                      }}
                    />
                  )}

                  {/* Corner indicators */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-teal-400 rounded-full opacity-60"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-teal-400 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-teal-400 rounded-full opacity-60"></div>
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
            <div className="absolute top-2 right-2 text-teal-400 text-xs bg-teal-500/10 border border-teal-500/30 px-2 py-1 rounded">
              MAP BOUNDARY REACHED
            </div>
          )}
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="border border-teal-500/30 p-4 bg-teal-500/5 rounded-lg">
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
                      <h3 className="text-teal-400 font-bold text-lg">{node.name}</h3>
                    </div>
                  </div>
                  <p className="text-teal-400/70 text-sm mb-3">{node.description}</p>

                  {/* Connected skills */}
                  <div className="text-xs text-teal-400/50">
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
          <div className="p-2 bg-teal-500/10 border border-teal-500/30 rounded">
            <div className="text-sm font-bold text-teal-400">{skillNodes.filter((n) => n.unlocked).length}</div>
            <div className="text-teal-500/70 text-xs">UNLOCKED</div>
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
          <div className="p-2 bg-teal-400/10 border border-teal-400/30 rounded">
            <div className="text-sm font-bold text-teal-300">85%</div>
            <div className="text-teal-400/70 text-xs">MASTERY</div>
          </div>
        </div>
      </div>
    </BaseWindow>
  )
}
