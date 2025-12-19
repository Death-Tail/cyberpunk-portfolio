"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {version} from "../../package.json"
import { BaseWindow } from "./base-window"
import { Code, Database, Film, Gamepad2, Layers, PenTool, Server, Workflow, WorkflowIcon, Wrench, Target } from "lucide-react"
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
  icon: React.ReactNode
  unlocked: boolean
  x: number
  y: number
  connections: string[]
  category: "frontend" | "backend" | "database" | "tools" | "core" | "gaming" | "3D"
  description: string
  bgColor: string
  iconColor: string
}

const skillNodes: SkillNode[] = [
  // ===== CORE =====
  {
    id: "core",
    name: "FULL STACK",
    icon: <Layers className="w-7 h-7" />,
    unlocked: true,
    x: 400,
    y: 300,
    connections: [],
    category: "core",
    description: "Core development competencies",
    bgColor: "bg-linear-to-br from-red-500/30 to-orange-600/30",
    iconColor: "text-red",
  },

  // ===== FRAMEWORKS / FRONTEND =====
  {
    id: "frontend",
    name: "FRONTEND",
    icon: <SiUikit className="w-7 h-7" />,
    unlocked: true,
    x: 200,
    y: 175,
    connections: ["core"],
    category: "frontend",
    description: "User interface and experience design",
    bgColor: "bg-linear-to-br from-neutral-500/30 to-purple-600/30",
    iconColor: "text-white",
  },
  {
    id: "react",
    name: "REACT",
    icon: <SiReact className="w-7 h-7" />,
    unlocked: true,
    x: 200,
    y: 25,
    connections: ["frontend"],
    category: "frontend",
    description: "Component-based UI development",
    bgColor: "bg-linear-to-br from-cyan-500/30 to-neutral-600/30",
    iconColor: "text-cyan-200",
  },
  {
    id: "nextjs",
    name: "NEXT.JS",
    icon: <SiNextdotjs className="w-7 h-7" />,
    unlocked: true,
    x: 300,
    y: 115,
    connections: ["frontend"],
    category: "frontend",
    description: "Full-stack React framework",
    bgColor: "bg-linear-to-br from-neutral-800/80 to-black/80",
    iconColor: "text-white",
  },
  {
    id: "flutter",
    name: "FLUTTER",
    icon: <SiFlutter className="w-7 h-7" />,
    unlocked: true,
    x: 100,
    y: 115,
    connections: ["frontend", "dart"],
    category: "frontend",
    description: "Cross-platform mobile development",
    bgColor: "bg-linear-to-br from-neutral-500/10 to-cyan-600/10",
    iconColor: "text-neutral-600",
  },

  // =====BACKEND =====
  {
    id: "backend",
    name: "BACKEND ",
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
    icon: < Database className="w-7 h-7" />,
    unlocked: true,
    x: 600,
    y: 450,
    connections: ["core"],
    category: "database",
    description: "Database design and optimization",
    bgColor: "bg-linear-to-br from-neutral-600/30 to-neutral-800/30",
    iconColor: "text-neutral-200",
  },
  {
    id: "firebase",
    name: "FIREBASE",
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
    icon: <SiPostgresql className="w-7 h-7" />,
    unlocked: true,
    x: 700,
    y: 475,
    connections: ["database"],
    category: "database",
    description: "Advanced relational database",
    bgColor: "bg-linear-to-br from-neutral-600/30 to-neutral-800/30",
    iconColor: "text-neutral-200",
  },
  {
    id: "mysql",
    name: "MYSQL",
    icon: <SiMysql className="w-7 h-7" />,
    unlocked: true,
    x: 500,
    y: 475,
    connections: ["database"],
    category: "database",
    description: "Popular relational database management",
    bgColor: "bg-linear-to-br from-neutral-600/30 to-neutral-800/30",
    iconColor: "text-neutral-200",
  },

  // ===== TOOLS =====
  {
    id: "tools",
    name: "TOOLS",
    icon: <Wrench className="w-7 h-7" />,
    unlocked: true,
    x: 250,
    y: 450,
    connections: ["core"],
    category: "tools",
    description: "Development and collaboration tools",
    bgColor: "bg-linear-to-br from-neutral-800/80 to-black/80",
    iconColor: "text-white",
  },
  {
    id: "git",
    name: "GIT",
    icon: <SiGit className="w-7 h-7" />,
    unlocked: true,
    x: 150,
    y: 500,
    connections: ["tools"],
    category: "tools",
    description: "Version control workflows",
    bgColor: "bg-linear-to-br from-neutral-800/80 to-black/80",
    iconColor: "text-white",
  },


  // ===== Languages =====
  {
    id: "language",
    name: "PROGRAMMING LANGUAGES",
    icon: <Code className="w-7 h-7" />,
    unlocked: true,
    x: 0,
    y: 300,
    connections: ["core"],
    category: "backend",
    description: "Proficient in multiple programming languages",
    bgColor: "bg-linear-to-br from-neutral-600/30 to-neutral-800/30",
    iconColor: "text-neutral-200",
  },
  {
    id: "dart",
    name: "DART",
    icon: <SiDart className="w-7 h-7" />,
    unlocked: true,
    x: -50,
    y: 150,
    connections: ["language"],
    category: "backend",
    description: "Cross-platform mobile development",
    bgColor: "bg-linear-to-br from-neutral-500/10 to-cyan-600/10",
    iconColor: "text-neutral-600",
  },
  {
    id: "typescript",
    name: "TYPESCRIPT",
    icon: <SiTypescript className="w-7 h-7" />,
    unlocked: true,
    x: -150,
    y: 300,
    connections: ["language"],
    category: "backend",
    description: "Type-safe JavaScript development",
    bgColor: "bg-linear-to-br from-neutral-600/30 to-neutral-800/30",
    iconColor: "text-neutral-200",
  },
  {
    id: "java",
    name: "JAVA",
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

  // ===== Gaming and Animation =====
  {
    id: "3D",
      name: "Animation & 3D DESIGN",
    icon: <Gamepad2 className="w-7 h-7" />,
    unlocked: true,
    x: 900,
    y: 350,
    connections: [],
    category: "3D",
    description: "Game development and 3D content creation",
    bgColor: "bg-linear-to-br from-neutral-700/30 to-purple-800/30",
    iconColor: "text-purple-300",
  },
  {
    id: "unreal",
    name: "UNREAL ENGINE",
    icon: <SiUnrealengine className="w-7 h-7" />,
    unlocked: false,
    x: 925,
    y: 200,
    connections: ["3D"],
    category: "3D",
    description: "AAA game development engine",
    bgColor: "bg-linear-to-br from-neutral-800/30 to-neutral-900/30",
    iconColor: "text-white",
  },
  {
    id: "blender",
    name: "BLENDER",
    icon: <SiBlender className="w-7 h-7" />,
    unlocked: true,
    x: 925,
    y: 500,
    connections: ["3D"],
    category: "3D",
    description: "3D modeling and animation",
    bgColor: "bg-linear-to-br from-orange-600/30 to-yellow-700/30",
    iconColor: "text-orange-200",
  },
  {
    id: "animation",
    name: "ANIMATION",
    icon: <Film className="w-7 h-7" />,
    unlocked: false,
    x: 1050,
    y: 350,
    connections: ["3D"],
    category: "3D",
    description: "Character and motion animation fundamentals",
    bgColor: "bg-linear-to-br from-neutral-600/30 to-red-700/30",
    iconColor: "text-neutral-200",
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
  const [zoom, setZoom] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategories, setActiveCategories] = useState<Record<string, boolean>>({
    frontend: true,
    backend: true,
    database: true,
    tools: true,
    "3D": true,
  })

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

  // Keyboard shortcuts for zoom and centering
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(2)))
      if (e.key === "-") setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))
      if (e.key === "0") {
        setZoom(1)
        setMapPosition({ x: 0, y: 0 })
      }
    }

    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])




  const getConnectionPath = (from: SkillNode, to: SkillNode) => {
    const fromX = from.x + mapPosition.x
    const fromY = from.y + mapPosition.y
    const toX = to.x + mapPosition.x
    const toY = to.y + mapPosition.y

    const midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2

    const dx = Math.abs(toX - fromX)
    const dy = Math.abs(toY - fromY)

    if (dy > dx) {
      return `M ${fromX} ${fromY} L ${fromX} ${midY} L ${toX} ${midY} L ${toX} ${toY}`
    } else {
      return `M ${fromX} ${fromY} L ${midX} ${fromY} L ${midX} ${toY} L ${toX} ${toY}`
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
        <div className="border-l-2 border-neutral-500 pl-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-neutral-500 mr-2"></div>
              <span className="text-neutral-400 text-xs tracking-wider">NEURAL_INTERFACE</span>
            </div>
            <div className="text-neutral-400 text-xs">RELIC_v{version} | DRAG TO NAVIGATE</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">


            {/* Category filters */}
            <div className="flex items-center space-x-2">
              {Object.keys(activeCategories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategories((s) => ({ ...s, [cat]: !s[cat] }))}
                  className={`text-xs px-2 py-1 rounded ${activeCategories[cat] ? "bg-neutral-500/20 text-neutral-300" : "bg-transparent text-neutral-500/30 border border-transparent hover:bg-slate-800"}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setMapPosition({ x: -50, y: -100 })
                setZoom(1)
              }}
              aria-label="Center map"
              className="p-1 rounded bg-slate-900/40 border border-slate-700"
            >
              <Target className="w-4 h-4 text-neutral-300" />
            </button>
          </div>
        </div>

        {/* Skill Map Container */}
        <div
          ref={mapRef}
          className={`relative h-96 overflow-hidden rounded-lg border border-slate-500/30 ${isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          onMouseDown={handleMapMouseDown}
          style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        >

          {/* Extended Neural Network Background */}
          <div
            className="map-background absolute bg-linear-to-br from-black via-slate-950 to-slate-950/20"
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
                    className="absolute bg-linear-to-br from-neutral-500/20 to-transparent"
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
                  className="absolute w-1 h-1 bg-neutral-500/60 rounded-full animate-pulse"
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
                  className="absolute w-2 h-2 bg-neutral-400/40 rounded-full"
                  style={{
                    left: `${cluster.x}px`,
                    top: `${cluster.y}px`,
                    boxShadow: "0 0 8px rgba(220, 38, 38, 0.3)",
                  }}
                />
              ))}
            </div>

            {/* Ambient neural glow */}
            <div className="map-background absolute inset-0 bg-linear-to-br from-neutral-950/10 via-transparent to-neutral-900/5 pointer-events-none"></div>

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
            <style>
              {`
                @keyframes dashDraw {
                  to { stroke-dashoffset: -20; }
                }
              `}
            </style>

            <defs>
              {/* Keep your existing filters if you want, but we are using CSS filters for the main lines now */}
              <filter id="connectionGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {skillNodes.map((node) =>
              node.connections.map((connectionId) => {
                const targetNode = skillNodes.find((n) => n.id === connectionId)
                if (!targetNode) return null

                const isActive = isConnectionActive(node.id, connectionId)
                const bothUnlocked = node.unlocked && targetNode.unlocked

                // 2. Define state logic locally for readability
                const getConnectionState = () => {
                  if (isActive && bothUnlocked) return {
                    color: "#ef4444", // Red (Active) - Matches your theme's active state
                    width: 3,
                    opacity: 1,
                    dashed: true
                  };
                  if (bothUnlocked) return {
                    color: "#0F172A", // Indigo/Violet (Unlocked)
                    width: 3,
                    dashed: true

                  };
                  return {
                    color: "#ffffff", // Zinc-600 (Locked)
                    width: 1,
                    opacity: 0.3,
                    dashed: false
                  };
                };

                const style = getConnectionState();

                return (
                  <g key={`${node.id}-${connectionId}`}>
                    {/* Layer 1: Background Path (Creates a border/shadow effect for better visibility) */}
                    <path
                      d={getConnectionPath(node, targetNode)}
                      stroke="#000000"
                      strokeWidth={style.width + 2}
                      strokeOpacity={0.5}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                    />

                    {/* Layer 2: Main Connection Line with Data Flow Animation */}
                    <path
                      d={getConnectionPath(node, targetNode)}
                      stroke={style.color}
                      strokeWidth={style.width}
                      strokeOpacity={style.opacity}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      // Create dashed pattern if active
                      strokeDasharray={style.dashed ? "10, 10" : "none"}
                      style={{
                        // Animate the dash offset to create "flow"
                        animation: style.dashed ? "dashDraw 1s linear infinite" : "none",
                        // Apply glow via CSS drop-shadow which is often smoother than SVG filters
                        filter: isActive ? "drop-shadow(0 0 6px rgba(239, 68, 68, 0.8))" : "none"
                      }}
                      className="transition-all duration-500 ease-in-out"
                    />
                  </g>
                );
              }),
            )}
          </svg>

          {/* Skill Nodes */}
          {skillNodes.map((node) => {
            const isSelected = selectedNode === node.id
            const isHovered = hoveredNode === node.id
            const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase())
            const categoryActive = activeCategories[node.category] ?? true

            return (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 ${node.unlocked ? "hover:scale-110" : "opacity-60"
                  } ${isSelected ? "scale-110" : ""}`}
                style={{
                  left: node.x + mapPosition.x,
                  top: node.y + mapPosition.y,
                  opacity: matchesSearch && categoryActive ? 1 : 0.25,
                  pointerEvents: matchesSearch && categoryActive ? undefined : "none",
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
                    ${node.unlocked ? "border-slate-600" : "border-zinc-600 bg-zinc-800/50 text-zinc-500"} ${node.bgColor}
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
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-neutral-400 rounded-full opacity-60"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-neutral-400 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-neutral-400 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-neutral-400 rounded-full opacity-60"></div>
                </div>

                {/* Node label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-center pointer-events-none">
                  <div className={`text-xs font-semibold tracking-wide ${node.iconColor}`}>{node.name}</div>
                </div>
              </div>
            )
          })}

          {/* Hover Tooltip */}
          {hoveredNode && (() => {
            const node = skillNodes.find((n) => n.id === hoveredNode)
            if (!node) return null

            return (
              <div
                className="absolute z-40 pointer-events-none bg-slate-900/80 backdrop-blur-sm text-sm text-neutral-200 p-2 rounded shadow-lg border border-slate-700"
                style={{
                  left: node.x + mapPosition.x + 40,
                  top: node.y + mapPosition.y - 10,
                  minWidth: 180,
                }}
              >
                <div className="font-semibold text-xs">{node.name}</div>
                <div className="text-xs text-neutral-300/80">{node.description}</div>
              </div>
            )
          })()}

          {/* Map boundaries indicator */}
          {(mapPosition.x <= MAP_BOUNDS.minX + 10 ||
            mapPosition.x >= MAP_BOUNDS.maxX - 10 ||
            mapPosition.y <= MAP_BOUNDS.minY + 10 ||
            mapPosition.y >= MAP_BOUNDS.maxY - 10) && (
              <div className="absolute top-2 right-2 text-neutral-400 text-xs bg-neutral-500/10 border border-neutral-500/30 px-2 py-1 rounded">
                MAP BOUNDARY REACHED
              </div>
            )}
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="border border-neutral-500/30 p-4 bg-neutral-500/5 rounded-lg">
            {(() => {
              const node = skillNodes.find((n) => n.id === selectedNode)
              if (!node) return null

              return (
                <div>
                  <div className="flex items-center mb-2">
                    <div
                      className={`p-3 border-2 ${node.unlocked ? "border-slate-600" : "border-zinc-600 bg-zinc-800/50 text-zinc-500"} ${node.bgColor} rounded-lg mr-3`}
                    >
                      <div className={node.iconColor}>{node.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-neutral-400 font-bold text-lg">{node.name}</h3>
                    </div>
                  </div>
                  <p className="text-neutral-400/70 text-sm mb-3">{node.description}</p>

                  {/* Connected skills */}
                  <div className="text-xs text-neutral-400/50">
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
      </div>
    </BaseWindow>
  )
}
