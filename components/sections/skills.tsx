"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetSkillCategoriesQuery } from "@/lib/redux/api/portfolioApi"
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
  const { data: categories = [] } = useGetSkillCategoriesQuery()

  return (
    <section id="skills" className="py-20 lg:py-28 relative bg-background/50 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Technical Competencies
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Technologies, frameworks, databases, and core tooling across backend, frontend, and DevOps architectures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Code2
            return (
              <motion.div
                key={category.id || category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
              >
                <Card className="h-full border border-border/80 bg-card/70 backdrop-blur-md hover:border-primary/40 transition-all duration-200 shadow-sm group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <CardTitle className="text-base font-bold text-foreground">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary/70 hover:bg-secondary text-secondary-foreground transition-all border border-border/40 font-normal"
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
