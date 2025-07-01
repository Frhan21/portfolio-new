import { FC, ReactNode } from 'react';
import { Theme } from '../types/Theme';

interface NavLinkProps {
  icon: ReactNode;
  children: ReactNode;
  active?: boolean;
  theme: Theme;
}

const NavLink: FC<NavLinkProps> = ({ icon, children, active, theme }) => (
  <a
    href="#"
    className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-300 ${
      active
        ? `bg-[${theme.primary}] text-white`
        : `text-white/80 hover:bg-white/10`
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{children}</span>
  </a>
);

export default NavLink; 