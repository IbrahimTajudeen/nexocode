import Image from "next/image";

import Sidebar from '@/components/side-bar'
import Hero from '@/components/hero'
import About from '@/components/about'
import Stats from '@/components/stats'
import Skills from '@/components/skills'
import Resume from '@/components/resume'
import Portfolio from '@/components/portfolio'

export default function Home() {
  return (
    <main className="flex min-h-full max-w-screen">
      <div className="hidden xl:block max-h-full relative px-5 top-0 w-1/4 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <Sidebar />
      </div>
      <section className="flex-1 w-screen">
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Resume />
        <Portfolio />
      </section>
    </main>
  );
}
