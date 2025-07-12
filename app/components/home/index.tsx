"use client";

import { useTypeWriter } from "@/app/hooks/use-typing";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

const Home = () => {
  const { typeWriterText, cursorVisible } = useTypeWriter();
  const navbarRef = useRef<HTMLDivElement>(null);

  // Utility function for smooth scrolling with offset
  const smoothScrollTo = (targetId: string, offset = 0) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
  const handleScroll = (href: string) => {
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const navbarHeight = navbarRef.current?.offsetHeight || 0;

      // Delay sedikit untuk memastikan layout stabil (khusus mobile collapse)
      setTimeout(() => {
        smoothScrollTo(targetId, -navbarHeight - 8);
      }, 50);
    }
  };
  return (
    <div
      className="w-full h-screen px-6 md:px-16 py-8 mx-auto flex flex-col justify-center items-center gap-6 max-w-7xl"
      id="home"
    >
      <header className="space-y-6 text-center relative">
        <h1 className="text-[16px] md:text-[20px] relative inline-block">
          <span className="border-[2.5px] border-black px-6 md:px-12 py-2 font-bold text-black inline-block">
            Hello There, I'm M Farhan Ramadhan
          </span>
          {/* Decorative Boxes */}
          <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -top-2 -right-2" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -bottom-2 -right-2" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -top-2 -left-2" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -bottom-2 -left-2" />
        </h1>

        <h2 className="text-[32px] md:text-[48px] font-extrabold leading-tight h-16 md:h-fit">
          I'am{" "}
          <span className="text-black dark:text-white whitespace-pre-line">
            {typeWriterText}
          </span>{" "}
          {cursorVisible && <span className="animate-blink">|</span>}
        </h2>

        <p className="tracking-wide text-[14px] md:text-[16px] text-gray-700 px-2 md:px-0">
          I create amazing websites and applications that are future-ready,
          leveraging the latest technologies with a focus on innovation, sleek
          design, and impressive digital experiences.
        </p>
      </header>

      <nav className="flex flex-col sm:flex-row mt-6 gap-4 items-center justify-center">
        <Button
          className="bg-[#FE7743] rounded-full px-4 sm:w-60 h-14 hover:bg-[#EFEEEA] border-2 border-orange-500 hover:text-slate-700 text-[#EFEEEA]"
          aria-label="View my portfolio"
        >
          <a
            href="#project"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("#project");
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-2">
                <span className="px-4 py-2 rounded-full  text-sm font-bold">
                  View my portfolio
                </span>
                <span className="bg-[#EFEEEA] p-2 rounded-full hover:scale-95 transition-transform duration-200 ">
                  <ArrowRight size={24} className="text-slate-700" />
                </span>
              </div>
            </div>
          </a>
        </Button>
        <Button
          className="w-40 h-14 rounded-full bg-[#EFEEEA] border-2 border-black text-black hover:text-white"
          aria-label="Hire me"
        >
          <a
            href="mailto:frhn.r3@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hire me</a>
        </Button>
      </nav>
    </div>
  );
};

export default Home;
