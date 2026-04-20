"use client"

import { Code, Smartphone, Cloud, Zap, Database, Brain, type LucideIcon } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"
import { useI18n } from "@/lib/i18n"
import { createPortal } from "react-dom"

const serviceIcons: LucideIcon[] = [Brain, Code, Smartphone, Cloud, Database, Zap]

// ── Icon accent colours per service ──────────────────────────────────────────
const ICON_COLORS = [
  "#a78bfa", // violet  – AI
  "#60a5fa", // blue    – Full-Stack
  "#34d399", // emerald – Mobile
  "#38bdf8", // sky     – Cloud
  "#fb923c", // orange  – Database
  "#facc15", // yellow  – Performance
]

// ── Clean minimal card decoration (top-left corner accent only) ───────────────
function CardAccent({ color }: { color: string }) {
  return (
    <>
      {/* Top-left L-bracket */}
      <span
        className="absolute top-0 left-0 w-5 h-5 pointer-events-none"
        style={{
          borderTop: `2px solid ${color}55`,
          borderLeft: `2px solid ${color}55`,
          borderTopLeftRadius: 6,
        }}
      />
      {/* Bottom-right L-bracket */}
      <span
        className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none"
        style={{
          borderBottom: `2px solid ${color}55`,
          borderRight: `2px solid ${color}55`,
          borderBottomRightRadius: 6,
        }}
      />
      {/* Subtle top gradient line */}
      <span
        className="absolute top-0 left-5 right-5 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}33, transparent)` }}
      />
    </>
  )
}

// ── Individual service card (pure HTML/CSS, rendered into Three.js CSS3D) ─────
interface ServiceCardProps {
  title: string
  description: string
  features: string[]
  Icon: LucideIcon
  color: string
  active: boolean
  onClick: () => void
}

function ServiceCard({ title, description, features, Icon, color, active, onClick }: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-xl p-4 transition-all duration-500 select-none overflow-hidden"
      style={{
        width: 220,
        background: active
          ? "linear-gradient(135deg, rgba(30,20,50,0.97) 0%, rgba(45,25,70,0.97) 100%)"
          : "linear-gradient(135deg, rgba(18,12,35,0.92) 0%, rgba(28,18,50,0.92) 100%)",
        border: active ? `1.5px solid ${color}88` : "1.5px solid rgba(139,92,246,0.18)",
        boxShadow: active
          ? `0 0 24px ${color}33, 0 6px 30px rgba(0,0,0,0.5)`
          : "0 4px 20px rgba(0,0,0,0.35)",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        minHeight: 220,
      }}
    >
      <CardAccent color={color} />

      {/* Icon */}
      <div
        className="mb-3 inline-flex items-center justify-center w-9 h-9 rounded-lg"
        style={{
          background: `${color}18`,
          border: `1px solid ${color}33`,
        }}
      >
        <Icon style={{ color, width: 17, height: 17 }} />
      </div>

      {/* Title */}
      <h3
        className="text-sm font-bold mb-1.5 leading-snug"
        style={{ color: active ? "#fff" : "#e2d9f3" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs leading-relaxed mb-3" style={{ color: "#9d8ec0" }}>
        {description}
      </p>

      {/* Feature list */}
      <ul className="space-y-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-1.5 text-xs" style={{ color: "#b8a8d8" }}>
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: color, opacity: 0.8 }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Active glow overlay */}
      {active && (
        <span
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${color}12 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  )
}

// ── Three.js 3D carousel ──────────────────────────────────────────────────────
interface CarouselProps {
  services: { title: string; description: string; features: string[]; icon: LucideIcon }[]
}

function ThreeCarousel({ services }: CarouselProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [cardEls, setCardEls] = useState<HTMLDivElement[]>([])
  const angleRef = useRef(0)          // current rotation angle (radians)
  const targetAngleRef = useRef(0)    // target angle
  const rafRef = useRef<number | null>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartAngle = useRef(0)

  const count = services.length
  const RADIUS = 320
  const CARD_W = 220

  // Build card DOM elements once
  useEffect(() => {
    const els: HTMLDivElement[] = services.map(() => {
      const el = document.createElement("div")
      el.style.position = "absolute"
      el.style.width = `${CARD_W}px`
      el.style.transformStyle = "preserve-3d"
      return el
    })
    setCardEls(els)
  }, [services.length]) // eslint-disable-line

  // Snap to nearest card
  const snapTo = useCallback((idx: number) => {
    const step = (Math.PI * 2) / count
    targetAngleRef.current = -idx * step
    setActiveIdx(idx)
  }, [count])

  // Navigate
  const prev = useCallback(() => snapTo((activeIdx - 1 + count) % count), [activeIdx, count, snapTo])
  const next = useCallback(() => snapTo((activeIdx + 1) % count), [activeIdx, count, snapTo])

  // Animation + layout loop
  useEffect(() => {
    if (cardEls.length === 0 || !mountRef.current) return

    const container = mountRef.current
    const step = (Math.PI * 2) / count

    const loop = () => {
      // Lerp toward target
      const diff = targetAngleRef.current - angleRef.current
      angleRef.current += diff * 0.07

      cardEls.forEach((el, i) => {
        const theta = angleRef.current + i * step
        const x = Math.sin(theta) * RADIUS
        const z = Math.cos(theta) * RADIUS
        const scale = 0.72 + 0.28 * ((z + RADIUS) / (2 * RADIUS))
        const opacity = 0.35 + 0.65 * ((z + RADIUS) / (2 * RADIUS))
        const rotY = -theta * (180 / Math.PI)

        el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`
        el.style.opacity = String(opacity)
        el.style.zIndex = String(Math.round((z + RADIUS) * 10))
      })

      rafRef.current = requestAnimationFrame(loop)
    }

    // Mount cards
    cardEls.forEach(el => container.appendChild(el))
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      cardEls.forEach(el => { if (el.parentNode) el.parentNode.removeChild(el) })
    }
  }, [cardEls, count])

  // Drag to rotate
  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true
      dragStartX.current = "touches" in e ? e.touches[0].clientX : e.clientX
      dragStartAngle.current = targetAngleRef.current
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return
      const x = "touches" in e ? e.touches[0].clientX : e.clientX
      const delta = (x - dragStartX.current) / 200
      targetAngleRef.current = dragStartAngle.current + delta
    }
    const onUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      // Snap to nearest
      const step = (Math.PI * 2) / count
      const nearest = Math.round(-targetAngleRef.current / step)
      snapTo(((nearest % count) + count) % count)
    }

    el.addEventListener("mousedown", onDown)
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseup", onUp)
    el.addEventListener("touchstart", onDown, { passive: true })
    el.addEventListener("touchmove", onMove, { passive: true })
    el.addEventListener("touchend", onUp)
    return () => {
      el.removeEventListener("mousedown", onDown)
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseup", onUp)
      el.removeEventListener("touchstart", onDown)
      el.removeEventListener("touchmove", onMove)
      el.removeEventListener("touchend", onUp)
    }
  }, [count, snapTo])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  return (
    <div className="relative w-full" style={{ height: 320 }}>
      {/* 3D scene */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 45%" }}
      >
        <div
          ref={mountRef}
          className="relative"
          style={{
            width: CARD_W,
            height: 240,
            transformStyle: "preserve-3d",
          }}
        />
      </div>

      {/* Render React cards into the DOM elements */}
      {cardEls.map((el, i) =>
        createPortal(
          <ServiceCard
            key={i}
            title={services[i].title}
            description={services[i].description}
            features={services[i].features}
            Icon={services[i].icon}
            color={ICON_COLORS[i]}
            active={i === activeIdx}
            onClick={() => snapTo(i)}
          />,
          el
        )
      )}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        aria-label="Previous service"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          background: "rgba(139,92,246,0.15)",
          border: "1px solid rgba(139,92,246,0.3)",
          color: "#a78bfa",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next service"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          background: "rgba(139,92,246,0.15)",
          border: "1px solid rgba(139,92,246,0.3)",
          color: "#a78bfa",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => snapTo(i)}
            aria-label={`Go to service ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === activeIdx ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === activeIdx ? ICON_COLORS[i] : "rgba(139,92,246,0.3)",
              border: "none",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function ServicesSection() {
  const { tr } = useI18n()

  const services = tr.services.map((s, i) => ({
    ...s,
    icon: serviceIcons[i],
  }))

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(109,40,217,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {tr.servicesTitle}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            {tr.servicesSubtitle}
          </p>
          <p className="text-sm text-muted-foreground/60 mt-3">
            ← Drag or use arrow keys to explore →
          </p>
        </div>

        <ThreeCarousel services={services} />
      </div>
    </section>
  )
}
