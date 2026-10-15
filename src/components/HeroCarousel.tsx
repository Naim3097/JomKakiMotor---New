"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BannerImage from "./BannerImage";
import { LinkButton } from "./Button";
import WaButton from "./WaButton";
import { HERO_SLIDES } from "@/data/heroSlides";

/**
 * Homepage sliding main banner (R4 slides 3–5). Each slide carries its own
 * artwork for wide and portrait frames plus a tone, so type and buttons
 * stay legible over both the dark tunnel shot and the pale handset shot.
 *
 * Advances on its own every 7s, pausing while the pointer or keyboard focus
 * is inside it and whenever the viewer prefers reduced motion.
 */
const INTERVAL = 7000;

function Heading({
  level,
  className,
  children,
}: {
  level: 1 | 2;
  className: string;
  children: React.ReactNode;
}) {
  const Tag = level === 1 ? "h1" : "h2";
  return <Tag className={className}>{children}</Tag>;
}

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;

  const go = useCallback((next: number) => setActive((next + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % count), INTERVAL);
    return () => window.clearInterval(t);
  }, [paused, count]);

  // Keep the live region quiet on first paint, announce only real changes
  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  // The controls sit over whichever slide is on show, so they borrow its tone.
  // The fills are deliberately strong: a faint wash disappears against the
  // branch map, which is brand orange edge to edge.
  const activeDark = HERO_SLIDES[active].tone === "dark";
  const arrow = `flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
    activeDark
      ? "bg-ink/55 text-white hover:bg-ink/80 focus-visible:bg-ink/80"
      : "bg-paper/80 text-ink hover:bg-paper focus-visible:bg-paper"
  }`;

  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-roledescription="carousel"
      aria-label="JomKaki Rider highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {HERO_SLIDES.map((s, i) => {
        const onDark = s.tone === "dark";
        const current = i === active;
        return (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${s.headline}`}
            aria-hidden={!current}
            // Keeps the off-screen slides out of the tab order too
            inert={!current}
            className={`transition-opacity duration-700 ${
              current ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
            }`}
          >
            {/* Portrait artwork on phones, the wide crop from md up, both
                full-bleed. All three portrait crops put their subject — the
                riders, the handsets, the branch map — in the bottom third, so
                the phone frame is tall enough to show that third whole and
                anchors the art to its bottom edge rather than its centre,
                which used to slice the subject in half. */}
            <div className="relative min-h-[720px] md:min-h-[560px] lg:min-h-[640px]">
              <BannerImage
                desktop={s.desktop}
                mobile={s.mobile}
                alt={s.alt}
                priority={i === 0}
                className={`object-cover object-bottom ${s.focus}`}
              />
            </div>

            {/* Scrim. The copy has to stay readable over three unrelated
                banners — a tunnel, pale handsets, a bright orange map — and
                none of them keeps a large enough quiet area on its own: the
                tunnel's struts run straight through the headline on a phone,
                and the wide crops pull their subject into the text column
                between 768 and about 1100px. The wash runs down from the top
                on phones, where the copy sits above the subject, and in from
                the left on wide screens, where it sits beside it. It is
                tone-matched, so it deepens the dark banner and lightens the
                pale ones instead of fighting them. */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 ${
                onDark
                  ? "bg-linear-to-b from-ink/90 via-ink/55 to-transparent md:bg-linear-to-r md:from-ink/90 md:via-ink/45 md:to-transparent"
                  : "bg-linear-to-b from-paper/90 via-paper/60 to-transparent md:bg-linear-to-r md:from-paper/90 md:via-paper/50 md:to-transparent"
              }`}
            />

            {/* Copy — pinned to the top on phones, above the subject band;
                vertically centred beside it from md up. */}
            <div className="absolute inset-0 flex items-start pt-10 md:items-center md:pt-0">
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
                <div className="max-w-[520px] lg:max-w-[560px]">
                  <p
                    className={`text-xs font-semibold uppercase leading-relaxed tracking-[0.08em] ${
                      onDark ? "text-white/75" : "text-ink/65"
                    }`}
                  >
                    {s.tag}
                  </p>
                  {/* Only the first slide is the page heading; the rest are
                      promotional banners, so they must not add more h1s. */}
                  <Heading
                    level={i === 0 ? 1 : 2}
                    className={`mt-3 font-display text-[clamp(1.75rem,3.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.025em] md:mt-4 ${
                      onDark ? "text-white" : "text-ink"
                    }`}
                  >
                    {s.headline}
                  </Heading>
                  <p
                    className={`mt-4 text-sm leading-relaxed md:text-base ${
                      onDark ? "text-white/80" : "text-ink/80"
                    }`}
                  >
                    {s.body}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8">
                    {s.ctas.map((c, ci) =>
                      c.wa ? (
                        <WaButton
                          key={c.label}
                          href={c.href}
                          variant={onDark ? "brand" : "ink"}
                          className="w-full sm:w-auto"
                        >
                          {c.label}
                        </WaButton>
                      ) : (
                        <LinkButton
                          key={c.label}
                          href={c.href}
                          variant={
                            ci === 0 ? (onDark ? "brand" : "primary") : onDark ? "outline-light" : "outline-ink"
                          }
                          className="w-full sm:w-auto"
                        >
                          {c.label}
                        </LinkButton>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls. The arrows used to be pinned to the left and right edges,
          where they landed on top of the body copy at every width below about
          1400px — the copy column starts at the same gutter they sat in. They
          now share the bottom bar with the dots, which never collides, reads
          as one control group, and gives phones a way to advance by hand.
          Both take their colour from the slide on show. */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous slide"
          className={arrow}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              // Brand orange marks the active slide everywhere except the
              // branch map, whose own field is brand orange — ink there
              className={`h-2 rounded-full transition-all ${
                i === active
                  ? `w-7 ${activeDark ? "bg-brand" : "bg-ink"}`
                  : `w-2 ${activeDark ? "bg-white/40 hover:bg-white/70" : "bg-ink/30 hover:bg-ink/55"}`
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next slide"
          className={arrow}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
