"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { education, leadershipAndStrengths } from "@/lib/resume-data"
import { useRef } from "react"
import { GraduationCap, Award, Star, Target, Lightbulb, Users, Code2, Shield, Rocket } from "lucide-react"

const strengthIcons = [Target, Lightbulb, Shield, Code2, Users, Rocket, Star]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="education" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Education & <span className="gradient-text">Strengths</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 hover:shadow-md transition-shadow">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      </div>
                      {edu.year && (
                        <Badge variant="outline" className="rounded-full text-xs">
                          {edu.year}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership & Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Leadership & Strengths
            </h3>
            <div className="space-y-4">
              {leadershipAndStrengths.map((strength, index) => {
                const IconComponent = strengthIcons[index % strengthIcons.length]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="border-border/50 bg-gradient-to-br from-card to-card/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-5 flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {strength}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
