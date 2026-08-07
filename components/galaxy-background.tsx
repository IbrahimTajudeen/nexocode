"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  alphaSpeed: number
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor((width * height) / 8000), 180)

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    }

    const starColors = ["#ffffff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#818cf8"]

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.8 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        alphaSpeed: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      })
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Twinkle effect
        p.alpha += p.alphaSpeed
        if (p.alpha >= 0.95 || p.alpha <= 0.25) {
          p.alphaSpeed = -p.alphaSpeed
        }

        // Mouse attraction physics
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius
          const angle = Math.atan2(dy, dx)
          // Gravitational pull toward cursor
          const pullStrength = force * 2.2
          p.x += Math.cos(angle) * pullStrength
          p.y += Math.sin(angle) * pullStrength
        } else {
          // Ambient drift
          p.x += p.vx
          p.y += p.vy

          // Return force to initial region
          const homeDx = p.originX - p.x
          const homeDy = p.originY - p.y
          p.x += homeDx * 0.01
          p.y += homeDy * 0.01
        }

        // Screen boundary wrap
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw star particle
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowBlur = p.size > 1.5 ? 6 : 0
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 hidden md:block opacity-70"
    />
  )
}
