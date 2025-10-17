// Shared project data for both desktop and mobile


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
      "/projects/Rekangroup/RekanGroupLandingpic.avif",
      "/projects/Rekangroup/RekangroupAboutus.avif",
      "/projects/Rekangroup/RekangroupProjects.avif",
      "/projects/Rekangroup/project image.png",
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
    title: "Alsamadi Official Website",
    description:
      "A personal/business informational website built for Alsamadi, providing a professional online presence with basic content management, domain setup, and SSL integration.",
    status: "DEPLOYED",
    icon: (
      <img
        src="/projects/Alsamadi/alsamadi-logo.avif"
        alt="Alsamadi Logo"
        className="w-10 h-10 object-contain"
      />
    ),
    images: [
      "/projects/Alsamadi/alsamadiHero.avif",
      "/projects/Alsamadi/alsamadiAboutUs.avif",
      "/projects/Alsamadi/AlsamadiAboutUs2.avif",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Framer Motion",
    ],
    achievements: [
      "Successfully set up custom domain with DNS configuration",
      "Installed and configured SSL/TLS certificates for secure browsing",
      "Deployed a responsive and professional informational website",
      "Optimized for basic SEO and fast loading times"
    ],
    links: {
      live: "https://alsamadi.info",
      github: null // private / not published
    },
    timeline: "1 months",
    teamSize: "Solo Project",
    challenges: [
      "Configuring DNS records and email setup with Namecheap",
      "Maintaining fast performance on shared hosting"
    ],
    features: [
      "Clean, mobile-friendly design",
      "Basic informational sections (Home, About, Contact)",
      "SSL encryption for secure connections",
      "Custom domain integration",
      "SEO-ready structure for indexing"
    ],
    metrics: {
      performance: 85,
      accessibility: 88,
      seo: 80
    }
  }

  // Add more projects here with the same structure
]
