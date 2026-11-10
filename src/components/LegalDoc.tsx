import type { LegalBlock } from "@/data/legal";

/**
 * Renders the client's legal copy. Both notices come from the same supplied
 * document and share a shape — numbered headings, paragraphs and bullet
 * lists — so they share a renderer rather than two hand-built pages that
 * would drift apart the next time the wording is revised.
 */
export default function LegalDoc({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="mt-8 max-w-3xl space-y-8">
      {blocks.map((b, i) => (
        <section key={b.heading ?? i}>
          {b.heading && (
            <h2 className="text-[15px] font-semibold uppercase tracking-[0.06em] text-ink">
              {b.heading}
            </h2>
          )}
          <div className={`space-y-4 text-sm leading-relaxed text-muted ${b.heading ? "mt-3" : ""}`}>
            {b.paras?.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {b.bullets && (
              <ul className="list-disc space-y-2 pl-5 marker:text-brand">
                {b.bullets.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            )}
            {b.after?.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
