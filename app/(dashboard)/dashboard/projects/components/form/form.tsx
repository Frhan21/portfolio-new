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
import { ImageDropzone } from './image-dropzone';
import { TagsInput } from './tags-input';
import { Category } from '@/model/category';

function FormSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function ProjectForm() {
  const form = useForm<TProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      image: new File([], ''),
      tags: [],
      categoryId: '',
      demo: '',
      github: '',
    },
  });

  const { data: categories, isLoading: categoriesLoading } = useQueryCategory();
  const { mutate, isPending } = useProjectMutation({ isEdit: false });
  const router = useRouter();

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
        toast.success('Project berhasil disimpan!');
        router.push('/dashboard/projects');
      },
      onError: (error: Error) => {
        toast.error(error?.message || 'Gagal menyimpan project.');
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
              <ImageDropzone value={field.value} onChange={field.onChange} />
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
        <Button variant="ghost" size="sm" type="button" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </Button>
        <Button type="submit" disabled={isPending} className="min-w-32">
          {isPending ? 'Menyimpan...' : 'Simpan Project'}
        </Button>
      </div>
    </form>
  );
}
