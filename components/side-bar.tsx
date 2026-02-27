"use client";

import { useState } from "react";
import {
  Home,
  User,
  FileText,
  Images,
  Layers,
  Mail,
  ChevronDown,
  Menu,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
//   Skype,
} from "lucide-react";

import Social from './social-icon'

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [deepDropdown, setDeepDropdown] = useState(false);

  return (
    <header className="hidden md:flex w-fit h-fit fixed top-0 bg-black border-2 border-[#2a2a2a] rounded-3xl my-[15vh] mx-auto p-6 flex-col justify-between">
      {/* Mobile Toggle */}
      <button
        className="absolute top-6 right-6 lg:hidden"
        onClick={() => setOpen(!open)}
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      <div
        className={`flex flex-col items-start transition-all duration-300 ${
          open ? "block" : "hidden xl:block"
        }`}
      >
        {/* Navigation */}
        <nav className="w-full">
          <ul className="space-y-3">
            <NavItem icon={<Home />} label="Home" href="#hero" active />
            <NavItem icon={<User />} label="About" href="#about" />
            <NavItem icon={<FileText />} label="Resume" href="#resume" />
            <NavItem icon={<Images />} label="Portfolio" href="#portfolio" />
            <NavItem icon={<Layers />} label="Services" href="#services" />

            {/* Dropdown */}
            <li>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5"
              >
                <span className="flex items-center gap-3">
                  <Layers className="w-4 h-4" />
                  Dropdown
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition ${
                    dropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdown && (
                <ul className="ml-6 mt-2 space-y-2">
                  <SubItem label="Dropdown 1" />

                  {/* Deep Dropdown */}
                  <li>
                    <button
                      onClick={() => setDeepDropdown(!deepDropdown)}
                      className="flex w-full items-center justify-between text-sm text-gray-400 hover:text-white"
                    >
                      Deep Dropdown
                      <ChevronDown
                        className={`w-4 h-4 transition ${
                          deepDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {deepDropdown && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SubItem
                            key={i}
                            label={`Deep Dropdown ${i}`}
                          />
                        ))}
                      </ul>
                    )}
                  </li>

                  <SubItem label="Dropdown 2" />
                  <SubItem label="Dropdown 3" />
                  <SubItem label="Dropdown 4" />
                </ul>
              )}
            </li>

            <NavItem icon={<Mail />} label="Contact" href="#contact" />
          </ul>
        </nav>

        {/* Social Links */}
        <div className="mt-10 flex gap-3 justify-around">
          <Social icon={<Twitter />} />
          <Social icon={<Facebook />} />
          <Social icon={<Instagram />} />
          <Social icon={<Linkedin />} />
        </div>
      </div>
    </header>
  );
}

/* ---------------- Components ---------------- */

function NavItem({
  icon,
  label,
  href,
  active = false,
}: any) {
  return (
    <li>
      <a
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
          active
            ? "bg-white text-black"
            : "text-gray-300 hover:text-white hover:bg-white/5"
        }`}
      >
        <span className="w-4 me-2">{icon}</span>
        {label}
      </a>
    </li>
  );
}

function SubItem({ label }: { label: string }) {
  return (
    <li>
      <a
        href="#"
        className="block text-sm py-2 text-gray-400 hover:text-white"
      >
        {label}
      </a>
    </li>
  );
}


