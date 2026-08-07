"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useGetPersonalInfoQuery, useGetHighlightsQuery } from "@/lib/redux/api/portfolioApi"
import { Code2, Database, Shield, Server, Sparkles } from "lucide-react"

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
    <section id="about" className="py-20 lg:py-28 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Professional Overview
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Core engineering philosophy, system architecture focus, and technical capabilities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Bio Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 flex"
          >
            <Card className="w-full border border-border/80 bg-card/70 backdrop-blur-md shadow-sm flex flex-col justify-center">
              <CardContent className="p-7 sm:p-8">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  Engineering Profile
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                  {info?.summary ||
                    "Software Engineer experienced in building scalable backend systems, fintech infrastructure, AI-powered platforms, and cross-platform applications across web, desktop, and mobile environments."}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Highlights Grid */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Sparkles
              return (
                <motion.div
                  key={item.id || item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                >
                  <Card className="h-full border border-border/80 bg-card/60 hover:border-primary/40 hover:bg-card transition-all duration-200 shadow-sm group">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 text-primary shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1 text-sm">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
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
