import { Icons } from "@/public/projects/Rekangroup";
import { IconsP } from "@/public/projects/DeathTail";



export const projects = [
  {
    title: "Rekan Group Official Website",
    description:
      "A modern corporate website for Rekan Group, featuring a multi-language platform, secure content management system, and responsive design optimized for SEO and performance.",
    status: "DEPLOYED",
    icon: (
      <img
        src="/projects/Rekangroup/rekangroup.avif"
        alt="Rekan Group Logo"
        className="w-10 h-5 object-contain"
      />
    ),
    images: [
      Icons.pI,
      Icons.aU,
      Icons.lP,
      Icons.p,
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
      "Built a custom CMS that allows non-technical users to manage website content",
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
      performance: 95,
      accessibility: 92,
      seo: 90,
    },
  },

  {
    title: "SHIN尾",
    description:
      "An aesthetic OS portfolio website showcasing my skills, projects, and experience as a full-stack developer, built with modern web technologies and optimized for performance and accessibility.",
    status: "DEPLOYED",
    icon: (
      <img
        src="/LogoWeb.webp"
        alt="Portfolio Logo"
        className="w-10 h-10 object-contain"
      />
    ),
    images: [
      IconsP.img1,
      IconsP.img2,
      IconsP.img3,

    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
    ],
    achievements: [
      "Designed and developed an aesthetic OS Portfolio",
      "Optimized for performance, accessibility, and SEO",
    ],
    links: {
      live: null,
      github: "https://github.com/Death-Tail/cyberpunk-portfolio"
    },
    timeline: "1–5 months",
    teamSize: "Solo Project",
    challenges: [
      "Balancing visual effects with performance",
      "Implementing responsive layouts for all devices",
    ],
    features: [
      "Aesthetic OS UI design",
      "Responsive design for mobile and desktop",
      "SEO optimization and performance tuning",
      "Continuous deployment with Vercel",
    ],
    metrics: {
      performance: 93,
      accessibility: 90,
      seo: 100,
    },
  }

  // Add more projects here with the same structure
]
