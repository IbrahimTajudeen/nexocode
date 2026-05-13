"use client"

import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { personalInfo } from "@/lib/resume-data"
import { useRef } from "react"
import { Mail, MapPin, Github, Linkedin, Globe, ArrowUpRight, MessageSquare } from "lucide-react"
import Link from "next/link"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@ibrahimtajudeen",
    href: personalInfo.github,
    color: "from-gray-500/20 to-slate-500/20",
    iconColor: "text-gray-600 dark:text-gray-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Ibrahim Tajudeen",
    href: personalInfo.linkedin,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Globe,
    label: "Portfolio",
    value: "nexocode.vercel.app",
    href: personalInfo.portfolio,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-20 lg:py-32 relative bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Open to opportunities in fintech, backend engineering, and technical leadership roles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Link href={link.href} target="_blank">
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/50 group cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <link.icon className={`w-6 h-6 ${link.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{link.label}</h3>
                    <p className="text-sm text-muted-foreground">{link.value}</p>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800">
            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              {personalInfo.location}
            </span>
            <span className="text-muted-foreground">|</span>
            <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              Open to Remote Opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
