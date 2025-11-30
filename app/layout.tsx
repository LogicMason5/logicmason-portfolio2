import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Noto_Sans_JP, Pacifico } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import {
  JapaneseSakuraBlossoms,
  JapaneseBambooPattern,
  JapaneseKamon,
  JapaneseMountains,
} from "@/components/japanese-accents"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-japanese",
})
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cursive",
})

export const metadata: Metadata = {
  title: "Portfolio - AI, Full-Stack & Mobile Engineer",
  description:
    "Professional portfolio showcasing AI, full-stack, and mobile engineering projects with expertise in cutting-edge technologies",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${notoSansJP.variable} ${pacifico.variable}`}>
        <ThemeProvider>
          {/* Removed SimpleMouseFog component */}
          <JapaneseSakuraBlossoms />
          <JapaneseBambooPattern />
          <JapaneseKamon />
          <JapaneseMountains />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
