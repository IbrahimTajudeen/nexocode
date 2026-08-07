"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetProjectsQuery } from "@/lib/redux/api/portfolioApi"
import { ProjectType } from "@/types/resume"
import { Search, ExternalLink, Github, Lock, UserCheck, Code } from "lucide-react"

export default function Projects() {
  const { data: projectList = [], isLoading } = useGetProjectsQuery()
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeType, setActiveType] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const categories = ["All", ...Array.from(new Set(projectList.map((p) => p.category)))]
  const projectTypes: { id: string; label: string }[] = [
    { id: "All", label: "All Projects" },
    { id: "public", label: "Open Source" },
    { id: "customer", label: "Client Work" },
    { id: "private", label: "Private Systems" },
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
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 font-normal">
            <Code className="w-3 h-3" /> Public
          </Badge>
        )
      case "customer":
        return (
          <Badge className="bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 font-normal">
            <UserCheck className="w-3 h-3" /> Client Work
          </Badge>
        )
      case "private":
        return (
          <Badge className="bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 font-normal">
            <Lock className="w-3 h-3" /> Private
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-background/50 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Production systems, compiler architectures, fintech infrastructure, and enterprise tools built across public and client environments.
          </p>
        </motion.div>

        {/* Search & Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 space-y-5"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by project, technology, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/80 bg-card/80 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
            />
          </div>

          {/* Project Type Filters */}
          <div className="flex flex-wrap gap-2">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  activeType === type.id
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "border-border/80 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-md text-xs transition-all duration-150 ${
                  activeCategory === category
                    ? "bg-secondary text-secondary-foreground font-semibold border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl border border-border/60 bg-card/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                >
                  <Card className="h-full flex flex-col justify-between border border-border/80 bg-card/80 backdrop-blur-md hover:border-primary/40 hover:shadow-md transition-all duration-200 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {getVisibilityBadge(project.project_type)}
                        <Badge variant="outline" className="text-[10px] rounded-full border-border text-muted-foreground font-normal">
                          {project.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      {project.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">{project.description}</p>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="text-[11px] rounded bg-secondary/80 text-secondary-foreground font-mono font-normal"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>

                        {project.highlights && project.highlights.length > 0 && (
                          <ul className="space-y-1.5 pt-2 border-t border-border/40">
                            {project.highlights.map((highlight, i) => (
                              <li
                                key={i}
                                className="text-xs text-muted-foreground flex items-start leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 mr-2 shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        )}
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
                            <Lock className="w-3 h-3" /> Private Source
                          </span>
                        )}

                        {project.demo_url ? (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs font-medium transition-all"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/50 italic">Internal Platform</span>
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
          <div className="text-center py-12 bg-card/40 rounded-xl border border-dashed border-border text-muted-foreground">
            <p className="text-sm font-medium mb-1">No matching projects found.</p>
            <p className="text-xs">Try clearing search terms or changing your filter criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
