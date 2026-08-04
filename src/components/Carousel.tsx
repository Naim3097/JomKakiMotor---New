"use client";

import { useRef } from "react";

/** Horizontal scroller with functional prev/next controls. */
export default function Carousel({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const btn =
    "rounded-lg border border-line bg-paper p-2.5 text-ink transition-colors hover:border-ink disabled:opacity-40";

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {children}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous" className={btn}>
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Next" className={btn}>
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
