import { Experience } from '@/model/experience';
import { ColumnDef } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteExperience } from '@/server/actions/experience.actions';

const monthFormatter = new Intl.DateTimeFormat('id-ID', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const formatMonthYear = (date: Date | string | null) => {
  if (!date) return 'Present';

  const value = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(value.getTime())) return '-';

  return monthFormatter.format(value);
};

const getExperienceDuration = (
  startDate: Date | string,
  endDate: Date | string | null
) => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = endDate
    ? typeof endDate === 'string'
      ? new Date(endDate)
      : endDate
    : new Date();

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '-';

  const months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth() +
    1;
  const safeMonths = Math.max(1, months);
  const years = Math.floor(safeMonths / 12);
  const remainingMonths = safeMonths % 12;

  if (years && remainingMonths) {
    return `${years} tahun ${remainingMonths} bulan`;
  }

  if (years) return `${years} tahun`;
  return `${remainingMonths} bulan`;
};

const ActionCell = ({ experience }: { experience: Experience }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${experience.position}" at "${experience.company}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteExperience(experience.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'The experience has been deleted.',
          icon: 'success',
          confirmButtonColor: '#ea580c',
        });
        queryClient.invalidateQueries({ queryKey: ['experiences'] });
      } catch {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the experience.',
          icon: 'error',
          confirmButtonColor: '#ea580c',
        });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/dashboard/experiences/${experience.id}/update`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
          onClick={handleDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Experience>[] = [
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => (
      <div>
        <div className="text-sm font-medium">{row.original.position}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.company}
        </div>
      </div>
    ),
  },
  {
    id: 'period',
    header: 'Period',
    cell: ({ row }) => (
      <div className="text-sm">
        {formatMonthYear(row.original.startDate)} -{' '}
        {formatMonthYear(row.original.endDate)}
      </div>
    ),
  },
  {
    id: 'duration',
    header: 'Duration',
    cell: ({ row }) => (
      <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
        {getExperienceDuration(row.original.startDate, row.original.endDate)}
      </div>
    ),
  },
  {
    accessorKey: 'badges',
    header: 'Badges',
    cell: ({ row }) => {
      const badges = row.original.badges || [];

      if (!badges.length) {
        return <span className="text-sm text-muted-foreground">-</span>;
      }

      return (
        <div className="flex max-w-80 flex-wrap gap-1.5">
          {badges.slice(0, 4).map((badge) => (
            <span
              key={badge}
              className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
            >
              {badge}
            </span>
          ))}
          {badges.length > 4 && (
            <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
              +{badges.length - 4}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionCell experience={row.original} />,
  },
];
