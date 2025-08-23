"use client"

import BasePage from "./base-page"
import Image from "next/image"
import { Award } from "lucide-react"

interface ProfilePageProps {
  onBack: () => void
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  return (
    <BasePage title="PROFILE" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Neural network background overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.4) 1px, transparent 0),
                linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px, 40px 40px, 40px 40px",
            }}
          />
        </div>

        {/* Profile Header */}
        <div className="relative">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 bg-red-500/20 animate-pulse"
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
              }}
            />
            <div className="absolute inset-[2px] bg-gradient-to-br from-red-500/10 to-red-900/20"
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
              }}
            />
            <Image
              src="/pfp.avif"
              alt="Profile"
              width={96}
              height={96}
              className="relative object-cover"
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
              }}
            />
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-400 rounded-full opacity-60" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full opacity-60" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full opacity-60" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-400 rounded-full opacity-60" />
          </div>

          <div className="text-center mb-6 mt-20">
            <h2 className="text-xl font-bold text-red-400 mb-1">Dyari Ali Tahir</h2>
            <p className="text-red-400/70 text-sm">Full Stack Web Developer</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="relative border-l-2 border-red-600 pl-4">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-red-600 mr-2" />
            <span className="text-red-400 text-xs tracking-wider">NEURAL_IMPRINT</span>
          </div>
          <div className="relative p-4 bg-red-500/5 border border-red-500/30"
            style={{
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
            }}
          >
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.6) 0.5px, transparent 0)`,
                backgroundSize: "4px 4px",
              }}
            />
            <p>
              <span className="text-yellow-500">&gt;</span> Full-stack developer specializing in Next.js ecosystem and
              modern web architecture. Expert in building scalable applications with TypeScript and advanced database
              systems.
            </p>
            <br/>
            <p>
              <span className="text-blue-500">&gt;</span> Proven track record in enterprise-level projects, including
              complete website development with integrated dashboard systems for business operations.
            </p>
            <br/>
            <p>
              <span className="text-red-500">&gt;</span> Certified in advanced English communication (B2 Upper
              Intermediate) and holds BSc in Computer Science. Specialized in bridging technical complexity with
              user-friendly interfaces.
            </p>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="relative border-l-2 border-blue-500 pl-4">
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
              <div>
                <div className="text-yellow-400 text-xs font-bold">B2 ENGLISH CERTIFIED</div>
                <div className="text-yellow-400/70 text-xs">EF SET Upper Intermediate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3">
          <div className="relative p-3 bg-red-500/10 border border-red-500/30 text-center">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.6) 0.5px, transparent 0)`,
                backgroundSize: "4px 4px",
              }}
            />
            <div className="text-lg font-bold text-red-400">2+</div>
            <div className="text-red-400/70 text-xs">Years Exp</div>
          </div>
          <div className="relative p-3 bg-red-500/10 border border-red-500/30 text-center">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.6) 0.5px, transparent 0)`,
                backgroundSize: "4px 4px",
              }}
            />
            <div className="text-lg font-bold text-red-400">3+</div>
            <div className="text-red-400/70 text-xs">Projects</div>
          </div>
          <div className="relative p-3 bg-red-500/10 border border-red-500/30 text-center">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.6) 0.5px, transparent 0)`,
                backgroundSize: "4px 4px",
              }}
            />
            <div className="text-lg font-bold text-red-400">12+</div>
            <div className="text-red-400/70 text-xs">Tech Stack</div>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
