"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { BaseWindow } from "./base-window"

interface TerminalWindowProps {
  id: string
  title: string
  isActive: boolean
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
}

export function TerminalWindow(props: TerminalWindowProps) {
  const [lines, setLines] = useState([
    "CYBERPUNK TERMINAL v2.077",
    "Copyright (c) 2077 Lingreed Systems Corp.",
    "",
    "Initializing neural interface...",
    "Loading user profile: LINGREED",
    "Status: ONLINE | Security Level: MAXIMUM",
    "",
    "Available commands: help, whoami, skills, projects, experience, contact, clear",
    "",
  ])

  const [currentLine, setCurrentLine] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && !isTyping) {
        const systemMessages = [
          "System scan complete. No threats detected.",
          "Neural link stable. Bandwidth: 2.1 GB/s",
          "Incoming data packet from client mainframe...",
          "Firewall status: ACTIVE | Intrusion attempts: 0",
          "Memory usage: 45% of 32GB | CPU: 38°C - OPTIMAL",
          "Database connections: PostgreSQL [ACTIVE] | MySQL [STANDBY]",
          "TypeScript compiler: v5.2.2 [READY]",
          "Next.js dev server: localhost:3000 [LISTENING]",
        ]

        const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)]
        setLines((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${randomMessage}`])
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isTyping])

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    setLines((prev) => [...prev, `lingreed@cyberpunk:~$ ${command}`, ""])

    switch (cmd) {
      case "help":
        setLines((prev) => [
          ...prev,
          "Available commands:",
          "  help        - Show this help message",
          "  whoami      - Display user information",
          "  skills      - Show technical competencies",
          "  projects    - List current and completed projects",
          "  experience  - Display work experience",
          "  contact     - Show contact information",
          "  clear       - Clear terminal",
          "",
        ])
        break
      case "whoami":
        setLines((prev) => [
          ...prev,
          "USER PROFILE:",
          "  Name: Lingreed",
          "  Role: Full-Stack Developer",
          "  Specialization: Next.js, TypeScript, Database Architecture",
          "  Education: BSc Computer Science",
          "  Certification: B2 English (EF SET)",
          "  Status: Available for projects",
          "",
        ])
        break
      case "skills":
        setLines((prev) => [
          ...prev,
          "TECHNICAL COMPETENCIES:",
          "",
          "Frontend Architecture [INTERMEDIATE]:",
          "  ├── React.js         [INTERMEDIATE]",
          "  ├── Next.js          [INTERMEDIATE]",
          "  ├── TypeScript       [ADVANCED]",
          "  └── Tailwind CSS     [INTERMEDIATE]",
          "",
          "Backend Systems [INTERMEDIATE]:",
          "  ├── Node.js          [ADVANCED]",
          "  ├── Java             [INTERMEDIATE]",
          "  └── API Development  [INTERMEDIATE]",
          "",
          "Database Design [INTERMEDIATE]:",
          "  ├── PostgreSQL       [INTERMEDIATE]",
          "  ├── MySQL            [INTERMEDIATE]",
          "  └── Firebase         [INTERMEDIATE]",
          "",
          "Development Ecosystem [INTERMEDIATE]:",
          "  ├── Git/Version Control [ADVANCED]",
          "  ├── Flutter          [INTERMEDIATE]",
          "  └── Vite             [INTERMEDIATE]",
          "",
        ])
        break
      case "projects":
        setLines((prev) => [
          ...prev,
          "PROJECT DATABASE:",
          "",
          "[1] REKAN GROUP ENTERPRISE [DEPLOYED]",
          "    ├── Complete enterprise website with dashboard",
          "    ├── Multi-language support & responsive design",
          "    ├── Admin panel with user authentication",
          "    └── Tech: Next.js, TypeScript, MySQL, Tailwind",
          "",
          "[2] CYBERPUNK PORTFOLIO [ACTIVE]",
          "    ├── Desktop OS simulation with window management",
          "    ├── Cyberpunk 2077 inspired design system",
          "    ├── Interactive terminal with real commands",
          "    └── Tech: Next.js, TypeScript, Tailwind CSS",
          "",
          "[3] DATABASE ARCHITECTURE [ONGOING]",
          "    ├── Advanced database design & optimization",
          "    ├── SQL/NoSQL hybrid solutions",
          "    ├── Performance optimization strategies",
          "    └── Tech: PostgreSQL, MySQL, Node.js",
          "",
        ])
        break
      case "experience":
        setLines((prev) => [
          ...prev,
          "WORK EXPERIENCE:",
          "",
          "REKAN GROUP - Full-Stack Developer",
          "  ├── Designed & built complete enterprise website",
          "  ├── Developed integrated dashboard system",
          "  ├── Implemented multi-language support",
          "  ├── Created secure admin authentication",
          "  └── Managed production deployment",
          "",
          "CORE COMPETENCIES:",
          "  ├── Frontend Architecture: React ecosystem, State management",
          "  ├── Backend Systems: Server-side development & infrastructure",
          "  ├── Database Design: SQL/NoSQL solutions",
          "  └── Development Ecosystem: Tooling & workflow optimization",
          "",
        ])
        break
      case "contact":
        setLines((prev) => [
          ...prev,
          "COMMUNICATION PROTOCOLS:",
          "",
          "PRIMARY CHANNELS:",
          "  ├── Email: contact@lingreed.dev",
          "  ├── GitHub: github.com/lingreed",
          "  ├── LinkedIn: linkedin.com/in/lingreed",
          "  └── Discord: lingreed#0000",
          "",
          "SECURITY NOTICE:",
          "  ├── All communications encrypted",
          "  ├── Response time: < 24 hours",
          "  ├── Professional inquiries preferred via email",
          "  └── Available for remote work opportunities",
          "",
        ])
        break
      case "clear":
        setLines(["CYBERPUNK TERMINAL v2.077", "Copyright (c) 2077 Lingreed Systems Corp.", ""])
        break
      default:
        setLines((prev) => [...prev, `Command not found: ${command}`, "Type 'help' for available commands.", ""])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentLine)
      setCurrentLine("")
    }
  }

  return (
    <BaseWindow {...props} initialPosition={{ x: 300, y: 200 }} initialSize={{ width: 700, height: 500 }}>
      <div ref={terminalRef} className="bg-black p-4 h-full font-mono text-sm overflow-y-auto">
        <div className="space-y-1">
          {lines.map((line, index) => (
            <div key={index} className="text-green-400">
              {line}
            </div>
          ))}

          <div className="flex items-center text-green-400">
            <span className="text-red-400">lingreed@cyberpunk:~$ </span>
            <input
              type="text"
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-transparent outline-none flex-1 text-green-400 ml-1"
              autoFocus
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </BaseWindow>
  )
}
