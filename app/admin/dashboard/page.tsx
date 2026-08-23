"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { clearAuth } from "@/lib/redux/slices/authSlice"
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"
import {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetPersonalInfoQuery,
  useUpdatePersonalInfoMutation,
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
  useDeleteContactMessageMutation,
  useGetHighlightsQuery,
  useAddHighlightMutation,
  useUpdateHighlightMutation,
  useDeleteHighlightMutation,
  useGetLeadershipStrengthsQuery,
  useAddLeadershipStrengthMutation,
  useUpdateLeadershipStrengthMutation,
  useDeleteLeadershipStrengthMutation,
} from "@/lib/redux/api/portfolioApi"
import { Project, PersonalInfo, WorkExperience, SkillCategory, Education, ProjectType, Highlight, LeadershipStrength } from "@/types/resume"
import {
  ShieldCheck,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  X,
  FolderGit2,
  User,
  Briefcase,
  GraduationCap,
  MessageSquare,
  ExternalLink,
  Code,
  CheckCircle2,
  Cpu,
  Sparkles,
  Award,
} from "lucide-react"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

// Helpers to move between a textarea's newline-separated text and the
// string[] shape the DB columns (responsibilities, achievements,
// highlights, technologies) actually use.
const linesToArray = (text: string) => text.split("\n").map((s) => s.trim()).filter(Boolean)
const arrayToLines = (arr?: string[]) => (arr || []).join("\n")
const csvToArray = (text: string) => text.split(",").map((s) => s.trim()).filter(Boolean)
const arrayToCsv = (arr?: string[]) => (arr || []).join(", ")

export default function AdminDashboardPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const authLoading = useSelector((state: RootState) => state.auth.loading)

  const [activeTab, setActiveTab] = useState<
    "projects" | "personal" | "experience" | "skills" | "education" | "highlights" | "strengths" | "messages"
  >("projects")

  // RTK Query Hooks
  const { data: projectsList = [], isLoading: pLoading } = useGetProjectsQuery()
  const { data: personalInfoData } = useGetPersonalInfoQuery()
  const { data: experienceList = [] } = useGetWorkExperienceQuery()
  const { data: skillsList = [] } = useGetSkillCategoriesQuery()
  const { data: educationList = [] } = useGetEducationQuery()
  const { data: messagesList = [] } = useGetContactMessagesQuery()
  const { data: highlightsList = [] } = useGetHighlightsQuery()
  const { data: strengthsList = [] } = useGetLeadershipStrengthsQuery()

  // RTK Mutation Hooks
  const [addProject] = useAddProjectMutation()
  const [updateProject] = useUpdateProjectMutation()
  const [deleteProject] = useDeleteProjectMutation()

  const [updatePersonalInfo] = useUpdatePersonalInfoMutation()

  const [addWorkExperience] = useAddWorkExperienceMutation()
  const [updateWorkExperience] = useUpdateWorkExperienceMutation()
  const [deleteWorkExperience] = useDeleteWorkExperienceMutation()

  const [addSkillCategory] = useAddSkillCategoryMutation()
  const [updateSkillCategory] = useUpdateSkillCategoryMutation()
  const [deleteSkillCategory] = useDeleteSkillCategoryMutation()

  const [addEducation] = useAddEducationMutation()
  const [updateEducation] = useUpdateEducationMutation()
  const [deleteEducation] = useDeleteEducationMutation()

  const [deleteContactMessage] = useDeleteContactMessageMutation()

  const [addHighlight] = useAddHighlightMutation()
  const [updateHighlight] = useUpdateHighlightMutation()
  const [deleteHighlight] = useDeleteHighlightMutation()

  const [addLeadershipStrength] = useAddLeadershipStrengthMutation()
  const [updateLeadershipStrength] = useUpdateLeadershipStrengthMutation()
  const [deleteLeadershipStrength] = useDeleteLeadershipStrengthMutation()

  // Local Form / Modal States
  const [personalForm, setPersonalForm] = useState<PersonalInfo | null>(null)

  useEffect(() => {
    if (personalInfoData) setPersonalForm(personalInfoData)
  }, [personalInfoData])

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)

  const [isExpModalOpen, setIsExpModalOpen] = useState(false)
  const [editingExp, setEditingExp] = useState<Partial<WorkExperience> | null>(null)

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [editingSkillCat, setEditingSkillCat] = useState<Partial<SkillCategory> | null>(null)

  const [isEduModalOpen, setIsEduModalOpen] = useState(false)
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null)

  const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false)
  const [editingHighlight, setEditingHighlight] = useState<Partial<Highlight> | null>(null)

  const [isStrengthModalOpen, setIsStrengthModalOpen] = useState(false)
  const [editingStrength, setEditingStrength] = useState<Partial<LeadershipStrength> | null>(null)

  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMsg({ type, text })
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Auth Guard - wait for the initial session check (authLoading) to
  // finish before deciding to redirect, otherwise a valid session can be
  // missed on first paint and a logged-in admin gets bounced to /login.
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, authLoading, router])

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut()
    }
    dispatch(clearAuth())
    router.push("/admin/login")
  }

  // --- PROJECT CRUD HANDLERS ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject?.name || !editingProject?.category) return

    const item: Project = {
      id: editingProject.id || `proj-${Date.now()}`,
      name: editingProject.name,
      category: editingProject.category,
      description: editingProject.description || "",
      tech: editingProject.tech || ["TypeScript"],
      highlights: editingProject.highlights || ["Architecture"],
      project_type: (editingProject.project_type as ProjectType) || "public",
      github_url: editingProject.github_url || null,
      demo_url: editingProject.demo_url || null,
      featured: editingProject.featured ?? false,
    }

    if (editingProject.id) {
      await updateProject(item).unwrap()
    } else {
      await addProject(item).unwrap()
    }

    setIsProjectModalOpen(false)
    setEditingProject(null)
    showToast("Project saved via RTK Query!")
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete project from Supabase database?")) return
    await deleteProject(id).unwrap()
    showToast("Project deleted")
  }

  // --- PERSONAL INFO SAVE HANDLER ---
  const handleSavePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!personalForm) return
    await updatePersonalInfo(personalForm).unwrap()
    showToast("Personal Profile updated via RTK Query!")
  }

  // --- WORK EXPERIENCE CRUD HANDLERS ---
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingExp?.company || !editingExp?.role) return

    const item: WorkExperience = {
      id: editingExp.id || `exp-${Date.now()}`,
      company: editingExp.company,
      role: editingExp.role,
      period: editingExp.period || "2024 – Present",
      description: editingExp.description || "",
      keyProject: editingExp.keyProject || "",
      technologies: editingExp.technologies || [],
      responsibilities: editingExp.responsibilities || [],
      achievements: editingExp.achievements || [],
    }

    if (editingExp.id) {
      await updateWorkExperience(item).unwrap()
    } else {
      await addWorkExperience(item).unwrap()
    }

    setIsExpModalOpen(false)
    setEditingExp(null)
    showToast("Work experience updated!")
  }

  const handleDeleteExp = async (id: string) => {
    if (!confirm("Delete work experience entry?")) return
    await deleteWorkExperience(id).unwrap()
    showToast("Work experience entry deleted")
  }

  // --- SKILL CATEGORY CRUD HANDLERS ---
  const handleSaveSkillCat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSkillCat?.name) return

    const item: SkillCategory = {
      id: editingSkillCat.id || `cat-${Date.now()}`,
      name: editingSkillCat.name,
      icon: editingSkillCat.icon || "Code2",
      skills: editingSkillCat.skills || [],
    }

    if (editingSkillCat.id) {
      await updateSkillCategory(item).unwrap()
    } else {
      await addSkillCategory(item).unwrap()
    }

    setIsSkillModalOpen(false)
    setEditingSkillCat(null)
    showToast("Skill category updated!")
  }

  const handleDeleteSkillCat = async (id: string) => {
    if (!confirm("Delete skill category?")) return
    await deleteSkillCategory(id).unwrap()
    showToast("Skill category deleted")
  }

  // --- EDUCATION CRUD HANDLERS ---
  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEdu?.degree || !editingEdu?.institution) return

    const item: Education = {
      id: editingEdu.id || `edu-${Date.now()}`,
      degree: editingEdu.degree,
      institution: editingEdu.institution,
      year: editingEdu.year || "",
    }

    if (editingEdu.id) {
      await updateEducation(item).unwrap()
    } else {
      await addEducation(item).unwrap()
    }

    setIsEduModalOpen(false)
    setEditingEdu(null)
    showToast("Education entry updated!")
  }

  const handleDeleteEdu = async (id: string) => {
    if (!confirm("Delete education entry?")) return
    await deleteEducation(id).unwrap()
    showToast("Education item deleted")
  }

  // --- HIGHLIGHT (About section cards) CRUD HANDLERS ---
  const handleSaveHighlight = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingHighlight?.title || !editingHighlight?.description) return

    const item: Highlight = {
      id: editingHighlight.id || `hl-${Date.now()}`,
      icon: editingHighlight.icon || "Sparkles",
      title: editingHighlight.title,
      description: editingHighlight.description,
    }

    if (editingHighlight.id) {
      await updateHighlight(item).unwrap()
    } else {
      await addHighlight(item).unwrap()
    }

    setIsHighlightModalOpen(false)
    setEditingHighlight(null)
    showToast("About highlight card updated!")
  }

  const handleDeleteHighlight = async (id: string) => {
    if (!confirm("Delete this highlight card?")) return
    await deleteHighlight(id).unwrap()
    showToast("Highlight card deleted")
  }

  // --- LEADERSHIP & CORE STRENGTHS CRUD HANDLERS ---
  const handleSaveStrength = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingStrength?.content) return

    const item: LeadershipStrength = {
      id: editingStrength.id || `ls-${Date.now()}`,
      content: editingStrength.content,
    }

    if (editingStrength.id) {
      await updateLeadershipStrength(item).unwrap()
    } else {
      await addLeadershipStrength(item).unwrap()
    }

    setIsStrengthModalOpen(false)
    setEditingStrength(null)
    showToast("Core strength updated!")
  }

  const handleDeleteStrength = async (id: string) => {
    if (!confirm("Delete this strength entry?")) return
    await deleteLeadershipStrength(id).unwrap()
    showToast("Strength entry deleted")
  }

  // --- MESSAGES CRUD ---
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete message from inbox?")) return
    await deleteContactMessage(id).unwrap()
    showToast("Message deleted")
  }

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-mono text-sm">
        Checking session...
      </div>
    )
  }

  if (pLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-mono text-sm">
        Loading RTK Query & Supabase Data...
      </div>
    )
  }

  const inputClass = "w-full px-3 py-2 rounded-xl border border-border/80 bg-background/60 text-sm text-foreground placeholder:text-muted-foreground/70"
  const labelClass = "block text-xs font-mono uppercase text-muted-foreground mb-1"

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-card border border-primary/50 text-foreground text-xs shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="border-b border-border/80 bg-card/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-sm shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base leading-tight tracking-tight">NEXOCODE Admin Dashboard</h1>
              <p className="text-[10px] text-muted-foreground font-mono">RTK Query & Supabase Active Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-full border border-border/60"
            >
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Public</span> Site
            </Link>

            <ThemeToggle />

            <button
              onClick={handleLogout}
              className="p-1.5 sm:p-2 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-6 sm:space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] sm:text-xs font-mono">Projects</span>
              <FolderGit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold">{projectsList.length}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] sm:text-xs font-mono">Experience</span>
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold">{experienceList.length}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] sm:text-xs font-mono">Skills</span>
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold">{skillsList.length}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] sm:text-xs font-mono">Education</span>
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold">{educationList.length}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] sm:text-xs font-mono">Highlights</span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold">{highlightsList.length}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] sm:text-xs font-mono">Strengths</span>
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold">{strengthsList.length}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] sm:text-xs font-mono">Inbox</span>
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold">{messagesList.length}</p>
          </div>
        </div>

        {/* Mobile Dropdown Tab Selector */}
        <div className="block md:hidden">
          <label className="block text-[11px] font-mono text-muted-foreground uppercase mb-1">Management Section</label>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as typeof activeTab)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold"
          >
            <option value="projects">Projects ({projectsList.length})</option>
            <option value="personal">Personal Profile</option>
            <option value="experience">Experience ({experienceList.length})</option>
            <option value="skills">Skills ({skillsList.length})</option>
            <option value="education">Education ({educationList.length})</option>
            <option value="highlights">About Highlights ({highlightsList.length})</option>
            <option value="strengths">Core Strengths ({strengthsList.length})</option>
            <option value="messages">Inbox ({messagesList.length})</option>
          </select>
        </div>

        {/* Desktop Tab Switcher */}
        <div className="hidden md:flex border-b border-border/80 gap-1 sm:gap-2 overflow-x-auto pb-1">
          {[
            { id: "projects", label: "Projects", icon: FolderGit2, count: projectsList.length },
            { id: "personal", label: "Personal Profile", icon: User, count: null },
            { id: "experience", label: "Experience", icon: Briefcase, count: experienceList.length },
            { id: "skills", label: "Skills", icon: Cpu, count: skillsList.length },
            { id: "education", label: "Education", icon: GraduationCap, count: educationList.length },
            { id: "highlights", label: "About Highlights", icon: Sparkles, count: highlightsList.length },
            { id: "strengths", label: "Core Strengths", icon: Award, count: strengthsList.length },
            { id: "messages", label: "Inbox", icon: MessageSquare, count: messagesList.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-t-xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary font-bold bg-primary/10"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}{tab.count !== null ? ` (${tab.count})` : ""}
            </button>
          ))}
        </div>

        {/* TAB 1: PROJECTS SHOWCASE */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Projects Manager (RTK Query)</h2>
                <p className="text-xs text-muted-foreground">Manage descriptions, tech stacks, highlights, repo/demo links, and visibility.</p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    name: "",
                    category: "Fintech",
                    description: "",
                    project_type: "public",
                    tech: [],
                    highlights: [],
                    github_url: "",
                    demo_url: "",
                    featured: false,
                  })
                  setIsProjectModalOpen(true)
                }}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md shadow-primary/20 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectsList.map((project) => (
                <div
                  key={project.id || project.name}
                  className="p-5 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1">
                        {project.featured && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">Featured</span>
                        )}
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                            project.project_type === "public"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                              : project.project_type === "customer"
                              ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400"
                              : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {project.project_type}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg">{project.name}</h3>
                    {project.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      {project.github_url ? <span className="text-emerald-500">Repo ✓</span> : <span className="text-muted-foreground/40">No Repo</span>}
                      {project.demo_url ? <span className="text-cyan-500">Demo ✓</span> : <span className="text-muted-foreground/40">No Demo</span>}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingProject(project)
                          setIsProjectModalOpen(true)
                        }}
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id!)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PERSONAL INFO */}
        {activeTab === "personal" && personalForm && (
          <form onSubmit={handleSavePersonalInfo} className="max-w-3xl space-y-6 border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Full Personal Profile</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  value={personalForm.name}
                  onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Job Title</label>
                <input
                  type="text"
                  value={personalForm.title}
                  onChange={(e) => setPersonalForm({ ...personalForm, title: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={personalForm.tagline}
                onChange={(e) => setPersonalForm({ ...personalForm, tagline: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Professional Summary (shown on About section)</label>
              <textarea
                rows={5}
                value={personalForm.summary || ""}
                onChange={(e) => setPersonalForm({ ...personalForm, summary: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={personalForm.location}
                  onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={personalForm.email}
                  onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="text"
                  value={personalForm.phone}
                  onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Portfolio URL</label>
                <input
                  type="text"
                  value={personalForm.portfolio || ""}
                  onChange={(e) => setPersonalForm({ ...personalForm, portfolio: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>GitHub URL</label>
                <input
                  type="text"
                  value={personalForm.github || ""}
                  onChange={(e) => setPersonalForm({ ...personalForm, github: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>LinkedIn URL</label>
                <input
                  type="text"
                  value={personalForm.linkedin || ""}
                  onChange={(e) => setPersonalForm({ ...personalForm, linkedin: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Resume Website URL</label>
              <input
                type="text"
                value={personalForm.resumeWebsite || ""}
                onChange={(e) => setPersonalForm({ ...personalForm, resumeWebsite: e.target.value })}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all shadow-md shadow-primary/20"
            >
              Update Full Profile via RTK Query
            </button>
          </form>
        )}

        {/* TAB 3: WORK EXPERIENCE */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Work Experience</h2>
                <p className="text-xs text-muted-foreground">Manage career history, descriptions, tech stacks, responsibilities, and achievements.</p>
              </div>

              <button
                onClick={() => {
                  setEditingExp({
                    company: "",
                    role: "Software Engineer",
                    period: "2024 – Present",
                    description: "",
                    keyProject: "",
                    technologies: [],
                    responsibilities: [],
                    achievements: [],
                  })
                  setIsExpModalOpen(true)
                }}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md shadow-primary/20"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            <div className="space-y-4 max-w-4xl">
              {experienceList.map((exp) => (
                <div key={exp.id || exp.company} className="p-5 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base">{exp.role} — {exp.company}</h3>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditingExp(exp); setIsExpModalOpen(true); }} className="p-1.5 hover:bg-muted rounded-lg"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteExp(exp.id!)} className="p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">{exp.period}</p>
                  {exp.description && <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>}
                  {exp.keyProject && <p className="text-xs text-primary font-mono">Key Project: {exp.keyProject}</p>}
                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {exp.technologies.map((t) => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Skill Categories</h2>
              <button
                onClick={() => { setEditingSkillCat({ name: "", icon: "Code2", skills: [] }); setIsSkillModalOpen(true); }}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
              >
                <Plus className="w-4 h-4 inline mr-1" /> Add Category
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {skillsList.map((cat) => (
                <div key={cat.id || cat.name} className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-base">{cat.name}</h3>
                    <div className="flex gap-1">
                      <button onClick={() => { setEditingSkillCat(cat); setIsSkillModalOpen(true); }} className="p-1.5 hover:bg-muted rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDeleteSkillCat(cat.id!)} className="p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s) => (
                      <span key={s} className="text-xs font-mono px-2 py-0.5 rounded bg-secondary">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EDUCATION */}
        {activeTab === "education" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Education Entries</h2>
              <button
                onClick={() => { setEditingEdu({ degree: "", institution: "", year: "2024" }); setIsEduModalOpen(true); }}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
              >
                <Plus className="w-4 h-4 inline mr-1" /> Add Entry
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {educationList.map((edu) => (
                <div key={edu.id || edu.degree} className="p-5 rounded-2xl border border-border/80 bg-card/60 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <p className="text-xs font-mono text-muted-foreground">{edu.institution} {edu.year ? `(${edu.year})` : ""}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditingEdu(edu); setIsEduModalOpen(true); }} className="p-1.5 hover:bg-muted rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteEdu(edu.id!)} className="p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ABOUT HIGHLIGHTS */}
        {activeTab === "highlights" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">About Section Highlight Cards</h2>
                <p className="text-xs text-muted-foreground">The 4 feature cards shown next to your bio on the About section.</p>
              </div>
              <button
                onClick={() => { setEditingHighlight({ icon: "Sparkles", title: "", description: "" }); setIsHighlightModalOpen(true); }}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Highlight
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {highlightsList.map((hl) => (
                <div key={hl.id || hl.title} className="p-5 rounded-2xl border border-border/80 bg-card/60 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-mono text-primary mb-0.5">{hl.icon}</p>
                    <h3 className="font-bold text-sm">{hl.title}</h3>
                    <p className="text-xs text-muted-foreground">{hl.description}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => { setEditingHighlight(hl); setIsHighlightModalOpen(true); }} className="p-1.5 hover:bg-muted rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteHighlight(hl.id!)} className="p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CORE STRENGTHS */}
        {activeTab === "strengths" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Leadership & Core Strengths</h2>
                <p className="text-xs text-muted-foreground">The strengths list shown on the Education section.</p>
              </div>
              <button
                onClick={() => { setEditingStrength({ content: "" }); setIsStrengthModalOpen(true); }}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Strength
              </button>
            </div>

            <div className="space-y-3 max-w-3xl">
              {strengthsList.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl border border-border/80 bg-card/60 flex items-start justify-between gap-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => { setEditingStrength(s); setIsStrengthModalOpen(true); }} className="p-1.5 hover:bg-muted rounded-lg"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteStrength(s.id!)} className="p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: MESSAGES */}
        {activeTab === "messages" && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-xl font-bold">Contact Inbox</h2>
            {messagesList.map((msg) => (
              <div key={msg.id} className="p-6 rounded-2xl border border-border/80 bg-card/60 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{msg.subject}</h3>
                    <p className="text-xs font-mono text-primary">From: {msg.name} ({msg.email})</p>
                  </div>
                  <button onClick={() => handleDeleteMessage(msg.id!)} className="p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </div>
                <p className="text-xs text-muted-foreground p-3 rounded-xl bg-background/50 border border-border/40">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* PROJECT MODAL */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="border border-border/80 bg-card/95 rounded-3xl p-4 sm:p-6 max-w-lg w-[95%] sm:w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl my-auto">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <h3 className="font-bold text-base">{editingProject.id ? "Edit Project" : "Add Project"}</h3>
              <button onClick={() => setIsProjectModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
              <input type="text" required placeholder="Project Name" value={editingProject.name || ""} onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })} className={inputClass} />
              <input type="text" required placeholder="Category (e.g. Fintech, Enterprise)" value={editingProject.category || ""} onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })} className={inputClass} />
              <textarea rows={3} placeholder="Description - a short paragraph about the project" value={editingProject.description || ""} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Tech Stack (comma separated, e.g. React.js, Node.js, PostgreSQL)" value={arrayToCsv(editingProject.tech)} onChange={(e) => setEditingProject({ ...editingProject, tech: csvToArray(e.target.value) })} className={inputClass} />
              <textarea rows={4} placeholder={"Highlights - one per line\ne.g. Real-time notifications\nScalable backend APIs"} value={arrayToLines(editingProject.highlights)} onChange={(e) => setEditingProject({ ...editingProject, highlights: linesToArray(e.target.value) })} className={inputClass} />
              <select value={editingProject.project_type || "public"} onChange={(e) => setEditingProject({ ...editingProject, project_type: e.target.value as ProjectType })} className={inputClass}>
                <option value="public">Public</option>
                <option value="customer">Client Work</option>
                <option value="private">Private</option>
              </select>
              <input type="text" placeholder="GitHub URL" value={editingProject.github_url || ""} onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Demo URL" value={editingProject.demo_url || ""} onChange={(e) => setEditingProject({ ...editingProject, demo_url: e.target.value })} className={inputClass} />
              <label className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <input type="checkbox" checked={editingProject.featured ?? false} onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })} className="w-4 h-4" />
                Featured project
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPERIENCE MODAL */}
      {isExpModalOpen && editingExp && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="border border-border/80 bg-card/95 rounded-3xl p-4 sm:p-6 max-w-lg w-[95%] sm:w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl my-auto">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <h3 className="font-bold text-base">{editingExp.id ? "Edit Experience" : "Add Experience"}</h3>
              <button onClick={() => setIsExpModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveExp} className="space-y-3 text-xs">
              <input type="text" required placeholder="Company" value={editingExp.company || ""} onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })} className={inputClass} />
              <input type="text" required placeholder="Role Title" value={editingExp.role || ""} onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Period (e.g. 2024 - Present)" value={editingExp.period || ""} onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })} className={inputClass} />
              <textarea rows={2} placeholder="Short description / blurb for this role" value={editingExp.description || ""} onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Key Project" value={editingExp.keyProject || ""} onChange={(e) => setEditingExp({ ...editingExp, keyProject: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Technologies (comma separated)" value={arrayToCsv(editingExp.technologies)} onChange={(e) => setEditingExp({ ...editingExp, technologies: csvToArray(e.target.value) })} className={inputClass} />
              <textarea rows={4} placeholder={"Responsibilities - one per line"} value={arrayToLines(editingExp.responsibilities)} onChange={(e) => setEditingExp({ ...editingExp, responsibilities: linesToArray(e.target.value) })} className={inputClass} />
              <textarea rows={4} placeholder={"Achievements - one per line"} value={arrayToLines(editingExp.achievements)} onChange={(e) => setEditingExp({ ...editingExp, achievements: linesToArray(e.target.value) })} className={inputClass} />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsExpModalOpen(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SKILL MODAL */}
      {isSkillModalOpen && editingSkillCat && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="border border-border/80 bg-card/95 rounded-3xl p-4 sm:p-6 max-w-md w-[95%] sm:w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl my-auto">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <h3 className="font-bold text-base">{editingSkillCat.id ? "Edit Category" : "Add Category"}</h3>
              <button onClick={() => setIsSkillModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveSkillCat} className="space-y-3 text-xs">
              <input type="text" required placeholder="Category Name" value={editingSkillCat.name || ""} onChange={(e) => setEditingSkillCat({ ...editingSkillCat, name: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Lucide icon name (e.g. Code2, Server, Database)" value={editingSkillCat.icon || ""} onChange={(e) => setEditingSkillCat({ ...editingSkillCat, icon: e.target.value })} className={inputClass} />
              <textarea rows={3} placeholder="Skills (comma separated)" value={editingSkillCat.skills ? editingSkillCat.skills.join(", ") : ""} onChange={(e) => setEditingSkillCat({ ...editingSkillCat, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} className={inputClass} />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsSkillModalOpen(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDUCATION MODAL */}
      {isEduModalOpen && editingEdu && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="border border-border/80 bg-card/95 rounded-3xl p-4 sm:p-6 max-w-md w-[95%] sm:w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl my-auto">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <h3 className="font-bold text-base">{editingEdu.id ? "Edit Education" : "Add Education"}</h3>
              <button onClick={() => setIsEduModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveEdu} className="space-y-3 text-xs">
              <input type="text" required placeholder="Degree / Diploma" value={editingEdu.degree || ""} onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })} className={inputClass} />
              <input type="text" required placeholder="Institution" value={editingEdu.institution || ""} onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Year" value={editingEdu.year || ""} onChange={(e) => setEditingEdu({ ...editingEdu, year: e.target.value })} className={inputClass} />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsEduModalOpen(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HIGHLIGHT MODAL */}
      {isHighlightModalOpen && editingHighlight && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="border border-border/80 bg-card/95 rounded-3xl p-4 sm:p-6 max-w-md w-[95%] sm:w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl my-auto">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <h3 className="font-bold text-base">{editingHighlight.id ? "Edit Highlight" : "Add Highlight"}</h3>
              <button onClick={() => setIsHighlightModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveHighlight} className="space-y-3 text-xs">
              <input type="text" placeholder="Lucide icon name (e.g. Server, Shield, Database, Code2)" value={editingHighlight.icon || ""} onChange={(e) => setEditingHighlight({ ...editingHighlight, icon: e.target.value })} className={inputClass} />
              <input type="text" required placeholder="Title (e.g. Backend Systems)" value={editingHighlight.title || ""} onChange={(e) => setEditingHighlight({ ...editingHighlight, title: e.target.value })} className={inputClass} />
              <textarea rows={2} required placeholder="Description" value={editingHighlight.description || ""} onChange={(e) => setEditingHighlight({ ...editingHighlight, description: e.target.value })} className={inputClass} />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsHighlightModalOpen(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STRENGTH MODAL */}
      {isStrengthModalOpen && editingStrength && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="border border-border/80 bg-card/95 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <h3 className="font-bold text-base">{editingStrength.id ? "Edit Strength" : "Add Strength"}</h3>
              <button onClick={() => setIsStrengthModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveStrength} className="space-y-3 text-xs">
              <textarea rows={4} required placeholder="Strength / leadership statement" value={editingStrength.content || ""} onChange={(e) => setEditingStrength({ ...editingStrength, content: e.target.value })} className={inputClass} />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsStrengthModalOpen(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
