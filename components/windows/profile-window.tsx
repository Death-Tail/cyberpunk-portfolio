import Image from "next/image"
import { BaseWindow } from "./base-window"
import { GlitchText } from "../glitch-text"
import { Award, MapPin, Zap, Shield, Target, Send } from "lucide-react"

interface ProfileWindowProps {
  id: string
  title: string
  isActive: boolean
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
}

export function ProfileWindow(props: ProfileWindowProps) {
  return (
    <BaseWindow {...props} initialPosition={{ x: 100, y: 80 }} initialSize={{ width: 550, height: 650 }}>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="border-l-2 border-red-600 pl-4">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-yellow-500 mr-2"></div>
            <span className="text-red-500 text-xs tracking-wider">USER_PROFILE</span>
          </div>

          <div className="flex items-start space-x-4">
            <div className="relative" style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
              }}>
              <Image
                src="/pfp.avif?height=120&width=120"
                alt="Profile"
                width={120}
                height={120}

                className="border border-red-600/50 bg-zinc-800"
              />
            </div>

            <div>
              <GlitchText
                text="Dyari Ali Tahir"
                className="text-xl font-bold mb-2"
                glitchColors={["#dc2626", "#eab308", "#3b82f6"]}
              />
              <div className="text-red-400 text-sm mb-2">FULL_STACK_DEVELOPER</div>
              <div className="text-red-500/70 text-xs mb-2">
                STATUS: <span className="text-yellow-400">ONLINE</span>
              </div>
              <div className="flex items-center text-blue-400 text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                <span>REMOTE_OPERATIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="border-l-2 border-yellow-500 pl-4">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-yellow-500 mr-2"></div>
            <span className="text-yellow-400 text-xs tracking-wider">NEURAL_PROFILE</span>
          </div>

          <div className="text-red-400/80 text-sm space-y-2">
            <p>
              <span className="text-yellow-500">&gt;</span> Full-stack developer specializing in Next.js ecosystem and
              modern web architecture. Expert in building scalable applications with TypeScript and advanced database
              systems.
            </p>
            <p>
              <span className="text-blue-500">&gt;</span> Proven track record in enterprise-level projects, including
              complete website development with integrated dashboard systems for business operations.
            </p>
            <p>
              <span className="text-purple-500">&gt;</span> Certified in advanced English communication (B2 Upper
              Intermediate) and holds BSc in Computer Science. Specialized in bridging technical complexity with
              user-friendly interfaces.
            </p>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-l-2 border-blue-500 pl-4">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-blue-500 mr-2"></div>
            <span className="text-blue-400 text-xs tracking-wider">CERTIFICATIONS</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center p-2 bg-blue-500/10 border border-blue-500/30">
              <Award className="w-4 h-4 text-blue-400 mr-2" />
              <div>
                <div className="text-blue-400 text-xs font-bold">BSc COMPUTER SCIENCE</div>
                <div className="text-blue-400/70 text-xs">Academic Foundation</div>
              </div>
            </div>
            <div className="flex items-center p-2 bg-yellow-500/10 border border-yellow-500/30">
              <Award className="w-4 h-4 text-yellow-400 mr-2" />
              <div className="flex-1 flex flex-col">
                <div className="text-yellow-400 text-xs font-bold">B2 ENGLISH CERTIFIED</div>
                <div className="text-yellow-400/70 text-xs">EF SET Upper Intermediate</div>
              </div>
              <a
                href="https://cert.efset.org/en/vguDfH"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full ml-2 text-yellow-400/80 hover:text-yellow-300 transition-colors"
                style={{ minWidth: 32 }}
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced System Metrics */}
        <div className="border-l-2 border-cyan-500 pl-4">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-cyan-500 mr-2"></div>
            <span className="text-cyan-400 text-xs tracking-wider">SYSTEM_METRICS</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gradient-to-br from-pink-600/20 to-pink-800/20 border border-pink-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <Zap className="w-4 h-4 text-pink-400" />
                <div className="text-xs text-pink-400/70">CORE</div>
              </div>
              <div className="text-lg font-bold text-pink-400">INTERMEDIATE</div>
              <div className="text-pink-500/70 text-xs">Development Level</div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500/50"></div>
            </div>

            <div className="p-3 bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border border-emerald-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <Shield className="w-4 h-4 text-emerald-400" />
                <div className="text-xs text-emerald-400/70">LANG</div>
              </div>
              <div className="text-lg font-bold text-emerald-400">ADVANCED</div>
              <div className="text-emerald-500/70 text-xs">TypeScript</div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500/50"></div>
            </div>

            <div className="p-3 bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <Target className="w-4 h-4 text-blue-400" />
                <div className="text-xs text-blue-400/70">BACK</div>
              </div>
              <div className="text-lg font-bold text-blue-400">ADVANCED</div>
              <div className="text-blue-500/70 text-xs">Node.js</div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500/50"></div>
            </div>

            <div className="p-3 bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border border-cyan-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="text-xs text-cyan-400/70">SYS</div>
              </div>
              <div className="text-lg font-bold text-cyan-400">ACTIVE</div>
              <div className="text-cyan-500/70 text-xs">Status</div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500/50"></div>
            </div>
          </div>
        </div>
      </div>
    </BaseWindow>
  )
}
