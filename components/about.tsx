import Image from "next/image";
import { Mail, Phone, MapPin, Download, MessageCircleMore } from "lucide-react";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      className="bg-[#b38c8c] text-white h-fit"
      id="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* Card */}
        <motion.div
          className="bg-[#202020] h-fit rounded-3xl p-8 shadow-xl border-white/20 border"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src="/img/profile/image-2.png"
                alt="Ibrahim Tajudeen"
                width={120}
                height={120}
                className="rounded-full object-cover object-top h-40 w-40 mb-4 border-4 border-white "
              />
            </motion.div>

            <motion.h3
              className="text-xl font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ibrahim Tajudeen
            </motion.h3>

            <motion.p
              className="text-gray-400 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Creative Software Developer
            </motion.p>

            <motion.div
              className="w-full space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ContactItem link="mailto:donslice6@gmail.com" content="donslice6@gmail.com"><Mail size={18} /></ContactItem>
              <ContactItem link="https://wa.me/2348132166576" content="+2348132166576"><Phone size={18} /></ContactItem>
              <ContactItem link="#" content="Works Remotely"><MapPin size={18} /></ContactItem>
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className=""
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <motion.span
            className="inline-block mb-4 px-4 shadow-lg py-1 rounded-full bg-white text-black text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get to Know Me
          </motion.span>

          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Crafting tomorrow with every line of code.
          </motion.h2>

          <motion.p
            className="text-gray-400 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A software developer and tech innovator. I build scalable, secure, and creative digital solutions — from web apps and backend systems to custom tools like{" "}
            <Link href="#" className="text-blue-900"> KalmScript</Link> and{" "}
            <Link href="#" className="text-blue-900">ISql</Link>. I turn ideas into impactful, high-performance software.
          </motion.p>

          <motion.p
            className="text-gray-400 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <b>My goal is simple:</b> To build powerful solutions, learn continuously, and create technology that truly matters
          </motion.p>

          <motion.div
            className="grid grid-cols-3 gap-6 my-10 shadow-lg border border-black/10 p-6 rounded-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Stat number="150+" label="Projects" />
            <Stat number={`${new Date().getFullYear() - 2018}+`} label="Years Exp." />
            <Stat number="98%" label="Satisfaction" />
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6 my-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <AboutInfo head="Full-Stack Developer" info="Specialization" />
            <AboutInfo head="Senior Professional" info="Experience Level" />
            <AboutInfo head="Backend Systems" info="Passion" />
            <AboutInfo head="Web3, Quantum Computing" info="Future Interest" />
          </motion.div>

          <motion.div
            className="container mx-auto grid lg:grid-cols-2 gap-2 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 w-fit rounded-lg flex cursor-pointer bg-white text-black transition-all hover:translate-y-[-5px] hover:text-green-500 hover:bg-green-500/20 hover:shadow-md hover:shadow-green-500"
            >
              <Download size={22} className="me-2 my-auto" />
              <span className="inline-block w-full">Download Resume</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 w-fit flex rounded-lg cursor-pointer border border-white/30 transition-all hover:translate-y-[-5px]"
            >
              <MessageCircleMore size={22} className="me-2 my-auto" />
              <span className="inline-block w-full">{`Let's `} Talk</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
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

function ContactItem({ children, link, content }: { children: React.ReactNode; link: string; content: string }) {
  return (
    <Link
      href={link}
      className="flex items-center gap-3 bg-[#181818] p-3 rounded-xl border border-white/20 hover:shadow-white/10 hover:shadow-lg hover:bg-white hover:text-black transition-all cursor-pointer"
    >
      {children} {content}
    </Link>
  );
}

function AboutInfo({ head, info }: { head: string; info: string }) {
  return (
    <div>
      <p className="text-gray-400 text-sm">{info}</p>
      <ul className="ms-2">
        {head.split(", ").map((v) => (
          <li className="mb-1" key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
}