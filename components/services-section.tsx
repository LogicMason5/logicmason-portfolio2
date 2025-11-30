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
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "End-to-end web application development with modern frameworks like Next.js, React, and Node.js with scalable, secure architectures.",
    features: ["Next.js Apps", "API Development", "Database Design", "Real-time Features"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, Swift, and Kotlin.",
    features: ["iOS Apps", "Android Apps", "Cross-platform", "App Store Deployment"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Scalable cloud infrastructure and deployment using AWS, Google Cloud, and modern DevOps practices.",
    features: ["Cloud Migration", "CI/CD Pipelines", "Container Orchestration", "Performance Optimization"],
  },
  {
    icon: Database,
    title: "Database Architecture",
    description:
      "Design and implementation of robust database solutions with PostgreSQL, MySQL, MongoDB, and modern ORMs.",
    features: ["Schema Design", "Query Optimization", "Data Migration", "Backup Strategies"],
  },
  {
    icon: Zap,
    title: "Performance & Optimization",
    description:
      "Enhance application speed and efficiency through code optimization, caching strategies, and modern best practices.",
    features: ["Code Splitting", "Lazy Loading", "Caching", "Lighthouse Optimization"],
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
              className="group relative flex-shrink-0 w-80 bg-card/50 backdrop-blur-sm border border-border/50 p-6 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:scale-105 skew-y-1"
              style={{
                clipPath: "polygon(0 0, 100% 2%, 100% 98%, 0 100%)",
              }}
            >
              <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-6 h-6 text-violet-400" />
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-violet-400 transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
