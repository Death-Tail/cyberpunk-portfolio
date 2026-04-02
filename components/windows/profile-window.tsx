import Image from "next/image"
import { BaseWindow } from "./base-window"
import { Award, MapPin, ExternalLink } from "lucide-react"
import pfpImg from "@/public/ll.webp"

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
            <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white/60 shadow-xl">
              <Image src={pfpImg} alt="Profile" placeholder="blur" width={96} height={96} className="object-cover" />
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Dyari Ali Tahir</h2>
            <div className="text-stone-700 text-sm font-semibold mb-3 tracking-wide">SHIN尾 • Full-Stack Developer</div>
            <div className="flex items-center gap-4 text-xs text-stone-700">
              <span className="flex items-center gap-1.5 font-bold">
                <MapPin className="w-3.5 h-3.5 text-memory-pink" />
                Erbil, Iraq
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-memory-pink/30 to-transparent" />

        {/* About Section */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 mb-3">About</h3>
          <div className="space-y-3 text-sm text-stone-800 leading-relaxed font-bold">
            <p>
              Full-Stack Developer specializing in <span className="text-stone-950 font-black underline decoration-memory-pink/60">Next.js</span>,
              <span className="text-stone-950 font-black underline decoration-memory-pink/60"> TypeScript</span>, and modern web architectures.
              BSc in Computer Science with a focus on building performant, scalable applications.
            </p>
            <p className="text-stone-500 italic">
              Currently exploring Unreal Engine and Blender for 3D art and animation.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Experience", value: "3+ Years" },
            { label: "Projects", value: "5+ Shipped" },
            { label: "Stack", value: "Full-Stack" },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/80 border border-white/70 text-center shadow-md hover:-translate-y-0.5 transition-transform duration-300">
              <div className="text-lg font-bold text-stone-900">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-stone-600 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 mb-3">Credentials</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-white/80 group hover:bg-white transition-all shadow-md">
              <div className="p-2 rounded-xl bg-stone-100">
                <Award className="w-5 h-5 text-stone-800" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-memory-brown">BSc Computer Science</div>
                <div className="text-xs text-stone-600">Academic Foundation</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-white/80 group hover:bg-white transition-all shadow-md">
              <div className="p-2 rounded-xl bg-memory-gold/30">
                <Award className="w-5 h-5 text-memory-gold" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-stone-900">English B2 Certified</div>
                <div className="text-xs text-stone-700 font-bold">EF SET Upper Intermediate</div>
              </div>
              <a
                href="https://cert.efset.org/en/vguDfH"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-stone-500 hover:text-memory-pink transition-colors"
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
