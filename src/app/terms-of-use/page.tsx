import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the JomKaki Motor website.",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <Section>
      <SectionHeading kicker="Legal" title="Terms of Use" />
      <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-muted">
        <p>
          [Placeholder — final Terms of Use copy to be supplied or approved by K
          Trading Sdn. Bhd.&apos;s legal advisor before launch.]
        </p>
        <p>
          This website is an online catalogue. Prices, promotions and availability
          shown are indicative and confirmed only through direct communication with
          our sales team via WhatsApp or in-branch. All transactions are concluded
          offline at JomKaki Motor branches.
        </p>
      </div>
    </Section>
  );
}
