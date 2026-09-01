/**
 * Neutral photo placeholder used until the client supplies real product
 * photography. Renders a subtle line icon per product kind on a warm
 * surface — deliberately quiet, never a fake render.
 */
export type ThumbKind = "bike" | "helmet" | "gear" | "rim" | "phone" | "part";

const ICONS: Record<ThumbKind, React.ReactNode> = {
  bike: (
    <g>
      <circle cx="17" cy="44" r="10" />
      <circle cx="47" cy="44" r="10" />
      <path d="M17 44 27 26h12l8 18M27 26l-4-6h-6M39 26l3-6h7l-3 6" strokeLinejoin="round" />
      <path d="M31 44h9" />
    </g>
  ),
  helmet: (
    <g>
      <path d="M12 34a20 20 0 0 1 40 0v8a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4v-8Z" strokeLinejoin="round" />
      <path d="M12 32h26v8a4 4 0 0 0 4 4" />
    </g>
  ),
  gear: (
    <g>
      <path d="M22 14h20l6 10-6 4v18H22V28l-6-4 6-10Z" strokeLinejoin="round" />
      <path d="M26 14a6 6 0 0 0 12 0" />
    </g>
  ),
  rim: (
    <g>
      <circle cx="32" cy="32" r="20" />
      <circle cx="32" cy="32" r="5" />
      <path d="M32 12v15M32 37v15M12 32h15M37 32h15M18 18l10 10M36 36l10 10M46 18 36 28M28 36 18 46" />
    </g>
  ),
  phone: (
    <g>
      <rect x="20" y="10" width="24" height="44" rx="5" />
      <circle cx="28" cy="18" r="2.5" />
    </g>
  ),
  part: (
    <g>
      <circle cx="32" cy="32" r="9" />
      <path d="M32 12v7M32 45v7M12 32h7M45 32h7M18 18l5 5M41 41l5 5M46 18l-5 5M23 41l-5 5" />
    </g>
  ),
};

export default function Thumb({
  kind,
  label,
  className = "",
}: {
  kind: ThumbKind;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-[#ececea] text-[#d3d3cf] ${className}`}
      role="img"
      aria-label={label ? `${label} — photo coming soon` : "Product photo coming soon"}
    >
      <svg
        viewBox="0 0 64 64"
        className="h-1/2 max-h-24 w-1/2 max-w-24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {ICONS[kind]}
      </svg>
    </div>
  );
}
