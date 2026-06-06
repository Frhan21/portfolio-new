import { Metadata } from 'next';
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
    <div className="flex-1 lg:flex lg:flex-col lg:gap-4">
      <header className="mb-6 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Update Project</h1>
          <p className="text-muted-foreground text-sm">
            Update the information below to modify the project
          </p>
        </div>
      </header>
      <ProjectForm initialData={project} />
    </div>
  );
}
