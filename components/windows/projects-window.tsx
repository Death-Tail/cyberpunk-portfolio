"use client"

import type React from "react"
import { useState } from "react"
import Image, { type StaticImageData } from "next/image"
import { BaseWindow } from "./base-window"
import { projects } from "../projects-data"
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Hash,
  Terminal,
  Cpu,
  Database,
  Globe,
  Users,
  Layers,
  ShieldAlert,
  Monitor,
  AlertTriangle
} from 'lucide-react'
import { GlitchText } from "../glitch-text"

// --- Interfaces ---

interface ProjectsWindowProps {
  id: string
  title: string
  isActive: boolean
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
}

interface ProjectValues {
  title: string
  description: string
  status: string
  icon: React.ReactNode
  images: (string | StaticImageData)[]
  tech: string[]
  achievements: string[]
  links: {
    live: string | null
    github: string | null
  }
  timeline?: string
  teamSize?: string
  challenges?: string[]
  features?: string[]
  year?: string
}



// --- Components ---

function StatusBadge({ status }: { status: string }) {
  let colorClass = "text-zinc-400 border-zinc-500/30 bg-zinc-500/10"
  let dotClass = "bg-zinc-400"

  if (status === "DEPLOYED") {
    colorClass = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
    dotClass = "bg-emerald-400"
  } else if (status === "ON-GOING" || status.toLowerCase().includes("development")) {
    colorClass = "text-amber-400 border-amber-500/30 bg-amber-500/10"
    dotClass = "bg-amber-400"
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 border rounded-sm text-[9px] font-mono tracking-wider uppercase ${colorClass} w-fit`}>
      <div className={`w-1 h-1 rounded-full ${dotClass} animate-pulse`} />
      {status}
    </div>
  )
}

function TechChip({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/80 border border-zinc-700/50 hover:border-zinc-500/50 transition-colors group">
      <div className="w-0.5 h-2 bg-zinc-600 group-hover:bg-cyan-400 transition-colors" />
      <span className="text-[10px] font-mono text-zinc-300 group-hover:text-cyan-100 uppercase">{name}</span>
    </div>
  )
}

function ImageGallery({ images, title }: { images: (string | StaticImageData)[]; title: string }) {
  const [index, setIndex] = useState(0)

  // If no images, return null to hide the component entirely
  if (!images || images.length === 0) {
    return null
  }

  const current = images[index]

  // Handle navigation
  const nextImage = () => setIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="space-y-4">
      {/* Main Viewport */}
      <div className="group relative w-full aspect-video bg-black/80 border border-zinc-700/50 overflow-hidden bg-[url('/grid-pattern.png')]">

        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] bg-repeat opacity-20" />
        <div className="absolute inset-0 z-10 bg-radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%) pointer-events-none" />

        {/* Main Image */}
        <div className="absolute inset-2 md:inset-4 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={current || "/placeholder.svg"}
              alt={`${title} shot ${index + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>



        {/* Hover Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-center justify-center hover:from-black/70"
            >
              <ChevronLeft className="w-8 h-8 text-cyan-500 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-center justify-center hover:from-black/70"
            >
              <ChevronRight className="w-8 h-8 text-cyan-500 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails - The "Pro" Scroll Part */}
      {images.length > 1 && (
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`relative h-20 aspect-video shrink-0 bg-zinc-900 border transition-all duration-300 group/thumb ${i === index
                  ? 'border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] scale-105 z-10 ring-1 ring-cyan-500/50'
                  : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600 grayscale hover:grayscale-0'
                  }`}
              >
                <Image src={img || "/placeholder.svg"} alt={`Thumb ${i}`} fill className="object-cover" />
                {i === index && (
                  <div className="absolute inset-0 bg-cyan-500/10 animate-pulse pointer-events-none" />
                )}
                {/* Number overlay */}
                <div className="absolute top-0.5 right-0.5 bg-black/80 px-1 text-[8px] font-mono text-zinc-400 opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                  {i + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function ProjectsWindow(props: ProjectsWindowProps) {
  const [selectedId, setSelectedId] = useState<number>(0)
  const selectedProject = projects[selectedId] as ProjectValues

  const hasTech = selectedProject.tech && selectedProject.tech.length > 0
  const hasMetadata = selectedProject.timeline || selectedProject.teamSize || selectedProject.status
  const hasAchievements = selectedProject.achievements && selectedProject.achievements.length > 0
  const hasFeatures = selectedProject.features && selectedProject.features.length > 0
  const hasChallenges = selectedProject.challenges && selectedProject.challenges.length > 0

  return (
    <BaseWindow {...props} initialPosition={{ x: 100, y: 50 }} initialSize={{ width: 900, height: 650 }}>
      <div className="flex h-full overflow-hidden">

        {/* --- LEFT SIDEBAR: PROJECT LIST --- */}
        <div className="w-1/3 min-w-[250px] border-r border-zinc-700/30 flex flex-col bg-zinc-900/30 backdrop-blur-sm">
          {/* Sidebar Header */}
          <div className="p-3 border-b border-zinc-700/30 bg-zinc-900/50">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>Project_Index</span>
            </div>
            <div className="mt-1 h-px w-full bg-linear-to-r from-cyan-900/50 to-transparent" />
          </div>

          {/* Project List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {projects.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedId(idx)}
                className={`w-full text-left group relative pl-3 pr-2 py-3 border-l-2 transition-all duration-200 overflow-hidden ${selectedId === idx
                  ? 'bg-zinc-800/60 border-cyan-500'
                  : 'border-zinc-800 hover:bg-zinc-800/30 hover:border-zinc-600'
                  }`}
              >
                {/* Background Noise for Active Item */}
                {selectedId === idx && (
                  <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] pointer-events-none" />
                )}

                <div className="flex items-center gap-3 relative z-10">
                  {/* Status Dot */}
                  <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${p.status === 'DEPLOYED' ? 'bg-emerald-500 shadow-emerald-500/50' :
                    p.status.toLowerCase().includes('development') ? 'bg-amber-500 shadow-amber-500/50' : 'bg-zinc-500'
                    }`} />

                  {/* Project Logo */}
                  <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    {p.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-bold font-mono uppercase truncate ${selectedId === idx ? 'text-cyan-100' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {p.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-zinc-500 font-mono tracking-tight flex items-center gap-1.5">
                        <span className="w-1 h-3 bg-zinc-700/50 rounded-sm"></span>
                        {p.year}
                      </span>
                      {selectedId === idx && <ChevronRight className="w-3 h-3 text-cyan-500 animate-pulse" />}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-2 border-t border-zinc-700/30 bg-zinc-900/80">
            <div className="flex justify-between items-center text-[9px] text-zinc-600 font-mono">
              <span>TOTAL_RECORDS</span>
              <span>{projects.length}</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT MAIN CONTENT: PROJECT DETAILS --- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-black/20">
          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(zinc-500 1px, transparent 1px), linear-gradient(90deg, zinc-500 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />

          <div className="p-6 pb-20 space-y-6 relative z-10">

            {/* Header Section */}
            <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
              <div className="space-y-2">
                <StatusBadge status={selectedProject.status} />
                <h1 className="text-xl font-bold text-zinc-100 font-mono tracking-tight uppercase flex items-center gap-2">
                  <GlitchText
                    text={selectedProject.title}
                    className="text-xl font-bold mb-1"
                    glitchColors={["#a1a1aa", "#71717a", "#52525b"]}
                  />
                </h1>
                <p className="text-sm text-zinc-400 max-w-md border-l-2 border-zinc-800 pl-3 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={selectedProject.links.live || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-mono uppercase tracking-wide transition-all ${selectedProject.links.live
                    ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/60 cursor-pointer'
                    : 'border-zinc-700 text-zinc-600 cursor-not-allowed opacity-50 pointer-events-none'
                    }`}
                >
                  <Globe className="w-3 h-3" />
                  Visit Website
                </a>
                <a
                  href={selectedProject.links.github || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-mono uppercase tracking-wide transition-all ${selectedProject.links.github
                    ? 'border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-400 cursor-pointer'
                    : 'border-zinc-700 text-zinc-600 cursor-not-allowed opacity-50 pointer-events-none'
                    }`}
                >
                  <Github className="w-3 h-3" />
                  Source_Code
                </a>
              </div>
            </div>

            {/* Main Visual - Auto Hides if Empty */}
            <ImageGallery images={selectedProject.images} title={selectedProject.title} />

            {/* Info Grid - Auto Adjusts Columns */}
            {(hasTech || hasMetadata) && (
              <div className={`grid gap-4 ${hasTech && hasMetadata ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {/* Tech Stack */}
                {hasTech && (
                  <div className="space-y-3 bg-zinc-900/20 border border-zinc-800/50 p-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                      <Cpu className="w-12 h-12 text-cyan-500/50 rotate-12" />
                    </div>
                    <div className="relative z-10 space-y-3">
                      <h3 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                        <Terminal className="w-3 h-3" /> System_Architecture
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t, i) => (
                          <TechChip key={i} name={t} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Metadata */}
                {hasMetadata && (
                  <div className="space-y-3 bg-zinc-900/20 border border-zinc-800/50 p-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                      <Hash className="w-12 h-12 text-emerald-500/50 -rotate-12" />
                    </div>
                    <div className="relative z-10 space-y-2">
                      <h3 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                        <Monitor className="w-3 h-3" /> Project_Metadata
                      </h3>
                      {selectedProject.timeline && (
                        <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-1">
                          <span className="text-zinc-500 font-mono">TIMELINE</span>
                          <span className="text-zinc-300 font-mono">{selectedProject.timeline}</span>
                        </div>
                      )}
                      {selectedProject.teamSize && (
                        <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-1">
                          <span className="text-zinc-500 font-mono">TEAM_SIZE</span>
                          <span className="text-zinc-300 font-mono">{selectedProject.teamSize}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-1">
                        <span className="text-zinc-500 font-mono">STATUS</span>
                        <span className={`font-mono ${selectedProject.status === 'DEPLOYED' ? 'text-emerald-400' : 'text-amber-400'}`}>{selectedProject.status}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Achievements & Features & Challenges */}
            <div className="space-y-4">
              {hasAchievements && (
                <div>
                  <h3 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest mb-3 flex items-center gap-2">
                    <Users className="w-3 h-3" /> Key_Achievements
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedProject.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-zinc-400 ml-1">
                        <span className="text-cyan-500 mt-0.5">▹</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges */}
              {hasChallenges && (
                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                  <h3 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-amber-500" /> Technical_Challenges
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.challenges!.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-zinc-400 ml-1">
                        <span className="text-amber-500/70 mt-0.5">!</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {hasFeatures && (
                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                  <h3 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest mb-3 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> System_Capabilities
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.features!.map((feat, i) => (
                      <div key={i} className="bg-zinc-900/40 p-2 border-l-2 border-zinc-700 text-[10px] text-zinc-300 font-mono">
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </BaseWindow>
  )
}
