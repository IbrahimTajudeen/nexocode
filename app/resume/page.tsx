"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Eye, Loader2, ArrowLeft } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"
import {
  useGetPersonalInfoQuery,
  useGetSkillCategoriesQuery,
  useGetWorkExperienceQuery,
  useGetProjectsQuery,
  useGetEducationQuery,
  useGetLeadershipStrengthsQuery,
} from "@/lib/redux/api/portfolioApi"
import { personalInfo as defaultPersonalInfo } from "@/lib/resume-data"

const ResumeViewerClient = dynamic(
  () => import("@/components/pdf/resume-viewer-client"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] flex items-center justify-center border border-border/80 rounded-2xl bg-card/40">
        <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Preparing PDF Renderer...</span>
        </div>
      </div>
    ),
  }
)

export default function ResumePage() {
  const [isClient, setIsClient] = useState(false)
  const { neonColor } = useTheme()

  const { data: personalInfo = defaultPersonalInfo, isLoading: l1 } = useGetPersonalInfoQuery()
  const { data: skillCategories = [], isLoading: l2 } = useGetSkillCategoriesQuery()
  const { data: workExperience = [], isLoading: l3 } = useGetWorkExperienceQuery()
  const { data: projects = [], isLoading: l4 } = useGetProjectsQuery()
  const { data: education = [], isLoading: l5 } = useGetEducationQuery()
  const { data: leadershipStrengthsData = [], isLoading: l6 } = useGetLeadershipStrengthsQuery()

  const isDataLoading = l1 || l2 || l3 || l4 || l5 || l6

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-2 text-muted-foreground font-mono text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Loading resume profile data...</span>
        </div>
      </div>
    )
  }

  const leadershipStrengths = leadershipStrengthsData.map((s) => s.content)
  const accent = neonColor

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-xl border border-border/80 bg-card/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
          </Link>
          <ThemeToggle />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-foreground">
            Resume Export
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Live ATS-friendly PDF generated directly from your profile data.
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-border bg-card/80 hover:bg-accent text-foreground text-xs font-medium"
              asChild
            >
              <a href={`/api/resume?theme=${accent}`} target="_blank" rel="noopener noreferrer">
                <Eye className="w-3.5 h-3.5 mr-1.5 text-primary" />
                Open Raw PDF Stream
              </a>
            </Button>
          </div>
        </div>

        <ResumeViewerClient
          accent={accent}
          personalInfo={personalInfo}
          skillCategories={skillCategories}
          workExperience={workExperience}
          projects={projects}
          education={education}
          leadershipStrengths={leadershipStrengths}
        />
      </div>
    </div>
  )
}
