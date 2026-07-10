export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
