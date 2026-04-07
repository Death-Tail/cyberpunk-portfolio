import React from 'react';
import Image from 'next/image';
import bgImg from "@/public/bg.jpg";

export const metadata = {
  title: "Links | Dyari Ali Tahir",
  description: "Connect with me across various platforms.",
}

const links = [
  { name: "Email", url: "mailto:dyarialitaher03@gmail.com", icon: "/Icons/gmail.avif", handle: "dyarialitaher03@gmail.com" },
  { name: "GitHub", url: "https://github.com/Death-Tail", icon: "/Icons/github.avif", handle: "Death-Tail" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/dyarialitahir/", icon: "/Icons/linkedin.avif", handle: "Dyari Ali Tahir" },
  { name: "X", url: "https://x.com/Death_Tail0331", icon: "/Icons/x.avif", handle: "@Death_Tail0331" },
  { name: "Instagram", url: "https://www.instagram.com/dyari_ali_taher/", icon: "/Icons/instagram.avif", handle: "@dyari_ali_taher" },
];

const LinksPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-4 relative overflow-hidden font-sans selection:bg-memory-pink/30 text-stone-900">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImg}
          alt="Background"
          fill
          className="object-cover object-center select-none pointer-events-none opacity-90"
          priority
        />
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-memory-pink/5 mix-blend-overlay pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">

        {/* Profile Image - Glassmorphic Container Style */}
        <div className="relative mb-6 group cursor-pointer rounded-full p-1.5 bg-white/40 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center hover:bg-white/60 transition-colors">
          <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-inner">
            <Image
              src="/L.jpg"
              alt="Dyari Ali Tahir"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        {/* Info */}
        <h1 className="text-2xl font-black text-stone-900 mb-2 tracking-wider drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">Dyari Ali Tahir</h1>
        <div className="bg-white/40 backdrop-blur-md shadow-sm border border-white/60 py-1.5 px-4 rounded-full max-w-fit mb-8 hover:bg-white/60 transition-colors cursor-default">
          <p className="text-stone-700 tracking-widest text-[10px] font-black uppercase text-center w-full">@death_tail</p>
        </div>

        {/* Links - Memory Theme Light Glass Style */}
        <div className="w-full space-y-4">
          {links.map((link, i) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-full p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 hover:-translate-y-1 transition-all duration-300 group backdrop-blur-xl shadow-lg relative overflow-hidden"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
            >
              {/* Icon Container */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-white/80 shadow-inner p-2.5 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10 border border-white/50">
                <img src={link.icon} alt={link.name} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 min-w-0 relative z-10">
                <h2 className="text-stone-900 font-bold text-sm tracking-wide">{link.name}</h2>
                <p className="text-stone-600 text-xs font-bold truncate tracking-tight">{link.handle}</p>
              </div>

              {/* Arrow Icon */}
              <div className="shrink-0 text-stone-400 group-hover:text-memory-pink group-hover:translate-x-1 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
