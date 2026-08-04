import type { Review } from "./types";

/**
 * PLACEHOLDER REVIEWS — every entry below is sample content (isSample: true).
 * Before launch these must be replaced with real reviews pulled from the
 * JomKaki Motor Satok Google Business Profile (client link:
 * https://share.google/XiPijy5Hpgrdn7zTm), ideally via a Google Places API
 * fetch cached at build time. The section renders a visible note while any
 * sample entry remains.
 */
export const REVIEWS: Review[] = [
  { name: "A. Rahman", rating: 5, text: "Smooth process from WhatsApp enquiry to collecting my Y15ZR. Staff explained the financing clearly.", isSample: true },
  { name: "J. Wong", rating: 5, text: "Traded in my old kapcai and rode out with a new NVX the same week. Fair valuation, no pressure.", isSample: true },
  { name: "S. Ibrahim", rating: 5, text: "Very responsive on WhatsApp. Loan approved fast through their credit partner.", isSample: true },
  { name: "M. Ling", rating: 5, text: "Bought a helmet and gloves — genuine stock, good price. Will come back for servicing items.", isSample: true },
  { name: "N. Azlan", rating: 4, text: "Good selection of bikes at the Satok branch. Paperwork handled for me, easy experience.", isSample: true },
  { name: "K. Chai", rating: 5, text: "Roadtax renewal done through WhatsApp in minutes. Very convenient.", isSample: true },
  { name: "F. Abdullah", rating: 5, text: "Sold my motorcycle here. Inspection took 20 minutes and payment was fast as promised.", isSample: true },
  { name: "D. Anak Jimbau", rating: 5, text: "Friendly staff, transparent pricing. They matched me with a bike that suited my budget.", isSample: true },
  { name: "H. Yusof", rating: 5, text: "First bike purchase and they walked me through every document I needed. Recommended.", isSample: true },
  { name: "C. Ting", rating: 4, text: "Ordered an iPhone 17 on installment. Collection at Satok was quick and the phone was sealed and original.", isSample: true },
];

export const REVIEWS_PROFILE_URL = "https://share.google/XiPijy5Hpgrdn7zTm";
