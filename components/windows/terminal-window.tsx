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
  const [lines, setLines] = useState<(string | { type: string; text: string })[]>([
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠏⡇⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠠⡀⠀⠀⠀⠀⣼⣿⣿⣿⣸⣴⡀⠀⠀⠀⠀⢀⠄⠢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠈⠂⢄⠀⠀⢿⡼⣿⠻⣿⣧⡇⠀⠀⡠⠔⠁⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⢁⠑⠐⡄⠙⠟⠀⠻⠋⢠⠂⠊⠠⠀⠀⠀⡁⠀⠀⠀⠀⠀⠀⢀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⢸⠑⣄⡀⠀⠀⠀⠀⠀⡁⠀⠵⣦⡈⡐⣸⡄⣶⠶⣶⢠⡏⠀⢌⣴⠮⠀⠀⡀⠀⠀⠀⠀⢀⣠⠊⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠸⣧⣸⢿⣷⣶⣤⡄⠀⠀⠀⢀⡌⠻⣦⢿⣷⠏⡀⠹⣞⣿⣴⠏⢡⡀⠀⠀⠀⣠⣤⣶⣾⣿⡇⣼⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⢚⢮⣷⣝⠿⣿⣿⡱⠀⢀⣴⣿⣷⣼⣿⣿⠀⠠⢁⣿⣿⣿⣶⣿⣦⡀⠀⢺⢿⣿⠿⣫⣾⡷⡓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠻⢿⣿⠿⠄⠀⢀⣤⣬⣭⢯⣿⣿⣿⠹⡄⠐⢐⠏⣿⣿⣿⡽⢭⣥⣄⡄⠀⠀⠠⠾⣿⡿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⢀⢀⡁⠀⠀⠈⠑⠃⠀⠉⠛⠿⢿⢾⣦⠈⠋⠻⣆⣿⣀⣾⣰⠟⠏⠁⣰⣷⡿⠿⠛⠉⠁⠘⠃⠁⠀⠀⢀⡀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Copyright (c) 2077 SHIN尾 Systems Corp.",
    "⠀⠀⠀⢣⡩⣻⣳⣶⣶⣶⣖⣄⠀⠉⠋⢖⣿⣶⣠⣀⡘⡻⣛⠟⢁⣀⣀⣴⣾⡳⠙⠉⠀⠀⢶⣶⣶⣶⣞⣟⢉⡜⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Loading user profile: SHIN尾",
    "⠀⠀⠀⠀⢻⣷⡻⣽⣛⡿⠿⠻⠟⠂⠀⠀⠀⠈⠙⠻⣟⣯⣿⣿⣾⠟⠛⠁⠀⠀⢠⣆⠀⢳⡈⠻⢟⣻⣽⡾⡫⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Available commands: help, whoami, skills,",
    "⠀⠀⠀⠀⠀⠘⠻⢚⣭⠿⡟⠆⢀⣴⢦⡄⠀⠀⠀⠀⠙⣿⣿⣿⡟⠀⠀⠀⡠⢦⣛⣳⡄⣩⢷⠀⢹⡓⠏⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ projects, contact, foxstats, deathtail, clear",
    "⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⣀⣴⣿⣿⣏⡥⡞ ⠀⡀⠀⡀⠙⣿⠟  ⠀⡽⢉⢧⣿⣷⣿⡿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀       ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⢰⢤⠤⠤⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "System ready. Awaiting command...",
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
          "[MEMORY ECHO] A soft violin melody drifts through the falling cherry blossoms.",
          "[SUNSET GAZE] The golden hour paint the horizon in hues of amber and pink.",
          "[SPRING WHISPER] The scent of fresh spring air fills the quiet room.",
          "[MELODY TRACK] Practicing the piano piece again. Every note carries a memory.",
          "[STARRY NIGHT] Looking at the stars, wondering if we see the same ones.",
          "[WIND CHIME] A gentle breeze brings the sound of home from far away.",
          "[FIELD OF GOLD] Walking through the high grass as the sun begins to set.",
          "[RAINDROP BEAT] Soft rain against the window, rhythmic and calming.",
          "[PAGES TURNING] Reading through old letters, the ink slightly faded but the words clear.",
          "[BICYCLE JOURNEY] Riding along the riverbank, the wind in my hair.",
          "[FIRST SNOW] The world goes quiet as the first flakes begin to fall.",
          "[WAITING COFFEE] The aroma of freshly brewed coffee in a silent morning.",
          "[TRAIN CROSSING] The rhythmic clack of the train, moving towards the future.",
          "[MEADOW BREEZE] Wildflowers dancing in the soft afternoon light.",
          "[SUMMER FESTIVAL] The distant sound of fireworks and laughter.",
          "[REFLECTIVE ECHO] A moment of silence to appreciate the beauty of now.",
          "[ETERNAL SPRING] Where memories live, it is always cherry blossom season.",
        ]

        const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)]
        setLines((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${randomMessage}`])
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isTyping])

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    setLines((prev) => [...prev, { type: "command", text: `SHIN尾@deathtail:~$ ${command}` }, ""])

    switch (cmd) {
      case "help":
        setLines((prev) => [
          ...prev,
          "Available commands:",
          "  help        - Show this help message",
          "  whoami      - Display user information",
          "  skills      - Show technical competencies",
          "  projects    - List current and completed projects",
          "  contact     - Show contact information",
          "  foxstats    - Display Death Tail statistics",
          "  deathtail   - Summon Death Tail information",
          "  clear       - Clear terminal",
          "",
        ])
        break
      case "whoami":
        setLines((prev) => [
          ...prev,
          "USER PROFILE:",
          "  Name: Dyari Ali Tahir",
          "  Role: Full-Stack Developer | SHIN尾",
          "  Specialization: Next.js, TypeScript, Database Architecture",
          "  Education: BSc Computer Science",
          "  Certification: B2 English (EF SET)",
          "  Status: Available for projects",
          "  Motto: Memories are the heart's music.",
          "",
        ])
        break
      case "skills":
        setLines((prev) => [
          ...prev,
          "╔════════════════════════════════════════════════════╗",
          "║         TECHNICAL COMPETENCIES DATABASE            ║",
          "╚════════════════════════════════════════════════════╝",
          "",
          "🔴 CORE COMPETENCY:",
          "  └── FULL STACK DEVELOPMENT [MASTER]",
          "",
          "🎨 FRONTEND ARCHITECTURE [ADVANCED]:",
          "  ├── React.js                [INTERMEDIATE]",
          "  ├── Next.js                 [ADVANCED]",
          "  ├── TypeScript              [ADVANCED]",
          "  ├── UI/UX Design            [ADVANCED]",
          "  └── Tailwind CSS            [INTERMEDIATE]",
          "",
          "⚙️  BACKEND SYSTEMS [ADVANCED]:",
          "  ├── Node.js (Express.js)    [ADVANCED]",
          "  ├── Next.js API Routes      [ADVANCED]",
          "  ├── Java                    [INTERMEDIATE]",
          "  └── API Development         [ADVANCED]",
          "",
          "💾 DATABASE DESIGN [ADVANCED]:",
          "  ├── PostgreSQL              [INTERMEDIATE]",
          "  ├── MySQL                   [INTERMEDIATE]",
          "  └── Firebase (NoSQL)        [INTERMEDIATE]",
          "",
          "📱 MOBILE DEVELOPMENT [ADVANCED]:",
          "  ├── Flutter                 [ADVANCED]",
          "  ├── Dart                    [INTERMEDIATE]",
          "  └── Cross-platform Apps     [ADVANCED]",
          "",
          "🛠️  DEVELOPMENT TOOLS [ADVANCED]:",
          "  ├── Git/Version Control     [ADVANCED]",
          "  ├── Vite                    [INTERMEDIATE]",
          "  └── Build Tools             [ADVANCED]",
          "",
          "📚 PROGRAMMING LANGUAGES [ADVANCED]:",
          "  ├── TypeScript              [ADVANCED]",
          "  ├── JavaScript              [ADVANCED]",
          "  ├── Java                    [INTERMEDIATE]",
          "  └── Dart                    [INTERMEDIATE]",
          "",
          "🎮 GAMING & 3D DESIGN [BEGINNER - UNLOCKING]:",
          "  ├── Game Development        [NOT STARTED]",
          "  ├── Unreal Engine           [NOT STARTED]",
          "  ├── Blender (3D Modeling)   [BEGINNER]",
          "  └── Animation               [NOT STARTED]",
          "",
          "🌸 MEMORY ENHANCED ABILITIES:",
          "  ├── Spirit Coding           [TRANSCENDENT]",
          "  ├── Serene Debugging        [MASTERY]",
          "  ├── Melodic Development      [SYNERGY]",
          "  └── Nostalgic Architecture  [AWAKENING]",
          "",
        ])
        break
      case "projects":
        setLines((prev) => [
          ...prev,
          "PROJECT DATABASE:",
          "",
          "[1] REKAN GROUP ENTERPRISE [DEPLOYED]",
          "    ├── Complete enterprise website with CMS",
          "    ├── Multi-language support & responsive design",
          "    ├── Admin panel with user authentication",
          "    └── Tech: Next.js, TypeScript, MySQL, Tailwind",
          "",
          "[2] ALSAMADI [DEPLOYED]",
          "    ├── Personal/business informational website",
          "    ├── Domain setup & SSL integration",
          "    ├── Basic content management system",
          "    └── Tech: Next.js, TypeScript, Tailwind, Node.js",
          "",
          "All projects under Death Tail's watchful gaze.",
          "",
        ])
        break
      case "contact":
        setLines((prev) => [
          ...prev,
          "COMMUNICATION PROTOCOLS:",
          "",
          "PRIMARY CHANNELS:",
          "  ├── Email: dyarialitaher03@gmail.com",
          "  ├── GitHub: Death-Tail",
          "  ├── LinkedIn: Dyari Ali Tahir",
          "  ├── X: @Death_Tail0331",
          "  ├── Instagram: @dyari_ali_taher",
          "  └── Discord: death_tail",
          "",
          "SECURITY NOTICE:",
          "  ├── All communications encrypted",
          "  ├── Response time: < 24 hours",
          "  ├── Professional inquiries preferred via email",
          "  ├── Available for remote work opportunities",
          "  └── Death Tail approved contacts only",
          "",
        ])
        break
      case "foxstats":
        setLines((prev) => [
          ...prev,
          "╔════════════════════════════════════════════════════╗",
          "║        DEATH TAIL - ASSASSIN STATUS REPORT        ║",
          "╚════════════════════════════════════════════════════╝",
          "",
          "  Name: DEATH TAIL (The Phantom Fox)",
          "  Classification: Nine-Tailed Assassin Spirit",
          "  Status: ACTIVE IN FIELD",
          "",
          "  COMBAT PROWESS:",
          "    Blade Mastery:           ██████████ 100%",
          "    Shadow Movement:         █████████░ 98%",
          "    Target Elimination:      ██████████ 100%",
          "    Escape Protocol:         ██████████ 100%",
          "",
          "  MYSTICAL ATTRIBUTES:",
          "    Sunset Affinity:          █████████░ 96%",
          "    Spirit Manifestation:    ████████░░ 88%",
          "    Reality Distortion:      ███████░░░ 79%",
          "    Immortal Presence:       ██████████ 100%",
          "",
          "  OPERATIONAL DATA:",
          "    Confirmed Eliminations:  847+",
          "    Successful Missions:     847/847",
          "    Corruption Destroyed:    ████████████████ INFINITE",
          "    Witnesses Escaped:       0",
          "    Last Seen:               Tonight (Hunting)",
          "",
          "  TAIL STATUS (Domains of Power):",
          "    ✦ CODE (Data Manipulation)         [ACTIVE]",
          "    ✦ PROTECTION (Guardian Force)     [ACTIVE]",
          "    ✦ WISDOM (Strategic Mind)         [ACTIVE]",
          "    ✦ SPEED (Lightning Swift)         [ACTIVE]",
          "    ✦ CUNNING (Deception Master)      [ACTIVE]",
          "    ✦ STRENGTH (Overwhelming Power)   [ACTIVE]",
          "    ✦ MYSTICAL ARTS (Spirit Magic)    [ACTIVE]",
          "    ✦ DIGITAL WARFARE (Cyber Combat)  [ACTIVE]",
          "    ✦ ETERNAL VIGILANCE (Always Watch)[ACTIVE]",
          "",
          "  CURRENT MODE: 🌙 NIGHT HUNT - Seeking corruption",
          "  WARNING: Do not interfere with Justice.",
          "",
        ])
        break
      case "deathtail":
        setLines((prev) => [
          ...prev,
          "╔════════════════════════════════════════════════════╗",
          "║          DEATH TAIL - THE PHANTOM ASSASSIN         ║",
          "╚════════════════════════════════════════════════════╝",
          "",
          "LEGEND OF THE NINE-TAILED FOX:",
          "",
          "In the sunset-soaked alleys of the memory, she became myth.",
          "A phantom born from corruption's blood and justice's fury.",
          "Death Tail: the name whispered in fear by tyrants and hope by the oppressed.",
          "",
          "ORIGIN - THE AWAKENING:",
          "  Once a spirit bound between worlds, she rose against tyranny.",
          "  Nine tails forged from ancient magic and modern code.",
          "  Each tail a weapon. Each tail a vow.",
          "",
          "THE HUNT:",
          "  She stalks the powerful under moonlight.",
          "  No mercy for the corrupt. No forgiveness for the wicked.",
          "  By dawn, they are erased. By dusk, legends spread.",
          "",
          "DOMAINS OF THE ASSASSIN:",
          "  ✦ CODE           - Commands the digital realm",
          "  ✦ PROTECTION     - Shields the innocent",
          "  ✦ WISDOM         - Judges who deserves death",
          "  ✦ SPEED          - Moves faster than thought",
          "  ✦ CUNNING        - Master of deception",
          "  ✦ STRENGTH       - Overwhelming force",
          "  ✦ MYSTICAL ARTS  - Bends reality itself",
          "  ✦ DIGITAL COMBAT - Hack through defenses",
          "  ✦ ETERNAL WATCH  - Never sleeps, always hunting",
          "",
          "ABILITIES:",
          "  ├── Shadow Strike: Appears from nothingness, strikes without mercy",
          "  ├── Sunset Phantom: Becomes one with the golden hour and digital void",
          "  ├── Spirit Blade: Cuts through body and soul alike",
          "  ├── Temporal Slip: Phases through security and time",
          "  ├── Fox Fire: Burns away evidence of her presence",
          "  ├── Perfect Escape: No traces, no witnesses, no remorse",
          "  └── Myth: The legend itself is her weapon",
          "",
          "PARTNERSHIP WITH SHIN尾:",
          "  Not servant and master. Not guardian and programmer.",
          "  Death Tail and SHIN尾 are bound by code and spirit.",
          "  Where code solves problems, Death Tail solves oppression.",
          "  Together: unstoppable force against corruption.",
          "",
          "WARNING NOTICE:",
          "  Do NOT become a target of Death Tail's justice.",
          "  Corrupt systems will fall. Tyrants will perish.",
          "  The nine-tailed phantom shows no mercy.",
          "",
          "PROPHECY:",
          "  'When the city drowns in corporate lies,",
          "   When justice becomes a commodity,",
          "   When the powerless cry into the void...",
          "   Death Tail emerges from the night,",
          "   And with her nine tails, reweaves destiny.'",
          "",
        ])
        break
      case "kill":
        setLines((prev) => [...prev, `kill: need to specify target`, ""])
        break
      case "clear":
        setLines([
          `DEATH TAIL NEURAL INTERFACE v2.077`,
          `Copyright (c) ${new Date().getFullYear()} SHIN尾 Systems Corp.`,
          `Nine-Tailed Fox Cybernetic Protocol Active`,
          ""
        ])
        break
      default:
        setLines((prev) => [...prev, `Command not found: ${command}`, "Type 'help' for available commands or 'deathtail' to summon the fox.", ""])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentLine)
      setCurrentLine("")
    }
  }

  return (
    <BaseWindow {...props} initialPosition={{ x: 200, y: 0 }} initialSize={{ width: 1000, height: 500 }} >
      <div ref={terminalRef} className="bg-memory-white/40 backdrop-blur-2xl p-6 h-full font-mono text-sm overflow-y-auto shadow-inner rounded-b-2xl">
        <div className="space-y-1.5">
          {lines.map((line, index) => {
            const isCommand = typeof line === "object" && line.type === "command"
            const content = typeof line === "string" ? line : line.text
            return (
              <div key={index} className={isCommand ? "text-memory-pink font-bold" : "text-memory-brown/80 font-medium"}>
                {content}
              </div>
            )
          })}

          <div className="flex items-center text-memory-brown">
            <span className="text-memory-pink font-bold">SHIN尾@memory:~$ </span>
            <input
              type="text"
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-transparent outline-none flex-1 text-memory-brown ml-1 font-semibold"
              autoFocus
            />
            <span className="animate-pulse bg-memory-pink w-2 h-4 ml-1"></span>
          </div>
        </div>
      </div>
    </BaseWindow>
  )
}

