"use client";

import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#service", label: "Service" },
  { href: "#portfolio", label: "Project" },
  { href: "#contact", label: "Contact me", isButton: true },
];

// Utility function for smooth scrolling
// Utility function for smooth scrolling with offset
const smoothScrollTo = (targetId: string, offset = 0) => {
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    console.warn(`Element with id '${targetId}' not found.`);
    return;
  }

  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset + offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleScroll = (href: string) => {
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const navbarHeight = navbarRef.current?.offsetHeight || 0;

      // Delay sedikit untuk memastikan layout stabil (khusus mobile collapse)
      setTimeout(() => {
        smoothScrollTo(targetId, -navbarHeight - 8);
      }, 50);

      setIsMenuOpen(false);
    }
  };

  const renderLink = (
    href: string,
    label: string,
    isButton?: boolean,
    additionalClasses = ""
  ) => (
    <a
      href={href}
      className={`${
        isButton
          ? "px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 w-fit"
          : "text-white hover:text-orange-500"
      } ${additionalClasses}`}
      onClick={(e) => {
        e.preventDefault();
        handleScroll(href);
      }}
    >
      {label}
    </a>
  );

  return (
    <div ref={navbarRef} className="sticky top-0 z-50 w-full px-4 py-3">
      <nav className="w-full max-w-5xl mx-auto px-4 py-3 bg-black dark:bg-gray-800 rounded-full shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <span className="font-medium text-white px-4">M Farhan Ramadhan</span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ href, label, isButton }) =>
              renderLink(href, label, isButton)
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
              {navLinks.map(({ href, label, isButton }) =>
                renderLink(href, label, isButton)
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
