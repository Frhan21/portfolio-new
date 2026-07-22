'use client';

import { Category } from '@/model/category';
import { TCategorySchema } from './schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/lib/validation';
import { useCategoryMutation } from '../../hooks/use-category-mutation';
import { FormSection } from '@/app/(dashboard)/component/form/form-section';
import {
  dashboardControlClassName,
  FormActionBar,
} from '@/app/(dashboard)/component/form/form-controls';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Type, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { deleteCategory } from '@/server/actions/category.actions';
import { useQueryClient } from '@tanstack/react-query';

export const CategoryForm = ({
  initialData,
}: {
  initialData?: Category | null;
}) => {
  const isEdit = !!initialData;
  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: initialData?.title || '',
    },
  });

  const { mutate, isPending } = useCategoryMutation({
    isEdit,
    categoryId: initialData?.id,
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSubmit = (data: TCategorySchema) => {
    const formData = new FormData();
    formData.append('title', data.title);

    mutate(formData, {
      onSuccess: () => {
        toast.success(
          `Category berhasil ${isEdit ? 'diperbarui' : 'disimpan'}!`
        );
        router.push('/dashboard/categories');
      },
      onError: (error: Error) => {
        toast.error(
          error?.message ||
            `Gagal ${isEdit ? 'memperbarui' : 'menyimpan'} category.`
        );
      },
    });
  };

  const handleDelete = async () => {
    if (!initialData) return;
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${initialData.title}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(initialData.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'The category has been deleted.',
          icon: 'success',
          confirmButtonColor: '#ea580c',
        });
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        router.push('/dashboard/categories');
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormSection
        icon={<Type className="h-3.5 w-3.5" />}
        title="Informasi Dasar"
      >
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Judul Kategori</FieldLabel>
                <Input
                  {...field}
                  placeholder="Masukkan judul kategori...."
                  className={dashboardControlClassName}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FormSection>

      <FormActionBar
        secondaryActions={
          <>
            <Button variant="ghost" size="sm" type="button" asChild>
              <Link href="/dashboard/categories">
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Link>
            </Button>
            {isEdit && (
              <Button
                variant="destructive"
                size="sm"
                type="button"
                onClick={handleDelete}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
          </>
        }
        primaryAction={
          <Button type="submit" disabled={isPending}>
            {isPending
              ? 'Menyimpan...'
              : isEdit
                ? 'Update Category'
                : 'Simpan Category'}
          </Button>
        }
      />
    </form>
  );
};
