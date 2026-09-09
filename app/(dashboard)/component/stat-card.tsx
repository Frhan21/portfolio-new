import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  href: string;
  featured?: boolean;
}

export default function StatCard({
  title,
  value,
  icon,
  href,
  featured = false,
}: StatCardProps) {
  return (
    <Link
      href={href}
      className={`group flex min-h-40 flex-col justify-between rounded-2xl border p-5 transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        featured
          ? 'border-[#253945] bg-[#17232b] text-[#f7f2ea] shadow-[0_22px_55px_-35px_rgba(23,35,43,0.9)] lg:min-h-72 lg:p-7'
          : 'border-border/80 bg-[var(--dashboard-surface)] shadow-[0_16px_40px_-36px_rgba(31,41,55,0.6)] hover:border-primary/35'
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${featured ? 'bg-white/10 text-primary' : 'bg-primary/10 text-primary'}`}
        >
          {icon}
        </div>
        <ArrowUpRight
          className={`size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${featured ? 'text-white/45' : 'text-muted-foreground'}`}
        />
      </div>
      <div className="mt-8">
        <p
          className={`text-sm ${featured ? 'text-white/55' : 'text-muted-foreground'}`}
        >
          {title}
        </p>
        <p
          className={`mt-1 font-semibold tabular-nums tracking-[-0.05em] ${featured ? 'text-6xl text-white lg:text-7xl' : 'text-4xl text-foreground'}`}
        >
          {value}
        </p>
      </div>
    </Link>
  );
}
