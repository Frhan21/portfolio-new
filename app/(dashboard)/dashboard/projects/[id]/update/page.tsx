import { Metadata } from 'next';
import HeaderPage from '../../../../component/header-page';
import { ProjectForm } from '../../components/form/form';
import { getProjectById } from '@/server/actions/project.actions';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Projects - Update',
  description: 'Update existing project',
};

// Next.js 15 App Router standard
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <HeaderPage
        eyebrow="Portfolio content"
        title="Update project"
        description="Review and update the project information shown in your portfolio."
      />
      <ProjectForm initialData={project} />
    </div>
  );
}
