import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { LinkButton, TextLink } from "@/components/Button";
import { BikeCard, ProductCard } from "@/components/cards";
import HowItWorks from "@/components/HowItWorks";
import BrandWall from "@/components/BrandWall";
import ReviewsSection from "@/components/ReviewsSection";
import ProductImage from "@/components/ProductImage";
import { type ThumbKind } from "@/components/Thumb";
import WaButton from "@/components/WaButton";
import LineIcon, { IconBadge, type LineIconName } from "@/components/LineIcon";
import { ArrowRight } from "@/components/icons";
import {
  ACCESSORIES,
  MOTORCYCLES,
  RIDER_GEAR,
  buildSearchIndex,
  newestArrivals,
} from "@/lib/catalog";
import { WHATSAPP_MOTOR } from "@/data/site";
import {
  GENERAL_ENQUIRY,
  ROADTAX_ENQUIRY,
  SELL_ENQUIRY,
  TRADE_IN_ENQUIRY,
  waLink,
} from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "JomKaki Rider — Motorcycles, Gear & Genuine Parts in Malaysia" },
  description:
    "Browse new Yamaha, Honda, Modenas & SYM motorcycles with flexible financing. Sell or trade in your bike, renew road tax, and enquire instantly on WhatsApp. Branches in Kuching, Bintulu, KL & Selangor.",
  alternates: { canonical: "/" },
};

/** R2 slide 4 copy; R3 slide 2 — icons rather than photography. */
const WHY_CHOOSE_US: { title: string; body: React.ReactNode; icon: LineIconName }[] = [
  {
    title: "Flexible Financing",
    body: (
      <>
        Easy payment plans for any budget, including credit company options and
        our in-house <em>loan kedai</em>.
      </>
    ),
    icon: "wallet",
  },
  {
    title: "100% Genuine Quality",
    body: "Guaranteed authentic motorcycles, premium accessories, and reliable replacement parts for your peace of mind.",
    icon: "badgeCheck",
  },
  {
    title: "Direct Expert Support",
    body: "Connect instantly with our sales team via WhatsApp for personalized assistance and easy paperwork.",
    icon: "chat",
  },
  {
    title: "All-in-One Selection",
    body: "Everything you need in one place, from the latest motorcycles to daily riding gear.",
    icon: "grid",
  },
];

/** R2 slide 5 — category cards with a See More CTA (Engine Oil removed per R3). */
/** Each card fronts a real product photo from its catalogue. */
const CATEGORIES: { label: string; href: string; blurb: string; thumb: ThumbKind; image?: string }[] = [
  {
    label: "Motorcycles",
    href: "/motorcycles",
    blurb: "Authentic bikes from Malaysia's most trusted brands",
    thumb: "bike",
    image: MOTORCYCLES.find((m) => m.image)?.image,
  },
  {
    label: "Rider Gear",
    href: "/rider-gear",
    blurb: "Helmets, helmet visors, helmet spoilers and raincoats",
    thumb: "helmet",
    image: RIDER_GEAR.find((g) => g.gearType === "Helmet" && g.image)?.image,
  },
  {
    label: "Accessories",
    href: "/accessories",
    blurb: "Sport rims and fork lays",
    thumb: "rim",
    image: ACCESSORIES.find((a) => a.image)?.image,
  },
];

const SERVICES = [
  {
    title: "Sell Your Motorcycle",
    points: ["Safe & secure", "100% free inspection", "Fast payment"],
    href: "/sell",
    hrefLabel: "How selling works",
    wa: SELL_ENQUIRY,
    image: "/images/home/service-sell.jpg",
    alt: "Motorcycle parked in front of a building",
  },
  {
    title: "Roadtax & Insurance Renewal",
    points: ["Quick and easy renewal", "Instant price quotations", "Hassle-free process"],
    href: "/road-tax",
    hrefLabel: "About renewals",
    wa: ROADTAX_ENQUIRY,
    image: "/images/home/service-roadtax.jpg",
    alt: "Signing renewal documents",
  },
  {
    title: "Trade In Your Motorcycle",
    points: ["Hassle-free process", "Ownership transfer service", "Genuine models available"],
    href: "/sell",
    hrefLabel: "How trade-in works",
    wa: TRADE_IN_ENQUIRY,
    image: "/images/home/service-tradein.jpg",
    alt: "Hands on a motorcycle fuel tank during handover",
  },
];

export default function HomePage() {
  const searchIndex = buildSearchIndex();
  const newBikes = newestArrivals(MOTORCYCLES, 4);
  const newProducts = newestArrivals(
    [
      ...RIDER_GEAR.map((g) => ({ ...g, href: `/rider-gear/${g.slug}`, thumb: g.gearType === "Helmet" ? ("helmet" as const) : ("gear" as const) })),
      ...ACCESSORIES.map((a) => ({ ...a, href: `/accessories/${a.slug}`, thumb: "rim" as const })),
    ],
    4
  );

  return (
    <>
      {/* Hero — brand-orange surface with art-directed background artwork.
          Two crops (see public/brand/README.md for the spec): the desktop file
          carries the subject on the right, beside the content column; the
          mobile file carries it in the reserved band below the CTAs. Both are
          flat #F26522 placeholders until the client's artwork lands. */}
      <section className="relative overflow-hidden bg-brand">
        {/* Mobile: portrait crop as a full background, rider bottom-anchored
            below the text block. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/hero-mobile.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-bottom md:hidden"
        />

        {/* Desktop: the rider occupies a right-hand panel rather than a
            full-bleed background. A full-bleed cover crop pulls him leftwards
            into the headline at every width below ~1560px; giving him his own
            column keeps the type clear at any size. The left-edge gradient
            dissolves the panel into the orange field so there is no seam. */}
        <div className="absolute inset-y-0 right-0 hidden w-[45%] md:block lg:w-[48%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/hero-rider.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand to-transparent" />
        </div>

        {/* Below md the rider sits in a reserved band under the CTAs. That band
            has to grow with viewport width: as the frame gets squarer the
            portrait crop scales up and pulls him higher, so a fixed padding
            collides with the body copy around 500–767px. */}
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 pb-[max(460px,112vw)] pt-10 sm:px-8 md:min-h-[680px] md:pb-24 md:pt-24">
          {/* Width-capped so the type never reaches the rider panel */}
          <div className="md:max-w-[330px] lg:max-w-[450px] xl:max-w-[600px]">
            <p className="eyebrow text-ink/60">
              Kuching · Bintulu · KL &amp; Selangor
            </p>
            <h1 className="display-1 mt-4 md:mt-6">
              <span className="text-white">The Ride You Want</span>
              <br />
              <span className="text-ink">One Message Away</span>
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-ink/85 md:mt-8 md:text-lg">
              Genuine motorcycles, parts and riding gear from Yamaha, Honda,
              Modenas, SYM and more. Flexible financing, real people on
              WhatsApp, collection at five branches nationwide.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-10">
              <WaButton href={GENERAL_ENQUIRY} size="lg" variant="ink" className="w-full sm:w-auto">
                WhatsApp us
              </WaButton>
              <LinkButton href="/motorcycles" size="lg" variant="outline-ink" className="w-full sm:w-auto">
                Browse motorcycles
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us — R3 slide 2: icons rather than photography */}
      <Section>
        <SectionHeading kicker="The JomKaki Rider difference" title="Why Choose Us" />
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((w) => (
            <div key={w.title}>
              <IconBadge name={w.icon} />
              <h3 className="mt-4 text-base font-semibold text-ink">{w.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Category cards — R2 slide 5: four cards with a See More CTA */}
      <Section tone="surface">
        <SectionHeading
          kicker="The catalogue"
          title="Everything a Rider Needs"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group overflow-hidden rounded-lg border border-line bg-paper transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <ProductImage
                src={c.image}
                kind={c.thumb}
                alt={c.label}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="aspect-4/3 w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="border-t border-line p-4 sm:p-5">
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand">
                  {c.label}
                </h3>
                <p className="mt-1 hidden text-xs leading-relaxed text-muted sm:block">{c.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  See More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Brand index — R2 slide 6: full-width search, logo wall */}
      <Section>
        <SectionHeading
          kicker="Trusted marques"
          title="More Than 10 Brands in Our Catalogue"
        />
        <div className="mt-10">
          <BrandWall searchIndex={searchIndex} />
        </div>
      </Section>

      {/* Services — R2 slide 7: straight after the search/brand section */}
      <Section tone="ink">
        <SectionHeading
          kicker="Beyond the sale"
          title="We Also Provide These Services"
          onDark
        />
        <div className="mt-12 grid gap-10 border-t border-white/15 pt-12 md:grid-cols-3 md:gap-8">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex flex-col">
              {/* Image-led per R3 feedback */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.alt}
                loading="lazy"
                className="aspect-3/2 w-full rounded-lg object-cover"
              />
              <h3 className="display-3 mt-5 text-white">{s.title}</h3>
              {/* Check icons per R3 slide 5 */}
              <ul className="mt-3 space-y-2 text-[15px] text-white/65">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <LineIcon name="checkCircle" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-5 pt-6">
                <a
                  href={s.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white underline-offset-4 hover:underline"
                >
                  Start on WhatsApp
                </a>
                <Link
                  href={s.href}
                  className="text-sm font-medium text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {s.hrefLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Newest arrivals — R2 slide 8 */}
      <Section>
        <SectionHeading
          kicker="Just landed"
          title="Newest Arrivals"
          lead="Fresh stock across the catalogue. Popular models move fast."
        />
        <div className="mt-12 space-y-16">
          <div>
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
                Latest Motorcycle Arrivals
              </h3>
              <TextLink href="/motorcycles">View all</TextLink>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {newBikes.map((bike) => (
                <BikeCard key={bike.slug} bike={bike} isNew />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between border-b border-line pb-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
                Latest Gear &amp; Accessories
              </h3>
              <TextLink href="/accessories">View all</TextLink>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {newProducts.map((p) => (
                <ProductCard
                  key={p.slug}
                  href={p.href}
                  name={p.name}
                  brand={p.brand}
                  price={p.price}
                  kind={p.thumb}
                  image={p.image}
                  isNew
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* How it works — R2 slide 9: after Newest Arrivals */}
      <Section tone="surface">
        <SectionHeading
          kicker="Simple steps"
          title="How It Works"
          lead="Buying, selling or trading in. Every process is four clear steps."
        />
        <div className="mt-10">
          <HowItWorks />
        </div>
      </Section>

      {/* Google reviews */}
      <Section>
        <ReviewsSection />
      </Section>

      {/* Final CTA — R2 slide 13: brand orange, compact */}
      <section className="bg-brand">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:py-14">
          <div className="max-w-xl">
            <h2 className="display-3 text-white">Ready for Your Next Bike?</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">
              Message us on WhatsApp. Our sales advisors will check stock, sort
              your financing and book your collection at the nearest branch.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <WaButton
              href={waLink(WHATSAPP_MOTOR, "Hi JomKaki Rider, I'm looking for my next bike.")}
              variant="ink"
              className="w-full sm:w-auto"
            >
              WhatsApp us now
            </WaButton>
            <LinkButton href="/motorcycles" variant="outline-ink" className="w-full sm:w-auto">
              Browse the catalogue
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
