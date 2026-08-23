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

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
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

    // Medium star count: ~380 stars on desktop
    const particleCount = Math.min(Math.floor((width * height) / 3200), 380)

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      blackHoleScale: 0,
      radius: 260,
    }

    const starColors = [
      "#ffffff",
      "#f0f9ff",
      "#e0f2fe",
      "#bae6fd",
      "#7dd3fc",
      "#38bdf8",
      "#818cf8",
      "#a855f7",
      "#c084fc",
      "#fef08a",
    ]

    const accretionColors = ["#38bdf8", "#818cf8", "#c084fc", "#f43f5e", "#ffffff"]

    const particles: Particle[] = []
    const sparks: Spark[] = []

    function createParticle(randomPos = true): Particle {
      let x = Math.random() * width
      let y = Math.random() * height

      if (!randomPos) {
        // Spawn from edges when consumed by black hole
        const side = Math.floor(Math.random() * 4)
        if (side === 0) {
          x = Math.random() * width
          y = -10
        } else if (side === 1) {
          x = width + 10
          y = Math.random() * height
        } else if (side === 2) {
          x = Math.random() * width
          y = height + 10
        } else {
          x = -10
          y = Math.random() * height
        }
      }

      return {
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.9 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        alpha: Math.random() * 0.75 + 0.25,
        alphaSpeed: (Math.random() * 0.012 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true))
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX
        mouse.targetY = e.touches[0].clientY
        mouse.active = true
      }
    }

    const handleTouchEnd = () => {
      mouse.active = false
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    let accretionRotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth lerp mouse position
      if (mouse.x === -1000) {
        mouse.x = mouse.targetX
        mouse.y = mouse.targetY
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.15
        mouse.y += (mouse.targetY - mouse.y) * 0.15
      }

      // Smooth black hole activation scale
      const targetScale = mouse.active ? 1 : 0
      mouse.blackHoleScale += (targetScale - mouse.blackHoleScale) * 0.08

      const bhScale = mouse.blackHoleScale
      const singularityRadius = 16 * bhScale
      const gravRadius = mouse.radius * Math.max(bhScale, 0.1)

      accretionRotation += 0.03

      // 1. Draw Stars & Physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Twinkle effect
        p.alpha += p.alphaSpeed
        if (p.alpha >= 0.95 || p.alpha <= 0.2) {
          p.alphaSpeed = -p.alphaSpeed
        }

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        let isPulled = false

        if (bhScale > 0.05 && dist < gravRadius && dist > 0) {
          isPulled = true
          const normalizedDist = dist / gravRadius
          const force = Math.pow(1 - normalizedDist, 1.6)

          const angle = Math.atan2(dy, dx)
          // Radial pull force towards black hole core
          const pullSpeed = force * 4.5 * (1 + bhScale * 0.5)
          // Tangential accretion swirl force (vortex effect)
          const swirlSpeed = force * 3.2

          p.x += Math.cos(angle) * pullSpeed + Math.cos(angle + Math.PI / 2) * swirlSpeed
          p.y += Math.sin(angle) * pullSpeed + Math.sin(angle + Math.PI / 2) * swirlSpeed

          // Event Horizon Absorption
          if (dist < singularityRadius + 4 && bhScale > 0.3) {
            // Spawn sparks when swallowed
            for (let s = 0; s < 3; s++) {
              const sparkAngle = Math.random() * Math.PI * 2
              const sparkSpeed = Math.random() * 2 + 1
              sparks.push({
                x: p.x,
                y: p.y,
                vx: Math.cos(sparkAngle) * sparkSpeed,
                vy: Math.sin(sparkAngle) * sparkSpeed,
                size: Math.random() * 1.5 + 0.8,
                color: accretionColors[Math.floor(Math.random() * accretionColors.length)],
                alpha: 1,
                life: 0,
                maxLife: Math.random() * 15 + 10,
              })
            }

            // Respawn star at outer boundaries
            particles[i] = createParticle(false)
            continue
          }
        } else {
          // Normal drifting motion when outside black hole influence
          p.x += p.vx
          p.y += p.vy

          // Gentle return to home origin
          const homeDx = p.originX - p.x
          const homeDy = p.originY - p.y
          p.x += homeDx * 0.008
          p.y += homeDy * 0.008

          // Screen boundary wrap
          if (p.x < -20) p.x = width + 20
          if (p.x > width + 20) p.x = -20
          if (p.y < -20) p.y = height + 20
          if (p.y > height + 20) p.y = -20
        }

        // Render Star with dynamic stretch/tail when being pulled into Black Hole
        ctx.save()
        ctx.globalAlpha = Math.min(Math.max(p.alpha, 0.1), 1)

        if (isPulled && dist < 140) {
          // Gravitational Lensing stretch towards singularity
          const tailLen = Math.min((140 - dist) * 0.15, 12)
          const angle = Math.atan2(dy, dx)

          ctx.strokeStyle = p.color
          ctx.lineWidth = p.size
          ctx.lineCap = "round"
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x + Math.cos(angle) * tailLen, p.y + Math.sin(angle) * tailLen)
          ctx.stroke()
        } else {
          // Standard star rendering
          ctx.fillStyle = p.color
          if (p.size > 1.4) {
            ctx.shadowBlur = 8
            ctx.shadowColor = p.color
          }
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      // 2. Render Accretion Sparks (consumed star energy)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.life++
        s.alpha = 1 - s.life / s.maxLife

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = s.alpha
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // 3. Render Black Hole at Cursor Position
      if (bhScale > 0.01) {
        ctx.save()
        ctx.translate(mouse.x, mouse.y)

        // Layer 1: Gravitational Lensing Ambient Glow (Outer aura)
        const outerGrad = ctx.createRadialGradient(0, 0, singularityRadius, 0, 0, 180 * bhScale)
        outerGrad.addColorStop(0, "rgba(56, 189, 248, 0.35)")
        outerGrad.addColorStop(0.2, "rgba(168, 85, 247, 0.2)")
        outerGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.08)")
        outerGrad.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = outerGrad
        ctx.beginPath()
        ctx.arc(0, 0, 180 * bhScale, 0, Math.PI * 2)
        ctx.fill()

        // Layer 2: Swirling Accretion Disk Ring
        ctx.rotate(accretionRotation)

        // Draw double swirling photon arcs
        for (let arcIndex = 0; arcIndex < 3; arcIndex++) {
          const arcAngle = (arcIndex * Math.PI * 2) / 3
          const rInner = singularityRadius * 1.1 + 4
          const rOuter = singularityRadius * 1.8 + 10

          const ringGrad = ctx.createLinearGradient(
            Math.cos(arcAngle) * rInner,
            Math.sin(arcAngle) * rInner,
            Math.cos(arcAngle + 1.2) * rOuter,
            Math.sin(arcAngle + 1.2) * rOuter
          )
          ringGrad.addColorStop(0, "rgba(56, 189, 248, 0.9)")
          ringGrad.addColorStop(0.5, "rgba(192, 132, 252, 0.8)")
          ringGrad.addColorStop(1, "rgba(244, 63, 94, 0.1)")

          ctx.strokeStyle = ringGrad
          ctx.lineWidth = 3.5 * bhScale
          ctx.lineCap = "round"
          ctx.beginPath()
          ctx.arc(0, 0, rInner + arcIndex * 4 * bhScale, arcAngle, arcAngle + 1.4)
          ctx.stroke()
        }

        // Layer 3: Photon Event Horizon Ring (Bright Edge)
        ctx.rotate(-accretionRotation * 1.5) // Counter-rotate photon ring
        ctx.shadowBlur = 16 * bhScale
        ctx.shadowColor = "#38bdf8"
        ctx.strokeStyle = "#e0f2fe"
        ctx.lineWidth = 2.5 * bhScale
        ctx.beginPath()
        ctx.arc(0, 0, singularityRadius * 1.15, 0, Math.PI * 2)
        ctx.stroke()

        // Layer 4: Deep Black Hole Event Horizon Singularity (Dark Core)
        ctx.shadowBlur = 0
        const holeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, singularityRadius)
        holeGrad.addColorStop(0, "#000000")
        holeGrad.addColorStop(0.85, "#030712")
        holeGrad.addColorStop(1, "#0f172a")

        ctx.fillStyle = holeGrad
        ctx.beginPath()
        ctx.arc(0, 0, singularityRadius, 0, Math.PI * 2)
        ctx.fill()

        // Layer 5: High-Precision Core Pointer Dot (Cursor Center)
        ctx.fillStyle = "#38bdf8"
        ctx.shadowBlur = 8
        ctx.shadowColor = "#38bdf8"
        ctx.beginPath()
        ctx.arc(0, 0, 2.2 * bhScale, 0, Math.PI * 2)
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
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full opacity-85"
    />
  )
}

