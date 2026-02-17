import { IconsRekanGroup } from "@/public/projects/Rekangroup";
import { IconsAram } from "@/public/projects/draram";
import { IconsTarik } from "@/public/projects/drtarik";
import { IconsAwara } from "@/public/projects/drawara";


export const projects = [

  {
    title: "DCVAW",
    description:
      "General Directorate of Combating Violence Against Women and Families",
    status: "Under Development",
    year: "2026",
    icon: (<div className="w-10 h-10 bg-zinc-900 flex items-center justify-center text-white font-bold text-xs rounded">
      DCVAW
    </div>
    ),
    images: [],
    tech: [],
    achievements: [],
    links: {
      live: null,
      github: null,
    },
    challenges: [],
    features: [],
  },




  {
    title: "Prof. Tarik A. Rashid Portfolio",
    description:
      "A comprehensive full-stack academic portfolio for Prof. Tarik A. Rashid, Professor of Computer Science & Artificial Intelligence at UKH. Features real-time Google Scholar stats integration, dynamic blog with CMS, and a 200+ publications research archive.",
    status: "DEPLOYED",
    year: "2025-2026",
    icon: (
      <img
        src="projects/drtarik/logo.svg"
        alt="Dr. Tarik Rashid Logo"
        className="w-10 h-10 object-contain"
      />
    ),
    images: [
      IconsTarik.img1,
      IconsTarik.img2,
      IconsTarik.img3,
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "SerpApi", "Vercel"],
    achievements: [
      "Integrated automated Google Scholar citation tracking with daily ISR revalidation",
      "Built comprehensive scholarly archive with 200+ research publications",
      "Implemented advanced SEO with structured JSON-LD schema data",
      "Created premium responsive design optimized for academic audiences"
    ],
    links: {
      live: "https://tarikrashid.com",
      github: null,
    },
    timeline: "1-2 months",
    teamSize: "Solo Project",
    challenges: [
      "Real-time scholar statistics synchronization via SerpApi",
      "Optimizing for academic SEO and scholarly discoverability",
      "Managing complex content relationships across blog, courses, and research and publication, project and course"
    ],
    features: [
      "Custom CMS",
      "AI Integrated Chatbot",
      "Optimization, SEO & Responsive Design",
      "SerpApi Integration for Scholar Stats"
    ],
  },

  {
    title: "Dr. Aram Portfolio",
    description:
      "A comprehensive multi-language medical portfolio and educational blog developed for Dr. Aram. The platform provides a seamless experience for patients in multiple languages and serves as a hub for medical insights.",
    status: "DEPLOYED",
    year: "2025-2026",
    icon: (
      <img
        src="projects/draram/logo.png"
        alt="Dr. Aram Logo"
        className="w-10 h-10 object-contain"
      />
    ),
    images: [
      IconsAram.img1,
      IconsAram.img2,
      IconsAram.img3,
    ],
    tech: ["WordPress", "PHP", "Polylang (Multi-language)", "Rank Math SEO", "MySQL", "Cardioly Theme"],
    achievements: [
      "Set up Polylang for seamless English, Kurdish, and Arabic content management.",
      "Configured Rank Math SEO for better search visibility.",
      "Adapted the Cardioly theme to fully support RTL layouts."
    ],
    links: {
      live: "https://draram.com",
      github: null,
    },
    timeline: "3 months",
    teamSize: "Solo Project",
    challenges: [
      "Aligning theme elements correctly for both LTR and RTL languages.",
      "Ensuring consistent content synchronization across all languages."
    ],
    features: [
      "Multi-language Support (English/Kurdish/Arabic)",
      "SEO Optimized Content Structure",
      "Responsive Medical UI"
    ],
  },
  {
    title: "Rekan Group Official Website",
    description:
      "A modern corporate website for Rekan Group, featuring a multi-language platform, secure content management system, and responsive design optimized for SEO and performance.",
    status: "DEPLOYED",
    year: "2024-2026",
    icon: (
      <img
        src="/projects/Rekangroup/rekangroup.avif"
        alt="Rekan Group Logo"
        className="w-10 h-5 object-contain"
      />
    ),
    images: [
      IconsRekanGroup.lP,
      IconsRekanGroup.aU,
      IconsRekanGroup.p,
      IconsRekanGroup.pI,
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
      "Built a bilingual, mobile-responsive website for global accessibility",
      "Built a custom CMS that allows non-technical users to manage website content",
      "Optimized for SEO, performance, and accessibility",
    ],
    links: {
      live: "https://rekangroup.com",
      github: null, // private codebase
    },
    timeline: "3–6 months",
    teamSize: "Solo Project",
    challenges: [
      "Designing a scalable multi-language Website",
      "Managing dynamic state across pages",
      "Ensuring cross-browser and device compatibility",
    ],
    features: [
      "Multi-language support (English & Kurdish/Arabic)",
      "Real-time content updates via dashboard",
      "Advanced user authentication & authorization",
      "Responsive and mobile-friendly design",
      "SEO optimization with structured metadata",
    ],
  },


  {
    title: "Dr. Awara Rasoul Portfolio",
    description:
      "A professional digital presence for Dr. Awara, featuring a streamlined interface for patients to explore medical services and contact the clinic directly.",
    status: "DEPLOYED",
    year: "2025",
    icon: (
      <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center text-white font-bold text-xs rounded">
        Dr.
      </div>
    ),
    images: [
      IconsAwara.img1,
      IconsAwara.img2,
      IconsAwara.img3,
    ],
    tech: ["Next.js", "Tailwind CSS"],
    achievements: [
      "Built a modern, high-performance interface with smooth transitions.",
      "Optimized for SEO, performance, and accessibility",
    ],
    links: {
      live: "https://drawara.com",
      github: null,
    },
    timeline: "1–2 months",
    teamSize: "Solo Project",
    challenges: ["Creating a trustworthy and clean aesthetic."],
    features: ["Service Showcases", "Direct Contact Integration", "Responsive and mobile-friendly design"],
  }

  // Add more projects here with the same structure
]
