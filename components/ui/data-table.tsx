'use client';

import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AlertCircle, Inbox, Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage?: string;
  isLoading?: boolean;
  error?: Error | null;
  searchPlaceholder?: string;
  toolbar?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = 'No items found.',
  isLoading = false,
  error,
  searchPlaceholder = 'Search loaded rows...',
  toolbar,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  });

  const visibleCount = table.getFilteredRowModel().rows.length;

  return (
    <section className="overflow-hidden rounded-2xl border border-border/80 bg-[var(--dashboard-surface,var(--card))] shadow-[0_16px_45px_-38px_rgba(31,41,55,0.55)]">
      <div className="flex flex-col gap-3 border-b border-border/70 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label="Search loaded table rows"
            className="h-10 rounded-xl bg-background pl-9 pr-9 shadow-none"
          />
          {globalFilter && (
            <button
              type="button"
              onClick={() => setGlobalFilter('')}
              className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
        {toolbar && (
          <div className="flex flex-wrap items-center gap-2">{toolbar}</div>
        )}
        <p
          className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground"
          aria-live="polite"
        >
          {isLoading
            ? 'Loading items'
            : `${visibleCount} ${visibleCount === 1 ? 'item' : 'items'}`}
        </p>
      </div>

      <div
        className="max-w-full overflow-x-auto"
        tabIndex={0}
        aria-label="Scrollable data table"
      >
        <Table className="min-w-[720px]">
          <TableHeader className="bg-muted/45">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 px-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-transparent">
                  {columns.map((_, columnIndex) => (
                    <TableCell key={columnIndex} className="h-[72px] px-4">
                      <Skeleton
                        className={
                          columnIndex === 0
                            ? 'h-10 w-16 rounded-lg'
                            : 'h-4 w-24 rounded-md'
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : error ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-64 px-6 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                      <AlertCircle className="size-5" />
                    </span>
                    <p className="mt-4 font-semibold">
                      Unable to load this list
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {error.message ||
                        'The request failed. Refresh the page to try again.'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="group h-[72px] border-border/60 hover:bg-primary/[0.035]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-64 px-6 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                      <Inbox className="size-5" />
                    </span>
                    <p className="mt-4 font-semibold">Nothing to show yet</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {emptyMessage}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
