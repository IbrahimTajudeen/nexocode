import Image from "next/image";
import { Github, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import Social from './social-icon'

export default function Hero() {
  return (
    <section className="hero section relative min-h-screen text-white flex items-center" id="hero">
      <div className="background-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
      </div>

      <div className="container mx-auto px-2 grid lg:grid-cols-2 gap-10 items-center">
        
        {/* Left */}
        <div className="flex flex-col justify-center h-full max-w-screen text-center p-5 xl:p-0 xl:text-left">
          <h1 className="text-6xl font-bold mb-4">Nexo<span className="text-blue-900 ms-1 border-b-2 border-white">Code</span></h1>
          <h2 className="text-2xl font-semibold mb-2">Ibrahim Tajudeen</h2>
          <p className="text-lg text-gray-300 mb-6">{`I'm `}a Web Developer</p>

          <p className="text-gray-400 max-w-full mb-8">
            A passionate software developer, problem solver, and creator of innovative systems that make real-world impact. I build fast, secure, and scalable applications using modern technologies like Node.js, NestJS, Express, MongoDB, C#, Xamarin.Forms, SQL Server etc., and I enjoy transforming ideas into fully functional digital solutions.
          </p>

          <div className="flex gap-4 mb-10 justify-center xl:justify-start">
            <button className="px-6 py-3 rounded-full hover:shadow-white/20 hover:shadow-md cursor-pointer bg-white text-black font-medium">
              View My Work
            </button>
            <button className="px-6 py-3 rounded-full border-2 hover:bg-white hover:text-black font-medium border-white cursor-pointer">
              Get In Touch
            </button>
          </div>

          <div className="flex gap-5 text-gray-400 justify-center xl:justify-start">
            <Social icon={<Github />} />
            <Social icon={<Twitter />} />
            <Social icon={<Facebook />} />
            <Social icon={<Instagram />} />
            <Social icon={<Linkedin />} />
          </div>
        </div>

        {/* Right */}
        <div className="relative h-100 max-w-full flex justify-center items-center">
            <div className="relative h-80 w-80 xl:h-100 xl:w-100 me-25">
              <div className="rounded-3xl h-70 w-70 xl:h-100 xl:w-100 top-5.5 left-10.5 xl:top-5 xl:right-0 bg-black/30 absolute"></div>
              <div className="rounded-3xl h-70 w-70 xl:h-100 xl:w-100 top-2.5 left-5.5 xl:top-0 xl:right-0 absolute overflow-hidden">
                <Image
                  src="/img/profile/profile.jpg"
                  alt="Profile"
                  width={400}
                  height={400}
                  className="object-cover w-full"
                />
              </div>
            </div>
        </div>

      </div>
    </section>
  );
}
