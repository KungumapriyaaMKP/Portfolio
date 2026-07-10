export default function Watermark({
  text,
  position = "bottom",
}: {
  text: string;
  position?: "bottom" | "center";
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 whitespace-nowrap font-display font-bold uppercase text-foreground/[0.04] ${
        position === "bottom"
          ? "bottom-0 translate-y-1/12"
          : "top-1/2 -translate-y-1/2"
      }`}
      style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
    >
      {text}
    </span>
  );
}
