"use client"

import { BaseWindow } from "./base-window"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useState, useEffect } from "react"
import { projects } from "../projects-data"

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

function ImageCarousel({ images, projectTitle }: { images: string[]; projectTitle: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="mb-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-xs text-teal-400 mb-2">PROJECT_PREVIEW:</div>
      <div className="relative w-full aspect-video border border-teal-500/30 bg-slate-900/50 overflow-hidden group">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${projectTitle} screenshot ${currentIndex + 1}`}
          fill
          className="object-fill transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-teal-600/0 group-hover:bg-teal-600/5 transition-colors" />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border border-teal-500/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-teal-400" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border border-teal-500/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-teal-400" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 transition-all ${
                    index === currentIndex ? "bg-teal-400 w-4" : "bg-teal-400/30 hover:bg-teal-400/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-2 right-2 bg-black/50 border border-teal-500/30 px-2 py-0.5 text-xs text-teal-400">
          {currentIndex + 1}/{images.length}
        </div>
      </div>
    </div>
  );
}

export function ProjectsWindow(props: ProjectsWindowProps) {
  return (
    <BaseWindow {...props} initialPosition={{ x: 150, y: 100 }} initialSize={{ width: 750, height: 600 }}>
      <div className="space-y-4 h-full overflow-y-auto">
        <div className="border-l-2 border-teal-600 pl-4">
          <div className="flex items-center mb-4">
            <div className="w-2 h-2 bg-teal-600 mr-2"></div>
            <span className="text-teal-400 text-xs tracking-wider">PROJECT_DATABASE</span>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-teal-600/30 bg-slate-800/40 hover:bg-slate-800/60 transition-colors p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2">{project.icon}</div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-teal-300 font-bold text-sm">{project.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs border ${
                          project.status === "DEPLOYED"
                            ? "border-emerald-500/50 text-emerald-300 bg-emerald-500/10"
                            : project.status === "ACTIVE"
                              ? "border-amber-500/50 text-amber-300 bg-amber-500/10"
                              : "border-cyan-500/50 text-cyan-300 bg-cyan-500/10"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-teal-300/70 text-xs mb-3">{project.description}</p>

                    {project.images && project.images.length > 0 && (
                      <ImageCarousel images={project.images} projectTitle={project.title} />
                    )}

                    <div className="mb-3">
                      <div className="text-xs text-teal-400 mb-1">TECH_STACK:</div>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 bg-slate-700/50 border border-teal-500/30 text-teal-300 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-teal-400 mb-1">KEY_ACHIEVEMENTS:</div>
                      <div className="space-y-1">
                        {project.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="text-xs text-teal-300/70 flex items-start">
                            <span className="text-teal-500 mr-1">•</span>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.links.live || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 px-2 py-1 border text-xs transition-colors ${
                          project.links.live
                            ? "bg-emerald-600/20 border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/30"
                            : "bg-slate-700/50 border-slate-600/50 text-slate-500 cursor-not-allowed"
                        }`}
                        title={project.links.live ? "View live project" : "Live project not available"}
                        aria-disabled={!project.links.live}
                      >
                        <ExternalLink className="w-3 h-3" />
                        LIVE
                      </a>
                      <a
                        href={project.links.github || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 px-2 py-1 border text-xs transition-colors ${
                          project.links.github
                            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30"
                            : "bg-slate-700/50 border-slate-600/50 text-slate-500 cursor-not-allowed"
                        }`}
                        title={project.links.github ? "View source code" : "Source code not available"}
                        aria-disabled={!project.links.github}
                      >
                        <Github className="w-3 h-3" />
                        CODE
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-slate-600/30 bg-slate-800/20 p-4 opacity-50">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 border border-slate-500 bg-slate-700/50 mr-3 flex items-center justify-center">
              <span className="text-slate-400 text-xs">+</span>
            </div>
            <h3 className="text-slate-400 font-bold text-sm">MORE PROJECTS COMING SOON</h3>
          </div>
          <p className="text-slate-500 text-xs">
            Additional projects will be added to the database as they are completed.
          </p>
        </div>
      </div>
    </BaseWindow>
  )
}
