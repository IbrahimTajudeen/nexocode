-- Nexocode Portfolio Supabase Database Schema
-- Run this script in the Supabase SQL Editor
-- Safe to re-run: every statement below is idempotent (IF NOT EXISTS / OR REPLACE / DROP+CREATE POLICY).

-- 1. PERSONAL INFO TABLE
CREATE TABLE IF NOT EXISTS public.personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  location TEXT NOT NULL,
  portfolio TEXT,
  resume_website TEXT,
  github TEXT,
  linkedin TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  summary TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. WORK EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.work_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  key_project TEXT,
  technologies TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.work_experience ADD COLUMN IF NOT EXISTS description TEXT;

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  tech TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  project_type TEXT CHECK (project_type IN ('public', 'private', 'customer')) NOT NULL DEFAULT 'public',
  github_url TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS description TEXT;

-- 4. SKILL CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  icon TEXT DEFAULT 'Code2',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  year TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. HIGHLIGHTS TABLE (the 4 "Background & Summary" feature cards on the About section)
CREATE TABLE IF NOT EXISTS public.highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT DEFAULT 'Sparkles',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. LEADERSHIP & CORE STRENGTHS TABLE (Education section's right-hand list)
CREATE TABLE IF NOT EXISTS public.leadership_strengths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. USERS TABLE
-- Mirrors auth.users so the rest of the schema (and PostgREST joins) can
-- reference a row in the public schema instead of reaching into auth.
-- One row per Supabase Auth user, kept in sync by the trigger below.
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create a public.users row whenever someone signs up in Supabase Auth
-- (e.g. the admin account you create in Studio -> Authentication -> Users).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill public.users for any admin account created BEFORE this trigger
-- existed (harmless no-op if there isn't one yet).
INSERT INTO public.users (id, email)
SELECT id, email FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 10. OWNER COLUMNS
-- Every content table gets a user_id column pointing at auth.users(id),
-- so each row is tied to the admin who owns it. It defaults to auth.uid(),
-- so the app doesn't need to pass it explicitly - the currently signed-in
-- admin is stamped on automatically for anything they insert via the
-- Supabase client. Rows inserted with no session (public contact form,
-- SQL editor seed data) simply get user_id = NULL.
ALTER TABLE public.personal_info        ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();
ALTER TABLE public.work_experience      ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();
ALTER TABLE public.projects             ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();
ALTER TABLE public.skill_categories     ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();
ALTER TABLE public.education            ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();
ALTER TABLE public.contact_submissions  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();
ALTER TABLE public.highlights           ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();
ALTER TABLE public.leadership_strengths ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid();

CREATE INDEX IF NOT EXISTS idx_personal_info_user_id        ON public.personal_info(user_id);
CREATE INDEX IF NOT EXISTS idx_work_experience_user_id      ON public.work_experience(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_user_id             ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_categories_user_id     ON public.skill_categories(user_id);
CREATE INDEX IF NOT EXISTS idx_education_user_id            ON public.education(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id  ON public.contact_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_highlights_user_id           ON public.highlights(user_id);
CREATE INDEX IF NOT EXISTS idx_leadership_strengths_user_id ON public.leadership_strengths(user_id);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership_strengths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
DROP POLICY IF EXISTS "Public read access for personal_info" ON public.personal_info;
CREATE POLICY "Public read access for personal_info" ON public.personal_info FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read access for work_experience" ON public.work_experience;
CREATE POLICY "Public read access for work_experience" ON public.work_experience FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read access for projects" ON public.projects;
CREATE POLICY "Public read access for projects" ON public.projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read access for skill_categories" ON public.skill_categories;
CREATE POLICY "Public read access for skill_categories" ON public.skill_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read access for education" ON public.education;
CREATE POLICY "Public read access for education" ON public.education FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read access for highlights" ON public.highlights;
CREATE POLICY "Public read access for highlights" ON public.highlights FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read access for leadership_strengths" ON public.leadership_strengths;
CREATE POLICY "Public read access for leadership_strengths" ON public.leadership_strengths FOR SELECT USING (true);

-- CONTACT FORM PUBLIC INSERT POLICY
DROP POLICY IF EXISTS "Allow public insert to contact_submissions" ON public.contact_submissions;
CREATE POLICY "Allow public insert to contact_submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- ADMIN AUTHENTICATED FULL ACCESS POLICIES
-- NOTE: this site currently has a single admin, so these stay permissive
-- ("any authenticated user") rather than scoped to `auth.uid() = user_id`.
-- The user_id column is still populated on every row (via the DEFAULT
-- above) so you can flip to real per-owner scoping later without a
-- migration. See the commented block near the bottom for how.
DROP POLICY IF EXISTS "Admin full access for personal_info" ON public.personal_info;
CREATE POLICY "Admin full access for personal_info" ON public.personal_info FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access for work_experience" ON public.work_experience;
CREATE POLICY "Admin full access for work_experience" ON public.work_experience FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access for projects" ON public.projects;
CREATE POLICY "Admin full access for projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access for skill_categories" ON public.skill_categories;
CREATE POLICY "Admin full access for skill_categories" ON public.skill_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access for education" ON public.education;
CREATE POLICY "Admin full access for education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access for contact_submissions" ON public.contact_submissions;
CREATE POLICY "Admin full access for contact_submissions" ON public.contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access for highlights" ON public.highlights;
CREATE POLICY "Admin full access for highlights" ON public.highlights FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access for leadership_strengths" ON public.leadership_strengths;
CREATE POLICY "Admin full access for leadership_strengths" ON public.leadership_strengths FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- USERS TABLE POLICIES: each account can only see/update its own row
DROP POLICY IF EXISTS "Users can view own row" ON public.users;
CREATE POLICY "Users can view own row" ON public.users FOR SELECT TO authenticated USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own row" ON public.users;
CREATE POLICY "Users can update own row" ON public.users FOR UPDATE TO authenticated USING (auth.uid() = id);

-- ─────────────────────────────────────────────────────────────────────────
-- OPTIONAL: true multi-tenant / per-owner RLS
-- Once there is more than one admin and each should only manage their own
-- content, swap the eight "Admin full access" policies above for these,
-- and backfill user_id on any pre-existing rows first:
--
--   UPDATE public.personal_info        SET user_id = '<admin-auth-uid>' WHERE user_id IS NULL;
--   UPDATE public.work_experience      SET user_id = '<admin-auth-uid>' WHERE user_id IS NULL;
--   UPDATE public.projects             SET user_id = '<admin-auth-uid>' WHERE user_id IS NULL;
--   UPDATE public.skill_categories     SET user_id = '<admin-auth-uid>' WHERE user_id IS NULL;
--   UPDATE public.education            SET user_id = '<admin-auth-uid>' WHERE user_id IS NULL;
--   UPDATE public.highlights           SET user_id = '<admin-auth-uid>' WHERE user_id IS NULL;
--   UPDATE public.leadership_strengths SET user_id = '<admin-auth-uid>' WHERE user_id IS NULL;
--
--   DROP POLICY "Admin full access for projects" ON public.projects;
--   CREATE POLICY "Owner full access for projects" ON public.projects
--     FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
--   -- repeat the DROP/CREATE pair for the other seven tables
-- ─────────────────────────────────────────────────────────────────────────

-- INITIAL SEED DATA
-- Mirrors the full content that used to live only in lib/resume-data.ts
-- (work experience, skills, education, highlights and strengths were
-- never actually seeded into Supabase before - only personal_info and
-- projects were). This backfills the real data everywhere it belongs.

INSERT INTO public.personal_info (name, title, tagline, location, portfolio, resume_website, github, linkedin, email, phone, summary)
VALUES (
  'IBRAHIM TAJUDEEN',
  'Software Engineer',
  'Full-Stack Developer • System Architect • Compiler Enthusiast',
  'Nigeria / Remote',
  'https://www.nexocode.vercel.app',
  'https://www.nexocode-cv.vercel.app',
  'https://github.com/ibrahimtajudeen',
  'https://www.linkedin.com/in/ibrahim-tajudeen-7328312a5',
  'donslice6@gmail.com',
  '+234 813 216 6576',
  'Software Engineer experienced in building scalable backend systems, fintech infrastructure, AI-powered platforms, and cross-platform applications across web, desktop, and mobile environments. Skilled in designing secure APIs, payment systems, real-time architectures, authentication systems, and modern frontend experiences using technologies such as C#, .NET, NestJS, React.js, and PostgreSQL.'
) ON CONFLICT DO NOTHING;

INSERT INTO public.skill_categories (name, skills, icon, sort_order)
VALUES
('Languages', ARRAY['JavaScript', 'TypeScript', 'C/C++', 'C#', 'Java', 'Python', 'SQL'], 'Code2', 1),
('Frontend & Cross Platform', ARRAY['React.js', 'Next.js', 'Blazor', 'React Native', 'Flutter', 'Xamarin.Forms', '.NET MAUI', 'WPF', 'UWP', 'WinForms', 'Tailwind CSS', 'Bootstrap', 'EJS', 'PUG', 'Handlebars'], 'Layout', 2),
('Backend & APIs', ARRAY['Node.js', 'Express.js', 'NestJS', 'ASP.NET', 'Spring Boot', 'FastAPI', 'Django', 'Flask'], 'Server', 3),
('Databases', ARRAY['PostgreSQL', 'MySQL', 'SQL Server', 'Redis', 'MongoDB', 'Supabase', 'Firebase'], 'Database', 4),
('Authentication & Security', ARRAY['JWT', 'OAuth2', 'RBAC', 'API Security', 'Secure Payment Flows', 'Encryption', 'Row-Level Security'], 'Shield', 5),
('DevOps & Tools', ARRAY['Git', 'GitHub Actions', 'GitLab', 'Bitbucket', 'Azure DevOps', 'Jenkins', 'Docker', 'CI/CD'], 'GitBranch', 6),
('AI & Integrations', ARRAY['OpenAI APIs', 'NLP', 'TensorFlow', 'Payment APIs', 'WebSockets'], 'Brain', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.work_experience (company, role, period, description, key_project, technologies, responsibilities, achievements, sort_order)
VALUES
(
  'STONETECH SQUARE', 'Software Engineer', '2024 – 2025',
  'Fintech-focused engineering role building wallet infrastructure and secure P2P transaction systems.',
  'SkuidPay — P2P Fintech Platform',
  ARRAY['NestJS', 'React.js', 'Supabase', 'PostgreSQL', 'Bybit APIs'],
  ARRAY[
    'Developed fintech and peer-to-peer transaction platforms using NestJS, React.js, Supabase, and PostgreSQL.',
    'Built wallet infrastructure supporting virtual accounts, fund transfers, transaction auditing, and secure financial operations.',
    'Integrated Bybit P2P APIs to facilitate secure merchant-to-user transaction workflows.',
    'Implemented Row-Level Security (RLS), encryption layers, and identity validation systems to strengthen platform security.',
    'Contributed to backend architecture, database design, API development, and frontend integration across production systems.',
    'Collaborated with engineering teams to optimize application performance, scalability, and maintainability.'
  ],
  ARRAY[
    'Built wallet systems with virtual account management, transaction history, and fund transfer capabilities.',
    'Designed secure transaction workflows with merchant verification and identity protection mechanisms.',
    'Implemented secure authentication, encryption, and fraud prevention systems.'
  ],
  1
),
(
  'SCORCHETECH', 'Software Engineer', 'Jan 2023 – Jan 2024',
  'Full-stack engineering across fintech and enterprise product lines, from payment APIs to production optimization.',
  'ScorchePay — Fintech Platform',
  ARRAY['Node.js', 'React.js', 'PostgreSQL', 'Payment APIs'],
  ARRAY[
    'Developed scalable web and mobile applications across fintech and enterprise product ecosystems.',
    'Built secure backend services and responsive frontend systems using Node.js, React.js, and PostgreSQL.',
    'Integrated payment processing APIs and implemented transaction-safe financial workflows.',
    'Improved system performance, API reliability, and frontend responsiveness through debugging and optimization.',
    'Participated in architecture planning, API design, and product development processes.'
  ],
  ARRAY[
    'Built wallet systems supporting virtual accounts, transfers, audit trails, and transaction history.',
    'Implemented idempotent transaction handling and scalable fintech architecture.',
    'Developed secure RBAC authentication systems and fraud-prevention mechanisms.',
    'Integrated payment processing APIs for secure financial operations.'
  ],
  2
),
(
  'NEXOTECHNOLOGY LIMITED', 'Software Engineer', '2023 – Present',
  'Leading development of enterprise software, AI-powered platforms, fintech applications, and internal developer tools.',
  'Enterprise Solutions & Developer Tools',
  ARRAY['C#', '.NET', 'NestJS', 'React.js', 'PostgreSQL', 'Azure DevOps'],
  ARRAY[
    'Led development of enterprise software systems, AI-powered platforms, fintech applications, and internal developer tools.',
    'Designed scalable backend APIs, database architectures, authentication systems, and real-time communication workflows.',
    'Built cross-platform applications across web, desktop, and mobile environments using modern engineering frameworks.',
    'Worked on AI integrations, secure data systems, automation workflows, and developer productivity tools.',
    'Contributed to technical architecture decisions, deployment workflows, and engineering system design.'
  ],
  ARRAY[
    'Architected scalable enterprise systems with microservices patterns.',
    'Built developer tooling platforms improving team productivity.',
    'Implemented AI-powered features across multiple product lines.'
  ],
  3
)
ON CONFLICT DO NOTHING;

INSERT INTO public.projects (name, category, description, tech, highlights, project_type, github_url, demo_url, featured, sort_order)
VALUES
('KalmScript', 'Systems Programming', 'A custom compiler and language runtime with its own lexer, parser, and AST pipeline, unifying execution across multiple languages on MSIL.', ARRAY['C#', 'C/C++', 'MSIL'], ARRAY['Custom compiler architecture', 'Lexer/parser/AST system', 'Multi-language interoperability', 'Unified MSIL execution', 'Sandboxed runtime', 'DLL dependency management'], 'public', 'https://github.com/ibrahimtajudeen/kalmscript', NULL, true, 1),
('DevGroupHub', 'Developer Tools', 'A developer productivity suite combining GitHub repository monitoring with WhatsApp-based team automation and collaboration bots.', ARRAY['Node.js', 'GitHub APIs', 'Automation Systems'], ARRAY['GitHub repository watchdog systems', 'WhatsApp automation bots', 'Team collaboration systems'], 'public', 'https://github.com/ibrahimtajudeen/devgrouphub', 'https://devgrouphub.vercel.app', true, 2),
('SaleTrack', 'Enterprise', 'An enterprise inventory and sales auditing platform with real-time analytics dashboards and built-in fraud prevention.', ARRAY['ASP.NET', 'SQL Server', 'React.js'], ARRAY['Inventory management', 'Sales auditing', 'Analytics dashboards', 'Fraud prevention systems'], 'customer', NULL, 'https://saletrack-demo.vercel.app', true, 3),
('FinSight', 'Fintech', 'An AI-powered personal finance platform that connects to banking APIs to deliver recommendations and financial tracking.', ARRAY['React.js', 'Supabase', 'OpenAI APIs'], ARRAY['AI-powered recommendations', 'Banking API integrations', 'Financial tracking systems'], 'public', 'https://github.com/ibrahimtajudeen/finsight', 'https://finsight-ai.vercel.app', true, 4),
('QuickRun', 'Fintech', 'A mobile-first fintech app for utility bill payments, wallet top-ups, and referral-driven growth.', ARRAY['Flutter', 'Node.js', 'Payment APIs'], ARRAY['Utility payment APIs', 'Referral systems', 'Wallet interactions'], 'customer', NULL, 'https://quickrun.app', false, 5),
('Hospital Management System', 'Healthcare', 'A multi-branch hospital operations platform with role-based authorization across clinical and administrative workflows.', ARRAY['ASP.NET', 'SQL Server', 'React.js'], ARRAY['Multi-branch architecture', 'Role-based authorization', 'Digital hospital operations'], 'customer', NULL, NULL, false, 6),
('School Management System', 'Education', 'A multi-branch, multi-role school administration system with dynamic dashboards for staff, students, and admins.', ARRAY['ASP.NET', 'SQL Server', 'React.js'], ARRAY['Dynamic dashboards', 'Multi-role systems', 'Multi-branch architecture'], 'customer', NULL, NULL, false, 7),
('ISQL', 'Systems Programming', 'A custom SQL-like data access library implementing its own hashing, encryption, and data structures from scratch.', ARRAY['C#', '.NET'], ARRAY['Custom SQL-like library', 'Hashing & encryption', 'Custom data structures'], 'public', 'https://github.com/ibrahimtajudeen/isql', NULL, false, 8),
('Auth-Folio', 'Security', 'A reusable authentication library exposing JWT-based identity management APIs for secure integration into other systems.', ARRAY['ASP.NET', 'JWT', 'REST APIs'], ARRAY['Reusable authentication APIs', 'JWT identity management', 'Secure integrations'], 'public', 'https://github.com/ibrahimtajudeen/auth-folio', NULL, false, 9),
('FuturePlanners', 'Real Estate', 'A real estate management platform with real-time notifications and scalable backend APIs for property workflows.', ARRAY['React.js', 'Node.js', 'PostgreSQL'], ARRAY['Real-time notifications', 'Scalable backend APIs', 'Property workflows'], 'private', NULL, 'https://futureplanners.com', false, 10),
('Standard Safe Construction', 'Construction', 'A construction services platform with AI-powered recommendations, integrated payments, and media asset management.', ARRAY['Express.js', 'MongoDB', 'Cloudinary', 'AI APIs'], ARRAY['AI-powered recommendations', 'Payment gateway systems', 'Media management systems'], 'customer', NULL, 'https://standardsafe.com', false, 11),
('AI-Based Phishing Detection', 'AI/ML', 'A machine-learning phishing classifier using TF-IDF vectorization, exposed over a REST API with PowerShell automation tooling.', ARRAY['Python', 'TensorFlow', 'REST APIs', 'PowerShell'], ARRAY['TF-IDF vectorization', 'Machine learning classification', 'REST communication systems', 'PowerShell automation'], 'public', 'https://github.com/ibrahimtajudeen/ai-phishing-detection', NULL, false, 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.education (degree, institution, year, sort_order)
VALUES
('Diploma in Software Engineering', 'Kaduna ICT Hub', NULL, 1),
('Diploma in ICT', 'Dialogue ICT Schools', NULL, 2),
('Diploma in Computer Literacy & Programming Fundamentals', 'Notion Computer Technology', NULL, 3),
('WAEC', 'WAEC Board', '2020', 4),
('NECO', 'NECO Board', '2020', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.highlights (icon, title, description, sort_order)
VALUES
('Server', 'Backend Systems', 'Scalable APIs, Microservices & Distributed Architecture', 1),
('Database', 'Fintech Infrastructure', 'Payment Systems, Virtual Accounts & Ledger Wallets', 2),
('Code2', 'Full Stack Engineering', 'Cross-Platform Web, Desktop & Mobile Systems', 3),
('Shield', 'Security & Auth', 'RBAC, JWT, Row-Level Security & Fraud Prevention', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.leadership_strengths (content, sort_order)
VALUES
('Led architecture and development for fintech systems, authentication platforms, AI-powered solutions, and developer tooling projects.', 1),
('Strong expertise in backend API development, scalable system architecture, database optimization, and secure application engineering.', 2),
('Experienced in designing financial systems including wallet infrastructure, transaction workflows, reconciliation logic, and secure payment integrations.', 3),
('Skilled in cross-platform application development across web, desktop, and mobile ecosystems.', 4),
('Comfortable owning projects end-to-end from planning and architecture through deployment and production optimization.', 5),
('Strong problem-solving mindset with experience building production-oriented systems under real-world engineering constraints.', 6),
('Focused on clean architecture, maintainable codebases, scalable infrastructure, and modern software engineering best practices.', 7)
ON CONFLICT DO NOTHING;
