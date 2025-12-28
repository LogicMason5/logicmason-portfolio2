"use client"

import { useEffect, useState } from "react"

export function SimpleCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only initialize after component mounts to avoid blocking startup
    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth updates without blocking
      if (rafId) cancelAnimationFrame(rafId)
      
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    // Use passive listener for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-[9999] simple-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 w-8 h-8 rounded-full bg-violet-500/20 blur-md -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-pulse" />
      
      {/* Middle glow */}
      <div className="absolute inset-0 w-6 h-6 rounded-full bg-purple-500/30 blur-sm -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
      
      {/* Main cursor dot */}
      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-500/50 border border-violet-300/50" />
    </div>
  )
}

