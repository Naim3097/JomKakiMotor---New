import Image from "next/image";
import Link from "next/link";
import logo from "../../public/brand/jomkaki-rider-logo.png";

/**
 * Official JomKaki Rider lockup (R2 slide 2 — replaces the JomKaki Motor
 * mark). Orange on transparent, works on light and dark surfaces. Sourced
 * from the client's supplied artwork; do not recreate or recolour.
 */
export default function Logo({
  size = "header",
  className = "",
}: {
  /** kept for call-site compatibility; the asset carries its own colours */
  onDark?: boolean;
  size?: "header" | "footer";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="JomKaki Rider — Home"
    >
      <Image
        src={logo}
        alt="JomKaki Rider"
        priority={size === "header"}
        className={size === "header" ? "h-12 w-auto md:h-14" : "h-24 w-auto"}
      />
    </Link>
  );
}
