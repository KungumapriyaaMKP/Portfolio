export default function Marquee({
  items,
  duration = 28,
}: {
  items: string[];
  duration?: number;
}) {
  return (
    <div className="relative overflow-hidden border-y border-border py-4">
      <div
        className="flex w-max gap-10 whitespace-nowrap"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            {item}
            <span className="ml-10 text-accent">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
