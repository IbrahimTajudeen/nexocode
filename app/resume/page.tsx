"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import PDFResume, { PDFAccent } from "@/components/pdf/resume"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Eye, Loader2, ArrowLeft } from "lucide-react"
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

export default function ResumePage() {
  const [isClient, setIsClient] = useState(false)
  const { neonColor } = useTheme()

  const { data: personalInfo, isLoading: l1 } = useGetPersonalInfoQuery()
  const { data: skillCategories, isLoading: l2 } = useGetSkillCategoriesQuery()
  const { data: workExperience, isLoading: l3 } = useGetWorkExperienceQuery()
  const { data: projects, isLoading: l4 } = useGetProjectsQuery()
  const { data: education, isLoading: l5 } = useGetEducationQuery()
  const { data: leadershipStrengthsData, isLoading: l6 } = useGetLeadershipStrengthsQuery()

  const isDataLoading = l1 || l2 || l3 || l4 || l5 || l6

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-2 text-muted-foreground font-mono text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading resume from Supabase...</span>
        </div>
      </div>
    )
  }

  const leadershipStrengths = (leadershipStrengthsData || []).map((s) => s.content)
  const accent: PDFAccent = neonColor

  const pdfDoc = (
    <PDFResume
      accent={accent}
      personalInfo={personalInfo}
      skillCategories={skillCategories}
      workExperience={workExperience}
      projects={projects}
      education={education}
      leadershipStrengths={leadershipStrengths}
    />
  )

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Dynamic Background Glow Orbs - matches Hero section styling */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full border border-border/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
          </Link>
          <ThemeToggle />
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-mono mb-4 uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5" />
            <span>ATS-Friendly Export</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">
            <span className="gradient-text">Resume</span> Document
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Generated live from the same profile data shown on the portfolio. Accent color matches your selected neon theme.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <PDFDownloadLink document={pdfDoc} fileName={`${(personalInfo?.name || "resume").replace(/\s+/g, "_")}_Resume.pdf`}>
            {({ loading }) => (
              <Button
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 font-semibold px-8 transition-all"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {loading ? "Generating..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-primary/40 hover:border-primary hover:text-primary px-8"
            asChild
          >
            <a href={`/api/resume?theme=${accent}`} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4 mr-2" />
              Open Raw PDF
            </a>
          </Button>
        </div>

        <Card className="border border-border/80 bg-card/60 backdrop-blur-md overflow-hidden shadow-xl">
          <CardContent className="p-0">
            <div className="w-full h-[800px]">
              <PDFViewer width="100%" height="100%" className="border-0" showToolbar={false}>
                {pdfDoc}
              </PDFViewer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
