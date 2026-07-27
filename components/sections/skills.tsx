"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchSkillCategories } from "@/lib/data-provider"
import { SkillCategory } from "@/types/resume"
import {
  Code2,
  Layout,
  Server,
  Database,
  Shield,
  GitBranch,
  Brain,
  Cpu,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layout,
  Server,
  Database,
  Shield,
  GitBranch,
  Brain,
  Cpu,
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [categories, setCategories] = useState<SkillCategory[]>([])

  useEffect(() => {
    async function loadData() {
      const data = await fetchSkillCategories()
      setCategories(data)
    }
    loadData()
  }, [])

  return (
    <section id="skills" className="py-20 lg:py-32 relative bg-background/50">
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
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNOLOGY STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Technical <span className="gradient-text">Competencies</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-transparent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Comprehensive expertise across backend system architecture, databases, cloud infrastructure, and cross-platform client development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Code2
            return (
              <motion.div
                key={category.id || category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              >
                <Card className="h-full border border-border/80 bg-card/60 backdrop-blur-md hover:border-primary/50 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform text-primary">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg font-bold">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary/80 hover:bg-primary hover:text-primary-foreground transition-all border border-border/40"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
