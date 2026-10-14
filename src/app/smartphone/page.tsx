import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/Section";
import BannerImage from "@/components/BannerImage";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import { IconBadge } from "@/components/LineIcon";
import PhoneLineup from "@/components/PhoneLineup";
import WaButton from "@/components/WaButton";
import JsonLd from "@/components/JsonLd";
import { PHONE_FAQS } from "@/data/faqs";
import {
  PHONE_FINANCING,
  PHONE_MODELS,
  PHONE_STEPS,
  PHONE_WHY,
  lowestBand,
} from "@/data/phones";
import { BRANCHES, EMAIL, WHATSAPP_IPHONE } from "@/data/site";
import { productSchema } from "@/lib/schema";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Smartphones in Kuching — Apple & Samsung Installment Plans",
  description:
    "Own the iPhone 18 Pro, iPhone 17 and Samsung Galaxy S26 series on flexible installments via Loan Kedai and First Class Credit. 100% original with official Malaysia warranty. WhatsApp to order — collect at our Satok branch, Kuching.",
  alternates: { canonical: "/smartphone" },
};

const ORDER_WA = waLink(WHATSAPP_IPHONE, "Hi, I'd like to order a smartphone.");
const satok = BRANCHES.find((b) => b.id === "satok")!;

export default function SmartphonePage() {
  return (
    <>
      {/* Location notice — R4 slide 15 */}
      <div className="border-b border-line bg-surface px-5 py-2.5 text-center text-xs font-medium text-muted">
        Flagship smartphone installment plans (Apple &amp; Samsung) are
        exclusively available for in-person collection at JomKaki Rider Satok,
        Kuching.
      </div>

      {/* Hero — client artwork, R4 slide 16. The art is a warm gradient with
          the handsets on the right (wide) and along the bottom (portrait),
          so the copy takes the clear area and the type is dark, not light.
          Mobile reserves a bottom band for the handsets. */}
      <section className="relative overflow-hidden bg-[#f7c49b] text-ink">
        <div className="absolute inset-0" aria-hidden="true">
          <BannerImage
            desktop="/brand/hero-2-desktop.jpg"
            mobile="/brand/hero-2-mobile.jpg"
            alt=""
            priority
            className="object-cover object-bottom md:object-center"
          />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 pb-[max(400px,96vw)] pt-10 sm:px-8 md:min-h-[600px] md:py-24 md:pb-24">
          <div className="md:max-w-[420px] lg:max-w-[520px]">
            <p className="eyebrow text-ink/60">Kuching Exclusive | Satok Branch</p>
            <h1 className="display-1 mt-4 text-ink md:mt-6">
              Own Flagship Smartphones &amp; Easy Installments in Kuching
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-ink/75 md:mt-8 md:text-lg">
              Get the iPhone 18 Pro, iPhone 17, and Samsung Galaxy S26 series
              with flexible financing plans. Fast approval, low monthly
              payments, and direct pickup at JomKaki Rider Satok.
            </p>
            <div className="mt-7 md:mt-10">
              <WaButton href={ORDER_WA} size="lg" className="w-full sm:w-auto">
                WhatsApp to order
              </WaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Lineup — Apple / Samsung category buttons per R4 slide 17 */}
      <Section>
        <SectionHeading kicker="The lineup" title="Apple & Samsung Flagship Lineup" />
        <PhoneLineup />
        <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          No online payment. Chat with a sales advisor to confirm stock and
          collect at our Satok branch, Kuching. Installment figures are
          indicative — T&amp;C apply.
        </p>
      </Section>

      {/* Why us — R4 slide 18 */}
      <Section tone="surface" pad="tight">
        <SectionHeading
          title="Why Choose Us for Your Flagship Smartphones?"
          lead="The latest Apple and Samsung flagships, backed by the local reliability you already trust."
        />
        {/* Icons rather than numbers (R3 slide 11) */}
        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {PHONE_WHY.map((w) => (
            <div key={w.title}>
              <IconBadge name={w.icon} />
              <p className="mt-3 text-[15px] font-semibold leading-snug text-ink">{w.title}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Financing — lead per R4 slide 19 */}
      <Section>
        <SectionHeading
          kicker="Installments"
          title="Payment Plans Made for You"
          lead="Upgrade to your next flagship smartphone today. Enjoy low monthly payments with simple, fast-approval local financing."
        />
        <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-10">
          {PHONE_FINANCING.map((f) => (
            <div key={f.name} className="border-t-2 border-brand pt-6">
              {/* Partner's own mark where supplied (R3 slide 12) */}
              {"logo" in f && f.logo ? (
                <Image
                  src={f.logo}
                  alt={f.name}
                  width={220}
                  height={55}
                  className="h-11 w-auto max-w-[220px] object-contain"
                />
              ) : (
                <h3 className="display-3 text-ink">{f.name}</h3>
              )}
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.tagline}</p>
              {/* Icons per point (R3 slide 12) */}
              <dl className="mt-6 space-y-5">
                {f.points.map((pt) => (
                  <div key={pt.title} className="flex gap-3.5">
                    <IconBadge name={pt.icon} size="sm" />
                    <div>
                      <dt className="text-sm font-semibold text-ink">{pt.title}</dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-muted">{pt.body}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-8">
          <WaButton
            href={waLink(
              WHATSAPP_IPHONE,
              "Hi, I'd like to check my eligibility for smartphone installment plans."
            )}
            size="lg"
            className="w-full sm:w-auto"
          >
            Check your eligibility on WhatsApp
          </WaButton>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted">
            <strong className="text-ink">Purchases and financing only.</strong>{" "}
            JomKaki Rider operates exclusively through direct sales and the
            financing options listed above. We currently do not offer phone
            trade-in services.
          </p>
        </div>
      </Section>

      {/* Steps — R4 slide 20 */}
      <Section tone="surface" pad="tight">
        <SectionHeading kicker="Four simple steps" title="How to Get Yours Today" />
        {/* Icons rather than numbers (R3 slide 11) */}
        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {PHONE_STEPS.map((s) => (
            <div key={s.title}>
              <IconBadge name={s.icon} />
              <p className="mt-3 text-[15px] font-semibold leading-snug text-ink">{s.title}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Collection — R4 slide 21 */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              kicker="Official collection point"
              title="Collect at Satok, Kuching"
              lead="Once your financing is approved via WhatsApp, collect your new smartphone securely at our designated JomKaki Rider Satok branch."
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
            title="JomKaki Rider Satok branch map"
            src="https://www.google.com/maps?q=JomKaki+Motor+Satok+Kuching&output=embed"
            className="h-full min-h-96 w-full rounded-lg border border-line"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>

      {/* FAQ — R4 slide 22 */}
      <Section tone="surface">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={PHONE_FAQS} />
        </div>
      </Section>

      {/* Final CTA — R4 slide 23 */}
      <CtaBanner
        title="Upgrade to Apple or Samsung Today"
        body="Fast approval, low monthly payments, and hassle-free pickup at our Satok showroom."
      >
        <WaButton href={ORDER_WA} variant="ink" className="w-full sm:w-auto">
          WhatsApp to order
        </WaButton>
      </CtaBanner>

      <JsonLd
        data={PHONE_MODELS.map((m) =>
          productSchema({
            name: m.name,
            description: `${m.name} — 100% original, factory-sealed, with official ${
              m.make === "Apple" ? "Apple Malaysia" : "Samsung Malaysia Electronics (SME)"
            } warranty. Installments from RM${lowestBand(m)}/month via Loan Kedai or First Class Credit. Collection at JomKaki Rider Satok, Kuching.`,
            path: "/smartphone",
            brand: m.make,
            availability: "In Stock",
          })
        )}
      />
    </>
  );
}
