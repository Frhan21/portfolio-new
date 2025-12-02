import { Category } from "./Category";

export interface Certificate {
  id: string;
  title: string;
  image: string; 
  categoryId: string; 
  issuer: string; 
  issuer_date: string; 
  category: Category; 
}