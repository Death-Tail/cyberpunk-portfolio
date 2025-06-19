import { BaseWindow } from "./base-window"
import { Mail, ExternalLink, Shield } from "lucide-react"

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

const contactMethods = [
  {
    platform: "EMAIL",
    Link: "mailto:dyarialitaher03@gmail.com",
    handle: "dyarialitaher03@gmail.com",
    icon: <Mail className="w-5 h-5" />,
    description: "Professional inquiries & project discussions",
    security: "PGP encrypted available",
  },
  {
    platform: "GITHUB",
    Link: "https://github.com/linGREEDO",
    handle: "linGREEDO",
    icon: <img src="/icons/github.svg" alt="Github Icon" className="w-5 h-5" />,
    description: "Code repositories & open source contributions",
    security: "Public profile",
  },
  {
    platform: "LINKEDIN",
    Link: "https://www.linkedin.com/in/dyari-ali-tahir-b005352b5/",
    handle: "Dyari Ali Tahir",
    icon: <img src="/icons/linkedin.svg" alt="LinkedIn Icon" className="w-5 h-5" />,
    description: "Professional network & career updates",
    security: "Verified profile",
  },
  {
    platform: "DISCORD",
    Link: "https://discord.com/users/lin_greed",
    handle: "lin_greed",
    icon: <img src="/icons/discord.svg" alt="Discord Icon" className="w-5 h-5" />,
    description: "Real-time communication & collaboration",
    security: "End-to-end encrypted",
  },
]

export function ContactWindow(props: ContactWindowProps) {
  return (
    <BaseWindow {...props} initialPosition={{ x: 200, y: 150 }} initialSize={{ width: 600, height: 500 }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-l-2 border-red-600 pl-4">
          <div className="flex items-center mb-4">
            <div className="w-2 h-2 bg-red-600 mr-2"></div>
            <span className="text-red-500 text-xs tracking-wider">COMMUNICATION_PROTOCOLS</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="border border-yellow-500/30 p-3 bg-yellow-500/5">
          <div className="flex items-center mb-2">
            <Shield className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 text-xs font-bold">SECURITY NOTICE</span>
          </div>
          <div className="text-yellow-400/70 text-xs">
            Avg. response cycle: &lt; 24h (Earth Standard Time)
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-3">
          {contactMethods.map((contact, index) => (
            <a
              key={index}
              href={contact.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-red-600/30 p-4 hover:bg-red-600/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div>
                    {contact.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-red-400 font-bold text-sm">{contact.platform}</h3>
                      </div>
                      <ExternalLink className="w-3 h-3 text-red-500/50 group-hover:text-red-400 transition-colors" />
                    </div>

                    <div className="text-red-400/70 text-xs mb-2 font-mono">{contact.handle}</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Availability */}
        <div className="border-l-2 border-blue-500 pl-4">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-blue-500 mr-2"></div>
            <span className="text-blue-400 text-xs tracking-wider">AVAILABILITY_STATUS</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-500/10 border border-green-500/30">
              <div className="text-sm font-bold text-green-400">AVAILABLE</div>
              <div className="text-green-500/70 text-xs">FOR PROJECTS</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/30">
              <div className="text-sm font-bold text-yellow-400">REMOTE</div>
              <div className="text-yellow-500/70 text-xs">PREFERRED</div>
            </div>
          </div>

          <div className="mt-3 text-blue-400/70 text-xs">
            <span className="text-blue-500">⚠</span> Currently accepting freelance projects and full-time opportunities.
            Specialized in Next.js, TypeScript, and database architecture.
          </div>
        </div>
      </div>
    </BaseWindow>
  )
}
