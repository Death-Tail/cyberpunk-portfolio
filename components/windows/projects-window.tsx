"use client"

import type React from "react"
import { useState } from "react"
import Image, { type StaticImageData } from "next/image"
import { BaseWindow } from "./base-window"
import { projects } from "../projects-data"
import { FaGithub, FaChevronLeft, FaChevronRight, FaDatabase, FaGlobe } from "react-icons/fa";
import { AlertTriangle, Cpu, Hash, Layers, Monitor, Terminal, Users } from "lucide-react"

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
  let colorClass = "text-stone-700 border-stone-200 bg-white/60"
  let dotClass = "bg-stone-400"

  if (status === "DEPLOYED") {
    colorClass = "text-memory-sky border-memory-sky/20 bg-memory-sky/5"
    dotClass = "bg-memory-sky"
  } else if (status === "ON-GOING" || status.toLowerCase().includes("development")) {
    colorClass = "text-memory-gold border-memory-gold/20 bg-memory-gold/5"
    dotClass = "bg-memory-gold"
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[10px] font-semibold tracking-wide uppercase ${colorClass} w-fit`}>
      <div className={`w-1.5 h-1.5 rounded-full ${dotClass} animate-pulse`} />
      {status}
    </div>
  )
}

function TechChip({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/40 border border-white/60 hover:border-memory-pink/50 transition-all rounded-full group shadow-sm">
      <div className="w-1.5 h-1.5 rounded-full bg-memory-pink/60 group-hover:bg-memory-pink transition-colors" />
      <span className="text-[10px] font-bold text-stone-700 group-hover:text-stone-950 uppercase tracking-wider">{name}</span>
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
      <div className="group relative w-full aspect-video bg-white/20 border border-white/30 rounded-2xl overflow-hidden shadow-inner">
        <div className="absolute inset-0 z-10 bg-radial-gradient(circle_at_center,transparent_60%,rgba(255,255,255,0.2)_100%) pointer-events-none" />


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
              className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-center justify-center hover:from-white/40"
            >
              <FaChevronLeft className="w-8 h-8 text-memory-pink drop-shadow-md" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-center justify-center hover:from-white/40"
            >
              <FaChevronRight className="w-8 h-8 text-memory-pink drop-shadow-md" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails - The "Pro" Scroll Part */}
      {images.length > 1 && (
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin scrollbar-track-memory-brown/10 scrollbar-thumb-memory-pink/30">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`relative h-20 aspect-video shrink-0 bg-white/10 rounded-lg border transition-all duration-300 group/thumb ${i === index
                  ? 'border-memory-pink shadow-[0_4px_12px_rgba(249,168,212,0.3)] scale-105 z-10'
                  : 'border-white/30 opacity-60 hover:opacity-100 hover:border-white/60'
                  }`}
              >
                <Image src={img || "/placeholder.svg"} alt={`Thumb ${i}`} fill className="object-cover rounded-md" />
                {i === index && (
                  <div className="absolute inset-0 bg-memory-pink/10 animate-pulse pointer-events-none rounded-md" />
                )}
                {/* Number overlay */}
                <div className="absolute top-0.5 right-0.5 bg-black/80 px-1 text-[8px] font-mono text-memory-white opacity-0 group-hover/thumb:opacity-100 transition-opacity">
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
        <div className="w-1/3 min-w-62.5 border-r border-white/20 flex flex-col bg-white/5 backdrop-blur-sm">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/20 bg-white/10">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-600 uppercase tracking-widest">
              <FaDatabase className="w-3.5 h-3.5 text-memory-pink" />
              <span>Project_Index</span>
            </div>
          </div>

          {/* Project List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {projects.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedId(idx)}
                className={`w-full text-left group relative pl-3 pr-2 py-4 border-l-4 transition-all duration-300 rounded-r-xl ${selectedId === idx
                  ? 'bg-memory-pink/10 border-memory-pink shadow-sm'
                  : 'border-transparent hover:bg-white/10 hover:border-white/30'
                  }`}
              >

                {/* Background Noise for Active Item */}
                {selectedId === idx && (
                  <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] pointer-events-none" />
                )}

                <div className="flex items-center gap-3 relative z-10">
                  {/* Status Dot */}
                  <div className={`w-2 h-2 rounded-full shadow-sm ${p.status === 'DEPLOYED' ? 'bg-memory-sky shadow-memory-sky/30' :
                    p.status.toLowerCase().includes('development') ? 'bg-memory-gold shadow-memory-gold/30' : 'bg-memory-brown/30'
                    }`} />

                  {/* Project Logo */}
                  <div className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                    {p.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-bold uppercase truncate tracking-wide ${selectedId === idx ? 'text-stone-900' : 'text-stone-500 group-hover:text-stone-700'}`}>
                      {p.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-stone-500 font-bold tracking-tight">
                        {p.year}
                      </span>
                      {selectedId === idx && <FaChevronRight className="w-3 h-3 text-memory-pink animate-in fade-in slide-in-from-left-2" />}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-2 border-t border-memory-brown/10 bg-memory-white/30">
            <div className="flex justify-between items-center text-[9px] text-memory-brown/40 font-mono">
              <span>TOTAL_RECORDS</span>
              <span>{projects.length}</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT MAIN CONTENT: PROJECT DETAILS --- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-white/5">
          {/* Background Gradient Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          />

          <div className="p-6 pb-20 space-y-6 relative z-10">

            {/* Header Section */}
            <div className="flex justify-between items-start border-b border-memory-brown/10 pb-4">
              <div className="space-y-2">
                <StatusBadge status={selectedProject.status} />
                <h1 className="text-2xl font-black text-stone-950 tracking-tight uppercase">
                  {selectedProject.title}
                </h1>
                <p className="text-sm text-stone-800 max-w-md border-l-2 border-memory-pink/40 pl-3 leading-relaxed font-bold">
                  {selectedProject.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={selectedProject.links.live || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold uppercase tracking-wide transition-all ${selectedProject.links.live
                    ? 'border-memory-sky/20 text-memory-sky bg-memory-sky/5 hover:bg-memory-sky/10 hover:scale-105 cursor-pointer'
                    : 'border-memory-brown/10 text-memory-brown/30 bg-memory-white/5 cursor-not-allowed opacity-50 pointer-events-none'
                    }`}
                >
                  <FaGlobe className="w-3.5 h-3.5" />
                  Visit Website
                </a>
                <a
                  href={selectedProject.links.github || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold uppercase tracking-wide transition-all ${selectedProject.links.github
                    ? 'border-memory-brown/20 text-memory-brown hover:bg-white/40 hover:scale-105 cursor-pointer'
                    : 'border-memory-brown/10 text-memory-brown/30 bg-white/10 cursor-not-allowed opacity-60 pointer-events-none'
                    }`}
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  Source Code
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
                  <div className="space-y-4 bg-white/40 border border-white/60 p-5 rounded-2xl relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 p-1 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <Cpu className="w-16 h-16 text-memory-pink rotate-12" />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <h3 className="text-[10px] font-bold uppercase text-stone-600 tracking-[0.2em] flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-memory-pink" /> System_Architecture
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
                  <div className="space-y-4 bg-white/40 border border-white/60 p-5 rounded-2xl relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 p-1 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <Hash className="w-16 h-16 text-memory-sky -rotate-12" />
                    </div>
                    <div className="relative z-10 space-y-2">
                      <h3 className="text-[10px] font-bold uppercase text-stone-600 tracking-[0.2em] flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-memory-pink" /> Project_Metadata
                      </h3>
                      {selectedProject.timeline && (
                        <div className="flex justify-between items-center text-xs border-b border-stone-100 pb-1">
                          <span className="text-stone-600 font-bold">TIMELINE</span>
                          <span className="text-stone-900 font-black">{selectedProject.timeline}</span>
                        </div>
                      )}
                      {selectedProject.teamSize && (
                        <div className="flex justify-between items-center text-xs border-b border-stone-100 pb-1">
                          <span className="text-stone-600 font-bold">TEAM_SIZE</span>
                          <span className="text-stone-900 font-black">{selectedProject.teamSize}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-xs border-b border-stone-100 pb-1">
                        <span className="text-stone-600 font-bold">STATUS</span>
                        <span className={`font-black ${selectedProject.status === 'DEPLOYED' ? 'text-memory-sky' : 'text-memory-gold'}`}>{selectedProject.status}</span>
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
                  <h3 className="text-[10px] font-bold uppercase text-stone-500 tracking-widest mb-3 flex items-center gap-2">
                    <Users className="w-3 h-3 text-memory-pink" /> Key_Achievements
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {selectedProject.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-stone-800 font-bold ml-1">
                        <span className="text-memory-pink mt-0.5 font-black">▹</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges */}
              {hasChallenges && (
                <div className="mt-4 pt-4 border-t border-memory-brown/10">
                  <h3 className="text-[10px] font-mono uppercase text-memory-brown/50 tracking-widest mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-memory-gold" /> Technical_Challenges
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.challenges!.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-memory-brown/70 ml-1">
                        <span className="text-memory-gold mt-0.5">!</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {hasFeatures && (
                <div className="mt-4 pt-4 border-t border-memory-brown/10">
                  <h3 className="text-[10px] font-mono uppercase text-memory-brown/50 tracking-widest mb-3 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> System_Capabilities
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.features!.map((feat, i) => (
                      <div key={i} className="bg-white/40 p-2 border-l-2 border-memory-pink/50 text-[10px] text-memory-brown/80 font-mono rounded-r-md">
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
