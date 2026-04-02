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
      bgColor: "bg-linear-to-br from-orange-100 to-rose-100",
      iconColor: "text-orange-600",
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
      bgColor: "bg-linear-to-br from-stone-900 to-stone-800",
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
      bgColor: "bg-linear-to-br from-stone-100 to-stone-50",
      iconColor: "text-stone-950",
      projects: 3,
      description: "Type-safe development with advanced TypeScript patterns",
      features: ["Advanced Types", "Generics", "Decorators", "Type Guards"],
      relatedProjects: ["RekanGroup Website", "Alsamadi website"],
    },
    {
      name: "JAVA",
      icon: <DiJava className="w-7 h-7" />,
      category: "language",
      bgColor: "bg-linear-to-br from-amber-100 to-orange-100",
      iconColor: "text-amber-700",
      projects: 0,
      description: "Object-oriented programming and backend development with Java",
      features: ["OOP Principles", "JVM Internals", "Spring Framework", "Concurrency"],
      relatedProjects: [],
    },
    {
      name: "DART",
      icon: <SiDart className="w-7 h-7" />,
      category: "language",
      bgColor: "bg-linear-to-br from-stone-100 to-stone-50",
      iconColor: "text-stone-950",
      projects: 1,
      description: "Modern programming with Dart for Flutter and mobile applications",
      features: ["Null Safety", "Asynchronous Programming", "Mixins", "Generics"],
      relatedProjects: ["Bored? App"],

    },
    {
      name: "NODE.JS",
      icon: <SiNodedotjs className="w-7 h-7" />,
      category: "backend",
      bgColor: "bg-linear-to-br from-stone-100 to-stone-50",
      iconColor: "text-stone-950",
      projects: 3,
      description: "Server-side JavaScript with Express, APIs, and microservices",
      features: ["Express.js", "RESTful APIs", "Authentication", "Database Integration"],
      relatedProjects: ["Rekangroup Website", "Alsamadi website"],
    },
    {
      name: "API ROUTES",
      icon: <SiNextdotjs className="w-7 h-7" />,
      category: "backend",
      bgColor: "bg-linear-to-br from-stone-900 to-stone-800",
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
      bgColor: "bg-linear-to-br from-stone-100 to-stone-50",
      iconColor: "text-stone-950",
      projects: 1,
      description: "Advanced SQL queries, indexing, and database optimization",
      features: ["Complex Queries", "Indexing", "Triggers", "Performance Tuning"],
      relatedProjects: ["Rekangroup Website"],
    },
    {
      name: "MYSQL",
      icon: <SiMysql className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-linear-to-br from-stone-100 to-stone-50",
      iconColor: "text-stone-950",
      projects: 1,
      description: "Advanced SQL queries, indexing, and database optimization",
      features: ["Complex Queries", "Indexing", "Triggers", "Performance Tuning"],
      relatedProjects: ["Rekangroup Website"],
    },
    {
      name: "FIREBASE",
      icon: <SiFirebase className="w-7 h-7" />,
      category: "database",
      bgColor: "bg-linear-to-br from-amber-100 to-orange-100",
      iconColor: "text-orange-600",
      projects: 0,
      description: "Realtime database, authentication, and cloud functions with Firebase",
      features: ["Realtime Database", "Authentication", "Cloud Functions"],
      relatedProjects: [],
    },
    {
      name: "FLUTTER",
      icon: <SiFlutter className="w-7 h-7" />,
      category: "frontend",
      bgColor: "bg-linear-to-br from-orange-50 to-rose-50",
      iconColor: "text-stone-950",
      projects: 1,
      description: "Cross-platform mobile development with Flutter and Dart",
      features: ["Cross-platform", "State Management", "Native Features", "UI/UX Design"],
      relatedProjects: [],
    },
    {
      name: "GIT",
      icon: <SiGit className="w-7 h-7" />,
      category: "Tools",
      bgColor: "bg-linear-to-br from-stone-100 to-stone-50",
      iconColor: "text-stone-950",
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
    <BasePage title="ARCHIVES" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Tech Overview Stats */}
        {/* Keeping the overall stats for context, but the individual skill stats below are changed */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          <div className="p-3 bg-white/40 border border-white/60 text-center rounded-2xl shadow-sm ring-1 ring-white/40">
            <div className="text-base font-black text-stone-950">{skillNodes.length}</div>
            <div className="text-stone-950/40 font-black text-[9px] uppercase tracking-widest">Total</div>
          </div>
          <div className="p-3 bg-white/40 border border-white/60 text-center rounded-2xl shadow-sm ring-1 ring-white/40">
            <div className="text-base font-black text-stone-950">2+Y</div>
            <div className="text-stone-950/40 font-black text-[9px] uppercase tracking-widest">Exp</div>
          </div>
          <div className="p-3 bg-white/40 border border-white/60 text-center rounded-2xl shadow-sm ring-1 ring-white/40">
            <div className="text-base font-black text-stone-950">4</div>
            <div className="text-stone-950/40 font-black text-[9px] uppercase tracking-widest">Shipped</div>
          </div>
          <div className="p-3 bg-white/40 border border-white/60 text-center rounded-2xl shadow-sm ring-1 ring-white/40">
            <div className="text-base font-black text-stone-950">HQ</div>
            <div className="text-stone-950/40 font-black text-[9px] uppercase tracking-widest">Qual</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-[10px] font-black rounded-full transition-all whitespace-nowrap shadow-sm uppercase tracking-widest ${selectedCategory === category
                ? "bg-stone-950 text-white border border-stone-950"
                : "bg-white/60 text-stone-500 border border-white/80 hover:text-stone-950"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Enhanced Tech Stack */}
        <div className="space-y-4">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="relative border border-white/60 bg-white/40 rounded-4xl overflow-hidden backdrop-blur-3xl shadow-xl ring-1 ring-white/60 group">
              {/* Tech Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${skill.bgColor} rounded-lg`}>
                      <div className={skill.iconColor}>{skill.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-stone-950 font-black text-base tracking-tighter uppercase">{skill.name}</h3>
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
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-white/20 rounded-xl ring-1 ring-white/20">
                    <div className="text-stone-950 text-base font-black">{skill.projects}</div>
                    <div className="text-stone-950/40 font-black text-[9px] uppercase tracking-widest">Projects</div>
                  </div>
                  <div className="text-center p-2 bg-white/20 rounded-xl ring-1 ring-white/20">
                    <div className="text-stone-950 text-[10px] font-black uppercase tracking-tight">{skill.category}</div>
                    <div className="text-stone-950/40 font-black text-[9px] uppercase tracking-widest">Category</div>
                  </div>
                </div>

                <p className="text-stone-800 text-sm font-bold leading-relaxed">{skill.description}</p>
              </div>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${expandedTech[skill.name] ? "max-h-96" : "max-h-0"}`}
              >
                <div className="px-4 pb-4 pt-4 space-y-4 border-t border-neutral-600/20">
                  {/* Key Features */}
                  <div>
                    <div className="text-[10px] text-stone-950/40 mb-3 font-black flex items-center tracking-widest uppercase">
                      <Zap className="w-3.5 h-3.5 mr-2 text-orange-400" />
                      Capabilities
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {skill.features.map((feature, i) => (
                        <div key={i} className="text-stone-950 text-xs font-black flex items-center bg-white/40 p-2 rounded-lg ring-1 ring-white/20">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 shadow-[0_0_5px_rgba(251,146,60,0.5)]" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Related Projects */}
                  <div>
                    <div className="text-[10px] text-stone-950/40 mb-3 font-black flex items-center tracking-widest uppercase">
                      <Code className="w-3.5 h-3.5 mr-2 text-amber-500" />
                      Archived Context
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.relatedProjects.map((project, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white border border-stone-200 text-stone-950 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm"
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
