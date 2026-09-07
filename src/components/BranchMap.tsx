"use client";

import { useState } from "react";
import LineIcon from "./LineIcon";
import { BRANCHES } from "@/data/site";

/**
 * Branch list + map. A plain "JomKaki" search embed only surfaces the
 * Sarawak shopfronts, so KL and Bintulu were missing (R3 slide 9). Here the
 * list drives the map: every branch is selectable and the embed follows,
 * so all five are reachable. List and map share one height.
 */
export default function BranchMap() {
  const [activeId, setActiveId] = useState(BRANCHES[0].id);
  const active = BRANCHES.find((b) => b.id === activeId) ?? BRANCHES[0];

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
      <ul className="h-64 divide-y divide-line overflow-y-auto rounded-lg border border-line px-5 lg:h-[440px]">
        {BRANCHES.map((b) => {
          const selected = b.id === active.id;
          return (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => setActiveId(b.id)}
                aria-pressed={selected}
                className="flex w-full gap-3 py-4 text-left"
              >
                <LineIcon
                  name="mapPin"
                  className={`mt-0.5 h-[18px] w-[18px] shrink-0 ${
                    selected ? "text-brand" : "text-muted"
                  }`}
                />
                <span className="min-w-0">
                  <span
                    className={`block text-[15px] font-semibold ${
                      selected ? "text-brand" : "text-ink"
                    }`}
                  >
                    {b.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
                    {b.address}
                  </span>
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1.5 inline-block text-sm font-semibold text-brand underline-offset-4 hover:underline"
                  >
                    View on Google Maps
                  </a>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <iframe
        key={active.id}
        title={`Map of JomKaki Rider ${active.name}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(active.address)}&output=embed`}
        className="h-72 w-full rounded-lg border border-line lg:h-[440px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
