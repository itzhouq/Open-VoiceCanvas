export function PageH1({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-4">
      <h1 className="text-lg font-bold md:text-xl">{title}</h1>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}
