import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP, Pacifico } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SimpleCursor } from "@/components/simple-cursor"
import { Chatbot } from "@/components/chatbot"
import { I18nProvider } from "@/lib/i18n"
import {
  JapaneseSakuraBlossoms,
  JapaneseBambooPattern,
  JapaneseKamon,
  JapaneseMountains,
} from "@/components/japanese-accents"

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
    icon: "/apple-icon.png",
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
          <I18nProvider>
          <SimpleCursor />
          <JapaneseSakuraBlossoms />
          <JapaneseBambooPattern />
          <JapaneseKamon />
          <JapaneseMountains />
          <Header />
          {children}
          <Footer />
          <Chatbot />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
