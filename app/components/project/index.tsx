import { Button } from "@/components/ui/button";
import React from "react";
import CardComponent from "../card";

const Project = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-fit mt-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-2 text-center md:text-left">
          <div className="flex items-center justify-center gap-2">
            <div className="w-7 h-1 bg-orange-500" />
            <span className="text-xl tracking-wider">My Favorite Tools</span>
          </div>
          <span className="text-3xl md:text-4xl text-black font-bold">
            My Latest <span className="text-orange-500">Project</span>
          </span>
        </div>
        <Button className="mt-4 md:mt-0 px-5 py-3 md:py-6 rounded-full bg-orange-500 text-white hover:bg-orange-600 cursor-pointer">
          See all projects
        </Button>
      </div>
      {/* Card Section */}
      <div className="flex flex-wrap justify-center my-16 gap-10 md:gap-20 mx-auto">
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
};

export default Project;
