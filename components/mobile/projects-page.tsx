"use client"

import BasePage from "./base-page"
import { projects } from "../projects-data"

interface ProjectsPageProps {
  onBack: () => void
}

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  return (
    <BasePage title="PROJECTS" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Neural network background overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.4) 1px, transparent 0),
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px, 40px 40px, 40px 40px",
            }}
          />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-blue-600/15 via-blue-600/35 to-blue-600/15" />
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative border border-red-600/40 bg-gradient-to-br from-zinc-950/90 to-red-900/30 rounded-xl p-4 shadow-lg hover:scale-[1.02] transition-transform duration-200 group overflow-hidden"
            >
              {/* Faded Project Icon (background) */}
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2 bg-red-600/10 border border-red-600/30 rounded shadow">
                  {project.icon}
                </div>
                <div>
                  <h3 className="text-red-400 font-bold text-lg leading-tight font-display drop-shadow-sm">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 ml-2">
                    {project.status}
                  </span>
                </div>
              </div>
              <p className="text-red-400/80 text-sm mb-3 font-mono relative z-10">
                {project.description}
              </p>
              <div className="mb-2 relative z-10">
                <div className="text-xs text-yellow-400 mb-1 font-bold">TECH STACK:</div>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-zinc-900 border border-yellow-500/30 text-yellow-400 text-xs rounded shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-2 relative z-10">
                <div className="text-xs text-blue-400 mb-1 font-bold">KEY ACHIEVEMENTS:</div>
                <ul className="list-disc pl-5 space-y-1">
                  {project.achievements.map((ach, i) => (
                    <li key={i} className="text-blue-400/80 text-xs">{ach}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 mt-2 relative z-10">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded hover:bg-yellow-500/30 transition-colors font-bold shadow"
                  >
                    LIVE
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs bg-blue-600/20 border border-blue-600/50 text-blue-400 rounded hover:bg-blue-600/30 transition-colors font-bold shadow"
                  >
                    CODE
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasePage>
  )
}
