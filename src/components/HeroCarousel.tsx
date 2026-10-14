"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
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

  const arrow =
    "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/45 text-white backdrop-blur-sm transition-colors hover:bg-ink/70 focus-visible:bg-ink/70 sm:flex";

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
            {/* Portrait artwork on phones, the wide crop from md up. Both are
                full-bleed; the wide one crops vertically on narrow desktops,
                which is safe because the composition is organised
                horizontally — clear on the left, subject on the right. */}
            <div className="relative min-h-[600px] md:hidden">
              <Image
                src={s.mobile}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="relative hidden min-h-[460px] md:block md:min-h-[560px] lg:min-h-[640px]">
              <Image
                src={s.desktop}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Copy sits over the artwork's clear left-hand area */}
            <div className="absolute inset-0 flex items-center">
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

      <button
        type="button"
        onClick={() => go(active - 1)}
        aria-label="Previous slide"
        className={`${arrow} left-3 lg:left-5`}
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4l-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(active + 1)}
        aria-label="Next slide"
        className={`${arrow} right-3 lg:right-5`}
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4l6 6-6 6" />
        </svg>
      </button>

      <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-7 bg-brand" : "w-2 bg-ink/30 hover:bg-ink/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
