"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetWorkExperienceQuery } from "@/lib/redux/api/portfolioApi"
import { Building2, Calendar, CheckCircle2, Rocket } from "lucide-react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { data: experiences = [] } = useGetWorkExperienceQuery()

  return (
    <section id="experience" className="py-20 lg:py-28 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Engineering background across fintech platforms, enterprise systems, and developer tooling.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Bar */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id || exp.company}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3.5 h-3.5 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10 mt-6 shadow-sm" />

                {/* Card Container */}
                <div
                  className={`ml-10 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <Card className="border border-border/80 bg-card/70 backdrop-blur-md hover:border-primary/40 transition-all duration-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Building2 className="w-4 h-4 text-primary shrink-0" />
                            <CardTitle className="text-lg font-bold text-foreground">{exp.company}</CardTitle>
                          </div>
                          <CardDescription className="flex items-center space-x-2 font-mono text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.period}</span>
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="rounded-full border-border bg-secondary/50 text-foreground text-xs font-medium"
                        >
                          {exp.role}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {exp.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      )}

                      {exp.keyProject && (
                        <div>
                          <h4 className="text-xs font-mono uppercase text-foreground mb-2 flex items-center font-semibold tracking-wider">
                            <Rocket className="w-3.5 h-3.5 mr-1.5 text-primary" />
                            Key Project: {exp.keyProject}
                          </h4>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-[11px] font-mono rounded-md bg-secondary/60 text-secondary-foreground"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <div>
                          <h4 className="text-xs font-mono uppercase text-muted-foreground mb-2 tracking-wider">
                            Responsibilities
                          </h4>
                          <ul className="space-y-1.5">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 mr-2 shrink-0" />
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exp.achievements && exp.achievements.length > 0 && (
                        <div>
                          <h4 className="text-xs font-mono uppercase text-foreground mb-2 flex items-center tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                            Achievements
                          </h4>
                          <ul className="space-y-1.5">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 mt-1.5 mr-2 shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
