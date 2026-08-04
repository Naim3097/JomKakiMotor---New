import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LinkButton } from "@/components/Button";
import { BRANCHES, FINANCING_PARTNERS } from "@/data/site";

export const metadata: Metadata = {
  title: "About JomKaki Motor — Malaysia's Premier Motorcycle Dealership",
  description:
    "JomKaki Motor (K Trading Sdn. Bhd.) supplies genuine motorcycles, parts and riding gear across Malaysia, with branches in Kuching, Bintulu, KL & Selangor and flexible HP financing.",
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      <Section pad="tight">
        <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about-us" }]} />
        <div className="mt-10 max-w-3xl">
          <p className="eyebrow text-brand">About us</p>
          <h1 className="display-1 mt-4 text-ink">
            Malaysia&apos;s Premier Motorcycle Dealership
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            <p>
              At JomKaki Motor, we are dedicated to providing riders across
              Malaysia with top-tier motorcycles, genuine replacement parts, and
              premium riding gear. From daily commuters to high-performance
              machines, we offer an extensive, carefully curated catalog of the
              industry&apos;s most trusted brands, including Yamaha, Honda,
              Modenas, and SYM.
            </p>
            <p>
              We combine the convenience of a modern online catalog with the
              personalized, human touch of direct WhatsApp support to make
              buying your next motorcycle a seamless experience.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              kicker="Nationwide"
              title="Branches to Serve You Better"
              lead="Strategic dealership locations in Kuching, Bintulu, Kuala Lumpur and Selangor put our inventory and expert services within reach of riders across the country."
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              Our local sales advisors possess deep knowledge of the regional
              riding landscape and are ready to provide expert guidance, handle
              paperwork, and ensure you find the perfect motorcycle and
              accessory bundle for your specific needs.
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {BRANCHES.map((b) => (
              <li key={b.id} className="py-5">
                <p className="text-[15px] font-semibold text-ink">{b.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{b.address}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            kicker="Financing"
            title="Flexible Motorcycle Financing"
            lead="Getting your dream bike on the road should be stress-free. We specialise in flexible Hire Purchase (HP) solutions tailored to any budget, partnered with Malaysia's most reputable financial institutions for competitive rates and fast approvals."
          />
          <div className="border-t border-line pt-8 lg:border-t-0 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Our Trusted Credit Partners
            </p>
            <ul className="mt-5 space-y-4">
              {FINANCING_PARTNERS.map((p) => (
                <li key={p} className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted/70">Partner logos to be supplied by client.</p>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="max-w-2xl">
          <p className="eyebrow text-white/50">Our promise</p>
          <h2 className="display-2 mt-3 text-white">A Commitment to Quality</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Every motorcycle, sport rim, helmet, and bottle of engine oil in our
            catalog is guaranteed authentic. We never compromise on safety,
            performance, or customer satisfaction — from the first inquiry to
            the open road.
          </p>
          <div className="mt-9">
            <LinkButton href="/motorcycles" size="lg" variant="brand" className="w-full sm:w-auto">
              Shop the catalogue
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
