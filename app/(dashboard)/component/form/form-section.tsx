import React from 'react';

interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({
  icon,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/80 bg-[var(--dashboard-surface,var(--card))] shadow-[0_16px_45px_-40px_rgba(31,41,55,0.65)]">
      <div className="flex items-start gap-3 border-b border-border/60 px-4 py-4 sm:px-6 sm:py-5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description && (
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}
