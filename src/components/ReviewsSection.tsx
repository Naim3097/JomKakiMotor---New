import { StarIcon } from "./icons";
import { REVIEWS, REVIEWS_PROFILE_URL } from "@/data/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-brand" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} className="h-3.5 w-3.5" filled={n <= rating} />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const avg =
    Math.round((REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length) * 10) / 10;
  const hasSamples = REVIEWS.some((r) => r.isSample);

  return (
    <div>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="eyebrow text-brand">Google Reviews</p>
          <h2 className="display-2 mt-3 text-ink">Riders Trust JomKaki</h2>
          <div className="mt-5 flex items-baseline gap-4">
            <span className="font-display text-5xl font-semibold tracking-[-0.03em] text-ink">
              {avg.toFixed(1)}
            </span>
            <div>
              <Stars rating={Math.round(avg)} />
              <p className="mt-1 text-xs text-muted">From our Google Business Profile</p>
            </div>
          </div>
        </div>
        <a
          href={REVIEWS_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
        >
          See all reviews on Google
        </a>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x gap-10 overflow-x-auto border-t border-line pt-10">
        {REVIEWS.map((r) => (
          <blockquote key={r.name + r.text.slice(0, 12)} className="w-80 shrink-0 snap-start">
            <Stars rating={r.rating} />
            <p className="mt-4 text-[17px] leading-relaxed text-ink">{r.text}</p>
            <footer className="mt-4 text-xs font-medium text-muted">{r.name}</footer>
          </blockquote>
        ))}
      </div>

      {hasSamples && (
        <p className="mt-6 text-xs text-muted/70">
          Sample reviews shown for layout. To be replaced with live reviews from the
          JomKaki Motor Google Business Profile before launch.
        </p>
      )}
    </div>
  );
}
