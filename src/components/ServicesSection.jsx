"use client";

import { useRef, useState, useEffect } from "react";
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
import { RAW_CORE_SERVICES } from "@/data/xntrova-data";

/**
 * Verified Six Integrated Disciplines Data Model for Xntrova
 */
const SERVICES_DATA = [
  {
    id: "seo",
    number: "01",
    title: "Search Engine Optimization",
    categoryLabel: "Organic Growth",
    icon: Search,
    accentColor: "#0075A2",
    accentBorder: "border-[#0075A2]/30",
    bgClass: "bg-[#031C28]",
    summary:
      "Long-term organic visibility through technical site architecture, high-intent keyword mapping, and authoritative link acquisition.",
    deliverables: [
      "Technical SEO audit & crawlability governance",
      "High-intent keyword mapping & search architecture",
      "Authoritative link acquisition & digital PR",
    ],
    tags: ["Technical SEO", "Local Search", "Authority Building", "Keyword Architecture"],
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
    accentColor: "#C82318",
    accentBorder: "border-[#C82318]/30",
    bgClass: "bg-[#061F2C]",
    summary:
      "High-intent Google, Meta, and LinkedIn campaigns engineered to capture demand at the exact moment buyers are ready to act.",
    deliverables: [
      "Google Search & Performance Max campaign architecture",
      "Targeted LinkedIn & Meta media funnels for decision-makers",
      "Server-side conversion tracking & GA4/GTM telemetry",
    ],
    tags: ["Google Ads", "Meta Ads", "LinkedIn B2B", "Performance Max", "CAPI"],
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
    accentColor: "#0075A2",
    accentBorder: "border-[#0075A2]/30",
    bgClass: "bg-[#031E2A]",
    summary:
      "Fast, responsive, SEO-ready websites and custom web applications built for seamless user experience and B2B lead conversion.",
    deliverables: [
      "Responsive B2B web engineering & modern UI architecture",
      "Core Web Vitals speed & conversion-rate optimization (CRO)",
      "Custom web application development & API integrations",
    ],
    tags: ["Next.js / React", "Full-Stack", "Core Web Vitals", "API Architecture"],
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
    accentColor: "#FAAE39",
    accentBorder: "border-[#FAAE39]/30",
    bgClass: "bg-[#07212F]",
    summary:
      "Product feed optimization, marketplace sponsored ads, and checkout conversion tactics that turn catalog browsers into repeat buyers.",
    deliverables: [
      "Storefront conversion rate optimization & checkout UX",
      "Amazon sponsored ads & marketplace scaling",
      "Google Shopping feed governance & dynamic remarketing",
    ],
    tags: ["Amazon Ads", "Shopify / WooCommerce", "Google Shopping", "CRO"],
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
    accentColor: "#C82318",
    accentBorder: "border-[#C82318]/30",
    bgClass: "bg-[#051E2B]",
    summary:
      "Creative social storytelling, community growth, and proactive online reputation management that strengthen commercial brand trust.",
    deliverables: [
      "Executive brand storytelling & multi-channel distribution",
      "Review governance & proactive sentiment defense",
      "Brand crisis mitigation & search result reputation cleanup",
    ],
    tags: ["Executive Social", "ORM Protocol", "Sentiment Defense", "Brand Trust"],
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
    accentColor: "#0075A2",
    accentBorder: "border-[#0075A2]/30",
    bgClass: "bg-[#04202D]",
    summary:
      "Editorial articles, infographics, video campaigns, and automated email journeys aligned with your brand voice and commercial search goals.",
    deliverables: [
      "High-intent editorial content & SEO topic clusters",
      "Short & long-form video production for engagement",
      "Automated lifecycle email nurturing & retention workflows",
    ],
    tags: ["Content Clusters", "Video Production", "Lifecycle Email", "B2B Retention"],
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
  { in: [0.0, 0.1, 0.18, 1.0], out: [1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.1, 0.18, 0.28, 0.36, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.28, 0.36, 0.46, 0.54, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.46, 0.54, 0.64, 0.72, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.64, 0.72, 0.82, 0.9, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.82, 0.9, 1.0], out: [0.0, 0.0, 1.0, 1.0] },
];

/**
 * Desktop Stacked Card Component driven by Framer Motion scroll transforms
 */
function DesktopStackedCard({
  service,
  index,
  scrollYProgress,
  onSelectService,
  onCardClick,
}) {
  const Icon = service.icon;
  const interval = CARD_INTERVALS[index];

  // Map progress to flexGrow
  const flexGrow = useTransform(scrollYProgress, interval.in, interval.out);

  // Map flexGrow to content opacity and slight scaling
  const contentOpacity = useTransform(flexGrow, [0, 0.25, 1], [0, 0, 1]);
  const contentScale = useTransform(flexGrow, [0, 0.5, 1], [0.98, 0.99, 1]);

  return (
    <motion.div
      style={{
        flexGrow,
        flexShrink: 0,
        flexBasis: "60px",
      }}
      className={`group relative flex flex-col overflow-hidden rounded-lg border ${service.accentBorder} ${service.bgClass} shadow-xl backdrop-blur-sm transition-colors duration-200`}
    >
      {/* Fixed-Height Card Header */}
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
        className="flex h-[60px] shrink-0 cursor-pointer items-center justify-between border-b border-white/10 px-6 select-none sm:px-8 hover:bg-white/[0.03]"
        aria-label={`${service.number} ${service.title} — Click to expand`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="xn-tabular font-mono text-xs font-semibold tracking-wider text-[#FAAE39] sm:text-sm">
            {service.number}
          </span>
          <h3 className="font-display text-sm font-medium uppercase tracking-tight text-white sm:text-base lg:text-lg">
            {service.title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[11px] uppercase tracking-wider text-white/60 sm:inline-block">
            {service.categoryLabel}
          </span>
          <div className="flex size-7 items-center justify-center rounded-full bg-white/10 sm:size-8">
            <Icon className="size-3.5 text-[#FAAE39] sm:size-4" />
          </div>
        </div>
      </div>

      {/* Expandable Service Body — Calibrated for complete visibility with zero clipping */}
      <motion.div
        style={{
          opacity: contentOpacity,
          scale: contentScale,
        }}
        className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-6 py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 sm:py-4"
      >
        {/* Main Content Area */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FAAE39]">
              <span className="size-1.5 rounded-full bg-[#FAAE39]" />
              {service.categoryLabel}
            </span>
            <span className="font-mono text-xs text-white/50">
              {service.metricsBadge}
            </span>
          </div>

          <p className="max-w-3xl text-xs leading-relaxed text-white/85 sm:text-sm">
            {service.summary}
          </p>

          {/* Three Key Deliverables */}
          <div className="grid grid-cols-1 gap-2 pt-0.5 sm:grid-cols-3 sm:gap-3">
            {service.deliverables.map((item, dIdx) => (
              <div
                key={dIdx}
                className="flex items-start gap-2 rounded-md border border-white/10 bg-white/[0.04] p-2.5"
              >
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#FAAE39]" />
                <span className="text-xs leading-snug text-white/95">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting Footer within Card: Tags & Direct CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {service.subServices?.map((sub) => (
              <a
                key={sub.name}
                href={sub.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 transition-colors hover:text-[#FAAE39]"
              >
                <span>{sub.name}</span>
                <ExternalLink className="size-3 text-[#FAAE39]" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => onSelectService(service.title)}
              className="inline-flex items-center gap-2 rounded bg-[#FAAE39] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#001720] shadow transition-colors hover:bg-[#ffbe5c]"
            >
              <span>Request Audit</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Mobile Sequential Accordion Card (< 768px)
 */
function MobileServiceCard({
  service,
  isOpen,
  onToggle,
  onSelectService,
}) {
  const Icon = service.icon;

  return (
    <div
      className={`overflow-hidden rounded-lg border ${service.accentBorder} ${service.bgClass} shadow-md`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left select-none hover:bg-white/[0.02]"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="xn-tabular font-mono text-xs font-semibold text-[#FAAE39]">
            {service.number}
          </span>
          <h3 className="font-display text-sm font-medium uppercase tracking-tight text-white">
            {service.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-[#FAAE39]" />
          <ChevronDown
            className={`size-4 text-white/60 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="space-y-4 border-t border-white/10 px-4 pt-3 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FAAE39]">
              {service.categoryLabel}
            </span>
            <span className="font-mono text-[10px] text-white/50">
              {service.metricsBadge}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-white/80">
            {service.summary}
          </p>

          <div className="space-y-2">
            {service.deliverables.map((item, dIdx) => (
              <div
                key={dIdx}
                className="flex items-start gap-2 rounded bg-white/[0.03] p-2.5 text-xs text-white/90"
              >
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#FAAE39]" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            {service.subServices?.[0] && (
              <a
                href={service.subServices[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/80 hover:text-[#FAAE39]"
              >
                <span>{service.subServices[0].name}</span>
                <ExternalLink className="size-3 text-[#FAAE39]" />
              </a>
            )}
            <button
              type="button"
              onClick={() => onSelectService(service.title)}
              className="inline-flex items-center gap-1.5 rounded bg-[#FAAE39] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#001720]"
            >
              <span>Audit</span>
              <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Main Core Capabilities Section:
 * - Heading is in normal document flow (capabilities-intro).
 * - Sticky stage is dedicated solely to the 6 stacked cards (capabilities-scroll-track).
 * - Continuous background gradient: Top white/pale neutral -> middle pale blue & teal -> bottom deep navy (#001720).
 * - Framer Motion useScroll + useTransform flexGrow model preserved exactly.
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
    <div
      id="services"
      className="relative text-white"
      style={{
        background:
          "linear-gradient(180deg, #F4F8FA 0%, #D8EAF2 14%, #A2C8D9 30%, #5292AD 48%, #164E63 66%, #082F40 84%, #001720 100%)",
      }}
    >
      {/* 1A: CAPABILITIES INTRO — NORMAL DOCUMENT FLOW (NOT STICKY) */}
      <section className="capabilities-intro mx-auto max-w-[1440px] px-4 pt-20 pb-10 sm:px-8 sm:pt-28 sm:pb-12 lg:px-12 lg:pt-32">
        <div className="flex flex-col justify-between gap-4 border-b border-[#001720]/15 pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="size-2 bg-[#0075A2]" aria-hidden="true" />
              <span className="xn-tabular text-xs font-semibold uppercase tracking-[0.24em] text-[#0075A2]">
                Core Capabilities
              </span>
            </div>
            <h2
              id="services-heading"
              className="mt-2 font-display text-3xl font-medium tracking-[-0.03em] text-[#001720] sm:text-4xl lg:text-5xl"
            >
              Six Integrated Disciplines for Commercial Scale.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[#233C47]">
            Scroll to explore our six integrated disciplines. Each capability operates as a precision component of your commercial growth engine.
          </p>
        </div>
      </section>

      {/* 1B & 1C: CAPABILITIES SCROLL TRACK — STICKY STAGE FOR CARDS ONLY (md+) */}
      <section
        ref={containerRef}
        className="capabilities-scroll-track relative hidden h-[420vh] w-full md:block"
      >
        <div className="capabilities-sticky-stage sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden px-4 py-6 sm:px-8 lg:px-12">
          {/* Six Vertically Stacked Service Cards */}
          <div className="flex h-[calc(100vh-64px)] max-h-[760px] min-h-[520px] w-full flex-col gap-2.5 lg:gap-3">
            {SERVICES_DATA.map((service, index) => (
              <DesktopStackedCard
                key={service.id}
                service={service}
                index={index}
                scrollYProgress={scrollYProgress}
                onSelectService={onSelectService}
                onCardClick={handleCardClick}
              />
            ))}
          </div>

          {/* Subtle Bottom Status Indicator */}
          <div className="mt-2 flex shrink-0 items-center justify-between border-t border-white/10 pt-2 text-[11px] font-mono text-white/50">
            <span>Scroll or click card headers to inspect disciplines</span>
            <span>01 — 06 Integrated System</span>
          </div>
        </div>
      </section>

      {/* MOBILE ACCORDION STAGE (< md) */}
      <section className="capabilities-mobile block px-4 pt-4 pb-16 sm:px-8 md:hidden">
        <div className="space-y-3">
          {SERVICES_DATA.map((service, idx) => (
            <MobileServiceCard
              key={service.id}
              service={service}
              isOpen={mobileOpenIdx === idx}
              onToggle={() =>
                setMobileOpenIdx((prev) => (prev === idx ? -1 : idx))
              }
              onSelectService={onSelectService}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
