"use client"

import { Code, Smartphone, Cloud, Zap, Database, Brain } from "lucide-react"
import { useEffect, useRef } from "react"

const services = [
  {
    icon: Brain,
    title: "AI/ML Integration",
    description:
      "Implement cutting-edge machine learning models and AI solutions using TensorFlow, PyTorch, and LangChain for intelligent applications.",
    features: ["LLM Integration", "ML Models", "NLP Solutions", "Computer Vision"],
    decoration: "sparkles",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "End-to-end web application development with modern frameworks like Next.js, React, and Node.js with scalable, secure architectures.",
    features: ["Next.js Apps", "API Development", "Database Design", "Real-time Features"],
    decoration: "dots",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, Swift, and Kotlin.",
    features: ["iOS Apps", "Android Apps", "Cross-platform", "App Store Deployment"],
    decoration: "lines",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Scalable cloud infrastructure and deployment using AWS, Google Cloud, and modern DevOps practices.",
    features: ["Cloud Migration", "CI/CD Pipelines", "Container Orchestration", "Performance Optimization"],
    decoration: "waves",
  },
  {
    icon: Database,
    title: "Database Architecture",
    description:
      "Design and implementation of robust database solutions with PostgreSQL, MySQL, MongoDB, and modern ORMs.",
    features: ["Schema Design", "Query Optimization", "Data Migration", "Backup Strategies"],
    decoration: "circles",
  },
  {
    icon: Zap,
    title: "Performance & Optimization",
    description:
      "Enhance application speed and efficiency through code optimization, caching strategies, and modern best practices.",
    features: ["Code Splitting", "Lazy Loading", "Caching", "Lighthouse Optimization"],
    decoration: "zigzag",
  },
]

export function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0

    const animate = () => {
      scrollPosition += 0.5
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Services
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive AI, full-stack, and mobile development services for modern applications
          </p>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-hidden pb-4" style={{ scrollBehavior: "auto" }}>
          {[...services, ...services].map((service, index) => (
            <div
              key={index}
              className="group relative flex-shrink-0 w-80 bg-card/50 backdrop-blur-sm border-2 border-border/50 p-6 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 hover:scale-105 service-card rounded-lg"
            >
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 service-decoration-top-left" />
                <div className="absolute top-0 right-0 w-8 h-8 service-decoration-top-right" />
                <div className="absolute bottom-0 left-0 w-8 h-8 service-decoration-bottom-left" />
                <div className="absolute bottom-0 right-0 w-8 h-8 service-decoration-bottom-right" />

                {/* Decoration pattern based on type */}
                {service.decoration === "sparkles" && (
                  <>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-violet-400 rounded-full opacity-60 animate-pulse" />
                    <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
                  </>
                )}

                {service.decoration === "dots" && (
                  <>
                    <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-50" />
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-50" />
                    <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-50" />
                    <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-50" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-violet-400 rounded-full opacity-30" />
                  </>
                )}

                {service.decoration === "lines" && (
                  <>
                    <div className="absolute top-0 left-1/4 w-px h-8 bg-gradient-to-b from-violet-400/50 to-transparent" />
                    <div className="absolute top-0 right-1/4 w-px h-8 bg-gradient-to-b from-purple-400/50 to-transparent" />
                    <div className="absolute bottom-0 left-1/4 w-px h-8 bg-gradient-to-t from-violet-400/50 to-transparent" />
                    <div className="absolute bottom-0 right-1/4 w-px h-8 bg-gradient-to-t from-purple-400/50 to-transparent" />
                  </>
                )}

                {service.decoration === "waves" && (
                  <>
                    <div className="absolute top-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
                    <div className="absolute bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
                  </>
                )}

                {service.decoration === "circles" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border border-violet-400/30 rounded-full" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border border-purple-400/30 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-violet-400/20 rounded-full" />
                  </>
                )}

                {service.decoration === "zigzag" && (
                  <>
                    <div className="absolute top-0 left-0 w-12 h-12">
                      <svg className="w-full h-full" viewBox="0 0 12 12">
                        <path
                          d="M0,6 L3,3 L6,6 L9,3 L12,6"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                          className="text-violet-400/40"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 transform rotate-180">
                      <svg className="w-full h-full" viewBox="0 0 12 12">
                        <path
                          d="M0,6 L3,3 L6,6 L9,3 L12,6"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                          className="text-purple-400/40"
                        />
                      </svg>
                    </div>
                  </>
                )}

                {/* Icon with decorative background */}
                <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <service.icon className="w-6 h-6 text-violet-400 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-violet-400 transition-colors relative z-10">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed relative z-10">{service.description}</p>

                <ul className="space-y-2 relative z-10">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover:scale-125 transition-transform duration-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none rounded-lg" />
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}
