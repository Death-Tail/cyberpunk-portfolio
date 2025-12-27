import { Icons } from "@/public/projects/Rekangroup";
import { IconsP } from "@/public/projects/DeathTail";
import { IconsA } from "@/public/projects/draram";


export const projects = [


  {
    title: "Dr. Aram Portfolio",
    description:
      "A comprehensive multi-language medical portfolio and educational blog developed for Dr. Aram. The platform provides a seamless experience for patients in multiple languages and serves as a hub for medical insights.",
    status: "DEPLOYED",
    icon: (
      <img
        src="projects/draram/aramL.webp"
        alt="Dr. Aram Logo"
        className="w-10 h-10 object-contain"
      />
    ),
    images: [
      IconsA.img1,
      IconsA.img2,
      IconsA.img3,
    ],
    tech: ["WordPress", "PHP", "WPML (Multi-language)", "Advanced SEO", "MySQL"],
    achievements: [
      "Successfully implemented a full multi-language architecture for broader patient reach.",
      "Achieved high SEO rankings for medical services and educational content.",
      "Customized theme to ensure high performance despite heavy blog content."
    ],
    links: {
      live: "https://draram.com",
      github: null,
    },
    timeline: "1 months",
    teamSize: "Solo Project",
    challenges: [
      "Managing complex SEO metadata across multiple languages.",
      "Ensuring fast load times while maintaining a feature-rich WordPress environment."
    ],
    features: [
      "Multi-language Support (English/Kurdish/Arabic)",
      "Dynamic Blog System for Medical Articles",
      "SEO Optimized Content Structure",
      "Responsive Medical UI"
    ],
  },
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
      Icons.lP,
      Icons.aU,
      Icons.p,
      Icons.pI,
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
      live: null,
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
  },


  // {
  //   title: "Dr. Awara Portfolio",
  //   description:
  //     "A professional digital presence for Dr. Awara, featuring a streamlined interface for patients to explore medical services and contact the clinic directly.",
  //   status: "DEPLOYED",
  //   icon: (
  //     <img
  //       src="/drawara-logo.webp"
  //       alt="Dr. Awara Logo"
  //       className="w-10 h-10 object-contain"
  //     />
  //   ),
  //   images: [],
  //   tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
  //   achievements: [
  //     "Built a modern, high-performance interface with smooth transitions.",
  //     "Optimized the appointment inquiry flow for better user conversion."
  //   ],
  //   links: {
  //     live: "https://drawara.com",
  //     github: null,
  //   },
  //   timeline: "1–2 months",
  //   teamSize: "Solo Project",
  //   challenges: ["Creating a trustworthy and clean medical aesthetic."],
  //   features: ["Service Showcases", "Interactive UI Components", "Direct Contact Integration"],
  // }

  // Add more projects here with the same structure
]
