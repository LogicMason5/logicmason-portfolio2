"use client"

import { useEffect, useRef } from "react"

interface SmokeParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  hue: number
}

export function RainbowCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<SmokeParticle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const animationFrameRef = useRef<number>()
  const hueRef = useRef(0)
  const trailRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef({ x: 0, y: 0 })
  const requestRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseRef.current.x
      const dy = e.clientY - mouseRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      mouseRef.current.prevX = mouseRef.current.x
      mouseRef.current.prevY = mouseRef.current.y
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      if (distance > 1) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 30,
            y: e.clientY + (Math.random() - 0.5) * 30,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8 - 0.5,
            life: 1,
            size: Math.random() * 30 + 20,
            hue: hueRef.current + (Math.random() - 0.5) * 30,
          })
        }
        hueRef.current = (hueRef.current + 2) % 360
      }

      const trail = trailRef.current
      if (!trail) return

      const particles: HTMLDivElement[] = []
      const particleCount = 15

      // Create particle elements
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.className = "cursor-particle"
        particle.style.cssText = `
          position: fixed;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.3s ease;
          will-change: transform;
        `
        trail.appendChild(particle)
        particles.push(particle)
      }

      let currentIndex = 0
      let lastTime = 0
      const throttleDelay = 16 // ~60fps

      if (e.clientX !== cursorRef.current.x || e.clientY !== cursorRef.current.y) {
        const currentTime = Date.now()
        if (currentTime - lastTime < throttleDelay) return

        lastTime = currentTime
        cursorRef.current.x = e.clientX
        cursorRef.current.y = e.clientY

        const particle = particles[currentIndex]
        const hue = (currentIndex * (360 / particleCount)) % 360

        particle.style.cssText = `
          position: fixed;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          transform: translate(-50%, -50%);
          background: hsl(${hue}, 80%, 60%);
          box-shadow: 0 0 10px hsl(${hue}, 80%, 60%);
          opacity: 1;
          will-change: transform, opacity;
        `

        setTimeout(() => {
          particle.style.opacity = "0"
        }, 300)

        currentIndex = (currentIndex + 1) % particleCount
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.vx += (Math.random() - 0.5) * 0.1
        particle.vy += (Math.random() - 0.5) * 0.1 - 0.02
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.003
        particle.size += 0.4

        if (particle.life <= 0) return false

        ctx.save()
        ctx.globalAlpha = particle.life * 0.6
        ctx.filter = `blur(${particle.size / 2}px)`

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
        const color1 = `hsla(${particle.hue}, 80%, 60%, ${particle.life * 0.8})`
        const color2 = `hsla(${(particle.hue + 60) % 360}, 70%, 50%, 0)`

        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        return true
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" style={{ mixBlendMode: "screen" }} />
      <div ref={trailRef} className="fixed inset-0 pointer-events-none" />
    </div>
  )
}
