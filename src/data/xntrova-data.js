/**
 * Verified Xntrova Technologies Content & Local Verified Asset Inventory
 * Every image path in this file points to a verified local asset in `public/assets/`
 * downloaded directly from https://www.xntrova.com/ and validated for HTTP 200 + image decoding.
 */

export const XNTROVA_BRAND = {
  name: "Xntrova Technologies",
  shortName: "Xntrova",
  domain: "https://www.xntrova.com",
  tagline: "Best Digital Marketing Company in Delhi NCR",
  positioning:
    "India’s premier B2B digital marketing agency, delivering growth-focused solutions for businesses across Delhi and beyond.",
  description:
    "Grow your brand online with Xntrova, a leading digital marketing agency in Delhi offering SEO, PPC, social media & web solutions.",
  address: "A107, 2nd Floor, Sector 8, Dwarka, New Delhi - 110077",
  phoneDisplay: "+91 868-382-8646",
  phoneHref: "tel:+918683828646",
  whatsappHref: "https://wa.me/918683828646",
  email: "info@xntrova.com",
  emailHref: "mailto:info@xntrova.com",
  logoUrl: "/assets/brand/xntrova-logo.png",
  faviconUrl: "/assets/brand/favicon.png",
  ogImageUrl: "/assets/brand/og-image.png",
  heroVisualUrl: "/assets/editorial/campaign-performance.jpg",
  strategyVisualUrl: "/assets/editorial/strategy-collaboration.jpg",
  socials: [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/xntrova/" },
    { name: "Instagram", href: "https://www.instagram.com/xntrova.agency/" },
    { name: "Facebook", href: "https://www.facebook.com/xntrova/" },
    { name: "X", href: "https://x.com/xntrova" },
  ],
};

export const AGENCY_BENCHMARKS = [
  {
    id: "organic-traffic",
    value: "+250%",
    label: "Organic Traffic Growth",
    detail: "Agency-wide search visibility benchmark",
  },
  {
    id: "projects-delivered",
    value: "120+",
    label: "Projects Delivered",
    detail: "SEO, paid media & web engineering rollouts",
  },
  {
    id: "happy-clients",
    value: "500+",
    label: "Happy Clients",
    detail: "B2B enterprises, public sector & D2C brands",
  },
];

export const REVIEW_PLATFORMS = [
  {
    name: "Clutch",
    role: "B2B Agency Directory",
    logoUrl: "/assets/badges/clutch.svg",
  },
  {
    name: "GoodFirms",
    role: "IT & Marketing Research",
    logoUrl: "/assets/badges/goodfirms.jpg",
  },
  {
    name: "DesignRush",
    role: "Accredited Agency Partner",
    logoUrl: "/assets/badges/designrush.png",
  },
  {
    name: "Google Reviews",
    role: "5.0 ★ Executive Feedback",
    logoUrl: null,
  },
  {
    name: "Trustpilot",
    role: "Verified Client Trust",
    logoUrl: null,
  },
];

export const RAW_CORE_SERVICES = [
  {
    id: "seo",
    number: "01",
    slug: "search-engine-optimization",
    title: "Search Engine Optimization",
    category: "organic",
    categoryLabel: "Organic Authority",
    href: "https://www.xntrova.com/search-engine-optimization/",
    imageUrl: "/assets/services/seo-service.png",
    summary:
      "Long-term organic visibility through technical site architecture, high-intent keyword mapping, and authoritative link acquisition.",
    capabilities: ["Technical & On-Page SEO", "Local Search Dominance", "Authority Link Building"],
    subServices: [
      { name: "Local SEO", href: "https://www.xntrova.com/local-seo-packages/" },
      { name: "SEO Packages", href: "https://www.xntrova.com/seo-packages/" },
    ],
  },
  {
    id: "ppc",
    number: "02",
    slug: "paid-advertising",
    title: "Paid Advertising (PPC)",
    category: "paid",
    categoryLabel: "Performance Media",
    href: "https://www.xntrova.com/paid-advertising/",
    imageUrl: "/assets/services/paid-ads-service.png",
    summary:
      "High-intent Google, Meta, and LinkedIn campaigns engineered to capture demand at the exact moment buyers are ready to act.",
    capabilities: ["Google Search & PMax", "Meta & LinkedIn Funnels", "GTM Conversion Tracking"],
    subServices: [
      { name: "Google & Meta PPC", href: "https://www.xntrova.com/paid-advertising/" },
    ],
  },
  {
    id: "web-dev",
    number: "03",
    slug: "website-development",
    title: "Website & App Development",
    category: "web-commerce",
    categoryLabel: "Web Engineering",
    href: "https://www.xntrova.com/website-development/",
    imageUrl: "/assets/services/web-development-service.jpg",
    summary:
      "Fast, responsive, SEO-ready websites and custom applications built for seamless user experience and B2B lead conversion.",
    capabilities: ["Responsive B2B Websites", "Core Web Vitals Speed", "Custom App Engineering"],
    subServices: [
      { name: "Web Packages", href: "https://www.xntrova.com/web-development-packages/" },
      { name: "App Development", href: "https://www.xntrova.com/app-development/" },
    ],
  },
  {
    id: "ecommerce",
    number: "04",
    slug: "e-commerce-marketing",
    title: "E-Commerce & Amazon Growth",
    category: "paid",
    categoryLabel: "Performance Media",
    href: "https://www.xntrova.com/e-commerce-marketing/",
    imageUrl: "/assets/services/ecommerce-service.png",
    summary:
      "Product feed optimization, marketplace sponsored ads, and checkout conversion tactics that turn catalog browsers into repeat buyers.",
    capabilities: ["Storefront CRO", "Shopping & Remarketing Ads", "Amazon Marketplace Scaling"],
    subServices: [
      { name: "Amazon Marketing", href: "https://www.xntrova.com/amazon-marketing-services/" },
    ],
  },
  {
    id: "smo",
    number: "05",
    slug: "social-media-optimization",
    title: "Social Media & Reputation (ORM)",
    category: "organic",
    categoryLabel: "Organic Authority",
    href: "https://www.xntrova.com/social-media-optimization/",
    imageUrl: "/assets/services/social-media-service.png",
    summary:
      "Creative social storytelling, community growth, and proactive online reputation management that strengthen brand trust.",
    capabilities: ["Brand Storytelling", "Influencer Collaborations", "Reputation Management"],
    subServices: [
      {
        name: "Online Reputation (ORM)",
        href: "https://www.xntrova.com/online-reputation-management/",
      },
    ],
  },
  {
    id: "content",
    number: "06",
    slug: "content-marketing",
    title: "Content, Video & Lifecycle Email",
    category: "organic",
    categoryLabel: "Organic Authority",
    href: "https://www.xntrova.com/content-marketing/",
    imageUrl: "/assets/services/content-marketing-service.png",
    summary:
      "Editorial articles, infographics, video campaigns, and automated email journeys aligned with your brand voice and search goals.",
    capabilities: ["SEO Editorial & Copy", "Lifecycle Email Flows", "Video & Visual Design"],
    subServices: [
      { name: "Email Marketing", href: "https://www.xntrova.com/email-marketing/" },
      { name: "Video Marketing", href: "https://www.xntrova.com/video-marketing/" },
      { name: "Graphic Design", href: "https://www.xntrova.com/graphic-design/" },
    ],
  },
];

export const CORE_SERVICES = RAW_CORE_SERVICES.map((s) => ({
  ...s,
  shortTitle: s.title,
  image: s.imageUrl,
  imageAlt: `${s.title} visual preview`,
  highlights: s.capabilities,
  canonicalHref: s.href,
  subServices: s.subServices.map((sub) => ({
    ...sub,
    label: sub.name,
  })),
}));

export const DIFFERENTIATION_CONTENT = {
  eyebrow: "Why Xntrova",
  headline: "Driven by Ideas. Engineered for Measurable Performance.",
  summary:
    "We don’t rely on guesswork or cookie-cutter templates. Our Delhi NCR strategists study your market, align creative storytelling with analytics, and optimize every channel toward real business growth.",
  pillars: [
    {
      step: "01",
      title: "Creative Ideas",
      description: "Fresh thinking that builds distinctive brand narratives.",
    },
    {
      step: "02",
      title: "Strategic Planning",
      description: "Custom roadmaps backed by deep audience and competitor research.",
    },
    {
      step: "03",
      title: "Data-Driven Decisions",
      description: "Full-funnel attribution tied to pipeline impact and ROI.",
    },
    {
      step: "04",
      title: "Measurable Results",
      description: "Transparent reporting and continuous conversion optimization.",
    },
  ],
  flywheel: [
    { step: "01", title: "Build Visibility", detail: "Dominate high-intent search & discovery" },
    { step: "02", title: "Engage Audience", detail: "Connect through authority content & social" },
    { step: "03", title: "Drive Conversions", detail: "Convert traffic via fast web & paid funnels" },
    { step: "04", title: "Measure & Improve", detail: "Compound gains with transparent analytics" },
  ],
  verifiedStack: [
    { name: "Ahrefs", logoUrl: "/assets/badges/ahrefs.svg" },
    { name: "Moz", logoUrl: "/assets/badges/moz.png" },
    { name: "Rank Math", logoUrl: "/assets/badges/rank-math.svg" },
    { name: "Canva", logoUrl: "/assets/badges/canva.png" },
    { name: "Google Analytics 4", logoUrl: null },
    { name: "Google Search Console", logoUrl: null },
    { name: "Google Ads & Tag Manager", logoUrl: null },
    { name: "Semrush", logoUrl: null },
    { name: "Meta Business Suite", logoUrl: null },
    { name: "HubSpot & Salesforce", logoUrl: null },
    { name: "AWS & Drupal", logoUrl: null },
  ],
};

export const PROCESS_STAGES = [
  {
    step: "01",
    phase: "Discovery & Audit",
    title: "Diagnose Your Baseline",
    cadence: "Week 1",
    description:
      "We audit your technical website health, search footprint, paid accounts, and competitor landscape to uncover immediate growth bottlenecks.",
    deliverables: ["Technical SEO & UX Audit", "Competitor Gap Analysis", "Channel Opportunity Map"],
  },
  {
    step: "02",
    phase: "Custom Strategy",
    title: "Architect the 90-Day Plan",
    cadence: "Weeks 2–3",
    description:
      "We build a prioritised multi-channel roadmap aligning SEO, paid acquisition, content, and web engineering around your commercial targets.",
    deliverables: ["90-Day Growth Roadmap", "Funnel & Landing Page Spec", "GA4 & GTM Tracking Setup"],
  },
  {
    step: "03",
    phase: "Precision Execution",
    title: "Launch & Convert",
    cadence: "Ongoing",
    description:
      "Our engineering, performance media, and editorial specialists deploy fast web experiences, targeted ad campaigns, and search optimizations in lockstep.",
    deliverables: ["On-Page & Technical Rollouts", "Google, Meta & Amazon Ads", "Conversion Web Updates"],
  },
  {
    step: "04",
    phase: "Transparent Scale",
    title: "Measure & Compound",
    cadence: "Bi-Weekly / Monthly",
    description:
      "You receive clear, accurate performance reports while we continuously reallocate budget and refine pages to compound long-term ROI.",
    deliverables: ["Transparent ROI Reporting", "Bid & CRO Iteration", "Quarterly Scaling Reviews"],
  },
];

/**
 * Verified Client Portfolio & Strategic Capabilities Showcase
 * Every logoUrl below is a verified local asset downloaded from https://www.xntrova.com/.
 */
const RAW_CLIENT_CAPABILITY_SHOWCASE = [
  {
    id: "umbrella-infocare",
    clientName: "Umbrella Infocare",
    logoUrl: "/assets/clients/umbrella-infocare.png",
    previewImage: "/assets/services/seo-service.png",
    sector: "enterprise-gov",
    sectorLabel: "Enterprise IT & Cloud",
    capabilityFocus: "B2B Search Authority & Web Positioning",
    summary:
      "Technical search architecture, enterprise thought-leadership content, and conversion-aligned web presence for cloud & IT leadership.",
    tags: ["Technical SEO", "B2B Content", "Web Architecture"],
    relatedService: "Search Engine Optimization",
  },
  {
    id: "nitda-gov",
    clientName: "NITDA & Federal Ministry of Communication",
    logoUrl: "/assets/clients/nitda.webp",
    secondaryLogoUrl: "/assets/clients/federal-ministry-comm.webp",
    previewImage: "/assets/services/web-development-service.jpg",
    sector: "enterprise-gov",
    sectorLabel: "Public Sector Institutions",
    capabilityFocus: "Institutional Web Standards & Digital Reach",
    summary:
      "Accessible, mobile-first web communication standards and structured digital visibility for national technology initiatives.",
    tags: ["Web Standards", "Reputation Management", "Information Architecture"],
    relatedService: "Website & App Development",
  },
  {
    id: "pitti-fortune",
    clientName: "Pitti Jewels & Fortune Mattresses",
    logoUrl: "/assets/clients/pitti-jewels.webp",
    secondaryLogoUrl: "/assets/clients/fortune-mattresses.webp",
    previewImage: "/assets/services/ecommerce-service.png",
    sector: "ecommerce-retail",
    sectorLabel: "E-Commerce & Consumer D2C",
    capabilityFocus: "Catalog Scaling, Paid Social & Marketplace Growth",
    summary:
      "High-intent product discovery, visual social storytelling, and performance ad funnels across search and retail marketplaces.",
    tags: ["E-Commerce SEO", "Google & Meta Ads", "Catalog CRO"],
    relatedService: "E-Commerce & Amazon Growth",
  },
  {
    id: "chetan-amritya",
    clientName: "Chetan Clinic & Amritya Wellness",
    logoUrl: "/assets/clients/chetan-clinic.webp",
    secondaryLogoUrl: "/assets/clients/amritya-wellness.webp",
    previewImage: "/assets/services/social-media-service.png",
    sector: "healthcare-services",
    sectorLabel: "Healthcare & Wellness",
    capabilityFocus: "Local SEO Discovery & Patient Trust (ORM)",
    summary:
      "Regional search optimization, patient-focused educational content, and online reputation management for healthcare providers.",
    tags: ["Local SEO", "Online Reputation (ORM)", "Content Strategy"],
    relatedService: "Social Media & Reputation (ORM)",
  },
  {
    id: "mahadev-scholar",
    clientName: "Mahadev Tours & Scholar Scribe",
    logoUrl: "/assets/clients/mahadev-tours.webp",
    secondaryLogoUrl: "/assets/clients/scholar-scribe.webp",
    previewImage: "/assets/services/paid-ads-service.png",
    sector: "healthcare-services",
    sectorLabel: "Travel, Education & Services",
    capabilityFocus: "Lead-Generation Websites & Search Acquisition",
    summary:
      "Fast, inquiry-driven web platforms paired with search and paid acquisition to capture high-intent service bookings.",
    tags: ["Lead-Gen Web Dev", "Search & Paid Media", "Conversion Funnels"],
    relatedService: "Paid Advertising (PPC)",
  },
  {
    id: "etex-quality-tech",
    clientName: "Etex & Quality Tech Engineers",
    logoUrl: "/assets/clients/etex.webp",
    secondaryLogoUrl: "/assets/clients/quality-tech-engineers.webp",
    previewImage: "/assets/editorial/campaign-performance.jpg",
    sector: "enterprise-gov",
    sectorLabel: "Industrial & B2B Engineering",
    capabilityFocus: "Industrial B2B Visibility & Lead Pipeline",
    summary:
      "Targeted B2B search optimization and technical digital collateral connecting industrial solutions with commercial buyers.",
    tags: ["Industrial SEO", "B2B Lead Capture", "Digital Collateral"],
    relatedService: "Search Engine Optimization",
  },
];

export const CLIENT_CAPABILITY_SHOWCASE = RAW_CLIENT_CAPABILITY_SHOWCASE.map(
  (item) => ({
    ...item,
    category: item.sector,
    sector: item.sectorLabel,
    headline: item.capabilityFocus,
    deliverables: item.tags,
    logos: [
      { src: item.logoUrl, alt: `${item.clientName} primary logo` },
      ...(item.secondaryLogoUrl
        ? [{ src: item.secondaryLogoUrl, alt: `${item.clientName} partner logo` }]
        : []),
    ],
  })
);

export const VERIFIED_CLIENT_LOGOS = [
  { name: "Umbrella Infocare", logoUrl: "/assets/clients/umbrella-infocare.png", sector: "Enterprise IT" },
  { name: "NITDA", logoUrl: "/assets/clients/nitda.webp", sector: "Public Sector" },
  { name: "Federal Ministry of Communication", logoUrl: "/assets/clients/federal-ministry-comm.webp", sector: "Government" },
  { name: "Pitti Jewels & Pearls", logoUrl: "/assets/clients/pitti-jewels.webp", sector: "Fine Retail" },
  { name: "Fortune Mattresses", logoUrl: "/assets/clients/fortune-mattresses.webp", sector: "Consumer D2C" },
  { name: "Chetan Clinic", logoUrl: "/assets/clients/chetan-clinic.webp", sector: "Healthcare" },
  { name: "Amritya Wellness", logoUrl: "/assets/clients/amritya-wellness.webp", sector: "Wellness" },
  { name: "Mahadev Tours", logoUrl: "/assets/clients/mahadev-tours.webp", sector: "Hospitality" },
  { name: "Scholar Scribe Solutions", logoUrl: "/assets/clients/scholar-scribe.webp", sector: "Education" },
  { name: "Etex", logoUrl: "/assets/clients/etex.webp", sector: "Enterprise" },
  { name: "Good Health Foundation", logoUrl: "/assets/clients/good-health-foundation.webp", sector: "Healthcare" },
  { name: "Quality Tech Engineers", logoUrl: "/assets/clients/quality-tech-engineers.webp", sector: "Industrial B2B" },
];

export const VERIFIED_TESTIMONIALS = [
  {
    id: "amit-verma",
    name: "Amit Verma",
    role: "Founder",
    quote:
      "What impressed us most about Xntrova was their strategic mindset. Unlike other digital marketing agencies in Delhi, Xntrova didn’t give us a one-size-fits-all solution; instead, they created customised strategies for our business. Their proactive communication and data-driven approach gave us confidence in every decision we made together.",
    source: "Google Review",
    rating: 5,
    highlight: "Customised B2B strategy & data-driven decisions",
    focus: "Customised B2B strategy & data-driven decisions",
  },
  {
    id: "neha-kapoor",
    name: "Neha Kapoor",
    role: "Director",
    quote:
      "Xntrova is truly the best digital marketing agency in Delhi. Their team brought fresh ideas and clear directions for our business. They listened to all of our concerns and created their strategies accordingly, and the results they delivered were beyond expectations.",
    source: "Google Review",
    rating: 5,
    highlight: "Clear strategic direction & results beyond expectations",
    focus: "Clear strategic direction & results beyond expectations",
  },
  {
    id: "rahul-sharma",
    name: "Rahul Sharma",
    role: "CEO",
    quote:
      "What sets Xntrova apart is the way they combine expertise with a human touch. They celebrate your wins, tackle challenges alongside you, and remain focused on creating long-term value. It’s the kind of partnership every growing business hopes to find.",
    source: "Google Review",
    rating: 5,
    highlight: "Deep expertise paired with long-term partnership",
    focus: "Deep expertise paired with long-term partnership",
  },
  {
    id: "ankit-gupta",
    name: "Ankit Gupta",
    role: "Founder",
    quote:
      "What started as a simple project quickly turned into a long-term partnership. The team of Xntrova was approachable, proactive, and always willing to explore new ideas. Their dedication and attention to detail gave us confidence that our brand was in the right hands.",
    source: "Google Review",
    rating: 5,
    highlight: "Proactive execution & meticulous attention to detail",
    focus: "Proactive execution & meticulous attention to detail",
  },
  {
    id: "priya",
    name: "Priya",
    role: "CEO",
    quote:
      "Xntrova combines creativity with practicality in a way that’s hard to find. Every recommendation had a purpose, and every conversation left us with greater confidence in our direction. They don’t just deliver services; instead, they bring real value to the table.",
    source: "Google Review",
    rating: 5,
    highlight: "Purposeful recommendations & practical business impact",
    focus: "Purposeful recommendations & practical business impact",
  },
];

export const VERIFIED_FAQS = [
  {
    id: "faq-timeline",
    question: "How long does it take to see results from digital marketing?",
    answer:
      "The timeline depends on the service and your goals. While channels like paid advertising can generate quicker results, strategies such as SEO usually require consistent effort over time.",
  },
  {
    id: "faq-strategy",
    question: "How do you create marketing strategies for businesses?",
    answer:
      "We start by understanding your goals, target audience, and challenges. Based on these insights, we develop customised strategies designed to deliver measurable and sustainable results.",
  },
  {
    id: "faq-reporting",
    question: "Will I receive regular updates on campaign performance?",
    answer:
      "Absolutely. We believe in complete transparency and provide regular and accurate reports so you are always aware of what is happening with your business.",
  },
  {
    id: "faq-service-selection",
    question: "Which digital marketing service is right for my business?",
    answer:
      "The right strategy depends on your goals, industry, and target audience. We’ll help you identify the channels that offer the greatest potential for growth.",
  },
  {
    id: "faq-differentiation",
    question: "What makes Xntrova different from other agencies?",
    answer:
      "We focus on understanding your business first, then build practical, data-driven strategies tailored to your goals instead of relying on cookie-cutter solutions. This makes Xntrova the best digital marketing agency in Delhi.",
  },
];

// Normalized exports used across PeachWeb-inspired components
export const BRAND_INFO = {
  ...XNTROVA_BRAND,
  logoPath: XNTROVA_BRAND.logoUrl,
  shortBio: XNTROVA_BRAND.positioning,
};

export const PRIMARY_NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Xntrova", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const HERO_METRICS = AGENCY_BENCHMARKS;

export const TRUST_PLATFORMS = REVIEW_PLATFORMS.filter((p) => p.logoUrl).map(
  (p) => ({
    name: p.name,
    role: p.role,
    logo: p.logoUrl,
    invertOnDark: p.name === "Clutch",
  })
);

export const CLIENT_LOGOS = VERIFIED_CLIENT_LOGOS.slice(0, 6).map((c) => ({
  name: c.name,
  src: c.logoUrl,
  alt: `${c.name} logo`,
  sector: c.sector,
}));

export const SERVICE_CATEGORIES = [
  { id: "all", label: "All 6 Pillars" },
  { id: "organic", label: "Organic Authority" },
  { id: "paid", label: "Performance Media" },
  { id: "web-commerce", label: "Web Engineering" },
];

export const WHY_CHOOSE_PILLARS = DIFFERENTIATION_CONTENT.pillars.map((p) => ({
  number: p.step,
  title: p.title,
  description: p.description,
}));

export const GROWTH_FLYWHEEL = DIFFERENTIATION_CONTENT.flywheel.map((f) => ({
  step: f.step,
  stage: f.title,
  detail: f.detail,
}));

export const TECHNOLOGY_ECOSYSTEM = DIFFERENTIATION_CONTENT.verifiedStack.map(
  (t) => ({
    name: t.name,
    logo: t.logoUrl,
  })
);

export const PROCESS_STEPS = PROCESS_STAGES.map((s) => ({
  step: s.step,
  subtitle: s.phase,
  title: s.title,
  duration: s.cadence,
  description: s.description,
  deliverables: s.deliverables,
}));

export const PORTFOLIO_FILTERS = [
  { id: "all", label: "All Sectors" },
  { id: "enterprise-gov", label: "Enterprise IT & Public Sector" },
  { id: "ecommerce-retail", label: "E-Commerce & Retail" },
  { id: "healthcare-services", label: "Healthcare, Travel & Services" },
];

export const FAQ_ITEMS = VERIFIED_FAQS;
export const SOCIAL_LINKS = XNTROVA_BRAND.socials;

export const LEGAL_POLICY_LINKS = [
  { name: "Privacy Policy", href: "/privacy-policy/" },
  { name: "Terms & Conditions", href: "/terms-and-conditions/" },
  { name: "Cookie Policy", href: "/cookie-policy/" },
  { name: "Disclaimer", href: "/disclaimer/" },
  { name: "Refund & Cancellation Policy", href: "/refund-cancellation-policy/" },
  { name: "Copyright Policy", href: "/copyright-policy/" },
];

