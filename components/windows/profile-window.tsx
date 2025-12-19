import Image from "next/image"
import { BaseWindow } from "./base-window"
import { GlitchText } from "../glitch-text"
import { Award, MapPin, Zap, Shield, Target, Send } from "lucide-react"
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
    <BaseWindow {...props} initialPosition={{ x: 100, y: 80 }} initialSize={{ width: 550, height: 650 }}>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="border-l-2 border-indigo-600 pl-4">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-indigo-600 mr-2"></div>
            <span className="text-indigo-300 text-xs tracking-wider">USER_PROFILE</span>
          </div>

          <div className="flex items-start space-x-4">
            <div className="relative" style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
              }}>
              <Image
                src={pfpImg}
                alt="Profile"
                placeholder="blur"
                width={120}
                height={120}

              />
            </div>

            <div>
              <GlitchText
                text="Dyari Ali Tahir (SHIN尾)"
                className="text-xl font-bold mb-2"
                glitchColors={["#dc2626", "#eab308", "#3b82f6"]}
              />
              <div className="text-red-200 text-sm mb-2">FULL_STACK_DEVELOPER</div>
              <div className="flex items-center text-neutral-200 text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                <span>REMOTE_OPERATIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="border-l-2 border-indigo-500 pl-4">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-indigo-500 mr-2"></div>
            <span className="text-indigo-300 text-xs tracking-wider">Summary</span>
          </div>

          <div className="text-white text-sm space-y-2">
            <p>
              <span className="text-indigo-500">&gt;</span> Full-Stack Developer working with Nextjs, Typescript, Tailwind CSS, sometimes i work with WP, Flutter, i hold a BSc in Computer Science.
            </p>
            <br/>
            <p>
              <span className="text-indigo-500">&gt;</span> Currently studying Unreal Engine and blender for animation and 3d art.
            </p>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-l-2 border-indigo-500 pl-4">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-indigo-500 mr-2"></div>
            <span className="text-indigo-300 text-xs tracking-wider">CERTIFICATIONS</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center p-2 bg-indigo-500/10 border border-indigo-500/30">
              <Award className="w-4 h-4 text-neutral-400 mr-2" />
              <div>
                <div className="text-white text-xs font-bold">BSc COMPUTER SCIENCE</div>
                <div className="text-white/70 text-xs">Academic Foundation</div>
              </div>
            </div>
            <div className="flex items-center p-2 bg-indigo-500/10 border border-indigo-500/30">
              <Award className="w-4 h-4 text-neutral-400 mr-2" />
              <div className="flex-1 flex flex-col">
                <div className="text-white text-xs font-bold">B2 ENGLISH CERTIFIED</div>
                <div className="text-white/70 text-xs">EF SET Upper Intermediate</div>
              </div>
              <a
                href="https://cert.efset.org/en/vguDfH"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full ml-2 text-indigo-400/80 hover:text-indigo-300 transition-colors"
                style={{ minWidth: 32 }}
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </BaseWindow>
  )
}
