"use client"

import { personalInfo } from "@/lib/resume-data"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Globe, Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-xl font-bold tracking-tight mb-2">
              <span className="gradient-text">Nexo</span>
              <span className="text-foreground">Code</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {personalInfo.title} — {personalInfo.tagline}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href={personalInfo.github}
              target="_blank"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href={personalInfo.linkedin}
              target="_blank"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href={personalInfo.portfolio}
              target="_blank"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
            >
              <Globe className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center">
            Built with <Heart className="w-4 h-4 mx-1 text-red-500" /> by {personalInfo.name}
          </p>
          <p> {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
