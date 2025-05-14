import React from "react";
import Home from "./components/home";
import About from "./components/about";
import Tools from "./components/tools";
import Project from "./components/project";
import Contact from "./components/contact";
import SkillsBar from "./components/skills-bar";

const Page = () => {
  return (
    <>
      <Home />
      <About/> 
      <SkillsBar/> 
      <Tools/> 
      <Project/> 
      <SkillsBar/> 
      <Contact/> 
    </>
  );
};

export default Page;
