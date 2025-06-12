"use client"

import { useEffect, useRef } from "react"

export function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawHexPattern()
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    // Draw hex pattern
    function drawHexPattern() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const hexSize = 40
      const hexHeight = hexSize * Math.sqrt(3)
      const hexWidth = hexSize * 2
      const horizontalSpacing = hexWidth * 0.75
      const verticalSpacing = hexHeight

      // Calculate number of hexagons needed
      const columns = Math.ceil(canvas.width / horizontalSpacing) + 1
      const rows = Math.ceil(canvas.height / verticalSpacing) + 1

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < columns; col++) {
          const x = col * horizontalSpacing
          const y = row * verticalSpacing + (col % 2 === 0 ? 0 : hexHeight / 2)

          // Only draw some hexagons for a sparse effect
          if (Math.random() > 0.85) {
            drawHexagon(x, y, hexSize)
          }
        }
      }
    }

    function drawHexagon(x: number, y: number, size: number) {
      ctx.beginPath()
      ctx.strokeStyle = "rgba(249, 115, 22, 0.1)" // Orange
      ctx.lineWidth = 1

      // Draw hexagon
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const xPoint = x + size * Math.cos(angle)
        const yPoint = y + size * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(xPoint, yPoint)
        } else {
          ctx.lineTo(xPoint, yPoint)
        }
      }

      ctx.closePath()
      ctx.stroke()

      // Add glitch effect to some hexagons
      if (Math.random() > 0.7) {
        const glitchX = x + (Math.random() * 5 - 2.5)
        const glitchY = y + (Math.random() * 5 - 2.5)
        const glitchSize = size * 0.95

        ctx.beginPath()
        ctx.strokeStyle = "rgba(249, 115, 22, 0.15)" // Brighter orange

        // Draw glitched hexagon
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i
          const xPoint = glitchX + glitchSize * Math.cos(angle)
          const yPoint = glitchY + glitchSize * Math.sin(angle)

          if (i === 0) {
            ctx.moveTo(xPoint, yPoint)
          } else {
            ctx.lineTo(xPoint, yPoint)
          }
        }

        ctx.closePath()
        ctx.stroke()
      }
    }

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30" style={{ pointerEvents: "none" }} />
}
