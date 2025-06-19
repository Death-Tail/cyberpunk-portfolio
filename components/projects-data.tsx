// Shared project data for both desktop and mobile
import { Globe } from "lucide-react"

export const projects = [
  {
    title: "REKAN GROUP WEBSITE",
    description: "Complete website with integrated dashboard system for content operations management.",
    status: "DEPLOYED",
    icon: <img src="/Projects/rekangroup.avif" alt="REKAN GROUP Icon" className="w-10 h-5" />,
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Node.js"],
    achievements: [
      "Multi-language responsive website",
      "Secure admin dashboard with authentication",
      "Content management system for non-technical users",
      "Production deployment & performance optimization",
    ],
    links: {
      live: "https://rekangroup.com",
      github: null, // No GitHub link available
    },
  },
  // Add more projects here as needed
]
