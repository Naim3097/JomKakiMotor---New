"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SearchIcon } from "./icons";
import type { SearchEntry } from "@/lib/catalog";

export default function SearchBox({
  index,
  placeholder = "Search bikes, gear, parts",
}: {
  index: SearchEntry[];
  /** kept for call-site compatibility; header and page contexts share one style */
  variant?: "light" | "dark";
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    return index
      .filter(
        (e) =>
          e.label.toLowerCase().includes(query) ||
          e.sub.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [q, index]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <label className="flex items-center gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-2 text-sm transition-colors focus-within:border-ink/40">
        <SearchIcon className="h-4 w-4 shrink-0 text-muted" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
          aria-label="Search the catalogue"
        />
      </label>
      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-40 mt-2 rounded-lg border border-line bg-paper py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          {results.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="block px-4 py-2.5 transition-colors hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                <span className="block text-sm font-semibold text-ink">{r.label}</span>
                <span className="block text-xs text-muted">{r.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {open && q.trim().length >= 2 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-lg border border-line bg-paper px-4 py-3 text-sm text-muted shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          No matches. Try a brand or model name.
        </div>
      )}
    </div>
  );
}
