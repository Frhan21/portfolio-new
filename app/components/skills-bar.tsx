import { VscDebugStart } from "react-icons/vsc";
import React from "react";

const SkillsBar = () => {
  const skills = [
    "Software Engineer",
    "Fullstack Developer",
    "Machine Learning",
    "IoT Developer",
    "Social Media Designer",
  ];

  return (
    <div className="relative h-24 overflow-hidden">
      {/* Orange angled background */}
      <div className="absolute bg-orange-500 w-full h-40 -top-8 -rotate-4 z-0" />

      {/* Black background bar */}
      <div className="relative z-10 bg-black h-full flex items-center overflow-hidden">
        {/* Marquee inner container */}
        <div className="flex animate-marquee space-x-10 min-w-max">
          {[...skills, ...skills].map((skill, i) => (
            <div key={i} className="flex items-center">
              <VscDebugStart className="text-white text-lg" />
              <span className="ml-2 text-white text-2xl">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsBar;
