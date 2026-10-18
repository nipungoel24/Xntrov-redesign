/**
 * Xntrova legal policies.
 *
 * Content is carried over from the policies published by Xntrova Technologies at
 * https://www.xntrova.com/<slug>/ (retrieved 18 Oct 2026). Wording is preserved;
 * only layout-specific contact lines are rendered from BRAND_INFO.
 *
 * Block types: { p: string } paragraph, { ul: string[] } list,
 * { h3: string } sub-heading, { contact: true } company contact card.
 */

export const LEGAL_POLICIES = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy | Xntrova Technologies",
    description:
      "How Xntrova Technologies collects, uses, shares, stores, and protects personal information when you use www.xntrova.com or our services.",
    intro: [
      "At Xntrova Technologies, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, process, store, and protect information when you visit or interact with our website, www.xntrova.com, contact us, request our services, or otherwise communicate with us.",
      "Xntrova Technologies is a digital marketing agency providing services including search engine optimisation (SEO), paid advertising/PPC, social media marketing, e-commerce marketing, content marketing, website development, email marketing, and other digital marketing solutions.",
      "By using our website or voluntarily providing your information to us, you acknowledge that you have read and understood this Privacy Policy.",
    ],
    sections: [
      {
        heading: "1. Information We Collect",
        blocks: [
          { p: "We may collect information that you voluntarily provide to us when you use our website, submit a form, request a consultation, communicate with our team, or engage our services." },
          { p: "Depending on how you interact with us, the information we may collect includes:" },
          { h3: "Personal Information" },
          {
            ul: [
              "Full name",
              "Email address",
              "Phone/mobile number",
              "Company or organisation name",
              "Website URL",
              "Business or professional information",
              "Information included in your enquiry or project requirements",
              "Any other information you voluntarily provide to us",
            ],
          },
          { h3: "Automatically Collected Information" },
          { p: "When you visit our website, certain information may be collected automatically through cookies, analytics tools, server logs, pixels, and similar technologies. This may include:" },
          {
            ul: [
              "IP address",
              "Browser type and version",
              "Device type",
              "Operating system",
              "Approximate geographic location",
              "Pages visited",
              "Time spent on pages",
              "Referring website or source",
              "Date and time of website access",
              "Website interaction and usage information",
            ],
          },
          { p: "This information may be used to understand website performance, improve user experience, analyse traffic, and improve our marketing activities." },
        ],
      },
      {
        heading: "2. How We Collect Information",
        blocks: [
          { p: "We may collect information through:" },
          {
            ul: [
              "Contact and enquiry forms on our website",
              "Free digital audit or consultation forms",
              "Emails and other direct communications",
              "Phone calls or other business communications",
              "Website usage and analytics technologies",
              "Cookies and similar tracking technologies",
              "Information provided during service enquiries or client onboarding",
              "Other legitimate interactions with Xntrova",
            ],
          },
          { p: "Our website currently uses forms through which visitors may provide information such as name, email address, phone number, company name, website URL, and information about how they heard about us." },
        ],
      },
      {
        heading: "3. How We Use Your Information",
        blocks: [
          { p: "We may use the information we collect for legitimate business purposes, including:" },
          {
            ul: [
              "Responding to your enquiries and requests",
              "Providing consultations and digital audits",
              "Understanding your business and marketing requirements",
              "Preparing proposals, quotations, and service plans",
              "Providing and managing our services",
              "Communicating with existing and prospective clients",
              "Improving our website, services, content, and user experience",
              "Managing client relationships",
              "Sending relevant service-related communications",
              "Measuring website traffic and marketing performance",
              "Conducting analytics and research",
              "Detecting, preventing, and addressing fraud, misuse, security incidents, or technical problems",
              "Complying with applicable legal and regulatory obligations",
              "Protecting our rights, property, and business interests",
            ],
          },
          { p: "We do not use your personal information for purposes that are materially different from those described in this Privacy Policy without providing appropriate notice where required by applicable law." },
        ],
      },
      {
        heading: "4. Marketing Communications",
        blocks: [
          { p: "If you provide your contact information to Xntrova, we may contact you regarding your enquiry, requested services, business requirements, or related information." },
          { p: "Where required by applicable law, we will obtain appropriate consent before sending promotional or marketing communications." },
          { p: "You may request to stop receiving marketing communications from us at any time by contacting us using the details provided below or by using an unsubscribe option included in applicable communications." },
          { p: "Please note that you may still receive essential communications relating to an existing enquiry, service, transaction, or business relationship." },
        ],
      },
      {
        heading: "5. Cookies and Similar Technologies",
        blocks: [
          { p: "Our website may use cookies and similar technologies to improve functionality, understand website usage, analyze traffic, measure marketing performance, and provide a better user experience." },
          { p: "Cookies may be used for purposes such as:" },
          {
            ul: [
              "Essential website functionality",
              "Website analytics",
              "Performance measurement",
              "Advertising and campaign measurement",
              "Remembering user preferences",
              "Understanding how visitors interact with our website",
            ],
          },
          { p: "Third-party services used on our website may also place cookies or similar technologies on your device." },
          { p: "You can control or disable cookies through your browser settings. However, disabling certain cookies may affect some website functionality." },
          { p: "Where legally required, we may provide additional cookie choices or consent mechanisms." },
        ],
      },
      {
        heading: "6. Analytics and Third-Party Services",
        blocks: [
          { p: "We may use third-party technologies and service providers to help us understand website traffic, measure marketing campaigns, improve website performance, and provide our services." },
          { p: "These providers may process information according to their own privacy policies and terms." },
          { p: "Examples may include website analytics, advertising platforms, CRM systems, hosting providers, communication tools, payment providers, and other technology or marketing platforms used by Xntrova." },
          { p: "We encourage users to review the privacy policies of third-party services when appropriate." },
        ],
      },
      {
        heading: "7. Sharing of Personal Information",
        blocks: [
          { p: "Xntrova does not sell your personal information as a business practice." },
          { p: "We may share information with trusted third parties where reasonably necessary to operate our business, provide services, or fulfill the purposes described in this Privacy Policy." },
          { p: "These parties may include:" },
          {
            ul: [
              "Hosting and website infrastructure providers",
              "Analytics providers",
              "Advertising and marketing platforms",
              "CRM and business management platforms",
              "Email and communication service providers",
              "IT and security service providers",
              "Professional advisers",
              "Payment and transaction service providers",
              "Government authorities or law enforcement agencies where legally required",
            ],
          },
          { p: "Third-party service providers may process information on our behalf and may be subject to contractual, legal, or technical safeguards as applicable." },
        ],
      },
      {
        heading: "8. Client Information",
        blocks: [
          { p: "When you engage Xntrova for digital marketing services, we may receive information relating to your business, website, marketing campaigns, customers, analytics accounts, advertising platforms, social media accounts, or other digital properties." },
          { p: "We use such information only as reasonably necessary to provide the agreed services, manage the client relationship, communicate with you, maintain security, and meet legal or contractual obligations." },
          { p: "Clients should avoid providing sensitive personal information through ordinary enquiry forms unless it is specifically required for a service." },
        ],
      },
      {
        heading: "9. Data Security",
        blocks: [
          { p: "We take reasonable administrative, technical, and organizational measures designed to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction." },
          { p: "However, no method of transmitting or storing information over the internet can be guaranteed to be completely secure." },
          { p: "Accordingly, while we work to protect your information, we cannot guarantee absolute security of information transmitted to or stored by us." },
        ],
      },
      {
        heading: "10. Data Retention",
        blocks: [
          { p: "We retain personal information only for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy, provide services, maintain business and financial records, resolve disputes, enforce agreements, comply with legal obligations, and protect our legitimate business interests." },
          { p: "The appropriate retention period may vary depending on the nature of the information and the purpose for which it was collected." },
          { p: "When information is no longer reasonably required, we may securely delete, anonymise, or otherwise dispose of it, subject to applicable legal and business requirements." },
        ],
      },
      {
        heading: "11. Your Privacy Rights",
        blocks: [
          { p: "Depending on your location and applicable privacy laws, you may have certain rights regarding your personal information." },
          { p: "These may include the right to:" },
          {
            ul: [
              "Request access to personal information we hold about you",
              "Request correction of inaccurate or incomplete information",
              "Request deletion of certain personal information",
              "Request restriction of certain processing",
              "Object to certain processing activities",
              "Withdraw consent where processing is based on consent",
              "Request information about how your personal information is used",
              "Opt out of certain marketing communications",
            ],
          },
          { p: "These rights are subject to applicable legal limitations and exceptions." },
          { p: "To make a privacy-related request, please contact us using the contact information provided in this Privacy Policy." },
        ],
      },
      {
        heading: "12. Children's Privacy",
        blocks: [
          { p: "Our website and services are intended primarily for businesses and professional users." },
          { p: "We do not knowingly collect personal information from children where such collection is prohibited by applicable law." },
          { p: "If you believe that a child has provided personal information to us without appropriate authorisation, please contact us so that we can take appropriate action." },
        ],
      },
      {
        heading: "13. Third-Party Websites",
        blocks: [
          { p: "Our website may contain links to third-party websites, social media platforms, advertising platforms, or other external websites." },
          { p: "Xntrova does not control the privacy practices, content, security, or policies of third-party websites." },
          { p: "When you leave our website, we recommend reviewing the privacy policy of the website you visit before providing personal information." },
        ],
      },
      {
        heading: "14. International Data Transfers",
        blocks: [
          { p: "Depending on the services and technology providers we use, your information may be processed or stored in countries other than the country in which you are located." },
          { p: "Where applicable, we take reasonable steps to ensure that such processing is carried out in accordance with applicable privacy and data protection requirements." },
        ],
      },
      {
        heading: "15. Changes to This Privacy Policy",
        blocks: [
          { p: "We may update or modify this Privacy Policy from time to time to reflect changes in our services, technology, business practices, legal requirements, or privacy practices." },
          { p: "When we make changes, we may update the “Effective Date” at the beginning of this policy." },
          { p: "We encourage you to review this page periodically to remain informed about how we handle personal information." },
        ],
      },
      {
        heading: "16. Contact Us",
        blocks: [
          { p: "If you have questions, concerns, requests, or complaints regarding this Privacy Policy or the way Xntrova handles personal information, please contact us." },
          { contact: true },
          { p: "You may contact us using the above details for privacy-related requests or questions." },
        ],
      },
      {
        heading: "17. Acceptance of This Privacy Policy",
        blocks: [
          { p: "By accessing and using www.xntrova.com, you acknowledge that you have read this Privacy Policy and understand how Xntrova Technologies may collect and process information as described above." },
          { p: "If you do not agree with this Privacy Policy, you should discontinue use of the website where appropriate." },
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    metaTitle: "Terms & Conditions | Xntrova Technologies",
    description:
      "The terms that govern your use of www.xntrova.com and the digital marketing services provided by Xntrova Technologies.",
    intro: [
      "Welcome to Xntrova Technologies. These Terms & Conditions govern your access to and use of www.xntrova.com and the services provided by Xntrova Technologies.",
      "By accessing our website or using our services, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, please discontinue use of our website and services.",
    ],
    sections: [
      {
        heading: "1. About Xntrova",
        blocks: [
          { p: "Xntrova Technologies is a digital marketing agency providing services including SEO, PPC and paid advertising, social media marketing, content marketing, e-commerce marketing, website development, email marketing, and related digital marketing services." },
          { p: "The specific scope, deliverables, timelines, fees, and responsibilities for client projects may be separately agreed upon through proposals, quotations, contracts, statements of work, or other written communications." },
        ],
      },
      {
        heading: "2. Website Use",
        blocks: [
          { p: "You may use our website only for lawful purposes and in accordance with these Terms." },
          { p: "You agree not to:" },
          {
            ul: [
              "Use the website for any unlawful or fraudulent purpose.",
              "Attempt to gain unauthorized access to our website, servers, systems, or databases.",
              "Introduce viruses, malware, or other harmful technologies.",
              "Copy, reproduce, distribute, or modify our website content without permission.",
              "Use automated systems to scrape, extract, or collect website information without authorization.",
              "Interfere with the operation, security, or availability of the website.",
            ],
          },
          { p: "We reserve the right to restrict or terminate access to the website where we reasonably believe these Terms have been violated." },
        ],
      },
      {
        heading: "3. Digital Marketing Services",
        blocks: [
          { p: "Our services are provided according to the scope and terms agreed with each client." },
          { p: "Digital marketing performance can depend on numerous factors outside our direct control, including search engine algorithms, advertising-platform policies, competition, market conditions, website quality, client actions, and changes in technology." },
          { p: "Therefore, unless expressly guaranteed in a written agreement, Xntrova does not guarantee specific search rankings, website traffic, leads, conversions, sales, revenue, advertising results, or other business outcomes." },
        ],
      },
      {
        heading: "4. Client Responsibilities",
        blocks: [
          { p: "Clients are responsible for providing accurate, complete, and timely information, materials, access credentials, approvals, and other resources reasonably required to perform the agreed services." },
          { p: "Clients must ensure that information, images, trademarks, content, products, and other materials supplied to Xntrova do not infringe the rights of third parties or violate applicable laws." },
          { p: "Delays in providing required information, approvals, or access may affect project timelines and deliverables." },
        ],
      },
      {
        heading: "5. Intellectual Property",
        blocks: [
          { p: "Unless otherwise agreed in writing, the Xntrova website, including its text, graphics, branding, designs, layouts, logos, original content, and other materials, is owned by or licensed to Xntrova Technologies and may not be reproduced or commercially used without prior written permission." },
          { p: "Ownership of client-specific deliverables will be governed by the applicable proposal, contract, or service agreement." },
          { p: "Third-party materials, software, platforms, trademarks, and intellectual property remain the property of their respective owners." },
        ],
      },
      {
        heading: "6. Payments and Fees",
        blocks: [
          { p: "Service fees, payment schedules, taxes, billing terms, cancellation conditions, and other financial arrangements will be specified in the applicable quotation, proposal, invoice, or agreement." },
          { p: "Failure to make payments within the agreed period may result in suspension or termination of services." },
          { p: "Any applicable taxes, platform charges, advertising budgets, third-party costs, or other expenses will be handled according to the agreed commercial terms." },
        ],
      },
      {
        heading: "7. Third-Party Platforms",
        blocks: [
          { p: "Our services may involve third-party platforms such as search engines, advertising networks, social media platforms, hosting providers, analytics tools, and other external services." },
          { p: "Xntrova does not control the policies, availability, algorithms, functionality, pricing, or decisions of these third parties. Changes made by such platforms may affect the services or results provided to clients." },
        ],
      },
      {
        heading: "8. Confidentiality",
        blocks: [
          { p: "We may receive confidential business information while providing our services. Xntrova will take reasonable measures to protect confidential information and use it only for legitimate business or service-related purposes, subject to applicable agreements and laws." },
        ],
      },
      {
        heading: "9. Limitation of Liability",
        blocks: [
          { p: "To the maximum extent permitted by applicable law, Xntrova Technologies will not be liable for indirect, incidental, consequential, or business losses arising from the use of our website or services, including loss of profits, revenue, data, business opportunities, or expected marketing results." },
          { p: "Nothing in these Terms is intended to exclude liability that cannot legally be excluded or limited." },
        ],
      },
      {
        heading: "10. Privacy",
        blocks: [
          { p: "Your use of our website is also subject to our Privacy Policy, which explains how we collect, use, and protect personal information." },
        ],
      },
      {
        heading: "11. Changes to These Terms",
        blocks: [
          { p: "Xntrova Technologies may update these Terms & Conditions from time to time. Updated terms will be published on this page with a revised effective or updated date." },
          { p: "Your continued use of the website after changes are published constitutes acceptance of the updated Terms, to the extent permitted by applicable law." },
        ],
      },
      {
        heading: "12. Governing Law",
        blocks: [
          { p: "These Terms & Conditions shall be governed by and interpreted in accordance with the applicable laws of India. Any disputes arising in connection with these Terms or our services shall be subject to the applicable jurisdiction of courts in India." },
        ],
      },
      {
        heading: "13. Contact Us",
        blocks: [
          { p: "For questions regarding these Terms & Conditions, please contact:" },
          { contact: true },
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    metaTitle: "Cookie Policy | Xntrova Technologies",
    description:
      "How Xntrova Technologies uses cookies and similar technologies on www.xntrova.com, and how you can manage them.",
    intro: [
      "At Xntrova Technologies, accessible through www.xntrova.com, we value your privacy and are committed to providing a secure and transparent browsing experience. This Cookie Policy explains how we use cookies and similar technologies when you visit our website.",
    ],
    reviewNote:
      "The published version of this policy asks for the cookie categories and third-party tools to be verified against the website's actual tracking setup. That verification has not been recorded, so this page should be reviewed before it is treated as final.",
    sections: [
      {
        heading: "1. What Are Cookies?",
        blocks: [
          { p: "Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember user preferences, analyse website traffic, and improve the overall browsing experience." },
        ],
      },
      {
        heading: "2. How We Use Cookies",
        blocks: [
          { p: "Xntrova Technologies may use cookies and similar tracking technologies for the following purposes:" },
          {
            ul: [
              "Essential Cookies: To ensure our website functions correctly and securely.",
              "Performance and Analytics Cookies: To understand visitor behaviour, website traffic, and page performance.",
              "Functional Cookies: To remember user preferences and improve website usability.",
              "Marketing Cookies: To measure advertising performance, deliver relevant advertisements, and understand campaign effectiveness.",
            ],
          },
          { p: "These cookies may be set by third-party service providers, such as analytics and advertising platforms." },
        ],
      },
      {
        heading: "3. Third-Party Cookies",
        blocks: [
          { p: "Our website may use third-party tools, including analytics services, advertising platforms, and social media integrations. These providers may collect certain browsing information according to their own privacy and cookie policies. Xntrova Technologies does not control third-party cookies and encourages users to review the relevant policies." },
        ],
      },
      {
        heading: "4. Managing Cookies",
        blocks: [
          { p: "You can manage, disable, or delete cookies through your browser settings. Most browsers allow you to block cookies or receive notifications before they are stored. Please note that disabling certain cookies may affect website functionality and your browsing experience." },
          { p: "Where required by applicable law, we will seek your consent before placing non-essential cookies on your device." },
        ],
      },
      {
        heading: "5. Updates to This Cookie Policy",
        blocks: [
          { p: "Xntrova Technologies reserves the right to update this Cookie Policy to reflect changes in technology, legal requirements, or our business practices. Any updates will be published on this page with a revised date." },
        ],
      },
      {
        heading: "6. Contact Us",
        blocks: [
          { p: "If you have any questions or concerns regarding this Cookie Policy, please contact us:" },
          { contact: true },
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    metaTitle: "Disclaimer | Xntrova Technologies",
    description:
      "General information, marketing-results, external-link, and professional-advice disclaimers for www.xntrova.com.",
    intro: [
      "Welcome to Xntrova Technologies. The information provided on www.xntrova.com is intended for general informational and business purposes. By accessing or using our website, you agree to the terms outlined in this Disclaimer. If you do not agree with any part of this Disclaimer, please discontinue using our website.",
    ],
    sections: [
      {
        heading: "1. General Information",
        blocks: [
          { p: "All content published on this website, including text, images, graphics, blogs, service descriptions, and other materials, is provided in good faith for general informational purposes. Xntrova Technologies makes reasonable efforts to ensure the accuracy and reliability of the information; however, we make no warranties or guarantees regarding its completeness, accuracy, suitability, or availability." },
        ],
      },
      {
        heading: "2. Digital Marketing Results Disclaimer",
        blocks: [
          { p: "Xntrova Technologies provides digital marketing services, including Search Engine Optimization (SEO), PPC advertising, social media marketing, content marketing, and website development. While we use industry practices, strategic planning, and data-driven approaches, we do not guarantee specific results, search engine rankings, website traffic, leads, conversions, or revenue." },
          { p: "Digital marketing performance depends on several factors, including competition, industry trends, advertising budgets, search engine algorithms, and client participation. Past performance and case studies do not guarantee future results." },
        ],
      },
      {
        heading: "3. External Links Disclaimer",
        blocks: [
          { p: "Our website may contain links to third-party websites, tools, or platforms for additional information and convenience. Xntrova Technologies does not control or take responsibility for the content, accuracy, privacy practices, or services offered by external websites. Accessing third-party links is entirely at your own discretion and risk." },
        ],
      },
      {
        heading: "4. Professional Advice Disclaimer",
        blocks: [
          { p: "The information available on this website should not be considered legal, financial, or other professional advice. Users should consult qualified professionals before making decisions based on the information provided." },
        ],
      },
      {
        heading: "5. Limitation of Liability",
        blocks: [
          { p: "Xntrova Technologies shall not be held liable for any direct, indirect, incidental, or consequential loss or damage arising from the use of our website, reliance on its content, service interruptions, or inability to access the website, to the extent permitted by applicable law." },
        ],
      },
      {
        heading: "6. Changes to This Disclaimer",
        blocks: [
          { p: "We reserve the right to modify or update this Disclaimer at any time without prior notice. Changes will become effective once published on this page. Users are encouraged to review this page periodically." },
        ],
      },
      {
        heading: "7. Contact Us",
        blocks: [
          { p: "For questions or concerns regarding this Disclaimer, please contact:" },
          { contact: true },
        ],
      },
    ],
  },
  {
    slug: "refund-cancellation-policy",
    title: "Refund & Cancellation Policy",
    metaTitle: "Refund & Cancellation Policy | Xntrova Technologies",
    description:
      "Terms for payments, service cancellations, and refunds for services purchased from Xntrova Technologies.",
    intro: [
      "At Xntrova, we are committed to providing professional digital marketing and technology services that meet our clients’ business requirements. This Refund & Cancellation Policy explains the terms applicable to payments, service cancellations, and refunds for services purchased through our website or directly from Xntrova.",
    ],
    sections: [
      {
        heading: "1. Service Payments",
        blocks: [
          { p: "Payments made to Xntrova for SEO, PPC/paid advertising, social media marketing, content marketing, e-commerce marketing, website development, email marketing, or other agreed services are processed according to the commercial terms specified in the applicable proposal, quotation, invoice, or service agreement." },
          { p: "Any third-party costs, including advertising platform charges, domain registration, hosting, software subscriptions, paid tools, licenses, or other external services, may be non-refundable once incurred." },
        ],
      },
      {
        heading: "2. Cancellation by Client",
        blocks: [
          { p: "Clients may request cancellation of an ongoing service by providing written notice to Xntrova. The applicable notice period, if any, will be as specified in the service agreement or proposal." },
          { p: "Cancellation requests will not automatically result in a refund. Services already completed, work in progress, resources allocated, third-party expenses, or other committed costs may be deducted from any amount eligible for refund." },
        ],
      },
      {
        heading: "3. Refund Eligibility",
        blocks: [
          { p: "Refunds are considered on a case-by-case basis and depend on the nature of the service, work completed, payment terms, and applicable agreement." },
          { p: "Advance payments for customized services, completed work, or services that have already commenced may generally not be refundable. Digital marketing results may also depend on factors outside Xntrova’s control, including search-engine algorithms, advertising platforms, market conditions, competition, website performance, and client-provided information. Therefore, payment is not refundable solely because a particular ranking, traffic level, lead volume, or conversion target has not been achieved unless specifically guaranteed in writing." },
        ],
      },
      {
        heading: "4. Refund Processing",
        blocks: [
          { p: "Where a refund is approved, Xntrova will process the eligible amount through the original payment method, where reasonably possible. Processing time may vary depending on the payment provider or financial institution." },
        ],
      },
      {
        heading: "5. Cancellation by Xntrova",
        blocks: [
          { p: "Xntrova reserves the right to suspend or terminate services in cases of non-payment, misuse of services, violation of agreed terms, or other material breaches. Any refund, if applicable, will be determined according to the relevant agreement and work completed." },
        ],
      },
      {
        heading: "6. Contact Us",
        blocks: [
          { p: "For cancellation or refund-related requests, please contact us using the details below. Written requests should include the client/company name, invoice details, service purchased, and reason for the request." },
          { contact: true },
          { p: "Xntrova reserves the right to update this policy when necessary. Any changes will be published on this page." },
        ],
      },
    ],
  },
  {
    slug: "copyright-policy",
    title: "Copyright Policy",
    metaTitle: "Copyright Policy | Xntrova Technologies",
    description:
      "Ownership, permitted use, and infringement-reporting terms for content published on www.xntrova.com.",
    intro: [
      "Welcome to Xntrova Technologies. This Copyright Policy applies to all content published on our official website, www.xntrova.com, including text, images, graphics, logos, videos, designs, and other digital materials. We respect intellectual property rights and are committed to protecting our original content and the rights of third-party content owners.",
    ],
    sections: [
      {
        heading: "1. Copyright Ownership",
        blocks: [
          { p: "Unless otherwise stated, all original content available on the Xntrova Technologies website is owned by or licensed to Xntrova Technologies and is protected under applicable copyright and intellectual property laws." },
          { p: "This includes website content, blogs, marketing materials, graphics, branding elements, service descriptions, and other creative assets. All rights are reserved unless explicitly stated otherwise." },
        ],
      },
      {
        heading: "2. Permitted Use of Website Content",
        blocks: [
          { p: "Visitors may access our website for personal, informational, and non-commercial purposes. However, you may not copy, reproduce, republish, modify, distribute, or commercially exploit any content from our website without prior written permission from Xntrova Technologies." },
          { p: "You may share links to our website or reference our content with appropriate attribution, provided that such use does not misrepresent our services, brand, or information." },
        ],
      },
      {
        heading: "3. Third-Party Intellectual Property",
        blocks: [
          { p: "Our website may contain third-party trademarks, logos, images, tools, or other materials used for identification, reference, or informational purposes. Such materials remain the property of their respective owners." },
          { p: "Their appearance on our website does not imply ownership, sponsorship, endorsement, or affiliation unless expressly stated." },
        ],
      },
      {
        heading: "4. Copyright Infringement Claims",
        blocks: [
          { p: "Xntrova Technologies respects the intellectual property rights of others. If you believe that any content published on our website infringes your copyright, please contact us with the relevant details, including the copyrighted work, the allegedly infringing material, and your contact information." },
          { p: "We will review legitimate complaints and take appropriate action, which may include removing or restricting access to the disputed content." },
        ],
      },
      {
        heading: "5. Unauthorised Use",
        blocks: [
          { p: "Unauthorised copying, reproduction, distribution, or commercial use of our copyrighted materials may result in appropriate legal action under applicable laws." },
        ],
      },
      {
        heading: "6. Policy Updates",
        blocks: [
          { p: "Xntrova Technologies reserves the right to update or modify this Copyright Policy at any time. Changes will become effective once published on this page." },
        ],
      },
      {
        heading: "7. Contact Us",
        blocks: [
          { p: "For copyright-related questions, permissions, or infringement concerns, contact us:" },
          { contact: true },
        ],
      },
    ],
  },
];

export function getPolicy(slug) {
  return LEGAL_POLICIES.find((policy) => policy.slug === slug);
}

export function policyMetadata(slug) {
  const policy = getPolicy(slug);
  const url = `https://www.xntrova.com/${slug}/`;
  return {
    title: policy.metaTitle,
    description: policy.description,
    alternates: { canonical: url },
    openGraph: {
      title: policy.metaTitle,
      description: policy.description,
      url,
      siteName: "Xntrova Technologies",
      locale: "en_IN",
      type: "website",
    },
  };
}
