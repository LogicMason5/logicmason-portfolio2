"use client"

import type React from "react"

import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiKotlin,
  SiFlutter,
  SiSwift,
  SiTailwindcss,
  SiNodedotjs,
  SiDjango,
  SiFastapi,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiNginx,
  SiDocker,
  SiAmazon,
  SiPython,
  SiCplusplus,
  SiTensorflow,
  SiHuggingface,
} from "react-icons/si"
import { TbBrandReactNative } from "react-icons/tb"
import { FaJava } from "react-icons/fa"

const skills = [
  { name: "React", icon: SiReact, percentage: 98, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, percentage: 95, color: "#1a1a1a" },
  { name: "Vue", icon: SiVuedotjs, percentage: 90, color: "#4FC08D" },
  { name: "React Native", icon: TbBrandReactNative, percentage: 95, color: "#61DAFB" },
  { name: "Kotlin", icon: SiKotlin, percentage: 95, color: "#7F52FF" },
  { name: "Flutter", icon: SiFlutter, percentage: 90, color: "#02569B" },
  { name: "Swift", icon: SiSwift, percentage: 90, color: "#FA7343" },
  { name: "Tailwind CSS", icon: SiTailwindcss, percentage: 95, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, percentage: 95, color: "#339933" },
  { name: "Django", icon: SiDjango, percentage: 90, color: "#092E20" },
  { name: "FastAPI", icon: SiFastapi, percentage: 90, color: "#009688" },
  { name: "Laravel", icon: SiLaravel, percentage: 95, color: "#FF2D20" },
  { name: "Java", icon: FaJava, percentage: 95, color: "#007396" },
  { name: "PostgreSQL", icon: SiPostgresql, percentage: 95, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, percentage: 98, color: "#4479A1" },
  { name: "MongoDB", icon: SiMongodb, percentage: 90, color: "#47A248" },
  { name: "Nginx", icon: SiNginx, percentage: 90, color: "#009639" },
  { name: "Docker", icon: SiDocker, percentage: 85, color: "#2496ED" },
  { name: "Cloud", icon: Cloud, percentage: 85, color: "#FF9900" },
  { name: "AWS", icon: SiAmazon, percentage: 90, color: "#FF9900" },
  { name: "Python", icon: SiPython, percentage: 95, color: "#3776AB" },
  { name: "C++", icon: SiCplusplus, percentage: 90, color: "#00599C" },
  { name: "TensorFlow", icon: SiTensorflow, percentage: 90, color: "#FF6F00" },
  { name: "LangChain", icon: LangChainIcon, percentage: 85, color: "#4169E1" },
  { name: "Hugging Face", icon: SiHuggingface, percentage: 80, color: "#FFD21E" },
]

function Cloud(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M4 14.899a7 7 0 1 1 13.8-1" />
    </svg>
  )
}

function LangChainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontWeight="bold"
      >
        LC
      </text>
    </svg>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Mastering modern technologies to build exceptional solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill }: { skill: (typeof skills)[0] }) {
  const Icon = skill.icon
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (skill.percentage / 100) * circumference

  return (
    <div className="group flex flex-col items-center gap-4 p-6 transition-all duration-300 hover:scale-110">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="45" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted/20" />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke={skill.color}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${skill.color})`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative bg-white dark:bg-transparent rounded-full p-3">
            <Icon className="w-8 h-8 text-gray-900 dark:text-white transition-colors" />
          </div>
        </div>

        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-base font-bold text-gray-800 dark:text-white">{skill.percentage}%</span>
        </div>
      </div>
      <span className="text-sm font-medium text-center mt-6">{skill.name}</span>
    </div>
  )
}
