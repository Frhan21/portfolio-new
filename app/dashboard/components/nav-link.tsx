import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { Theme } from '../types/Theme';

interface NavLinkProps {
  icon: ReactNode;
  children: ReactNode;
  active?: boolean;
  theme: Theme;
  href: string;
}

const NavLink: FC<NavLinkProps> = ({ icon, children, active, theme, href }) => (
  <Link
    href={href}
    style={active ? { backgroundColor: theme.primary } : {}}
    className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-300 ${
      active
        ? `text-white`
        : `text-white/80 hover:bg-white/10`
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{children}</span>
  </Link>
);

export default NavLink; 