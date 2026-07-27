// "use client"

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer"
import {
  personalInfo as defaultPersonalInfo,
  skillCategories as defaultSkillCategories,
  workExperience as defaultWorkExperience,
  projects as defaultProjects,
  education as defaultEducation,
  leadershipAndStrengths as defaultLeadershipStrengths,
} from "@/lib/resume-data"
import { PersonalInfo, WorkExperience, Project, Education, SkillCategory } from "@/types/resume"

// Register fonts for ATS compatibility
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggVx-7DQifa8Lg.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggVx-7DQifa8Lg.ttf", fontWeight: 700 },
  ],
})

// The PDF page background is always kept light/white - that's the ATS and
// print-friendly convention, and reversing it for a "dark mode" PDF would
// hurt both readability and compatibility with resume parsers. What DOES
// follow the site's selected neon theme is the accent color used for
// headings, section rules, bullets, and tech badges.
export type PDFAccent = "blue" | "green" | "red"
const ACCENT_COLORS: Record<PDFAccent, { primary: string; primaryDark: string; tint: string }> = {
  blue: { primary: "#0891b2", primaryDark: "#1e40af", tint: "#eff6ff" },
  green: { primary: "#059669", primaryDark: "#065f46", tint: "#ecfdf5" },
  red: { primary: "#e11d48", primaryDark: "#9f1239", tint: "#fff1f2" },
}

function getStyles(accent: PDFAccent) {
  const c = ACCENT_COLORS[accent]
  return StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      fontSize: 10,
      lineHeight: 1.4,
      color: "#1a1a1a",
      backgroundColor: "#ffffff",
    },
    header: {
      marginBottom: 16,
      borderBottomWidth: 2,
      borderBottomColor: c.primary,
      borderBottomStyle: "solid",
      paddingBottom: 12,
    },
    name: {
      fontSize: 24,
      fontWeight: 700,
      color: c.primaryDark,
      marginBottom: 4,
      letterSpacing: 1,
    },
    title: {
      fontSize: 12,
      color: "#4b5563",
      marginBottom: 8,
      fontWeight: 600,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      fontSize: 9,
      color: "#6b7280",
    },
    contactItem: {
      color: c.primary,
    },
    contactSep: {
      marginHorizontal: 6,
      color: "#d1d5db",
    },
    section: {
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: c.primaryDark,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      borderBottomStyle: "solid",
      paddingBottom: 3,
    },
    summaryText: {
      fontSize: 10,
      color: "#374151",
      lineHeight: 1.5,
      textAlign: "justify",
    },
    experienceItem: {
      marginBottom: 10,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 3,
    },
    experienceHeaderLeft: {
      flexGrow: 1,
      flexShrink: 1,
      paddingRight: 8,
    },
    companyName: {
      fontSize: 11,
      fontWeight: 700,
      color: "#111827",
    },
    roleText: {
      fontSize: 10,
      color: "#4b5563",
      fontStyle: "italic",
    },
    periodText: {
      fontSize: 9,
      color: "#6b7280",
      flexShrink: 0,
      textAlign: "right",
    },
    descriptionText: {
      fontSize: 9.5,
      color: "#4b5563",
      fontStyle: "italic",
      marginBottom: 3,
      lineHeight: 1.4,
    },
    bulletList: {
      marginLeft: 12,
      marginTop: 3,
    },
    bulletItem: {
      fontSize: 9.5,
      color: "#374151",
      marginBottom: 2,
      lineHeight: 1.4,
      flex: 1,
    },
    bullet: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: c.primary,
      marginRight: 6,
      marginTop: 4,
      flexShrink: 0,
    },
    skillGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    skillCategory: {
      width: "48%",
      marginRight: "2%",
      marginBottom: 6,
    },
    skillCategoryTitle: {
      fontSize: 9,
      fontWeight: 700,
      color: "#374151",
      marginBottom: 2,
    },
    skillList: {
      fontSize: 9,
      color: "#6b7280",
      lineHeight: 1.3,
    },
    projectItem: {
      marginBottom: 7,
    },
    projectNameRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "baseline",
    },
    projectName: {
      fontSize: 10,
      fontWeight: 700,
      color: "#111827",
      marginRight: 5,
    },
    projectTech: {
      fontSize: 8.5,
      color: "#6b7280",
      fontStyle: "italic",
    },
    projectDescription: {
      fontSize: 9,
      color: "#4b5563",
      lineHeight: 1.3,
      marginTop: 1,
    },
    educationItem: {
      marginBottom: 6,
    },
    educationDegree: {
      fontSize: 10,
      fontWeight: 700,
      color: "#111827",
    },
    educationMeta: {
      fontSize: 9,
      color: "#6b7280",
      marginTop: 1,
    },
    strengthItem: {
      fontSize: 9.5,
      color: "#374151",
      marginBottom: 4,
      lineHeight: 1.4,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    strengthBullet: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: c.primary,
      marginRight: 5,
      marginTop: 4,
      flexShrink: 0,
    },
    strengthText: {
      flex: 1,
    },
    techBadge: {
      fontSize: 8,
      color: c.primary,
      backgroundColor: c.tint,
      paddingHorizontal: 4,
      paddingVertical: 1,
      borderRadius: 3,
      marginRight: 3,
      marginBottom: 2,
    },
    twoColumn: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    column: {
      width: "48%",
    },
  })
}

// Strips the protocol/www so contact links show clean, compact text
// instead of a full URL competing for space in the header row.
function displayUrl(url?: string | null) {
  if (!url) return ""
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "")
}

export interface PDFResumeProps {
  accent?: PDFAccent
  personalInfo?: PersonalInfo
  skillCategories?: SkillCategory[]
  workExperience?: WorkExperience[]
  projects?: Project[]
  education?: Education[]
  leadershipStrengths?: string[]
}

export default function PDFResume({
  accent = "blue",
  personalInfo = defaultPersonalInfo,
  skillCategories = defaultSkillCategories,
  workExperience = defaultWorkExperience,
  projects = defaultProjects,
  education = defaultEducation,
  leadershipStrengths = defaultLeadershipStrengths,
}: PDFResumeProps) {
  const styles = getStyles(accent)

  return (
    <Document title={`${personalInfo.name} - Resume`} author={personalInfo.name} subject="Software Engineer Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactRow}>
            <Text>{personalInfo.location}</Text>
            <Text style={styles.contactSep}>|</Text>
            <Link src={`mailto:${personalInfo.email}`} style={styles.contactItem}>
              {personalInfo.email}
            </Link>
            {personalInfo.linkedin && (
              <>
                <Text style={styles.contactSep}>|</Text>
                <Link src={personalInfo.linkedin} style={styles.contactItem}>
                  {displayUrl(personalInfo.linkedin)}
                </Link>
              </>
            )}
            {personalInfo.github && (
              <>
                <Text style={styles.contactSep}>|</Text>
                <Link src={personalInfo.github} style={styles.contactItem}>
                  {displayUrl(personalInfo.github)}
                </Link>
              </>
            )}
            {personalInfo.portfolio && (
              <>
                <Text style={styles.contactSep}>|</Text>
                <Link src={personalInfo.portfolio} style={styles.contactItem}>
                  {displayUrl(personalInfo.portfolio)}
                </Link>
              </>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Technical Skills */}
        {skillCategories.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillGrid}>
              {skillCategories.map((category) => (
                <View key={category.id || category.name} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{category.name}</Text>
                  <Text style={styles.skillList}>{category.skills.join(" • ")}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {workExperience.map((exp) => (
              <View key={exp.id || exp.company} style={styles.experienceItem} wrap={false}>
                <View style={styles.experienceHeader}>
                  <View style={styles.experienceHeaderLeft}>
                    <Text style={styles.companyName}>{exp.company}</Text>
                    <Text style={styles.roleText}>{exp.role}</Text>
                  </View>
                  <Text style={styles.periodText}>{exp.period}</Text>
                </View>
                {exp.description && <Text style={styles.descriptionText}>{exp.description}</Text>}
                <View style={styles.bulletList}>
                  {exp.responsibilities.slice(0, 4).map((resp, i) => (
                    <View key={i} style={{ flexDirection: "row" }}>
                      <View style={styles.bullet} />
                      <Text style={styles.bulletItem}>{resp}</Text>
                    </View>
                  ))}
                </View>
                {exp.technologies.length > 0 && (
                  <View style={{ marginTop: 3, flexDirection: "row", flexWrap: "wrap" }}>
                    {exp.technologies.map((tech) => (
                      <Text key={tech} style={styles.techBadge}>{tech}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {projects.slice(0, 6).map((project) => (
              <View key={project.id || project.name} style={styles.projectItem} wrap={false}>
                <View style={styles.projectNameRow}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectTech}>({project.tech.join(", ")})</Text>
                </View>
                <Text style={styles.projectDescription}>
                  {project.description || project.highlights[0] || ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Two Column: Education & Strengths */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id || edu.degree} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  <Text style={styles.educationMeta}>
                    {edu.institution}{edu.year ? ` • ${edu.year}` : ""}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Core Strengths</Text>
              {leadershipStrengths.slice(0, 5).map((strength, i) => (
                <View key={i} style={styles.strengthItem}>
                  <View style={styles.strengthBullet} />
                  <Text style={styles.strengthText}>{strength}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
