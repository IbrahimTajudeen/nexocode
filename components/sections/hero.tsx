"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { personalInfo } from "@/lib/resume-data"
import { Github, Linkedin, Globe, Mail, ArrowDown, MapPin } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-sm font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          >
            <MapPin className="w-3 h-3 mr-1" />
            {personalInfo.location}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-semibold text-foreground mb-4"
        >
          {personalInfo.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            asChild
          >
            <Link href={personalInfo.github} target="_blank">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            asChild
          >
            <Link href={personalInfo.linkedin} target="_blank">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            asChild
          >
            <Link href={personalInfo.portfolio} target="_blank">
              <Globe className="w-4 h-4 mr-2" />
              Portfolio
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            asChild
          >
            <Link href={`mailto:${personalInfo.email}`}>
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-4 mb-20"
        >
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <Link href="/api/resume" target="_blank">
              Download Resume
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            asChild
          >
            <Link href="#projects">
              View Projects
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
