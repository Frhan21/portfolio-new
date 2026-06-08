import { Metadata } from 'next';
import DashboardStat from '../component/dashboard-stat-card';

export const metadata: Metadata = {
  title: 'Overview',
};

export default function Page() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ringkasan konten portfolio Anda.
        </p>
      </div>

      {/* Stat Cards */}
      <DashboardStat />
    </div>
  );
}
