import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowLeftCircle, ArrowLeftSquare, ArrowRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPage: number;
  startPage: number;
  endPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  page,
  totalPage,
  startPage,
  endPage,
  totalItems,
  onPageChange,
}: PaginationProps) => {
  if (totalPage <= 1) return null;
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <p className="text-sm text-slate-500">
        Menampilkan {startPage}-{endPage} dari {totalItems} proyek
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="ghost"
          className="rounded-full px-4"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ArrowLeft size={72}/>
        </Button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
              p === page
                ? "border-orange-500 bg-orange-500 text-white shadow"
                : "border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-500"
            }`}
          >
            {p}
          </button>
        ))}

        <Button
          variant="ghost"
          className="rounded-full px-4"
          disabled={page === totalPage}
          onClick={() => onPageChange(page + 1)}
        >
          <ArrowRight size={72}/>
        </Button>
      </div>
    </div>
  );
};

export default  Pagination; 
