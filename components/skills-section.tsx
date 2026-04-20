"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiKotlin, SiFlutter,
  SiNodedotjs, SiDjango, SiFastapi, SiLaravel,
  SiPostgresql, SiMongodb, SiNginx, SiDocker,
  SiAmazon, SiPython, SiCplusplus, SiTensorflow, SiHuggingface,
  SiGo, SiRust, SiKubernetes,
} from "react-icons/si"
import { TbBrandReactNative } from "react-icons/tb"
import { FaJava } from "react-icons/fa"
import { useI18n } from "@/lib/i18n"

// ── Custom icons ──────────────────────────────────────────────────────────────
function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 14.899a7 7 0 1 1 13.8-1" />
      <path d="M16 14h1a4 4 0 0 0 0-8h-.5A5.5 5.5 0 0 0 5 10v1" />
    </svg>
  )
}
function LangChainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold">LC</text>
    </svg>
  )
}
function N8nIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="bold">n8n</text>
    </svg>
  )
}

// ── Skill data ────────────────────────────────────────────────────────────────
const skills = [
  { name: "React",        icon: SiReact,            pct: 98, color: "#61DAFB" },
  { name: "Next.js",      icon: SiNextdotjs,        pct: 95, color: "#888888" },
  { name: "Vue",          icon: SiVuedotjs,         pct: 90, color: "#4FC08D" },
  { name: "React Native", icon: TbBrandReactNative, pct: 95, color: "#61DAFB" },
  { name: "Kotlin",       icon: SiKotlin,           pct: 95, color: "#7F52FF" },
  { name: "Flutter",      icon: SiFlutter,          pct: 90, color: "#54C5F8" },
  { name: "Node.js",      icon: SiNodedotjs,        pct: 95, color: "#68A063" },
  { name: "Django",       icon: SiDjango,           pct: 90, color: "#44B78B" },
  { name: "FastAPI",      icon: SiFastapi,          pct: 90, color: "#009688" },
  { name: "Laravel",      icon: SiLaravel,          pct: 95, color: "#FF2D20" },
  { name: "Java",         icon: FaJava,             pct: 95, color: "#5382A1" },
  { name: "PostgreSQL",   icon: SiPostgresql,       pct: 95, color: "#4169E1" },
  { name: "MongoDB",      icon: SiMongodb,          pct: 90, color: "#47A248" },
  { name: "Nginx",        icon: SiNginx,            pct: 85, color: "#009639" },
  { name: "Docker",       icon: SiDocker,           pct: 90, color: "#2496ED" },
  { name: "Cloud",        icon: CloudIcon,          pct: 85, color: "#FF9900" },
  { name: "AWS",          icon: SiAmazon,           pct: 90, color: "#FF9900" },
  { name: "Python",       icon: SiPython,           pct: 95, color: "#3776AB" },
  { name: "C++",          icon: SiCplusplus,        pct: 90, color: "#00599C" },
  { name: "TensorFlow",   icon: SiTensorflow,       pct: 90, color: "#FF6F00" },
  { name: "LangChain",    icon: LangChainIcon,      pct: 85, color: "#4169E1" },
  { name: "Hugging Face", icon: SiHuggingface,      pct: 80, color: "#FFD21E" },
  { name: "Go",           icon: SiGo,               pct: 85, color: "#00ADD8" },
  { name: "Rust",         icon: SiRust,             pct: 85, color: "#CE422B" },
  { name: "Kubernetes",   icon: SiKubernetes,       pct: 80, color: "#326CE5" },
  { name: "n8n",          icon: N8nIcon,            pct: 80, color: "#EA4B71" },
]

// ── Distribute N points evenly on a sphere (Fibonacci lattice) ───────────────
function fibonacciSphere(n: number, radius: number) {
  const pts: [number, number, number][] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius])
  }
  return pts
}

// ── Project 3D → 2D (simple perspective) ─────────────────────────────────────
function project(
  x: number, y: number, z: number,
  rotX: number, rotY: number,
  cx: number, cy: number,
  fov: number,
) {
  // Rotate around Y
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
  const x1 = x * cosY + z * sinY
  const z1 = -x * sinY + z * cosY
  // Rotate around X
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
  const y2 = y * cosX - z1 * sinX
  const z2 = y * sinX + z1 * cosX

  const depth = fov / (fov + z2)
  return {
    sx: cx + x1 * depth,
    sy: cy + y2 * depth,
    depth,
    z: z2,
  }
}

// ── Projected node type ───────────────────────────────────────────────────────
interface ProjectedNode {
  idx: number
  sx: number
  sy: number
  scale: number
  opacity: number
  z: number
}

// ── Main component ────────────────────────────────────────────────────────────
export function SkillsSection() {
  const { tr } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const desktopSphereRef = useRef<HTMLDivElement>(null)
  const mobileSphereRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  // Rotation state
  const rotX = useRef(0.3)
  const rotY = useRef(0)
  const velX = useRef(0)
  const velY = useRef(0.003)   // auto-spin speed
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })

  // Hover
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [nodes, setNodes] = useState<ProjectedNode[]>([])

  const N = skills.length
  const SPHERE_R = 220
  const FOV = 600

  // Base positions on sphere
  const basePositions = useRef(fibonacciSphere(N, SPHERE_R))

  // ── Canvas size ─────────────────────────────────────────────────────────────
  const [size, setSize] = useState({ w: 800, h: 520 })
  useEffect(() => {
    const update = () => {
      // Desktop sphere is fixed 520×520; mobile uses full container width
      const desktop = desktopSphereRef.current
      const mobile = mobileSphereRef.current
      if (desktop && desktop.offsetParent !== null) {
        setSize({ w: 520, h: 520 })
      } else if (mobile) {
        setSize({ w: mobile.clientWidth || 360, h: 420 })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // ── Project all nodes ───────────────────────────────────────────────────────
  const projectNodes = useCallback(() => {
    const cx = size.w / 2
    const cy = size.h / 2
    return basePositions.current.map((pos, i) => {
      const { sx, sy, depth, z } = project(pos[0], pos[1], pos[2], rotX.current, rotY.current, cx, cy, FOV)
      // depth in [0.5..1] → scale 0.55..1.0, opacity 0.3..1.0
      const scale = 0.55 + depth * 0.45
      const opacity = 0.28 + depth * 0.72
      return { idx: i, sx, sy, scale, opacity, z }
    })
  }, [size, FOV])

  // ── Draw connection lines on canvas ────────────────────────────────────────
  const drawLines = useCallback((projected: ProjectedNode[]) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Connect each node to its 3 nearest neighbours
    const sorted = [...projected].sort((a, b) => b.z - a.z)
    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i]
      // find 3 closest
      const dists = sorted
        .filter((_, j) => j !== i)
        .map(b => ({ b, d: Math.hypot(a.sx - b.sx, a.sy - b.sy) }))
        .sort((x, y) => x.d - y.d)
        .slice(0, 3)

      for (const { b, d } of dists) {
        if (d > 160) continue
        const alpha = (1 - d / 160) * 0.18 * Math.min(a.opacity, b.opacity)
        const col = skills[a.idx].color
        ctx.beginPath()
        ctx.moveTo(a.sx, a.sy)
        ctx.lineTo(b.sx, b.sy)
        ctx.strokeStyle = col + Math.round(alpha * 255).toString(16).padStart(2, "0")
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
    }
  }, [])

  // ── Animation loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    const loop = () => {
      if (!isDragging.current) {
        rotY.current += velY.current
        rotX.current += velX.current
        velX.current *= 0.97
        // gentle bob
        rotX.current = 0.25 + Math.sin(Date.now() * 0.0003) * 0.12
      }
      const projected = projectNodes()
      setNodes(projected)
      drawLines(projected)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [projectNodes, drawLines])

  // ── Drag to rotate ──────────────────────────────────────────────────────────
  useEffect(() => {
    const el = desktopSphereRef.current ?? mobileSphereRef.current ?? containerRef.current
    if (!el) return
    const els = [desktopSphereRef.current, mobileSphereRef.current].filter(Boolean) as HTMLDivElement[]
    if (els.length === 0) return

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true
      const pt = "touches" in e ? e.touches[0] : e
      lastMouse.current = { x: pt.clientX, y: pt.clientY }
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return
      const pt = "touches" in e ? e.touches[0] : e
      const dx = pt.clientX - lastMouse.current.x
      const dy = pt.clientY - lastMouse.current.y
      rotY.current += dx * 0.005
      rotX.current += dy * 0.005
      velY.current = dx * 0.005
      velX.current = dy * 0.005
      lastMouse.current = { x: pt.clientX, y: pt.clientY }
    }
    const onUp = () => { isDragging.current = false }

    els.forEach(e => {
      e.addEventListener("mousedown", onDown)
      e.addEventListener("touchstart", onDown, { passive: true })
    })
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove, { passive: true })
    window.addEventListener("touchend", onUp)
    return () => {
      els.forEach(e => {
        e.removeEventListener("mousedown", onDown)
        e.removeEventListener("touchstart", onDown)
      })
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [])

  // Sort nodes back-to-front for correct overlap
  const sortedNodes = [...nodes].sort((a, b) => a.z - b.z)

  // ── Certificate data ────────────────────────────────────────────────────────
  const certsLeft = [
    { src: "/skill1.png", alt: "ThynkTech Back-End Certificate" },
    { src: "/skill2.png", alt: "ALX AI Career Essentials Certificate" },
    { src: "/skill3.png", alt: "HackerRank Rest API Certificate" },
  ]
  const certsRight = [
    { src: "/skill4.png", alt: "Anthropic AI Fluency Certificate" },
    { src: "/skill5.png", alt: "Andela Technical Leadership Certificate" },
    { src: "/skill6.png", alt: "AWS Certified Cloud Practitioner" },
  ]

  // ── Certificate column component ────────────────────────────────────────────
  const CertColumn = ({ certs }: { certs: { src: string; alt: string }[] }) => (
    <div className="flex flex-col gap-3 w-full">
      {certs.map((cert, i) => (
        <div
          key={i}
          className="relative w-full rounded-xl border border-violet-500/15 overflow-hidden"
          style={{
            background: "rgba(15,10,30,0.5)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <Image
            src={cert.src}
            alt={cert.alt}
            width={400}
            height={280}
            className="w-full h-auto object-cover rounded-xl opacity-90"
          />
        </div>
      ))}
    </div>
  )

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {tr.skillsTitle}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">{tr.skillsSubtitle}</p>
          <p className="text-sm text-muted-foreground/50 mt-2">Drag to rotate · hover to inspect</p>
        </div>

        {/* ── Desktop: 3-column layout ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">

          {/* Left certificates */}
          <CertColumn certs={certsLeft} />

          {/* 3D sphere scene */}
          <div
            ref={desktopSphereRef}
            className="relative select-none flex-shrink-0 mx-auto"
            style={{ width: 520, height: 520, touchAction: "none" }}
          >
            <canvas
              ref={canvasRef}
              width={size.w}
              height={size.h}
              className="absolute inset-0 pointer-events-none"
            />
            {sortedNodes.map(({ idx, sx, sy, scale, opacity }) => {
              const skill = skills[idx]
              const Icon = skill.icon
              const isHovered = hoveredIdx === idx
              const nodeSize = Math.round(52 * scale)
              const iconSize = Math.round(22 * scale)
              const isBack = scale < 0.72
              return (
                <div
                  key={skill.name}
                  className="absolute flex flex-col items-center gap-1 pointer-events-auto"
                  style={{
                    left: sx, top: sy,
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.25 : 1})`,
                    opacity: isHovered ? 1 : opacity,
                    zIndex: Math.round(opacity * 100),
                    transition: "transform 0.2s ease, opacity 0.2s ease",
                    willChange: "transform",
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    className="rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      width: nodeSize, height: nodeSize,
                      background: isHovered
                        ? `radial-gradient(circle, ${skill.color}30 0%, ${skill.color}10 100%)`
                        : `radial-gradient(circle, ${skill.color}18 0%, transparent 100%)`,
                      border: `${isHovered ? 2 : 1.5}px solid ${skill.color}${isHovered ? "cc" : isBack ? "44" : "88"}`,
                      boxShadow: isHovered ? `0 0 18px ${skill.color}66, 0 0 6px ${skill.color}44` : "none",
                    }}
                  >
                    <Icon style={{ width: iconSize, height: iconSize, color: isBack ? skill.color + "99" : skill.color, filter: isHovered ? `drop-shadow(0 0 4px ${skill.color})` : "none" }} />
                  </div>
                  {(isHovered || scale > 0.85) && (
                    <div className="flex flex-col items-center" style={{ opacity: isHovered ? 1 : (scale - 0.85) / 0.15 }}>
                      <span className="font-semibold leading-none whitespace-nowrap" style={{ fontSize: Math.max(9, Math.round(11 * scale)), color: isHovered ? "#fff" : "var(--foreground)" }}>{skill.name}</span>
                      <span className="leading-none" style={{ fontSize: Math.max(8, Math.round(10 * scale)), color: skill.color, opacity: 0.85 }}>{skill.pct}%</span>
                    </div>
                  )}
                  {isHovered && (
                    <div className="absolute bottom-full mb-2 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-50"
                      style={{ background: "rgba(15,10,30,0.92)", border: `1px solid ${skill.color}55`, color: "#fff", boxShadow: `0 4px 16px rgba(0,0,0,0.4), 0 0 8px ${skill.color}33` }}>
                      <span style={{ color: skill.color }}>{skill.name}</span>
                      <span className="text-white/60 ml-1">— {skill.pct}%</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right certificates */}
          <CertColumn certs={certsRight} />
        </div>

        {/* ── Mobile / tablet: sphere then certs below ── */}
        <div className="lg:hidden">
          {/* 3D sphere */}
          <div
            ref={mobileSphereRef}
            className="relative w-full select-none"
            style={{ height: 420, touchAction: "none" }}
          >
            <canvas
              ref={canvasRef}
              width={size.w}
              height={size.h}
              className="absolute inset-0 pointer-events-none"
            />
            {sortedNodes.map(({ idx, sx, sy, scale, opacity }) => {
              const skill = skills[idx]
              const Icon = skill.icon
              const isHovered = hoveredIdx === idx
              const nodeSize = Math.round(48 * scale)
              const iconSize = Math.round(20 * scale)
              const isBack = scale < 0.72
              return (
                <div
                  key={skill.name}
                  className="absolute flex flex-col items-center gap-1 pointer-events-auto"
                  style={{
                    left: sx, top: sy,
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
                    opacity: isHovered ? 1 : opacity,
                    zIndex: Math.round(opacity * 100),
                    transition: "transform 0.2s ease, opacity 0.2s ease",
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: nodeSize, height: nodeSize,
                      background: `radial-gradient(circle, ${skill.color}18 0%, transparent 100%)`,
                      border: `1.5px solid ${skill.color}${isBack ? "44" : "88"}`,
                      boxShadow: isHovered ? `0 0 14px ${skill.color}55` : "none",
                    }}
                  >
                    <Icon style={{ width: iconSize, height: iconSize, color: isBack ? skill.color + "99" : skill.color }} />
                  </div>
                  {scale > 0.88 && (
                    <span className="font-medium leading-none whitespace-nowrap" style={{ fontSize: 9, color: "var(--foreground)" }}>{skill.name}</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Certificates below — 2-column grid on tablet, 1-column on phone */}
          <div className="mt-10">
            <h3 className="text-center text-lg font-semibold mb-6 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...certsLeft, ...certsRight].map((cert, i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-xl border border-violet-500/15 hover:border-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
                  style={{ background: "rgba(15,10,30,0.4)", backdropFilter: "blur(8px)" }}
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={400}
                    height={280}
                    className="w-full h-auto object-cover rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
