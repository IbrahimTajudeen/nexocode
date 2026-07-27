"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetWorkExperienceQuery } from "@/lib/redux/api/portfolioApi"
import { Building2, Calendar, CheckCircle2, Rocket, Briefcase } from "lucide-react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { data: experiences = [] } = useGetWorkExperienceQuery()

  return (
    <section id="experience" className="py-20 lg:py-32 relative bg-background">
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
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-transparent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Engineering leadership and software development experience across fintech platforms, enterprise systems, and developer tooling.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id || exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className={`relative flex items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50 md:-translate-x-1/2 z-10 mt-6" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}>
                  <Card className="border border-border/80 bg-card/60 backdrop-blur-md hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Building2 className="w-4 h-4 text-primary" />
                            <CardTitle className="text-xl font-bold">{exp.company}</CardTitle>
                          </div>
                          <CardDescription className="flex items-center space-x-2 font-mono text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.period}</span>
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="rounded-full border-primary/40 text-primary bg-primary/10 text-xs"
                        >
                          {exp.role}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {exp.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                      )}
                      <div>
                        <h4 className="text-xs font-mono uppercase text-foreground mb-2 flex items-center font-bold">
                          <Rocket className="w-4 h-4 mr-2 text-primary" />
                          Key Project: {exp.keyProject}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-[11px] font-mono rounded-md"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase text-foreground mb-2">Responsibilities</h4>
                        <ul className="space-y-1.5">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 mr-2 shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <div>
                          <h4 className="text-xs font-mono uppercase text-foreground mb-2 flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                            Achievements
                          </h4>
                          <ul className="space-y-1.5">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 mt-1.5 mr-2 shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
