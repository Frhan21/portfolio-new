import { Metadata } from 'next';
import DashboardStat from '../component/dashboard-stat-card';
import HeaderPage from '../component/header-page';

export const metadata: Metadata = {
  title: 'Overview',
};

export default function Page() {
  return (
    <div className="space-y-7">
      <HeaderPage
        eyebrow="Workspace overview"
        title="Your portfolio at a glance"
        description="Review the content currently managed through your portfolio CMS and jump directly into your next update."
      />
      <DashboardStat />
    </div>
  );
}
