"use client"

import { useEffect, useState } from "react"

/**
 * Japanese-inspired accent components that add visual flair without affecting movement performance
 */

export function JapaneseSakuraBlossoms() {
  const [blossoms, setBlossoms] = useState<
    Array<{
      id: string
      x: number
      delay: number
      duration: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    const generateBlossoms = () => {
      const newBlossoms = Array.from({ length: 8 }, (_, i) => ({
        id: `blossom-${Date.now()}-${i}`,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 8 + Math.random() * 4,
        opacity: Math.random() * 0.6 + 0.3,
      }))
      setBlossoms(newBlossoms)
    }

    generateBlossoms()
    const interval = setInterval(generateBlossoms, 12000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {blossoms.map((blossom) => (
        <div
          key={blossom.id}
          className="absolute animate-float"
          style={{
            left: `${blossom.x}%`,
            top: "-20px",
            opacity: blossom.opacity,
            animationDelay: `${blossom.delay}s`,
            animationDuration: `${blossom.duration}s`,
          }}
        >
          <div className="text-pink-300 dark:text-pink-400 text-2xl">✿</div>
        </div>
      ))}
    </div>
  )
}

export function JapaneseBambooPattern() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none opacity-5 dark:opacity-10 h-24">
      <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="bamboo" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse">
            <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="60" x2="30" y2="60" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="80" x2="30" y2="80" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="100" fill="url(#bamboo)" />
      </svg>
    </div>
  )
}

export function JapaneseKamon() {
  return (
    <div className="fixed top-8 right-8 pointer-events-none opacity-20 dark:opacity-30">
      <svg width="60" height="60" viewBox="0 0 60 60" className="text-foreground">
        <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />

        {/* Geometric pattern inspired by traditional Japanese crests */}
        <path d="M 30 10 L 40 20 L 40 40 Q 30 48 20 40 L 20 20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <line x1="30" y1="10" x2="30" y2="48" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
      </svg>
    </div>
  )
}

export function JapaneseMountains() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none opacity-10 dark:opacity-20 h-32">
      <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M 0 150 L 200 80 L 300 120 L 450 60 L 600 100 L 750 70 L 900 110 L 1050 85 L 1200 120 L 1200 200 L 0 200 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 0 180 L 300 140 L 600 160 L 900 135 L 1200 155 L 1200 200 L 0 200 Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </div>
  )
}
