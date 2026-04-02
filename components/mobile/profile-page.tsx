"use client"

import BasePage from "./base-page"
import Image from "next/image"
import {
  Award,
  Send,
  MapPin,
  ShieldCheck,
  Globe
} from "lucide-react"
import pfp from "../../public/ll.webp"

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
            <div className="relative p-1 bg-white/20 border border-white/60 rounded-3xl backdrop-blur-3xl shadow-2xl overflow-hidden group ring-1 ring-white/80">

              {/* Image Container */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white/5">
                <Image
                  src={pfp}
                  alt="Profile"
                  placeholder="blur"
                  fill
                  priority
                  className="object-cover opacity-90 duration-700 "
                />

                {/* ID Badge */}
                <div className="absolute -bottom-4 left-4 right-4 bg-white/60 backdrop-blur-3xl border border-white/80 p-5 rounded-2xl z-20 text-center shadow-lg ring-1 ring-white/60">
                  <h2 className="text-2xl font-black text-stone-950 tracking-tighter uppercase drop-shadow-sm">DYARI ALI TAHIR</h2>
                  <div className="flex items-center justify-center mt-2">
                    <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-orange-400 to-transparent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Vitals / Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white/40 border border-white/60 rounded-2xl backdrop-blur-sm shadow-sm ring-1 ring-white/40">
                <MapPin className="w-4 h-4 text-orange-500 mb-2" />
                <div className="text-[10px] text-stone-950/40 font-black uppercase tracking-[0.2em]">Location</div>
                <div className="text-sm font-black text-stone-950">Erbil, IQ</div>
              </div>
              <div className="p-4 bg-white/40 border border-white/60 rounded-2xl backdrop-blur-sm shadow-sm ring-1 ring-white/40">
                <Globe className="w-4 h-4 text-amber-500 mb-2" />
                <div className="text-[10px] text-stone-950/40 font-black uppercase tracking-[0.2em]">Timezone</div>
                <div className="text-sm font-black text-stone-950">GMT +3</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Data Stream */}
          <div className="lg:col-span-8 space-y-6">

            {/* Bio Section */}
            <div className="relative border-l-2 border-stone-950/20 pl-6 py-2">
              <div className="absolute -left-1.25 top-0 w-2.5 h-2.5 bg-stone-950 rounded-full shadow-sm" />
              <div className="absolute -left-1.25 bottom-0 w-2.5 h-2.5 bg-stone-950 rounded-full shadow-sm" />

              <div className="space-y-4 text-sm leading-relaxed text-stone-950 font-bold">
                <p className="text-left">
                  Full-Stack Developer working with <span className="underline decoration-orange-400/40">Next.js</span>, <span className="underline decoration-orange-400/40">TypeScript</span>, and Tailwind CSS.
                  BSc in Computer Science.</p>
                <p>
                  Currently studying Unreal Engine and Blender for animation and 3D art.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Experience", value: "3+ YEARS" },
                { label: "Projects", value: "5+ SHIPPED" },
              ].map((stat, i) => (
                <div key={i} className="relative p-5 bg-white/40 border border-white/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-sm ring-1 ring-white/60">
                  <div className="text-2xl font-black text-stone-950 mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] text-stone-950/40 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-4 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-memory-pink" /> Validated Credentials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Cert 1 */}
                <div className="flex items-center p-4 bg-white/40 border border-white/60 rounded-lg backdrop-blur-sm shadow-md group hover:scale-[1.01] transition-all">
                  <div className="p-3 bg-memory-pink/20 text-memory-pink rounded mr-4">
                    <Award className="w-6 h-6 shadow-sm" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-stone-900 leading-tight uppercase">BSc COMPUTER SCIENCE</div>
                    <div className="text-[10px] text-stone-600 font-bold mt-1">ACADEMIC FOUNDATION</div>
                  </div>
                </div>

                {/* Cert 2 */}
                <div className="flex items-center p-4 bg-white/40 border border-white/60 rounded-lg backdrop-blur-sm shadow-md relative group hover:scale-[1.01] transition-all">
                  <div className="p-3 bg-memory-gold/20 text-memory-gold rounded mr-4">
                    <Globe className="w-6 h-6 shadow-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-black text-stone-900 leading-tight uppercase">ENGLISH B2 (UPPER INT)</div>
                    <div className="text-[10px] text-stone-600 font-bold mt-1">EF SET CERTIFIED</div>
                  </div>
                  <a
                    href="https://cert.efset.org/en/vguDfH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-4 p-2 text-memory-gold/50 hover:text-memory-gold hover:bg-white/10 rounded transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
