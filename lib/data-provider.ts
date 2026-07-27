import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  workExperience as defaultWorkExperience,
  skillCategories as defaultSkillCategories,
  education as defaultEducation,
} from "@/lib/resume-data"
import { PersonalInfo, Project, WorkExperience, SkillCategory, Education, ContactSubmission } from "@/types/resume"

// --- PUBLIC DATA FETCHING WITH FALLBACK ---

export async function fetchPersonalInfo(): Promise<PersonalInfo> {
  if (!isSupabaseConfigured || !supabase) return defaultPersonalInfo
  try {
    const { data, error } = await supabase.from("personal_info").select("*").single()
    if (error || !data) return defaultPersonalInfo
    return data as PersonalInfo
  } catch {
    return defaultPersonalInfo
  }
}

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) return defaultProjects
  try {
    const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true })
    if (error || !data || data.length === 0) return defaultProjects
    return data as Project[]
  } catch {
    return defaultProjects
  }
}

export async function fetchWorkExperience(): Promise<WorkExperience[]> {
  if (!isSupabaseConfigured || !supabase) return defaultWorkExperience
  try {
    const { data, error } = await supabase.from("work_experience").select("*").order("sort_order", { ascending: true })
    if (error || !data || data.length === 0) return defaultWorkExperience
    return data as WorkExperience[]
  } catch {
    return defaultWorkExperience
  }
}

export async function fetchSkillCategories(): Promise<SkillCategory[]> {
  if (!isSupabaseConfigured || !supabase) return defaultSkillCategories
  try {
    const { data, error } = await supabase.from("skill_categories").select("*").order("sort_order", { ascending: true })
    if (error || !data || data.length === 0) return defaultSkillCategories
    return data as SkillCategory[]
  } catch {
    return defaultSkillCategories
  }
}

export async function fetchEducation(): Promise<Education[]> {
  if (!isSupabaseConfigured || !supabase) return defaultEducation
  try {
    const { data, error } = await supabase.from("education").select("*").order("sort_order", { ascending: true })
    if (error || !data || data.length === 0) return defaultEducation
    return data as Education[]
  } catch {
    return defaultEducation
  }
}

// --- CONTACT FORM SUBMISSION ---

export async function submitContactForm(submission: Omit<ContactSubmission, "id" | "created_at">): Promise<{ success: boolean; message: string }> {
  if (!isSupabaseConfigured || !supabase) {
    // Simulated success for demonstration without live Supabase env
    console.log("Contact form submitted locally:", submission)
    return { success: true, message: "Thank you! Your message has been sent successfully." }
  }

  try {
    const { error } = await supabase.from("contact_submissions").insert([submission])
    if (error) throw error
    return { success: true, message: "Thank you! Your message has been saved successfully." }
  } catch (err: any) {
    return { success: false, message: err.message || "Failed to submit message. Please try again." }
  }
}
