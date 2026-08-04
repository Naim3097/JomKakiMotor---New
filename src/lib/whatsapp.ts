import { SITE_URL, WHATSAPP_MOTOR } from "@/data/site";

/** Build a wa.me deep link with a URL-encoded prefilled message. */
export function waLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Product enquiry — arrives pre-qualified with product name and page URL. */
export function productEnquiry(
  number: string,
  productName: string,
  path: string,
  extras?: string
): string {
  const msg = `Hi JomKaki Motor, I'm interested in the ${productName}${
    extras ? ` (${extras})` : ""
  } — ${SITE_URL}${path}. Can I get more details?`;
  return waLink(number, msg);
}

export const GENERAL_ENQUIRY = waLink(
  WHATSAPP_MOTOR,
  "Hi JomKaki Motor, I'd like to make an enquiry."
);

export const SELL_ENQUIRY = waLink(
  WHATSAPP_MOTOR,
  "Hi JomKaki Motor, I'd like to sell my motorcycle. Model: __ | Year: __ | Mileage: __ km"
);

export const TRADE_IN_ENQUIRY = waLink(
  WHATSAPP_MOTOR,
  "Hi JomKaki Motor, I'd like to trade in my motorcycle. Current bike: __ | Year: __ | Bike I'm interested in: __"
);

export const ROADTAX_ENQUIRY = waLink(
  WHATSAPP_MOTOR,
  "Hi JomKaki Motor, I'd like a quote for road tax & insurance renewal. Bike model: __ | Plate: __"
);
