'use client'

import Image from "next/image";
import Link from "next/link";
import { LinkIcon, View } from "lucide-react";
import { ReactNode } from "react";

interface ProjectCardProp {
    imgSrc: string;
    description: string;
    tags: string[];
    title: string;
    category: string;
    progLink: string;
    view: string;
}

function ProjectCard({imgSrc, description, tags, title, category, progLink, view }: ProjectCardProp) {
    
  return (
    <div className="group transition-all h-100 rounded-2xl relative overflow-hidden text-center">
      <Image
        src={imgSrc}
        className="object-cover group-hover:scale-110 transition-all duration-500 "
        alt=""
        fill={true}
      />
      <div
        className={`h-full mt-100 space-y-2 w-full flex absolute bg-gradient-to-b from-transparent to-black/80 p-3 group-hover:mt-0 transition-all duration-500 `}
      >
        <div className="mt-auto space-y-1">
          <div className=" h-fit bg-white/10 text-start space-y-1 py-3 px-5 rounded-lg backdrop-blur-sm w-full border border-white/20">
            <p>{description}</p>
          </div>

          <div className="h-fit bg-white/10 text-start space-y-1 py-3 px-5 rounded-lg backdrop-blur-sm w-full border border-white/20">
            <div className="flex flex-wrap space-x-1">
              {tags.map((v) => (
                <span key={v} className="hover:text-black/30 hover:bg-white/20 rounded-md border border-white/30 w-fit bg-black/20 text-xs py-0.5 px-1.5">
                    {v}
                </span>
              ))}
              
            </div>
            <div className="mt-auto">
              <h3 className="text-md">{category}</h3>
              <h1 className="text-amber-900 font-bold text-lg mb-2">
                {title}
              </h1>
              <div className="space-x-2">
                <Link
                  href={view}
                  className="text-white hover:text-amber-900 hover:bg-white hover:scale-110 transition-all inline-block justify-center items-center rounded-full bg-white/10 p-3"
                >
                  <View size={16} />
                </Link>
                <Link
                  href={progLink}
                  className="text-white hover:text-amber-900 hover:bg-white hover:scale-110 transition-all inline-block justify-center items-center rounded-full bg-white/10 p-3"
                >
                  <LinkIcon size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ children, title, content }: { children: ReactNode, title: string, content: string }) {
    
  return (
    <div className="p-10 group transition-all space-y-5 border-2 border-white/20 h-100 relative overflow-hidden text-start">
        <div className="rounded-lg p-4 bg-white/20 w-fit">
          {children}
        </div>
        <h1 className="font-bold text-2xl mt-3">{title}</h1>
        <p className="text-sm mt-2 leading-loose">{content}</p>
        <div className="h-full w-full absolute top-0 left-0 text-end transition-all duration-500 mt-100 group-hover:mt-0">
            <div className="h-full w-full bg-gradient-to-t from-transparent to-white/20 group-hover:from-transparent group-hover:to-white/30 transition-all duration-500 rounded-tr-[50px]">
              <Link href="#" className="text-white/30 hover:text-amber-900 hover:bg-white/50 transition-all inline-block justify-center items-center rounded-full bg-white/10 p-5 m-5">
                  <LinkIcon size={32} />
              </Link>
            </div>
        </div>
    </div>
  );
}

export { ProjectCard, ServiceCard };
