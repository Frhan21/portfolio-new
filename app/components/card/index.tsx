import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DiGithub } from "react-icons/di";
import { EyeIcon, Github } from "lucide-react";
import Link from "next/link";

const CardComponent = () => {
  return (
    <Card className="w-80 border-2 border-orange-500 hover:shadow-xl transition-all duration-300 ease-in-out">
      <CardContent>
        <div className="flex flex-col p-2 gap-2">
          <img
            src={"https://placehold.co/600x400/EEE/31343C"}
            alt="title project"
            className="rounded-[15px] object-cover"
          />
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex gap-3 mt-2 text-xs">
              <span className="px-3 py-1 bg-orange-500 text-white rounded-full">
                Tools 1
              </span>
              <span className="px-3 py-1 bg-orange-500 text-white rounded-full">
                Tools 1
              </span>
              <span className="px-3 py-1 bg-orange-500 text-white rounded-full">
                Tools 1
              </span>
            </div>
            <span className="text-2xl font-bold mt-2">Project Title</span>
            <span className="text-sm text-gray-400 ">
              Project Category
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button className="px-5 py-5 rounded-full bg-white border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-black transition-all duration-300 ease-in-out hover:shadow-2xl">
                <Github size={64} className="text-current" />
            </Button>
            <Button className="px-5 py-5 rounded-full bg-white border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-black transition-all duration-300 ease-in-out hover:shadow-2xl">
                <EyeIcon size={64} className="text-current"/>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
