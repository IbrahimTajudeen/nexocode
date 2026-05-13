import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import PDFResume from "@/components/pdf/resume";

export const runtime = "nodejs";

export async function GET() {
  try {
    const buffer = await renderToBuffer(<PDFResume />);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);

    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
