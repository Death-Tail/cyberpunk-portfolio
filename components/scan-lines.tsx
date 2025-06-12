export function ScanLines() {
  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(249, 115, 22, 0.03),
            rgba(249, 115, 22, 0.03) 1px,
            transparent 1px,
            transparent 2px
          )
        `,
        backgroundSize: "100% 2px",
        mixBlendMode: "overlay",
        opacity: 0.5,
      }}
    ></div>
  )
}
