"use client";

import { useState } from "react";
import { Menu, Terminal, X } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

const navLinks = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "service", label: "Service" },
  { to: "portfolio", label: "Project" },
  { to: "contact", label: "Contact me", isButton: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderLink = (
    to: string,
    label: string,
    isButton?: boolean,
    additionalClasses = ""
  ) => (
    <ScrollLink
      to={to}
      smooth={true}
      duration={100}
      offset={-80} // offset biar gak ketutup navbar
      spy={true}
      onClick={() => setIsMenuOpen(false)}
      className={`cursor-pointer ${
        isButton
          ? "px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 w-fit"
          : "text-white hover:text-orange-500"
      } ${additionalClasses}`}
    >
      {label}
    </ScrollLink>
  );

  return (
    <div className="sticky top-0 z-50 w-full px-4 py-3 bg-transparent">
      <nav className="w-full max-w-5xl mx-auto px-4 py-3 bg-black dark:bg-gray-800 rounded-full shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href={"/"} className="flex mx-4 items-center">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <Terminal size={24} />
            </div>
            <span className="font-bold text-white px-4 text-xl">Nerd Dev</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ to, label, isButton }) =>
              renderLink(to, label, isButton)
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4 py-3">
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 mt-3 mx-4 bg-black dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ to, label, isButton }) =>
                renderLink(to, label, isButton)
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
