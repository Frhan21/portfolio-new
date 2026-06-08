'use client';

import { useState, useEffect } from 'react';
import { Menu, Terminal, X, Moon, Sun } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { to: 'home', label: 'Home' },
  { to: 'tech-stack', label: 'Stack' },
  { to: 'experience', label: 'Experience' },
  { to: 'projects', label: 'Projects' },
  { to: 'certificates', label: 'Certificates' },
  { to: 'faq', label: 'FAQ' },
  { to: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const renderLink = (to: string, label: string, additionalClasses = '') => (
    <ScrollLink
      to={to}
      smooth={true}
      duration={100}
      offset={-80}
      spy={true}
      activeClass="text-primary font-bold border-b-2 border-primary"
      onClick={() => setIsMenuOpen(false)}
      className={`cursor-pointer text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors py-1 ${additionalClasses}`}
    >
      {label}
    </ScrollLink>
  );

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-4 z-50 w-full px-4"
    >
      <nav className="w-full max-w-6xl mx-auto px-6 py-4 bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-full shadow-lg shadow-slate-200/20 dark:shadow-black/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href={'/'} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Terminal size={22} />
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white text-xl">
              Nerd Dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <div key={to}>{renderLink(to, label)}</div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ScrollLink
              to="contact"
              smooth={true}
              offset={-80}
              className="cursor-pointer px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-full shadow-md shadow-orange-500/20 hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Let&apos;s Talk 🚀
            </ScrollLink>

            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors border border-slate-200 dark:border-slate-700"
                aria-label="Toggle Dark Mode"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>
            )}
            <button
              className="text-slate-900 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden absolute left-0 right-0 top-full mt-2 mx-4 bg-white dark:bg-[#111] p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden"
            >
              <div className="flex flex-col space-y-5 items-center">
                {navLinks.map(({ to, label }) => (
                  <div key={to} className="w-full text-center">
                    {renderLink(to, label)}
                  </div>
                ))}
                <ScrollLink
                  to="contact"
                  smooth={true}
                  offset={-80}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl mt-2"
                >
                  Let&apos;s Talk 🚀
                </ScrollLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}
