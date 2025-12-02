import { Category } from "./Category";

export interface Project {
  id: string;
  title: string;
  tags: string[];
  image: string;
  demo?: string;
  github?: string;
  categoryId: string;
  category: Category;
}