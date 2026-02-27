import Image from "next/image";
import { Mail, Phone, MapPin, Download, MessageCircleMore } from "lucide-react";
import React from "react";
import Link from 'next/link'

export default function About() {
  return (
    <section className="bg-[#b38c8c] text-white h-fit" id="about">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* Card */}
        <div className="bg-[#202020] h-fit rounded-3xl p-8 shadow-xl border-white/20 border">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/img/profile.jpg"
              alt="Marcus"
              width={120}
              height={120}
              className="rounded-full object-cover object-top h-40 w-40 mb-4 border-4 border-white "
            />
            <h3 className="text-xl font-semibold">Ibrahim Tajudeen</h3>
            <p className="text-gray-400 mb-6">Creative Software Developer</p>

            <div className="w-full space-y-3">
              <ContactItem link="mailto:donslice6@gmail.com" content="donslice6@gmail.com"><Mail size={18} /></ContactItem>
              <ContactItem link="https://wa.me/2348132166576" content="+2348132166576"><Phone size={18} /></ContactItem>
              <ContactItem link="#" content="Works Remotely"><MapPin size={18} /></ContactItem>
              
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="">
          <span className="inline-block mb-4 px-4 shadow-lg py-1 rounded-full bg-white text-black text-sm">
            Get to Know Me
          </span>
          <h2 className="text-4xl font-bold mb-6">
            Crafting tomorrow with every line of code.
          </h2>
          <p className="text-gray-400 mb-6">
            A software developer and tech innovator. I build scalable, secure, and creative digital solutions — from web apps and backend systems to custom tools like 
            <Link href="#" className="text-blue-900"> KalmScript</Link> and <Link href="#" className="text-blue-900">ISql</Link>. I turn ideas into impactful, high-performance software.
          </p>
          <p className="text-gray-400 mb-6">
            <b>My goal is simple:</b> To build powerful solutions, learn continuously, and create technology that truly matters
          </p>

          <div className="grid grid-cols-3 gap-6 my-10 shadow-lg border border-black/10 p-6 rounded-2xl text-center">
            <Stat number="150+" label="Projects" />
            <Stat number={`${(new Date().getFullYear()) - 2018}+`} label="Years Exp." />
            <Stat number="98%" label="Satisfaction" />
          </div>

          <div className="grid grid-cols-2 gap-6 my-10">
            <AboutInfo head="Full-Stack Developer" info="Specialization" />
            <AboutInfo head="Senior Professional" info="Experience Level" />
            <AboutInfo head="Backend Systems" info="Passion" />
            <AboutInfo head="Web3, Quantum Computing" info="Future Interest" />
          </div>

          <div className="container mx-auto grid lg:grid-cols-2 gap-2 items-center">
            <button className="px-6 py-3 w-fit rounded-lg flex cursor-pointer bg-white text-black transition-all hover:translate-y-[-5px] hover:text-green-500 hover:bg-green-500/20 hover:shadow-md hover:shadow-green-500">
              <Download size={22} className="me-2 my-auto" />
              <span className="inline-block w-full" >Download Resume</span>
            </button>
            <button className="px-6 py-3 w-fit flex rounded-lg cursor-pointer border border-white/30  transition-all hover:translate-y-[-5px]">
              <MessageCircleMore size={22} className="me-2 my-auto" />
              <span className="inline-block w-full" >{`Let's `} Talk</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold">{number}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

function ContactItem ({ children, link, content }: { children: React.ReactNode, link: string, content: string }) {
  return (
    <Link href={link} className="flex items-center gap-3 bg-[#181818] p-3 rounded-xl border border-white/20 hover:shadow-white/10 hover:shadow-lg hover:bg-white hover:text-black transition-all cursor-pointer">
      {children} {content}
    </Link>
  );
}

function AboutInfo ({head, info}: { head: string, info: string }) {
  return (
    <div>
      <p className="text-gray-400 text-sm">{info}</p>
      <ul className='ms-2'>
        {head.split(', ').map((v) => (
          <li className="mb-1" key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
}