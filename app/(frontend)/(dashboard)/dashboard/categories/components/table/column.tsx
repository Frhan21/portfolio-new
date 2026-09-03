import { Category } from '@/model/category';
import { ColumnDef } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { deleteCategory } from '@/server/actions/category.actions';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ActionCell = ({ category }: { category: Category }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${category.title}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c', // orange-600
      cancelButtonColor: '#64748b', // slate-500
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(category.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'The category has been deleted.',
          icon: 'success',
          confirmButtonColor: '#ea580c',
        });
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      } catch {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the category.',
          icon: 'error',
          confirmButtonColor: '#ea580c',
        });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-lg p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/categories/${category.id}/update`}>
            <Edit className="mr-2 size-4" /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <Trash className="mr-2 size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className="text-sm font-semibold">{row.original.title}</div>
    ),
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <ActionCell category={row.original} />,
  },
];
