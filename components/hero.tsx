import Image from "next/image";
import { Github, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import Social from "./social-icon";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="hero section relative min-h-screen text-white flex items-center"
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="background-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
      </div>

      <div className="container mx-auto px-2 grid lg:grid-cols-2 gap-10 items-center">
        
        {/* Left */}
        <motion.div
          className="flex flex-col justify-center h-full max-w-screen text-center p-5 xl:p-0 xl:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Nexo<span className="text-blue-900 ms-1 border-b-2 border-white">Code</span>
          </motion.h1>

          <motion.h2
            className="text-2xl font-semibold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Ibrahim Tajudeen
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {`I'm `}a Web Developer
          </motion.p>

          <motion.p
            className="text-gray-400 max-w-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A passionate software developer, problem solver, and creator of innovative systems that make real-world impact. I build fast, secure, and scalable applications using modern technologies like Node.js, NestJS, Express, MongoDB, C#, Xamarin.Forms, SQL Server etc., and I enjoy transforming ideas into fully functional digital solutions.
          </motion.p>

          <motion.div
            className="flex gap-4 mb-10 justify-center xl:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full hover:shadow-white/20 hover:shadow-md cursor-pointer bg-white text-black font-medium"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full border-2 hover:bg-white hover:text-black font-medium border-white cursor-pointer"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          <motion.div
            className="flex gap-5 text-gray-400 justify-center xl:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Social icon={<Github />} />
            <Social icon={<Twitter />} />
            <Social icon={<Facebook />} />
            <Social icon={<Instagram />} />
            <Social icon={<Linkedin />} />
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="relative h-100 max-w-full flex justify-center items-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative h-80 w-80 xl:h-100 xl:w-100 me-25">
            <motion.div
              className="rounded-3xl h-70 w-70 xl:h-100 xl:w-100 top-5.5 left-10.5 xl:top-5 xl:right-0 bg-black/30 absolute"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            ></motion.div>

            <motion.div
              className="rounded-3xl h-70 w-70 xl:h-100 xl:w-100 top-2.5 left-5.5 xl:top-0 xl:right-0 absolute overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Image
                src="/img/profile/profile.jpg"
                alt="Profile"
                width={400}
                height={400}
                className="object-cover w-full"
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}