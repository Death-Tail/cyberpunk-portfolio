"use client"

import BasePage from "./base-page"
import { Mail, Github, Linkedin, MessageSquare, Shield } from "lucide-react"

interface ContactPageProps {
  onBack: () => void
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const contactMethods = [
    {
      platform: "EMAIL",
      link: "mailto:dyarialitaher03@gmail.com",
      handle: "dyarialitaher03@gmail.com",
      icon: <Mail className="w-8 h-8" />,
    },
    {
      platform: "GITHUB",
      link: "https://github.com/linGREEDO",
      handle: "linGREEDO",
      icon: <img src="/icons/github.svg" alt="Github Icon" className="w-8 h-8" />,
    },
    {
      platform: "LINKEDIN",
      link: "https://www.linkedin.com/in/dyari-ali-tahir-b005352b5/",
      handle: "Dyari Ali Tahir",
      icon: <img src="/icons/linkedin.svg" alt="LinkedIn Icon" className="w-8 h-8" />,
    },
    {
      platform: "DISCORD",
      link: "https://discord.com/users/lin_greed",
      handle: "lin_greed",
      icon: <img src="/icons/discord.svg" alt="Discord Icon" className="w-8 h-8" />,
    },
  ]

  return (
    <BasePage title="CONTACT" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Neural network background overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(234, 179, 8, 0.4) 1px, transparent 0),
                linear-gradient(rgba(234, 179, 8, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(234, 179, 8, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px, 40px 40px, 40px 40px",
            }}
          />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-yellow-500/20 via-yellow-500/40 to-yellow-500/20" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-yellow-600/15 via-yellow-600/35 to-yellow-600/15" />
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-yellow-500/20 via-yellow-500/40 to-yellow-500/20" />
          <div className="absolute left-2/4 top-0 w-px h-full bg-gradient-to-b from-yellow-600/15 via-yellow-600/35 to-yellow-600/15" />
        </div>

        {/* Security Notice */}
        <div className="relative border border-yellow-500/30 p-3 bg-yellow-500/5 backdrop-blur-sm">
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(234, 179, 8, 0.6) 0.5px, transparent 0)`,
              backgroundSize: "4px 4px",
            }}
          />
          <div className="flex items-center mb-2">
            <Shield className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 text-xs font-bold">DATASYNC SECURITY PROTOCOL</span>
          </div>
          <div className="text-yellow-400/70 text-xs">
            All transmissions routed through encrypted channels. For high-priority or confidential comms, initiate contact via EMAIL NODE.
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-3">
          {contactMethods.map((contact) => (
            <a
              key={contact.platform}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative border border-red-600/30 p-4 hover:bg-red-600/5 transition-all duration-300 hover:scale-[1.02]"
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
              <div className="flex items-start space-x-3">
                <div className={`relative p-2 transition-colors duration-300`}>
                  {contact.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-red-400 font-bold text-sm">{contact.platform}</h3>
                  </div>
                  <div className="text-red-400/70 text-xs mb-2 font-mono">{contact.handle}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </BasePage>
  )
}
