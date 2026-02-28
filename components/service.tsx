import { ArrowRight, ChartLineIcon, DiamondIcon, Globe2Icon, Users2 } from "lucide-react";
import { ServiceCard } from "./cards";
import PageHeader from "./page-header";
import Link from "next/link";

export default function Service() {
  return (
    <section className="py-20" id="service">
        <PageHeader title="Services" content="What I can do for you" />
        <div className="mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="col-span-1 md:col-span-6">
                <h1 className="font-bold text-5xl">Innovative business performance solutions</h1>
            </div>

            <div className="col-span-1 md:col-span-6">
                <p className="mt-4 text-md leading-loose">Integrate forward-thinking strategies, creative approaches, and state-of-the-art technologies to deliver exceptional customer experiences that drive growth and engage target markets.</p>
                <Link href="#contact" className="bg-black/30 mt-5 inline-block text-white hover:bg-white/20 transition-all px-5 py-3 rounded-lg">
                    Get in touch <ArrowRight size={16} className="inline" />
                </Link>
            </div>


            <div className="col-span-1 md:col-span-4">
                <ServiceCard title="Web Development" content="Building responsive and high-performance websites using modern web technologies. Whether you need a simple landing page or a complex web application, I can deliver a solution that meets your needs.">
                    <Globe2Icon size={32} />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.633c1.806 0 3.284-.568 4.517-1.507a9.768 9.768 0 0 0-8.934 0A5.23 5.23 0 0 1 12 6.633zM19.106 7.936c.342.447.682.92.992 1.432
                        M21 12c0 .374-.078.74-.228 1.086a3.729 3.729 0 0 1-1.087 1.612c-.281.25-.593.466-.933.654A3.752 3.752 0 0 1 16.863 15M3 9c0 .374.078.74.228 1.086a3.729 3.729 0 0 0 1.087 1.612c.281.25.593.466.933.654A3.752 3.752 0 0 0 7.137 15m-.143-2h.143m8-.001h-.143m-8 .001a3.752 3.752 0 0 1-2.933-1.641M13.141 9c1.152-.26 2.334-.26 3.486 0M9 .001c-.653-.205-1.333-.316-2-.316s-1.347.111-2 .316C2.672.51 3.352.623 4 .623s1.328-.111 2-.316zm6 .000c-.653-.205-1.333-.316-2-.316s-1.347.111-2 .316C8.672.51 9.352.623 10 .623s1.328-.111 2-.316z" />
                    </svg> */}
                </ServiceCard>
            </div>
            <div className="col-span-1 md:col-span-4">
                <ServiceCard title="UI/UX Design" content="Design intuitive and visually appealing user interfaces for web and mobile applications. My designs focus on creating seamless user experiences that enhance engagement and satisfaction.">
                    <DiamondIcon size={32} />
                </ServiceCard>
            </div>
            <div className="col-span-1 md:col-span-4">
                <ServiceCard title="SEO Optimization" content="Optimize your website to improve its visibility on search engines and attract more organic traffic.">
                    <ChartLineIcon size={32} />
                </ServiceCard>
            </div>
            <div className="col-span-1 md:col-span-4">
                <ServiceCard title="Consultation" content="Provide expert consultation on web development, design, and optimization strategies to help you achieve your business goals.">
                    <Users2 size={32} />
                </ServiceCard>
            </div>
            <div className="col-span-1 md:col-span-4">
                <ServiceCard title="Maintenance & Support" content="Provide ongoing maintenance and support for your website to ensure it remains up-to-date and secure.">
                    <Users2 size={32} />
                </ServiceCard>
            </div>
            <div className="col-span-1 md:col-span-4">
                <ServiceCard title="Performance Optimization" content="Optimize your website for faster loading times and better user experience.">
                    <ChartLineIcon size={32} />
                </ServiceCard>
            </div>
        </div>
    </section>
  )
}
