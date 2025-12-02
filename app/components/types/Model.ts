export interface Project {
  id: string;
  title: string;
  tags: string[];
  image: string;
  description?: string;
  demo?: string;
  github?: string;
  categoryId: string;
  category: Category;
}

export interface Category {
  id: string;
  title: string;
}

export interface Certificate {
  id: string;
  title: string;
  image: string; 
  categoryId: string; 
  issuer: string; 
  issuer_date: string; 
  category: Category; 
}
