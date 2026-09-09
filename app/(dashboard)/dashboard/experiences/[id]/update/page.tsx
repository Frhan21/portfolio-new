import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import HeaderPage from '../../../../component/header-page';
import { ExperienceForm } from '../../components/form/form';
import { getExperienceById } from '@/server/actions/experience.actions';

export const metadata: Metadata = {
  title: 'Experiences - Update',
  description: 'Update existing experience',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const experience = await getExperienceById(resolvedParams.id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <HeaderPage
        eyebrow="Portfolio content"
        title="Update experience"
        description="Review and update this role's timeline, details, and highlights."
      />
      <ExperienceForm initialData={experience} />
    </div>
  );
}
