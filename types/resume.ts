export type ProjectType = "public" | "private" | "customer"

export interface PersonalInfo {
  id?: string
  user_id?: string | null
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
  user_id?: string | null
  company: string
  role: string
  period: string
  description?: string
  responsibilities: string[]
  keyProject: string
  technologies: string[]
  achievements: string[]
  sort_order?: number
}

export interface Project {
  id?: string
  user_id?: string | null
  name: string
  description?: string
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
  user_id?: string | null
  degree: string
  institution: string
  year?: string
  sort_order?: number
}

export interface SkillCategory {
  id?: string
  user_id?: string | null
  name: string
  skills: string[]
  icon: string
  sort_order?: number
}

export interface ContactSubmission {
  id?: string
  user_id?: string | null
  name: string
  email: string
  subject: string
  message: string
  created_at?: string
}

export interface Highlight {
  id?: string
  user_id?: string | null
  icon: string
  title: string
  description: string
  sort_order?: number
}

export interface LeadershipStrength {
  id?: string
  user_id?: string | null
  content: string
  sort_order?: number
}
