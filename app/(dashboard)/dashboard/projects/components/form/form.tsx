'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Globe, Github, Tag, FolderOpen, Type, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { TProjectSchema, projectSchema } from './schema';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useQueryCategory } from '@/app/hooks/category-hooks/use-query-category';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProjectMutation } from '@/app/components/project/hooks/use-project-mutation';
import { ImageDropzone } from '@/app/(dashboard)/component/form/image-dropzone';
import { FormSection } from '@/app/(dashboard)/component/form/form-section';
import { TagsInput } from './tags-input';
import { Category } from '@/model/category';
import { Project } from '@/model/project';
import Swal from 'sweetalert2';
import { deleteProject } from '@/server/actions/project.actions';
import { useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';

export function ProjectForm({ initialData }: { initialData?: Project | null }) {
  const isEdit = !!initialData;
  const form = useForm<TProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || '',
      image: new File([], ''),
      tags: initialData?.tags || [],
      categoryId: initialData?.categoryId || '',
      demo: initialData?.demo || '',
      github: initialData?.github || '',
    },
  });

  const { data: categories, isLoading: categoriesLoading } = useQueryCategory();
  const { mutate, isPending } = useProjectMutation({
    isEdit,
    projectId: initialData?.id,
  });
  const router = useRouter();
  const queryClient = useQueryClient();

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
        await deleteProject(initialData.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'The project has been deleted.',
          icon: 'success',
          confirmButtonColor: '#ea580c',
        });
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        router.push('/dashboard/projects');
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

  const onSubmit = (data: TProjectSchema) => {
    const formData = new FormData();
    formData.append('title', data.title);

    if (data.image && data.image.size > 0) {
      formData.append('image', data.image);
    }

    formData.append('categoryId', data.categoryId);

    if (data.tags.length > 0) {
      formData.append('tags', data.tags.join(','));
    }

    if (data.demo) formData.append('demo', data.demo);
    if (data.github) formData.append('github', data.github);

    mutate(formData, {
      onSuccess: () => {
        toast.success(
          `Project berhasil ${isEdit ? 'diperbarui' : 'disimpan'}!`
        );
        router.push('/dashboard/projects');
      },
      onError: (error: Error) => {
        toast.error(
          error?.message ||
            `Gagal ${isEdit ? 'memperbarui' : 'menyimpan'} project.`
        );
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Basic Info */}
      <FormSection
        icon={<Type className="h-3.5 w-3.5" />}
        title="Informasi Dasar"
      >
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          {/* Title */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="sm:col-span-2"
              >
                <FieldLabel>Judul Proyek</FieldLabel>
                <Input {...field} placeholder="E.g., E-commerce Dashboard" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Category */}
          <Controller
            control={form.control}
            name="categoryId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  <FolderOpen className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  Kategori
                </FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={categoriesLoading}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        categoriesLoading ? 'Loading...' : 'Pilih Kategori'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories?.items?.map((cat: Category) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Tags */}
          <Controller
            control={form.control}
            name="tags"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  <Tag className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  Tags
                </FieldLabel>
                <TagsInput value={field.value} onChange={field.onChange} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FormSection>

      {/* Image */}
      <FormSection
        icon={<FolderOpen className="h-3.5 w-3.5" />}
        title="Gambar Proyek"
      >
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <ImageDropzone
                value={field.value}
                onChange={field.onChange}
                previewUrl={
                  isEdit && typeof initialData?.image === 'string'
                    ? initialData.image
                    : undefined
                }
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FormSection>

      {/* Links */}
      <FormSection
        icon={<Globe className="h-3.5 w-3.5" />}
        title="Tautan (Opsional)"
      >
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="demo"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  <Globe className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  Live Demo
                </FieldLabel>
                <Input {...field} placeholder="https://my-project.vercel.app" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="github"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  <Github className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  GitHub Repository
                </FieldLabel>
                <Input {...field} placeholder="https://github.com/user/repo" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FormSection>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" type="button" asChild>
            <Link href="/dashboard/projects">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
        </div>
        <Button type="submit" disabled={isPending} className="min-w-32">
          {isPending
            ? 'Menyimpan...'
            : isEdit
              ? 'Update Project'
              : 'Simpan Project'}
        </Button>
      </div>
    </form>
  );
}
