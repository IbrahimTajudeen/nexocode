"use client"

import { useState, useEffect } from "react"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import PDFResume from "@/components/pdf/resume"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Eye, Loader2 } from "lucide-react"

export default function ResumePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading resume...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Resume</span> Document
          </h1>
          <p className="text-muted-foreground">
            ATS-friendly PDF resume ready for download
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <PDFDownloadLink
            document={<PDFResume />}
            fileName="Ibrahim_Tajudeen_Resume.pdf"
          >
            {({ loading }) => (
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
            className="rounded-full"
            asChild
          >
            <a href="/api/resume" target="_blank">
              <FileText className="w-4 h-4 mr-2" />
              View Raw PDF
            </a>
          </Button>
        </div>

        <Card className="border-border/50 overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full h-[800px]">
              <PDFViewer width="100%" height="100%" className="border-0">
                <PDFResume />
              </PDFViewer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
