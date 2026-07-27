"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetProjectsQuery } from "@/lib/redux/api/portfolioApi"
import { ProjectType } from "@/types/resume"
import { Search, Zap, ExternalLink, Github, Lock, UserCheck, Code } from "lucide-react"

export default function Projects() {
  const { data: projectList = [], isLoading } = useGetProjectsQuery()
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeType, setActiveType] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const categories = ["All", ...Array.from(new Set(projectList.map((p) => p.category)))]
  const projectTypes: { id: string; label: string }[] = [
    { id: "All", label: "All Types" },
    { id: "public", label: "Public Source" },
    { id: "customer", label: "Client Projects" },
    { id: "private", label: "Private Repos" },
  ]

  const filteredProjects = projectList.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory
    const matchesType = activeType === "All" || project.project_type === activeType
    const matchesSearch =
      searchQuery === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  const getVisibilityBadge = (type: ProjectType) => {
    switch (type) {
      case "public":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
            <Code className="w-3 h-3" /> Public
          </Badge>
        )
      case "customer":
        return (
          <Badge className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
            <UserCheck className="w-3 h-3" /> Client Work
          </Badge>
        )
      case "private":
        return (
          <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
            <Lock className="w-3 h-3" /> Private
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <section id="projects" className="py-20 lg:py-32 relative bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>PRODUCTION & OPEN SOURCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-transparent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A showcase of production systems, open-source compilers, fintech infrastructure, and enterprise software built across various domains.
          </p>
        </motion.div>

        {/* Controls: Search, Category Filters, and Project Type Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by project name, tech stack, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-border/80 bg-card/60 backdrop-blur-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            />
          </div>

          {/* Visibility Type Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                  activeType === type.id
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                    : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 pt-2 border-t border-border/40 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-md text-xs transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-secondary text-secondary-foreground font-semibold border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-16 text-muted-foreground animate-pulse font-mono text-sm">
            Loading RTK Query project stream...
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                >
                  <Card className="h-full flex flex-col justify-between border border-border/80 bg-card/70 backdrop-blur-md hover:border-primary/60 hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        {getVisibilityBadge(project.project_type)}
                        <Badge variant="outline" className="text-[10px] rounded-full border-border">
                          {project.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="text-[11px] rounded-md bg-secondary/80 text-secondary-foreground font-mono"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>

                        <ul className="space-y-1.5 pt-2 border-t border-border/40">
                          {project.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="text-xs text-muted-foreground flex items-start leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 mr-2 shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Project Links Section */}
                      <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-2">
                        {project.github_url ? (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground/60 italic">
                            <Lock className="w-3 h-3" /> Source Protected
                          </span>
                        )}

                        {project.demo_url ? (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs font-medium transition-all"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/50 italic">Internal System</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-16 bg-card/40 rounded-2xl border border-dashed border-border text-muted-foreground">
            <p className="text-base font-medium mb-1">No matching projects found.</p>
            <p className="text-xs">Try adjusting your search terms or filter selection.</p>
          </div>
        )}
      </div>
    </section>
  )
}
