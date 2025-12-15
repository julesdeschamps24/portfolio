interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({
  label,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
        {label}
      </p>
      <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>
      {description && (
        <p className="text-base text-zinc-300">{description}</p>
      )}
    </header>
  );
}

