import type { Metadata } from "next";
import { Section } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";
import WaButton from "@/components/WaButton";
import { LinkButton } from "@/components/Button";
import { BUYING_FAQS, SELLING_FAQS } from "@/data/faqs";
import { GENERAL_ENQUIRY } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "FAQ — Buying, Selling & Trade-In Questions Answered",
  description:
    "Everything riders ask before buying, selling or trading in a motorcycle at JomKaki Motor: brands, financing, loans, warranty, inspections and required documents.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <Section pad="tight">
        <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "FAQ", href: "/faq" }]} />
        <div className="mt-10 max-w-3xl">
          <p className="eyebrow text-brand">Help centre</p>
          <h1 className="display-1 mt-4 text-ink">Questions, Answered</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Quick answers to what riders ask us most. Can&apos;t find yours?
            WhatsApp us and a real person replies.
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="display-3 text-ink">Buying a Motorcycle</h2>
            <div className="mt-6">
              <FaqAccordion faqs={BUYING_FAQS} />
            </div>
          </div>
          <div>
            <h2 className="display-3 text-ink">Selling or Trading In</h2>
            <div className="mt-6">
              <FaqAccordion faqs={SELLING_FAQS} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="max-w-2xl">
          <h2 className="display-2 text-white">Still Have a Question?</h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <WaButton href={GENERAL_ENQUIRY} size="lg" className="w-full sm:w-auto">
              WhatsApp us
            </WaButton>
            <LinkButton href="/contact" size="lg" variant="outline-light" className="w-full sm:w-auto">
              Contact a branch
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
