import Image from "next/image";
import Thumb, { type ThumbKind } from "./Thumb";

/**
 * Product photo with the placeholder as fallback. Served through next/image
 * so the 1920px client originals in public/products/ reach the browser as
 * resized WebP. The shots are cut-outs on white, so the frame is white and
 * the image is contained — a 4:3 bike fills a 4:3 box; a square rim in a
 * 4:3 box letterboxes invisibly instead of being cropped.
 */
export default function ProductImage({
  src,
  alt,
  kind,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: {
  src?: string;
  alt: string;
  kind: ThumbKind;
  /** Aspect/rounding/transition classes for the frame */
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) return <Thumb kind={kind} label={alt} className={className} />;
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}
