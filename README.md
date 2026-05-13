# 🚀 NexoCode CV — Premium Resume Website

> A modern, elegant, ATS-optimized resume website and downloadable PDF resume for **Ibrahim Tajudeen**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-EF0095?style=flat-square&logo=framer)](https://www.framer.com/motion/)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Premium Design** | Modern SaaS portfolio aesthetic with elegant gradients and typography |
| 🌓 **Dark/Light Mode** | Full theme support with smooth transitions |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile |
| 🎬 **Smooth Animations** | Framer Motion scroll animations and micro-interactions |
| 📄 **ATS-Friendly PDF** | Clean, machine-readable PDF resume via React PDF |
| 🔍 **Project Filtering** | Search and filter projects by category |
| ⏱️ **Timeline Experience** | Elegant timeline-based work history |
| ⬇️ **One-Click Download** | PDF generation and download functionality |
| 🔗 **Social Integration** | GitHub, LinkedIn, Portfolio, Email links |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **UI Components**: Radix UI (ShadCN pattern)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Generation**: React PDF (@react-pdf/renderer)
- **Fonts**: Inter (body), JetBrains Mono (code)

---

## 📁 Project Structure

```
nexocode-cv/
├── app/                          # Next.js App Router
│   ├── api/resume/route.ts       # PDF generation API
│   ├── resume/page.tsx           # Resume download page
│   ├── globals.css               # Global styles + dark mode
│   ├── layout.tsx                # Root layout with fonts
│   ├── page.tsx                  # Main resume page
│   └── not-found.tsx             # 404 page
├── components/
│   ├── sections/                 # Page sections
│   │   ├── navigation.tsx        # Sticky nav + dark mode toggle
│   │   ├── hero.tsx              # Hero section
│   │   ├── about.tsx             # Professional summary
│   │   ├── skills.tsx            # Technical skills grid
│   │   ├── experience.tsx        # Timeline experience
│   │   ├── projects.tsx          # Filterable project showcase
│   │   ├── education.tsx         # Education & strengths
│   │   ├── contact.tsx           # Contact section
│   │   └── footer.tsx            # Footer
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx            # Button component
│   │   ├── badge.tsx             # Badge component
│   │   ├── card.tsx              # Card component
│   │   └── separator.tsx         # Separator component
│   └── pdf/                      # PDF resume components
│       └── resume.tsx            # ATS-friendly PDF layout
├── lib/
│   ├── utils.ts                  # Utility functions (cn)
│   └── resume-data.ts            # All resume data
├── types/
│   └── resume.ts                 # TypeScript interfaces
├── public/
│   └── index.html                # Standalone HTML fallback
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd nexocode-cv

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build static export
npm run build

# The static files will be in the `out/` directory
```

---

## 📄 PDF Resume

The resume includes an ATS-friendly PDF generation system:

- **API Endpoint**: `GET /api/resume` — Returns PDF buffer
- **Download Page**: `/resume` — Interactive PDF viewer with download button
- **ATS Optimized**: Clean typography, standard fonts, proper section hierarchy

### PDF Features
- Standard A4 format
- Helvetica font family (ATS-safe)
- Clear section hierarchy
- Bullet-point achievements
- Technology tags
- Single-page optimized layout

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) → Purple (#8b5cf6) gradient
- **Background**: Slate dark (#0f172a) / Light (#ffffff)
- **Card**: Slate (#1e293b) / Light (#f8fafc)
- **Text**: White (#f8fafc) / Dark (#0f172a)
- **Muted**: Slate 400 (#94a3b8)

### Typography
- **Headings**: Inter, 800 weight, tight tracking
- **Body**: Inter, 400 weight, 1.6 line-height
- **Code**: JetBrains Mono

### Spacing
- Section padding: 80px–128px
- Card padding: 24px
- Grid gap: 24px
- Border radius: 16px (cards), 9999px (buttons/badges)

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, stacked timeline |
| Tablet | 640–1024px | 2-column grids |
| Desktop | > 1024px | Full layout, side-by-side timeline |

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the `out/` directory
```

### Static Hosting
```bash
# Use the standalone HTML fallback
npm run build
cp public/index.html out/404.html
# Deploy `out/` to any static host
```

---

## 🔧 Customization

All resume data is centralized in `lib/resume-data.ts`. Simply edit this file to update:

- Personal information
- Work experience
- Projects
- Skills
- Education
- Contact details

The PDF and website will automatically reflect changes.

---

## 📄 License

MIT License — feel free to use as a template for your own resume.

---

<p align="center">
  Built with ❤️ by <strong>Ibrahim Tajudeen</strong>
  <br>
  <a href="https://www.nexocode-cv.vercel.app">nexocode-cv.vercel.app</a>
</p>
