"use client"

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import PDFResume, { PDFAccent } from "@/components/pdf/resume"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Loader2 } from "lucide-react"
import { PersonalInfo, SkillCategory, WorkExperience, Project, Education } from "@/types/resume"

interface ResumeViewerClientProps {
  accent: PDFAccent
  personalInfo: PersonalInfo
  skillCategories: SkillCategory[]
  workExperience: WorkExperience[]
  projects: Project[]
  education: Education[]
  leadershipStrengths: string[]
}

export default function ResumeViewerClient({
  accent,
  personalInfo,
  skillCategories,
  workExperience,
  projects,
  education,
  leadershipStrengths,
}: ResumeViewerClientProps) {
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
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-3">
        <PDFDownloadLink
          document={pdfDoc}
          fileName={`${(personalInfo?.name || "resume").replace(/\s+/g, "_")}_Resume.pdf`}
        >
          {({ loading }: { loading: boolean }) => (
            <Button
              size="lg"
              className="rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-semibold px-6 transition-all shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {loading ? "Generating PDF..." : "Download Resume PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      <Card className="border border-border/80 bg-card/80 backdrop-blur-md overflow-hidden shadow-md">
        <CardContent className="p-0">
          <div className="w-full h-[800px]">
            <PDFViewer width="100%" height="100%" className="border-0" showToolbar={false}>
              {pdfDoc}
            </PDFViewer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
