import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

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

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-slate-900 dark:bg-card text-white py-12 mt-12 rounded-t-[40px] overflow-hidden shadow-2xl">
      {/* Decorative Blur */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-4xl flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Let&apos;s Get <span className="text-primary italic">Connected</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-lg mb-8">
          Turning ideas into delightful digital experiences. Reach out for
          collaborations, freelance projects, or just to say hi.
        </p>

        <div className="flex gap-4 mb-10">
          {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="p-3.5 rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:border-primary shadow-lg hover:shadow-orange-500/30 group"
            >
              <Icon
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </Link>
          ))}
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between w-full text-sm text-slate-400 gap-4">
          <p>© {year} M. Farhan Ramadhan. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-white transition-colors hover:underline"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
