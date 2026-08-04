"use client";

import { useState } from "react";

/** Buy / Sell / Trade-In steps — exact copy from Client Comments R1. */
const FLOWS = {
  Buy: [
    { title: "Choose and Apply", body: "Select your motorbike and submit your application form (online or in-store)." },
    { title: "Credit Evaluation", body: "Wait for our team to contact you to process your credit evaluation." },
    { title: "Sign Documents", body: "Complete the official paperwork to formalise the sale." },
    { title: "Get Your Keys", body: "Finalise the purchase and enjoy your new ride!" },
  ],
  Sell: [
    { title: "Book an Inspection", body: "Submit your details to secure a time slot." },
    { title: "Get it Checked", body: "Bring your motorcycle in for a quick physical evaluation." },
    { title: "Instant Offer", body: "Receive a fair, on-the-spot price quote immediately." },
    { title: "Get Paid", body: "We handle all the paperwork, and you get your money!" },
  ],
  "Trade In": [
    { title: "Book an Appointment", body: "Send in your current motorcycle's details to schedule a valuation with us." },
    { title: "Choose Your Next Bike", body: "Browse our selection and pick the new motorcycle you want to upgrade to." },
    { title: "Prepare Your Documents", body: "Get your necessary paperwork ready for a smooth and seamless exchange." },
    { title: "Pick Up at Our Showroom", body: "Finalize the trade and collect your brand-new ride directly from our shop." },
  ],
} as const;

type FlowKey = keyof typeof FLOWS;

export default function HowItWorks() {
  const [active, setActive] = useState<FlowKey>("Buy");

  return (
    <div>
      <div role="tablist" aria-label="How it works" className="flex gap-8 border-b border-line">
        {(Object.keys(FLOWS) as FlowKey[]).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
            className={`-mb-px border-b-2 pb-3 text-[15px] font-semibold transition-colors ${
              active === key
                ? "border-brand text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {FLOWS[active].map((step, i) => (
          <div key={step.title}>
            <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-brand/40">
              0{i + 1}
            </span>
            <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
