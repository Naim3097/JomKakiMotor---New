import type { Faq } from "./types";

/** Shop & product page FAQ — Client Comments R1, slide 18. */
export const SHOP_FAQS: Faq[] = [
  {
    q: "How to buy a motorcycle at JomKaki Motor?",
    a: [
      "Purchasing your motorcycle is easy and can be done directly through our website. Simply browse through our online catalogue, select your preferred motorbike, and send us your order by clicking on 'Chat to Apply'.",
      "This will connect you directly to our WhatsApp, where our Sales Advisors will guide you step-by-step through the entire application and purchasing process.",
    ],
  },
  {
    q: "Is there another way I can buy a motorcycle there?",
    a: [
      "Yes — if you prefer not to use the website catalogue, you can walk into any of our branches and browse our physical display. Our salesperson will be on standby to assist you throughout the entire process. We are open Monday to Friday 8:30 am – 5:30 pm and Saturday 8:30 am – 12:30 pm (closed Sunday and public holidays), with branches in Kuching (Satok, Batu Kawa, Kota Samarahan), Bintulu, and Selangor & KL.",
      "You can also explore our range, compare prices, and contact our sales team on our official social media channels — JomKaki Motor Sarawak and JomKaki Motor KL & Selangor on Facebook, Instagram, and TikTok. These are the ONLY authorized platforms outside of our website where you can safely explore and make purchases.",
    ],
  },
  {
    q: "Do I need to do an online booking?",
    a: [
      "If you are purchasing remotely instead of walking into a showroom, you will need to secure your motorcycle digitally. Please note that all online bookings are done exclusively by contacting us on WhatsApp.",
      "Whether you find your bike on our website or through our social media platforms, our sales team will finalize your official booking through WhatsApp to ensure a smooth and secure transaction.",
    ],
  },
];

/** FAQ page — Buying section (website info docx). */
export const BUYING_FAQS: Faq[] = [
  {
    q: "What brands of motorcycles do you sell?",
    a: [
      "We offer an extensive catalog of Malaysia's most trusted and popular motorcycle brands, including Yamaha, Honda, Modenas, and SYM.",
    ],
  },
  {
    q: "What financing options are available?",
    a: [
      "We offer highly flexible Hire Purchase (HP) financing solutions tailored to match your budget. You can choose to apply through our trusted credit partners: Loan Kedai, First Class Credit, Chailease Berjaya, and JCL.",
    ],
  },
  {
    q: "Can I apply for a motorcycle loan online?",
    a: [
      "Yes! The entire application process can be initiated online. Simply select your desired motorcycle on our website, click the \"WhatsApp Us\" button, and our sales advisors will guide you through the fast and easy application process.",
    ],
  },
  {
    q: "Where can I collect my new motorcycle?",
    a: [
      "Once your purchase or loan is approved, you can collect your motorcycle at any of our established physical branches located in Kuala Lumpur, Selangor, Kuching, and Bintulu.",
    ],
  },
  {
    q: "Do motorcycles come with a warranty?",
    a: [
      "Yes, all new motorcycles purchased through JomKaki Motor come with an official manufacturer warranty, ensuring your peace of mind on the road.",
    ],
  },
];

/** FAQ page — Selling / Trade-in section (website info docx). */
export const SELLING_FAQS: Faq[] = [
  {
    q: "Can I sell or trade in my motorcycle if I still have an outstanding loan?",
    a: [
      "No. JomKaki Motor does not assist with paying off outstanding hire purchase or personal loans. Your motorcycle must be fully paid off with the bank or credit provider, and you must hold the clear title (geran) in your name before we can accept it for sale or trade-in.",
    ],
  },
  {
    q: "Do you accept motorcycles with modifications or custom parts?",
    a: [
      "We only accept motorcycles that are in their 100% original, factory-standard condition. Bikes with aftermarket modifications — such as custom exhausts, modified engine blocks, or non-standard bodywork — will not be accepted. The engine must also be in good, running condition.",
    ],
  },
  {
    q: "Can I trade in my old bike to buy a new one from JomKaki Motor?",
    a: [
      "Yes! We accept trade-ins for selected motorcycle models. As long as your current motorcycle is an accepted model, fully paid off, and in its original condition, you can use its trade-in value to offset the cost or deposit of a new motorcycle from our catalog.",
    ],
  },
  {
    q: "How and where does the physical inspection take place?",
    a: [
      "After you WhatsApp us your bike's details and photos, we will schedule a free, 15 to 30-minute physical inspection at your nearest JomKaki Motor branch (Kuala Lumpur, Selangor, Kuching, or Bintulu). Our expert mechanics will evaluate the engine and physical condition to provide an accurate market quotation.",
    ],
  },
  {
    q: "What documents do I need to bring to the inspection?",
    a: [
      "Please bring your original Identity Card (IC) and the original vehicle registration card (Geran) registered under your name.",
    ],
  },
];

/** Sell page FAQ (website info docx). */
export const SELL_PAGE_FAQS: Faq[] = [
  ...SELLING_FAQS.slice(0, 2),
  {
    q: "How long does the physical inspection take?",
    a: [
      "Our inspections are fast and thorough, typically taking just 15 to 30 minutes. Our expert mechanics will evaluate the engine condition, mileage, and overall physical state of the bike to give you an accurate market quotation.",
    ],
  },
  ...SELLING_FAQS.slice(2, 3),
  {
    q: "What documents do I need to bring to the inspection?",
    a: [
      "Please bring your original Identity Card (IC) and the original vehicle registration card (Geran) registered under your name.",
    ],
  },
  {
    q: "Do I have to bring the bike to a branch, or can you come to me?",
    a: [
      "To provide you with a fair and accurate final quotation, the motorcycle must be brought in for a physical inspection at one of our official branches located in Kuala Lumpur, Selangor, Kuching, or Bintulu.",
    ],
  },
];

/** iPhone 17 page FAQ (iPhone Website layout draft). */
export const IPHONE_FAQS: Faq[] = [
  {
    q: "Can I order the iPhone 17 if I am outside of Kuching?",
    a: [
      "Currently, our iPhone 17 lineup and financing options (First Class Credit and Loan Kedai) are exclusively available for our Kuching customers. All orders require in-person collection at our designated Satok branch in Kuching.",
    ],
  },
  {
    q: "Can I trade in my old smartphone for the iPhone 17?",
    a: [
      "We currently do not accept device trade-ins. All our iPhone 17 models are available through direct purchase or our flexible installment plans via First Class Credit and our in-house Loan Kedai.",
    ],
  },
  {
    q: "What documents do I need to apply for the installment plans?",
    a: [
      "For both First Class Credit and our in-house Loan Kedai financing, you will typically need your original Identity Card (IC), your latest payslips, and recent bank statements. Once you contact us, our team will guide you step-by-step through the exact documentation needed via WhatsApp.",
    ],
  },
  {
    q: "How do I place an order?",
    a: [
      "All orders are handled personally by our sales team to ensure you get the best service. Simply click any \"WhatsApp to Order\" button on our website. We will help you check stock availability, choose your model, and process your financing application directly through chat.",
    ],
  },
  {
    q: "Where exactly do I collect my new iPhone 17?",
    a: [
      "To ensure a secure and safe handover, all collections are done in person. Once your financing is approved and your order is finalized, you can pick up your device exclusively at our JomKaki Motor Satok branch in Kuching.",
    ],
  },
  {
    q: "Are the iPhones original and covered by warranty?",
    a: [
      "Yes, absolutely. Every iPhone 17 we supply is 100% original, brand new in a sealed box, and comes fully covered by the official Apple Malaysia warranty.",
    ],
  },
  {
    q: "Do I need to pay a deposit for the installment plan?",
    a: [
      "Deposit requirements depend on the specific financing option you choose (First Class Credit or Loan Kedai) and your individual credit assessment. Our team will provide you with a transparent breakdown of any upfront costs during your WhatsApp application process.",
    ],
  },
];
