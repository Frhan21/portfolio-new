'use client';

import { useQueryCategory } from '@/app/hooks/category-hooks/use-query-category';
import { useQueryProject } from './hooks/use-query-project';
import ProjectList from './project-list';
import ProjectSkeleton from './project-skeleton';

const Project = () => {
  const project = useQueryProject();
  const category = useQueryCategory();

  if (project.isLoading || category.isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center w-full h-fit mt-20 md:px-12 px-4 mx-auto py-24"
        id="projects"
      >
        <ProjectSkeleton cardCount={4} />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-fit mt-20 md:px-12 px-4 mx-auto py-24"
      id="projects"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-primary font-bold tracking-widest text-sm uppercase">
            PROJECTS
          </span>
        </div>
        <span className="text-3xl md:text-5xl text-slate-900 dark:text-white font-extrabold max-w-2xl">
          Some of the projects
          <br />I have built 😅
        </span>
      </div>

      {/* Client Component for Filtering */}
      <div className="w-full max-w-7xl mx-auto">
        <ProjectList
          projects={project.data?.data.items ?? []}
          categories={category.data?.data.items ?? []}
        />
      </div>
    </div>
  );
};

export default Project;
