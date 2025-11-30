"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
    avatar: "/professional-male-portrait.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    gender: "female",
    role: "Product Manager at InnovateLab",
    rating: 5.0,
    comment:
      "Brilliant mobile app development with AI features. The UI/UX is flawless, performance incredible, and the AI assistant works perfectly. Highly recommend!",
    avatar: "/professional-female-portrait.png",
  },
  {
    id: 3,
    name: "David Rodriguez",
    gender: "male",
    role: "Founder of StartupHub",
    rating: 4.5,
    comment:
      "Great full-stack developer with strong AI/ML problem-solving skills. Built our entire platform with LLM integration from scratch with excellent architecture.",
    avatar: "/professional-male-entrepreneur.jpg",
  },
  {
    id: 4,
    name: "Emily Watson",
    gender: "female",
    role: "VP Engineering at DataFlow",
    rating: 5.0,
    comment:
      "Outstanding AI/ML expertise. The machine learning models and TensorFlow implementation are performing beyond expectations. Exceptional technical knowledge.",
    avatar: "/professional-female-executive.png",
  },
  {
    id: 5,
    name: "James Anderson",
    gender: "male",
    role: "CEO at FinTech Solutions",
    rating: 5.0,
    comment:
      "Exceptional work on our AI-powered DeFi platform. Full-stack expertise, security-first approach, and clean code. Will definitely work together again.",
    avatar: "/professional-male-ceo.png",
  },
  {
    id: 6,
    name: "Lisa Martinez",
    gender: "female",
    role: "Director of IT at HealthTech",
    rating: 4.5,
    comment:
      "Excellent mobile development skills with AI integration. The healthcare app with predictive analytics is HIPAA-compliant and user-friendly. Great collaboration.",
    avatar: "/professional-female-director.png",
  },
  {
    id: 7,
    name: "Robert Taylor",
    gender: "male",
    role: "Lead Developer at CloudSync",
    rating: 5.0,
    comment:
      "Amazing full-stack capabilities with AI optimization. The cloud infrastructure setup is robust, scalable, and the ML pipelines are efficient. Top-tier developer.",
    avatar: "/professional-male-developer.jpg",
  },
  {
    id: 8,
    name: "Amanda Foster",
    gender: "female",
    role: "Project Manager at DesignCo",
    rating: 5.0,
    comment:
      "Wonderful to work with! Great communication on our mobile project. Delivered exactly what we needed with modern tech stack. The app is beautiful and performs great.",
    avatar: "/professional-female-manager.jpg",
  },
  {
    id: 9,
    name: "Thomas Lee",
    gender: "male",
    role: "Founder of EduTech",
    rating: 4.5,
    comment:
      "Solid React Native development with AI tutoring features. The cross-platform app with ML recommendations works flawlessly on iOS and Android. Impressed!",
    avatar: "/testimonial-avatar-2.png",
  },
  {
    id: 10,
    name: "Jessica Brown",
    gender: "female",
    role: "COO at Commerce Plus",
    rating: 5.0,
    comment:
      "Fantastic e-commerce platform with AI personalization. Payment integration, inventory management with ML predictions, and mobile app are perfect.",
    avatar: "/professional-female-coo.jpg",
  },
  {
    id: 11,
    name: "Christopher Kim",
    gender: "male",
    role: "Tech Lead at GameStudio",
    rating: 5.0,
    comment:
      "Incredible backend architecture with AI features. Real-time multiplayer with ML matchmaking works seamlessly. Very skilled full-stack developer.",
    avatar: "/professional-male-tech-lead.jpg",
  },
  {
    id: 12,
    name: "Michelle Zhang",
    gender: "female",
    role: "Startup Founder",
    rating: 4.5,
    comment:
      "Great MVP development with AI! Fast, efficient, and understood our vision perfectly. Full-stack expertise and mobile-ready. Looking forward to phase 2.",
    avatar: "/professional-female-founder.jpg",
  },
  {
    id: 13,
    name: "Daniel Park",
    gender: "male",
    role: "CTO at MediaStream",
    rating: 5.0,
    comment:
      "Expert video streaming with AI content recommendation. The full-stack platform handles thousands of concurrent users and AI analysis without issues.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 14,
    name: "Rachel Green",
    gender: "female",
    role: "Product Owner at SocialNet",
    rating: 5.0,
    comment:
      "Amazing mobile and web features with AI moderation. Real-time chat, AI-powered recommendations, and notifications work perfectly. Highly skilled!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 15,
    name: "Kevin Wu",
    gender: "male",
    role: "Founder of AILabs",
    rating: 4.5,
    comment:
      "Expert AI/ML work with TensorFlow and Python. Predictive models are accurate, the full-stack web and mobile integration flawless, API well-designed.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export function ReviewsSection() {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? reviews : reviews.slice(0, 6)

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
          {displayedReviews.map((review) => (
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

        <div className="md:hidden space-y-6 overflow-hidden">
          {/* Row 1: Left to Right - Faster speed */}
          <div className="flex gap-4 pb-4 animate-scroll-left-fast">
            {[
              ...displayedReviews.slice(0, Math.ceil(displayedReviews.length / 3)),
              ...displayedReviews.slice(0, Math.ceil(displayedReviews.length / 3)),
            ].map((review, index) => (
              <Card
                key={`row1-${index}`}
                className="flex-shrink-0 w-72 p-4 bg-card/50 backdrop-blur-sm border-border/50"
                style={{
                  clipPath: "polygon(1% 0, 100% 0, 99% 100%, 0 100%)",
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs font-bold text-primary">{review.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">"{review.comment}"</p>
              </Card>
            ))}
          </div>

          {/* Row 2: Right to Left - Faster speed */}
          <div className="flex gap-4 pb-4 animate-scroll-right-fast">
            {[
              ...displayedReviews.slice(
                Math.ceil(displayedReviews.length / 3),
                Math.ceil((displayedReviews.length * 2) / 3),
              ),
              ...displayedReviews.slice(
                Math.ceil(displayedReviews.length / 3),
                Math.ceil((displayedReviews.length * 2) / 3),
              ),
            ].map((review, index) => (
              <Card
                key={`row2-${index}`}
                className="flex-shrink-0 w-72 p-4 bg-card/50 backdrop-blur-sm border-border/50"
                style={{
                  clipPath: "polygon(1% 0, 100% 0, 99% 100%, 0 100%)",
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs font-bold text-primary">{review.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">"{review.comment}"</p>
              </Card>
            ))}
          </div>

          {/* Row 3: Left to Right - Faster speed */}
          <div className="flex gap-4 pb-4 animate-scroll-left-fast">
            {[
              ...displayedReviews.slice(Math.ceil((displayedReviews.length * 2) / 3)),
              ...displayedReviews.slice(Math.ceil((displayedReviews.length * 2) / 3)),
            ].map((review, index) => (
              <Card
                key={`row3-${index}`}
                className="flex-shrink-0 w-72 p-4 bg-card/50 backdrop-blur-sm border-border/50"
                style={{
                  clipPath: "polygon(1% 0, 100% 0, 99% 100%, 0 100%)",
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs font-bold text-primary">{review.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">"{review.comment}"</p>
              </Card>
            ))}
          </div>
        </div>

        {reviews.length > 6 && (
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
    </section>
  )
}
