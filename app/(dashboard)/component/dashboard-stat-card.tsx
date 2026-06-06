'use client';

import { useDashboardData } from '../data/data';
import { Skeleton } from '@/components/ui/skeleton';
import StatCard from '../component/stat-card';

export default function DashboardStat() {
  const { statCards, isLoading } = useDashboardData();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5"
            >
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))
        : statCards.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
            />
          ))}
    </div>
  );
}
