import React from 'react';

interface FormSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export function FormSection({ icon, title, children }: FormSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
