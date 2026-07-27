"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, TerminalSquare } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-4">
      {/* Dynamic Background Glow Orbs - matches Hero section styling */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-xl w-full text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-mono mb-8 uppercase tracking-widest">
          <TerminalSquare className="w-3.5 h-3.5" />
          <span>404 — Route Not Found</span>
        </div>

        <h1 className="text-7xl sm:text-9xl font-black tracking-tight mb-4">
          <span className="gradient-text">404</span>
        </h1>

        <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-transparent mx-auto rounded-full mb-6" />

        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
          This page doesn&apos;t exist in the codebase.
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-10 font-mono text-sm leading-relaxed">
          The route you requested couldn&apos;t be resolved — it may have been moved, renamed, or never deployed.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 font-semibold px-8 transition-all"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="rounded-full border-border/80 hover:border-primary hover:text-primary transition-all px-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
