export interface PersonalInfo {
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
}

export interface WorkExperience {
  company: string
  role: string
  period: string
  responsibilities: string[]
  keyProject: string
  technologies: string[]
  achievements: string[]
}

export interface Project {
  name: string
  tech: string[]
  highlights: string[]
  category: string
}

export interface Education {
  degree: string
  institution: string
  year?: string
}

export interface SkillCategory {
  name: string
  skills: string[]
  icon: string
}
