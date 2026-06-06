import {
  Briefcase,
  FileBadge,
  FolderGit2,
  Home,
  Tag,
  User,
  FileText,
  Link,
} from 'lucide-react';

export const APPLICATION_MENUS = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Projects',
    url: '/dashboard/projects',
    icon: FolderGit2,
  },
  {
    title: 'Certificates',
    url: '/dashboard/certificates',
    icon: FileBadge,
  },
  {
    title: 'Categories',
    url: '/dashboard/categories',
    icon: Tag,
  },
  {
    title: 'Experiences',
    url: '/dashboard/experiences',
    icon: Briefcase,
  },
];

export const APP_SETTINGS_MENUS = [
  {
    title: 'About Me',
    url: '/dashboard/settings/about-me',
    icon: User,
  },
  {
    title: 'CV dan Portolfio',
    url: '/dashboard/settings/cv-dan-portolfio',
    icon: FileText,
  },
  {
    title: 'Social Media',
    url: '/dashboard/settings/social-media',
    icon: Link,
  },
];
