import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPage: number;
  pageLabel: string;
  basePath: string;
  totalItems: number;
}

const Pagination = ({
  page,
  totalPage,
  pageLabel,
  basePath,
  totalItems,
}: PaginationProps) => {
  if (totalPage <= 1) return null;

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const createPageHref = (targetPage: number) => {
    if (targetPage <= 1) {
      return basePath;
    }

    return `${basePath}?page=${targetPage}`;
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <p className="text-sm text-slate-500">
        Menampilkan {pageLabel} dari {totalItems} item
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          asChild
          variant="ghost"
          className="rounded-full px-4"
          disabled={page === 1}
        >
          <Link href={createPageHref(page - 1)} scroll={false}>
            <ArrowLeft size={72} />
          </Link>
        </Button>

        {pages.map((p) => (
          <Link
            key={p}
            href={createPageHref(p)}
            scroll={false}
            className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
              p === page
                ? 'border-orange-500 bg-orange-500 text-white shadow'
                : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-500'
            }`}
          >
            {p}
          </Link>
        ))}

        <Button
          asChild
          variant="ghost"
          className="rounded-full px-4"
          disabled={page === totalPage}
        >
          <Link href={createPageHref(page + 1)} scroll={false}>
            <ArrowRight size={72} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
