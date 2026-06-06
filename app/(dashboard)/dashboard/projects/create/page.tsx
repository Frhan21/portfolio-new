import { Metadata } from 'next';
import { ProjectForm } from '../components/form/form';

export const metadata: Metadata = {
  title: 'Create Project',
  description: 'Create a new project',
};

const CreateProjectPage = () => {
  return (
    <div className="flex-1 lg:flex lg:flex-col lg:gap-4">
      <header className="mb-6 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Create Project</h1>
          <p className="text-muted-foreground text-sm">
            Fill the information below to create a new project
          </p>
        </div>
      </header>
      <ProjectForm />
    </div>
  );
};

export default CreateProjectPage;
