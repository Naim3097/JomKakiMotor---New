"use client";

import { useState } from "react";

/**
 * Buy / Sell / Trade-In steps — copy from Client Comments R1; step icons per
 * R3 feedback (less wordy, more visual). Icon geometry is from Lucide
 * (lucide.dev, ISC licence) — do not hand-edit the path data.
 */

const STEP_ICONS = {
  /* clipboard-list */
  form: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  /* search-check */
  evaluate: '<path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  /* pen-line */
  sign: '<path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
  /* key-round */
  key: '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>',
  /* calendar-check */
  calendar: '<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="m9 15 2 2 4-4"/>',
  /* wrench */
  inspect: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>',
  /* tag */
  offer: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
  /* banknote */
  paid: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  /* bike */
  bike: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
  /* folder-open */
  documents: '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
  /* store */
  showroom: '<path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>',
} as const;

type StepIcon = keyof typeof STEP_ICONS;

function StepIconBadge({ icon }: { icon: StepIcon }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        dangerouslySetInnerHTML={{ __html: STEP_ICONS[icon] }}
      />
    </span>
  );
}

const FLOWS: Record<string, { title: string; body: string; icon: StepIcon }[]> = {
  Buy: [
    { title: "Choose and Apply", body: "Select your motorbike and submit your application form (online or in-store).", icon: "form" },
    { title: "Credit Evaluation", body: "Wait for our team to contact you to process your credit evaluation.", icon: "evaluate" },
    { title: "Sign Documents", body: "Complete the official paperwork to formalise the sale.", icon: "sign" },
    { title: "Get Your Keys", body: "Finalise the purchase and enjoy your new ride!", icon: "key" },
  ],
  Sell: [
    { title: "Book an Inspection", body: "Submit your details to secure a time slot.", icon: "calendar" },
    { title: "Get it Checked", body: "Bring your motorcycle in for a quick physical evaluation.", icon: "inspect" },
    { title: "Instant Offer", body: "Receive a fair, on-the-spot price quote immediately.", icon: "offer" },
    { title: "Get Paid", body: "We handle all the paperwork, and you get your money!", icon: "paid" },
  ],
  "Trade In": [
    { title: "Book an Appointment", body: "Send in your current motorcycle's details to schedule a valuation with us.", icon: "calendar" },
    { title: "Choose Your Next Bike", body: "Browse our selection and pick the new motorcycle you want to upgrade to.", icon: "bike" },
    { title: "Prepare Your Documents", body: "Get your necessary paperwork ready for a smooth and seamless exchange.", icon: "documents" },
    { title: "Pick Up at Our Showroom", body: "Finalize the trade and collect your brand-new ride directly from our shop.", icon: "showroom" },
  ],
};

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
            <div className="flex items-center gap-3">
              <StepIconBadge icon={step.icon} />
              <span className="font-display text-lg font-semibold tracking-[-0.02em] text-brand/40">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
