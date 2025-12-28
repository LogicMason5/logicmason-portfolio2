"use client"

import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const reviews = [
  {
    id: 1,
    name: "Michael Chen",
    gender: "male",
    role: "CTO at TechCorp",
    rating: 5.0,
    comment:
      "Exceptional AI integration work on our platform. The ML models were accurate and the full-stack architecture was outstanding. Delivered ahead of schedule.",
    avatar: "/review1.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    gender: "female",
    role: "Product Manager at InnovateLab",
    rating: 5.0,
    comment:
      "Brilliant mobile app development with AI features. The UI/UX is flawless, performance incredible, and the AI assistant works perfectly. Highly recommend!",
    avatar: "/review2.png",
  },
  {
    id: 3,
    name: "David Rodriguez",
    gender: "male",
    role: "Founder of StartupHub",
    rating: 4.5,
    comment:
      "Great full-stack developer with strong AI/ML problem-solving skills. Built our entire platform with LLM integration from scratch with excellent architecture.",
    avatar: "/review3.png",
  },
  {
    id: 4,
    name: "Emily Watson",
    gender: "female",
    role: "VP Engineering at DataFlow",
    rating: 5.0,
    comment:
      "Outstanding AI/ML expertise. The machine learning models and TensorFlow implementation are performing beyond expectations. Exceptional technical knowledge.",
    avatar: "/review4.png",
  },
  {
    id: 5,
    name: "James Anderson",
    gender: "male",
    role: "CEO at FinTech Solutions",
    rating: 5.0,
    comment:
      "Exceptional work on our AI-powered DeFi platform. Full-stack expertise, security-first approach, and clean code. Will definitely work together again.",
    avatar: "/review5.jpg",
  },
  {
    id: 6,
    name: "Lisa Martinez",
    gender: "female",
    role: "Director of IT at HealthTech",
    rating: 4.5,
    comment:
      "Excellent mobile development skills with AI integration. The healthcare app with predictive analytics is HIPAA-compliant and user-friendly. Great collaboration.",
    avatar: "/review6.png",
  },
]

export function ReviewsSection() {
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section id="reviews" className="py-20 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Client Reviews
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            What clients say about my AI, full-stack, and mobile work
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Star className="h-6 w-6 fill-violet-400 text-violet-400" />
            <span className="text-3xl font-bold">{averageRating}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                  <AvatarFallback>
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{review.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{review.role}</p>
                </div>
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-bold text-primary">{review.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
            </Card>
          ))}
        </div>

        {/* Mobile: Single horizontal auto-scrolling row */}
        <div className="md:hidden overflow-hidden pb-4 -mx-4 px-4">
          <div className="flex gap-4 animate-scroll-left-mobile" style={{ width: 'max-content' }}>
            {/* First set of cards */}
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="flex-shrink-0 w-72 p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{review.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{review.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 flex-shrink-0">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs font-bold text-primary">{review.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">"{review.comment}"</p>
              </Card>
            ))}
            {/* Duplicate set for seamless loop */}
            {reviews.map((review) => (
              <Card
                key={`duplicate-${review.id}`}
                className="flex-shrink-0 w-72 p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{review.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{review.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 flex-shrink-0">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs font-bold text-primary">{review.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">"{review.comment}"</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
