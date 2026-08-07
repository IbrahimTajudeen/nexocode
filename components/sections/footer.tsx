"use client"

import { useGetPersonalInfoQuery } from "@/lib/redux/api/portfolioApi"
import { personalInfo as defaultPersonalInfo } from "@/lib/resume-data"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Globe, FileText, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const { data: personalInfo = defaultPersonalInfo } = useGetPersonalInfoQuery()

  return (
    <footer className="py-12 border-t border-border/80 bg-card/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="text-xl font-bold tracking-tight mb-1 flex items-center gap-1.5">
              <span className="text-primary text-2xl font-black">NEXO</span>
              <span className="text-foreground tracking-widest font-mono text-xs uppercase">CODE</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-md font-mono">
              {personalInfo.title} • {personalInfo.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-xl border border-border/80 hover:border-primary text-muted-foreground hover:text-foreground transition-all bg-card/60"
            >
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Resume PDF</span>
            </Link>

            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-xl border border-border bg-card/80 hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2.5">
            {personalInfo.github && (
              <Link
                href={personalInfo.github}
                target="_blank"
                aria-label="GitHub Profile"
                className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
              >
                <Github className="w-4 h-4" />
              </Link>
            )}
            {personalInfo.linkedin && (
              <Link
                href={personalInfo.linkedin}
                target="_blank"
                aria-label="LinkedIn Profile"
                className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            )}
            {personalInfo.portfolio && (
              <Link
                href={personalInfo.portfolio}
                target="_blank"
                aria-label="Portfolio Site"
                className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
              >
                <Globe className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        <Separator className="my-6 bg-border/60" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <p>Designed & Developed by {personalInfo.name}</p>
          <p>© {new Date().getFullYear()} NEXOCODE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
