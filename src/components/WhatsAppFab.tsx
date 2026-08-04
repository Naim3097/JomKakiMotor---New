"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./icons";
import { WHATSAPP_IPHONE, WHATSAPP_MOTOR } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

/** Sticky WhatsApp entry point — context-aware number, quiet rectangular form. */
export default function WhatsAppFab() {
  const pathname = usePathname();
  const isIphone = pathname?.startsWith("/iphone-17");
  const href = isIphone
    ? waLink(WHATSAPP_IPHONE, "Hi, I'd like to order an iPhone 17.")
    : waLink(WHATSAPP_MOTOR, "Hi JomKaki Motor, I'd like to make an enquiry.");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-lg bg-wa px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
