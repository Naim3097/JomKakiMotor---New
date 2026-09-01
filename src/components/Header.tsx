"use client";

import { useState } from "react";
import Link from "next/link";
import CartLink from "./CartLink";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import { ChevronDown } from "./icons";
import { NAV_LINKS } from "@/data/site";
import type { SearchEntry } from "@/lib/catalog";

export default function Header({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 sm:px-8 xl:gap-6">
        <Logo className="shrink-0" />

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink xl:px-3"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="w-52 rounded-lg border border-line bg-paper py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    {link.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block px-4 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-surface hover:text-ink"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink xl:px-3"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Search needs room the nav claims at lg — restore it at xl */}
        <div className="ml-auto hidden w-56 xl:block xl:w-64">
          <SearchBox index={searchIndex} />
        </div>

        {/* Cart (R2 slide 2) */}
        <CartLink className="hidden lg:block" />

        {/* BM toggle — enabled once BM translations land */}
        <span
          className="hidden cursor-default select-none text-xs font-semibold uppercase tracking-wider text-muted/50 lg:inline-block"
          title="Bahasa Malaysia — coming soon"
          aria-disabled
        >
          BM
        </span>

        {/* Mobile: cart + menu toggle */}
        <CartLink className="ml-auto lg:hidden" />
        <button
          type="button"
          className="rounded-md p-2 text-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {mobileOpen ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-paper px-5 pb-6 lg:hidden">
          <div className="py-4">
            <SearchBox index={searchIndex} />
          </div>
          <nav aria-label="Mobile">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="border-b border-line last:border-0">
                  {link.children ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium text-ink"
                        aria-expanded={shopOpen}
                        onClick={() => setShopOpen((v) => !v)}
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
                      </button>
                      {shopOpen && (
                        <ul className="pb-3">
                          {link.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className="block py-2.5 pl-4 text-[15px] text-ink/70"
                                onClick={() => setMobileOpen(false)}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-3.5 text-base font-medium text-ink"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
