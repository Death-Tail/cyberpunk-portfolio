"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Code, Database, Server, Globe, Layers } from "lucide-react"

interface TechItem {
  name: string
  category: string
  level: number
  icon: React.ReactNode
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const techItems: TechItem[] = [
    { name: "REACT", category: "frontend", level: 90, icon: <Code /> },
    { name: "NEXT.JS", category: "frontend", level: 85, icon: <Globe /> },
    { name: "NODE.JS", category: "backend", level: 85, icon: <Server /> },
    { name: "PYTHON", category: "backend", level: 75, icon: <Code /> },
    { name: "POSTGRESQL", category: "database", level: 80, icon: <Database /> },
    { name: "DOCKER", category: "devops", level: 65, icon: <Layers /> },
  ]

  const categories = [
    { id: "all", name: "ALL" },
    { id: "frontend", name: "FRONT" },
    { id: "backend", name: "BACK" },
    { id: "database", name: "DB" },
    { id: "devops", name: "OPS" },
  ]

  const filteredItems =
    activeCategory === "all" ? techItems : techItems.filter((item) => item.category === activeCategory)

  return (
    <div className="flex-1 flex flex-col">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-1 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-2 py-1 text-xs border transition-colors",
              activeCategory === category.id
                ? "border-orange-600 text-orange-500 bg-orange-600/10"
                : "border-orange-600/30 text-orange-500/70 hover:border-orange-600 hover:text-orange-500",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Tech Items */}
      <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto pr-1">
        {filteredItems.map((item, index) => (
          <div key={index} className="border border-orange-600/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-orange-600/10 border border-orange-600/30">
                <div className="text-orange-500" style={{ fontSize: "12px" }}>
                  {item.icon}
                </div>
              </div>
              <h3 className="text-orange-500 text-xs">{item.name}</h3>
            </div>

            <div className="h-1 bg-zinc-800 overflow-hidden mb-1">
              <div className="h-full bg-orange-600" style={{ width: `${item.level}%` }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-orange-500/50 text-xs">LEVEL</span>
              <span className="text-orange-500 text-xs">{item.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
