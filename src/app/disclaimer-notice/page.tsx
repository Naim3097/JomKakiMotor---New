import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import LegalDoc from "@/components/LegalDoc";
import { DISCLAIMER_NOTICE } from "@/data/legal";

export const metadata: Metadata = {
  title: "Disclaimer Notice",
  description:
    "Disclaimer notice for the JomKaki Rider website, issued by K Trading Sdn. Bhd.",
  alternates: { canonical: "/disclaimer-notice" },
  robots: { index: false },
};

export default function DisclaimerPage() {
  return (
    <Section>
      <SectionHeading kicker="Legal" title="Disclaimer Notice" />
      <LegalDoc blocks={DISCLAIMER_NOTICE} />
    </Section>
  );
}
