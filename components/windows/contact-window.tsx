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
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 mb-1">Contact Methods</h2>
          <p className="text-stone-700 text-xs font-bold">Choose your preferred way to reach out</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((contact, index) => (
                <div
                  key={index}
                  className="rounded-2xl hover:bg-white hover:scale-[1.01] transition-all duration-300 p-5 group shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 p-3 rounded-xl bg-white shadow-inner group-hover:scale-110 transition-transform">{contact.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-stone-900 font-bold text-sm tracking-wide">{contact.platform}</h3>
                        {contact.preferred && (
                          <span className="px-2 py-0.5 bg-memory-pink/20 border border-memory-pink/30 text-memory-pink text-[9px] font-bold rounded-full uppercase tracking-widest">
                            Preferred
                          </span>
                        )}
                      </div>
                      <div className="text-stone-600 text-xs font-bold mb-1 tracking-tight">{contact.handle}</div>
                      <p className="text-stone-800 text-xs mb-4 leading-relaxed font-bold">{contact.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-stone-600 font-bold">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-memory-pink" />
                          <span>{contact.responseTime}</span>
                        </div>
                        <a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-memory-pink/10 border border-memory-pink/30 text-stone-900 hover:bg-memory-pink/20 transition-all hover:scale-105"
                        >
                          <span>Open</span>
                          <Send className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Discord Contact */}
          <div className="rounded-2xl border border-white/60 bg-white/40 p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-memory-pink mt-0.5 shrink-0" />
              <div className="text-xs text-stone-700 space-y-2 font-bold">
                <p className="font-black text-stone-900">For faster responses</p>
                <p>Include project timeline and budget range in your initial message.</p>
                <p>
                  For urgent matters, use{" "}
                  <span
                    onClick={copyToClipboard}
                    className="text-stone-900 font-black cursor-pointer hover:text-memory-pink transition-colors relative underline decoration-memory-pink/40"
                    title="Click to copy"
                  >
                    Discord: {username}
                    {copied && (
                      <span className="absolute -right-20 bg-memory-brown text-black text-[10px] py-1.5 px-3 rounded-full shadow-lg">
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
