import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { LinkButton, TextLink } from "@/components/Button";
import { BikeCard, ProductCard } from "@/components/cards";
import Carousel from "@/components/Carousel";
import HowItWorks from "@/components/HowItWorks";
import BrandWall from "@/components/BrandWall";
import ReviewsSection from "@/components/ReviewsSection";
import Thumb from "@/components/Thumb";
import WaButton from "@/components/WaButton";
import {
  ACCESSORIES,
  ENGINE_OILS,
  MOTORCYCLES,
  RIDER_GEAR,
  buildSearchIndex,
  newestArrivals,
} from "@/lib/catalog";
import { FINANCING_PARTNERS, WHATSAPP_MOTOR } from "@/data/site";
import { rm } from "@/lib/format";
import {
  GENERAL_ENQUIRY,
  ROADTAX_ENQUIRY,
  SELL_ENQUIRY,
  TRADE_IN_ENQUIRY,
  waLink,
} from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "JomKaki Motor — Motorcycles, Gear & Genuine Parts in Malaysia" },
  description:
    "Browse new Yamaha, Honda, Modenas & SYM motorcycles with flexible financing. Sell or trade in your bike, renew road tax, and enquire instantly on WhatsApp. Branches in Kuching, Bintulu, KL & Selangor.",
  alternates: { canonical: "/" },
};

const CATEGORIES = [
  {
    label: "Motorcycles",
    href: "/motorcycles",
    blurb: "New bikes from Malaysia's most trusted brands",
    count: MOTORCYCLES.length,
  },
  {
    label: "Rider Gear",
    href: "/rider-gear",
    blurb: "Helmets, gloves, apparel and rain protection",
    count: RIDER_GEAR.length,
  },
  {
    label: "Accessories",
    href: "/accessories",
    blurb: "Sport rims, fork lays and bolt-on upgrades",
    count: ACCESSORIES.length,
  },
  {
    label: "Engine Oil",
    href: "/engine-oil",
    blurb: "Guaranteed-authentic oils for every engine",
    count: ENGINE_OILS.length,
  },
];

const SERVICES = [
  {
    title: "Sell Your Motorcycle",
    points: ["Safe & secure", "100% free inspection", "Fast payment"],
    href: "/sell",
    hrefLabel: "How selling works",
    wa: SELL_ENQUIRY,
  },
  {
    title: "Roadtax & Insurance Renewal",
    points: ["Quick and easy renewal", "Instant price quotations", "Hassle-free process"],
    href: "/road-tax",
    hrefLabel: "About renewals",
    wa: ROADTAX_ENQUIRY,
  },
  {
    title: "Trade In Your Motorcycle",
    points: ["Hassle-free process", "Ownership transfer service", "Genuine models available"],
    href: "/sell",
    hrefLabel: "How trade-in works",
    wa: TRADE_IN_ENQUIRY,
  },
];

export default function HomePage() {
  const searchIndex = buildSearchIndex();
  const featured = MOTORCYCLES.find((m) => m.slug === "yamaha-y15zr") ?? MOTORCYCLES[0];
  const popular = MOTORCYCLES.filter((m) => m.popular && m.slug !== featured.slug);
  const newBikes = newestArrivals(MOTORCYCLES, 4);
  const newProducts = newestArrivals(
    [
      ...RIDER_GEAR.map((g) => ({ ...g, href: `/rider-gear/${g.slug}`, thumb: g.gearType === "Helmet" ? ("helmet" as const) : ("gear" as const) })),
      ...ACCESSORIES.map((a) => ({ ...a, href: `/accessories/${a.slug}`, thumb: "rim" as const })),
      ...ENGINE_OILS.map((o) => ({ ...o, href: `/engine-oil/${o.slug}`, thumb: "oil" as const })),
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
            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-10">
              <WaButton href={GENERAL_ENQUIRY} size="lg" variant="ink">
                WhatsApp us
              </WaButton>
              <LinkButton href="/motorcycles" size="lg" variant="outline-ink">
                Browse motorcycles
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Category index — editorial rows, not cards */}
      <Section>
        <SectionHeading
          kicker="The catalogue"
          title="Everything a Rider Needs"
        />
        <div className="mt-10 border-t border-line">
          {CATEGORIES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group grid items-baseline gap-2 border-b border-line py-7 transition-colors hover:bg-surface sm:grid-cols-[1fr_auto] sm:px-4 md:py-9"
            >
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <h3 className="display-3 text-ink transition-colors group-hover:text-brand">{c.label}</h3>
                <p className="text-sm text-muted">{c.blurb}</p>
              </div>
              <span className="text-sm font-medium text-muted transition-colors group-hover:text-ink">
                {c.count} products
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <BrandWall searchIndex={searchIndex} />
        </div>
      </Section>

      {/* Featured motorcycle — product storytelling */}
      <Section tone="surface">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Thumb kind="bike" label={`${featured.brand} ${featured.model}`} className="aspect-4/3 w-full rounded-lg" />
          <div>
            <p className="eyebrow text-brand">Featured</p>
            <h2 className="display-2 mt-3 text-ink">
              {featured.brand} {featured.model}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              {featured.description[0]}
            </p>
            {/* Stat values never wrap: nowrap + a size step-down on narrow
                phones where three 24px figures can't share the row. */}
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-7 sm:gap-6">
              <div>
                <dd className="whitespace-nowrap font-display text-lg font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                  {featured.cc}cc
                </dd>
                <dt className="mt-1 text-xs text-muted">Liquid-cooled</dt>
              </div>
              <div>
                <dd className="whitespace-nowrap font-display text-lg font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                  {rm(featured.price)}
                </dd>
                <dt className="mt-1 text-xs text-muted">Retail price</dt>
              </div>
              <div>
                <dd className="whitespace-nowrap font-display text-lg font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                  {rm(featured.monthly)}
                </dd>
                <dt className="mt-1 text-xs text-muted">Monthly, from</dt>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={`/motorcycles/${featured.slug}`} variant="primary">
                Explore the {featured.model}
              </LinkButton>
              <WaButton href={waLink(WHATSAPP_MOTOR, `Hi JomKaki Motor, I'm interested in the ${featured.brand} ${featured.model}.`)}>
                Chat to apply
              </WaButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Popular models */}
      <Section>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            kicker="Rider favourites"
            title="Our Most Popular Motorcycles"
          />
          <TextLink href="/motorcycles" className="hidden shrink-0 sm:block">
            View all
          </TextLink>
        </div>
        <div className="mt-10">
          <Carousel>
            {popular.map((bike) => (
              <div key={bike.slug} className="w-64 shrink-0 snap-start sm:w-72">
                <BikeCard bike={bike} />
              </div>
            ))}
          </Carousel>
        </div>
      </Section>

      {/* Services — quiet columns, no boxes */}
      <Section tone="ink">
        <SectionHeading
          kicker="Beyond the sale"
          title="We Also Provide These Services"
          onDark
        />
        <div className="mt-12 grid gap-12 border-t border-white/15 pt-12 md:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex flex-col">
              <h3 className="display-3 text-white">{s.title}</h3>
              <ul className="mt-4 space-y-1.5 text-[15px] text-white/65">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
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

      {/* Newest arrivals */}
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
                  isNew
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* How it works */}
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

      {/* Financing — one quiet row */}
      <Section pad="tight">
        <div className="flex flex-col justify-between gap-6 border-y border-line py-10 md:flex-row md:items-center">
          <div className="max-w-md">
            <h2 className="display-3 text-ink">Flexible HP Financing</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Hire Purchase plans tailored to any budget, with fast approvals
              through Malaysia&apos;s reputable credit providers.
            </p>
          </div>
          <p className="font-display text-lg font-semibold tracking-[-0.02em] text-muted">
            {FINANCING_PARTNERS.join("  ·  ")}
          </p>
        </div>
      </Section>

      {/* Google reviews */}
      <Section>
        <ReviewsSection />
      </Section>

      {/* Final CTA */}
      <Section tone="ink">
        <div className="max-w-2xl">
          <h2 className="display-2 text-white">Ready for Your Next Bike?</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Message us on WhatsApp. Our sales advisors will check stock, sort
            your financing and book your collection at the nearest branch.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <WaButton
              href={waLink(WHATSAPP_MOTOR, "Hi JomKaki Motor, I'm looking for my next bike.")}
              size="lg"
            >
              WhatsApp us now
            </WaButton>
            <LinkButton href="/motorcycles" size="lg" variant="outline-light">
              Browse the catalogue
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
