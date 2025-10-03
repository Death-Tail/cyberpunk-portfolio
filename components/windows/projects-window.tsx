import { BaseWindow } from "./base-window"
import { Globe, ExternalLink, Github } from "lucide-react"
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

export function ProjectsWindow(props: ProjectsWindowProps) {
  return (
    <BaseWindow {...props} initialPosition={{ x: 150, y: 100 }} initialSize={{ width: 750, height: 600 }}>
      <div className="space-y-4 h-full overflow-y-auto">
        {/* Header */}
        <div className="border-l-2 border-red-600 pl-4">
          <div className="flex items-center mb-4">
            <div className="w-2 h-2 bg-red-600 mr-2"></div>
            <span className="text-red-500 text-xs tracking-wider">PROJECT_DATABASE</span>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-red-600/30 bg-red-600/5 p-4 hover:bg-red-600/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div
                    className={`p-2`}
                  >
                    {project.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-red-400 font-bold text-sm">{project.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs border ${
                          project.status === "DEPLOYED"
                            ? "border-green-600/50 text-green-400 bg-green-600/10"
                            : project.status === "ACTIVE"
                              ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                              : "border-blue-500/50 text-blue-400 bg-blue-500/10"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-red-400/70 text-xs mb-3">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="mb-3">
                      <div className="text-xs text-yellow-400 mb-1">TECH_STACK:</div>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 bg-zinc-800 border border-yellow-500/30 text-yellow-400 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-3">
                      <div className="text-xs text-blue-400 mb-1">KEY_ACHIEVEMENTS:</div>
                      <div className="space-y-1">
                        {project.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="text-xs text-blue-400/70 flex items-start">
                            <span className="text-blue-500 mr-1">•</span>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2">
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-1 bg-pink-600/20 border border-pink-600/50 text-pink-400 text-xs hover:bg-pink-600/30 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        LIVE
                      </a>
                      <button
                        disabled={!project.links.github}
                        className={`flex items-center gap-1 px-2 py-1 border text-xs transition-colors ${
                          project.links.github
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30"
                            : "bg-zinc-800/50 border-zinc-600/50 text-zinc-500 cursor-not-allowed"
                        }`}
                        title={project.links.github ? "View source code" : "Source code not available"}
                      >
                        <Github className="w-3 h-3" />
                        CODE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Projects Placeholder */}
        <div className="border border-zinc-600/30 bg-zinc-800/20 p-4 opacity-50">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 border border-zinc-500 bg-zinc-700/50 mr-3 flex items-center justify-center">
              <span className="text-zinc-400 text-xs">+</span>
            </div>
            <h3 className="text-zinc-400 font-bold text-sm">MORE PROJECTS COMING SOON</h3>
          </div>
          <p className="text-zinc-500 text-xs">
            Additional projects will be added to the database as they are completed.
          </p>
        </div>
      </div>
    </BaseWindow>
  )
}
