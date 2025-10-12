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

export interface Category {
  id: string;
  title: string;
}

export interface Certificate {
  id: string;
  title: string;
}
