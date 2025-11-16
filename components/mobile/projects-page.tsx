"use client"

import BasePage from "./base-page"
import { projects } from "../projects-data"
import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink, Github, Calendar, Users, Zap, Eye } from "lucide-react"
import Image from "next/image"

interface ProjectsPageProps {
  onBack: () => void
}

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({})
  const [selectedImageIndex, setSelectedImageIndex] = useState<Record<number, number>>({})

  const toggleProject = (index: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const nextImage = (projectIndex: number, images: string[]) => {
    setSelectedImageIndex((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % images.length,
    }))
  }

  const prevImage = (projectIndex: number, images: string[]) => {
    setSelectedImageIndex((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + images.length) % images.length,
    }))
  }

  return (
    <BasePage title="PROJECTS" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Projects Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 text-center rounded-lg">
            <div className="text-lg font-bold text-blue-400">{projects.length}</div>
            <div className="text-blue-400/70 text-xs">Total Projects</div>
          </div>
          <div className="p-3 bg-green-500/10 border border-green-500/30 text-center rounded-lg">
            <div className="text-lg font-bold text-green-400">
              {projects.filter((p) => p.status === "DEPLOYED").length}
            </div>
            <div className="text-green-400/70 text-xs">Live Projects</div>
          </div>
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 text-center rounded-lg">
            <div className="text-lg font-bold text-yellow-400">
              6
            </div>
            <div className="text-yellow-400/70 text-xs">Technologies</div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative border border-red-600/40 bg-linear-to-br from-zinc-950/90 to-red-900/20 rounded-xl overflow-hidden"
            >
              {/* Project Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600/10 border border-red-600/30 rounded">{project.icon}</div>
                    <div>
                      <h3 className="text-red-400 font-bold text-lg">{project.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono px-2 py-0.5 rounded border border-green-500/30 bg-green-500/10 text-green-400">
                          {project.status}
                        </span>
                        <div className="flex items-center text-xs text-red-400/60">
                          <Calendar className="w-3 h-3 mr-1" />
                          {project.timeline}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleProject(index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    {expandedProjects[index] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Project Image Carousel */}
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <div className="relative h-48 bg-zinc-800">
                    <Image
                      src={project.images[selectedImageIndex[index] || 0]}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-fill"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent select-none pointer-events-none" />

                    {/* Image Navigation */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {project.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() => setSelectedImageIndex((prev) => ({ ...prev, [index]: imgIndex }))}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            (selectedImageIndex[index] || 0) === imgIndex ? "bg-red-400" : "bg-white/30"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => prevImage(index, project.images)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => nextImage(index, project.images)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <p className="text-red-400/80 text-sm mb-3">{project.description}</p>

                {/* Quick Actions */}
                <div className="flex gap-2 mb-4">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-green-500/20 border border-green-500/50 text-green-400 rounded hover:bg-green-500/30 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      LIVE SITE
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      SOURCE CODE
                    </a>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${expandedProjects[index] ? "max-h-none" : "max-h-0"}`}
              >
                <div className="px-4 pb-4 space-y-4">
                  {/* Project Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2 bg-green-500/10 border border-green-500/30 text-center rounded">
                      <div className="text-sm font-bold text-green-400">{project.metrics.performance}%</div>
                      <div className="text-green-400/70 text-xs">Performance</div>
                    </div>
                    <div className="p-2 bg-blue-500/10 border border-blue-500/30 text-center rounded">
                      <div className="text-sm font-bold text-blue-400">{project.metrics.accessibility}%</div>
                      <div className="text-blue-400/70 text-xs">Accessibility</div>
                    </div>
                    <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 text-center rounded">
                      <div className="text-sm font-bold text-yellow-400">{project.metrics.seo}%</div>
                      <div className="text-yellow-400/70 text-xs">SEO Score</div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 gap-4">
                    {/* Tech Stack */}
                    <div>
                      <div className="text-xs text-yellow-400 mb-2 font-bold flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        TECH STACK
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-zinc-900 border border-yellow-500/30 text-yellow-400 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <div className="text-xs text-blue-400 mb-2 font-bold flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        KEY FEATURES
                      </div>
                      <div className="space-y-1">
                        {project.features.map((feature, i) => (
                          <div key={i} className="text-blue-400/80 text-xs flex items-start">
                            <span className="text-blue-500 mr-1">•</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenges & Solutions */}
                    <div>
                      <div className="text-xs text-red-400 mb-2 font-bold">CHALLENGES SOLVED</div>
                      <div className="space-y-1">
                        {project.challenges.map((challenge, i) => (
                          <div key={i} className="text-red-400/80 text-xs flex items-start">
                            <span className="text-red-500 mr-1">▸</span>
                            {challenge}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-red-600/20">
                      <div>
                        <div className="text-xs text-purple-400 mb-1">Team Size</div>
                        <div className="text-purple-400/80 text-xs">{project.teamSize}</div>
                      </div>
                      <div>
                        <div className="text-xs text-purple-400 mb-1">Duration</div>
                        <div className="text-purple-400/80 text-xs">{project.timeline}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasePage>
  )
}
