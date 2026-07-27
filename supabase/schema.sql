-- Nexocode Portfolio Supabase Database Schema
-- Run this script in the Supabase SQL Editor

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
  responsibilities TEXT[] DEFAULT '{}',
  key_project TEXT,
  technologies TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tech TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  project_type TEXT CHECK (project_type IN ('public', 'private', 'customer')) NOT NULL DEFAULT 'public',
  github_url TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

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

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public read access for personal_info" ON public.personal_info FOR SELECT USING (true);
CREATE POLICY "Public read access for work_experience" ON public.work_experience FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read access for skill_categories" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for education" ON public.education FOR SELECT USING (true);

-- CONTACT FORM PUBLIC INSERT POLICY
CREATE POLICY "Allow public insert to contact_submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- ADMIN AUTHENTICATED FULL ACCESS POLICIES
CREATE POLICY "Admin full access for personal_info" ON public.personal_info FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access for work_experience" ON public.work_experience FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access for projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access for skill_categories" ON public.skill_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access for education" ON public.education FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access for contact_submissions" ON public.contact_submissions FOR ALL TO authenticated USING (true);

-- INITIAL SEED DATA

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
  'Software Engineer experienced in building scalable backend systems, fintech infrastructure, AI-powered platforms, and cross-platform applications across web, desktop, and mobile environments.'
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (name, category, tech, highlights, project_type, github_url, demo_url, featured, sort_order)
VALUES
('KalmScript', 'Systems Programming', ARRAY['C#', 'C/C++', 'MSIL'], ARRAY['Custom compiler architecture', 'Lexer/parser/AST system', 'Multi-language interoperability', 'Unified MSIL execution'], 'public', 'https://github.com/ibrahimtajudeen/kalmscript', NULL, true, 1),
('DevGroupHub', 'Developer Tools', ARRAY['Node.js', 'GitHub APIs', 'Automation Systems'], ARRAY['GitHub repository watchdog systems', 'WhatsApp automation bots', 'Team collaboration systems'], 'public', 'https://github.com/ibrahimtajudeen/devgrouphub', 'https://devgrouphub.vercel.app', true, 2),
('SaleTrack', 'Enterprise', ARRAY['ASP.NET', 'SQL Server', 'React.js'], ARRAY['Inventory management', 'Sales auditing', 'Analytics dashboards', 'Fraud prevention systems'], 'customer', NULL, 'https://saletrack-demo.vercel.app', true, 3),
('FinSight', 'Fintech', ARRAY['React.js', 'Supabase', 'OpenAI APIs'], ARRAY['AI-powered recommendations', 'Banking API integrations', 'Financial tracking systems'], 'public', 'https://github.com/ibrahimtajudeen/finsight', 'https://finsight-ai.vercel.app', true, 4),
('QuickRun', 'Fintech', ARRAY['Flutter', 'Node.js', 'Payment APIs'], ARRAY['Utility payment APIs', 'Referral systems', 'Wallet interactions'], 'customer', NULL, 'https://quickrun.app', false, 5),
('Hospital Management System', 'Healthcare', ARRAY['ASP.NET', 'SQL Server', 'React.js'], ARRAY['Multi-branch architecture', 'Role-based authorization', 'Digital hospital operations'], 'customer', NULL, NULL, false, 6),
('School Management System', 'Education', ARRAY['ASP.NET', 'SQL Server', 'React.js'], ARRAY['Dynamic dashboards', 'Multi-role systems', 'Multi-branch architecture'], 'customer', NULL, NULL, false, 7),
('ISQL', 'Systems Programming', ARRAY['C#', '.NET'], ARRAY['Custom SQL-like library', 'Hashing & encryption', 'Custom data structures'], 'public', 'https://github.com/ibrahimtajudeen/isql', NULL, false, 8),
('Auth-Folio', 'Security', ARRAY['ASP.NET', 'JWT', 'REST APIs'], ARRAY['Reusable authentication APIs', 'JWT identity management', 'Secure integrations'], 'public', 'https://github.com/ibrahimtajudeen/auth-folio', NULL, false, 9),
('FuturePlanners', 'Real Estate', ARRAY['React.js', 'Node.js', 'PostgreSQL'], ARRAY['Real-time notifications', 'Scalable backend APIs', 'Property workflows'], 'private', NULL, 'https://futureplanners.com', false, 10),
('Standard Safe Construction', 'Construction', ARRAY['Express.js', 'MongoDB', 'Cloudinary', 'AI APIs'], ARRAY['AI-powered recommendations', 'Payment gateway systems', 'Media management systems'], 'customer', NULL, 'https://standardsafe.com', false, 11),
('AI-Based Phishing Detection', 'AI/ML', ARRAY['Python', 'TensorFlow', 'REST APIs', 'PowerShell'], ARRAY['TF-IDF vectorization', 'Machine learning classification', 'REST communication systems'], 'public', 'https://github.com/ibrahimtajudeen/ai-phishing-detection', NULL, false, 12)
ON CONFLICT DO NOTHING;
