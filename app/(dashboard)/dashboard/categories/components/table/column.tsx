import { Category } from '@/model/category';
import { ColumnDef } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { deleteCategory } from '@/server/actions/category.actions';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';

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
      } catch (error) {
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
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/dashboard/categories/${category.id}/update`}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Link>
      </Button>
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className="text-sm font-medium">{row.original.title}</div>
    ),
  },
  {
    header: 'Actions',
    cell: ({ row }) => <ActionCell category={row.original} />,
  },
];
