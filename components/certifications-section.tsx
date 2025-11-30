"use client"

import { Card } from "@/components/ui/card"
import { Award } from "lucide-react"

const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Certified Blockchain Developer",
    issuer: "Blockchain Council",
    year: "2024",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Google Mobile Web Specialist",
    issuer: "Google",
    year: "2023",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Meta React Native Certification",
    issuer: "Meta",
    year: "2024",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Certifications</h2>
          <p className="text-xl text-muted-foreground text-pretty">Professional certifications and achievements</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Award className="h-16 w-16 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="font-bold mb-2 text-balance">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground">{cert.year}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
