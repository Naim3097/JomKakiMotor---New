import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/icons";
import { BRANCHES, EMAIL } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us — 5 Branches in Kuching, Bintulu, KL & Selangor",
  description:
    "Find your nearest JomKaki Motor branch and chat directly with our sales advisors on WhatsApp. Addresses, maps and contact details for Satok, Batu Kawa, Kota Samarahan, Bintulu and Petaling Jaya.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Section pad="tight">
        <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us", href: "/contact" }]} />
        <div className="mt-10 max-w-3xl">
          <p className="eyebrow text-brand">Contact us</p>
          <h1 className="display-1 mt-4 text-ink">Talk to a Real Person</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Five branches, one standard of service. Chat directly with a sales
            advisor at your nearest branch, or drop us a message and we&apos;ll
            come to you.
          </p>
        </div>

        <div className="mt-16 divide-y divide-line border-y border-line">
          {BRANCHES.map((b) => (
            <div key={b.id} className="grid gap-6 py-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
                  {b.region}
                </p>
                <h2 className="display-3 mt-1.5 text-ink">{b.name}</h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{b.address}</p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink underline-offset-4 hover:underline"
                  >
                    View on Google Maps
                  </a>
                  <a href={`mailto:${EMAIL}`} className="text-muted hover:text-ink">
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Chat With Our Advisors
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {b.staff.map((s) => (
                    <a
                      key={s.name}
                      href={waLink(s.whatsapp, `Hi ${s.name}, I'd like to make an enquiry with JomKaki Motor ${b.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-line px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-wa hover:text-wa"
                    >
                      <WhatsAppIcon className="h-4 w-4 text-wa" />
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              title="Send Us a Message"
              lead="Prefer email? Fill this in and the right branch will get back to you."
            />
            <div className="mt-8 max-w-lg">
              <ContactForm />
            </div>
          </div>
          <div>
            <iframe
              title="JomKaki Motor branches — interactive map"
              src="https://www.google.com/maps?q=JomKaki+Motor+Malaysia&output=embed"
              className="h-full min-h-96 w-full rounded-lg border border-line"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
