'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Award, FolderOpen, Type, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { TCertificateSchema } from './schema';
import { certficateSchema, certificateUpdateSchema } from '@/lib/validation';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
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
import { useCertificateMutation } from '../../hooks/use-certifiacte-mutation';
import { ImageDropzone } from '@/app/(dashboard)/component/form/image-dropzone';
import { FormSection } from '@/app/(dashboard)/component/form/form-section';
import {
  dashboardControlClassName,
  FormActionBar,
} from '@/app/(dashboard)/component/form/form-controls';
import { Category } from '@/model/category';
import { Certificate } from '@/model/certificate';

export default function CertificateForm({
  initialData,
}: {
  initialData?: Certificate | null;
}) {
  const isEdit = !!initialData;
  const form = useForm<TCertificateSchema>({
    resolver: zodResolver(
      isEdit ? certificateUpdateSchema : certficateSchema
    ) as Resolver<TCertificateSchema>,
    defaultValues: {
      title: initialData?.title || '',
      issuer: initialData?.issuer || '',
      issuer_date: initialData?.issuer_date
        ? new Date(initialData.issuer_date).toISOString().split('T')[0]
        : '',
      categoryId: initialData?.categoryId || '',
      image: new File([], ''),
    },
  });

  const { data: categories, isLoading: categoriesLoading } = useQueryCategory();
  const { mutate, isPending } = useCertificateMutation({
    isEdit,
    certificateId: initialData?.id,
  });
  const router = useRouter();

  const onSubmit = (data: TCertificateSchema) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('issuer', data.issuer);
    formData.append('issuer_date', data.issuer_date);
    formData.append('categoryId', data.categoryId);

    if (data.image && data.image.size > 0) {
      formData.append('image', data.image);
    }

    mutate(formData, {
      onSuccess: () => {
        toast.success(
          `Certificate berhasil ${isEdit ? 'diperbarui' : 'disimpan'}!`
        );
        router.push('/dashboard/certificates');
      },
      onError: (error: Error) => {
        toast.error(
          error?.message ||
            `Gagal ${isEdit ? 'memperbarui' : 'menyimpan'} certificate.`
        );
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                <FieldLabel>Judul Sertifikat</FieldLabel>
                <Input
                  {...field}
                  placeholder="Masukkan judul sertifikat...."
                  className={dashboardControlClassName}
                />
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
                  <SelectTrigger
                    className={`${dashboardControlClassName} w-full`}
                  >
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
        </FieldGroup>
      </FormSection>

      {/* Certificate Detail */}
      <FormSection
        icon={<Award className="h-3.5 w-3.5" />}
        title="Detail Sertifikat"
      >
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          {/* Issuer */}
          <Controller
            name="issuer"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Issuer</FieldLabel>
                <Input
                  {...field}
                  placeholder="Masukkan nama issuer...."
                  className={dashboardControlClassName}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Issuer Date */}
          <Controller
            control={form.control}
            name="issuer_date"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Issuer Date</FieldLabel>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => {
                    field.onChange(
                      date ? date.toISOString().split('T')[0] : ''
                    );
                  }}
                  placeholder="Pilih tanggal issuer...."
                />
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
        title="Gambar Sertifikat"
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

      {/* Action Buttons */}
      <FormActionBar
        secondaryActions={
          <Button variant="ghost" size="sm" type="button" asChild>
            <Link href="/dashboard/certificates">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
        }
        primaryAction={
          <Button type="submit" disabled={isPending}>
            {isPending
              ? 'Menyimpan...'
              : isEdit
                ? 'Update Certificate'
                : 'Simpan Certificate'}
          </Button>
        }
      />
    </form>
  );
}
