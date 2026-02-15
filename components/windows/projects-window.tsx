"use client"

import { BaseWindow } from "./base-window"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
// 1. Import StaticImageData type
import Image, { StaticImageData } from "next/image"
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

// 2. Update the Props interface to accept both strings and StaticImageData
function ImageCarousel({
  images,
  projectTitle
}: {
  images: (string | StaticImageData)[];
  projectTitle: string
}) {
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

  // Helper to determine if we can blur (only works easily with StaticImageData)
  const currentImage = images[currentIndex];
  const shouldBlur = typeof currentImage !== 'string';

  return (
    <div
      className="mb-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-xs text-neutral-400 mb-2">PROJECT_PREVIEW:</div>
      <div className="relative w-full aspect-video bg-neutral-900/50 overflow-hidden group">
        <Image
          // 3. The src prop in Next/Image natively supports both types
          src={currentImage || "/placeholder.svg"}
          alt={`${projectTitle} screenshot ${currentIndex + 1}`}
          fill
          placeholder={shouldBlur ? "blur" : "empty"}
          className="object-fill transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-neutral-600/0 group-hover:bg-neutral-600/5 transition-colors" />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border border-neutral-500/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border border-neutral-500/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 transition-all ${index === currentIndex ? "bg-neutral-400 w-4" : "bg-neutral-400/30 hover:bg-neutral-400/50"
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-2 right-2 bg-black/50 border border-neutral-500/30 px-2 py-0.5 text-xs text-neutral-400">
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
        {/* Header */}
        <div className="mb-2">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Project Portfolio</h2>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-lg bg-zinc-800/40 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200 p-5 group"
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Icon */}
                <div className="shrink-0 p-2 rounded-lg bg-zinc-700/30">{project.icon}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-zinc-100 font-semibold text-sm truncate">{project.title}</h3>
                    <span
                      className={`shrink-0 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full ${project.status === "DEPLOYED"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : project.status === "ON-GOING"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/30"
                        }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-3">{project.description}</p>

                  {/* Pass images down; they now accept StaticImageData */}
                  {project.images && project.images.length > 0 && (
                    <ImageCarousel images={project.images} projectTitle={project.title} />
                  )}

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">Tech Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-zinc-700/40 border border-zinc-600/30 text-zinc-300 text-[11px] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">Key Achievements</div>
                    <div className="space-y-1.5">
                      {project.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="text-xs text-zinc-300 flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-700/30">
                    <a
                      href={project.links.live || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${project.links.live
                          ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                          : "bg-zinc-800/50 border border-zinc-700/30 text-zinc-500 cursor-not-allowed"
                        }`}
                      title={project.links.live ? "View live project" : "Not available"}
                      aria-disabled={!project.links.live}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                    <a
                      href={project.links.github || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${project.links.github
                          ? "bg-zinc-700/40 border border-zinc-600/30 text-zinc-300 hover:bg-zinc-700/60"
                          : "bg-zinc-800/50 border border-zinc-700/30 text-zinc-500 cursor-not-allowed"
                        }`}
                      title={project.links.github ? "View source code" : "Private repository"}
                      aria-disabled={!project.links.github}
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-neutral-600/30 bg-neutral-800/20 p-4 opacity-50">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 border border-neutral-500 bg-neutral-700/50 mr-3 flex items-center justify-center">
              <span className="text-neutral-400 text-xs">+</span>
            </div>
            <h3 className="text-neutral-400 font-bold text-sm">MORE PROJECTS COMING SOON</h3>
          </div>
          <p className="text-neutral-500 text-xs">
            Additional projects will be added to the database as they are completed.
          </p>
        </div>
      </div>
    </BaseWindow>
  )
}
