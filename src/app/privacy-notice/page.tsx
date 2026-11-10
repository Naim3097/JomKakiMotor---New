import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import LegalDoc from "@/components/LegalDoc";
import { PRIVACY_NOTICE } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How K Trading Sdn. Bhd. collects, uses and protects your personal data under Malaysia's Personal Data Protection Act 2010.",
  alternates: { canonical: "/privacy-notice" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeading kicker="Legal" title="Privacy Notice" />
      <LegalDoc blocks={PRIVACY_NOTICE} />
    </Section>
  );
}
