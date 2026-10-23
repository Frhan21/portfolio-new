import type { Metadata } from 'next';
import HeaderPage from '../../component/header-page';
import IngestForm from './components/ingest-form';

export const metadata: Metadata = { title: 'AI Knowledge' };

export default function Page() {
  return (
    <div className="space-y-7">
      <HeaderPage
        eyebrow="AI assistant"
        title="Knowledge"
        description="Add new knowledge from text or one PDF. Exact duplicate content is rejected."
      />
      <IngestForm />
    </div>
  );
}
