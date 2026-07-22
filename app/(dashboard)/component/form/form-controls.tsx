import * as React from 'react';

import { cn } from '@/lib/utils';

export const dashboardControlClassName =
  'h-11 rounded-xl bg-background shadow-none';

export function DashboardTextarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'flex min-h-32 w-full rounded-xl border border-input bg-background px-3 py-3 text-sm shadow-none outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        className
      )}
      {...props}
    />
  );
}

interface FormActionBarProps {
  secondaryActions?: React.ReactNode;
  primaryAction: React.ReactNode;
}

export function FormActionBar({
  secondaryActions,
  primaryAction,
}: FormActionBarProps) {
  return (
    <div className="sticky bottom-3 z-[5] flex flex-col-reverse gap-3 rounded-2xl border border-border/80 bg-[var(--dashboard-surface,var(--card))] p-3 shadow-[0_16px_45px_-28px_rgba(31,41,55,0.55)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center [&>*]:w-full sm:[&>*]:w-auto">
        {secondaryActions}
      </div>
      <div className="[&>*]:h-10 [&>*]:w-full [&>*]:rounded-xl sm:[&>*]:w-auto sm:[&>*]:min-w-36">
        {primaryAction}
      </div>
    </div>
  );
}
