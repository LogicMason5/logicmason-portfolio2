"use client"

import { Briefcase, Code2, Award, GraduationCap, ExternalLink, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"
import { useEffect, useRef, useState, useCallback } from "react"

// ── Resume data ───────────────────────────────────────────────────────────────
const experience = [
  {
    company: "Freelance",
    url: null,
    role: "Full-Stack / AI Engineer",
    type: "Remote",
    period: "Oct 2023 – Present",
    current: true,
    color: "#a78bfa",
    bullets: [
      "Design and deliver end-to-end AI-powered web and mobile applications — spanning LLM integration, RAG pipelines, AI agent systems, and conversational chatbots — for clients across multiple industries.",
      "Build intelligent personal websites, SaaS platforms, and custom tools using React, Next.js, Node.js, FastAPI, and cloud-native infrastructure (AWS, Vercel).",
      "Architect and deploy multi-agent AI systems and autonomous workflows powered by OpenAI, LangChain, and open-source LLMs, enabling clients to automate complex business processes.",
      "Oversee the full project lifecycle — from requirements gathering and system design through implementation, testing, and production deployment — ensuring on-time delivery and high code quality.",
    ],
  },
  {
    company: "GDP Labs",
    url: "https://gdplabs.id",
    role: "Full Stack · AI Engineer",
    type: "Jakarta, Indonesia",
    period: "Oct 2018 – Sep 2023",
    current: false,
    color: "#60a5fa",
    bullets: [
      "Served as a Senior/Principal Full-Stack Engineer, leading architecture and technical decisions for large-scale web and mobile applications.",
      "Designed and delivered cross-platform mobile solutions integrated with scalable backend services and AI-driven features.",
      "Built high-performance APIs, modern frontend systems, and cloud-native infrastructure to ensure reliability, security, and seamless user experiences.",
      "Directed CI/CD, containerization, and deployment pipelines while mentoring engineers and driving technical roadmaps across teams.",
    ],
  },
  {
    company: "Cambridge Technology Partners",
    url: "https://www.ctp.com",
    role: "Intern – Full-Stack Developer",
    type: "Tokyo, Japan",
    period: "Oct 2017 – Sep 2018",
    current: false,
    color: "#34d399",
    bullets: [
      "Worked under senior engineers on web and back-end services, assisted in system integration and consulting projects.",
      "Gained hands-on experience in REST API development, database design, and full-stack web application workflows.",
    ],
  },
]

const education = [
  {
    school: "Tokyo Institute of Technology (TokyoTech)",
    url: "https://www.titech.ac.jp/english",
    degree: "Bachelor of Engineering in Information Technology",
    specialization: "Computer Science & Artificial Intelligence",
    location: "Tokyo, Japan",
    period: "Apr 2013 – Apr 2017",
  },
]

// ── 3D Experience Card Stack ──────────────────────────────────────────────────
// Effect: "depth stack" — cards sit at staggered Z depths and slight Y rotations.
// The active card is at the front; others fan behind it.
// Clicking prev/next animates the stack with a smooth CSS 3D transition.
// Different from: sphere (skills), conveyor belt (reviews v1), hex ring (reviews v2).

function ExperienceStack() {
  const N = experience.length
  const [active, setActive] = useState(0)
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null)

  const prev = useCallback(() => {
    setAnimDir("right")
    setActive(i => (i - 1 + N) % N)
  }, [N])

  const next = useCallback(() => {
    setAnimDir("left")
    setActive(i => (i + 1) % N)
  }, [N])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  // For each card, compute its 3D transform relative to active index
  function getTransform(i: number) {
    const offset = ((i - active) % N + N) % N
    // offset 0 = front, 1 = one behind, 2 = two behind
    const behind = offset === 0 ? 0 : offset <= N / 2 ? offset : offset - N

    // Stack params
    const zStep   = 55    // px depth per layer
    const xStep   = 18    // px horizontal shift per layer
    const yRot    = behind * 4   // degrees Y rotation per layer
    const scale   = 1 - Math.abs(behind) * 0.07
    const opacity = behind === 0 ? 1 : behind === 1 || behind === -1 ? 0.72 : 0.45
    const zIndex  = N - Math.abs(behind)

    return {
      transform: `perspective(900px) translateX(${behind * xStep}px) translateZ(${-Math.abs(behind) * zStep}px) rotateY(${yRot}deg) scale(${scale})`,
      opacity,
      zIndex,
      pointerEvents: behind === 0 ? "auto" : "none",
    } as React.CSSProperties
  }

  const job = experience[active]

  return (
    <div className="relative" style={{ minHeight: 420 }}>
      {/* 3D stage */}
      <div
        className="relative mx-auto"
        style={{ width: "100%", maxWidth: 480, height: 400, transformStyle: "preserve-3d" }}
      >
        {experience.map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-500 ease-out"
            style={getTransform(i)}
            onClick={() => i !== active && setActive(i)}
          >
            <ExperienceCard job={experience[i]} isActive={i === active} />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          aria-label="Previous"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {experience.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${experience[i].company}`}
              className="transition-all duration-300"
              style={{
                width: i === active ? 20 : 7,
                height: 7,
                borderRadius: 4,
                background: i === active ? experience[i].color : "rgba(139,92,246,0.25)",
                border: "none",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-muted-foreground/40 mt-2">
        ← arrow keys or click to navigate →
      </p>
    </div>
  )
}

// ── Single experience card ────────────────────────────────────────────────────
function ExperienceCard({
  job,
  isActive,
}: {
  job: typeof experience[0]
  isActive: boolean
}) {
  return (
    <div
      className="w-full h-full rounded-2xl p-6 overflow-y-auto"
      style={{
        background: isActive
          ? "var(--card)"
          : "var(--card)",
        border: `1.5px solid ${isActive ? job.color + "99" : "rgba(139,92,246,0.2)"}`,
        boxShadow: isActive
          ? `0 0 32px ${job.color}22, 0 12px 40px rgba(0,0,0,0.25)`
          : "0 4px 16px rgba(0,0,0,0.15)",
        backdropFilter: "blur(16px)",
        scrollbarWidth: "none",
      }}
    >
      {/* Accent top bar */}
      <div
        className="w-12 h-1 rounded-full mb-4"
        style={{ background: `linear-gradient(90deg, ${job.color}, ${job.color}55)` }}
      />

      {/* Company header */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-lg text-foreground tracking-tight">
            {job.company}
          </span>
          {job.url && (
            <a href={job.url} target="_blank" rel="noopener noreferrer"
              className="transition-colors" style={{ color: job.color }}
              onClick={e => e.stopPropagation()}>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {job.current && (
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: `${job.color}20`, color: job.color, border: `1px solid ${job.color}50` }}>
              Current
            </span>
          )}
        </div>
      </div>

      {/* Role — prominent */}
      <p className="text-sm font-bold mb-2 tracking-wide" style={{ color: job.color }}>
        {job.role}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4 flex-wrap">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />{job.period}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />{job.type}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px mb-4" style={{ background: `linear-gradient(90deg,transparent,${job.color}44,transparent)` }} />

      {/* Bullets — high contrast */}
      <ul className="space-y-2.5">
        {job.bullets.map((b, j) => (
          <li key={j} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: job.color }}
            />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export function AboutSection() {
  const { tr } = useI18n()

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {tr.aboutTitle}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
            {tr.aboutDesc}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{tr.aboutYears}</h3>
            <p className="text-muted-foreground">{tr.aboutYearsLabel}</p>
          </Card>
          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{tr.aboutProjects}</h3>
            <p className="text-muted-foreground">{tr.aboutProjectsLabel}</p>
          </Card>
          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{tr.aboutCerts}</h3>
            <p className="text-muted-foreground">{tr.aboutCertsLabel}</p>
          </Card>
        </div>

        {/* Experience + Education */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* 3D Experience Stack */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold">Professional Experience</h3>
            </div>
            <ExperienceStack />
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>

            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/60 to-transparent" />
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div key={i} className="relative pl-7">
                    <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-background border-violet-500/60" />
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-bold text-base text-foreground">{edu.school}</span>
                      <a href={edu.url} target="_blank" rel="noopener noreferrer"
                        className="text-violet-400 hover:text-violet-300 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-sm font-medium text-violet-400 mb-0.5">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground mb-3 italic">Specialization: {edu.specialization}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{edu.period}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
