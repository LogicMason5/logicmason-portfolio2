"use client"

import { useEffect, useState, useRef, useCallback } from "react"

// ── Particle type (shared for petals and leaves) ──────────────────────────────
interface Particle {
  id: number
  x: number
  y: number
  angle: number
  rotation: number
  rotAxis: number   // 0=Z, 1=X, 2=Y — for 3D tumble feel
  scale: number
  color: string
  duration: number
  born: number
  type: "petal" | "leaf"
}

// ── Palettes ──────────────────────────────────────────────────────────────────
const SAKURA_COLORS = [
  "#ffb7c5","#ffc0cb","#ff91a4","#ffd1dc",
  "#ffaec9","#f4a7b9","#ffe4e8","#ff85a1",
]
const LEAF_COLORS = [
  "#4ade80","#22c55e","#16a34a","#86efac",
  "#bbf7d0","#6ee7b7","#34d399","#a7f3d0",
]

// ── 3D Sakura cursor ──────────────────────────────────────────────────────────
// Simulates depth by drawing back-petals slightly smaller/darker,
// front-petals slightly larger/brighter, and tilting the whole flower.
function SakuraCursor({ rot }: { rot: number }) {
  const petalPath = "M0,-11 C3,-11 7,-7 7,-3 C7,2 3,6 0,9 C-3,6 -7,2 -7,-3 C-7,-7 -3,-11 0,-11Z"
  const offset = 7

  // 5 petals with 3D depth simulation:
  // petals at angles 0,72,144,216,288 — we give each a Z-depth based on sin of angle
  const petals3D = [0, 72, 144, 216, 288].map((deg) => {
    const rad = (deg * Math.PI) / 180
    const tx = Math.sin(rad) * offset
    const ty = -Math.cos(rad) * offset
    // Simulate Z: petals "behind" (ty > 0) are smaller and darker
    const zFactor = 0.5 + 0.5 * (1 - ty / offset) // 0..1, 1=front
    const scale = 0.78 + zFactor * 0.22
    const brightness = 0.75 + zFactor * 0.25
    const pink = Math.round(183 + zFactor * 40)
    const color = `rgb(255,${pink},${Math.round(180 + zFactor * 17)})`
    return { deg, tx, ty, scale, color, zFactor }
  })
  // Sort back-to-front
  petals3D.sort((a, b) => a.zFactor - b.zFactor)

  // Leaf positions: 3 small leaves orbiting at 120° intervals, slightly offset
  const leaves = [0, 120, 240].map((deg, i) => {
    const rad = (deg * Math.PI) / 180
    const lx = Math.sin(rad) * 13
    const ly = -Math.cos(rad) * 13
    const zF = 0.5 + 0.5 * (1 - ly / 13)
    return { lx, ly, deg, zF, i }
  })
  leaves.sort((a, b) => a.zF - b.zF)

  return (
    <svg
      width={36} height={36}
      viewBox="-18 -18 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotateX(25deg) rotateZ(${rot}deg)`, transformStyle: "preserve-3d" }}
    >
      {/* Back leaves */}
      {leaves.filter(l => l.zF < 0.7).map(l => (
        <g key={`bl-${l.i}`} transform={`translate(${l.lx},${l.ly}) rotate(${l.deg + 90})`}
          opacity={0.55 + l.zF * 0.3}>
          <ellipse cx="0" cy="0" rx={2.2 * l.zF + 1} ry={4.5 * l.zF + 1.5}
            fill={l.i === 0 ? "#4ade80" : l.i === 1 ? "#22c55e" : "#86efac"} />
          <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="white" strokeWidth="0.4" opacity="0.4" />
        </g>
      ))}

      {/* Petals back-to-front */}
      {petals3D.map(({ deg, tx, ty, scale, color, zFactor }) => (
        <g key={deg} transform={`translate(${tx},${ty}) rotate(${deg}) scale(${scale})`}
          opacity={0.7 + zFactor * 0.3}>
          <path d={petalPath} fill={color} />
          <line x1="0" y1="-10" x2="0" y2="6"
            stroke="white" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
        </g>
      ))}

      {/* Front leaves */}
      {leaves.filter(l => l.zF >= 0.7).map(l => (
        <g key={`fl-${l.i}`} transform={`translate(${l.lx},${l.ly}) rotate(${l.deg + 90})`}
          opacity={0.75 + l.zF * 0.25}>
          <ellipse cx="0" cy="0" rx={2.2 * l.zF + 1} ry={4.5 * l.zF + 1.5}
            fill={l.i === 0 ? "#4ade80" : l.i === 1 ? "#22c55e" : "#86efac"} />
          <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="white" strokeWidth="0.4" opacity="0.4" />
        </g>
      ))}

      {/* Center stamen */}
      <circle cx="0" cy="0" r="3.8" fill="#ffe066" opacity="0.95" />
      <circle cx="0" cy="0" r="2.2" fill="#ffcc00" />
      {[0,60,120,180,240,300].map((d, i) => {
        const r = (d * Math.PI) / 180
        return <circle key={i} cx={Math.cos(r)*5.2} cy={Math.sin(r)*5.2} r="0.9" fill="#ffaa00" opacity="0.75" />
      })}
    </svg>
  )
}

// ── Single burst petal ────────────────────────────────────────────────────────
function BurstPetal({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 10 15" fill="none">
      <path d="M5 14 C1 10 0 6 1.5 2.5 C2.5 0.5 5 0 5 0 C5 0 7.5 0.5 8.5 2.5 C10 6 9 10 5 14Z"
        fill={color} fillOpacity="0.92" />
      <line x1="5" y1="13" x2="5" y2="2" stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

// ── Single burst leaf ─────────────────────────────────────────────────────────
function BurstLeaf({ color, size = 11 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 10 16" fill="none">
      {/* Leaf shape: pointed oval with slight curve */}
      <path d="M5 15 C1 11 0 7 1 3 C2 0.5 5 0 5 0 C5 0 8 0.5 9 3 C10 7 9 11 5 15Z"
        fill={color} fillOpacity="0.9" />
      {/* Midrib */}
      <line x1="5" y1="14" x2="5" y2="1" stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.35" />
      {/* Side veins */}
      <line x1="5" y1="5"  x2="2" y2="8"  stroke="white" strokeWidth="0.35" opacity="0.25" />
      <line x1="5" y1="5"  x2="8" y2="8"  stroke="white" strokeWidth="0.35" opacity="0.25" />
      <line x1="5" y1="9"  x2="2" y2="11" stroke="white" strokeWidth="0.35" opacity="0.2" />
      <line x1="5" y1="9"  x2="8" y2="11" stroke="white" strokeWidth="0.35" opacity="0.2" />
    </svg>
  )
}

// ── Animated burst particle ───────────────────────────────────────────────────
function BurstParticle({ p, now }: { p: Particle; now: number }) {
  const elapsed = now - p.born
  const progress = Math.min(elapsed / p.duration, 1)
  const ease = 1 - Math.pow(1 - progress, 3)

  const distance = 50 + p.scale * 40
  const rad = (p.angle * Math.PI) / 180
  const tx = Math.cos(rad) * distance * ease
  const ty = Math.sin(rad) * distance * ease + 45 * ease * ease  // gravity arc

  // 3D tumble: combine Z rotation with a perspective X or Y tilt
  const rotZ = p.rotation + 280 * ease * (p.scale > 0.6 ? 1 : -1)
  const rotX = p.rotAxis === 1 ? 180 * ease : 0
  const rotY = p.rotAxis === 2 ? 180 * ease : 0

  const opacity = progress < 0.2 ? 1 : 1 - (progress - 0.2) / 0.8

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: p.x, top: p.y,
        transform: `translate(-50%,-50%) translate(${tx}px,${ty}px) rotateZ(${rotZ}deg) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${p.scale})`,
        opacity,
        zIndex: 9998,
        willChange: "transform,opacity",
        perspective: "200px",
      }}
    >
      {p.type === "petal"
        ? <BurstPetal color={p.color} size={12} />
        : <BurstLeaf  color={p.color} size={11} />
      }
    </div>
  )
}

// ── Main cursor component ─────────────────────────────────────────────────────
export function SimpleCursor() {
  const [pos, setPos]         = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [, forceUpdate]       = useState(0)
  const [cursorRot, setCursorRot] = useState(0)
  const rafRef  = useRef<number | null>(null)
  const animRef = useRef<number | null>(null)
  const spinRef = useRef<number | null>(null)
  const idRef   = useRef(0)

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })
        setVisible(true)
      })
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave, { passive: true })
    document.addEventListener("mouseenter", onEnter, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Click burst — mix of petals and leaves
  const spawnBurst = useCallback((x: number, y: number) => {
    const total = 14 + Math.floor(Math.random() * 6)  // 14–19 particles
    const now = performance.now()
    const newParticles: Particle[] = Array.from({ length: total }, (_, i) => {
      const isLeaf = i % 3 === 2  // every 3rd particle is a leaf
      return {
        id: ++idRef.current,
        x, y,
        angle: (360 / total) * i + Math.random() * 18 - 9,
        rotation: Math.random() * 220,
        rotAxis: Math.floor(Math.random() * 3) as 0 | 1 | 2,
        scale: 0.45 + Math.random() * 0.9,
        color: isLeaf
          ? LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]
          : SAKURA_COLORS[Math.floor(Math.random() * SAKURA_COLORS.length)],
        duration: 700 + Math.random() * 550,
        born: now,
        type: isLeaf ? "leaf" : "petal",
      }
    })
    setParticles(prev => [...prev, ...newParticles])
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => spawnBurst(e.clientX, e.clientY)
    window.addEventListener("click", onClick)
    return () => window.removeEventListener("click", onClick)
  }, [spawnBurst])

  // Animation loop — drives burst re-renders & cleanup
  useEffect(() => {
    const loop = () => {
      const now = performance.now()
      setParticles(prev => prev.filter(p => now - p.born < p.duration + 50))
      forceUpdate(n => n + 1)
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  // Passive drip — spawn 1 particle every ~600ms from cursor position
  const posRef = useRef({ x: -100, y: -100 })
  useEffect(() => {
    posRef.current = pos
  }, [pos])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!visible) return
      const { x, y } = posRef.current
      const isLeaf = Math.random() < 0.35
      const now = performance.now()
      const p: Particle = {
        id: ++idRef.current,
        x, y,
        angle: 60 + Math.random() * 60,   // downward arc: 60°–120°
        rotation: Math.random() * 180,
        rotAxis: Math.floor(Math.random() * 3) as 0 | 1 | 2,
        scale: 0.3 + Math.random() * 0.45,
        color: isLeaf
          ? LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]
          : SAKURA_COLORS[Math.floor(Math.random() * SAKURA_COLORS.length)],
        duration: 900 + Math.random() * 600,
        born: now,
        type: isLeaf ? "leaf" : "petal",
      }
      setParticles(prev => [...prev, p])
    }, 580 + Math.random() * 200)
    return () => clearInterval(interval)
  }, [visible])
  useEffect(() => {
    let r = 0
    const spin = () => {
      r = (r + 0.28) % 360
      setCursorRot(r)
      spinRef.current = requestAnimationFrame(spin)
    }
    spinRef.current = requestAnimationFrame(spin)
    return () => { if (spinRef.current) cancelAnimationFrame(spinRef.current) }
  }, [])

  const now = performance.now()

  return (
    <>
      {visible && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%,-50%)",
            filter: "drop-shadow(0 0 5px rgba(255,183,197,0.9)) drop-shadow(0 0 8px rgba(74,222,128,0.4))",
            willChange: "transform",
            perspective: "120px",
          }}
        >
          <SakuraCursor rot={cursorRot} />
        </div>
      )}
      {particles.map(p => (
        <BurstParticle key={p.id} p={p} now={now} />
      ))}
    </>
  )
}
