"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  Target,
  Code2,
  ShoppingCart,
  ShieldCheck,
  FileText,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

/**
 * Compact height of collapsed service card header in pixels
 */
const PROJECT_HEADER_HEIGHT = 56;

/**
 * Six Integrated Disciplines Data Model for Xntrova
 * Gradual 6-Step Card Color Progression (Light to Dark):
 * 1. Card 01 — White (#FFFFFF)
 * 2. Card 02 — Very light neutral (#F0F5F8)
 * 3. Card 03 — Light blue-gray (#D4E5ED)
 * 4. Card 04 — Medium blue (#0075A2)
 * 5. Card 05 — Deep blue (#00455B)
 * 6. Card 06 — Darkest navy/teal (#001720)
 *
 * Each card includes dedicated theme tokens ensuring WCAG-compliant contrast.
 */
const SERVICES_DATA = [
  {
    id: "seo",
    number: "01",
    title: "Search Engine Optimization",
    categoryLabel: "Organic Growth",
    icon: Search,
    bgColor: "#FFFFFF",
    theme: "light",
    headerText: "text-[#001720]",
    headerSub: "text-[#4A606A]",
    headerIconBg: "bg-[#001720]/5",
    headerIconColor: "text-[#0075A2]",
    numberColor: "text-[#0075A2]",
    cardBorder: "border-t border-[#001720]/10",
    dividerColor: "border-[#001720]/10",
    badgeDot: "bg-[#0075A2]",
    badgeText: "text-[#0075A2]",
    metricsText: "text-[#5A707A]",
    summaryText: "text-[#233C47]",
    cardBoxBg: "bg-[#F4F8FA] border-[#DBE4E8]",
    cardBoxText: "text-[#001720]",
    cardBoxIcon: "text-[#0075A2]",
    tagBg: "bg-[#EBF2F6] text-[#003746] border-[#D0DFE7]",
    ctaBg: "bg-[#001720] text-white hover:bg-[#0075A2]",
    ctaIcon: "text-[#FAAE39]",
    subLinkText: "text-[#003746] hover:text-[#0075A2]",
    summary:
      "Architectural crawl governance, authoritative keyword clusters, and high-trust digital PR that secure compounding market visibility.",
    deliverables: [
      "Technical crawl governance & schema architecture",
      "High-intent keyword clusters & search intent mapping",
      "Authoritative link acquisition & digital PR placement",
    ],
    tags: ["Crawl Governance", "Schema Architecture", "Authority Building", "SERP Dominance"],
    subServices: [
      { name: "SEO Packages", href: "https://www.xntrova.com/seo-packages/" },
      { name: "Local SEO", href: "https://www.xntrova.com/local-seo-packages/" },
    ],
    metricsBadge: "100% Indexation Integrity",
  },
  {
    id: "ppc",
    number: "02",
    title: "Paid Advertising (PPC)",
    categoryLabel: "Paid Acquisition",
    icon: Target,
    bgColor: "#F0F5F8",
    theme: "light",
    headerText: "text-[#001720]",
    headerSub: "text-[#4A606A]",
    headerIconBg: "bg-[#001720]/5",
    headerIconColor: "text-[#0075A2]",
    numberColor: "text-[#0075A2]",
    cardBorder: "border-t border-[#001720]/10",
    dividerColor: "border-[#001720]/10",
    badgeDot: "bg-[#0075A2]",
    badgeText: "text-[#0075A2]",
    metricsText: "text-[#5A707A]",
    summaryText: "text-[#233C47]",
    cardBoxBg: "bg-white border-[#D6E3EA]",
    cardBoxText: "text-[#001720]",
    cardBoxIcon: "text-[#0075A2]",
    tagBg: "bg-[#E2ECF2] text-[#003746] border-[#CADCE6]",
    ctaBg: "bg-[#001720] text-white hover:bg-[#0075A2]",
    ctaIcon: "text-[#FAAE39]",
    subLinkText: "text-[#003746] hover:text-[#0075A2]",
    summary:
      "Full-funnel Google, Meta, and LinkedIn campaigns engineered to capture active buyer intent and maximize return on ad spend.",
    deliverables: [
      "Google Search & Performance Max campaign architecture",
      "Targeted B2B decision-maker funnels on Meta & LinkedIn",
      "Server-side conversion tracking & telemetry audits",
    ],
    tags: ["Google Ads", "Meta B2B", "LinkedIn Ads", "Performance Max", "CAPI Telemetry"],
    subServices: [
      { name: "Google & Meta PPC", href: "https://www.xntrova.com/paid-advertising/" },
    ],
    metricsBadge: "GA4 + CAPI Server-Side",
  },
  {
    id: "web-dev",
    number: "03",
    title: "Website & App Development",
    categoryLabel: "Web Engineering",
    icon: Code2,
    bgColor: "#D4E5ED",
    theme: "light",
    headerText: "text-[#001720]",
    headerSub: "text-[#233C47]",
    headerIconBg: "bg-[#001720]/8",
    headerIconColor: "text-[#005A7D]",
    numberColor: "text-[#005A7D]",
    cardBorder: "border-t border-[#001720]/15",
    dividerColor: "border-[#001720]/15",
    badgeDot: "bg-[#005A7D]",
    badgeText: "text-[#005A7D]",
    metricsText: "text-[#233C47]",
    summaryText: "text-[#001720]",
    cardBoxBg: "bg-white/85 border-[#BACFD9]",
    cardBoxText: "text-[#001720]",
    cardBoxIcon: "text-[#005A7D]",
    tagBg: "bg-[#BFD7E3] text-[#002431] border-[#ADC8D6]",
    ctaBg: "bg-[#001720] text-white hover:bg-[#005A7D]",
    ctaIcon: "text-[#FAAE39]",
    subLinkText: "text-[#002431] hover:text-[#005A7D]",
    summary:
      "Fast, responsive web applications engineered for seamless user experience, Core Web Vitals compliance, and high lead capture.",
    deliverables: [
      "Custom Next.js & React full-stack application engineering",
      "Core Web Vitals speed tuning & conversion-rate optimization",
      "Secure REST/GraphQL API integrations & CMS backends",
    ],
    tags: ["Next.js / React", "Full-Stack Web", "Core Web Vitals", "API Integrations"],
    subServices: [
      { name: "Web Packages", href: "https://www.xntrova.com/web-development-packages/" },
      { name: "App Development", href: "https://www.xntrova.com/app-development/" },
    ],
    metricsBadge: "Sub-1.2s LCP Target",
  },
  {
    id: "ecommerce",
    number: "04",
    title: "E-Commerce & Amazon Growth",
    categoryLabel: "Commerce",
    icon: ShoppingCart,
    bgColor: "#0075A2",
    theme: "dark",
    headerText: "text-white",
    headerSub: "text-white/70",
    headerIconBg: "bg-white/10",
    headerIconColor: "text-[#FAAE39]",
    numberColor: "text-[#FAAE39]",
    cardBorder: "border-t border-white/20",
    dividerColor: "border-white/20",
    badgeDot: "bg-[#FAAE39]",
    badgeText: "text-[#FAAE39]",
    metricsText: "text-white/60",
    summaryText: "text-white/95",
    cardBoxBg: "bg-white/[0.08] border-white/15",
    cardBoxText: "text-white",
    cardBoxIcon: "text-[#FAAE39]",
    tagBg: "bg-white/10 text-white/85 border-white/15",
    ctaBg: "bg-[#FAAE39] text-[#001720] hover:bg-white",
    ctaIcon: "text-[#001720]",
    subLinkText: "text-white/85 hover:text-[#FAAE39]",
    summary:
      "Catalog feed governance, sponsored product campaigns, and checkout conversion tactics that turn shoppers into repeat buyers.",
    deliverables: [
      "Storefront checkout UX & friction-free conversion paths",
      "Amazon sponsored brand & product advertising scale",
      "Google Merchant Center catalog feeds & dynamic retargeting",
    ],
    tags: ["Amazon Ads", "Shopify & WooCommerce", "Google Shopping", "Checkout CRO"],
    subServices: [
      { name: "Amazon Marketing", href: "https://www.xntrova.com/amazon-marketing-services/" },
    ],
    metricsBadge: "Multi-Channel Feed Sync",
  },
  {
    id: "smo",
    number: "05",
    title: "Social Media & Reputation (ORM)",
    categoryLabel: "Brand & Reputation",
    icon: ShieldCheck,
    bgColor: "#00455B",
    theme: "dark",
    headerText: "text-white",
    headerSub: "text-white/70",
    headerIconBg: "bg-white/10",
    headerIconColor: "text-[#FAAE39]",
    numberColor: "text-[#FAAE39]",
    cardBorder: "border-t border-white/15",
    dividerColor: "border-white/15",
    badgeDot: "bg-[#FAAE39]",
    badgeText: "text-[#FAAE39]",
    metricsText: "text-white/60",
    summaryText: "text-white/90",
    cardBoxBg: "bg-white/[0.06] border-white/12",
    cardBoxText: "text-white",
    cardBoxIcon: "text-[#FAAE39]",
    tagBg: "bg-white/10 text-white/80 border-white/15",
    ctaBg: "bg-[#FAAE39] text-[#001720] hover:bg-white",
    ctaIcon: "text-[#001720]",
    subLinkText: "text-white/80 hover:text-[#FAAE39]",
    summary:
      "Strategic executive storytelling, community engagement, and proactive sentiment defense that safeguard commercial trust.",
    deliverables: [
      "Executive brand narrative & multi-channel thought leadership",
      "Proactive sentiment monitoring & customer review governance",
      "Search result reputation defense & brand authority protection",
    ],
    tags: ["Executive Branding", "Sentiment Defense", "Review Governance", "Trust Protection"],
    subServices: [
      { name: "Online Reputation (ORM)", href: "https://www.xntrova.com/online-reputation-management/" },
    ],
    metricsBadge: "Proactive Sentiment Monitoring",
  },
  {
    id: "content",
    number: "06",
    title: "Content, Video & Lifecycle Email",
    categoryLabel: "Content & Retention",
    icon: FileText,
    bgColor: "#001720",
    theme: "dark",
    headerText: "text-white",
    headerSub: "text-white/70",
    headerIconBg: "bg-white/10",
    headerIconColor: "text-[#FAAE39]",
    numberColor: "text-[#FAAE39]",
    cardBorder: "border-t border-white/10",
    dividerColor: "border-white/10",
    badgeDot: "bg-[#FAAE39]",
    badgeText: "text-[#FAAE39]",
    metricsText: "text-white/50",
    summaryText: "text-white/90",
    cardBoxBg: "bg-white/[0.04] border-white/10",
    cardBoxText: "text-white/95",
    cardBoxIcon: "text-[#FAAE39]",
    tagBg: "bg-white/5 text-white/70 border-white/10",
    ctaBg: "bg-[#FAAE39] text-[#001720] hover:bg-white",
    ctaIcon: "text-[#001720]",
    subLinkText: "text-white/80 hover:text-[#FAAE39]",
    summary:
      "Commercial-intent articles, short-form video production, and automated lifecycle email sequences that nurture qualified pipeline.",
    deliverables: [
      "High-intent editorial clusters & authoritative thought pieces",
      "Engaging video production for LinkedIn, YouTube, and Meta",
      "Automated email nurture flows & customer lifecycle retention",
    ],
    tags: ["Topic Clusters", "Video Production", "Lifecycle Nurturing", "Pipeline Retention"],
    subServices: [
      { name: "Content Marketing", href: "https://www.xntrova.com/content-marketing/" },
    ],
    metricsBadge: "Cluster Topic Authority",
  },
];

/**
 * Scroll Progress Intervals for 6 Stacked Cards
 */
const CARD_INTERVALS = [
  { in: [0.0, 0.08, 0.18, 1.0], out: [1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.1, 0.18, 0.28, 0.36, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.28, 0.36, 0.46, 0.54, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.46, 0.54, 0.64, 0.72, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.64, 0.72, 0.82, 0.9, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.82, 0.9, 1.0], out: [0.0, 0.0, 1.0, 1.0] },
];

/**
 * ServiceHeader
 * Compact 56px height, hairline top border, title, numerical identifier, and icon.
 * Dynamically styled based on card's theme (light vs dark).
 */
function ServiceHeader({ service, onCardClick, index }) {
  const Icon = service.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onCardClick(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardClick(index);
        }
      }}
      style={{ height: `${PROJECT_HEADER_HEIGHT}px` }}
      className={`flex w-full shrink-0 cursor-pointer items-center justify-between px-6 select-none sm:px-8 lg:px-12 transition-colors duration-150 ${
        service.theme === "light"
          ? "hover:bg-[#001720]/[0.03]"
          : "hover:bg-white/[0.04]"
      }`}
      aria-label={`${service.number} ${service.title} — Click to expand`}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <span
          className={`xn-tabular font-mono text-sm font-semibold tracking-wider sm:text-base ${service.numberColor}`}
        >
          {service.number}
        </span>
        <h3
          className={`font-display text-sm font-medium uppercase tracking-tight sm:text-base lg:text-lg ${service.headerText}`}
        >
          {service.title}
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`hidden font-mono text-xs uppercase tracking-wider sm:inline-block ${service.headerSub}`}
        >
          {service.categoryLabel}
        </span>
        <div
          className={`flex size-8 items-center justify-center rounded-full ${service.headerIconBg}`}
        >
          <Icon className={`size-4 ${service.headerIconColor}`} />
        </div>
      </div>
    </div>
  );
}

/**
 * ServiceBody
 * Compact, premium card body without wasted empty space.
 * Content naturally determines height, perfectly filling available space with zero clipping.
 */
function ServiceBody({ service, flexGrow, onSelectService }) {
  const contentOpacity = useTransform(flexGrow, [0, 0.25, 1], [0, 0, 1]);
  const contentScale = useTransform(flexGrow, [0, 0.5, 1], [0.99, 0.995, 1]);

  return (
    <motion.div
      style={{
        opacity: contentOpacity,
        scale: contentScale,
      }}
      className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 sm:py-5 lg:px-12 lg:py-6"
    >
      {/* Upper Content Area */}
      <div className="space-y-3 sm:space-y-3.5">
        <div
          className={`flex flex-wrap items-center justify-between gap-2 border-b pb-2.5 ${service.dividerColor}`}
        >
          <div className="inline-flex items-center gap-2">
            <span className={`size-2 rounded-full ${service.badgeDot}`} />
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${service.badgeText}`}
            >
              {service.categoryLabel}
            </span>
          </div>
          <span className={`font-mono text-xs ${service.metricsText}`}>
            {service.metricsBadge}
          </span>
        </div>

        <p
          className={`max-w-4xl text-sm leading-relaxed sm:text-base ${service.summaryText}`}
        >
          {service.summary}
        </p>

        {/* Three Distinct Deliverables */}
        <div className="grid grid-cols-1 gap-2.5 pt-0.5 sm:grid-cols-3">
          {service.deliverables.map((item, dIdx) => (
            <div
              key={dIdx}
              className={`flex items-start gap-2.5 rounded border p-3 ${service.cardBoxBg}`}
            >
              <CheckCircle2
                className={`mt-0.5 size-4 shrink-0 ${service.cardBoxIcon}`}
              />
              <span
                className={`text-xs sm:text-[13px] leading-snug font-medium ${service.cardBoxText}`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Supporting Footer within Card: Clean Tags & Direct CTA */}
      <div
        className={`mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3 sm:mt-5 sm:pt-4 ${service.dividerColor}`}
      >
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded border px-2.5 py-0.5 font-mono text-[11px] ${service.tagBg}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {service.subServices?.map((sub) => (
            <a
              key={sub.name}
              href={sub.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${service.subLinkText}`}
            >
              <span>{sub.name}</span>
              <ExternalLink className="size-3" />
            </a>
          ))}
          <button
            type="button"
            onClick={() => onSelectService(service.title)}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-xs font-bold uppercase tracking-wider shadow transition-colors ${service.ctaBg}`}
          >
            <span>Request Audit</span>
            <ArrowRight className={`size-3.5 ${service.ctaIcon}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * ServiceStackCard
 * Sits flush edge-to-edge against adjacent cards with zero vertical gap, zero horizontal margin, and zero outer padding.
 * Its solid background color contributes directly to the vertical gradient of the complete stack.
 */
function ServiceStackCard({
  service,
  index,
  scrollYProgress,
  onSelectService,
  onCardClick,
}) {
  const interval = CARD_INTERVALS[index];
  const flexGrow = useTransform(scrollYProgress, interval.in, interval.out);

  return (
    <motion.div
      style={{
        flexGrow,
        flexShrink: 0,
        flexBasis: `${PROJECT_HEADER_HEIGHT}px`,
        backgroundColor: service.bgColor,
      }}
      className={`group relative flex w-full flex-col overflow-hidden ${service.cardBorder} first:border-t-0`}
    >
      <ServiceHeader
        service={service}
        onCardClick={onCardClick}
        index={index}
      />
      <ServiceBody
        service={service}
        flexGrow={flexGrow}
        onSelectService={onSelectService}
      />
    </motion.div>
  );
}

/**
 * ServicesSection
 * - Section heading & label PINNED inside the sticky stage, remaining visible across all 6 cards.
 * - Removed introductory paragraph & horizontal divider completely.
 * - Zero empty space: compact, balanced card bodies.
 * - Progressive light-to-dark palette (White -> Neutral -> Blue-Gray -> Brand Blue -> Deep Blue -> Darkest Navy).
 * - Exact Framer Motion useScroll + useTransform flexGrow architecture preserved.
 */
export default function ServicesSection({ onSelectService }) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [mobileOpenIdx, setMobileOpenIdx] = useState(0);

  // useScroll tracking the tall scroll-track container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleCardClick = (idx) => {
    if (!containerRef.current) return;
    const containerTop =
      window.scrollY + containerRef.current.getBoundingClientRect().top;
    const scrollable =
      containerRef.current.offsetHeight - window.innerHeight;

    // Direct scroll target mapping for each card
    const targetProgress =
      idx === 0
        ? 0.02
        : idx === SERVICES_DATA.length - 1
        ? 0.98
        : (idx + 0.45) / SERVICES_DATA.length;

    window.scrollTo({
      top: containerTop + targetProgress * scrollable,
      behavior: "smooth",
    });
  };

  return (
    <div id="services" className="relative w-full scroll-mt-16 sm:scroll-mt-[72px]">
      {/* 1. DESKTOP FULL-BLEED STACKED CARDS SCROLL TRACK WITH PINNED HEADING (md+) */}
      <section
        ref={containerRef}
        className="capabilities-scroll-track relative hidden h-[420vh] w-full md:block"
      >
        <div className="capabilities-sticky-stage sticky top-16 sm:top-[72px] flex h-[calc(100svh-4rem)] sm:h-[calc(100svh-4.5rem)] w-full flex-col overflow-hidden bg-white">
          {/* PINNED SECTION HEADER: Stays visible while exploring all 6 cards */}
          <div className="capabilities-pinned-header flex w-full shrink-0 items-center justify-between border-b border-[#001720]/10 bg-white/95 px-6 py-3 backdrop-blur-md sm:px-8 sm:py-3.5 lg:px-12">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4 lg:gap-6">
              <div className="inline-flex items-center gap-2">
                <span className="size-2 bg-[#0075A2]" aria-hidden="true" />
                <span className="xn-tabular font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0075A2]">
                  Core Capabilities
                </span>
              </div>
              <h2
                id="services-heading"
                className="font-display text-base font-semibold tracking-tight text-[#001720] sm:text-lg lg:text-xl"
              >
                Six Integrated Disciplines for Commercial Scale.
              </h2>
            </div>
            <div className="hidden font-mono text-xs uppercase tracking-wider text-[#5A707A] md:block">
              01 — 06 Integrated Stack
            </div>
          </div>

          {/* Full-width, gap-free continuous vertical stack */}
          <div className="flex min-h-0 flex-1 w-full flex-col">
            {SERVICES_DATA.map((service, index) => (
              <ServiceStackCard
                key={service.id}
                service={service}
                index={index}
                scrollYProgress={scrollYProgress}
                onSelectService={onSelectService}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. MOBILE ACCORDION STAGE (< md) — Full Bleed Edge-to-Edge Stack */}
      <section className="capabilities-mobile block w-full md:hidden">
        {/* Compact mobile heading: zero intro paragraph, zero divider line */}
        <div className="w-full bg-[#F4F8FA] border-b border-[#001720]/10 px-6 py-5">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="size-2 bg-[#0075A2]" aria-hidden="true" />
            <span className="xn-tabular font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0075A2]">
              Core Capabilities
            </span>
          </div>
          <h2 className="font-display text-xl font-bold tracking-tight text-[#001720]">
            Six Integrated Disciplines for Commercial Scale.
          </h2>
        </div>

        <div className="flex w-full flex-col">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              style={{ backgroundColor: service.bgColor }}
              className={`w-full ${service.cardBorder} first:border-t-0`}
            >
              <button
                type="button"
                onClick={() =>
                  setMobileOpenIdx((prev) => (prev === idx ? -1 : idx))
                }
                className={`flex h-14 w-full items-center justify-between px-6 text-left select-none transition-colors ${
                  service.theme === "light"
                    ? "hover:bg-[#001720]/[0.03]"
                    : "hover:bg-white/[0.04]"
                }`}
                aria-expanded={mobileOpenIdx === idx}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`xn-tabular font-mono text-xs font-semibold ${service.numberColor}`}
                  >
                    {service.number}
                  </span>
                  <h3
                    className={`font-display text-sm font-medium uppercase tracking-tight ${service.headerText}`}
                  >
                    {service.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = service.icon;
                    return (
                      <Icon className={`size-4 ${service.headerIconColor}`} />
                    );
                  })()}
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      service.theme === "light"
                        ? "text-[#4A606A]"
                        : "text-white/60"
                    } ${mobileOpenIdx === idx ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {mobileOpenIdx === idx && (
                <div
                  className={`space-y-3.5 border-t px-6 pt-3.5 pb-5 ${service.dividerColor}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${service.badgeText}`}
                    >
                      {service.categoryLabel}
                    </span>
                    <span className={`font-mono text-[10px] ${service.metricsText}`}>
                      {service.metricsBadge}
                    </span>
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${service.summaryText}`}
                  >
                    {service.summary}
                  </p>

                  <div className="space-y-2">
                    {service.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className={`flex items-start gap-2 rounded p-2.5 text-xs ${service.cardBoxBg}`}
                      >
                        <CheckCircle2
                          className={`mt-0.5 size-3.5 shrink-0 ${service.cardBoxIcon}`}
                        />
                        <span className={`font-medium ${service.cardBoxText}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded border px-2 py-0.5 font-mono text-[10px] ${service.tagBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`flex items-center justify-between border-t pt-3 ${service.dividerColor}`}
                  >
                    {service.subServices?.[0] && (
                      <a
                        href={service.subServices[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${service.subLinkText}`}
                      >
                        <span>{service.subServices[0].name}</span>
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className={`inline-flex items-center gap-1.5 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow ${service.ctaBg}`}
                    >
                      <span>Audit</span>
                      <ArrowRight className={`size-3 ${service.ctaIcon}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
