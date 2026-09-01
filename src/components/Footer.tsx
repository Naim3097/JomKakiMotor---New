import Link from "next/link";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";
import { COPYRIGHT, HOURS, SOCIALS } from "@/data/site";

/**
 * R2 slide 14: Navigate renders as two columns to keep the footer short.
 * Split kept deliberately at shop links / everything else.
 */
const NAVIGATE_COLS: { label: string; href: string }[][] = [
  [
    { label: "Motorcycles", href: "/motorcycles" },
    { label: "Rider Gear", href: "/rider-gear" },
    { label: "Accessories", href: "/accessories" },
    { label: "Road Tax", href: "/road-tax" },
  ],
  [
    { label: "iPhone 17", href: "/iphone-17" },
    { label: "Sell / Trade-In", href: "/sell" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact" },
  ],
];

const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Privacy Notice", href: "/privacy-notice" },
];

function SocialRow({ set }: { set: { label: string; facebook: string; instagram: string; tiktok: string } }) {
  return (
    <div>
      <p className="text-xs font-medium text-white/45">{set.label}</p>
      <div className="mt-2 flex gap-4">
        <a href={set.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${set.label} on Facebook`} className="text-white/60 transition-colors hover:text-white">
          <FacebookIcon className="h-[18px] w-[18px]" />
        </a>
        <a href={set.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${set.label} on Instagram`} className="text-white/60 transition-colors hover:text-white">
          <InstagramIcon className="h-[18px] w-[18px]" />
        </a>
        <a href={set.tiktok} target="_blank" rel="noopener noreferrer" aria-label={`${set.label} on TikTok`} className="text-white/60 transition-colors hover:text-white">
          <TikTokIcon className="h-[18px] w-[18px]" />
        </a>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-20 lg:grid-cols-4">
        <div className="space-y-7">
          <Logo size="footer" />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Malaysia&apos;s premier motorcycle dealership. Genuine motorcycles,
            parts and riding gear, with branches in Kuching, Bintulu, KL and
            Selangor.
          </p>
          <div className="space-y-5">
            <SocialRow set={SOCIALS.kl} />
            <SocialRow set={SOCIALS.sarawak} />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Navigate</h3>
          <div className="mt-5 grid grid-cols-2 gap-x-6">
            {NAVIGATE_COLS.map((col, i) => (
              <ul key={i} className="space-y-3">
                {col.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Hours</h3>
          <ul className="mt-5 space-y-4">
            {HOURS.map((h) => (
              <li key={h.days} className="text-sm">
                <span className="block text-white/85">{h.days}</span>
                <span className="text-white/55">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Resources</h3>
          <ul className="mt-5 space-y-3">
            {RESOURCES.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/75 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-white/40 sm:px-8">
          {COPYRIGHT}
        </p>
      </div>
    </footer>
  );
}
