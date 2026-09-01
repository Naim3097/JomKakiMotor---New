"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./icons";
import { WHATSAPP_IPHONE, WHATSAPP_MOTOR } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

/**
 * Sticky WhatsApp entry point — context-aware number. The classic round
 * WhatsApp-logo button per R3 feedback (official glyph on WhatsApp green).
 */
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
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-0.5"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
