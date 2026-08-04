import { WhatsAppIcon } from "./icons";
import { type ButtonSize } from "./Button";

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-3.5 text-base",
};

const VARIANTS = {
  brand: "bg-brand text-white hover:bg-brand-deep",
  /** For placement on brand-orange surfaces */
  ink: "bg-ink text-white hover:bg-black",
  wa: "bg-wa text-white hover:brightness-105",
  outline: "border border-line bg-transparent text-ink hover:border-ink",
};

/**
 * WhatsApp CTA — JomKaki orange is the primary action colour; the glyph
 * carries the WhatsApp affordance. The floating FAB stays WhatsApp green.
 */
export default function WaButton({
  href,
  children,
  size = "md",
  variant = "brand",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-lg font-semibold tracking-[-0.01em] transition-colors ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      <WhatsAppIcon className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"} />
      {children}
    </a>
  );
}
