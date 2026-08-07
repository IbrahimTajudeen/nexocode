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
    <section id="education" className="py-20 lg:py-28 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Education & Core Strengths
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Formal qualifications, technical diplomas, and core software leadership capabilities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Education List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="text-lg font-bold flex items-center gap-2 text-foreground mb-4">
              <GraduationCap className="w-5 h-5 text-primary" />
              Education & Diplomas
            </h3>
            <div className="space-y-3">
              {eduList.map((edu, index) => (
                <motion.div
                  key={edu.id || edu.degree}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <Card className="border border-border/80 bg-card/70 backdrop-blur-md hover:border-primary/40 transition-all shadow-sm">
                    <CardContent className="p-4 sm:p-5 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-foreground text-sm sm:text-base">{edu.degree}</h4>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">{edu.institution}</p>
                      </div>
                      {edu.year && (
                        <Badge variant="outline" className="rounded-full text-xs font-mono border-border text-muted-foreground font-normal">
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 space-y-4"
          >
            <h3 className="text-lg font-bold flex items-center gap-2 text-foreground mb-4">
              <Award className="w-5 h-5 text-primary" />
              Leadership & Engineering Capabilities
            </h3>
            <div className="space-y-3">
              {leadershipStrengths.map((strength, index) => {
                const IconComponent = strengthIcons[index % strengthIcons.length]
                return (
                  <motion.div
                    key={strength.id || index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                  >
                    <Card className="border border-border/80 bg-card/70 backdrop-blur-md hover:border-primary/40 transition-all shadow-sm">
                      <CardContent className="p-4 flex items-start space-x-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                          <IconComponent className="w-3.5 h-3.5" />
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
