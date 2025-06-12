import { BaseWindow } from "./base-window"
import { Mail, Github, Linkedin, MessageSquare, ExternalLink, Shield } from "lucide-react"

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
    handle: "contact@lingreed.dev",
    icon: <Mail className="w-5 h-5" />,
    color: "red",
    status: "PRIMARY",
    description: "Professional inquiries & project discussions",
    security: "PGP encrypted available",
  },
  {
    platform: "GITHUB",
    handle: "github.com/lingreed",
    icon: <Github className="w-5 h-5" />,
    color: "blue",
    status: "ACTIVE",
    description: "Code repositories & open source contributions",
    security: "Public profile",
  },
  {
    platform: "LINKEDIN",
    handle: "linkedin.com/in/lingreed",
    icon: <Linkedin className="w-5 h-5" />,
    color: "yellow",
    status: "PROFESSIONAL",
    description: "Professional network & career updates",
    security: "Verified profile",
  },
  {
    platform: "DISCORD",
    handle: "lingreed#0000",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "blue",
    status: "CASUAL",
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
            All communications are monitored for security. Professional inquiries preferred via email. Response time:
            &lt; 24 hours during business cycles.
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-3">
          {contactMethods.map((contact, index) => (
            <div
              key={index}
              className="border border-red-600/30 p-4 hover:bg-red-600/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div
                    className={`p-2 border ${
                      contact.color === "yellow"
                        ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                        : contact.color === "blue"
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                          : "bg-red-600/20 border-red-600/50 text-red-400"
                    }`}
                  >
                    {contact.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-red-400 font-bold text-sm">{contact.platform}</h3>
                        <span
                          className={`px-2 py-0.5 text-xs border ${
                            contact.status === "PRIMARY"
                              ? "border-red-500/50 text-red-400 bg-red-500/10"
                              : contact.status === "PROFESSIONAL"
                                ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                                : "border-blue-500/50 text-blue-400 bg-blue-500/10"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-red-500/50 group-hover:text-red-400 transition-colors" />
                    </div>

                    <div className="text-red-400/70 text-xs mb-2 font-mono">{contact.handle}</div>
                    <div className="text-red-400/60 text-xs mb-2">{contact.description}</div>

                    <div className="flex items-center text-xs">
                      <Shield className="w-3 h-3 text-green-400 mr-1" />
                      <span className="text-green-400/70">{contact.security}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
