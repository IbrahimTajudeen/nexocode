import { ArrowRight, Award, BriefcaseIcon, Building, Locate, MapIcon, MessageCircle, PhoneCall } from "lucide-react";
import PageHeader from "./page-header";
import Image from 'next/image';
import { ReactNode } from "react";
import Link from 'next/link'
import Bar from './progress-bar'

const contactData = [
  {
    icon: Locate,
    text: 'Works remotely',
    link: ''
  },
  {
    icon: MessageCircle,
    text: 'donslice6@gmail.com',
    link: 'mailto:donslice6@gmail.com'
  },
  {
    icon: PhoneCall,
    text: '+234 81 321 665 76',
    link: 'tel:2348132166576'
  },
]

const techSkill = [
  {
    name: 'Web Development',
    value: 95
  },
  {
    name: 'Mobile Development',
    value: 70
  },
  {
    name: 'Desktop Development',
    value: 80
  },
  {
    name: 'Compiler Design & Dev.',
    value: 65
  },
  {
    name: 'Project Development',
    value: 75
  },
  {
    name: 'UI/UX Design',
    value: 95
  },
  {
    name: 'Database Systems',
    value: 85
  },
  {
    name: 'Security & Authentication',
    value: 90
  },
  {
    name: 'Dev Tools & Versioning',
    value: 70
  },
]

const proExp = [
  {
    id: 1,
    role: "Junior Backend Engineer",
    year: "2025 - Present",
    place: "StoneTech, Unguwan Sarki Kaduna",
    points: [
      "API Integrations and Managing of small projects",
      "Managing Database and Integrations",
      "Building Backend Systems",
    ],
  },
  {
    id: 2,
    role: "Lead Backend Engineer",
    year: "2025 - Present",
    place: "Scorche Pay",
    points: [
      "Backend Implementation and Integrations",
      "Third Party API Integration (like PayStack etc)",
      "Building Payment Getways and Webhooks",
      "Building scalable backend systems",
    ],
  },
  {
    id: 3,
    role: "Freelance Developer",
    year: "2021 - Present",
    place: "Upwork, LinkedIn",
    points: [
      "Work on various web and mobile projects",
      "Upgrading and Re-write exisiting systems",
      "Help Architect Large Systems",
    ],
  },
];

export default function Resume() {
  return (
    <section className="bg-[#181818] text-white">
      <PageHeader 
        title="Resume"
        content="My Resume details"
        />

      <div className="mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <div className="p-10 rounded-2xl shadow-2xl bg-gray-500/10 col-span-1 lg:col-span-4">
          <div className="border-5 mb-2 overflow-hidden rounded-2xl border-white/10">
            <Image
              src="/img/profile.jpg"
              alt="Profile"
              width={400}
              height={400}
              className="object-cover w-full"
            />
          </div>
          <h1 className="font-bold mb-3 text-3xl">Professional Resume</h1>
          <p className="text-gray-400 mb-3">
            Driven software architect with expertise in developing scalable,
            high-performance enterprise solutions. Passionate about leveraging cutting-edge technologies to solve complex business challenges.
          </p>
          <h1 className="font-bold mb-2 mt-5 text-xl">Contact Information</h1>

          {contactData.map((contact) => (
            <ContactItem key={contact.text} link={contact.link} text={contact.text}>
              <contact.icon size={16} />
            </ContactItem>
          ))}

          <h1 className="font-bold mb-2 mt-5 text-xl">Tech Skills</h1>
          {techSkill.map((v) => (
            <Bar key={v.name} label={v.name} value={v.value} variant="Side" />
          ))}



        </div>

        <div className="col-span-1 lg:col-span-8">
          <div className="p-5 bg-gray-500/10 rounded-2xl mb-4">
            <h1 className="mb-2 font-bold text-3xl xl:text-4xl flex gap-2 items-center "><BriefcaseIcon size={32} /> Professional Experience</h1>
            {proExp.map((v) => (
              <ExperienceItem key={v.id} role={v.role} place={v.place} year={v.year} points={v.points} />
            ))}
            <div className="flex justify-end">
              <Link href={'#'} className="group px-4 py-2 bg-black/20 rounded-md gap-2 flex w-fit items-center hover:bg-black/50">View more<ArrowRight className="group-hover:rotate-[-45deg] transition-all" size={16} /> </Link>
            </div>
          </div>

          <div className="p-5 bg-gray-500/10 rounded-2xl mb-4">
            <h1 className="mb-2 font-bold text-3xl xl:text-4xl flex gap-2 items-center "><MapIcon size={32} /> Journey</h1>
            {proExp.map((v) => (
              <ExperienceItem key={v.id} role={v.role} place={v.place} year={v.year} points={v.points} />
            ))}
            <div className="flex justify-end">
              <Link href={'#'} className="group px-4 py-2 bg-black/20 rounded-md gap-2 flex w-fit items-center hover:bg-black/50">View more<ArrowRight className="group-hover:rotate-[-45deg] transition-all" size={16} /> </Link>
            </div>
          </div>
          
          
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ role, place, year, points }: { role: string, place: string, year: string, points: string[] }) {
  return (
    <div className="w-full py-5 px-6 rounded-2xl relative">
    <span className="p-2 h-1 w-1 bg-white rounded-full absolute top-3.5 left-4.5"></span>
      <div className="border-s-2 px-4 relative">
        <h3 className="text-xl font-semibold">{role}</h3>
        <span className="text-sm text-gray-500">{year}</span>
        <p className="text-gray-400 flex gap-2 items-center"><Building size={16} />{' '}{place}</p>
        <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
          {points.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


function ContactItem ({ children, text, link }: { children: ReactNode, text: string, link: string }) {
  return (<Link href={link} className="px-4 py-2 mb-2 border border-white/20 hover:border-white flex items-center space-x-2 text-white/50 bg-gray-500/50 rounded-lg hover:bg-white/20 hover:text-white" >
      {children}
      <span>{text}</span>
    </Link>
);}