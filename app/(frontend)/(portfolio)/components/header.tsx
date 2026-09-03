interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="space-y-4">
      <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
      <p className="text-md text-accent-foreground/50 md:w-2/3">
        {description}
      </p>
    </header>
  );
}
