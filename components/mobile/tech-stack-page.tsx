"use client"

import BasePage from "./base-page"
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql, SiFlutter, SiMysql, SiFirebase, SiDart, SiGit } from "react-icons/si"
import { useState } from "react"
import { ChevronDown, ChevronUp, Star, BookOpen, Code, Zap } from "lucide-react"
import { DiJava } from "react-icons/di"

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
      bgColor: "bg-linear-to-br from-cyan-500/30 to-neutral-600/30",
      iconColor: "text-cyan-200",
      projects: 3,
      description: "Advanced React development with hooks, context, and performance optimization",
      features: ["Hooks & Context", "Performance Optimization", "Component Architecture", "State Management"],
      learningPath: ["Basic Components", "Hooks Mastery", "Advanced Patterns", "Performance Tuning"],
      relatedProjects: ["RekanGroup Website", "Alsamadi website"],
    },
    {
      name: "NEXT.JS",
      icon: <SiNextdotjs className="w-7 h-7" />,
      category: "frontend",
      bgColor: "bg-linear-to-br from-neutral-800/80 to-black/80",
      iconColor: "text-white",
      projects: 3,
      description: "Full-stack Next.js applications with SSR, SSG, and API routes",
      features: ["App Router", "Server Components", "API Routes", "Static Generation"],
      relatedProjects: ["RekanGroup Website", "Alsamadi website"],
    },
    {
      name: "TYPESCRIPT",
      icon: <SiTypescript className="w-7 h-7" />,
      category: "language",
      bgColor: "bg-linear-to-br from-neutral-600/30 to-neutral-800/30",
      iconColor: "text-neutral-200",
      projects: 3,
      description: "Type-safe development with advanced TypeScript patterns",
      features: ["Advanced Types", "Generics", "Decorators", "Type Guards"],
      relatedProjects: ["RekanGroup Website", "Alsamadi website"],
    },
    {
      name: "JAVA",
      icon: <DiJava className="w-7 h-7" />,
      category: "language",
      bgColor: "bg-linear-to-br from-neutral-600/30 to-yellow-600/30",
      iconColor: "text-yellow-200",
      projects: 0,
      description: "Object-oriented programming and backend development with Java",
      features: ["OOP Principles", "JVM Internals", "Spring Framework", "Concurrency"],
      relatedProjects: [],
    },
    {
      name: "DART",
      icon: <SiDart className="w-7 h-7" />,
      category: "language",
      bgColor: "bg-linear-to-br from-neutral-600/30 to-neutral-800/30",
      iconColor: "text-neutral-200",
      projects: 1,
      description: "Modern programming with Dart for Flutter and mobile applications",
      features: ["Null Safety", "Asynchronous Programming", "Mixins", "Generics"],
      relatedProjects: ["Bored? App"],

    },
    {
      name: "NODE.JS (Express.js)",
      icon: <SiNodedotjs className="w-7 h-7" />,
      category: "backend",
      bgColor: "bg-linear-to-br from-green-600/30 to-green-800/30",
      iconColor: "text-green-200",
      projects: 3,
      description: "Server-side JavaScript with Express, APIs, and microservices",
      features: ["Express.js", "RESTful APIs", "Authentication", "Database Integration"],
      relatedProjects: ["Rekangroup Website", "Alsamadi website"],
    },
    {
      name: "Next.js API Routes",
      icon: <SiNextdotjs className="w-7 h-7" />,
      category: "backend",
      bgColor: "bg-linear-to-br from-neutral-800/80 to-black/80",
      iconColor: "text-white",
      projects: 1,
      description: "Building backend functionality using Next.js API routes",
      features: ["API Routes", "Serverless Functions", "Middleware", "Data Handling", "Authentication"],
      relatedProjects: ["RekanGroup Website"],
    },
    {
      name: "POSTGRESQL",
      icon: <SiPostgresql className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-linear-to-br from-neutral-600/30 to-neutral-800/30",
      iconColor: "text-neutral-200",
      projects: 1,
      description: "Advanced SQL queries, indexing, and database optimization",
      features: ["Complex Queries", "Indexing", "Triggers", "Performance Tuning"],
      relatedProjects: ["Rekangroup Website"],
    },
    {
      name: "MYSQL",
      icon: <SiMysql className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-linear-to-br from-neutral-600/30 to-neutral-800/30",
      iconColor: "text-neutral-200",
      projects: 1,
      description: "Advanced SQL queries, indexing, and database optimization",
      features: ["Complex Queries", "Indexing", "Triggers", "Performance Tuning"],
      relatedProjects: ["Rekangroup Website"],
    },
    {
      name: "FIREBASE",
      icon: <SiFirebase className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-linear-to-br from-yellow-400/30 to-yellow-600/30",
      iconColor: "text-yellow-200",
      projects: 0,
      description: "Realtime database, authentication, and cloud functions with Firebase",
      features: ["Realtime Database", "Authentication", "Cloud Functions"],
      relatedProjects: [],
    },
    {
      name: "FLUTTER",
      icon: <SiFlutter className="w-7 h-7" />,
      category: "frontend",
      bgColor: "bg-white",
      iconColor: "text-neutral-400",
      projects: 1,
      description: "Cross-platform mobile development with Flutter and Dart",
      features: ["Cross-platform", "State Management", "Native Features", "UI/UX Design"],
      relatedProjects: [],
    },
    {
      name: "GIT",
      icon: <SiGit className="w-7 h-7" />,
      category: "Tools",
      bgColor: "bg-black",
      iconColor: "text-white",
      projects: 3,
      description: "Version control and collaboration using Git and GitHub",
      features: ["Branching", "Merging", "Pull Requests", "Collaboration"],
      relatedProjects: ["All Projects"],
    }
  ]

  const categories = ["all", "frontend", "backend", "database", "language", "Tools"]
  const filteredSkills =
    selectedCategory === "all" ? skillNodes : skillNodes.filter((skill) => skill.category === selectedCategory)

  return (
    <BasePage title="TECH_STACK" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Tech Overview Stats */}
        {/* Keeping the overall stats for context, but the individual skill stats below are changed */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="p-2 bg-neutral-500/10 border border-neutral-500/30 text-center rounded">
            <div className="text-sm font-bold text-neutral-400">{skillNodes.length}</div>
            <div className="text-neutral-400/70 text-xs">Technologies</div>
          </div>
          <div className="p-2 bg-neutral-500/10 border border-neutral-500/30 text-center rounded">
          <div className="text-sm font-bold text-neutral-400">2+Years</div>
            <div className="text-neutral-400/70 text-xs">Experience</div>
          </div>
          <div className="p-2 bg-green-500/10 border border-green-500/30 text-center rounded">
            <div className="text-sm font-bold text-green-400">
              4
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
              className={`px-3 py-1 text-xs rounded-full  transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-neutral-500/20 text-white"
                  : "bg-zinc-800/50 text-zinc-400 hover:text-neutral-400"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Enhanced Tech Stack */}
        <div className="space-y-4">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="relative border border-neutral-600/30 bg-neutral-500/5 rounded-lg overflow-hidden">
              {/* Tech Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${skill.bgColor} rounded-lg`}>
                      <div className={skill.iconColor}>{skill.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">{skill.name}</h3>

                    </div>
                  </div>
                  <button
                    onClick={() => toggleTech(skill.name)}
                    className="p-2 text-neutral-400 hover:text-neutral-300 transition-colors"
                  >
                    {expandedTech[skill.name] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Quick Stats - ADJUSTED GRID (2 columns) */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center">
                    <div className="text-neutral-400 text-sm font-bold">{skill.projects}</div>
                    <div className="text-neutral-400/70 text-xs">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-neutral-400 text-sm font-bold">{skill.category}</div>
                    <div className="text-neutral-400/70 text-xs">Category</div>
                  </div>
                  {/* Removed the third stat column */}
                </div>

                <p className="text-white text-sm">{skill.description}</p>
              </div>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${expandedTech[skill.name] ? "max-h-96" : "max-h-0"}`}
              >
                <div className="px-4 pb-4 pt-4 space-y-4 border-t border-neutral-600/20">
                  {/* Key Features */}
                  <div>
                    <div className="text-xs text-neutral-400 mb-2font-bold flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      KEY FEATURES
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {skill.features.map((feature, i) => (
                        <div key={i} className="text-neutral-400/80 text-xs flex items-center">
                          <span className="text-neutral-500 mr-1">•</span>
                          {feature}
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
