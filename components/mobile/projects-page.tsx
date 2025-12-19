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
  Activity,
  Code2,
  Terminal,
  Users
} from "lucide-react"
import Image, { type StaticImageData } from "next/image"

interface ProjectsPageProps {
  onBack: () => void
}

type FilterType = "ALL" | "DEPLOYED" | "ON-GOING" | "ARCHIVED";

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL")
  const [selectedImageIndices, setSelectedImageIndices] = useState<Record<number, number>>({})

  // Filter logic
  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return projects
    return projects.filter((p) => p.status === activeFilter)
  }, [activeFilter])

  const toggleProject = (index: number) => {
    setExpandedId(expandedId === index ? null : index)
  }

  const handleImageNav = (e: React.MouseEvent, index: number, length: number, direction: 'next' | 'prev') => {
    e.stopPropagation(); // Prevent card expansion when clicking arrows
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
      <div className="relative space-y-8 min-h-screen pb-10">

        {/* Control Panel (Filters) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-end sm:items-center border-b border-white/10 pb-6">
          <div className="flex gap-2 p-1 bg-zinc-900/50 border border-white/10 rounded-lg backdrop-blur-sm object-center">
            {(["ALL", "DEPLOYED", "ON-GOING"] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-md transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-neutral-500/20 text-neutral-400 border border-neutral-500/50 shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs text-zinc-500 font-mono">PROJECTS_LOADED</div>
            <div className="text-xl font-bold text-white font-mono">
              {filteredProjects.length.toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedId === index;
            const currentImgIndex = selectedImageIndices[index] || 0;

            return (
              <div
                key={index}
                className={`group relative flex flex-col border transition-all duration-500 overflow-hidden rounded-xl ${
                  isExpanded
                    ? "lg:col-span-2 border-neutral-500/50 bg-zinc-900/90 z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                    : "border-white/5 bg-zinc-900/40 hover:border-neutral-500/30 hover:bg-zinc-900/60"
                }`}
              >
                {/* Decorative Corner Markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-500/0 group-hover:border-neutral-500 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-500/0 group-hover:border-neutral-500 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-500/0 group-hover:border-neutral-500 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-500/0 group-hover:border-neutral-500 transition-colors" />

                <div className={`flex flex-col ${isExpanded ? 'lg:flex-row' : ''}`}>

                  {/* Media Section */}
                  <div className={`relative w-full aspect-video ${isExpanded ? 'lg:w-1/2' : ''}`}>
                    <Image
                      src={project.images[currentImgIndex]}
                      alt={project.title}
                      fill
                      className="object-cover object-top-left opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />

                    {/* Image Controls (Only visible if multiple images) */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handleImageNav(e, index, project.images.length, 'prev')}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur hover:bg-neutral-500/20 text-white rounded border border-white/10 transition-colors"
                        >
                          ‹
                        </button>
                        <button
                          onClick={(e) => handleImageNav(e, index, project.images.length, 'next')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur hover:bg-neutral-500/20 text-white rounded border border-white/10 transition-colors"
                        >
                          ›
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {project.images.map((_, dotIdx) => (
                            <div key={dotIdx} className={`w-1.5 h-1.5 rounded-full ${dotIdx === currentImgIndex ? 'bg-neutral-400' : 'bg-white/20'}`} />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Status Badge Overlay */}
                    <div className="absolute top-3 right-3">
                       <span className={`px-2 py-1 text-[10px] font-mono border backdrop-blur-md rounded ${
                          project.status === "DEPLOYED" ? "border-green-500/50 text-green-400 bg-green-900/20" :
                          project.status === "ON-GOING" ? "border-amber-500/50 text-amber-400 bg-amber-900/20" :
                          "border-red-500/50 text-red-400 bg-red-900/20"
                       }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`flex-1 p-5 flex flex-col`}>
                    <div className="mb-auto">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1.5 bg-neutral-500/10 rounded text-neutral-400 border border-neutral-500/20">
                          {project.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
                      </div>

                      <div className="flex items-center text-zinc-400 text-xs font-mono mb-4">
                        <Calendar className="w-3 h-3 mr-2" />
                        {project.timeline}
                        <span className="mx-2 text-zinc-700">|</span>
                        <Users className="w-3 h-3 mr-2" />
                        {project.teamSize}
                      </div>

                      <p className={`text-zinc-400 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Preview (Collapsed) */}
                    {!isExpanded && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-zinc-400">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-zinc-500">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div className={`flex items-center gap-3 mt-6 pt-4 border-t border-white/5 ${isExpanded ? 'justify-start' : 'justify-between'}`}>
                      <button
                        onClick={() => toggleProject(index)}
                        className="flex items-center text-xs font-bold text-neutral-400 hover:text-neutral-300 transition-colors uppercase tracking-wider"
                      >
                        {isExpanded ? "Close_Data" : "Access_Data"}
                        {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                      </button>

                      <div className="flex gap-2">
                        {project.links.github && (
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.links.live && (
                          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Data Panel */}
                <div className={`
                  overflow-hidden transition-[max-height] duration-500 ease-in-out bg-black/20 border-t border-white/5
                  ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Column 1: Metrics */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center">
                        <Activity className="w-3 h-3 mr-2" /> Performance
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                          <span className="text-xs text-zinc-400">Performance</span>
                          <span className="text-sm font-mono font-bold text-green-400">{project.metrics.performance}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                          <span className="text-xs text-zinc-400">Accessibility</span>
                          <span className="text-sm font-mono font-bold text-neutral-400">{project.metrics.accessibility}%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                          <span className="text-xs text-zinc-400">SEO</span>
                          <span className="text-sm font-mono font-bold text-amber-400">{project.metrics.seo}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Tech Stack */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center">
                        <Cpu className="w-3 h-3 mr-2" /> Stack_Architecture
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 text-xs font-mono bg-neutral-900/20 border border-neutral-500/20 text-neutral-400 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Insights */}
                    <div className="space-y-4 md:col-span-2 lg:col-span-1">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center">
                        <Terminal className="w-3 h-3 mr-2" /> Dev_Log
                      </h4>
                      <div className="space-y-3">
                        <div className="text-xs space-y-1">
                          <span className="text-zinc-500 block mb-1">:: KEY FEATURES</span>
                          {project.features.slice(0,2).map((f, i) => (
                            <div key={i} className="text-zinc-300 pl-3 border-l border-zinc-700">{f}</div>
                          ))}
                        </div>
                        <div className="text-xs space-y-1 pt-2">
                          <span className="text-zinc-500 block mb-1">:: CHALLENGES</span>
                          {project.challenges.slice(0,2).map((c, i) => (
                            <div key={i} className="text-zinc-300 pl-3 border-l border-red-500/30">{c}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl">
            <div className="text-zinc-600 mb-2 font-mono">NO_DATA_FOUND</div>
            <p className="text-zinc-500 text-sm">Adjust filters to view project archives.</p>
          </div>
        )}
      </div>
    </BasePage>
  )
}
