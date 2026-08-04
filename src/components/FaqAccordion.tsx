import JsonLd from "./JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/data/types";

/** Zero-JS accordion — hairline dividers only, no card chrome. */
export default function FaqAccordion({
  faqs,
  withSchema = true,
}: {
  faqs: Faq[];
  withSchema?: boolean;
}) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="shrink-0 text-brand transition-transform group-open:rotate-45">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M10 4v12M4 10h12" />
              </svg>
            </span>
          </summary>
          <div className="mt-3 max-w-2xl space-y-2.5 text-sm leading-relaxed text-muted">
            {f.a.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      ))}
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
    </div>
  );
}
