import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";
import WaButton from "@/components/WaButton";
import { SELL_PAGE_FAQS } from "@/data/faqs";
import { BRANCHES } from "@/data/site";
import { SELL_ENQUIRY, TRADE_IN_ENQUIRY } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Sell Your Motorcycle — Fast, Fair & Secure | Trade-In Welcome",
  description:
    "Sell your motorcycle to JomKaki Motor or trade it in for an upgrade. Free 15–30 minute inspection at branches in Kuching, Bintulu, KL & Selangor. WhatsApp your details for a fast quotation.",
  alternates: { canonical: "/sell" },
};

const STEPS = [
  { title: "WhatsApp Us Your Details", body: "Send your bike's model, year, mileage and photos to start." },
  { title: "Book a Free Inspection", body: "We schedule a quick 15–30 minute physical check at your nearest branch." },
  { title: "Get a Free Quotation", body: "Our mechanics give you a fair, on-the-spot market price." },
  { title: "Get Paid Fast", body: "Accept the offer, we handle the paperwork, and you get your money." },
];

const REQUIREMENTS = [
  {
    title: "Fully Settled Loans Only",
    body: "JomKaki Motor does not assist with paying off outstanding hire purchase loans. Your motorcycle must be fully paid off with the bank or credit provider, and you must hold the clear title (geran) before selling or trading it in.",
  },
  {
    title: "100% Original Condition",
    body: "The motorcycle must remain in its original factory condition. We do not accept bikes with aftermarket modifications such as modified exhausts, custom engine blocks, or non-standard bodywork.",
  },
  {
    title: "Good Engine Condition",
    body: "The engine must be well-maintained, running smoothly, and free of major mechanical issues or leaks.",
  },
];

export default function SellPage() {
  return (
    <>
      <Section pad="tight">
        <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Sell / Trade-In", href: "/sell" }]} />
        <div className="mt-10 max-w-3xl">
          <p className="eyebrow text-brand">Sell / Trade-in</p>
          <h1 className="display-1 mt-4 text-ink">
            Sell Your Motorcycle — Fast, Fair, Secure
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            A straightforward, transparent valuation that gets you the best
            market price for your bike. Skip the hassle of unverified buyers and
            sell directly to a trusted dealership — or trade in for an upgrade.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <WaButton href={SELL_ENQUIRY} size="lg" className="w-full sm:w-auto">
              WhatsApp your details now
            </WaButton>
            <WaButton href={TRADE_IN_ENQUIRY} size="lg" variant="outline" className="w-full sm:w-auto">
              Trade-in enquiry
            </WaButton>
          </div>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title}>
              <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-brand/40">
                0{i + 1}
              </span>
              <h2 className="mt-3 text-base font-semibold text-ink">{s.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Requirements */}
      <Section tone="surface">
        <SectionHeading
          kicker="Please read before applying"
          title="Important Requirements"
          lead="To ensure a smooth transaction and guarantee the quality of our pre-owned inventory, all motorcycles must meet the following criteria before we can provide a quotation."
        />
        <div className="mt-10 divide-y divide-line border-y border-line">
          {REQUIREMENTS.map((r) => (
            <div key={r.title} className="grid gap-2 py-6 md:grid-cols-[280px_1fr] md:gap-10">
              <h3 className="text-[15px] font-semibold text-ink">{r.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Inspection centres */}
      <Section>
        <SectionHeading
          kicker="Nationwide branches"
          title="Find Your Nearest Inspection Center"
          lead="Bring your motorcycle to any of our established branches for a fast, professional evaluation."
        />
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <ul className="divide-y divide-line border-y border-line">
            {BRANCHES.map((b) => (
              <li key={b.id} className="py-5">
                <p className="text-[15px] font-semibold text-ink">{b.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{b.address}</p>
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-block text-sm font-semibold text-ink underline-offset-4 hover:underline"
                >
                  View on Google Maps
                </a>
              </li>
            ))}
          </ul>
          <iframe
            title="JomKaki Motor branches map"
            src="https://www.google.com/maps?q=JomKaki+Motor&output=embed"
            className="min-h-96 w-full rounded-lg border border-line"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <SectionHeading title="Selling & Trade-In Questions" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={SELL_PAGE_FAQS} />
        </div>
      </Section>

      {/* CTA */}
      <Section tone="ink">
        <div className="max-w-2xl">
          <h2 className="display-2 text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-white/70">
            Send us your bike&apos;s details and get your quotation moving today.
          </p>
          <div className="mt-8">
            <WaButton href={SELL_ENQUIRY} size="lg" className="w-full sm:w-auto">
              WhatsApp your details now
            </WaButton>
          </div>
        </div>
      </Section>
    </>
  );
}
