/**
 * Legal copy supplied by the client at R5 slide 3, transcribed from
 * K Trading Sdn. Bhd.'s "Disclaimer Notice" document. Both notices come from
 * that one document: the opening section is the Disclaimer Notice, the
 * "Personal Data Protection Notice" that follows it is the Privacy Notice.
 *
 * This is the client's own legal wording — reword nothing. If it changes,
 * replace it from their document rather than editing in place.
 */
export interface LegalBlock {
  /** Omitted for the opening blocks, which run straight under the page title */
  heading?: string;
  paras?: string[];
  bullets?: string[];
  /** Trailing paragraphs that belong after the bullet list */
  after?: string[];
}

export const DISCLAIMER_NOTICE: LegalBlock[] = [
  {
    paras: [
      "The information and materials provided on this website including but not limited to details on services, products, text, data, images, graphics, audio, video, and links are made available by K Trading Sdn. Bhd. (\"the Company\") on an \"as is\" and \"as available\" basis. Some content may originate from third-party sources.",
      "The Company makes no express or implied warranties, including but not limited to warranties of title, non-infringement, merchantability, satisfactory quality, accuracy, reliability, or fitness for a particular purpose. The Company expressly disclaims any liability for errors, omissions, delays or interruptions in the website's availability or performance.",
      "While reasonable efforts are made to maintain the accuracy and timeliness of content, the Company does not warrant that access to this website will be uninterrupted, error-free or secure. Users are responsible for protecting their own systems and for evaluating the usefulness and appropriateness of all materials accessed.",
      "The Company complies with the Personal Data Protection Act 2010 (PDPA). For details on how we handle personal data, please refer to our Privacy Notice.",
      "Unless otherwise noted, the contents of this website, including the Company logo, the text, images, other graphics and their arrangement are copyrighted by the Company. All other associated intellectual property rights related thereto are expressly reserved by the Company.",
      "No permission is granted for the use of the content of this website for any reason other than for that stated in a written contract between the Company and the potential user or partner. Except for content expressly created for the purpose of redistribution, the content of this website may not be reproduced, distributed, adapted, modified, republished, displayed, broadcast, hyperlinked, framed or transmitted in any manner or by any means or stored in an information retrieval system without the prior written permission of the Company.",
    ],
  },
];

export const PRIVACY_NOTICE: LegalBlock[] = [
  {
    heading: "1. Personal Data Protection Notice",
    paras: [
      "K Trading Sdn. Bhd. and its subsidiaries, associated companies, affiliated companies, or related companies (K Trading Sdn. Bhd.) care about the protection of your personal data. This notice explains how we process your personal data from collection, use, sharing, and destruction, as well as the security measures we take to ensure your personal data is well protected.",
    ],
  },
  {
    heading: "2. Collection",
    paras: ["We may collect the following personal data from you such as:"],
    bullets: [
      "Personal information to determine your identity and background such as full name, identity card or passport number, nationality, and religion",
      "Communication details such as mailing/billing address, premise address for electricity supply, telephone number, mobile phone number, fax number, and email address",
      "Sensitive information such as racial or ethnic origin, political opinions, religion or other beliefs, health background, criminal record, or trade union membership. Typically we do not collect sensitive information unless under strictly necessary and unavoidable circumstances to provide better service and meet your specific requirements",
      "Your resume or curriculum vitae when applying for employment.",
    ],
    after: [
      "For general website browsing, although no personal data is disclosed to us, certain technical and statistical information may be collected through our internet service provider, such as your IP address, time, date, and duration of your visit.",
    ],
  },
  {
    heading: "3. Sources of Collection",
    paras: ["We obtain your personal data from:"],
    bullets: [
      "When you register with us (for example, when you submit an application form to become our user)",
      "When you apply for employment with us",
      "When you visit or browse our website",
      "When you interact with us through social media or interactive applications, including but not limited to Facebook and Instagram",
      "When we collect your information from third parties dealing with us or connected to you (debt collectors, housing developers, credit reporting agencies, or financial institutions)",
      "From other sources where you have given consent to the disclosure of your personal data, and/or permitted by law.",
    ],
  },
  {
    heading: "4. Purpose of Collection",
    paras: ["We collect your personal data to:"],
    bullets: [
      "Verify your identity",
      "Manage and administer your account or contract with us",
      "Handle your requests or respond to any queries, complaints, comments, or feedback submitted to us.",
      "Produce anonymised or aggregated data, reports, and statistics that do not identify you as an individual",
      "Comply with any legal or regulatory obligations under applicable laws, regulations, guidelines, or industry codes",
      "Persons identified as you or authorized representatives whom you have empowered, for transaction or inquiry purposes.",
      "Any purpose required or permitted by law, regulation, guidelines, and/or relevant regulatory authorities.",
    ],
  },
  {
    heading: "5. Disclosure",
    paras: ["We will disclose your personal data to:"],
    bullets: [
      "Federal or state government",
      "Law enforcement agencies",
      "Government agencies",
      "Regulatory authorities",
      "Subsidiaries, associated companies, affiliated companies, or related companies",
      "Companies or organizations that assist us in processing and/or carrying out transactions and providing services requested by you",
      "Our business partners and other parties having purposes related to the purpose of collecting and using your personal data",
      "Other parties where you have given explicit or implicit consent",
    ],
  },
  {
    heading: "6. Incomplete Personal Data Provided by You",
    paras: [
      "You are required to provide your personal data to us if specified in our application or registration form, whether manually or electronically, to enable us to process your application for our services. If you fail to provide complete and mandatory personal data, we may be unable to process your application or provide our services to you.",
    ],
  },
  {
    heading: "7. Your Rights",
    paras: ["You have the right to"],
    bullets: [
      "Access and correct your personal data held by us. If you wish to access your personal data in our custody, or if you believe the personal data is inaccurate, incomplete, misleading, or out-of-date, you may submit a request using our Data Access Request Form or Correction Request Form. These forms are subject to a fee to cover our administrative costs.",
      "Stop our product promotions to you.",
      "Withdraw consent for processing personal data. If you withdraw consent for processing, we will be unable to process your application, fulfill your requests, or render services to you.",
    ],
  },
  {
    heading: "8. Retention Period",
    paras: [
      "We will retain your personal data for as long as necessary. However, after a period of seven (7) years, your personal data will be permanently deleted.",
    ],
  },
  {
    heading: "9. Security Measures",
    paras: [
      "We strive to take all reasonable steps to protect your personal data and ensure it is stored securely. This includes following our security procedures such as",
    ],
    bullets: [
      "Ensuring your personal data is properly stored in accordance with PDPA requirements.",
      "Verifying your identity when you call us",
      "Ensuring our staff do not misuse your personal data",
    ],
    after: [
      "However, you are responsible for maintaining the confidentiality of your password and not disclosing it to any other party to avoid the risk of unauthorized access to your personal data.",
    ],
  },
  {
    heading: "10. Personal Data Processing and Cross-Border Data Transfer",
    paras: [
      "We process your personal data primarily within Malaysia. It may be necessary for us to transfer your personal data outside Malaysia if any of our service providers or business partners involved in providing services are located overseas. In such circumstances, you consent to the transfer of your personal data outside Malaysia. We will take reasonable steps to ensure that any service provider or business partner is bound by contract not to use your personal data for any purpose other than providing the contracted services and to adequately protect your personal data.",
    ],
  },
  {
    heading: "11. Your Consent",
    paras: [
      "By communicating with us, engaging our company, or subscribing to our products and services, you acknowledge that you have read and understood this notice and agree and consent to the use, processing, disclosure, and transfer of personal data by the company as stated in this notice.",
    ],
  },
  {
    heading: "12. Contact Us",
    paras: [
      "We are committed to protecting your personal data. If you have any questions or comments regarding the handling of your personal data, you may contact us at enquiries@jomkaki.com.my",
    ],
  },
];
