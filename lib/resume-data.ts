import { PersonalInfo, WorkExperience, Project, Education, SkillCategory } from "@/types/resume"

export const personalInfo: PersonalInfo = {
  name: "IBRAHIM TAJUDEEN",
  title: "Software Engineer",
  tagline: "Full-Stack Developer • System Architect • Compiler Enthusiast",
  location: "Nigeria / Remote",
  portfolio: "https://www.nexocode.vercel.app",
  resumeWebsite: "https://www.nexocode-cv.vercel.app",
  github: "https://github.com/ibrahimtajudeen",
  linkedin: "https://www.linkedin.com/in/ibrahim-tajudeen-7328312a5",
  email: "donslice6@gmail.com",
  phone: "+234 813 216 6576",
}

export const professionalSummary = `Software Engineer experienced in building scalable backend systems, fintech infrastructure, AI-powered platforms, and cross-platform applications across web, desktop, and mobile environments. Skilled in designing secure APIs, payment systems, real-time architectures, authentication systems, and modern frontend experiences using technologies such as C#, .NET, NestJS, React.js, and PostgreSQL.

Experienced in leading end-to-end software development lifecycle processes including architecture design, database modeling, API development, frontend engineering, deployment workflows, and production optimization. Strong background in fintech systems, secure transaction handling, AI integrations, and enterprise application development.`

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "C/C++", "C#", "Java", "Python", "SQL"],
    icon: "Code2",
  },
  {
    name: "Frontend & Cross Platform",
    skills: ["React.js", "Next.js", "Blazor", "React Native", "Flutter", "Xamarin.Forms", ".NET MAUI", "WPF", "UWP", "WinForms", "Tailwind CSS", "Bootstrap", "EJS", "PUG", "Handlebars"],
    icon: "Layout",
  },
  {
    name: "Backend & APIs",
    skills: ["Node.js", "Express.js", "NestJS", "ASP.NET", "Spring Boot", "FastAPI", "Django", "Flask"],
    icon: "Server",
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "SQL Server", "Redis", "MongoDB", "Supabase", "Firebase"],
    icon: "Database",
  },
  {
    name: "Authentication & Security",
    skills: ["JWT", "OAuth2", "RBAC", "API Security", "Secure Payment Flows", "Encryption", "Row-Level Security"],
    icon: "Shield",
  },
  {
    name: "DevOps & Tools",
    skills: ["Git", "GitHub Actions", "GitLab", "Bitbucket", "Azure DevOps", "Jenkins", "Docker", "CI/CD"],
    icon: "GitBranch",
  },
  {
    name: "AI & Integrations",
    skills: ["OpenAI APIs", "NLP", "TensorFlow", "Payment APIs", "WebSockets"],
    icon: "Brain",
  },
]

export const workExperience: WorkExperience[] = [
  {
    company: "STONETECH SQUARE",
    role: "Software Engineer",
    period: "2024 – 2025",
    responsibilities: [
      "Developed fintech and peer-to-peer transaction platforms using NestJS, React.js, Supabase, and PostgreSQL.",
      "Built wallet infrastructure supporting virtual accounts, fund transfers, transaction auditing, and secure financial operations.",
      "Integrated Bybit P2P APIs to facilitate secure merchant-to-user transaction workflows.",
      "Implemented Row-Level Security (RLS), encryption layers, and identity validation systems to strengthen platform security.",
      "Contributed to backend architecture, database design, API development, and frontend integration across production systems.",
      "Collaborated with engineering teams to optimize application performance, scalability, and maintainability.",
    ],
    keyProject: "SkuidPay — P2P Fintech Platform",
    technologies: ["NestJS", "React.js", "Supabase", "PostgreSQL", "Bybit APIs"],
    achievements: [
      "Built wallet systems with virtual account management, transaction history, and fund transfer capabilities.",
      "Designed secure transaction workflows with merchant verification and identity protection mechanisms.",
      "Implemented secure authentication, encryption, and fraud prevention systems.",
    ],
  },
  {
    company: "SCORCHETECH",
    role: "Software Engineer",
    period: "Jan 2023 – Jan 2024",
    responsibilities: [
      "Developed scalable web and mobile applications across fintech and enterprise product ecosystems.",
      "Built secure backend services and responsive frontend systems using Node.js, React.js, and PostgreSQL.",
      "Integrated payment processing APIs and implemented transaction-safe financial workflows.",
      "Improved system performance, API reliability, and frontend responsiveness through debugging and optimization.",
      "Participated in architecture planning, API design, and product development processes.",
    ],
    keyProject: "ScorchePay — Fintech Platform",
    technologies: ["Node.js", "React.js", "PostgreSQL", "Payment APIs"],
    achievements: [
      "Built wallet systems supporting virtual accounts, transfers, audit trails, and transaction history.",
      "Implemented idempotent transaction handling and scalable fintech architecture.",
      "Developed secure RBAC authentication systems and fraud-prevention mechanisms.",
      "Integrated payment processing APIs for secure financial operations.",
    ],
  },
  {
    company: "NEXOTECHNOLOGY LIMITED",
    role: "Software Engineer",
    period: "2023 – Present",
    responsibilities: [
      "Led development of enterprise software systems, AI-powered platforms, fintech applications, and internal developer tools.",
      "Designed scalable backend APIs, database architectures, authentication systems, and real-time communication workflows.",
      "Built cross-platform applications across web, desktop, and mobile environments using modern engineering frameworks.",
      "Worked on AI integrations, secure data systems, automation workflows, and developer productivity tools.",
      "Contributed to technical architecture decisions, deployment workflows, and engineering system design.",
    ],
    keyProject: "Enterprise Solutions & Developer Tools",
    technologies: ["C#", ".NET", "NestJS", "React.js", "PostgreSQL", "Azure DevOps"],
    achievements: [
      "Architected scalable enterprise systems with microservices patterns.",
      "Built developer tooling platforms improving team productivity.",
      "Implemented AI-powered features across multiple product lines.",
    ],
  },
]

export const projects: Project[] = [
  {
    name: "KalmScript",
    tech: ["C#", "C/C++", "MSIL"],
    highlights: [
      "Custom compiler architecture",
      "Lexer/parser/AST system",
      "Multi-language interoperability",
      "Unified MSIL execution",
      "Sandboxed runtime",
      "DLL dependency management",
    ],
    category: "Systems Programming",
  },
  {
    name: "DevGroupHub",
    tech: ["Node.js", "GitHub APIs", "Automation Systems"],
    highlights: [
      "GitHub repository watchdog systems",
      "WhatsApp automation bots",
      "Team collaboration systems",
    ],
    category: "Developer Tools",
  },
  {
    name: "SaleTrack",
    tech: ["ASP.NET", "SQL Server", "React.js"],
    highlights: [
      "Inventory management",
      "Sales auditing",
      "Analytics dashboards",
      "Fraud prevention systems",
    ],
    category: "Enterprise",
  },
  {
    name: "FinSight",
    tech: ["React.js", "Supabase", "OpenAI APIs"],
    highlights: [
      "AI-powered recommendations",
      "Banking API integrations",
      "Financial tracking systems",
    ],
    category: "Fintech",
  },
  {
    name: "QuickRun",
    tech: ["Flutter", "Node.js", "Payment APIs"],
    highlights: [
      "Utility payment APIs",
      "Referral systems",
      "Wallet interactions",
    ],
    category: "Fintech",
  },
  {
    name: "Hospital Management System",
    tech: ["ASP.NET", "SQL Server", "React.js"],
    highlights: [
      "Multi-branch architecture",
      "Role-based authorization",
      "Digital hospital operations",
    ],
    category: "Healthcare",
  },
  {
    name: "School Management System",
    tech: ["ASP.NET", "SQL Server", "React.js"],
    highlights: [
      "Dynamic dashboards",
      "Multi-role systems",
      "Multi-branch architecture",
    ],
    category: "Education",
  },
  {
    name: "ISQL",
    tech: ["C#", ".NET"],
    highlights: [
      "Custom SQL-like library",
      "Hashing & encryption",
      "Custom data structures",
    ],
    category: "Systems Programming",
  },
  {
    name: "Auth-Folio",
    tech: ["ASP.NET", "JWT", "REST APIs"],
    highlights: [
      "Reusable authentication APIs",
      "JWT identity management",
      "Secure integrations",
    ],
    category: "Security",
  },
  {
    name: "FuturePlanners",
    tech: ["React.js", "Node.js", "PostgreSQL"],
    highlights: [
      "Real-time notifications",
      "Scalable backend APIs",
      "Property workflows",
    ],
    category: "Real Estate",
  },
  {
    name: "Standard Safe Construction",
    tech: ["Express.js", "MongoDB", "Cloudinary", "AI APIs"],
    highlights: [
      "AI-powered recommendations",
      "Payment gateway systems",
      "Media management systems",
    ],
    category: "Construction",
  },
  {
    name: "AI-Based Phishing Detection",
    tech: ["Python", "TensorFlow", "REST APIs", "PowerShell"],
    highlights: [
      "TF-IDF vectorization",
      "Machine learning classification",
      "REST communication systems",
      "PowerShell automation",
    ],
    category: "AI/ML",
  },
]

export const education: Education[] = [
  { degree: "Diploma in Software Engineering", institution: "Kaduna ICT Hub" },
  { degree: "Diploma in ICT", institution: "Dialogue ICT Schools" },
  { degree: "Diploma in Computer Literacy & Programming Fundamentals", institution: "Notion Computer Technology" },
  { degree: "WAEC", institution: "2020" },
  { degree: "NECO", institution: "2020" },
]

export const leadershipAndStrengths = [
  "Led architecture and development for fintech systems, authentication platforms, AI-powered solutions, and developer tooling projects.",
  "Strong expertise in backend API development, scalable system architecture, database optimization, and secure application engineering.",
  "Experienced in designing financial systems including wallet infrastructure, transaction workflows, reconciliation logic, and secure payment integrations.",
  "Skilled in cross-platform application development across web, desktop, and mobile ecosystems.",
  "Comfortable owning projects end-to-end from planning and architecture through deployment and production optimization.",
  "Strong problem-solving mindset with experience building production-oriented systems under real-world engineering constraints.",
  "Focused on clean architecture, maintainable codebases, scalable infrastructure, and modern software engineering best practices.",
]
