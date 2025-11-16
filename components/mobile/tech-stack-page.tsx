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
      bgColor: "bg-linear-to-br from-cyan-500/30 to-blue-600/30",
      iconColor: "text-cyan-200",
      experience: "1+ years",
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
      bgColor: "bg-linear-to-br from-gray-800/80 to-black/80",
      iconColor: "text-white",
      experience: "1+ years",
      projects: 3,
      description: "Full-stack Next.js applications with SSR, SSG, and API routes",
      features: ["App Router", "Server Components", "API Routes", "Static Generation"],
      relatedProjects: ["RekanGroup Website", "Alsamadi website"],
    },
    {
      name: "TYPESCRIPT",
      icon: <SiTypescript className="w-7 h-7" />,
      category: "language",
      bgColor: "bg-linear-to-br from-blue-600/30 to-blue-800/30",
      iconColor: "text-blue-200",
      experience: "1+ years",
      projects: 3,
      description: "Type-safe development with advanced TypeScript patterns",
      features: ["Advanced Types", "Generics", "Decorators", "Type Guards"],
      relatedProjects: ["RekanGroup Website", "Alsamadi website"],
    },
    {
      name: "JAVA",
      icon: <DiJava className="w-7 h-7" />,
      category: "language",
      bgColor: "bg-linear-to-br from-red-600/30 to-yellow-600/30",
      iconColor: "text-yellow-200",
      experience: "6+ Months",
      projects: 0,
      description: "Object-oriented programming and backend development with Java",
      features: ["OOP Principles", "JVM Internals", "Spring Framework", "Concurrency"],
      relatedProjects: [],
    },
    {
      name: "DART",
      icon: <SiDart className="w-7 h-7" />,
      category: "language",
      bgColor: "bg-linear-to-br from-blue-600/30 to-blue-800/30",
      iconColor: "text-blue-200",
      experience: "2 years",
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
      experience: "1+ years",
      projects: 3,
      description: "Server-side JavaScript with Express, APIs, and microservices",
      features: ["Express.js", "RESTful APIs", "Authentication", "Database Integration"],
      relatedProjects: ["Rekangroup Website", "Alsamadi website"],
    },
    {
      name: "Next.js API Routes",
      icon: <SiNextdotjs className="w-7 h-7" />,
      category: "backend",
      bgColor: "bg-linear-to-br from-gray-800/80 to-black/80",
      iconColor: "text-white",
      experience: "1+ years",
      projects: 1,
      description: "Building backend functionality using Next.js API routes",
      features: ["API Routes", "Serverless Functions", "Middleware", "Data Handling", "Authentication"],
      relatedProjects: ["RekanGroup Website"],
    },
    {
      name: "POSTGRESQL",
      icon: <SiPostgresql className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-linear-to-br from-blue-600/30 to-blue-800/30",
      iconColor: "text-blue-200",
      experience: "1+ years",
      projects: 1,
      description: "Advanced SQL queries, indexing, and database optimization",
      features: ["Complex Queries", "Indexing", "Triggers", "Performance Tuning"],
      relatedProjects: ["Rekangroup Website"],
    },
    {
      name: "MYSQL",
      icon: <SiMysql className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-linear-to-br from-blue-600/30 to-blue-800/30",
      iconColor: "text-blue-200",
      experience: "4+ years",
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
      experience: "1 years",
      projects: 0,
      description: "Realtime database, authentication, and cloud functions with Firebase",
      features: ["Realtime Database", "Authentication", "Cloud Functions"],
      relatedProjects: [],
    },
    {
      name: "FLUTTER",
      icon: <SiFlutter className="w-7 h-7" />,
      category: "mobile",
      bgColor: "bg-white",
      iconColor: "text-blue-400",
      experience: "2 years",
      projects: 1,
      description: "Cross-platform mobile development with Flutter and Dart",
      features: ["Cross-platform", "State Management", "Native Features", "UI/UX Design"],
      relatedProjects: ["Bored? App"],
    },
    {
      name: "GIT",
      icon: <SiGit className="w-7 h-7" />,
      category: "Tools",
      bgColor: "bg-black",
      iconColor: "text-white",
      experience: "4+ years",
      projects: 3,
      description: "Version control and collaboration using Git and GitHub",
      features: ["Branching", "Merging", "Pull Requests", "Collaboration"],
      relatedProjects: ["All Projects"],
    }
  ]

  const categories = ["all", "frontend", "backend", "database", "mobile", "language", "Tools"]
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
          <div className="text-sm font-bold text-blue-400">2+Years</div>
            <div className="text-blue-400/70 text-xs">Experience</div>
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

                    </div>
                  </div>
                  <button
                    onClick={() => toggleTech(skill.name)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    {expandedTech[skill.name] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
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
