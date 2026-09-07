import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LinkButton } from "@/components/Button";
import CtaBanner from "@/components/CtaBanner";
import LineIcon from "@/components/LineIcon";
import { BRANCHES, FINANCING_PARTNERS, PARTNER_LOGOS } from "@/data/site";
import aboutHero from "../../../public/brand/about-hero.png";

export const metadata: Metadata = {
  title: "About JomKaki Rider — Malaysia's Premier Motorcycle Dealership",
  description:
    "JomKaki Rider (K Trading Sdn. Bhd.) supplies genuine motorcycles, parts and riding gear across Malaysia, with branches in Kuching, Bintulu, KL & Selangor and flexible HP financing.",
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero — hand-built section (not <Section>) so the client-supplied
          artwork can sit flush on the section's bottom edge: the subject's
          baseline touches the borderline into the grey section below, on
          desktop and especially on mobile (client request). */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 md:pt-16">
          <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about-us" }]} />
          <div className="grid items-end gap-x-12 lg:grid-cols-[1fr_560px]">
            <div className="mt-10 max-w-3xl lg:pb-16">
              <p className="eyebrow text-brand">About us</p>
              <h1 className="display-1 mt-4 text-ink">
                Malaysia&apos;s Premier Motorcycle Dealership
              </h1>
              <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
                <p>
                  At JomKaki Rider, we are dedicated to providing riders across
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
            <Image
              src={aboutHero}
              alt="JomKaki sales advisor with a motorcycle"
              priority
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 448px, 90vw"
              className="mx-auto mt-12 w-full max-w-md lg:mx-0 lg:mt-0 lg:max-w-none"
            />
          </div>
        </div>
      </section>

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
          {/* Location pins per R3 slide 15 */}
          <ul className="divide-y divide-line border-y border-line">
            {BRANCHES.map((b) => (
              <li key={b.id} className="flex gap-3 py-5">
                <LineIcon name="mapPin" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" />
                <div>
                  <p className="text-[15px] font-semibold text-ink">{b.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{b.address}</p>
                </div>
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
            {/* R2 slide 24 — renders official logos once mapped in PARTNER_LOGOS */}
            <ul className="mt-5 grid grid-cols-2 gap-4">
              {FINANCING_PARTNERS.map((p) => (
                <li
                  key={p}
                  className="flex min-h-24 items-center justify-center rounded-lg border border-line bg-paper px-4 py-5 text-center"
                >
                  {PARTNER_LOGOS[p] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={PARTNER_LOGOS[p]}
                      alt={p}
                      loading="lazy"
                      className="max-h-11 w-full max-w-[150px] object-contain"
                    />
                  ) : (
                    <span className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                      {p}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Compact orange banner per R3 slide 17 */}
      <CtaBanner
        title="A Commitment to Quality"
        body="Every motorcycle, sport rim and helmet in our catalogue is guaranteed authentic — from the first inquiry to the open road."
      >
        <LinkButton href="/motorcycles" variant="primary" className="w-full sm:w-auto">
          Shop the catalogue
        </LinkButton>
      </CtaBanner>
    </>
  );
}
