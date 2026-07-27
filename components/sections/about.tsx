"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useGetPersonalInfoQuery, useGetHighlightsQuery } from "@/lib/redux/api/portfolioApi"
import { Code2, Database, Shield, Server, User, Sparkles } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Database,
  Shield,
  Server,
  Sparkles,
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { data: info } = useGetPersonalInfoQuery()
  const { data: highlights = [] } = useGetHighlightsQuery()

  return (
    <section id="about" className="py-20 lg:py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Standardized Neon Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-mono mb-4">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & SUMMARY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Professional <span className="gradient-text">Overview</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-transparent mx-auto rounded-full mb-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Bio Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-full"
          >
            <Card className="h-full border border-border/80 bg-card/60 backdrop-blur-md hover:border-primary/40 transition-all shadow-xl">
              <CardContent className="p-8 flex flex-col justify-center">
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground whitespace-pre-line font-normal">
                  {info?.summary || "Software Engineer experienced in building scalable backend systems, fintech infrastructure, AI-powered platforms, and cross-platform applications across web, desktop, and mobile environments."}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Sparkles
              return (
                <motion.div
                  key={item.id || item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full border border-border/80 bg-card/60 backdrop-blur-md hover:border-primary/50 transition-all group cursor-default">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-primary">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-foreground mb-1 text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
