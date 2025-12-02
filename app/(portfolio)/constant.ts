import { Award, Briefcase, Layers } from "lucide-react";

export const PORTFOLIO_MENU = [
    {id:'project', label:"Project", icons:Layers, url: "/projects"},
    {id: 'certificate', label:"Certificate", icons:Award, url:"/certificate"},
    {id: 'experience', label:"Experience", icons:Briefcase, url:'/experience'}
];