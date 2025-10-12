export interface Project {
    id: number; 
    title: string; 
    github?: string; 
    demo?: string;
    image?: string; 
    categoryId: string; 
    tags: string[];
}