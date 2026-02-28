'use client'
import { useState } from 'react'

import Sidebar from '@/components/side-bar'
import Hero from '@/components/hero'
import About from '@/components/about'
import Stats from '@/components/stats'
import Skills from '@/components/skills'
import Resume from '@/components/resume'
import Portfolio from '@/components/portfolio'
import Contact from '@/components/contact'
import { Menu } from 'lucide-react'
import Service from '@/components/service'

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <main className="grid grid-cols-12 min-h-full max-w-full">
      {/* Mobile Toggle */}
      <button
        className="fixed top-6 right-6 lg:hidden z-100 p-2 bg-black/20 rounded-lg border border-white/10"
        onClick={() => setOpen(!open)}
      >
        <Menu className="w-6 h-6 text-white" />
      </button>
      <div className={`col-span-12 lg:col-span-3 lg:bg-transparent lg:backdrop-blur-none lg:block max-h-full lg:w-full fixed lg:relative px-5 top-0 z-50 transition-all duration-100 ${
          open ? "backdrop-blur-xs w-screen h-screen block" : "hidden xl:block"
        }
        `} style={{ scrollbarWidth: 'none' }}>
        <Sidebar open={open} />
      </div>
      <section className="col-span-12 lg:col-span-9 flex-1 max-w-screen">
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Resume />
        <Portfolio />
        <Service />

        <Contact />
      </section>
    </main>
  );
}
