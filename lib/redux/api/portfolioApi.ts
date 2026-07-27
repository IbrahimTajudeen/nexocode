import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  workExperience as defaultWorkExperience,
  skillCategories as defaultSkillCategories,
  education as defaultEducation,
} from "@/lib/resume-data"
import { PersonalInfo, Project, WorkExperience, SkillCategory, Education, ContactSubmission } from "@/types/resume"

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["PersonalInfo", "Projects", "WorkExperience", "SkillCategories", "Education", "ContactMessages"],
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
          return { data: data as PersonalInfo }
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
        const { data, error } = await supabase.from("personal_info").upsert(personalInfoData).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as PersonalInfo }
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
        const { data, error } = await supabase.from("projects").insert([project]).select().single()
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
          return { data: data as WorkExperience[] }
        } catch {
          return { data: defaultWorkExperience }
        }
      },
      providesTags: ["WorkExperience"],
    }),
    addWorkExperience: builder.mutation<WorkExperience, WorkExperience>({
      async queryFn(exp) {
        if (!isSupabaseConfigured || !supabase) return { data: exp }
        const { data, error } = await supabase.from("work_experience").insert([exp]).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as WorkExperience }
      },
      invalidatesTags: ["WorkExperience"],
    }),
    updateWorkExperience: builder.mutation<WorkExperience, WorkExperience>({
      async queryFn(exp) {
        if (!isSupabaseConfigured || !supabase) return { data: exp }
        const { data, error } = await supabase.from("work_experience").update(exp).eq("id", exp.id).select().single()
        if (error) return { error: { status: 500, data: error.message } }
        return { data: data as WorkExperience }
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
        const { data, error } = await supabase.from("skill_categories").insert([cat]).select().single()
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
        const { data, error } = await supabase.from("education").insert([edu]).select().single()
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
} = portfolioApi
