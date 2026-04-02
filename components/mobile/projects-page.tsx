"use client"

import BasePage from "./base-page"
import { projects } from "../projects-data"
import { useState, useMemo } from "react"
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GitBranch,
  Calendar,
  Layers,
  Cpu,
  Terminal,
  ShieldAlert,
  Hash,
  Globe2,
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
    <BasePage title="ARCHIVES" onBack={onBack}>
      <div className="relative space-y-6 min-h-screen pb-10">

        {/* Control Panel (Filters) */}
        <div className="sticky top-0 z-20 bg-white/40 backdrop-blur-3xl border-b border-white/60 -mx-4 px-4 py-4 flex justify-between items-center shadow-sm ring-1 ring-white/40">
          <div className="flex gap-2">
            {(["ALL", "DEPLOYED", "ON-GOING"] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-[10px] font-black tracking-widest rounded-full border transition-all duration-300 uppercase shadow-xs ${activeFilter === filter
                  ? "bg-stone-950 text-white border-stone-950"
                  : "bg-white/40 text-stone-500 border-white/60 hover:text-stone-950"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-black text-stone-950/40 tracking-widest uppercase">
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
                className={`group relative flex flex-col border transition-all duration-500 overflow-hidden rounded-4xl bg-white/40 backdrop-blur-3xl shadow-xl ring-1 ring-white/60 ${isExpanded
                  ? "border-orange-200/60 shadow-orange-950/5"
                  : "border-white/80 hover:border-white"
                  }`}
              >
                {/* Header Strip */}
                <div className="flex justify-between items-center px-6 py-4 bg-white/30 border-b border-white/40">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${project.status === "DEPLOYED" ? "bg-emerald-500 animate-pulse" :
                      project.status.toLowerCase().includes("development") ? "bg-orange-400 animate-pulse" : "bg-stone-300"
                      }`} />
                    <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${project.status === "DEPLOYED" ? "text-emerald-600" : "text-orange-600"
                      }`}>
                      {project.status === "DEPLOYED" ? "Synchronized" : "In Composition"}
                    </span>
                  </div>
                  <div className="text-[10px] font-black text-stone-950/30 flex items-center gap-1 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {project.year || "2024"}
                  </div>
                </div>

                <div className={`flex flex-col`}>

                  {/* Media Section (Only if images exist) */}
                  {hasImages ? (
                    <div className="relative w-full aspect-video border-b border-white/40 bg-white/20 overflow-hidden group/gallery">

                      {/* Main Image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={project.images[currentImgIndex]}
                          alt={project.title}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      {/* Nostalgic Frame Overlays */}
                      <div className="absolute inset-4 pointer-events-none z-20 border border-white/20 rounded-2xl shadow-inner" />

                      {/* Controls */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => handleImageNav(e, index, project.images.length, 'prev')}
                            className="absolute left-0 top-0 bottom-8 w-12 z-30 flex items-center justify-center text-white/50 hover:text-memory-pink transition-colors"
                          >
                            <div className="p-1 bg-white/10 backdrop-blur-sm rounded border border-white/20">‹</div>
                          </button>
                          <button
                            onClick={(e) => handleImageNav(e, index, project.images.length, 'next')}
                            className="absolute right-0 top-0 bottom-8 w-12 z-30 flex items-center justify-center text-white/50 hover:text-memory-pink transition-colors"
                          >
                            <div className="p-1 bg-white/10 backdrop-blur-sm rounded border border-white/20">›</div>
                          </button>
                        </>
                      )}

                      {/* Status Bar */}
                      <div className="absolute bottom-0 inset-x-0 h-8 bg-white/60 backdrop-blur-xl border-t border-white/40 flex justify-between items-center px-4 z-30">
                        <span className="text-[9px] font-black text-stone-950/40 uppercase tracking-[0.2em]">Archival Record</span>

                        <div className="flex gap-1.5">
                          {project.images.map((_, dotIdx) => (
                            <div key={dotIdx} className={`w-1 h-1 rounded-full ${dotIdx === currentImgIndex ? 'bg-orange-400' : 'bg-stone-300'}`} />
                          ))}
                        </div>

                        <span className="text-[9px] font-black text-stone-950/30 tracking-widest">
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
                  <div className="p-6 flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-white/60 border border-white/80 rounded-2xl shadow-sm ring-1 ring-white/40 group-hover:scale-110 transition-transform duration-500">
                          <div className="w-10 h-10 flex items-center justify-center [&>img]:w-full [&>img]:h-full [&>img]:object-contain [&>div]:w-full [&>div]:h-full [&>div]:text-[10px] [&>div]:flex [&>div]:items-center [&>div]:justify-center">
                            {project.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-stone-950 tracking-tighter leading-tight uppercase group-hover:text-orange-600 transition-colors">{project.title}</h3>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] font-black text-stone-950/40 uppercase tracking-widest">
                            {project.timeline && (
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-orange-400" /> {project.timeline}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className={`text-stone-800 text-xs leading-relaxed font-bold ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips (Always visible, simpler view when collapsed) */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, isExpanded ? undefined : 4).map((t, i) => (
                        <span key={i} className="px-2 py-0.5 text-[9px] font-bold border border-memory-pink/40 bg-white/60 text-stone-700 rounded-sm">
                          {t}
                        </span>
                      ))}
                      {!isExpanded && project.tech.length > 4 && (
                        <span className="px-2 py-0.5 text-[9px] font-bold text-stone-500">+{project.tech.length - 4}</span>
                      )}
                    </div>

                    {/* Actions Bar */}
                    <div className="grid grid-cols-2 gap-4">
                      {project.links.live ? (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 py-4 px-3 text-[10px] font-black bg-stone-950 text-white rounded-2xl hover:bg-stone-800 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
                        >
                          <Globe2 className="w-4 h-4 text-orange-400" /> Open App
                        </a>
                      ) : (
                        <button disabled className="flex items-center justify-center gap-3 py-4 px-3 text-[10px] font-black bg-stone-100 text-stone-400 border border-stone-200 rounded-2xl cursor-not-allowed uppercase tracking-widest">
                          <Globe2 className="w-4 h-4" /> Offline
                        </button>
                      )}

                      <button
                        onClick={() => toggleProject(index)}
                        className={`flex items-center justify-center gap-3 py-4 px-3 text-[10px] font-black border transition-all rounded-2xl shadow-sm uppercase tracking-widest active:scale-95 ${isExpanded
                          ? "bg-orange-50 border-orange-200 text-orange-900"
                          : "bg-white border-stone-200 text-stone-950 hover:bg-stone-50"
                          }`}
                      >
                        <Terminal className="w-4 h-4" />
                        {isExpanded ? "Close Info" : "View Details"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Data Panel */}
                <div className={`
                  grid transition-all duration-500 ease-in-out overflow-hidden
                  ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                `}>
                  <div className="min-h-0 bg-[#fffcf5]/40 border-t border-white/60">
                    <div className="p-6 space-y-6">

                      {/* Challenges */}
                      {project.challenges && project.challenges.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-orange-900 uppercase tracking-widest flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-orange-500" /> Technical_Hurdles
                          </h4>
                          <ul className="space-y-3">
                            {project.challenges.map((c, i) => (
                              <li key={i} className="text-[11px] text-stone-800 font-bold pl-4 border-l-2 border-orange-400/20 leading-relaxed">
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Features */}
                      {project.features && project.features.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black text-stone-950 uppercase tracking-widest flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-amber-500" /> Modular_Architecture
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {project.features.map((f, i) => (
                              <div key={i} className="px-3 py-2 bg-white/60 border-l-2 border-orange-400 text-[11px] text-stone-950 font-black tracking-tight rounded-r-lg ring-1 ring-white/40">
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t border-white/40">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[10px] font-black text-stone-950/40 hover:text-stone-950 transition-all uppercase tracking-widest"
                          >
                            <GitBranch className="w-3.5 h-3.5" />
                            <span>Retain Source Code</span>
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
