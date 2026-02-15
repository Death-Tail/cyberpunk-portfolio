"use client"

import BasePage from "./base-page"
import { projects } from "../projects-data"
import { useState, useMemo } from "react"
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Cpu,
  Terminal,
  ShieldAlert,
  Hash,
  Globe,
  AlertTriangle,
  Clock
} from "lucide-react"
import Image from "next/image"

interface ProjectsPageProps {
  onBack: () => void
}

type FilterType = "ALL" | "DEPLOYED" | "ON-GOING"

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL")
  const [selectedImageIndices, setSelectedImageIndices] = useState<Record<number, number>>({})

  // Filter logic
  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return projects
    return projects.filter((p) => {
      if (activeFilter === "ON-GOING") return p.status !== "DEPLOYED"
      return p.status === activeFilter
    })
  }, [activeFilter])

  const toggleProject = (index: number) => {
    setExpandedId(expandedId === index ? null : index)
  }

  const handleImageNav = (e: React.MouseEvent, index: number, length: number, direction: 'next' | 'prev') => {
    e.stopPropagation();
    setSelectedImageIndices(prev => {
      const current = prev[index] || 0;
      const nextIndex = direction === 'next'
        ? (current + 1) % length
        : (current - 1 + length) % length;
      return { ...prev, [index]: nextIndex };
    });
  };

  return (
    <BasePage title="SYSTEM_PROJECTS" onBack={onBack}>
      <div className="relative space-y-6 min-h-screen pb-10">

        {/* Control Panel (Filters) */}
        <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-zinc-800 -mx-4 px-4 py-3 flex justify-between items-center">
          <div className="flex gap-2">
            {(["ALL", "DEPLOYED", "ON-GOING"] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider rounded-sm border transition-all duration-300 ${activeFilter === filter
                  ? "bg-cyan-950/30 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600">
            <Hash className="w-3 h-3" />
            <span>{filteredProjects.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedId === index;
            const currentImgIndex = selectedImageIndices[index] || 0;
            const hasImages = project.images && project.images.length > 0;

            return (
              <div
                key={index}
                className={`group relative flex flex-col border transition-all duration-500 overflow-hidden rounded-lg bg-zinc-900/30 ${isExpanded
                  ? "border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                  : "border-zinc-800/60 hover:border-zinc-700"
                  }`}
              >
                {/* Header Strip */}
                <div className="flex justify-between items-center px-4 py-2 bg-zinc-950/50 border-b border-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${project.status === "DEPLOYED" ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" :
                      project.status.toLowerCase().includes("development") ? "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]" : "bg-zinc-500"
                      }`} />
                    <span className={`text-[9px] font-mono tracking-wider ${project.status === "DEPLOYED" ? "text-emerald-500" : "text-amber-500"
                      }`}>
                      {project.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.year || "2024"}
                  </div>
                </div>

                <div className={`flex flex-col`}>

                  {/* Media Section (Only if images exist) */}
                  {hasImages ? (
                    <div className="relative w-full aspect-video border-b border-zinc-800/50 bg-black/80 overflow-hidden bg-[url('/grid-pattern.png')] group/gallery">

                      {/* CRT Scanline Effect */}
                      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] bg-repeat opacity-20" />
                      <div className="absolute inset-0 z-10 bg-radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%) pointer-events-none" />

                      {/* Main Image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={project.images[currentImgIndex]}
                          alt={project.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Viewfinder Overlay */}
                      <div className="absolute inset-0 pointer-events-none z-20">
                        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/50" />
                        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/50" />
                        <div className="absolute bottom-8 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50" />
                        <div className="absolute bottom-8 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/50" />

                        {/* Center Crosshair */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-30">
                          <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-400" />
                          <div className="absolute left-1/2 top-0 h-full w-px bg-cyan-400" />
                        </div>
                      </div>

                      {/* Controls */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => handleImageNav(e, index, project.images.length, 'prev')}
                            className="absolute left-0 top-0 bottom-8 w-12 z-30 flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors"
                          >
                            <div className="p-1 bg-black/40 backdrop-blur-sm rounded border border-white/10">‹</div>
                          </button>
                          <button
                            onClick={(e) => handleImageNav(e, index, project.images.length, 'next')}
                            className="absolute right-0 top-0 bottom-8 w-12 z-30 flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors"
                          >
                            <div className="p-1 bg-black/40 backdrop-blur-sm rounded border border-white/10">›</div>
                          </button>
                        </>
                      )}

                      {/* Status Bar */}
                      <div className="absolute bottom-0 inset-x-0 h-6 bg-black/90 border-t border-zinc-800 flex justify-between items-center px-3 z-30">
                        <span className="text-[8px] font-mono text-cyan-600 uppercase tracking-wider">IMG_VIEWER_MOBILE</span>

                        <div className="flex gap-1">
                          {project.images.map((_, dotIdx) => (
                            <div key={dotIdx} className={`w-1 h-1 rounded-full ${dotIdx === currentImgIndex ? 'bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'bg-zinc-700'}`} />
                          ))}
                        </div>

                        <span className="text-[8px] font-mono text-zinc-500">
                          {String(currentImgIndex + 1).padStart(2, '0')}/{String(project.images.length).padStart(2, '0')}
                        </span>
                      </div>

                    </div>
                  ) : (
                    /* Fallback for no images - Cyberpunk placeholder */
                    <div className="w-full aspect-21/9 bg-zinc-950 border-b border-zinc-800/50 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%)] bg-size-[250%_250%] animate-[shimmer_3s_infinite]" />
                      <div className="flex flex-col items-center gap-2 text-zinc-700">
                        <ShieldAlert className="w-6 h-6" />
                        <span className="text-[10px] font-mono">NO_VISUAL_FEED</span>
                      </div>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-4 flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded shrink-0">
                          <div className="w-8 h-8 flex items-center justify-center [&>img]:w-full [&>img]:h-full [&>img]:object-contain [&>div]:w-full [&>div]:h-full [&>div]:text-[8px] [&>div]:flex [&>div]:items-center [&>div]:justify-center">
                            {project.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-zinc-100 font-mono leading-tight">{project.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-zinc-500">
                            {project.timeline && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {project.timeline}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className={`text-zinc-400 text-xs leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips (Always visible, simpler view when collapsed) */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, isExpanded ? undefined : 4).map((t, i) => (
                        <span key={i} className="px-2 py-0.5 text-[9px] font-mono border border-zinc-800 bg-zinc-900/50 text-zinc-400 rounded-sm">
                          {t}
                        </span>
                      ))}
                      {!isExpanded && project.tech.length > 4 && (
                        <span className="px-2 py-0.5 text-[9px] font-mono text-zinc-600">+{project.tech.length - 4}</span>
                      )}
                    </div>

                    {/* Actions Bar */}
                    <div className="grid grid-cols-2 gap-3">
                      {project.links.live ? (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono border border-emerald-900/50 bg-emerald-900/10 text-emerald-400 rounded hover:bg-emerald-900/20 transition-colors"
                        >
                          <Globe className="w-3 h-3" /> VISIT SITE
                        </a>
                      ) : (
                        <button disabled className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono border border-zinc-800 bg-zinc-900/50 text-zinc-600 rounded cursor-not-allowed">
                          <Globe className="w-3 h-3" /> OFFLINE
                        </button>
                      )}

                      <button
                        onClick={() => toggleProject(index)}
                        className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono border rounded transition-all ${isExpanded
                          ? "border-cyan-500/50 bg-cyan-900/20 text-cyan-400"
                          : "border-zinc-700 bg-zinc-800 text-zinc-300"
                          }`}
                      >
                        <Terminal className="w-3 h-3" />
                        {isExpanded ? "CLOSE_DATA" : "VIEW_DATA"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Data Panel */}
                <div className={`
                  grid transition-all duration-500 ease-in-out overflow-hidden
                  ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                `}>
                  <div className="min-h-0 bg-black/20 border-t border-zinc-800/50">
                    <div className="p-4 space-y-4">

                      {/* Challenges */}
                      {project.challenges && project.challenges.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3" /> Technical_Hurdles
                          </h4>
                          <ul className="space-y-2">
                            {project.challenges.map((c, i) => (
                              <li key={i} className="text-[10px] text-zinc-400 pl-3 border-l border-amber-500/20 leading-relaxed">
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Features */}
                      {project.features && project.features.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                            <Layers className="w-3 h-3" /> System_Modules
                          </h4>
                          <div className="grid grid-cols-1 gap-1.5">
                            {project.features.map((f, i) => (
                              <div key={i} className="px-2 py-1.5 bg-zinc-900/40 border-l-2 border-zinc-700 text-[10px] text-zinc-300 font-mono">
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[10px] text-zinc-500 hover:text-cyan-400 transition-colors"
                          >
                            <Github className="w-3 h-3" />
                            <span>ACCESS_SOURCE_CODE_REPOSITORY</span>
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-lg">
            <div className="text-zinc-600 mb-2 font-mono">NO_DATA_FOUND</div>
            <p className="text-zinc-500 text-sm">Adjust filters to view project archives.</p>
          </div>
        )}
      </div>
    </BasePage>
  )
}
