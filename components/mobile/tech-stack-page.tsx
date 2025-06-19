"use client"

import BasePage from "./base-page"
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql, SiMysql, SiFlutter, SiGit, SiFirebase, SiDart } from "react-icons/si"
import { DiJava } from "react-icons/di"

interface TechStackPageProps {
  onBack: () => void
}

export default function TechStackPage({ onBack }: TechStackPageProps) {
  const skillNodes = [
    // Core
    {
      name: "FULL STACK",
      icon: (
        <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center text-xs">FS</div>
      ),
      category: "core",
      bgColor: "bg-gradient-to-br from-red-500/30 to-orange-600/30",
      iconColor: "text-red-200",
    },

    // Frontend
    {
      name: "REACT",
      icon: <SiReact className="w-7 h-7" />,
      category: "frontend",
      bgColor: "bg-gradient-to-br from-cyan-500/30 to-blue-600/30",
      iconColor: "text-cyan-200",
    },
    {
      name: "NEXT.JS",
      icon: <SiNextdotjs className="w-7 h-7" />,
      category: "frontend",
      bgColor: "bg-gradient-to-br from-gray-800/80 to-black/80",
      iconColor: "text-white",
    },
    {
      name: "TYPESCRIPT",
      icon: <SiTypescript className="w-7 h-7" />,
      category: "frontend",
      bgColor: "bg-gradient-to-br from-blue-600/30 to-blue-800/30",
      iconColor: "text-blue-200",
    },
    {
      name: "FLUTTER",
      icon: <SiFlutter className="w-7 h-7" />,
      category: "frontend",
      bgColor: "bg-white",
      iconColor: "text-blue-400",
    },

    // Backend
    {
      name: "NODE.JS",
      icon: <SiNodedotjs className="w-7 h-7" />,
      category: "backend",
      bgColor: "bg-gradient-to-br from-green-600/30 to-green-800/30",
      iconColor: "text-green-200",
    },
    {
      name: "JAVA",
      icon: <DiJava className="w-7 h-7" />,
      category: "backend",
      bgColor: "bg-gradient-to-br from-orange-600/30 to-red-600/30",
      iconColor: "text-orange-200",
    },
    {
      name: "Dart",
      icon: <SiDart className="w-7 h-7" />,
      category: "backend",
      bgColor: "bg-white",
      iconColor: "text-blue-600",
    },

    // Database
    {
      name: "Firebase",
      icon: <SiFirebase className="w-7 h-7"/>,
      category: "database",
      bgColor: "bg-gradient-to-br from-yellow-600/30 to-red-800/30",
      iconColor: "text-orange-200",
    },
    {
      name: "POSTGRESQL",
      icon: <SiPostgresql className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-gradient-to-br from-blue-600/30 to-blue-800/30",
      iconColor: "text-blue-200",
    },
    {
      name: "MYSQL",
      icon: <SiMysql className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-gradient-to-br from-blue-600/30 to-blue-800/30",
      iconColor: "text-blue-200",
    },

    // Tools
    {
      name: "GIT",
      icon: <SiGit className="w-7 h-7" />,
      category: "tools",
      bgColor: "bg-gradient-to-br from-gray-800/80 to-black/80",
      iconColor: "text-white",
    }
  ]

  return (
    <BasePage title="TECH_STACK" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Neural network background overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.4) 1px, transparent 0),
                linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px, 40px 40px, 40px 40px",
            }}
          />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-red-500/20 via-red-500/40 to-red-500/20" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-red-600/15 via-red-600/35 to-red-600/15" />
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-red-500/20 via-red-500/40 to-red-500/20" />
          <div className="absolute left-2/4 top-0 w-px h-full bg-gradient-to-b from-red-600/15 via-red-600/35 to-red-600/15" />
        </div>

        {/* Categories */}
        {["core", "frontend", "backend", "database", "tools"].map((category) => (
          <div key={category} className="relative border-l-2 border-red-600 pl-4">
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-red-600 mr-2"></div>
              <span className="text-red-400 text-xs tracking-wider">{category.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 border-l-2 border-red-600/30 rounded-lg bg-red-500/5 p-3">
              {skillNodes
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div
                    key={skill.name}
                    className={`relative p-3 ${skill.bgColor} border border-red-600/30 transition-all duration-300 rounded-lg hover:scale-[1.02] group`}
                  >
                    <div className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.6) 0.5px, transparent 0)`,
                        backgroundSize: "4px 4px",
                      }}
                    />
                    <div className={`mb-1 ${skill.iconColor}`}>{skill.icon}</div>
                    <div className="text-sm font-bold text-red-400">{skill.name}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </BasePage>
  )
}
