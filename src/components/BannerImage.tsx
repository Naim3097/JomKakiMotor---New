import { getImageProps } from "next/image";

/**
 * A banner that ships two crops — wide and portrait — but downloads one.
 *
 * `next/image` has no art direction, so rendering both crops and hiding one
 * with `md:hidden` / `hidden md:block` still makes the browser fetch the
 * orientation it will never show: every viewport paid for both. `getImageProps`
 * hands us the optimiser's srcSet (AVIF/WebP included) for each crop so a
 * `<picture>` can pick exactly one, at the same `md` breakpoint the layout uses.
 *
 * The caller positions the crops, since they rarely want the same anchor —
 * e.g. `object-cover object-bottom md:object-center`.
 */
export default function BannerImage({
  desktop,
  mobile,
  alt,
  priority = false,
  className = "object-cover object-center",
}: {
  desktop: string;
  mobile: string;
  /** Empty when the headline already carries the message */
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const common = { alt, sizes: "100vw", fill: true, priority };
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: desktop });
  const {
    props: { srcSet: portrait, ...rest },
  } = getImageProps({ ...common, src: mobile });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wide} />
      <source srcSet={portrait} />
      {/* alt is restated so it is visible to the a11y lint rule, which cannot
          see it arrive through the spread */}
      <img {...rest} alt={alt} className={className} />
    </picture>
  );
}
