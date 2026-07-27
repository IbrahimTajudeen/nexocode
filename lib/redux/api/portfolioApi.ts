import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  workExperience as defaultWorkExperience,
  skillCategories as defaultSkillCategories,
  education as defaultEducation,
} from "@/lib/resume-data"
import { PersonalInfo, Project, WorkExperience, SkillCategory, Education, ContactSubmission, Highlight, LeadershipStrength } from "@/types/resume"

// Default fallback content for the About-section highlight cards and the
// Education section's "Leadership & Core Strengths" list. Used only when
// Supabase isn't configured (see isSupabaseConfigured elsewhere in this
// file) - once Supabase is live, this comes from the highlights and
// leadership_strengths tables (see supabase/schema.sql).
const defaultHighlights: Highlight[] = [
  { id: "hl-1", icon: "Server", title: "Backend Systems", description: "Scalable APIs, Microservices & Distributed Architecture" },
  { id: "hl-2", icon: "Database", title: "Fintech Infrastructure", description: "Payment Systems, Virtual Accounts & Ledger Wallets" },
  { id: "hl-3", icon: "Code2", title: "Full Stack Engineering", description: "Cross-Platform Web, Desktop & Mobile Systems" },
  { id: "hl-4", icon: "Shield", title: "Security & Auth", description: "RBAC, JWT, Row-Level Security & Fraud Prevention" },
]
const defaultLeadershipStrengths: LeadershipStrength[] = [
  "Led architecture and development for fintech systems, authentication platforms, AI-powered solutions, and developer tooling projects.",
  "Strong expertise in backend API development, scalable system architecture, database optimization, and secure application engineering.",
  "Experienced in designing financial systems including wallet infrastructure, transaction workflows, reconciliation logic, and secure payment integrations.",
  "Skilled in cross-platform application development across web, desktop, and mobile ecosystems.",
  "Comfortable owning projects end-to-end from planning and architecture through deployment and production optimization.",
  "Strong problem-solving mindset with experience building production-oriented systems under real-world engineering constraints.",
  "Focused on clean architecture, maintainable codebases, scalable infrastructure, and modern software engineering best practices.",
].map((content, i) => ({ id: `ls-${i + 1}`, content }))

// --- camelCase <-> snake_case field mappers ---
// The app's TS types use camelCase (keyProject, resumeWebsite) to match
// the rest of the codebase's naming convention, but the actual Postgres
// columns are snake_case (key_project, resume_website). PostgREST rejects
// inserts/updates that reference a column name it doesn't recognize, so
// without this mapping every work_experience write and the resume website
// field on personal_info silently fail once Supabase is configured.
function workExperienceToRow(exp: Partial<WorkExperience>) {
  const { keyProject, ...rest } = exp
  return { ...rest, ...(keyProject !== undefined ? { key_project: keyProject } : {}) }
}
function rowToWorkExperience(row: any): WorkExperience {
  const { key_project, ...rest } = row
  return { ...rest, keyProject: key_project ?? "" }
}
function personalInfoToRow(info: Partial<PersonalInfo>) {
  const { resumeWebsite, ...rest } = info
  return { ...rest, ...(resumeWebsite !== undefined ? { resume_website: resumeWebsite } : {}) }
}
function rowToPersonalInfo(row: any): PersonalInfo {
  const { resume_website, ...rest } = row
  return { ...rest, resumeWebsite: resume_website ?? "" }
}

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["PersonalInfo", "Projects", "WorkExperience", "SkillCategories", "Education", "ContactMessages", "Highlights", "LeadershipStrengths"],
  endpoints: (builder) => ({
    // --- PERSONAL INFO ---
    getPersonalInfo: builder.query<PersonalInfo, void>({
      async queryFn() {
        if (!isSupabaseConfigured || !supabase) {
          return { data: defaultPersonalInfo }
        }
        try {
          const { data, error } = await supabase.from("personal_info").select("*").single()
          if (error || !data) return { data: defaultPersonalInfo }
          return { data: rowToPersonalInfo(data) }
        } catch {
          return { data: defaultPersonalInfo }
        }
      },
      providesTags: ["PersonalInfo"],
    }),
    updatePersonalInfo: builder.mutation<PersonalInfo, PersonalInfo>({
      async queryFn(personalInfoData) {
        if (!isSupabaseConfigured || !supabase) {
          return { data: personalInfoData }
        }
        const { data, error } = await supabase.from("personal_info").upsert(personalInfoToRow(personalInfoData)).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: rowToPersonalInfo(data) }
      },
      invalidatesTags: ["PersonalInfo"],
    }),

    // --- PROJECTS ---
    getProjects: builder.query<Project[], void>({
      async queryFn() {
        if (!isSupabaseConfigured || !supabase) {
          return { data: defaultProjects }
        }
        try {
          const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true })
          if (error || !data || data.length === 0) return { data: defaultProjects }
          return { data: data as Project[] }
        } catch {
          return { data: defaultProjects }
        }
      },
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation<Project, Project>({
      async queryFn(project) {
        if (!isSupabaseConfigured || !supabase) {
          return { data: project }
        }
        // The dashboard always sets a placeholder client-side id (e.g.
        // "proj-<timestamp>") for new items so the UI has a stable React
        // key before saving. The projects table's id column is a UUID
        // generated by Postgres, so that placeholder must NOT be sent on
        // insert or it fails with "invalid input syntax for type uuid".
        const { id: _clientId, ...newProject } = project
        const { data, error } = await supabase.from("projects").insert([newProject]).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as Project }
      },
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation<Project, Project>({
      async queryFn(project) {
        if (!isSupabaseConfigured || !supabase) {
          return { data: project }
        }
        const { data, error } = await supabase.from("projects").update(project).eq("id", project.id).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as Project }
      },
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation<{ id: string }, string>({
      async queryFn(id) {
        if (isSupabaseConfigured && supabase) {
          await supabase.from("projects").delete().eq("id", id)
        }
        return { data: { id } }
      },
      invalidatesTags: ["Projects"],
    }),

    // --- WORK EXPERIENCE ---
    getWorkExperience: builder.query<WorkExperience[], void>({
      async queryFn() {
        if (!isSupabaseConfigured || !supabase) {
          return { data: defaultWorkExperience }
        }
        try {
          const { data, error } = await supabase.from("work_experience").select("*").order("sort_order", { ascending: true })
          if (error || !data || data.length === 0) return { data: defaultWorkExperience }
          return { data: data.map(rowToWorkExperience) }
        } catch {
          return { data: defaultWorkExperience }
        }
      },
      providesTags: ["WorkExperience"],
    }),
    addWorkExperience: builder.mutation<WorkExperience, WorkExperience>({
      async queryFn(exp) {
        if (!isSupabaseConfigured || !supabase) return { data: exp }
        // See addProject: id is a Postgres-generated UUID, so drop the
        // client placeholder id before insert.
        const { id: _clientId, ...newExp } = exp
        const { data, error } = await supabase.from("work_experience").insert([workExperienceToRow(newExp)]).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: rowToWorkExperience(data) }
      },
      invalidatesTags: ["WorkExperience"],
    }),
    updateWorkExperience: builder.mutation<WorkExperience, WorkExperience>({
      async queryFn(exp) {
        if (!isSupabaseConfigured || !supabase) return { data: exp }
        const { data, error } = await supabase.from("work_experience").update(workExperienceToRow(exp)).eq("id", exp.id).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: rowToWorkExperience(data) }
      },
      invalidatesTags: ["WorkExperience"],
    }),
    deleteWorkExperience: builder.mutation<{ id: string }, string>({
      async queryFn(id) {
        if (isSupabaseConfigured && supabase) {
          await supabase.from("work_experience").delete().eq("id", id)
        }
        return { data: { id } }
      },
      invalidatesTags: ["WorkExperience"],
    }),

    // --- SKILL CATEGORIES ---
    getSkillCategories: builder.query<SkillCategory[], void>({
      async queryFn() {
        if (!isSupabaseConfigured || !supabase) {
          return { data: defaultSkillCategories }
        }
        try {
          const { data, error } = await supabase.from("skill_categories").select("*").order("sort_order", { ascending: true })
          if (error || !data || data.length === 0) return { data: defaultSkillCategories }
          return { data: data as SkillCategory[] }
        } catch {
          return { data: defaultSkillCategories }
        }
      },
      providesTags: ["SkillCategories"],
    }),
    addSkillCategory: builder.mutation<SkillCategory, SkillCategory>({
      async queryFn(cat) {
        if (!isSupabaseConfigured || !supabase) return { data: cat }
        // See addProject: id is a Postgres-generated UUID, so drop the
        // client placeholder id before insert.
        const { id: _clientId, ...newCat } = cat
        const { data, error } = await supabase.from("skill_categories").insert([newCat]).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as SkillCategory }
      },
      invalidatesTags: ["SkillCategories"],
    }),
    updateSkillCategory: builder.mutation<SkillCategory, SkillCategory>({
      async queryFn(cat) {
        if (!isSupabaseConfigured || !supabase) return { data: cat }
        const { data, error } = await supabase.from("skill_categories").update(cat).eq("id", cat.id).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as SkillCategory }
      },
      invalidatesTags: ["SkillCategories"],
    }),
    deleteSkillCategory: builder.mutation<{ id: string }, string>({
      async queryFn(id) {
        if (isSupabaseConfigured && supabase) {
          await supabase.from("skill_categories").delete().eq("id", id)
        }
        return { data: { id } }
      },
      invalidatesTags: ["SkillCategories"],
    }),

    // --- EDUCATION ---
    getEducation: builder.query<Education[], void>({
      async queryFn() {
        if (!isSupabaseConfigured || !supabase) {
          return { data: defaultEducation }
        }
        try {
          const { data, error } = await supabase.from("education").select("*").order("sort_order", { ascending: true })
          if (error || !data || data.length === 0) return { data: defaultEducation }
          return { data: data as Education[] }
        } catch {
          return { data: defaultEducation }
        }
      },
      providesTags: ["Education"],
    }),
    addEducation: builder.mutation<Education, Education>({
      async queryFn(edu) {
        if (!isSupabaseConfigured || !supabase) return { data: edu }
        // See addProject: id is a Postgres-generated UUID, so drop the
        // client placeholder id before insert.
        const { id: _clientId, ...newEdu } = edu
        const { data, error } = await supabase.from("education").insert([newEdu]).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as Education }
      },
      invalidatesTags: ["Education"],
    }),
    updateEducation: builder.mutation<Education, Education>({
      async queryFn(edu) {
        if (!isSupabaseConfigured || !supabase) return { data: edu }
        const { data, error } = await supabase.from("education").update(edu).eq("id", edu.id).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as Education }
      },
      invalidatesTags: ["Education"],
    }),
    deleteEducation: builder.mutation<{ id: string }, string>({
      async queryFn(id) {
        if (isSupabaseConfigured && supabase) {
          await supabase.from("education").delete().eq("id", id)
        }
        return { data: { id } }
      },
      invalidatesTags: ["Education"],
    }),

    // --- CONTACT MESSAGES ---
    getContactMessages: builder.query<ContactSubmission[], void>({
      async queryFn() {
        if (!isSupabaseConfigured || !supabase) {
          return {
            data: [
              {
                id: "msg-1",
                name: "Alex Johnson",
                email: "alex@fintechcorp.io",
                subject: "Lead Backend Developer Position",
                message: "Hi Ibrahim, we loved your compiler and fintech portfolio! Would you be open for a senior contract role?",
                created_at: new Date().toISOString(),
              },
            ],
          }
        }
        try {
          const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false })
          if (error || !data) return { data: [] }
          return { data: data as ContactSubmission[] }
        } catch {
          return { data: [] }
        }
      },
      providesTags: ["ContactMessages"],
    }),
    addContactMessage: builder.mutation<{ success: boolean; message: string }, Omit<ContactSubmission, "id" | "created_at">>({
      async queryFn(submission) {
        if (!isSupabaseConfigured || !supabase) {
          return { data: { success: true, message: "Thank you! Your message has been sent successfully." } }
        }
        try {
          const { error } = await supabase.from("contact_submissions").insert([submission])
          if (error) return { error: { status: 500, data: error.message } }
          return { data: { success: true, message: "Thank you! Your message has been saved successfully." } }
        } catch (err: any) {
          return { error: { status: 500, data: err.message || "Failed to submit message." } }
        }
      },
      invalidatesTags: ["ContactMessages"],
    }),
    deleteContactMessage: builder.mutation<{ id: string }, string>({
      async queryFn(id) {
        if (isSupabaseConfigured && supabase) {
          await supabase.from("contact_submissions").delete().eq("id", id)
        }
        return { data: { id } }
      },
      invalidatesTags: ["ContactMessages"],
    }),

    // --- HIGHLIGHTS (About section feature cards) ---
    getHighlights: builder.query<Highlight[], void>({
      async queryFn() {
        if (!isSupabaseConfigured || !supabase) {
          return { data: defaultHighlights }
        }
        try {
          const { data, error } = await supabase.from("highlights").select("*").order("sort_order", { ascending: true })
          if (error || !data || data.length === 0) return { data: defaultHighlights }
          return { data: data as Highlight[] }
        } catch {
          return { data: defaultHighlights }
        }
      },
      providesTags: ["Highlights"],
    }),
    addHighlight: builder.mutation<Highlight, Highlight>({
      async queryFn(highlight) {
        if (!isSupabaseConfigured || !supabase) return { data: highlight }
        const { id: _clientId, ...newHighlight } = highlight
        const { data, error } = await supabase.from("highlights").insert([newHighlight]).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as Highlight }
      },
      invalidatesTags: ["Highlights"],
    }),
    updateHighlight: builder.mutation<Highlight, Highlight>({
      async queryFn(highlight) {
        if (!isSupabaseConfigured || !supabase) return { data: highlight }
        const { data, error } = await supabase.from("highlights").update(highlight).eq("id", highlight.id).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as Highlight }
      },
      invalidatesTags: ["Highlights"],
    }),
    deleteHighlight: builder.mutation<{ id: string }, string>({
      async queryFn(id) {
        if (isSupabaseConfigured && supabase) {
          await supabase.from("highlights").delete().eq("id", id)
        }
        return { data: { id } }
      },
      invalidatesTags: ["Highlights"],
    }),

    // --- LEADERSHIP & CORE STRENGTHS (Education section list) ---
    getLeadershipStrengths: builder.query<LeadershipStrength[], void>({
      async queryFn() {
        if (!isSupabaseConfigured || !supabase) {
          return { data: defaultLeadershipStrengths }
        }
        try {
          const { data, error } = await supabase.from("leadership_strengths").select("*").order("sort_order", { ascending: true })
          if (error || !data || data.length === 0) return { data: defaultLeadershipStrengths }
          return { data: data as LeadershipStrength[] }
        } catch {
          return { data: defaultLeadershipStrengths }
        }
      },
      providesTags: ["LeadershipStrengths"],
    }),
    addLeadershipStrength: builder.mutation<LeadershipStrength, LeadershipStrength>({
      async queryFn(strength) {
        if (!isSupabaseConfigured || !supabase) return { data: strength }
        const { id: _clientId, ...newStrength } = strength
        const { data, error } = await supabase.from("leadership_strengths").insert([newStrength]).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as LeadershipStrength }
      },
      invalidatesTags: ["LeadershipStrengths"],
    }),
    updateLeadershipStrength: builder.mutation<LeadershipStrength, LeadershipStrength>({
      async queryFn(strength) {
        if (!isSupabaseConfigured || !supabase) return { data: strength }
        const { data, error } = await supabase.from("leadership_strengths").update(strength).eq("id", strength.id).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as LeadershipStrength }
      },
      invalidatesTags: ["LeadershipStrengths"],
    }),
    deleteLeadershipStrength: builder.mutation<{ id: string }, string>({
      async queryFn(id) {
        if (isSupabaseConfigured && supabase) {
          await supabase.from("leadership_strengths").delete().eq("id", id)
        }
        return { data: { id } }
      },
      invalidatesTags: ["LeadershipStrengths"],
    }),
  }),
})

export const {
  useGetPersonalInfoQuery,
  useUpdatePersonalInfoMutation,
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetWorkExperienceQuery,
  useAddWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
  useGetSkillCategoriesQuery,
  useAddSkillCategoryMutation,
  useUpdateSkillCategoryMutation,
  useDeleteSkillCategoryMutation,
  useGetEducationQuery,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useGetContactMessagesQuery,
  useAddContactMessageMutation,
  useDeleteContactMessageMutation,
  useGetHighlightsQuery,
  useAddHighlightMutation,
  useUpdateHighlightMutation,
  useDeleteHighlightMutation,
  useGetLeadershipStrengthsQuery,
  useAddLeadershipStrengthMutation,
  useUpdateLeadershipStrengthMutation,
  useDeleteLeadershipStrengthMutation,
} = portfolioApi
