import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Certificate } from '@/model/certificate';
import { deleteCertificate } from '@/server/actions/certificate.actions';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, ImageIcon, MoreHorizontal, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

export const columns: ColumnDef<Certificate>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const image = row.original.image;
      return image ? (
        <div className="relative h-11 w-16 overflow-hidden rounded-lg border border-border/70 bg-muted">
          <Image
            src={image}
            alt={`Preview of ${row.original.title}`}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-11 w-16 items-center justify-center rounded-lg border border-dashed bg-muted/50 text-muted-foreground">
          <ImageIcon className="size-4" aria-label="No certificate image" />
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Certificate Name',
    cell: ({ row }) => {
      const title = row.original.title;
      return <span className="text-sm font-semibold">{title}</span>;
    },
  },
  {
    accessorKey: 'issuer',
    header: 'Issued By',
    cell: ({ row }) => {
      const issuer = row.original.issuer;
      return <span>{issuer || '-'}</span>;
    },
  },
  {
    accessorKey: 'issuer_date',
    header: 'Issued Date',
    cell: ({ row }) => {
      const date = row.original.issuer_date;
      return <span>{date ? new Date(date).toLocaleDateString() : '-'}</span>;
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const categoryTitle = row.original.category?.title;
      return (
        <div className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {categoryTitle || '-'}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <ActionCell certificate={row.original} />,
  },
];

const ActionCell = ({ certificate }: { certificate: Certificate }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${certificate.title}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c', // orange-600
      cancelButtonColor: '#64748b', // slate-500
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteCertificate(certificate.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'The certificate has been deleted.',
          icon: 'success',
          confirmButtonColor: '#ea580c',
        });
        queryClient.invalidateQueries({ queryKey: ['certificates'] });
      } catch {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the certificate.',
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
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/dashboard/certificates/${certificate.id}/update`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
          onClick={handleDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
