import Link from "next/link";

/**
 * Rectangular button system — 8px radius, typography-led, no pills,
 * no gradients, no decorative icons.
 */
const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-3.5 text-base",
};

const VARIANTS = {
  primary: "bg-ink text-white hover:bg-black",
  brand: "bg-brand text-white hover:bg-brand-deep",
  outline: "border border-line bg-transparent text-ink hover:border-ink",
  "outline-light": "border border-white/30 bg-transparent text-white hover:border-white",
  /** Dark outline for placement on brand-orange surfaces */
  "outline-ink": "border border-ink/40 bg-transparent text-ink hover:border-ink",
  wa: "bg-wa text-white hover:brightness-105",
};

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-lg font-semibold tracking-[-0.01em] transition-colors";

export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
}) {
  const cls = `${base} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Quiet text link — underline on hover, no arrows. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-semibold text-ink underline-offset-4 transition-colors hover:underline ${className}`}
    >
      {children}
    </Link>
  );
}
