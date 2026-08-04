import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Privacy notice for the JomKaki Motor website.",
  alternates: { canonical: "/privacy-notice" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeading kicker="Legal" title="Privacy Notice" />
      <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-muted">
        <p>
          [Placeholder — final PDPA-compliant Privacy Notice to be supplied or
          approved by K Trading Sdn. Bhd.&apos;s legal advisor before launch.]
        </p>
        <p>
          Personal data submitted through the contact form or WhatsApp is used solely
          to respond to your enquiry and process your purchase, financing or
          trade-in request, in line with Malaysia&apos;s Personal Data Protection Act
          2010.
        </p>
      </div>
    </Section>
  );
}
