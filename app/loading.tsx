"use client"

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">

      {/* Soft teal ambient glow */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-emerald-500/10 blur-3xl" />

      {/* Glass card */}
      <div className="
        px-10 py-8 rounded-3xl
        bg-zinc-900/40 backdrop-blur-xl
        border border-white/10
        shadow-[0_0_40px_rgba(0,0,0,0.4)]
        flex flex-col items-center gap-4 z-10
      ">

        {/* Spinner */}
        <div className="
          w-12 h-12
          border-2 border-indigo-400/40
          border-t-indigo-400
          rounded-full animate-spin
        " />

        {/* Text */}
        <div className="text-center">
          <h2 className="text-white font-medium text-lg tracking-wide">
            Loading...
          </h2>
          <p className="text-indigo-400/70 text-sm mt-1">
            Preparing your experience
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-indigo-400/20 rounded-full blur-md"
            style={{
              width: Math.random() * 6 + 4 + "px",
              height: Math.random() * 6 + 4 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `float ${5 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Float animation */}
      <style>
        {`
          @keyframes float {
            0%   { transform: translateY(0px) translateX(0px); opacity: 0.5; }
            50%  { transform: translateY(-20px) translateX(10px); opacity: 1; }
            100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          }
        `}
      </style>
    </div>
  )
}
