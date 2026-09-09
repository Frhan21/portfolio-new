import { Metadata } from 'next';
import HeaderPage from '../../../component/header-page';
import { ProjectForm } from '../components/form/form';

export const metadata: Metadata = {
  title: 'Create Project',
  description: 'Create a new project',
};

const CreateProjectPage = () => {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <HeaderPage
        eyebrow="Portfolio content"
        title="Create project"
        description="Fill in the details below to add a new project to your portfolio."
      />
      <ProjectForm />
    </div>
  );
};

export default CreateProjectPage;
