export function Section({
  children,
  className = "",
  tone = "white",
  pad = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "surface" | "ink" | "tint";
  pad?: "default" | "tight";
  id?: string;
}) {
  const tones = {
    white: "bg-paper",
    surface: "bg-surface",
    ink: "bg-ink text-white",
    tint: "bg-surface", // legacy alias — warm tint removed from the palette
  };
  const pads = {
    default: "py-20 md:py-28",
    tight: "py-12 md:py-16",
  };
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className={`mx-auto max-w-7xl px-5 sm:px-8 ${pads[pad]}`}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  lead,
  onDark = false,
  align = "left",
}: {
  kicker?: string;
  title: string;
  lead?: string;
  onDark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {kicker && <p className="eyebrow text-brand">{kicker}</p>}
      <h2 className={`display-2 mt-3 ${onDark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${onDark ? "text-white/70" : "text-muted"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
