// Shared project data for both desktop and mobile
import { Globe } from "lucide-react"

export const projects = [
  {
    title: "REKAN GROUP WEBSITE",
    description: "Complete website with integrated dashboard system for content operations management.",
    status: "DEPLOYED",
    icon: <img src="/projects/rekangroup.avif" alt="REKAN GROUP Icon" className="w-10 h-5" />,
    images: [
      "/projects/rekangroup1.avif",
      "/projects/rekangroup2.avif",
      "/projects/rekangroup3.avif",
    ],
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
    // Additional fields for richer data
    timeline: "3-6 months",
    teamSize: "Solo Project",
    challenges: [
      "Complex state management",
      "Performance optimization",
      "Cross-browser compatibility",
      "Responsive design implementation",
    ],
    features: [
      "Real-time data synchronization",
      "Advanced user authentication",
      "Responsive mobile design",
      "SEO optimization",
      "Performance monitoring",
    ],
    metrics: {
      performance: 95,
      accessibility: 90,
      seo: 85,
    },
  },
  // Add more projects here as needed, with the same structure
]
