"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { professionalSummary } from "@/lib/resume-data"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Database, Shield, Server } from "lucide-react"

const highlights = [
  {
    icon: Server,
    title: "Backend Systems",
    description: "Scalable APIs & Microservices",
  },
  {
    icon: Database,
    title: "Fintech Infrastructure",
    description: "Payment Systems & Wallets",
  },
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "Web, Desktop & Mobile",
  },
  {
    icon: Shield,
    title: "Security & Auth",
    description: "Enterprise-grade Protection",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Summary</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                  {professionalSummary}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-3">
                      <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
