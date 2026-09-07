/**
 * Compact brand-orange closing banner. R3 slides 10, 14, 17 and 18 ask for
 * the tall dark CTA blocks to match the homepage banner: shorter, orange,
 * copy left, actions right.
 */
export default function CtaBanner({
  title,
  body,
  children,
}: {
  title: string;
  body?: React.ReactNode;
  /** Action buttons — use `variant="ink"` / `"outline-ink"` on orange */
  children: React.ReactNode;
}) {
  return (
    <section className="bg-brand">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:py-14">
        <div className="max-w-xl">
          <h2 className="display-3 text-white">{title}</h2>
          {body && (
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">{body}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          {children}
        </div>
      </div>
    </section>
  );
}
