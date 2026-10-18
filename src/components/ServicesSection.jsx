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
 * Height of collapsed service card header in pixels
 * Exactly matching the template reference: PROJECT_HEADER_HEIGHT = 64
 */
const PROJECT_HEADER_HEIGHT = 64;

/**
 * Six Integrated Disciplines Data Model for Xntrova
 * Progressive Card Palette transitioning seamlessly from deep sea navy to Xntrova blue:
 * - Card 01: Deepest sea navy — #001720
 * - Card 02: Deep blue navy   — #002431
 * - Card 03: Deep sea blue    — #003746
 * - Card 04: Brand blue       — #004D63
 * - Card 05: Ocean blue       — #00617B
 * - Card 06: Xntrova blue     — #0075A2
 */
const SERVICES_DATA = [
  {
    id: "seo",
    number: "01",
    title: "Search Engine Optimization",
    categoryLabel: "Organic Growth",
    icon: Search,
    bgColor: "#001720",
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
    bgColor: "#002431",
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
    bgColor: "#003746",
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
    bgColor: "#004D63",
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
    bgColor: "#00617B",
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
    bgColor: "#0075A2",
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
  { in: [0.0, 0.08, 0.18, 1.0], out: [1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.1, 0.18, 0.28, 0.36, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.28, 0.36, 0.46, 0.54, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.46, 0.54, 0.64, 0.72, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.64, 0.72, 0.82, 0.9, 1.0], out: [0.0, 0.0, 1.0, 1.0, 0.0, 0.0] },
  { in: [0.0, 0.82, 0.9, 1.0], out: [0.0, 0.0, 1.0, 1.0] },
];

/**
 * ServiceHeader (formerly ProjectHeader)
 * Fixed 64px height, hairline top border, title, numerical identifier, and icon
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
      className="flex w-full shrink-0 cursor-pointer items-center justify-between px-6 select-none sm:px-8 lg:px-12 hover:bg-white/[0.04] transition-colors duration-150"
      aria-label={`${service.number} ${service.title} — Click to expand`}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="xn-tabular font-mono text-sm font-semibold tracking-wider text-[#FAAE39] sm:text-base">
          {service.number}
        </span>
        <h3 className="font-display text-sm font-medium uppercase tracking-tight text-white sm:text-base lg:text-lg">
          {service.title}
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden font-mono text-xs uppercase tracking-wider text-white/60 sm:inline-block">
          {service.categoryLabel}
        </span>
        <div className="flex size-8 items-center justify-center rounded-full bg-white/10">
          <Icon className="size-4 text-[#FAAE39]" />
        </div>
      </div>
    </div>
  );
}

/**
 * ServiceBody (formerly ProjectBody)
 * Expandable card body calibrated to fully display deliverables, tags, links, and CTAs without clipping
 */
function ServiceBody({ service, flexGrow, onSelectService }) {
  const contentOpacity = useTransform(flexGrow, [0, 0.2, 1], [0, 0, 1]);
  const contentScale = useTransform(flexGrow, [0, 0.5, 1], [0.985, 0.995, 1]);

  return (
    <motion.div
      style={{
        opacity: contentOpacity,
        scale: contentScale,
      }}
      className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-6 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 sm:py-7 lg:px-12 lg:py-8"
    >
      {/* Upper Content Area */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#FAAE39]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#FAAE39]">
              {service.categoryLabel}
            </span>
          </div>
          <span className="font-mono text-xs text-white/50">
            {service.metricsBadge}
          </span>
        </div>

        <p className="max-w-4xl text-sm leading-relaxed text-white/90 sm:text-base">
          {service.summary}
        </p>

        {/* Three Key Deliverables */}
        <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
          {service.deliverables.map((item, dIdx) => (
            <div
              key={dIdx}
              className="flex items-start gap-2.5 rounded border border-white/10 bg-white/[0.04] p-3.5"
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#FAAE39]" />
              <span className="text-xs sm:text-sm leading-snug text-white/95">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Supporting Footer within Card: Tags & Direct CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {service.subServices?.map((sub) => (
            <a
              key={sub.name}
              href={sub.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 transition-colors hover:text-[#FAAE39]"
            >
              <span>{sub.name}</span>
              <ExternalLink className="size-3 text-[#FAAE39]" />
            </a>
          ))}
          <button
            type="button"
            onClick={() => onSelectService(service.title)}
            className="inline-flex items-center gap-2 rounded bg-[#FAAE39] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#001720] shadow transition-colors hover:bg-white"
          >
            <span>Request Audit</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * ServiceStackCard (formerly ProjectStackCard)
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

  // Map progress to flexGrow
  const flexGrow = useTransform(scrollYProgress, interval.in, interval.out);

  return (
    <motion.div
      style={{
        flexGrow,
        flexShrink: 0,
        flexBasis: `${PROJECT_HEADER_HEIGHT}px`,
        backgroundColor: service.bgColor,
      }}
      className="group relative flex w-full flex-col overflow-hidden border-t border-white/10 first:border-t-0"
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
 * ServicesSection (formerly ProjectsSection)
 * - Section heading & intro in normal document flow above the sticky stage.
 * - Sticky 100svh stage for the cards only.
 * - Full-bleed edge-to-edge vertical card stack with zero gap, zero margin, zero outer padding.
 * - Progressive solid palette: #001720 -> #002431 -> #003746 -> #004D63 -> #00617B -> #0075A2.
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
    <div id="services" className="relative w-full">
      {/* 1. SECTION HEADING & INTRO — NORMAL DOCUMENT FLOW (NOT STICKY) */}
      <section className="capabilities-intro w-full border-t border-[#DBE4E8] bg-[#F4F8FA] py-16 sm:py-20 lg:py-24 text-[#001720]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
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
        </div>
      </section>

      {/* 2. DESKTOP FULL-BLEED STACKED CARDS SCROLL TRACK (md+) */}
      <section
        ref={containerRef}
        className="capabilities-scroll-track relative hidden h-[420vh] w-full md:block"
      >
        <div className="capabilities-sticky-stage sticky top-16 sm:top-[72px] flex h-[calc(100svh-4rem)] sm:h-[calc(100svh-4.5rem)] w-full flex-col overflow-hidden">
          {/* Full-width, gap-free continuous vertical stack */}
          <div className="flex h-full w-full flex-col">
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

      {/* 3. MOBILE ACCORDION STAGE (< md) — Full Bleed Edge-to-Edge Stack */}
      <section className="capabilities-mobile block w-full md:hidden">
        <div className="flex w-full flex-col">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              style={{ backgroundColor: service.bgColor }}
              className="w-full border-t border-white/10 first:border-t-0"
            >
              <button
                type="button"
                onClick={() =>
                  setMobileOpenIdx((prev) => (prev === idx ? -1 : idx))
                }
                className="flex h-16 w-full items-center justify-between px-6 text-left select-none hover:bg-white/[0.04]"
                aria-expanded={mobileOpenIdx === idx}
              >
                <div className="flex items-center gap-3">
                  <span className="xn-tabular font-mono text-xs font-semibold text-[#FAAE39]">
                    {service.number}
                  </span>
                  <h3 className="font-display text-sm font-medium uppercase tracking-tight text-white">
                    {service.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = service.icon;
                    return <Icon className="size-4 text-[#FAAE39]" />;
                  })()}
                  <ChevronDown
                    className={`size-4 text-white/60 transition-transform duration-200 ${
                      mobileOpenIdx === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {mobileOpenIdx === idx && (
                <div className="space-y-4 border-t border-white/10 px-6 pt-4 pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FAAE39]">
                      {service.categoryLabel}
                    </span>
                    <span className="font-mono text-[10px] text-white/50">
                      {service.metricsBadge}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-white/90">
                    {service.summary}
                  </p>

                  <div className="space-y-2">
                    {service.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2 rounded bg-white/[0.04] p-2.5 text-xs text-white/95"
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
                      className="inline-flex items-center gap-1.5 rounded bg-[#FAAE39] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#001720]"
                    >
                      <span>Audit</span>
                      <ArrowRight className="size-3" />
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
