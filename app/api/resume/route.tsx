import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@supabase/supabase-js";
import PDFResume, { PDFAccent } from "@/components/pdf/resume";
import {
  personalInfo as defaultPersonalInfo,
  skillCategories as defaultSkillCategories,
  workExperience as defaultWorkExperience,
  projects as defaultProjects,
  education as defaultEducation,
  leadershipAndStrengths as defaultLeadershipStrengths,
} from "@/lib/resume-data";
import { PersonalInfo, WorkExperience } from "@/types/resume";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// See lib/redux/api/portfolioApi.ts - the DB columns are snake_case
// (key_project, resume_website) while the app's TS types use camelCase.
function rowToWorkExperience(row: any): WorkExperience {
  const { key_project, ...rest } = row;
  return { ...rest, keyProject: key_project ?? "" };
}
function rowToPersonalInfo(row: any): PersonalInfo {
  const { resume_website, ...rest } = row;
  return { ...rest, resumeWebsite: resume_website ?? "" };
}

async function fetchResumeData() {
  if (!isSupabaseConfigured) {
    return {
      personalInfo: defaultPersonalInfo,
      skillCategories: defaultSkillCategories,
      workExperience: defaultWorkExperience,
      projects: defaultProjects,
      education: defaultEducation,
      leadershipStrengths: defaultLeadershipStrengths,
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const [personalRes, skillsRes, expRes, projectsRes, eduRes, strengthsRes] = await Promise.all([
      supabase.from("personal_info").select("*").single(),
      supabase.from("skill_categories").select("*").order("sort_order", { ascending: true }),
      supabase.from("work_experience").select("*").order("sort_order", { ascending: true }),
      supabase.from("projects").select("*").order("sort_order", { ascending: true }),
      supabase.from("education").select("*").order("sort_order", { ascending: true }),
      supabase.from("leadership_strengths").select("*").order("sort_order", { ascending: true }),
    ]);

    return {
      personalInfo: personalRes.data ? rowToPersonalInfo(personalRes.data) : defaultPersonalInfo,
      skillCategories: skillsRes.data && skillsRes.data.length > 0 ? skillsRes.data : defaultSkillCategories,
      workExperience: expRes.data && expRes.data.length > 0 ? expRes.data.map(rowToWorkExperience) : defaultWorkExperience,
      projects: projectsRes.data && projectsRes.data.length > 0 ? projectsRes.data : defaultProjects,
      education: eduRes.data && eduRes.data.length > 0 ? eduRes.data : defaultEducation,
      leadershipStrengths:
        strengthsRes.data && strengthsRes.data.length > 0
          ? strengthsRes.data.map((s: any) => s.content)
          : defaultLeadershipStrengths,
    };
  } catch {
    return {
      personalInfo: defaultPersonalInfo,
      skillCategories: defaultSkillCategories,
      workExperience: defaultWorkExperience,
      projects: defaultProjects,
      education: defaultEducation,
      leadershipStrengths: defaultLeadershipStrengths,
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const themeParam = request.nextUrl.searchParams.get("theme");
    const accent: PDFAccent = themeParam === "green" || themeParam === "red" ? themeParam : "blue";

    const data = await fetchResumeData();

    const buffer = await renderToBuffer(
      <PDFResume
        accent={accent}
        personalInfo={data.personalInfo}
        skillCategories={data.skillCategories}
        workExperience={data.workExperience}
        projects={data.projects}
        education={data.education}
        leadershipStrengths={data.leadershipStrengths}
      />
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="resume.pdf"',
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
