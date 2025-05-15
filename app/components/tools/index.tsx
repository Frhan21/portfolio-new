import React from "react";
import { DiLaravel, DiPhotoshop, DiReact } from "react-icons/di";
import { SiCanva, SiFigma, SiNextdotjs, SiTailwindcss } from "react-icons/si";


type Tool = {
  icon: React.ElementType;
  hoverBg: string;
}

const ToolItem = ({ icon: Icon, hoverBg }: Tool) => (
  <div
    className={`w-24 h-32 rounded-xl shadow flex items-center justify-center 
      transition-colors duration-300 bg-gray-200 
      ${hoverBg} group`}
  >
    <Icon size={64} className="transition-colors duration-300 group-hover:text-white" />
  </div>
);

const Tools = () => {
  // Daftar tools, bisa dikembangkan jadi prop di masa depan
  const tools = [
    {icon: DiReact, hoverBg: "hover:bg-blue-400"},
    {icon: DiLaravel, hoverBg: "hover:bg-red-500"},
    {icon: SiNextdotjs, hoverBg: "hover:bg-gray-500"},
    {icon: SiTailwindcss, hoverBg: "hover:bg-blue-600"},
    {icon: DiPhotoshop, hoverBg: "hover:bg-blue-700"},
    {icon: SiCanva, hoverBg: "hover:bg-blue-500"},
    {icon: SiFigma, hoverBg: "hover:bg-red-600"},
  ];

  return (
    <div className="w-full h-fit overflow-hidden mt-12 px-4">
      <div className="flex flex-col items-center justify-center gap-2">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-7 h-1 bg-orange-500" />
          <span className="text-xl tracking-wider">My Favorite Tools</span>
        </div>

        {/* Title */}
        <div className="text-6xl/20 md:text-7xl/20 text-center font-bold text-black max-w-[90%] md:max-w-[720px]">
          Exploring <span className="text-orange-500"> Tools </span> Behind My{" "}
          <span className="text-orange-500"> Works</span>
        </div>

        {/* Icon Grid */}
        <div className="flex flex-wrap justify-center gap-14 my-24 w-full max-w-2xl">
          {tools.map((tool, index) => (
            <ToolItem key={index} {...tool} />
          ))}
        </div>

        {/* Footer Text */}
        <span className="text-black text-xl italic mt-10 text-center px-4">
          "Just a simple tools, but Powerful"
        </span>
      </div>
    </div>
  );
};

export default Tools;
