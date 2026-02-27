import PageHeader from "./page-header";
import Link from "next/link";
import { ProjectCard } from "./cards";

const projects = [
  {
    id: 1,
    image: "/img/portfolio/portfolio-1.webp",
    link: "https:www.github.com/ibrahimtajudeen/easy-access-backend",
    title: "Easy Access",
    note: "A digital market platform",
    tags: ["Nestjs", "Supabase", "API", "Backend", "pending", "private"],
    category: "Backend",
    view: "#",
  },
  {
    id: 2,
    image: "/img/portfolio/portfolio-1.webp",
    link: "https:www.github.com/ibrahimtajudeen/event-booking",
    title: "Event Booking",
    note: "An event booking platform",
    tags: ["Nestjs", "Postgres", "API", "Backend", "⏸"],
    category: "Backend",
    view: '#'
  },
  {
    id: 3,
    image: "/img/portfolio/portfolio-1.webp",
    link: "https://www.github.com/ibrahimtajudeen/auth-folio",
    title: "Auth Folio",
    note: "Authentication & Authorization",
    tags: ["NestJs", "JSON", "API", "jwt", "bcrybt", "finished", "contributed"],
    category: "Backend",
    view: '#'
  },
  {
    id: 4,
    image: "/img/portfolio/portfolio-1.webp",
    link: "https://www.github.com/ibrahimtajudeen/hospital-management-system",
    title: "Hospital Management System",
    note: "a site that manage hospital day-to-day operations",
    tags: ['Health', "C#", "Asp.Net", "SQL Server", "EF Core", "jQuery", "🔃", "private"],
    category: "Fullstack",
    view: '#'
  },
  {
    id: 5,
    image: "/img/portfolio/portfolio-1.webp",
    link: "https://www.github.com/ibrahimtajudeen/quickrun-frontend",
    title: "Quick Run",
    note: "Freelancing Platform",
    tags: [
      "C#",
      ".Net MAUI",
      "Nextjs",
      "Supabase",
      "Typescript",
      "Tailwind",
      "⏸",
    ],
    category: "Frontend",
    view: '#'
  },
  {
    id: 6,
    image: "/img/portfolio/portfolio-1.webp",
    link: "https://github.com/ibrahimtajudeen/isql",
    title: "inner Structured Query Language",
    note: "A custom sql language build with C# (iSql)",
    tags: [
      "C#",
      "dev tools",
      "meta programming",
      "interpreter",
      "lexer",
      "parser",
    ],
    category: "Compiler",
    view: '#'
  },
  {
    id: 7,
    image: "/img/portfolio/portfolio-1.webp",
    link: "https://github.com/ibrahimtajudeen/sms",
    title: "School Management System",
    note: "A site that manage school full operations",
    tags: ["C#", "iSql", "SQL Server", "jQuery", "⏸ 90%"],
    category: "Fullstack",
    view: '#'
  },
  {
    id: 8,
    image: "/img/portfolio/portfolio-1.webp",
    link: "https://github.com/ibrahimtajudeen/policecrimediary",
    title: "Police Crime Diary",
    note: "A police crime diary report",
    tags: ["C#", "🕸 forms", "Bootstrap", "SQL Server", "✔"],
    category: "Fullstack",
    view: '#'
  },
];

export default function Portfolio() {
  return (
    <section>
      <PageHeader title="Portfolio" content="Portfolio content" />
      <div className="mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="col-span-1 md:col-span-3">
          <div className="bg-gray-500/10 p-5 rounded-2xl flex-1 space-y-5">
            <Link
              href={"#"}
              className="border-s-5 border-white px-4 py-2 font-bold block bg-white/10 text-white rounded-md"
            >
              All Projects
            </Link>
            {[
              "Web Dev.",
              "Mobile Dev.",
              "Desktop Dev.",
              "Compiler",
              "API",
              "Auth",
              "CMS",
            ].map((v) => (
              <Link
                href={"#"}
                key={v}
                className="border-s-5 border-white px-4 py-2 font-bold block bg-white/10 text-white rounded-md"
              >
                {v}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-9">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 w-full gap-5">
            {projects.map((v) => (
              <ProjectCard
                key={v.id}
                title={v.title}
                imgSrc={v.image}
                description={v.note}
                tags={v.tags}
                category={v.category}
                progLink={v.link}
                view={v.view}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
