"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetEducationQuery, useGetLeadershipStrengthsQuery } from "@/lib/redux/api/portfolioApi"
import { GraduationCap, Award, Star, Target, Lightbulb, Users, Code2, Shield, Rocket } from "lucide-react"

const strengthIcons = [Target, Lightbulb, Shield, Code2, Users, Rocket, Star]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { data: eduList = [] } = useGetEducationQuery()
  const { data: leadershipStrengths = [] } = useGetLeadershipStrengthsQuery()

  return (
    <section id="education" className="py-20 lg:py-32 relative bg-background/50">
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
            <GraduationCap className="w-3.5 h-3.5" />
            <span>CREDENTIALS & CORE COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Education & <span className="gradient-text">Strengths</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-transparent mx-auto rounded-full mb-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education List */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <GraduationCap className="w-5 h-5 text-primary" />
              Education & Diplomas
            </h3>
            <div className="space-y-4">
              {eduList.map((edu, index) => (
                <motion.div
                  key={edu.id || edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                >
                  <Card className="border border-border/80 bg-card/60 backdrop-blur-md hover:border-primary/50 transition-all">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-foreground text-sm sm:text-base">{edu.degree}</h4>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">{edu.institution}</p>
                      </div>
                      {edu.year && (
                        <Badge variant="outline" className="rounded-full text-xs font-mono border-primary/40 text-primary">
                          {edu.year}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership & Strengths List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <Award className="w-5 h-5 text-primary" />
              Leadership & Core Strengths
            </h3>
            <div className="space-y-4">
              {leadershipStrengths.map((strength, index) => {
                const IconComponent = strengthIcons[index % strengthIcons.length]
                return (
                  <motion.div
                    key={strength.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  >
                    <Card className="border border-border/80 bg-card/60 backdrop-blur-md hover:border-primary/50 transition-all">
                      <CardContent className="p-4 flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {strength.content}
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
