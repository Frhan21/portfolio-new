'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ExternalLink,
  FileText,
  FileUp,
  Save,
  Share2,
  UserRound,
} from 'lucide-react';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updatePortfolioProfile } from '@/server/actions/profile.actions';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { portfolioProfileSchema } from '@/lib/validation';
import { PortfolioProfile } from '@/model/profile';
import { FormSection } from '@/app/(dashboard)/component/form/form-section';
import {
  DashboardTextarea,
  dashboardControlClassName,
  FormActionBar,
} from '@/app/(dashboard)/component/form/form-controls';

type ProfileFormValues = z.input<typeof portfolioProfileSchema>;

interface ProfileFormProps {
  initialProfile: PortfolioProfile;
}

const socialFields = [
  ['githubUrl', 'GitHub URL', 'https://github.com/your-handle'],
  ['linkedinUrl', 'LinkedIn URL', 'https://www.linkedin.com/in/your-handle'],
  ['instagramUrl', 'Instagram URL', 'https://www.instagram.com/your-handle'],
  ['twitterUrl', 'X / Twitter URL', 'https://x.com/your-handle'],
] as const;

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [cvFile, setCvFile] = useState<File>();
  const [cvFileName, setCvFileName] = useState<string>();
  const [cvFileKey, setCvFileKey] = useState(0);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(portfolioProfileSchema),
    defaultValues: {
      displayName: initialProfile.displayName,
      headline: initialProfile.headline,
      bio: initialProfile.bio,
      email: initialProfile.email,
      cvUrl: initialProfile.cvUrl ?? '',
      githubUrl: initialProfile.githubUrl ?? '',
      linkedinUrl: initialProfile.linkedinUrl ?? '',
      instagramUrl: initialProfile.instagramUrl ?? '',
      twitterUrl: initialProfile.twitterUrl ?? '',
    },
  });

  const submit = (values: ProfileFormValues) => {
    startTransition(async () => {
      const result = await updatePortfolioProfile({
        ...values,
        cvFile,
      });
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      form.reset({
        ...values,
        cvUrl: result.data.cvUrl ?? '',
        githubUrl: result.data.githubUrl ?? '',
        linkedinUrl: result.data.linkedinUrl ?? '',
        instagramUrl: result.data.instagramUrl ?? '',
        twitterUrl: result.data.twitterUrl ?? '',
      });
      setCvFile(undefined);
      setCvFileName(undefined);
      setCvFileKey((k) => k + 1);
      toast.success('Pengaturan portfolio disimpan');
    });
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
      <FormSection
        icon={<UserRound className="h-3.5 w-3.5" />}
        title="Profile landing page"
        description="Manage the primary identity and introduction shown on your portfolio."
      >
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="displayName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Display name</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={dashboardControlClassName}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Contact email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  className={dashboardControlClassName}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="headline"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="sm:col-span-2"
              >
                <FieldLabel>Hero headline</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={dashboardControlClassName}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="bio"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="sm:col-span-2"
              >
                <FieldLabel>About bio</FieldLabel>
                <DashboardTextarea
                  {...field}
                  rows={6}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FormSection>

      <FormSection
        icon={<FileText className="h-3.5 w-3.5" />}
        title="CV"
        description="Upload a PDF (max 5MB) to Cloudinary. The landing page hides the CV button when empty."
      >
        <FieldGroup className="grid gap-4">
          <Field>
            <FieldLabel htmlFor="cvFile">Upload PDF file</FieldLabel>
            <label
              htmlFor="cvFile"
              className="flex items-center gap-3 rounded-md border border-dashed border-slate-300 dark:border-slate-700 px-4 py-3 cursor-pointer hover:border-primary transition-colors"
            >
              <FileUp className="size-4 shrink-0 text-slate-500" />
              <span className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {cvFileName ?? 'Choose a PDF file to replace the current CV'}
              </span>
            </label>
            <input
              key={cvFileKey}
              id="cvFile"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setCvFile(file);
                setCvFileName(file?.name);
              }}
            />
          </Field>
          <Controller
            name="cvUrl"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Current CV (read-only)</FieldLabel>
                <Input
                  {...field}
                  disabled
                  className={`${dashboardControlClassName} opacity-70`}
                />
              </Field>
            )}
          />
        </FieldGroup>
      </FormSection>

      <FormSection
        icon={<Share2 className="h-3.5 w-3.5" />}
        title="Social links"
        description="Connect the public profiles displayed throughout your portfolio."
      >
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          {socialFields.map(([name, label, placeholder]) => (
            <Controller
              key={name}
              name={name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{label}</FieldLabel>
                  <Input
                    {...field}
                    placeholder={placeholder}
                    aria-invalid={fieldState.invalid}
                    className={dashboardControlClassName}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
        </FieldGroup>
      </FormSection>

      <FormActionBar
        secondaryActions={
          <Button variant="ghost" size="sm" type="button" asChild>
            <a href="/" target="_blank" rel="noreferrer">
              Preview landing page <ExternalLink className="size-4" />
            </a>
          </Button>
        }
        primaryAction={
          <Button type="submit" disabled={isPending} className="gap-2">
            <Save className="size-4" />
            {isPending ? 'Menyimpan...' : 'Simpan perubahan'}
          </Button>
        }
      />
    </form>
  );
}
