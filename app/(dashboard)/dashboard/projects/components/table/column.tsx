import { Project } from '@/model/project';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Swal from 'sweetalert2';
import { deleteProject } from '@/server/actions/project.actions';
import { useQueryClient } from '@tanstack/react-query';

const ActionCell = ({ project }: { project: Project }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${project.title}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c', // orange-600
      cancelButtonColor: '#64748b', // slate-500
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteProject(project.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'The project has been deleted.',
          icon: 'success',
          confirmButtonColor: '#ea580c',
        });
        queryClient.invalidateQueries({ queryKey: ['projects'] });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the project.',
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
          <Link href={`/dashboard/projects/${project.id}/update`}>
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

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const image = row.original.image;
      return image ? (
        <div className="relative h-10 w-16 overflow-hidden rounded-md border bg-muted">
          <Image
            src={image}
            alt="Project Image"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground border">
          No Img
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Project Name',
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <div className="flex items-center gap-3">
          <span className="font-medium text-sm">{title}</span>
        </div>
      );
    },
  },
  {
    id: 'category',
    accessorFn: (row) => row.category?.title,
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer hover:text-slate-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </div>
      );
    },
    cell: ({ row }) => {
      const categoryTitle = row.original.category?.title;
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {categoryTitle || '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'github',
    header: 'Repository',
    cell: ({ row }) => {
      const github = row.original.github;
      return github ? (
        <Link
          href={github}
          target="_blank"
          className="text-sm text-blue-600 hover:underline"
        >
          Github Link
        </Link>
      ) : (
        <span className="text-sm text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'demo',
    header: 'Live Demo',
    cell: ({ row }) => {
      const demo = row.original.demo;
      return demo ? (
        <Link
          href={demo}
          target="_blank"
          className="text-sm text-blue-600 hover:underline"
        >
          Visit Site
        </Link>
      ) : (
        <span className="text-sm text-muted-foreground">-</span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionCell project={row.original} />,
  },
];
