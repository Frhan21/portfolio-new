import { Metadata } from 'next';
import HeaderPage from '../../../component/header-page';
import { ExperienceForm } from '../components/form/form';

export const metadata: Metadata = {
  title: 'Create Experience',
  description: 'Create a new experience',
};

export default function CreateExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-7">
      <HeaderPage
        eyebrow="Portfolio content"
        title="Create experience"
        description="Add a role, timeline, and highlights to your work history."
      />
      <ExperienceForm />
    </div>
  );
}
