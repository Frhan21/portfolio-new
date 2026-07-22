'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CalendarDays,
  FileText,
  Tag,
  Trash,
} from 'lucide-react';

import { Experience } from '@/model/experience';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { FormSection } from '@/app/(dashboard)/component/form/form-section';
import {
  DashboardTextarea,
  dashboardControlClassName,
  FormActionBar,
} from '@/app/(dashboard)/component/form/form-controls';
import { TagsInput } from '@/app/(dashboard)/dashboard/projects/components/form/tags-input';
import { deleteExperience } from '@/server/actions/experience.actions';
import { useExperienceMutation } from '../../hooks/use-experience-mutation';
import { experienceSchema, TExperienceSchema } from './schema';

const toMonthInputValue = (date?: Date | string | null) => {
  if (!date) return '';

  const value = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(value.getTime())) return '';

  const month = String(value.getMonth() + 1).padStart(2, '0');
  return `${value.getFullYear()}-${month}`;
};

export function ExperienceForm({
  initialData,
}: {
  initialData?: Experience | null;
}) {
  const isEdit = !!initialData;
  const form = useForm<TExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: initialData?.company || '',
      position: initialData?.position || '',
      startDate: toMonthInputValue(initialData?.startDate),
      endDate: toMonthInputValue(initialData?.endDate),
      isCurrent: !initialData?.endDate,
      description: initialData?.description || '',
      badges: initialData?.badges || [],
    },
  });

  const isCurrent = useWatch({
    control: form.control,
    name: 'isCurrent',
  });
  const { mutate, isPending } = useExperienceMutation({
    isEdit,
    experienceId: initialData?.id,
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSubmit = (data: TExperienceSchema) => {
    const formData = new FormData();
    formData.append('company', data.company);
    formData.append('position', data.position);
    formData.append('startDate', data.startDate);
    formData.append('isCurrent', String(data.isCurrent));
    formData.append('description', data.description);

    if (!data.isCurrent && data.endDate) {
      formData.append('endDate', data.endDate);
    }

    if (data.badges.length > 0) {
      formData.append('badges', data.badges.join(','));
    }

    mutate(formData, {
      onSuccess: () => {
        toast.success(
          `Experience berhasil ${isEdit ? 'diperbarui' : 'disimpan'}!`
        );
        router.push('/dashboard/experiences');
      },
      onError: (error: Error) => {
        toast.error(
          error?.message ||
            `Gagal ${isEdit ? 'memperbarui' : 'menyimpan'} experience.`
        );
      },
    });
  };

  const handleDelete = async () => {
    if (!initialData) return;
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${initialData.position}" at "${initialData.company}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteExperience(initialData.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'The experience has been deleted.',
          icon: 'success',
          confirmButtonColor: '#ea580c',
        });
        queryClient.invalidateQueries({ queryKey: ['experiences'] });
        router.push('/dashboard/experiences');
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormSection
        icon={<Briefcase className="h-3.5 w-3.5" />}
        title="Informasi Pekerjaan"
      >
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="company"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  <Building2 className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  Perusahaan
                </FieldLabel>
                <Input
                  {...field}
                  placeholder="E.g., Acme Studio"
                  className={dashboardControlClassName}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="position"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  <Briefcase className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  Posisi
                </FieldLabel>
                <Input
                  {...field}
                  placeholder="E.g., Frontend Developer"
                  className={dashboardControlClassName}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="startDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>
                  <CalendarDays className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  Mulai
                </FieldLabel>
                <DatePicker
                  date={
                    field.value
                      ? new Date(`${field.value}-01T00:00:00`)
                      : undefined
                  }
                  setDate={(date) => {
                    field.onChange(date ? toMonthInputValue(date) : '');
                  }}
                  formatString="MMMM yyyy"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="space-y-3">
            <Controller
              name="endDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    <CalendarDays className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    Selesai
                  </FieldLabel>
                  <DatePicker
                    date={
                      field.value
                        ? new Date(`${field.value}-01T00:00:00`)
                        : undefined
                    }
                    setDate={(date) => {
                      field.onChange(date ? toMonthInputValue(date) : '');
                    }}
                    formatString="MMMM yyyy"
                    disabled={isCurrent}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="isCurrent"
              control={form.control}
              render={({ field }) => (
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => {
                      field.onChange(event.target.checked);
                      if (event.target.checked) {
                        form.setValue('endDate', '', {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }
                    }}
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                  Masih bekerja / Present
                </label>
              )}
            />
          </div>
        </FieldGroup>
      </FormSection>

      <FormSection icon={<Tag className="h-3.5 w-3.5" />} title="Badges">
        <Controller
          control={form.control}
          name="badges"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Skill atau teknologi</FieldLabel>
              <TagsInput value={field.value} onChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FormSection>

      <FormSection
        icon={<FileText className="h-3.5 w-3.5" />}
        title="Deskripsi"
      >
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Ringkasan pekerjaan</FieldLabel>
              <DashboardTextarea
                {...field}
                rows={5}
                placeholder="Tuliskan tanggung jawab, kontribusi, atau pencapaian utama."
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FormSection>

      <FormActionBar
        secondaryActions={
          <>
            <Button variant="ghost" size="sm" type="button" asChild>
              <Link href="/dashboard/experiences">
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
                ? 'Update Experience'
                : 'Simpan Experience'}
          </Button>
        }
      />
    </form>
  );
}
