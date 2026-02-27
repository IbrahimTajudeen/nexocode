'use client'

import Image from "next/image";
import Link from "next/link";
import { LinkIcon, View } from "lucide-react";
import { useState } from "react";

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
        className="object-cover group-hover:scale-110 transition-all group-hover:blur-xs"
        alt=""
        fill={true}
      />
      <div
        className={`h-full mt-100 space-y-2 w-full flex absolute bg-black/50 p-3 group-hover:mt-0 transition-all`}
      >
        <div className="mt-auto space-y-1">
          <div className=" h-fit bg-white/10 text-start space-y-1 py-3 px-5 rounded-lg backdrop-blur-sm w-full border border-white/20">
            <p>{description}</p>
          </div>

          <div className="h-fit bg-white/10 text-start space-y-1 py-3 px-5 rounded-lg backdrop-blur-sm w-full border border-white/20">
            <div className="flex flex-wrap space-x-1">
              {tags.map((v) => (
                <span key={v} className="hover:text-black/30 hover:bg-white/20 rounded-full border border-white/30 w-fit bg-black/20 text-xs py-0.5 px-1.5">
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

export { ProjectCard };
