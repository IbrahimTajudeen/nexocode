import { NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import PDFResume from "@/components/pdf/resume"

export const runtime = "nodejs"

export async function GET() {
  try {
    const buffer = await renderToBuffer(<PDFResume />)

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'inline; filename="Ibrahim_Tajudeen_Resume.pdf"',
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)

    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    )
  }
}