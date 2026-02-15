import Image from "next/image"
import { BaseWindow } from "./base-window"
import { GlitchText } from "../glitch-text"
import { Award, MapPin, ExternalLink } from "lucide-react"
import pfpImg from "@/public/pfp.webp"

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
    <BaseWindow {...props} initialPosition={{ x: 100, y: 80 }} initialSize={{ width: 550, height: 620 }}>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-start gap-5">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-xl overflow-hidden ring-2 ring-zinc-700/50 ring-offset-2 ring-offset-zinc-900">
              <Image src={pfpImg} alt="Profile" placeholder="blur" width={96} height={96} className="object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-zinc-900" title="Available" />
          </div>

          <div className="flex-1 min-w-0">
            <GlitchText
              text="Dyari Ali Tahir"
              className="text-xl font-bold mb-1"
              glitchColors={["#a1a1aa", "#71717a", "#52525b"]}
            />
            <div className="text-zinc-400 text-sm font-medium mb-2">SHIN尾 • Full-Stack Developer</div>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Erbil, Iraq
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Available for work
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-zinc-700/50 to-transparent" />

        {/* About Section */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">About</h3>
          <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
            <p>
              Full-Stack Developer specializing in <span className="text-zinc-100 font-medium">Next.js</span>,
              <span className="text-zinc-100 font-medium"> TypeScript</span>, and modern web architectures.
              BSc in Computer Science with a focus on building performant, scalable applications.
            </p>
            <p className="text-zinc-400">
              Currently exploring Unreal Engine and Blender for 3D art and animation.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Experience", value: "2+ Years" },
            { label: "Projects", value: "5+ Shipped" },
            { label: "Stack", value: "Full-Stack" },
          ].map((stat, i) => (
            <div key={i} className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/30 text-center">
              <div className="text-lg font-bold text-zinc-100">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Credentials</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/20 group hover:border-zinc-600/40 transition-colors">
              <div className="p-2 rounded-md bg-zinc-700/50">
                <Award className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-200">BSc Computer Science</div>
                <div className="text-xs text-zinc-500">Academic Foundation</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/20 group hover:border-zinc-600/40 transition-colors">
              <div className="p-2 rounded-md bg-amber-500/10">
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-200">English B2 Certified</div>
                <div className="text-xs text-zinc-500">EF SET Upper Intermediate</div>
              </div>
              <a
                href="https://cert.efset.org/en/vguDfH"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-amber-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </BaseWindow>
  )
}
