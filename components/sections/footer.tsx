"use client"

import { personalInfo } from "@/lib/resume-data"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Globe, Heart, FileText, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border/80 bg-background/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="text-xl font-bold tracking-tight mb-2 flex items-center gap-1.5">
              <span className="gradient-text text-2xl font-black">NEXO</span>
              <span className="text-foreground tracking-widest font-mono text-sm uppercase">CODE</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-md font-mono">
              {personalInfo.title} • {personalInfo.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 rounded-full border border-border/80 hover:border-primary text-muted-foreground hover:text-primary transition-all bg-card/40"
            >
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Resume PDF</span>
            </Link>

            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary transition-all font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href={personalInfo.github}
              target="_blank"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-full border border-border/80 bg-card/60 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href={personalInfo.linkedin}
              target="_blank"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-full border border-border/80 bg-card/60 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link
              href={personalInfo.portfolio}
              target="_blank"
              aria-label="Portfolio Site"
              className="w-9 h-9 rounded-full border border-border/80 bg-card/60 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
            >
              <Globe className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <Separator className="my-6 bg-border/60" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <p className="flex items-center">
            Built with <Heart className="w-3.5 h-3.5 mx-1.5 text-rose-500 fill-rose-500" /> by {personalInfo.name}
          </p>
          <p>© {new Date().getFullYear()} NEXOCODE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
