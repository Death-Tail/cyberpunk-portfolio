"use client"

import { useEffect, useRef } from "react"

export function HexGrid() {
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
      drawHexGrid()
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    // Draw hex grid
    function drawHexGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const hexSize = 60
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

      // Choose color randomly
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        ctx.strokeStyle = "rgba(0, 255, 224, 0.1)" // Cyan
      } else if (colorChoice < 0.66) {
        ctx.strokeStyle = "rgba(255, 0, 255, 0.1)" // Magenta
      } else {
        ctx.strokeStyle = "rgba(57, 255, 20, 0.1)" // Green
      }

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
        const glitchX = x + (Math.random() * 10 - 5)
        const glitchY = y + (Math.random() * 10 - 5)
        const glitchSize = size * 0.9

        ctx.beginPath()

        // Different color for glitch
        if (colorChoice < 0.33) {
          ctx.strokeStyle = "rgba(255, 0, 255, 0.15)" // Magenta
        } else if (colorChoice < 0.66) {
          ctx.strokeStyle = "rgba(57, 255, 20, 0.15)" // Green
        } else {
          ctx.strokeStyle = "rgba(0, 255, 224, 0.15)" // Cyan
        }

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
