"use client"

import { useEffect, useRef } from "react"

interface FogParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  radius: number
}

export function SimpleMouseFog() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<FogParticle[]>([])
  const mouseRef = useRef({ x: -999, y: -999 })
  const animationFrameRef = useRef<number>()

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
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      // Create fog particles around cursor
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.3,
          life: 1,
          size: Math.random() * 40 + 30,
          radius: Math.random() * 50 + 40,
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.vx += (Math.random() - 0.5) * 0.08
        particle.vy += (Math.random() - 0.5) * 0.08 - 0.015
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.002
        particle.size += 0.3
        particle.radius += 0.5

        if (particle.life <= 0) return false

        ctx.save()
        ctx.globalAlpha = particle.life * 0.4
        ctx.filter = `blur(${particle.size}px)`

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius)

        gradient.addColorStop(0, `rgba(147, 112, 219, ${particle.life * 0.3})`)
        gradient.addColorStop(1, "rgba(147, 112, 219, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
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
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" style={{ mixBlendMode: "multiply" }} />
  )
}
