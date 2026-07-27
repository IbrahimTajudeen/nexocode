"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGetPersonalInfoQuery } from "@/lib/redux/api/portfolioApi"
import { Github, Linkedin, Globe, Mail, ArrowDown, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const { data: info } = useGetPersonalInfoQuery()

  if (!info) return null

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 text-xs font-mono rounded-full border-primary/40 bg-primary/10 text-primary uppercase tracking-widest inline-flex items-center gap-1.5 shadow-lg shadow-primary/10"
          >
            <MapPin className="w-3.5 h-3.5" />
            {info.location}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4"
        >
          <span className="gradient-text">{info.name}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-foreground mb-4 tracking-wide"
        >
          {info.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-mono"
        >
          {info.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {info.github && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border/80 hover:border-primary hover:text-primary transition-all text-xs"
              asChild
            >
              <Link href={info.github} target="_blank">
                <Github className="w-3.5 h-3.5 mr-2 text-primary" />
                GitHub
              </Link>
            </Button>
          )}
          {info.linkedin && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border/80 hover:border-primary hover:text-primary transition-all text-xs"
              asChild
            >
              <Link href={info.linkedin} target="_blank">
                <Linkedin className="w-3.5 h-3.5 mr-2 text-primary" />
                LinkedIn
              </Link>
            </Button>
          )}
          {info.portfolio && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border/80 hover:border-primary hover:text-primary transition-all text-xs"
              asChild
            >
              <Link href={info.portfolio} target="_blank">
                <Globe className="w-3.5 h-3.5 mr-2 text-primary" />
                Portfolio
              </Link>
            </Button>
          )}
          {info.email && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border/80 hover:border-primary hover:text-primary transition-all text-xs"
              asChild
            >
              <Link href={`mailto:${info.email}`}>
                <Mail className="w-3.5 h-3.5 mr-2 text-primary" />
                Email
              </Link>
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 font-semibold px-8 transition-all scale-105"
            asChild
          >
            <Link href="#projects">
              <Sparkles className="w-4 h-4 mr-2" />
              Explore Portfolio
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-primary/40 hover:bg-primary/10 text-foreground px-8 font-semibold"
            asChild
          >
            <Link href="#contact">
              Get In Touch
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
