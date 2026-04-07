"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { version } from "../../package.json"
import { BaseWindow } from "./base-window"
import { Code, Database, Film, Gamepad2, Layers, Server, Wrench, Target } from "lucide-react"
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
    bgColor: "bg-linear-to-br from-pink-100/80 to-amber-100/80",
    iconColor: "text-pink-600",
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
    bgColor: "bg-linear-to-br from-sky-100/80 to-blue-50/80",
    iconColor: "text-sky-600",
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
    bgColor: "bg-linear-to-br from-cyan-100/80 to-sky-50/80",
    iconColor: "text-cyan-600",
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
    connections: ["frontend"],
    category: "frontend",
    description: "Cross-platform mobile development",
    bgColor: "bg-linear-to-br from-cyan-500/10 to-cyan-600/10",
    iconColor: "text-cyan-600",
  },

  // =====BACKEND =====
  {
    id: "backend",
    name: "BACKEND",
    icon: <Server className="w-7 h-7" />,
    unlocked: true,
    x: 600,
    y: 175,
    connections: ["core"],
    category: "backend",
    description: "Server-side development and APIs",
    bgColor: "bg-linear-to-br from-emerald-100/80 to-green-50/80",
    iconColor: "text-emerald-600",
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
    bgColor: "bg-linear-to-br from-green-100/80 to-emerald-50/80",
    iconColor: "text-green-700",
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
    bgColor: "bg-linear-to-br from-green-100/80 to-emerald-50/80",
    iconColor: "text-green-700",
  },

  // ===== DATABASE =====
  {
    id: "database",
    name: "DATABASE",
    icon: <Database className="w-7 h-7" />,
    unlocked: true,
    x: 600,
    y: 450,
    connections: ["core"],
    category: "database",
    description: "Database design and optimization",
    bgColor: "bg-linear-to-br from-blue-100/80 to-indigo-50/80",
    iconColor: "text-blue-600",
  },
  {
    id: "firebase",
    name: "FIREBASE",
    icon: <SiFirebase className="w-7 h-7" />,
    unlocked: true,
    x: 600,
    y: 600,
    connections: ["database"],
    category: "database",
    description: "Realtime NoSQL database",
    bgColor: "bg-linear-to-br from-amber-100/80 to-pink-50/80",
    iconColor: "text-amber-600",
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
    bgColor: "bg-linear-to-br from-blue-100/80 to-sky-50/80",
    iconColor: "text-blue-700",
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
    bgColor: "bg-linear-to-br from-pink-100/80 to-amber-50/80",
    iconColor: "text-pink-700",
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
    bgColor: "bg-linear-to-br from-stone-200/80 to-stone-100/80",
    iconColor: "text-stone-700",
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
    bgColor: "bg-linear-to-br from-pink-100/80 to-red-50/80",
    iconColor: "text-pink-700",
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
    bgColor: "bg-linear-to-br from-violet-100/80 to-purple-50/80",
    iconColor: "text-violet-700",
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
    bgColor: "bg-linear-to-br from-cyan-100/80 to-sky-50/80",
    iconColor: "text-cyan-700",
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
    bgColor: "bg-linear-to-br from-blue-100/80 to-indigo-50/80",
    iconColor: "text-blue-700",
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
    bgColor: "bg-linear-to-br from-amber-100/80 to-pink-50/80",
    iconColor: "text-amber-700",
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
    bgColor: "bg-linear-to-br from-rose-100/80 to-pink-50/80",
    iconColor: "text-rose-600",
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
    bgColor: "bg-linear-to-br from-stone-100/80 to-stone-50/80",
    iconColor: "text-stone-600",
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
    bgColor: "bg-linear-to-br from-pink-100/80 to-amber-50/80",
    iconColor: "text-pink-600",
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
    bgColor: "bg-linear-to-br from-pink-100/80 to-rose-50/80",
    iconColor: "text-pink-600",
  },
]

const MAP_BOUNDS = {
  width: 2000,
  height: 1600,
  minX: -600,
  maxX: 600,
  minY: -400,
  maxY: 400,
}

export function TechStackWindow(props: TechStackWindowProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [searchTerm] = useState("")
  const [activeCategories, setActiveCategories] = useState<Record<string, boolean>>({
    frontend: true,
    backend: true,
    database: true,
    tools: true,
    "3D": true,
  })

  const handleMapMouseDown = (e: React.MouseEvent) => {
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
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y
        const constrainedX = Math.max(MAP_BOUNDS.minX, Math.min(MAP_BOUNDS.maxX, newX))
        const constrainedY = Math.max(MAP_BOUNDS.minY, Math.min(MAP_BOUNDS.maxY, newY))
        setMapPosition({ x: constrainedX, y: constrainedY })
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(2)))
      if (e.key === "-") setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)))
      if (e.key === "0") { setZoom(1); setMapPosition({ x: 0, y: 0 }) }
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

  const isConnectionActive = (nodeId: string, connectionId: string) =>
    hoveredNode === nodeId || hoveredNode === connectionId || selectedNode === nodeId || selectedNode === connectionId

  return (
    <BaseWindow {...props} initialPosition={{ x: 250, y: 120 }} initialSize={{ width: 860, height: 620 }}>
      <div className="flex flex-col h-full gap-3 overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-950/40 leading-none">Skill Architecture</h2>
            <p className="text-stone-700 text-xs font-bold mt-0.5">Drag to explore.</p>
          </div>
          <div className="text-stone-950/30 text-[10px] font-mono font-black tracking-widest">v{version}</div>
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => { setMapPosition({ x: -50, y: -100 }); setZoom(1) }}
            aria-label="Center map"
            className="p-2 rounded-lg bg-white/60 border border-stone-950/10 hover:border-pink-400/60 hover:bg-pink-400/10 transition-all group"
          >
            <Target className="w-4 h-4 text-stone-950/40 group-hover:text-pink-500 transition-colors" />
          </button>
        </div>

        {/* ── Map ── */}
        <div
          ref={mapRef}
          className={`relative flex-1 min-h-0 overflow-hidden rounded-2xl border border-stone-950/8 shadow-inner ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={handleMapMouseDown}
          style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        >
          {/* Warm linen map background */}
          <div
            className="map-background absolute bg-linear-to-br from-[#fffcf5] via-pink-50/60 to-amber-50/80"
            style={{
              width: MAP_BOUNDS.width,
              height: MAP_BOUNDS.height,
              left: mapPosition.x - (MAP_BOUNDS.width - 860) / 2,
              top: mapPosition.y - (MAP_BOUNDS.height - 400) / 2,
              pointerEvents: "none",
            }}
          >
            {/* Dot grid */}
            <div
              className="map-background absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(120,80,40,0.08) 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
            {/* Warm ambient blobs */}
            <div className="map-background absolute top-1/4 left-1/3 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl pointer-events-none" />
            <div className="map-background absolute bottom-1/4 right-1/4 w-48 h-48 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <style>{`@keyframes dashDraw { to { stroke-dashoffset: -20; } }`}</style>
            {skillNodes.map((node) =>
              node.connections.map((connectionId) => {
                const targetNode = skillNodes.find((n) => n.id === connectionId)
                if (!targetNode) return null
                const isActive = isConnectionActive(node.id, connectionId)
                const bothUnlocked = node.unlocked && targetNode.unlocked
                const color = isActive ? "#f97316" : bothUnlocked ? "rgba(120,80,40,0.25)" : "rgba(120,80,40,0.08)"
                const width = isActive ? 2.5 : 1.5
                return (
                  <g key={`${node.id}-${connectionId}`}>
                    {isActive && (
                      <path d={getConnectionPath(node, targetNode)} stroke="#fed7aa" strokeWidth={7} strokeOpacity={0.35} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                    <path
                      d={getConnectionPath(node, targetNode)}
                      stroke={color} strokeWidth={width} fill="none"
                      strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray={bothUnlocked ? "8, 8" : "none"}
                      style={{ animation: bothUnlocked ? "dashDraw 1.5s linear infinite" : "none" }}
                      className="transition-all duration-500"
                    />
                  </g>
                )
              })
            )}
          </svg>

          {/* Skill Nodes */}
          {skillNodes.map((node) => {
            const isSelected = selectedNode === node.id
            const isHovered = hoveredNode === node.id
            const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase())
            const categoryActive = activeCategories[node.category] ?? true
            const isHub = ["core", "frontend", "backend", "database", "tools", "language", "3D"].includes(node.id)

            return (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 ${node.unlocked ? "hover:scale-110" : "opacity-50"
                  } ${isSelected ? "scale-110" : ""}`}
                style={{
                  left: node.x + mapPosition.x,
                  top: node.y + mapPosition.y,
                  opacity: matchesSearch && categoryActive ? 1 : 0.2,
                  pointerEvents: matchesSearch && categoryActive ? undefined : "none",
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedNode(selectedNode === node.id ? null : node.id)
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node card */}
                <div
                  className={`
                    relative flex items-center justify-center transition-all duration-300 backdrop-blur-sm
                    ${isHub ? "w-24 h-24 rounded-2xl shadow-xl ring-2 border border-white/80" : "w-16 h-16 rounded-xl shadow-md ring-1 border border-white/60"}
                    ${isSelected
                      ? "ring-pink-400 shadow-pink-200/60 border-pink-300/60"
                      : isHovered
                        ? "ring-stone-950/20"
                        : "ring-stone-950/8"
                    }
                    ${node.bgColor}
                  `}
                >
                  <div className={`${isHub ? "scale-125" : ""} ${node.iconColor} z-10 flex items-center justify-center`}>
                    {node.icon}
                  </div>

                  {!node.unlocked && (
                    <div className="absolute inset-0 rounded-xl bg-white/50 flex items-center justify-center">
                      <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest">Soon</span>
                    </div>
                  )}

                  {isSelected && (
                    <div className={`absolute inset-0 ${isHub ? "rounded-2xl" : "rounded-xl"} ring-2 ring-pink-400 animate-pulse opacity-60`} />
                  )}
                </div>

                {/* Label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center pointer-events-none whitespace-nowrap">
                  <div className={`font-black uppercase tracking-wider leading-none ${isHub ? "text-[12px] text-stone-950" : "text-[10px] text-stone-950/50"}`}>
                    {node.name}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Hover Tooltip */}
          {hoveredNode && !selectedNode && (() => {
            const node = skillNodes.find((n) => n.id === hoveredNode)
            if (!node) return null
            return (
              <div
                className="absolute z-40 pointer-events-none bg-stone-950/90 backdrop-blur-xl text-white p-3 rounded-xl shadow-2xl border border-white/10 max-w-50"
                style={{ left: node.x + mapPosition.x + 52, top: node.y + mapPosition.y - 20, minWidth: 160 }}
              >
                <div className="font-black text-xs mb-1 uppercase tracking-tight">{node.name}</div>
                <div className="text-[10px] text-white/60 font-bold leading-snug">{node.description}</div>
                {!node.unlocked && (
                  <div className="mt-1.5 text-[9px] text-amber-400 flex items-center gap-1 font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    In progress
                  </div>
                )}
              </div>
            )
          })()}

          {/* Edge of map indicator */}
          {(mapPosition.x <= MAP_BOUNDS.minX + 10 || mapPosition.x >= MAP_BOUNDS.maxX - 10 ||
            mapPosition.y <= MAP_BOUNDS.minY + 10 || mapPosition.y >= MAP_BOUNDS.maxY - 10) && (
              <div className="absolute top-3 right-3 text-stone-950/40 text-[9px] font-black bg-white/70 border border-stone-950/10 px-2 py-1 rounded-full backdrop-blur-sm uppercase tracking-widest">
                Edge of map
              </div>
            )}
        </div>

        {/* ── Selected Node Detail Panel ── */}
        {selectedNode && (() => {
          const node = skillNodes.find((n) => n.id === selectedNode)
          if (!node) return null
          return (
            <div className="shrink-0 flex items-start gap-4 p-4 rounded-2xl border border-white/60 bg-white/50 backdrop-blur-sm shadow-sm ring-1 ring-stone-950/5">
              <div className={`p-3.5 rounded-xl ${node.bgColor} border border-white/60 shadow-sm shrink-0 flex items-center justify-center`}>
                <div className={`${node.iconColor} w-7 h-7 flex items-center justify-center`}>{node.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-stone-950 font-black text-sm uppercase tracking-tight">{node.name}</h3>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${node.unlocked ? "bg-emerald-500/20 text-emerald-700" : "bg-amber-400/20 text-amber-700"
                    }`}>
                    {node.unlocked ? "Proficient" : "Learning"}
                  </span>
                </div>
                <p className="text-stone-700 text-xs font-bold mb-2">{node.description}</p>

                {node.connections.length > 0 && (
                  <div className="mt-2 text-[9px] uppercase font-black tracking-widest text-stone-950/30">
                    Links:{" "}
                    <span className="text-stone-700">
                      {node.connections.map((id) => skillNodes.find((n) => n.id === id)?.name).filter(Boolean).join(" · ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })()}
      </div>
    </BaseWindow>
  )
}
