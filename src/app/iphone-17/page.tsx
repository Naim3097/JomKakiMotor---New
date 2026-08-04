import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import FaqAccordion from "@/components/FaqAccordion";
import ProductEnquiry from "@/components/ProductEnquiry";
import Thumb from "@/components/Thumb";
import WaButton from "@/components/WaButton";
import JsonLd from "@/components/JsonLd";
import { IPHONE_FAQS } from "@/data/faqs";
import {
  IPHONE_FINANCING,
  IPHONE_MODELS,
  IPHONE_STEPS,
  IPHONE_WHY,
} from "@/data/iphone";
import { BRANCHES, EMAIL, WHATSAPP_IPHONE } from "@/data/site";
import { rm } from "@/lib/format";
import { productSchema } from "@/lib/schema";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "iPhone 17 in Kuching — Easy Installment Plans",
  description:
    "Get the iPhone 17, 17e, Pro and Pro Max in Kuching with flexible installments via Loan Kedai and First Class Credit. 100% original, Apple Malaysia warranty. WhatsApp to order — collect at our Satok branch.",
  alternates: { canonical: "/iphone-17" },
};

const ORDER_WA = waLink(WHATSAPP_IPHONE, "Hi, I'd like to order an iPhone 17.");
const satok = BRANCHES.find((b) => b.id === "satok")!;

export default function Iphone17Page() {
  return (
    <>
      {/* Location notice */}
      <div className="border-b border-line bg-surface px-5 py-2.5 text-center text-xs font-medium text-muted">
        The JomKaki Motor iPhone 17 lineup and financing options are exclusively
        available for collection at our Kuching, Satok branch.
      </div>

      {/* Hero — same geometry as the homepage hero. The artwork's blacks are
          pure #000, so the section background is black (not ink) for a
          seamless blend. Desktop: phones in a right-hand panel with a
          gradient edge; mobile: full portrait background, subject in the
          reserved bottom band. */}
      <section className="relative overflow-hidden bg-black text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/iphone-hero-mobile.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-bottom md:hidden"
        />
        <div className="absolute inset-y-0 right-0 hidden w-[45%] md:block lg:w-[48%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/iphone-hero-phones.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 pb-[max(460px,112vw)] pt-10 sm:px-8 md:min-h-[680px] md:py-24 md:pb-24">
          <div className="md:max-w-[330px] lg:max-w-[450px] xl:max-w-[600px]">
            <p className="eyebrow text-white/50">Kuching exclusive</p>
            <h1 className="display-1 mt-4 text-white md:mt-6">
              The All-New iPhone 17 Lineup in Kuching Today
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-white/70 md:mt-8 md:text-lg">
              Secure your new device with our easy installment plans,
              exclusively available for collection at our Satok branch.
            </p>
            <div className="mt-7 md:mt-10">
              <WaButton href={ORDER_WA} size="lg" className="w-full sm:w-auto">
                WhatsApp to order
              </WaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Model cards */}
      <Section>
        <SectionHeading kicker="The lineup" title="Choose Your iPhone 17" />
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {IPHONE_MODELS.map((m) => (
            <div key={m.id} className="flex flex-col">
              {m.image ? (
                // White-background lineup render floats on the white page —
                // no tile chrome needed. All four share 1000×562, so card
                // image blocks stay equal-height.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.image}
                  alt={`${m.name} colour lineup`}
                  width={1000}
                  height={562}
                  loading="lazy"
                  className="aspect-video w-full rounded-lg object-cover"
                />
              ) : (
                <Thumb kind="phone" label={m.name} className="aspect-square w-full rounded-lg" />
              )}
              <h3 className="display-3 mt-5 text-ink">{m.name}</h3>
              <p className="mt-1 text-sm text-muted">
                RRP {rm(m.rrp)} · from{" "}
                <span className="font-semibold text-ink">RM{m.monthlyFrom.toFixed(2)}/month</span>
              </p>
              <div className="mt-5 flex flex-1 flex-col">
                <ProductEnquiry
                  productName={m.name}
                  path="/iphone-17"
                  number={WHATSAPP_IPHONE}
                  cta="WhatsApp to order"
                  stretch
                  note={false}
                  options={[
                    { label: "Storage", values: m.storage },
                    { label: "Colour", values: m.colours },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          No online payment. Chat with a sales advisor to confirm stock and
          collect at our Satok branch, Kuching. Installment figures are
          indicative — T&amp;C apply.
        </p>
      </Section>

      {/* Why us */}
      <Section tone="surface" pad="tight">
        <SectionHeading
          title="Why Choose Us for Your iPhone 17?"
          lead="We combine the latest Apple technology with the local reliability you already know."
        />
        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {IPHONE_WHY.map((w, i) => (
            <div key={w.title}>
              <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-line">
                0{i + 1}
              </span>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-ink">{w.title}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Financing */}
      <Section>
        <SectionHeading
          kicker="Installments"
          title="Payment Plans Made for You"
          lead="Get the latest iPhone 17 lineup without breaking the bank. Choose the plan that fits your monthly budget."
        />
        <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-10">
          {IPHONE_FINANCING.map((f) => (
            <div key={f.name} className="border-t-2 border-ink pt-6">
              <h3 className="display-3 text-ink">{f.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.tagline}</p>
              <dl className="mt-6 space-y-5">
                {f.points.map((pt) => (
                  <div key={pt.title}>
                    <dt className="text-sm font-semibold text-ink">{pt.title}</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted">{pt.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-8">
          <WaButton
            href={waLink(WHATSAPP_IPHONE, "Hi, I'd like to check my eligibility for iPhone 17 installment plans.")}
            size="lg"
            className="w-full sm:w-auto"
          >
            Check your eligibility on WhatsApp
          </WaButton>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted">
            <strong className="text-ink">Purchases and financing only.</strong>{" "}
            JomKaki Motor operates exclusively through direct sales and the
            financing options listed above. We currently do not offer device
            trade-in services.
          </p>
        </div>
      </Section>

      {/* Steps */}
      <Section tone="surface" pad="tight">
        <SectionHeading kicker="Four simple steps" title="How to Get Yours Today" />
        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {IPHONE_STEPS.map((s, i) => (
            <div key={s.step}>
              <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-line">
                0{i + 1}
              </span>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-ink">{s.title}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Collection */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              kicker="Official collection point"
              title="Collect at Satok, Kuching"
              lead="Once your financing is approved via WhatsApp, collect your new iPhone 17 securely at our designated JomKaki Motor Satok branch."
            />
            <address className="mt-8 space-y-3 text-sm not-italic leading-relaxed text-muted">
              <p className="font-semibold text-ink">{satok.name} branch</p>
              <p>{satok.address}</p>
              <p>
                <a href={satok.mapUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline-offset-4 hover:underline">
                  View on Google Maps
                </a>
              </p>
              <p>
                Monday – Friday 8:30 AM – 5:30 PM · Saturday 8:30 AM – 12:30 PM.
                Closed Sunday &amp; public holidays.
              </p>
              <p>
                <a href={`mailto:${EMAIL}`} className="text-ink underline-offset-4 hover:underline">{EMAIL}</a>
                <br />
                H/P +6010-660 8698 · Office +60 82-237 878
              </p>
            </address>
            <p className="mt-6 max-w-md border-l-2 border-line pl-4 text-xs leading-relaxed text-muted">
              Bring your original IC and have your WhatsApp order confirmation
              ready upon arrival at the Satok branch to verify your device
              collection.
            </p>
            <div className="mt-8">
              <WaButton href={ORDER_WA} className="w-full sm:w-auto">
                WhatsApp us now
              </WaButton>
            </div>
          </div>
          <iframe
            title="JomKaki Motor Satok branch map"
            src="https://www.google.com/maps?q=JomKaki+Motor+Satok+Kuching&output=embed"
            className="h-full min-h-96 w-full rounded-lg border border-line"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={IPHONE_FAQS} />
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="ink">
        <div className="max-w-2xl">
          <h2 className="display-2 text-white">Ready to Experience the New iPhone 17?</h2>
          <p className="mt-5 text-lg text-white/70">
            Check stock, apply for easy financing, and schedule your pickup via
            WhatsApp today.
          </p>
          <div className="mt-8">
            <WaButton href={ORDER_WA} size="lg" className="w-full sm:w-auto">
              WhatsApp to order
            </WaButton>
          </div>
        </div>
      </Section>

      <JsonLd
        data={IPHONE_MODELS.map((m) =>
          productSchema({
            name: m.name,
            description: `${m.name} — 100% original, sealed, with official Apple Malaysia warranty. Installments from RM${m.monthlyFrom.toFixed(2)}/month via Loan Kedai or First Class Credit. Collection at JomKaki Motor Satok, Kuching.`,
            price: m.rrp,
            path: "/iphone-17",
            brand: "Apple",
            availability: "In Stock",
          })
        )}
      />
    </>
  );
}
