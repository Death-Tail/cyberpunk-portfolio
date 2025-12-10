"use client"

import BasePage from "./base-page"
import Image from "next/image"
import {
  Award,
  Send,
  MapPin,
  Terminal,
  Cpu,
  ShieldCheck,
  Code2,
  Fingerprint,
  Globe
} from "lucide-react"
import pfp from "../../public/pfp.webp"

interface ProfilePageProps {
  onBack: () => void
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  return (
    <BasePage title="Profile" onBack={onBack}>
      <div className="relative min-h-screen pb-10">

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: Identity Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative p-1 bg-zinc-900/80 border border-indigo-500/30 rounded-xl backdrop-blur-sm overflow-hidden group">
              {/* Animated Scanner Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400/50 shadow-[0_0_15px_rgba(45,212,191,0.8)] z-20 animate-[scan_4s_ease-in-out_infinite]" />

              {/* Image Container */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-zinc-800">
                <Image
                  src={pfp}
                  alt="Profile"
                  placeholder="blur"
                  fill
                  priority
                  className="object-cover opacity-90 duration-700 "
                />
                {/* CRT Scanlines Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 background-size-[100%_2px,3px_100%] pointer-events-none" />

                {/* ID Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded z-20">
                  <h2 className="text-xl font-bold text-white tracking-wide">DYARI ALI TAHIR</h2>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-indigo-400 text-xs font-mono">FULL_STACK_DEV</span>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] text-green-500 font-mono">ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vitals / Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-zinc-900/50 border border-white/5 rounded hover:border-indigo-500/30 transition-colors group">
                <MapPin className="w-4 h-4 text-white mb-2 group-hover:text-indigo-400 transition-colors" />
                <div className="text-xs text-white">Location</div>
                <div className="text-sm font-bold text-white">KRD, Hawler</div>
              </div>
              <div className="p-3 bg-zinc-900/50 border border-white/5 rounded hover:border-indigo-500/30 transition-colors group">
                <Globe className="w-4 h-4 text-zinc-500 mb-2 group-hover:text-indigo-400 transition-colors" />
                <div className="text-xs text-zinc-500">Timezone</div>
                <div className="text-sm font-bold text-white">GMT +3</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Data Stream */}
          <div className="lg:col-span-8 space-y-6">

            {/* Bio Section */}
            <div className="relative border-l-2 border-indigo-500/50 pl-6 py-2">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-indigo-500 rounded-full" />
              <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-indigo-500 rounded-full" />

              <div className="space-y-4 text-sm leading-relaxed text-zinc-300 font-mono">
                <p className="text-left">
                  <span className="text-yellow-500 mr-2">&gt;</span>
                    Full-Stack Developer working with Nextjs, Typescript, Tailwind CSS, sometimes Flutter,
                    i hold a BSc in Computer Science.</p>
                <p>
                  <span className="text-yellow-500 mr-2">&gt;</span>
                  Might migrate to Unreal Engine and blender for animation and 3d art.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Experience", value: "2+ YEARS" },
                { label: "Projects", value: "3+ SHIPPED"},
              ].map((stat, i) => (
                <div key={i} className="relative p-4 bg-zinc-900/40 border border-white/10 rounded-lg overflow-hidden group hover:bg-zinc-900/80 hover:border-indigo-500/30 transition-all">
                  <div className="text-xl font-bold text-white mb-1 font-mono">{stat.value}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2" /> Validated Credentials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Cert 1 */}
                <div className="flex items-center p-4 bg-linear-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-lg">
                  <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded mr-4">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-indigo-200">BSc COMPUTER SCIENCE</div>
                    <div className="text-xs text-indigo-400/60 font-mono mt-1">ACADEMIC FOUNDATION</div>
                  </div>
                </div>

                {/* Cert 2 */}
                <div className="flex items-center p-4 bg-linear-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-lg relative group">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded mr-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-amber-200">ENGLISH B2 (UPPER INT)</div>
                    <div className="text-xs text-amber-400/60 font-mono mt-1">EF SET CERTIFIED</div>
                  </div>
                  <a
                    href="https://cert.efset.org/en/vguDfH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-4 p-2 text-amber-400/50 hover:text-white hover:bg-amber-500 rounded transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Global Animation Styles for the Scanner */}
      <style jsx global>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          50% { top: 100%; opacity: 1; }
          90% { opacity: 1; }
        }
      `}</style>
    </BasePage>
  )
}
