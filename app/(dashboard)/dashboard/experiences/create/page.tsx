import { Metadata } from 'next';
import { ExperienceForm } from '../components/form/form';

export const metadata: Metadata = {
  title: 'Create Experience',
  description: 'Create a new experience',
};

export default function CreateExperiencePage() {
  return (
    <div className="flex-1 lg:flex lg:flex-col lg:gap-4">
      <header className="mb-6 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Create Experience</h1>
          <p className="text-muted-foreground text-sm">
            Fill the information below to create a new experience
          </p>
        </div>
      </header>
      <ExperienceForm />
    </div>
  );
}
