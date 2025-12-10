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
      <div className="text-xs text-indigo-400 mb-2">PROJECT_PREVIEW:</div>
      <div className="relative w-full aspect-video border border-indigo-500/30 bg-stone-900/50 overflow-hidden group">
        <Image
          // 3. The src prop in Next/Image natively supports both types
          src={currentImage || "/placeholder.svg"}
          alt={`${projectTitle} screenshot ${currentIndex + 1}`}
          fill
          // Only apply blur placeholder if it is a Static Import (object),
          // otherwise string URLs need a manual blurDataURL which is complex to handle dynamically
          placeholder={shouldBlur ? "blur" : "empty"}
          className="object-fill transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors" />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border border-indigo-500/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border border-indigo-500/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-indigo-400" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 transition-all ${index === currentIndex ? "bg-indigo-400 w-4" : "bg-indigo-400/30 hover:bg-indigo-400/50"
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-2 right-2 bg-black/50 border border-indigo-500/30 px-2 py-0.5 text-xs text-indigo-400">
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
        <div className="border-l-2 border-indigo-600 pl-4">
          <div className="flex items-center mb-4">
            <div className="w-2 h-2 bg-indigo-600 mr-2"></div>
            <span className="text-indigo-400 text-xs tracking-wider">PROJECT_DATABASE</span>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-indigo-600/30 bg-stone-800/40 hover:bg-stone-800/60 transition-colors p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  {/* Note: Ensure project.icon is rendered correctly if it contains JSX */}
                  <div className="p-2">{project.icon}</div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-indigo-300 font-bold text-sm">{project.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs border ${project.status === "DEPLOYED"
                            ? "border-emerald-500/50 text-green-500 bg-green-700/10"
                            : project.status === "ON-GOING"
                              ? "border-amber-500/50 text-amber-300 bg-amber-500/10"
                              : "border-red-500/50 text-red-300 bg-red-500/10"
                          }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-white text-xs mb-3">{project.description}</p>

                    {/* Pass images down; they now accept StaticImageData */}
                    {project.images && project.images.length > 0 && (
                      <ImageCarousel images={project.images} projectTitle={project.title} />
                    )}

                    <div className="mb-3">
                      <div className="text-xs text-indigo-400 mb-1">TECH_STACK:</div>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 bg-stone-700/50 border border-indigo-500/30 text-indigo-300 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-indigo-400 mb-1">KEY_ACHIEVEMENTS:</div>
                      <div className="space-y-1">
                        {project.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="text-xs text-white flex items-start">
                            <span className="text-indigo-500 mr-1">•</span>
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
                        className={`flex items-center gap-1 px-2 py-1 border text-xs transition-colors ${project.links.live
                            ? "bg-emerald-600/20 border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/30"
                            : "bg-stone-700/50 border-stone-600/50 text-stone-500 cursor-not-allowed"
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
                        className={`flex items-center gap-1 px-2 py-1 border text-xs transition-colors ${project.links.github
                            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30"
                            : "bg-stone-700/50 border-stone-600/50 text-stone-500 cursor-not-allowed"
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

        <div className="border border-stone-600/30 bg-stone-800/20 p-4 opacity-50">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 border border-stone-500 bg-stone-700/50 mr-3 flex items-center justify-center">
              <span className="text-stone-400 text-xs">+</span>
            </div>
            <h3 className="text-stone-400 font-bold text-sm">MORE PROJECTS COMING SOON</h3>
          </div>
          <p className="text-stone-500 text-xs">
            Additional projects will be added to the database as they are completed.
          </p>
        </div>
      </div>
    </BaseWindow>
  )
}
