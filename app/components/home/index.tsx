import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen px-6 md:px-16 py-8 mx-auto flex flex-col justify-center items-center gap-6 max-w-7xl">
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

        <h2 className="text-[32px] md:text-[64px] font-extrabold leading-tight">
          Web Developer
          <span className="text-[#FE7743]"> and </span>
          Social Media Designer
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
          <div className="flex items-center justify-center gap-2">
            <span className="px-4 py-2 rounded-full  text-sm font-bold">
              View my portfolio
            </span>
            <span className="bg-[#EFEEEA] p-2 rounded-full hover:scale-95 transition-transform duration-200 ">
              <ArrowRight size={24} className="text-slate-700" />
            </span>
          </div>
        </Button>

        <Button
          className="w-40 h-14 rounded-full bg-[#EFEEEA] border-2 border-black text-black hover:text-white"
          aria-label="Hire me"
        >
          Hire me...
        </Button>
      </nav>
    </div>
  );
};

export default Home;
