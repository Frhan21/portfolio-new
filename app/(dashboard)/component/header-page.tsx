import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface HeaderPageProps {
  title: string;
  description?: string;
  url?: string;
  actionLabel?: string;
  eyebrow?: string;
}

export default function HeaderPage({
  title,
  description,
  url,
  actionLabel,
  eyebrow,
}: HeaderPageProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-[65ch] text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {url && (
        <Button
          className="h-10 w-full shrink-0 rounded-xl px-4 shadow-[0_10px_24px_-14px_rgba(254,119,67,0.9)] sm:w-auto"
          asChild
        >
          <Link href={url}>
            <Plus className="h-4 w-4" />
            {actionLabel ?? `Tambah ${title}`}
          </Link>
        </Button>
      )}
    </header>
  );
}
