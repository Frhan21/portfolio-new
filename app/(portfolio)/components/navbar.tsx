'use client';

import { ChevronRight, Menu, X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { PORTFOLIO_MENU } from '../constant';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import { usePathname } from 'next/navigation';

interface ProjectNavProps {
  isScrolled: boolean;
}

interface NavButtonProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  url: Url;
}

const NavButton = ({
  children,
  active,
  onClick,
  icon,
  url,
}: NavButtonProps) => {
  return (
    <Link
      href={url}
      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
        active
          ? 'bg-slate-900 text-white shadow-md scale-105'
          : 'text-slate-500 hover:text-slate-900 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="whitespace-nowrap">{children}</span>
    </Link>
  );
};

const ProjectNav = ({ isScrolled }: ProjectNavProps) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMenuActive = (url: Url) => {
    if (typeof url === 'string') {
      return pathname === url || pathname?.startsWith(`${url}/`);
    }
    return false;
  };
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-accent py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - Click go to HOME */}
        <div>
          <Link
            href={'/'}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
              <ChevronRight size={20} className="stroke-[3]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary transition-colors">
              Back to home
            </span>
          </Link>
        </div>

        {/* Nav button */}
        <div className="hidden md:flex items-center bg-white/50 backdrop-blur-sm p-1.5 rounded-full border border=gray-200/50 shadow-sm">
          {PORTFOLIO_MENU.map((menu, i) => (
            <NavButton
              active={isMenuActive(menu.url)}
              icon={<menu.icons size={16} />}
              url={menu.url}
              key={i}
            >
              {menu.label}
            </NavButton>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors">
            Contact Me
          </button>
          <div className="w-px h-4 bg-gray-300"></div>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User"
            className="w-8 h-8 rounded-full bg-gray-100 border border-white shadow-sm"
          />
        </div>

        <button
          className="md:hidden p-2 text-slate-600 hover:bg-gray-100 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default ProjectNav;
