"use client"

import type React from "react"

import BasePage from "./base-page"
import { Mail, Shield, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

interface ContactPageProps {
  onBack: () => void
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "normal",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const contactMethods = [
    {
      platform: "EMAIL",
      link: "mailto:dyarialitaher03@gmail.com",
      handle: "dyarialitaher03@gmail.com",
      icon: <img src="/Icons/gmail.avif" alt="Gmail Icon" className="w-6 h-6" />,
      responseTime: "< 24 hours",
      availability: "Always available",
      preferred: false,
      description: "Best for detailed project discussions and formal inquiries",
    },
    {
      platform: "GITHUB",
      link: "https://github.com/Death-Tail",
      handle: "Death-Tail",
      icon: <img src="/Icons/github.avif" alt="Github Icon" className="w-6 h-6" />,
      responseTime: "1-3 days",
      availability: "Active daily",
      preferred: false,
      description: "View my code, contribute to projects, or report issues",
    },
    {
      platform: "LINKEDIN",
      link: "https://www.linkedin.com/in/dyari-ali-tahir-b005352b5/",
      handle: "Dyari Ali Tahir",
      icon: <img src="/Icons/linkedin.avif" alt="LinkedIn Icon" className="w-6 h-6" />,
      responseTime: "1-2 days",
      availability: "Business hours",
      preferred: false,
      description: "Professional networking and career opportunities",
    },
    {
      platform: "DISCORD",
      link: "https://discord.com/users/lin_greed",
      handle: "lin_greed",
      icon: <img src="/Icons/discord.avif" alt="Discord Icon" className="w-6 h-6" />,
      responseTime: "Few hours",
      availability: "Evening GMT+3",
      preferred: true,
      description: "Quick questions and casual conversations",
    },
    {
      platform: "X",
      link: "https://x.com/Death_Tail0331",
      handle: "@Death_Tail0331",
      icon: <img src="/Icons/x.avif" alt="Twitter Icon" className="w-6 h-6" />,
      responseTime: "Varies",
      availability: "Active",
      preferred: false,
      description: "Social media updates & interactions",
    },

    {
      platform: "Instagram",
      link: "https://www.instagram.com/dyari_ali_taher/",
      handle: "@dyari_ali_taher",
      icon: <img src="/Icons/instagram.avif" alt="Instagram Icon" className="w-6 h-6" />,
      responseTime: "Varies",
      availability: "Active",
      preferred: false,
      description: "Connect with me on Instagram",
    },
  ]


  return (
    <BasePage title="CONTACT" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Availability Status */}
        <div className="relative border border-green-500/30 p-4 bg-green-500/5 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
            <span className="text-green-400 text-sm font-bold">CURRENTLY AVAILABLE</span>
          </div>
          <div className="text-green-400/80 text-xs mb-2">Open for new projects and collaborations</div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-green-400/70">Response Time</div>
              <div className="text-green-400">Within 24 hours</div>
            </div>
            <div>
              <div className="text-green-400/70">Timezone</div>
              <div className="text-green-400">GMT+3 (Kurdistan)</div>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-3">
          <div className="flex items-center mb-3">
            <Shield className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 text-xs font-bold">CONTACT CHANNELS</span>
          </div>

          {contactMethods.map((contact) => (
            <div key={contact.platform} className="relative border border-red-600/30 p-4 bg-red-600/5 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-600/10 border border-red-600/30 rounded">{contact.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-red-400 font-bold text-sm">{contact.platform}</h3>
                      {contact.preferred && (
                        <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs rounded">
                          PREFERRED
                        </span>
                      )}
                    </div>
                    <div className="text-red-400/70 text-xs mb-2 font-mono">{contact.handle}</div>
                    <p className="text-red-400/60 text-xs mb-2">{contact.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
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
          ))}
        </div>

        {/* Additional Info */}
        <div className="relative border border-purple-500/30 p-4 bg-purple-500/5 rounded-lg">
          <div className="flex items-center mb-3">
            <AlertCircle className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 text-xs font-bold">PROJECT INQUIRIES</span>
          </div>
          <div className="space-y-2 text-xs text-purple-400/80">
            <p>• Include project timeline and budget range for faster response</p>
            <p>• Provide detailed requirements and technical specifications</p>
            <p>• Mention preferred communication method and timezone</p>
            <p>• For urgent matters, use <a href="https://discord.com/users/lin_greed"><span className="text-blue-500">Discord</span></a>.</p>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
