export type ProjectType = "public" | "private" | "customer"

export interface PersonalInfo {
  id?: string
  name: string
  title: string
  tagline: string
  location: string
  portfolio: string
  resumeWebsite: string
  github: string
  linkedin: string
  email: string
  phone: string
  summary?: string
}

export interface WorkExperience {
  id?: string
  company: string
  role: string
  period: string
  responsibilities: string[]
  keyProject: string
  technologies: string[]
  achievements: string[]
  sort_order?: number
}

export interface Project {
  id?: string
  name: string
  tech: string[]
  highlights: string[]
  category: string
  project_type: ProjectType
  github_url?: string | null
  demo_url?: string | null
  featured?: boolean
  sort_order?: number
}

export interface Education {
  id?: string
  degree: string
  institution: string
  year?: string
  sort_order?: number
}

export interface SkillCategory {
  id?: string
  name: string
  skills: string[]
  icon: string
  sort_order?: number
}

export interface ContactSubmission {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  created_at?: string
}
