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
      "/projects/Rekangroup/projectImage.avif",
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
  },
  {
    title: "Portfolio Website",
    description:
      "A cyberpunk-themed portfolio website showcasing my skills, projects, and experience as a full-stack developer, built with modern web technologies and optimized for performance and accessibility.",
    status: "DEPLOYED",
    icon: (
      <img
        src="/bgLogo.avif"
        alt="Portfolio Logo"
        className="w-10 h-10 object-contain"
      />
    ),
    images: [
      "/projects/DeathTail/portfolio1.avif",
      "/projects/DeathTail/portfolio2.avif",
      "/projects/DeathTail/portfolio3.avif",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Framer Motion",
    ],
    achievements: [
      "Designed and implemented a unique cyberpunk aesthetic",
      "Showcased a variety of projects with detailed case studies",
      "Optimized for performance, accessibility, and SEO",
      "Deployed with continuous integration and HTTPS/SSL",
    ],
    links: {
      live: null, // this website
      github: "https://github.com/Death-Tail/cyberpunk-portfolio"
    },
    timeline: "1–4 months",
    teamSize: "Solo Project",
    challenges: [
      "Creating a cohesive cyberpunk design language",
      "Balancing visual effects with performance",
      "Implementing responsive layouts for all devices",
    ],
    features: [
      "Cyberpunk-themed UI design",
      "Responsive design for mobile and desktop",
      "SEO optimization and performance tuning",
      "Detailed project case studies",
      "Continuous deployment with Vercel",
    ],
    metrics: {
      performance: 93,
      accessibility: 90,
      seo: 88,
    },
  }

  // Add more projects here with the same structure
]
