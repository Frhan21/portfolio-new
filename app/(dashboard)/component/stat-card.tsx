interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

export default function StatCard({
  title,
  value,
  icon,
  iconBgColor,
}: StatCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBgColor} transition-transform group-hover:scale-105`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}
