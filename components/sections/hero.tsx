"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useGetPersonalInfoQuery } from "@/lib/redux/api/portfolioApi"
import { Github, Linkedin, Globe, Mail, ArrowDown, MapPin, Code2 } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const { data: info } = useGetPersonalInfoQuery()

  if (!info) return null

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-xs font-mono text-muted-foreground mb-6 shadow-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{info.location}</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500 ml-1 inline-block" />
          <span className="text-[11px] text-foreground font-sans">Available for Opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4 text-foreground"
        >
          {info.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-semibold text-primary mb-6 tracking-normal"
        >
          {info.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {info.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {info.github && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-border bg-card/60 hover:bg-card hover:text-primary transition-all text-xs font-medium"
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
              className="rounded-xl border-border bg-card/60 hover:bg-card hover:text-primary transition-all text-xs font-medium"
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
              className="rounded-xl border-border bg-card/60 hover:bg-card hover:text-primary transition-all text-xs font-medium"
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
              className="rounded-xl border-border bg-card/60 hover:bg-card hover:text-primary transition-all text-xs font-medium"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            className="rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-medium px-7 shadow-sm transition-all"
            asChild
          >
            <Link href="#projects">
              <Code2 className="w-4 h-4 mr-2" />
              View Featured Work
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-border bg-card/80 hover:bg-accent text-foreground px-7 font-medium"
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
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pt-8"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <ArrowDown className="w-4 h-4 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
