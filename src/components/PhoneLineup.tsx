"use client";

import { useState } from "react";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import Thumb from "./Thumb";
import WaButton from "./WaButton";
import { PHONE_MAKES, PHONE_MODELS, lowestBand } from "@/data/phones";
import type { PhoneModel } from "@/data/types";
import { WHATSAPP_IPHONE } from "@/data/site";
import { productEnquiry } from "@/lib/whatsapp";

const PATH = "/smartphone";

/**
 * One handset. Storage drives the figure: the sheet publishes a band per
 * tier (R4 slide 17), so picking 512GB shows that tier's band rather than
 * leaving the buyer on the cheapest one.
 */
function PhoneCard({ m }: { m: PhoneModel }) {
  const [size, setSize] = useState<string>("");
  const tier = m.storage.find((s) => s.size === size);
  const band = tier ? tier.monthly : lowestBand(m);

  return (
    <div className="flex flex-col">
      {m.image ? (
        // White-background lineup render floats on the white page — no tile
        // chrome needed. All renders share 1000×562, so card image blocks
        // stay equal-height.
        <Image
          src={m.image}
          alt={`${m.name} handset`}
          width={1000}
          height={562}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-video w-full rounded-lg object-cover"
        />
      ) : (
        <Thumb kind="phone" label={m.name} className="aspect-video w-full rounded-lg" />
      )}

      {/* The rule is attached to the name, so the name box reserves two lines
          (2.4em of text plus the 0.625rem padding) once the cards sit side by
          side — otherwise a name that wraps, as the Samsung ones do at some
          widths, drops its own rule, figure and picker a line below the
          neighbouring cards'. items-end keeps a one-line name tight to its
          rule and lets the slack fall under the photo instead. */}
      <h3 className="display-3 mt-5 flex items-end border-b-2 border-brand pb-2.5 text-ink sm:min-h-[calc(2.4em+0.625rem)]">
        {m.name}
      </h3>
      <p className="mt-4">
        <span className="block text-xs font-medium text-muted">
          {tier ? `${tier.size} from` : "From"}
        </span>
        <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
          RM{band}
          <span className="text-base">/month*</span>
        </span>
      </p>

      <div className="mt-5 flex flex-1 flex-col gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            Select Storage
            {size && (
              <span className="ml-2 font-medium normal-case tracking-normal text-ink">
                {size}
              </span>
            )}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {m.storage.map((s) => {
              const active = size === s.size;
              return (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSize(active ? "" : s.size)}
                  aria-pressed={active}
                  className={`min-w-11 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-paper text-ink hover:border-brand hover:text-brand"
                  }`}
                >
                  {s.size}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <WaButton
            href={productEnquiry(
              WHATSAPP_IPHONE,
              m.name,
              PATH,
              size ? `Storage: ${size}` : undefined
            )}
            size="lg"
            className="w-full"
          >
            WhatsApp to Order
          </WaButton>
          <AddToCartButton
            product={{
              id: m.id,
              name: m.name,
              brand: m.make,
              price: 0,
              monthly: band,
              href: PATH,
              options: size ? { Storage: size } : undefined,
            }}
            variant="button"
            className="w-full"
          />
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">*T&amp;C Apply</p>
    </div>
  );
}

/**
 * Apple / Samsung category buttons over the handset grid (R4 slide 17).
 * "All Models" is the landing state so nothing is hidden before a click.
 */
export default function PhoneLineup() {
  const [make, setMake] = useState<string>("");
  const shown = make ? PHONE_MODELS.filter((m) => m.make === make) : PHONE_MODELS;

  const tabs = [{ label: "All Models", value: "" }, ...PHONE_MAKES.map((v) => ({ label: v, value: v }))];

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2.5" role="group" aria-label="Filter by brand">
        {tabs.map((t) => {
          const active = make === t.value;
          return (
            <button
              key={t.label}
              type="button"
              onClick={() => setMake(t.value)}
              aria-pressed={active}
              className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-paper text-ink hover:border-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m) => (
          <PhoneCard key={m.id} m={m} />
        ))}
      </div>
    </>
  );
}
