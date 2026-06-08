import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
    <div className="flex-1 lg:flex lg:flex-col lg:gap-4">
      <header className="mb-6 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Update Experience</h1>
          <p className="text-muted-foreground text-sm">
            Update the information below to modify the experience
          </p>
        </div>
      </header>
      <ExperienceForm initialData={experience} />
    </div>
  );
}
