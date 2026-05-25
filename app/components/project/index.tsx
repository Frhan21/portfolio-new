import { getCategories } from '@/server/services/category-services';
import { getProject } from '@/server/services/project-services';
import ProjectList from './project-list';

const Project = async () => {
  // Fetch all projects and categories
  const projects = await getProject();
  const categories = await getCategories();

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
        <ProjectList projects={projects} categories={categories} />
      </div>
    </div>
  );
};

export default Project;
