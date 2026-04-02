"use client"

import BasePage from "./base-page"
import { Shield, Send, Clock, AlertCircle } from "lucide-react"
import { useState } from "react"

interface ContactPageProps {
  onBack: () => void
}

export default function ContactPage({ onBack }: ContactPageProps) {
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
      link: "https://www.linkedin.com/in/dyarialitahir/",
      handle: "Dyari Ali Tahir",
      icon: <img src="/Icons/linkedin.avif" alt="LinkedIn Icon" className="w-6 h-6" />,
      responseTime: "1-2 days",
      availability: "Business hours",
      preferred: false,
      description: "Professional networking and career opportunities",
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
      platform: "INSTAGRAM",
      link: "https://www.instagram.com/dyari_ali_taher/",
      handle: "@dyari_ali_taher",
      icon: <img src="/Icons/instagram.avif" alt="Instagram Icon" className="w-6 h-6" />,
      responseTime: "Varies",
      availability: "Active",
      preferred: false,
      description: "Brain rot reels at 3am.",
    },
  ]


  return (
    <BasePage title="INQUIRIES" onBack={onBack}>
      <div className="relative space-y-6">
        {/* Availability Status */}
        <div className="relative border border-white/60 p-6 bg-white/40 rounded-3xl backdrop-blur-3xl shadow-xl ring-1 ring-white/60">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse shadow-[0_0_8px_rgba(251,146,60,0.4)]" />
            <span className="text-stone-950 text-sm font-black tracking-widest uppercase">Currently Available</span>
          </div>
          <div className="text-stone-800 text-xs mb-4 font-bold leading-relaxed">Open for new architectural challenges and harmonic collaborations.</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-stone-950/40 font-black uppercase tracking-[0.2em] text-[9px] mb-1">Response Time</div>
              <div className="text-stone-950 font-black text-xs uppercase">Within 24 Hours</div>
            </div>
            <div>
              <div className="text-stone-950/40 font-black uppercase tracking-[0.2em] text-[9px] mb-1">Timezone</div>
              <div className="text-stone-950 font-black text-xs uppercase">GMT+3 (Erbil)</div>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-3">
          <div className="flex items-center mb-3">
            <Shield className="w-4 h-4 text-memory-pink mr-2" />
            <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em]">Contact Channels</span>
          </div>

          {contactMethods.map((contact) => (
            <div key={contact.platform} className="relative border border-white/60 p-6 bg-white/40 rounded-3xl backdrop-blur-3xl shadow-xl ring-1 ring-white/60 group hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/60 rounded-2xl ring-1 ring-white/40 shadow-sm">{contact.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-stone-950 font-black text-base tracking-tighter uppercase">{contact.platform}</h3>
                      {contact.preferred && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[9px] font-black rounded-full uppercase tracking-widest">
                          Preferred
                        </span>
                      )}
                    </div>
                    <div className="text-stone-950/40 text-[10px] mb-3 font-black tracking-widest uppercase">{contact.handle}</div>
                    <p className="text-stone-800 text-xs mb-4 leading-relaxed font-bold">{contact.description}</p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center font-black text-[10px] text-stone-950/40 uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5 mr-2 text-orange-400" />
                        <span>{contact.responseTime}</span>
                      </div>
                      <div className="flex items-center font-black text-[10px] text-stone-950/40 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2 shadow-sm" />
                        <span>{contact.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-stone-950 text-white font-black rounded-2xl hover:bg-stone-800 transition-all text-[10px] shadow-lg uppercase tracking-[0.4em] active:scale-95"
              >
                <span>Initiate Echo</span>
                <Send className="w-3.5 h-3.5 text-orange-400" />
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="relative border border-white/60 p-6 bg-white/40 rounded-3xl backdrop-blur-3xl shadow-xl ring-1 ring-white/60">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-amber-400 rounded-full mr-3 animate-pulse shadow-sm" />
            <span className="text-stone-950/40 text-[10px] font-black uppercase tracking-[0.3em]">Protocol Guidelines</span>
          </div>
          <div className="space-y-3 text-[11px] text-stone-800 font-bold">
            <p className="flex items-start gap-2">
              <span className="text-orange-500 font-black leading-none">•</span>
              Include project timeline and budget range for faster response
            </p>
            <p className="flex items-start gap-2">
              <span className="text-orange-500 font-black leading-none">•</span>
              Provide detailed requirements and technical specifications
            </p>
            <p className="flex items-start gap-2">
              <span className="text-orange-500 font-black leading-none">•</span>
              For urgent matters, use{" "}
              <span
                onClick={copyToClipboard}
                className="text-stone-950 cursor-pointer hover:text-orange-600 transition-colors font-black relative underline decoration-orange-400/40"
                title="Click to copy username"
              >
                Discord: {username}
                {copied && (
                  <span className="absolute -top-12 left-0 bg-stone-950 text-white text-[10px] py-2 px-4 rounded-full shadow-2xl font-black uppercase tracking-widest z-50">
                    Copied
                  </span>
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
