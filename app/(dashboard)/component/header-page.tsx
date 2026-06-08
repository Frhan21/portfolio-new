import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface HeaderPageProps {
  title: string;
  description?: string;
  url: string;
}

export default function HeaderPage({
  title,
  description,
  url,
}: HeaderPageProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Button
        size="sm"
        className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
        asChild
      >
        <Link href={url}>
          <Plus className="h-4 w-4" />
          Tambah {title}
        </Link>
      </Button>
    </div>
  );
}
