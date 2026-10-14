import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { LinkButton, TextLink } from "@/components/Button";
import { BikeCard, ProductCard } from "@/components/cards";
import HowItWorks from "@/components/HowItWorks";
import BrandWall from "@/components/BrandWall";
import HeroCarousel from "@/components/HeroCarousel";
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
    alt: "Handing over motorcycle keys in the JomKaki Rider showroom",
  },
  {
    title: "Roadtax & Insurance Renewal",
    points: ["Quick and easy renewal", "Instant price quotations", "Hassle-free process"],
    href: "/road-tax",
    hrefLabel: "About renewals",
    wa: ROADTAX_ENQUIRY,
    image: "/images/home/service-roadtax.jpg",
    alt: "Sales advisor going through renewal paperwork with a couple",
  },
  {
    title: "Trade In Your Motorcycle",
    points: ["Hassle-free process", "Ownership transfer service", "Genuine models available"],
    href: "/sell",
    hrefLabel: "How trade-in works",
    wa: TRADE_IN_ENQUIRY,
    image: "/images/home/service-tradein.jpg",
    alt: "JomKaki Rider advisor inspecting a trade-in motorcycle",
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
      {/* Sliding main banner — R4 slides 3-5 */}
      <HeroCarousel />

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
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-paper transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <ProductImage
                src={c.image}
                kind={c.thumb}
                alt={c.label}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="aspect-4/3 w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* The blurbs are different lengths, so See More is pinned to the
                  card's bottom edge rather than floating under its own blurb */}
              <div className="flex flex-1 flex-col border-t border-line p-4 sm:p-5">
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand">
                  {c.label}
                </h3>
                <p className="mt-1 hidden text-xs leading-relaxed text-muted sm:block">{c.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brand">
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
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-lg">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Two lines (2.4em, display-3 at 1.15 leading plus rounding) reserved
                  the cards sit side by side, so "Roadtax & Insurance Renewal"
                  wrapping cannot drop its bullet list below the neighbouring
                  cards'. items-end keeps the one-line titles tight to their
                  lists and puts the slack under the photo instead. */}
              <h3 className="display-3 mt-5 flex items-end text-white md:min-h-[2.4em]">
                {s.title}
              </h3>
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

      {/* Why Choose Us — R3 slide 2: icons rather than photography.
          Sits under Newest Arrivals per client request, so it takes the grey
          tone the stripe needs at this point in the page. */}
      <Section tone="surface">
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

      {/* How it works — R2 slide 9: after Newest Arrivals */}
      <Section>
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
      <Section tone="surface">
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
