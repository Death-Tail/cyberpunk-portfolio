"use client"

import BasePage from "./base-page"
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql, SiFlutter } from "react-icons/si"
import { useState } from "react"
import { ChevronDown, ChevronUp, Star, BookOpen, Code, Zap } from "lucide-react"

interface TechStackPageProps {
  onBack: () => void
}

export default function TechStackPage({ onBack }: TechStackPageProps) {
  const [expandedTech, setExpandedTech] = useState<Record<string, boolean>>({})
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const toggleTech = (techName: string) => {
    setExpandedTech((prev) => ({
      ...prev,
      [techName]: !prev[techName],
    }))
  }

  const skillNodes = [
    {
      name: "REACT",
      icon: <SiReact className="w-7 h-7" />,
      category: "frontend",
      bgColor: "bg-gradient-to-br from-cyan-500/30 to-blue-600/30",
      iconColor: "text-cyan-200",
      level: 95,
      experience: "2+ years",
      projects: 8,
      description: "Advanced React development with hooks, context, and performance optimization",
      features: ["Hooks & Context", "Performance Optimization", "Component Architecture", "State Management"],
      learningPath: ["Basic Components", "Hooks Mastery", "Advanced Patterns", "Performance Tuning"],
      relatedProjects: ["E-commerce Platform", "Dashboard System", "Portfolio Website"],
    },
    {
      name: "NEXT.JS",
      icon: <SiNextdotjs className="w-7 h-7" />,
      category: "frontend",
      bgColor: "bg-gradient-to-br from-gray-800/80 to-black/80",
      iconColor: "text-white",
      level: 90,
      experience: "2+ years",
      projects: 6,
      description: "Full-stack Next.js applications with SSR, SSG, and API routes",
      features: ["App Router", "Server Components", "API Routes", "Static Generation"],
      learningPath: ["Pages Router", "App Router", "Server Actions", "Advanced Optimization"],
      relatedProjects: ["Business Website", "Blog Platform", "SaaS Application"],
    },
    {
      name: "TYPESCRIPT",
      icon: <SiTypescript className="w-7 h-7" />,
      category: "language",
      bgColor: "bg-gradient-to-br from-blue-600/30 to-blue-800/30",
      iconColor: "text-blue-200",
      level: 88,
      experience: "1.5+ years",
      projects: 10,
      description: "Type-safe development with advanced TypeScript patterns",
      features: ["Advanced Types", "Generics", "Decorators", "Type Guards"],
      learningPath: ["Basic Types", "Interfaces", "Advanced Types", "Design Patterns"],
      relatedProjects: ["All Recent Projects", "Type-safe APIs", "Component Libraries"],
    },
    {
      name: "NODE.JS",
      icon: <SiNodedotjs className="w-7 h-7" />,
      category: "backend",
      bgColor: "bg-gradient-to-br from-green-600/30 to-green-800/30",
      iconColor: "text-green-200",
      level: 85,
      experience: "2+ years",
      projects: 7,
      description: "Server-side JavaScript with Express, APIs, and microservices",
      features: ["Express.js", "RESTful APIs", "Authentication", "Database Integration"],
      learningPath: ["Basic Server", "Express Framework", "Database Integration", "Microservices"],
      relatedProjects: ["API Gateway", "Authentication Service", "Real-time Chat"],
    },
    {
      name: "POSTGRESQL",
      icon: <SiPostgresql className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-gradient-to-br from-blue-600/30 to-blue-800/30",
      iconColor: "text-blue-200",
      level: 80,
      experience: "1+ years",
      projects: 5,
      description: "Advanced SQL queries, indexing, and database optimization",
      features: ["Complex Queries", "Indexing", "Triggers", "Performance Tuning"],
      learningPath: ["Basic SQL", "Advanced Queries", "Database Design", "Optimization"],
      relatedProjects: ["E-commerce DB", "Analytics Platform", "User Management"],
    },
    {
      name: "FLUTTER",
      icon: <SiFlutter className="w-7 h-7" />,
      category: "mobile",
      bgColor: "bg-white",
      iconColor: "text-blue-400",
      level: 75,
      experience: "1+ years",
      projects: 3,
      description: "Cross-platform mobile development with Flutter and Dart",
      features: ["Cross-platform", "State Management", "Native Features", "UI/UX Design"],
      learningPath: ["Dart Basics", "Widget System", "State Management", "Platform Integration"],
      relatedProjects: ["Mobile App", "Cross-platform Tool", "UI Components"],
    },
  ]

  const categories = ["all", "frontend", "backend", "database", "mobile", "language"]
  const filteredSkills =
    selectedCategory === "all" ? skillNodes : skillNodes.filter((skill) => skill.category === selectedCategory)

  return (
    <BasePage title="TECH_STACK" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Tech Overview Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="p-2 bg-red-500/10 border border-red-500/30 text-center rounded">
            <div className="text-sm font-bold text-red-400">{skillNodes.length}</div>
            <div className="text-red-400/70 text-xs">Technologies</div>
          </div>
          <div className="p-2 bg-blue-500/10 border border-blue-500/30 text-center rounded">
            <div className="text-sm font-bold text-blue-400">
              {Math.round(skillNodes.reduce((acc, skill) => acc + skill.level, 0) / skillNodes.length)}%
            </div>
            <div className="text-blue-400/70 text-xs">Avg Level</div>
          </div>
          <div className="p-2 bg-green-500/10 border border-green-500/30 text-center rounded">
            <div className="text-sm font-bold text-green-400">
              {skillNodes.reduce((acc, skill) => acc + skill.projects, 0)}
            </div>
            <div className="text-green-400/70 text-xs">Projects</div>
          </div>
          <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 text-center rounded">
            <div className="text-sm font-bold text-yellow-400">2+</div>
            <div className="text-yellow-400/70 text-xs">Years Exp</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-red-500/20 border-red-500/50 text-red-400"
                  : "bg-zinc-800/50 border-zinc-600/50 text-zinc-400 hover:text-red-400"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Enhanced Tech Stack */}
        <div className="space-y-4">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="relative border border-red-600/30 bg-red-500/5 rounded-lg overflow-hidden">
              {/* Tech Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${skill.bgColor} rounded-lg`}>
                      <div className={skill.iconColor}>{skill.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-red-400 font-bold text-sm">{skill.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(skill.level / 20) ? "text-yellow-400 fill-current" : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-red-400/70 text-xs">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTech(skill.name)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    {expandedTech[skill.name] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-zinc-800 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center">
                    <div className="text-red-400 text-sm font-bold">{skill.experience}</div>
                    <div className="text-red-400/70 text-xs">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 text-sm font-bold">{skill.projects}</div>
                    <div className="text-red-400/70 text-xs">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 text-sm font-bold">{skill.category}</div>
                    <div className="text-red-400/70 text-xs">Category</div>
                  </div>
                </div>

                <p className="text-red-400/80 text-sm">{skill.description}</p>
              </div>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${expandedTech[skill.name] ? "max-h-96" : "max-h-0"}`}
              >
                <div className="px-4 pb-4 space-y-4 border-t border-red-600/20">
                  {/* Key Features */}
                  <div>
                    <div className="text-xs text-blue-400 mb-2 font-bold flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      KEY FEATURES
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {skill.features.map((feature, i) => (
                        <div key={i} className="text-blue-400/80 text-xs flex items-center">
                          <span className="text-blue-500 mr-1">•</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Path */}
                  <div>
                    <div className="text-xs text-yellow-400 mb-2 font-bold flex items-center">
                      <BookOpen className="w-3 h-3 mr-1" />
                      LEARNING PATH
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {skill.learningPath.map((step, i) => (
                        <div key={i} className="flex items-center gap-2 whitespace-nowrap">
                          <div className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs rounded">
                            {step}
                          </div>
                          {i < skill.learningPath.length - 1 && <span className="text-yellow-400/50">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Related Projects */}
                  <div>
                    <div className="text-xs text-green-400 mb-2 font-bold flex items-center">
                      <Code className="w-3 h-3 mr-1" />
                      RELATED PROJECTS
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {skill.relatedProjects.map((project, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded"
                        >
                          {project}
                        </span>
                      ))}
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
