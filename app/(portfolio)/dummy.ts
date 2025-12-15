import { Category } from '@/model/Category';
import { Certificate } from '@/model/Certificate';
import { Project } from '@/model/Project';

export const categories: Category[] = [
  { id: 'web-dev', title: 'Web Development' },
  { id: 'ui-ux', title: 'UI/UX Design' },
  { id: 'machine-learning', title: 'Machine Learning' },
  { id: 'mobile-app', title: 'Mobile App' },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Personal Portfolio Website',
    tags: ['Next.js', 'Tailwind', 'Responsive'],
    image: 'https://placehold.co/600x400?text=Portfolio',
    demo: 'https://my-portfolio-demo.com',
    github: 'https://github.com/username/portfolio',
    categoryId: 'web-dev',
    category: categories.find((c) => c.id === 'web-dev')!,
  },

  {
    id: 'p2',
    title: 'E-Commerce Dashboard',
    tags: ['React', 'Shadcn UI', 'Chart.js'],
    image: 'https://placehold.co/600x400?text=Dashboard',
    github: 'https://github.com/username/ecommerce-dashboard',
    categoryId: 'web-dev',
    category: categories.find((c) => c.id === 'web-dev')!,
  },

  {
    id: 'p3',
    title: 'Machine Learning Food Classification',
    tags: ['Python', 'TensorFlow', 'CNN'],
    image: 'https://placehold.co/600x400?text=ML+Project',
    demo: 'https://food-classifier-demo.com',
    github: 'https://github.com/username/food-ml-model',
    categoryId: 'machine-learning',
    category: categories.find((c) => c.id === 'machine-learning')!,
  },

  {
    id: 'p4',
    title: 'AI Sign Language Detection App',
    tags: ['TensorFlow.js', 'Computer Vision', 'Hand Tracking'],
    image: 'https://placehold.co/600x400?text=Sign+Language+AI',
    github: 'https://github.com/username/sign-language-ai',
    categoryId: 'machine-learning',
    category: categories.find((c) => c.id === 'machine-learning')!,
  },

  {
    id: 'p5',
    title: 'Mobile Expense Tracker',
    tags: ['Flutter', 'Firebase'],
    image: 'https://placehold.co/600x400?text=Mobile+App',
    demo: 'https://expense-tracker-demo.com',
    categoryId: 'mobile-app',
    category: categories.find((c) => c.id === 'mobile-app')!,
  },

  {
    id: 'p6',
    title: 'SaaS Landing Page Redesign',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    image: 'https://placehold.co/600x400?text=UI+Design',
    categoryId: 'ui-ux',
    category: categories.find((c) => c.id === 'ui-ux')!,
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    role: 'Data and Program Staff',
    company: 'LPPM Unand',
    period: 'Nov 2025 - Present',
    type: 'Contract',
    description:
      'Manage social media accounts and provide research support for academic projects.',
    skills: ['Social Media', 'Research Support'],
  },
  {
    id: 2,
    role: 'Frontend Developer',
    company: 'KodingData.',
    period: 'Sep 2025 - Nov 2025',
    type: 'Internship',
    description:
      'Contributed to development of responsice and user-friendly website using Next.js and Tailwind CSS',
    skills: ['React', 'Next.js', 'Team Leadership'],
  },
];

export const certificates: Certificate[] = [
  {
    id: 'c1',
    title: 'Fullstack Web Development Bootcamp',
    image: 'https://placehold.co/600x400?text=Certificate+1',
    categoryId: 'web-dev',
    issuer: 'Udemy',
    issuer_date: '2024-03-15',
    category: categories.find((c) => c.id === 'web-dev')!,
  },
  {
    id: 'c2',
    title: 'React & Next.js Advanced Course',
    image: 'https://placehold.co/600x400?text=Certificate+2',
    categoryId: 'web-dev',
    issuer: 'Coursera',
    issuer_date: '2024-05-10',
    category: categories.find((c) => c.id === 'web-dev')!,
  },
  {
    id: 'c3',
    title: 'UI/UX Design Fundamentals',
    image: 'https://placehold.co/600x400?text=Certificate+3',
    categoryId: 'ui-ux',
    issuer: 'Google UX',
    issuer_date: '2023-12-01',
    category: categories.find((c) => c.id === 'ui-ux')!,
  },
  {
    id: 'c4',
    title: 'Figma Interface Design',
    image: 'https://placehold.co/600x400?text=Certificate+4',
    categoryId: 'ui-ux',
    issuer: 'Dicoding',
    issuer_date: '2024-04-20',
    category: categories.find((c) => c.id === 'ui-ux')!,
  },
  {
    id: 'c5',
    title: 'Machine Learning Specialization',
    image: 'https://placehold.co/600x400?text=Certificate+5',
    categoryId: 'machine-learning',
    issuer: 'DeepLearning.AI',
    issuer_date: '2024-01-10',
    category: categories.find((c) => c.id === 'machine-learning')!,
  },
  {
    id: 'c6',
    title: 'TensorFlow Developer Certificate',
    image: 'https://placehold.co/600x400?text=Certificate+6',
    categoryId: 'machine-learning',
    issuer: 'Google',
    issuer_date: '2024-02-18',
    category: categories.find((c) => c.id === 'machine-learning')!,
  },
  {
    id: 'c7',
    title: 'Mobile App Development with Flutter',
    image: 'https://placehold.co/600x400?text=Certificate+7',
    categoryId: 'mobile-app',
    issuer: 'Udacity',
    issuer_date: '2023-11-30',
    category: categories.find((c) => c.id === 'mobile-app')!,
  },
  {
    id: 'c8',
    title: 'Android App Development Essentials',
    image: 'https://placehold.co/600x400?text=Certificate+8',
    categoryId: 'mobile-app',
    issuer: 'Dicoding',
    issuer_date: '2024-02-02',
    category: categories.find((c) => c.id === 'mobile-app')!,
  },
  {
    id: 'c9',
    title: 'Backend Development with Node.js',
    image: 'https://placehold.co/600x400?text=Certificate+9',
    categoryId: 'web-dev',
    issuer: 'HackerRank',
    issuer_date: '2024-06-12',
    category: categories.find((c) => c.id === 'web-dev')!,
  },
  {
    id: 'c10',
    title: 'Advanced UX Research Certification',
    image: 'https://placehold.co/600x400?text=Certificate+10',
    categoryId: 'ui-ux',
    issuer: 'Interaction Design Foundation',
    issuer_date: '2023-10-08',
    category: categories.find((c) => c.id === 'ui-ux')!,
  },
];
