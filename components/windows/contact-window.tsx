"use client"

import type React from "react"

import { BaseWindow } from "./base-window"
import { Mail, ExternalLink, Shield, Send, Clock, AlertCircle } from "lucide-react"
interface ContactWindowProps {
  id: string
  title: string
  isActive: boolean
  isMinimized: boolean
  zIndex: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
}

export function ContactWindow(props: ContactWindowProps) {

  const contactMethods = [
    {
      platform: "EMAIL",
      link: "mailto:dyarialitaher03@gmail.com",
      handle: "dyarialitaher03@gmail.com",
      icon: <img src="/Icons/gmail.avif" alt="Gmail Icon" className="w-10 h-10" />,
      description: "Professional inquiries & project discussions",
      security: "PGP encrypted available",
      responseTime: "< 24 hours",
      availability: "Always available",
      preferred: false,
    },
    {
      platform: "GITHUB",
      link: "https://github.com/Death-Tail",
      handle: "Death-Tail",
      icon: <img src="/Icons/github.avif" alt="Github Icon" className="w-10 h-10" />,
      description: "Code repositories & open source contributions",
      security: "Public profile",
      responseTime: "1-3 days",
      availability: "Active daily",
      preferred: false,
    },
    {
      platform: "LINKEDIN",
      link: "https://www.linkedin.com/in/dyari-ali-tahir-b005352b5/",
      handle: "Dyari Ali Tahir",
      icon: <img src="/Icons/linkedin.avif" alt="LinkedIn Icon" className="w-10 h-10" />,
      description: "Professional network & career updates",
      security: "Verified profile",
      responseTime: "1-2 days",
      availability: "Business hours",
      preferred: false,
    },
    {
      platform: "DISCORD",
      link: "https://discord.com/users/death_tail",
      handle: "death_tail",
      icon: <img src="/Icons/discord.avif" alt="Discord Icon" className="w-10 h-10" />,
      description: "Real-time communication & collaboration",
      security: "End-to-end encrypted",
      responseTime: "Few hours",
      availability: "always",
      preferred: false,
    },
    {
      platform: "X",
      link: "https://x.com/Death_Tail0331",
      handle: "@Death_Tail0331",
      icon: <img src="/Icons/x.avif" alt="Twitter Icon" className="w-10 h-10" />,
      description: "Social media updates & interactions",
      security: "Public profile",
      responseTime: "Varies",
      availability: "Active",
      preferred: false,
    },
    {
      platform: "Instagram",
      link: "https://www.instagram.com/dyari_ali_taher/",
      handle: "@dyari_ali_taher",
      icon: <img src="/Icons/instagram.avif" alt="Instagram Icon" className="w-10 h-10" />,
      description: "Connect with me on Instagram",
      security: "Public profile",
      responseTime: "Varies",
      availability: "Active",
      preferred: false,
    },

  ]

  return (
    <BaseWindow
      {...props} initialSize={{ width: 600, height: 800 }} >
      <div className="space-y-8 h-full flex flex-col">
        {/* Header */}
        <div className="border-l-2 border-red-600 pl-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-600 mr-2"></div>
              <span className="text-red-500 text-xs tracking-wider">COMMUNICATION_PROTOCOLS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs">ONLINE</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {/* Availability Status */}
              <div className="border border-green-500/30 p-4 bg-green-500/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-400 mr-2" />
                    <span className="text-green-400 text-xs font-bold">CURRENT STATUS</span>
                  </div>
                  <div className="text-green-400 text-xs">GMT+3 (Kurdistan)</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="text-center p-2 bg-green-500/10 border border-green-500/30">
                    <div className="text-green-400 font-bold">AVAILABLE</div>
                    <div className="text-green-400/70">For Projects</div>
                  </div>
                  <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30">
                    <div className="text-blue-400 font-bold">&lt; 24 hours</div>
                    <div className="text-blue-400/70">Response Time</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-500/10 border border-yellow-500/30">
                    <div className="text-yellow-400 font-bold">REMOTE</div>
                    <div className="text-yellow-400/70">Work Mode</div>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="space-y-3">
                {contactMethods.map((contact, index) => (
                  <div
                    key={index}
                    className="border border-red-600/30 bg-red-600/5 hover:bg-red-600/10 transition-all duration-300 group"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 bg-red-600/10 border border-red-600/30 rounded">{contact.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-red-400 font-bold text-sm">{contact.platform}</h3>
                              {contact.preferred && (
                                <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs rounded">
                                  PREFERRED
                                </span>
                              )}
                            </div>
                            <div className="text-red-400/70 text-xs mb-2 font-mono">{contact.handle}</div>
                            <p className="text-red-400/60 text-xs mb-3">{contact.description}</p>

                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1 text-blue-400" />
                                <span className="text-blue-400/80">{contact.responseTime}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                                <span className="text-green-400/80">{contact.availability}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-red-500/50 group-hover:text-red-400 transition-colors" />
                      </div>

                      <a
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm"
                      >
                        <span>Contact via {contact.platform}</span>
                        <Send className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Guidelines */}
              <div className="border border-purple-500/30 p-4 bg-purple-500/5">
                <div className="flex items-center mb-3">
                  <AlertCircle className="w-4 h-4 text-purple-400 mr-2" />
                  <span className="text-purple-400 text-xs font-bold">PROJECT INQUIRY GUIDELINES</span>
                </div>
                <div className="space-y-2 text-xs text-purple-400/80">
                  <p>• Include project timeline and budget range for faster response</p>
                  <p>• Provide detailed requirements and technical specifications</p>
                  <p>• Mention preferred communication method and timezone</p>
                  <p>• For urgent matters, use <a href="https://discord.com/users/death_tail"><span className="text-blue-500">Discord</span></a>.</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </BaseWindow>
  )
}
