import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";
import WaButton from "@/components/WaButton";
import { LinkButton } from "@/components/Button";
import { ROADTAX_ENQUIRY } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Road Tax & Insurance Renewal for Motorcycles — Instant Quote",
  description:
    "Renew your motorcycle road tax (cukai jalan) and insurance through JomKaki Rider. WhatsApp your bike details for an instant quotation — quick, easy and hassle-free.",
  alternates: { canonical: "/road-tax" },
};

const ROADTAX_FAQS = [
  {
    q: "What do I need to renew my motorcycle road tax?",
    a: [
      "Just three things: your vehicle registration (geran) details, the owner's IC number, and an active insurance policy. Insurance must be renewed before or together with your road tax — we handle both in one go.",
    ],
  },
  {
    q: "How long does the renewal take?",
    a: [
      "Most renewals are completed the same day. WhatsApp us your details, confirm the quotation, and we process your insurance and road tax without you needing to queue anywhere.",
    ],
  },
  {
    q: "How much does motorcycle road tax cost?",
    a: [
      "Road tax is based on engine capacity — bikes 150cc and below pay as little as RM2 per year. Insurance depends on your bike's market value and coverage type (third party or comprehensive). Send us your bike details and we will give you an exact quotation instantly.",
    ],
  },
  {
    q: "Can you renew insurance only?",
    a: [
      "Yes. We can quote and renew your motorcycle insurance on its own, or bundle it with your road tax renewal — whichever you need.",
    ],
  },
];

const STEPS = [
  { title: "WhatsApp Your Details", body: "Send your bike model, plate number and IC details." },
  { title: "Get an Instant Quote", body: "We reply with your insurance and road tax price on the spot." },
  { title: "Confirm and Pay", body: "Approve the quotation and settle payment securely." },
  { title: "Ride On, Covered", body: "We process everything. You're renewed without queuing." },
];

export default function RoadTaxPage() {
  return (
    <>
      <Section pad="tight">
        <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Road Tax", href: "/road-tax" }]} />
        <div className="mt-10 max-w-3xl">
          <p className="eyebrow text-brand">Roadtax &amp; insurance</p>
          <h1 className="display-1 mt-4 text-ink">
            Renew Without the Queue
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            WhatsApp us your bike details and we&apos;ll quote your insurance and
            road tax instantly, process both, and have you covered without
            leaving home. Quick and easy renewal, instant price quotations, a
            genuinely hassle-free process.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <WaButton href={ROADTAX_ENQUIRY} size="lg" className="w-full sm:w-auto">
              WhatsApp for instant quote
            </WaButton>
            <LinkButton
              href="/blog/motorcycle-roadtax-renewal-malaysia-guide"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Read the renewal guide
            </LinkButton>
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

      <Section tone="surface">
        <SectionHeading title="Renewal Questions" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={ROADTAX_FAQS} />
        </div>
      </Section>

      <Section tone="ink">
        <div className="max-w-2xl">
          <h2 className="display-2 text-white">Road Tax Due Soon?</h2>
          <p className="mt-4 text-lg text-white/70">
            Don&apos;t risk riding uncovered. Get your instant quotation now.
          </p>
          <div className="mt-8">
            <WaButton href={ROADTAX_ENQUIRY} size="lg" className="w-full sm:w-auto">
              WhatsApp for instant quote
            </WaButton>
          </div>
        </div>
      </Section>
    </>
  );
}
