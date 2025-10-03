// Shared project data for both desktop and mobile
import { Globe } from "lucide-react"

export const projects = [
  {
    title: "Rekan Group Official Website",
    description:
      "A modern corporate website for Rekan Group, featuring a multi-language platform, secure content management system, and responsive design optimized for SEO and performance.",
    status: "DEPLOYED",
    icon: (
      <img
        src="/projects/rekangroup.avif"
        alt="Rekan Group Logo"
        className="w-10 h-5 object-contain"
      />
    ),
    images: [
      "/projects/Rekangroup/rekanGroupLandingpic.avif",
      "/projects/Rekangroup/RekangroupAboutus.avif",
      "/projects/Rekangroup/RekangroupProjects.avif",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MySQL",
      "Framer Motion",
    ],
    achievements: [
      "Built a bilingual, mobile-first website for global accessibility",
      "Developed a secure admin dashboard with role-based authentication",
      "Implemented a CMS so non-technical staff can manage content",
      "Optimized for SEO, performance, and accessibility",
      "Deployed to production with full HTTPS/SSL integration",
    ],
    links: {
      live: "https://rekangroup.com",
      github: null, // private codebase
    },
    timeline: "3–6 months",
    teamSize: "Solo Project",
    challenges: [
      "Designing a scalable multi-language system",
      "Managing dynamic state across pages",
      "Ensuring cross-browser and device compatibility",
      "Balancing animations with performance",
    ],
    features: [
      "Multi-language support (English & Kurdish/Arabic)",
      "Real-time content updates via dashboard",
      "Advanced user authentication & authorization",
      "Responsive and mobile-friendly design",
      "SEO optimization with structured metadata",
      "Performance monitoring and analytics integration",
    ],
    metrics: {
      performance: 95, // Lighthouse
      accessibility: 92,
      seo: 90,
    },
  },
  // Add more projects here with the same structure
]
