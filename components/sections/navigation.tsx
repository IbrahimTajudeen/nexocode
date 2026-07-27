"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText, ShieldCheck } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-1.5">
            <span className="gradient-text text-2xl font-black">NEXO</span>
            <span className="text-foreground tracking-widest font-mono text-sm uppercase">CODE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/40 hover:border-primary text-xs"
              asChild
            >
              <Link href="/resume">
                <FileText className="h-3.5 w-3.5 mr-1.5 text-primary" />
                Resume PDF
              </Link>
            </Button>

            <Button
              variant="default"
              size="sm"
              className="rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20"
              asChild
            >
              <Link href="/admin/login">
                <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                Admin
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full border-primary/40 text-xs"
                  asChild
                >
                  <Link href="/resume" onClick={() => setIsMobileMenuOpen(false)}>
                    <FileText className="h-3.5 w-3.5 mr-2 text-primary" />
                    Resume PDF Viewer
                  </Link>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="w-full rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                  asChild
                >
                  <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShieldCheck className="h-3.5 w-3.5 mr-2" />
                    Admin Login Portal
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
