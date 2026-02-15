"use client"

import { useState } from "react"
import { BaseWindow } from "./base-window"
import { Send, Clock, AlertCircle } from "lucide-react"
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

  const [copied, setCopied] = useState(false);
  const username = "death_tail";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(username);
      setCopied(true);
      // Reset the "Copied" state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
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
      link: "https://www.linkedin.com/in/dyarialitahir/",
      handle: "Dyari Ali Tahir",
      icon: <img src="/Icons/linkedin.avif" alt="LinkedIn Icon" className="w-10 h-10" />,
      description: "Professional network & career updates",
      security: "Verified profile",
      responseTime: "1-2 days",
      availability: "Business hours",
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
      platform: "INSTAGRAM",
      link: "https://www.instagram.com/dyari_ali_taher/",
      handle: "@dyari_ali_taher",
      icon: <img src="/Icons/instagram.avif" alt="Instagram Icon" className="w-10 h-10" />,
      description: "Brain rot reels at 3am.",
      security: "Public profile",
      responseTime: "Varies",
      availability: "Active",
      preferred: false,
    },

  ]

  return (
    <BaseWindow
      {...props} initialSize={{ width: 600, height: 800 }} >
      <div className="space-y-6 h-full flex flex-col">
        {/* Header */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Contact Methods</h2>
          <p className="text-zinc-400 text-xs">Choose your preferred way to reach out</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">

            {/* Contact Methods */}
            <div className="space-y-3">
              {contactMethods.map((contact, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-zinc-700/30 bg-zinc-800/30 hover:border-zinc-600/50 transition-all duration-200 p-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 p-2 rounded-lg bg-zinc-700/30">{contact.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-zinc-100 font-medium text-sm">{contact.platform}</h3>
                        {contact.preferred && (
                          <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-medium rounded">
                            Preferred
                          </span>
                        )}
                      </div>
                      <div className="text-zinc-500 text-xs font-mono mb-1">{contact.handle}</div>
                      <p className="text-zinc-400 text-xs mb-3">{contact.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-zinc-500">
                          <Clock className="w-3 h-3 mr-1.5" />
                          <span>{contact.responseTime}</span>
                        </div>
                        <a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-zinc-700/40 border border-zinc-600/30 text-zinc-300 hover:bg-zinc-700/60 transition-all"
                        >
                          <span>Open</span>
                          <Send className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Discord Contact */}
          <div className="rounded-lg border border-zinc-700/30 bg-zinc-800/20 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
              <div className="text-xs text-zinc-400 space-y-2">
                <p className="font-medium text-zinc-300">For faster responses</p>
                <p>Include project timeline and budget range in your initial message.</p>
                <p>
                  For urgent matters, use{" "}
                  <span
                    onClick={copyToClipboard}
                    className="text-zinc-200 cursor-pointer hover:text-zinc-100 font-mono transition-colors relative"
                    title="Click to copy"
                  >
                    Discord: {username}
                    {copied && (
                      <span className="absolute -top-6 left-0 bg-zinc-700 text-zinc-100 text-[10px] py-1 px-2 rounded">
                        Copied!
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseWindow>
  )
}
