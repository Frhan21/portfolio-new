import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { getPublicPortfolioProfile } from '@/server/services/profile.server';

export default async function Footer() {
  const profile = await getPublicPortfolioProfile();
  const socialLinks = [
    { icon: RiInstagramFill, label: 'Instagram', href: profile.instagramUrl },
    { icon: FaGithub, label: 'GitHub', href: profile.githubUrl },
    { icon: FaLinkedin, label: 'LinkedIn', href: profile.linkedinUrl },
  ].filter(
    (link): link is { icon: typeof FaGithub; label: string; href: string } =>
      Boolean(link.href)
  );
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 w-full overflow-hidden rounded-t-[40px] bg-slate-900 py-12 text-white shadow-2xl dark:bg-card">
      <div className="pointer-events-none absolute top-[-20%] left-1/2 z-0 h-[300px] w-[60%] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="container relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center md:px-12">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
          Let&apos;s Get <span className="text-primary italic">Connected</span>
        </h2>
        <p className="mb-8 max-w-lg text-sm text-slate-400 md:text-base">
          Turning ideas into reliable digital experiences. Reach out for
          collaborations or freelance projects.
        </p>
        {socialLinks.length > 0 && (
          <div className="mb-10 flex gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group rounded-full border border-white/10 bg-white/5 p-3.5 text-white shadow-lg transition-all hover:border-primary hover:bg-primary hover:text-slate-950 hover:shadow-orange-500/30"
              >
                <Icon
                  size={20}
                  className="transition-transform group-hover:scale-110"
                />
              </Link>
            ))}
          </div>
        )}
        <div className="mb-8 h-px w-full bg-white/10" />
        <div className="flex w-full flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <p>
            © {year} {profile.displayName}. All rights reserved.
          </p>
          <span className="flex items-center gap-2">
            <Link
              href="#contact"
              className="font-medium transition-colors hover:text-white hover:underline duration-500"
            >
              Contact
            </Link>
            <span className="mx-2 text-slate-500">|</span>
            <Link
              href="/dashboard"
              className="font-medium transition-colors hover:text-white hover:underline duration-500"
            >
              Admin
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
