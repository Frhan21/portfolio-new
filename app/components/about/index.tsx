import React from "react";
import Link from "next/link";
import { Computer, Figma } from "lucide-react";
import { SiAdobephotoshop } from "react-icons/si";

// Card Service Reusable Component
const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="w-full max-w-sm h-fit">
    <div className="bg-white rounded-[32px] border-2 border-orange-500 shadow-lg px-6 py-10 flex flex-col items-start gap-4">
      <span className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center">
        {icon}
      </span>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* === About Section === */}
      <section className="bg-black w-full min-h-[520px] overflow-hidden px-4 sm:px-6" id="about">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12 py-12 md:py-20">
          {/* Text Content */}
          <div className="flex flex-col items-start md:items-start text-left gap-4 max-w-xl">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-1 bg-orange-500" />
              <span className="text-white text-xl">About</span>
            </div>
            <h2 className="text-white text-4xl md:text-[64px] font-bold leading-tight">
              Who is <span className="text-orange-500">Farhan</span>?
            </h2>
            <p className="text-white text-base md:text-xl tracking-wide">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
              voluptatibus at nulla atque repudiandae dolor cupiditate. Eaque
              deserunt tempore sed!
            </p>
            <Link
              href="/"
              className="mt-4 px-6 py-3 bg-slate-700 hover:bg-orange-500 text-white rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-sm md:text-base"
            >
              Download my CV
            </Link>
          </div>

          {/* Orange Circle */}
          <div className="w-64 h-64 md:w-96 md:h-96 bg-orange-500 rounded-full" />
        </div>
      </section>

      {/* === Service Section === */}
      <section className="w-full px-6 py-12" id="service">
        <div className="flex flex-col items-start md:items-start gap-2 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 bg-orange-500" />
            <h3 className="text-black text-2xl md:text-[32px] font-bold">
              Services
            </h3>
          </div>
          <h2 className="text-black text-3xl md:text-[48px] font-bold">
            Service that I <span className="text-orange-500">Provide</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 justify-items-center max-w-7xl mx-auto">
          <ServiceCard
            icon={<Computer size={40} color="white" />}
            title="Web Developer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <ServiceCard
            icon={<Figma size={40} color="white" />}
            title="UI/UX Designer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <ServiceCard
            icon={<SiAdobephotoshop size={40} color="white" />}
            title="Graphic Designer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
      </section>
    </div>
  );
};

export default About;
