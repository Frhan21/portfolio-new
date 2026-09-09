'use client';

import Link from 'next/link';
import { AlertCircle, ArrowRight, Plus } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardData } from '../data/data';
import StatCard from './stat-card';

const quickActions = [
  { label: 'New project', href: '/dashboard/projects/create' },
  { label: 'New certificate', href: '/dashboard/certificates/create' },
  { label: 'New experience', href: '/dashboard/experiences/create' },
  { label: 'Edit portfolio profile', href: '/dashboard/settings/profile' },
];

export default function DashboardStat() {
  const { statCards, isLoading, error } = useDashboardData();

  return (
    <div className="space-y-6">
      {error && !isLoading && (
        <div
          className="flex items-start gap-3 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-semibold">
              Some overview data could not be loaded
            </p>
            <p className="mt-0.5 text-destructive/80">
              {error.message || 'Refresh the page to try again.'}
            </p>
          </div>
        </div>
      )}

      <section
        aria-label="Portfolio content totals"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12"
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`rounded-2xl border border-border/70 bg-[var(--dashboard-surface)] p-5 ${
                  index === 0
                    ? 'sm:col-span-2 lg:col-span-5 lg:row-span-2 lg:min-h-72'
                    : index === 1
                      ? 'lg:col-span-7'
                      : index === 2
                        ? 'lg:col-span-3'
                        : 'lg:col-span-4'
                }`}
              >
                <Skeleton className="size-10 rounded-xl" />
                <div className="mt-10 space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            ))
          : statCards.map((stat, index) => (
              <div
                key={stat.title}
                className={
                  index === 0
                    ? 'sm:col-span-2 lg:col-span-5 lg:row-span-2'
                    : index === 1
                      ? 'lg:col-span-7'
                      : index === 2
                        ? 'lg:col-span-3'
                        : 'lg:col-span-4'
                }
              >
                <StatCard {...stat} featured={index === 0} />
              </div>
            ))}
      </section>

      <section className="grid overflow-hidden rounded-2xl border border-border/80 bg-[var(--dashboard-surface)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-border/70 p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Quick actions
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">
            Keep your portfolio current
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Create content or update the profile details used across the public
            site.
          </p>
        </div>
        <nav
          aria-label="Dashboard quick actions"
          className="grid sm:grid-cols-2"
        >
          {quickActions.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className={`group flex min-h-20 items-center justify-between gap-4 px-5 py-4 text-sm font-medium transition-colors hover:bg-primary/5 sm:px-6 ${index < 2 ? 'border-b border-border/70' : ''} ${index % 2 === 0 ? 'sm:border-r sm:border-border/70' : ''}`}
            >
              <span className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary">
                  <Plus className="size-4" />
                </span>
                {action.label}
              </span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}
