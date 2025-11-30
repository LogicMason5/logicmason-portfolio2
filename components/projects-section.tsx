"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { GitHubWarningToast } from "@/components/github-warning-toast"
import Image from "next/image"

type ProjectCategory = "all" | "fullstack" | "mobile" | "ai"

const projects = [
  {
    id: 1,
    title: "DeFi Trading Platform",
    category: "fullstack" as const,
    description: "A comprehensive trading platform with real-time market data and portfolio management",
    image: "/modern-trading-dashboard.png",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "WebSocket"],
    github: "https://github.com/username/defi-trading-platform",
    isPrivate: true,
    demo: "#",
    longDescription:
      "A comprehensive trading platform built with Next.js featuring real-time market data, automated trading strategies, portfolio management, and secure authentication. The platform handles thousands of transactions per second with sub-millisecond latency.",
  },
  {
    id: 2,
    title: "AI-Powered Mobile Assistant",
    category: "ai" as const,
    description: "Cross-platform mobile app with AI-driven personal assistant capabilities",
    image: "/ai-mobile-assistant-app-interface.jpg",
    technologies: ["React Native", "TensorFlow", "FastAPI", "MongoDB"],
    github: "https://github.com/username/ai-mobile-assistant",
    isPrivate: false,
    demo: "#",
    longDescription:
      "An intelligent mobile assistant app that leverages machine learning to provide personalized recommendations, voice commands, and predictive task management. Built with React Native for cross-platform compatibility and FastAPI for the backend AI processing engine.",
  },
  {
    id: 3,
    title: "E-Commerce Marketplace",
    category: "fullstack" as const,
    description: "Full-featured e-commerce platform with payment processing and inventory management",
    image: "/modern-ecommerce-marketplace.jpg",
    technologies: ["Vue", "Laravel", "MySQL", "Stripe"],
    github: "https://github.com/username/ecommerce-marketplace",
    isPrivate: true,
    demo: "#",
    longDescription:
      "A scalable e-commerce marketplace with advanced features including multi-vendor support, real-time inventory tracking, secure payment processing through Stripe, and an admin dashboard for analytics and reporting.",
  },
  {
    id: 4,
    title: "Fitness Tracking App",
    category: "mobile" as const,
    description: "Native iOS and Android fitness tracker with health data integration",
    image: "/fitness-tracking-app-interface.png",
    technologies: ["Swift", "Kotlin", "Firebase", "HealthKit"],
    github: "https://github.com/username/fitness-tracking-app",
    isPrivate: false,
    demo: "#",
    longDescription:
      "A comprehensive fitness tracking application with native implementations for iOS (Swift) and Android (Kotlin). Integrates with HealthKit and Google Fit for seamless health data synchronization, workout planning, and progress tracking.",
  },
  {
    id: 5,
    title: "Social Media Analytics Dashboard",
    category: "fullstack" as const,
    description: "Real-time analytics platform for social media insights and engagement metrics",
    image: "/social-media-analytics-dashboard.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    github: "https://github.com/username/social-analytics",
    isPrivate: true,
    demo: "#",
    longDescription:
      "An enterprise-grade analytics dashboard that aggregates data from multiple social media platforms, providing real-time insights, sentiment analysis, and engagement metrics. Containerized with Docker for easy deployment.",
  },
  {
    id: 6,
    title: "Restaurant Ordering App",
    category: "mobile" as const,
    description: "Flutter-based food ordering app with real-time order tracking",
    image: "/restaurant-food-ordering-mobile-app.jpg",
    technologies: ["Flutter", "Django", "PostgreSQL", "Stripe"],
    github: "https://github.com/username/restaurant-ordering",
    isPrivate: false,
    demo: "#",
    longDescription:
      "A beautiful and intuitive restaurant ordering application built with Flutter. Features include menu browsing, custom order creation, real-time order tracking, secure payments, and customer reviews.",
  },
  {
    id: 7,
    title: "Video Streaming Platform",
    category: "fullstack" as const,
    description: "Netflix-style streaming service with CDN integration and adaptive bitrate streaming",
    image: "/video-streaming-platform.jpg",
    technologies: ["Next.js", "Node.js", "MongoDB", "AWS"],
    github: "https://github.com/username/video-streaming",
    isPrivate: true,
    demo: "#",
    longDescription:
      "A scalable video streaming platform with adaptive bitrate streaming, content delivery network integration, user authentication, subscription management, and personalized recommendations powered by machine learning.",
  },
  {
    id: 8,
    title: "Real Estate Mobile App",
    category: "mobile" as const,
    description: "Property search and virtual tour mobile application",
    image: "/real-estate-mobile-app.jpg",
    technologies: ["React Native", "FastAPI", "PostgreSQL", "Maps API"],
    github: "https://github.com/username/real-estate-app",
    isPrivate: false,
    demo: "#",
    longDescription:
      "A feature-rich real estate application with property listings, advanced search filters, virtual 3D tours, mortgage calculators, and direct messaging with agents. Includes map-based search and neighborhood insights.",
  },
  {
    id: 9,
    title: "Blockchain Supply Chain Tracker",
    category: "fullstack" as const,
    description: "Transparent supply chain tracking using blockchain technology",
    image: "/blockchain-supply-chain.png",
    technologies: ["React", "Node.js", "Solidity", "Ethereum"],
    github: "https://github.com/username/blockchain-supply-chain",
    isPrivate: true,
    demo: "#",
    longDescription:
      "A decentralized supply chain management system that uses blockchain for transparent product tracking from manufacturer to consumer. Smart contracts ensure data integrity and automated compliance verification.",
  },
  {
    id: 10,
    title: "Language Learning App",
    category: "mobile" as const,
    description: "Gamified language learning mobile app with speech recognition",
    image: "/language-learning-app.png",
    technologies: ["Flutter", "Firebase", "ML Kit", "TensorFlow"],
    github: "https://github.com/username/language-learning",
    isPrivate: false,
    demo: "#",
    longDescription:
      "An engaging language learning platform with gamification elements, speech recognition for pronunciation practice, adaptive learning algorithms, and progress tracking across multiple languages.",
  },
  {
    id: 11,
    title: "Smart Home Dashboard",
    category: "fullstack" as const,
    description: "IoT device management dashboard with automation rules",
    image: "/smart-home-iot-dashboard.png",
    technologies: ["Vue", "Node.js", "MQTT", "Docker"],
    github: "https://github.com/username/smart-home-dashboard",
    isPrivate: true,
    demo: "#",
    longDescription:
      "A comprehensive smart home control center that manages multiple IoT devices, creates automation rules, monitors energy usage, and provides detailed analytics. Built with real-time communication protocols.",
  },
  {
    id: 12,
    title: "Crypto Wallet App",
    category: "mobile" as const,
    description: "Secure multi-chain cryptocurrency wallet with DeFi integration",
    image: "/cryptocurrency-wallet-app.jpg",
    technologies: ["React Native", "Web3", "Node.js", "Secure Enclave"],
    github: "https://github.com/username/crypto-wallet",
    isPrivate: false,
    demo: "#",
    longDescription:
      "A highly secure cryptocurrency wallet supporting multiple blockchains, token swaps, DeFi protocol integration, and hardware wallet compatibility. Features biometric authentication and secure key storage.",
  },
  {
    id: 13,
    title: "Healthcare Management System",
    category: "fullstack" as const,
    description: "HIPAA-compliant patient management and telemedicine platform",
    image: "/healthcare-management-system.jpg",
    technologies: ["Next.js", "Laravel", "PostgreSQL", "WebRTC"],
    github: "https://github.com/username/healthcare-system",
    isPrivate: true,
    demo: "#",
    longDescription:
      "An enterprise healthcare platform with patient records management, appointment scheduling, telemedicine video consultations, prescription management, and billing integration. Fully HIPAA compliant.",
  },
  {
    id: 14,
    title: "Travel Booking App",
    category: "mobile" as const,
    description: "Comprehensive travel booking with flights, hotels, and activities",
    image: "/travel-booking-app.png",
    technologies: ["Swift", "Kotlin", "Node.js", "MongoDB"],
    github: "https://github.com/username/travel-booking",
    isPrivate: false,
    demo: "#",
    longDescription:
      "A one-stop travel booking application with flight search, hotel reservations, activity bookings, itinerary planning, and travel guides. Includes offline mode and multi-currency support.",
  },
  {
    id: 15,
    title: "AI Content Generation Platform",
    category: "ai" as const,
    description: "GPT-powered content creation tool for marketers and creators",
    image: "/ai-content-platform.png",
    technologies: ["React", "FastAPI", "OpenAI API", "Redis"],
    github: "https://github.com/username/ai-content-generator",
    isPrivate: true,
    demo: "#",
    longDescription:
      "An AI-powered content creation platform that generates blog posts, social media content, and marketing copy. Features template management, brand voice customization, and SEO optimization suggestions.",
  },
  {
    id: 16,
    title: "Event Management App",
    category: "mobile" as const,
    description: "Event discovery and ticket booking mobile application",
    image: "/event-management-app.jpg",
    technologies: ["Flutter", "Django", "PostgreSQL", "Stripe"],
    github: "https://github.com/username/event-management",
    isPrivate: false,
    demo: "#",
    longDescription:
      "A feature-rich event management app for discovering events, purchasing tickets, checking in with QR codes, and networking with other attendees. Includes calendar integration and event reminders.",
  },
  {
    id: 17,
    title: "Project Management Tool",
    category: "fullstack" as const,
    description: "Collaborative project management with Kanban boards and time tracking",
    image: "/project-management-kanban.png",
    technologies: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com/username/project-management",
    isPrivate: true,
    demo: "#",
    longDescription:
      "A powerful project management platform with Kanban boards, Gantt charts, time tracking, team collaboration, file sharing, and detailed analytics. Real-time updates via WebSocket connections.",
  },
  {
    id: 18,
    title: "Meditation & Wellness App",
    category: "mobile" as const,
    description: "Mindfulness and meditation app with guided sessions",
    image: "/meditation-wellness-app.jpg",
    technologies: ["React Native", "Firebase", "HealthKit", "Audio Streaming"],
    github: "https://github.com/username/meditation-wellness",
    isPrivate: false,
    demo: "#",
    longDescription:
      "A wellness application offering guided meditation sessions, breathing exercises, sleep sounds, and mood tracking. Integrates with health data platforms for comprehensive wellness monitoring.",
  },
  {
    id: 19,
    title: "Cloud Storage Platform",
    category: "fullstack" as const,
    description: "Secure file storage and sharing with end-to-end encryption",
    image: "/cloud-storage-platform.jpg",
    technologies: ["Vue", "Node.js", "AWS S3", "Docker"],
    github: "https://github.com/username/cloud-storage",
    isPrivate: true,
    demo: "#",
    longDescription:
      "A secure cloud storage solution with end-to-end encryption, file versioning, team collaboration, and granular access controls. Built on AWS infrastructure for reliability and scalability.",
  },
  {
    id: 20,
    title: "Gaming Community App",
    category: "mobile" as const,
    description: "Social platform for gamers with team finding and tournament management",
    image: "/gaming-community-app.jpg",
    technologies: ["Kotlin", "Swift", "Node.js", "WebSocket"],
    github: "https://github.com/username/gaming-community",
    isPrivate: false,
    demo: "#",
    longDescription:
      "A gaming-focused social platform with team matching, tournament organization, live chat, game statistics tracking, and community forums. Features real-time notifications and leaderboards.",
  },
]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all")
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [showGitHubWarning, setShowGitHubWarning] = useState(false)

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "all" || project.category === selectedCategory,
  )

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 12)

  const handleGitHubClick = (e: React.MouseEvent<HTMLAnchorElement>, isPrivate: boolean) => {
    if (isPrivate) {
      e.preventDefault()
      setShowGitHubWarning(true)
      setTimeout(() => setShowGitHubWarning(false), 5000)
    }
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground text-pretty mb-8">
            Showcasing innovative solutions across mobile, web, and AI platforms
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500"
                  : "border-violet-500/50 hover:bg-violet-500/10"
              }
            >
              All Projects
            </Button>
            <Button
              variant={selectedCategory === "fullstack" ? "default" : "outline"}
              onClick={() => setSelectedCategory("fullstack")}
              className={
                selectedCategory === "fullstack"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500"
                  : "border-violet-500/50 hover:bg-violet-500/10"
              }
            >
              Full-Stack
            </Button>
            <Button
              variant={selectedCategory === "mobile" ? "default" : "outline"}
              onClick={() => setSelectedCategory("mobile")}
              className={
                selectedCategory === "mobile"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500"
                  : "border-violet-500/50 hover:bg-violet-500/10"
              }
            >
              Mobile
            </Button>
            <Button
              variant={selectedCategory === "ai" ? "default" : "outline"}
              onClick={() => setSelectedCategory("ai")}
              className={
                selectedCategory === "ai"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500"
                  : "border-violet-500/50 hover:bg-violet-500/10"
              }
            >
              AI
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length > 12 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-violet-500/50 hover:bg-violet-500/10"
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-xl border-border">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base">{selectedProject.longDescription}</DialogDescription>
              </DialogHeader>
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button asChild className="flex-1">
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                      📱 View Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1 bg-transparent">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleGitHubClick(e, selectedProject.isPrivate)}
                    >
                      {selectedProject.isPrivate ? "🔒 View Source" : "🔓 View Source"}
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {selectedProject.isPrivate
                    ? "🔐 Password required to access GitHub repository"
                    : "✓ Public repository"}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <GitHubWarningToast visible={showGitHubWarning} onClose={() => setShowGitHubWarning(false)} />
    </section>
  )
}
