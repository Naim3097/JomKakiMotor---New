import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import sellHero from "../../../public/brand/sell-hero.png";
import Breadcrumbs from "@/components/Breadcrumbs";
import BranchMap from "@/components/BranchMap";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import { IconBadge, type LineIconName } from "@/components/LineIcon";
import WaButton from "@/components/WaButton";
import { SELL_PAGE_FAQS } from "@/data/faqs";
import { SELL_ENQUIRY, TRADE_IN_ENQUIRY } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Sell Your Motorcycle — Fast, Fair & Secure | Trade-In Welcome",
  description:
    "Sell your motorcycle to JomKaki Rider or trade it in for an upgrade. Free 15–30 minute inspection at branches in Kuching, Bintulu, KL & Selangor. WhatsApp your details for a fast quotation.",
  alternates: { canonical: "/sell" },
};

const STEPS = [
  { title: "WhatsApp Us Your Details", body: "Send your bike's model, year, mileage and photos to start." },
  { title: "Book a Free Inspection", body: "We schedule a quick 15–30 minute physical check at your nearest branch." },
  { title: "Get a Free Quotation", body: "Our mechanics give you a fair, on-the-spot market price." },
  { title: "Get Paid Fast", body: "Accept the offer, we handle the paperwork, and you get your money." },
];

/** Icons per R3 slide 9 */
const REQUIREMENTS: { title: string; body: string; icon: LineIconName }[] = [
  {
    title: "Fully Settled Loans Only",
    body: "JomKaki Rider does not assist with paying off outstanding hire purchase loans. Your motorcycle must be fully paid off with the bank or credit provider, and you must hold the clear title (geran) before selling or trading it in.",
    icon: "fileCheck",
  },
  {
    title: "100% Original Condition",
    body: "The motorcycle must remain in its original factory condition. We do not accept bikes with aftermarket modifications such as modified exhausts, custom engine blocks, or non-standard bodywork.",
    icon: "shieldCheck",
  },
  {
    title: "Good Engine Condition",
    body: "The engine must be well-maintained, running smoothly, and free of major mechanical issues or leaks.",
    icon: "gauge",
  },
];

export default function SellPage() {
  return (
    <>
      <Section pad="tight">
        <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Sell / Trade-In", href: "/sell" }]} />
        {/* Hero — text left, client-supplied bike artwork right, vertically
            level with the write-up on desktop; on mobile the artwork sits
            below the CTAs with clear space before the steps divider. */}
        <div className="grid gap-x-12 lg:grid-cols-[1fr_440px] lg:items-center">
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
          <Image
            src={sellHero}
            alt="Two motorcycles ready for valuation at JomKaki"
            priority
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 90vw"
            className="mx-auto mb-14 mt-12 w-full max-w-md lg:mx-0 lg:my-10 lg:max-w-none"
          />
        </div>

        <div className="grid gap-x-10 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
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
            <div key={r.title} className="grid gap-3 py-6 md:grid-cols-[280px_1fr] md:gap-10">
              <div className="flex items-center gap-3">
                <IconBadge name={r.icon} size="sm" />
                <h3 className="text-[15px] font-semibold text-ink">{r.title}</h3>
              </div>
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
        {/* R2 slide 23 (equal heights) + R3 slide 9 (every branch on the map) */}
        <div className="mt-10">
          <BranchMap />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <SectionHeading title="Selling & Trade-In Questions" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={SELL_PAGE_FAQS} />
        </div>
      </Section>

      {/* CTA — compact orange banner per R3 slide 10 */}
      <CtaBanner
        title="Ready to Get Started?"
        body="Send us your bike's details and get your quotation moving today."
      >
        <WaButton href={SELL_ENQUIRY} variant="ink" className="w-full sm:w-auto">
          WhatsApp your details now
        </WaButton>
      </CtaBanner>
    </>
  );
}
