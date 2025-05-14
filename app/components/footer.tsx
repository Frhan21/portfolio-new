import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-24">
        <div className="flex flex-col items-start gap-6">
          {/* Header Section */}
          <span className="text-white text-3xl md:text-[52px] font-bold text-center md:text-left">
            Let's Get <span className="text-orange-500 italic">Connect</span>
          </span>
          <div className="w-full h-1 bg-gray-700/50" />

          {/* Content Section */}
          <div className="flex flex-col md:flex-row gap-12 items-start w-full">
            {/* About Section */}
            <div className="flex flex-col gap-4 mt-6 md:mt-10">
              <div className="flex flex-col">
                <span className="font-bold text-xl md:text-3xl">
                  M Farhan Ramadhan
                </span>
                <span className="text-gray-600 tracking-widest mt-2 text-sm md:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </div>
              <div className="flex mt-4 gap-4">
                <Link
                  href={"/"}
                  className="p-2 rounded-full bg-orange-500 text-white text-xl md:text-2xl"
                >
                  <RiInstagramFill size={24} md-size={32} />
                </Link>
                <Link
                  href={"/"}
                  className="p-2 rounded-full bg-orange-500 text-white text-xl md:text-2xl"
                >
                  <FaGithub size={24} md-size={32} />
                </Link>
                <Link
                  href={"/"}
                  className="p-2 rounded-full bg-orange-500 text-white text-xl md:text-2xl"
                >
                  <FaLinkedin size={24} md-size={32} />
                </Link>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="flex flex-col gap-4 mt-6 md:mt-10 md:ml-10">
              <span className="text-lg md:text-xl font-bold">Navigation</span>
              <ul className="flex flex-col gap-2 text-sm md:text-base tracking-wide">
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                <li>
                  <Link href={"/"}>About</Link>
                </li>
                <li>
                  <Link href={"/"}>Service</Link>
                </li>
                <li>
                  <Link href={"/"}>Project</Link>
                </li>
                <li>
                  <Link href={"/"}>Contact us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
