import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Service', href: '/#service' },
  { label: 'Project', href: '/projects' },
  { label: 'Contact', href: '/#contact' },
];

const SOCIAL_LINKS = [
  {
    icon: RiInstagramFill,
    label: 'Instagram',
    href: 'https://instagram.com/farhan_r45',
  },
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/Frhan21' },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/m-farhan-ramadhan-9b083b266/',
  },
];

const CONTACT_INFO = [
  { label: 'Email', value: 'frhn.r3@gmail.com' },
  { label: 'Location', value: 'Padang, Indonesia' },
  { label: 'Availability', value: 'Open for freelance work' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="space-y-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Let&apos;s build something
            </p>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-5xl font-semibold">
                Let&apos;s Get{' '}
                <span className="text-orange-500 italic">Connected</span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg max-w-2xl">
                Turning ideas into delightful digital experiences. Reach out for
                collaborations, freelance projects, or just to say hi.
              </p>
            </div>
            <div className="h-0.5 w-full bg-gradient-to-r from-gray-700/70 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <div>
                <Link href="/dashboard" className="text-2xl font-semibold">
                  M Farhan Ramadhan
                </Link>
                <p className="mt-3 text-gray-500">
                  Frontend engineer crafting performant interfaces with a human
                  touch.
                </p>
              </div>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="p-3 rounded-full bg-orange-500/90 text-white transition hover:bg-orange-500 shadow-lg shadow-orange-500/30"
                  >
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-lg font-semibold">Navigation</span>
              <ul className="grid grid-cols-2 gap-3 text-gray-400 text-sm md:text-base">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <span className="text-lg font-semibold">Get in touch</span>
              <ul className="space-y-3 text-gray-400 text-sm md:text-base">
                {CONTACT_INFO.map((info) => (
                  <li key={info.label}>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">
                      {info.label}
                    </p>
                    <p className="text-white">{info.value}</p>
                  </li>
                ))}
              </ul>
              <button className="mt-3 rounded-full bg-orange-500/90 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                Schedule a call
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} M Farhan Ramadhan. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
