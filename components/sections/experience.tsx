"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { workExperience } from "@/lib/resume-data"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Building2, Calendar, CheckCircle2, Rocket } from "lucide-react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Progressive career growth building production-grade systems across fintech, enterprise, and AI domains.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 md:-translate-x-1/2" />

          <div className="space-y-12">
            {workExperience.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className={`relative flex items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-background shadow-lg md:-translate-x-1/2 z-10 mt-6" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}>
                  <Card className="hover:shadow-xl transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <CardTitle className="text-xl">{exp.company}</CardTitle>
                          </div>
                          <CardDescription className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3" />
                            <span>{exp.period}</span>
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="rounded-full border-blue-500/30 text-blue-600 dark:text-blue-400"
                        >
                          {exp.role}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                          <Rocket className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                          Key Project: {exp.keyProject}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs rounded-md"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Responsibilities</h4>
                        <ul className="space-y-1.5">
                          {exp.responsibilities.slice(0, 4).map((resp, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 mr-2 shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                          Achievements
                        </h4>
                        <ul className="space-y-1.5">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 mr-2 shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
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
