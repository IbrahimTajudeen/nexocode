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
  personalInfo,
  professionalSummary,
  skillCategories,
  workExperience,
  projects,
  education,
  leadershipAndStrengths,
} from "@/lib/resume-data"

// Register fonts for ATS compatibility
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggVx-7DQifa8Lg.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggVx-7DQifa8Lg.ttf", fontWeight: 700 },
  ],
})

const styles = StyleSheet.create({
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
    borderBottomColor: "#2563eb",
    borderBottomStyle: "solid",
    paddingBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1e40af",
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
    gap: 8,
    fontSize: 9,
    color: "#6b7280",
  },
  contactItem: {
    color: "#2563eb",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#1e40af",
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
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2563eb",
    marginRight: 6,
    marginTop: 4,
  },
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillCategory: {
    width: "48%",
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
    marginBottom: 6,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  projectName: {
    fontSize: 10,
    fontWeight: 700,
    color: "#111827",
    marginRight: 4,
  },
  projectTech: {
    fontSize: 9,
    color: "#6b7280",
    fontStyle: "italic",
  },
  educationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  educationText: {
    fontSize: 10,
    color: "#374151",
  },
  educationYear: {
    fontSize: 9,
    color: "#6b7280",
  },
  strengthItem: {
    fontSize: 9.5,
    color: "#374151",
    marginBottom: 3,
    lineHeight: 1.4,
    flexDirection: "row",
  },
  strengthBullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#2563eb",
    marginRight: 5,
    marginTop: 4,
  },
  techBadge: {
    fontSize: 8,
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginRight: 3,
    marginBottom: 2,
  },
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  column: {
    width: "48%",
  },
})

export default function PDFResume() {
  return (
    <Document title={`${personalInfo.name} - Resume`} author={personalInfo.name} subject="Software Engineer Resume">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>
            <Text>|</Text>
            <Link src={`mailto:${personalInfo.email}`} style={styles.contactItem}>
              {personalInfo.email}
            </Link>
            <Text>|</Text>
            <Link src={personalInfo.linkedin} style={styles.contactItem}>
              linkedin.com/in/ibrahim-tajudeen
            </Link>
            <Text>|</Text>
            <Link src={personalInfo.github} style={styles.contactItem}>
              github.com/ibrahimtajudeen
            </Link>
            <Text>|</Text>
            <Link src={personalInfo.portfolio} style={styles.contactItem}>
              nexocode.vercel.app
            </Link>
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{professionalSummary}</Text>
        </View>

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillGrid}>
            {skillCategories.map((category) => (
              <View key={category.name} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>{category.name}</Text>
                <Text style={styles.skillList}>{category.skills.join(" • ")}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {workExperience.map((exp) => (
            <View key={exp.company} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <View>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.roleText}>{exp.role}</Text>
                </View>
                <Text style={styles.periodText}>{exp.period}</Text>
              </View>
              <View style={styles.bulletList}>
                {exp.responsibilities.slice(0, 3).map((resp, i) => (
                  <View key={i} style={{ flexDirection: "row" }}>
                    <View style={styles.bullet} />
                    <Text style={styles.bulletItem}>{resp}</Text>
                  </View>
                ))}
              </View>
              <View style={{ marginTop: 3, flexDirection: "row", flexWrap: "wrap" }}>
                {exp.technologies.map((tech) => (
                  <Text key={tech} style={styles.techBadge}>{tech}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {projects.slice(0, 6).map((project) => (
            <View key={project.name} style={styles.projectItem}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectTech}>
                ({project.tech.join(", ")}) — {project.highlights[0]}
              </Text>
            </View>
          ))}
        </View>

        {/* Two Column: Education & Strengths */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.degree} style={styles.educationItem}>
                  <Text style={styles.educationText}>{edu.degree}</Text>
                  <Text style={styles.educationYear}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Core Strengths</Text>
              {leadershipAndStrengths.slice(0, 4).map((strength, i) => (
                <View key={i} style={styles.strengthItem}>
                  <View style={styles.strengthBullet} />
                  <Text style={{ flex: 1 }}>{strength}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
