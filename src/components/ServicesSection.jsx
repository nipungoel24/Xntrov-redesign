"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Target,
  Code2,
  ShoppingCart,
  ShieldCheck,
  FileText,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { RAW_CORE_SERVICES } from "@/data/xntrova-data";

/**
 * Core Capabilities — stacked-card scroll interaction.
 *
 * Structure (adapted from the supplied ProjectsSection template):
 *   1. Scroll track whose height is proportional to the number of cards.
 *   2. Sticky viewport-height stage inside the track holding ONE composition:
 *      the section introduction on top, the six-card stack filling the rest.
 *   3. Each card's flexGrow is driven by useScroll/useTransform over the track;
 *      headers stay PROJECT_HEADER_HEIGHT tall, the active body takes the rest.
 *   4. Page flow resumes after the track ends.
 */

const PROJECT_HEADER_HEIGHT = 64;
// Below 900px of height (or under 1024px wide) collapsed headers tighten to
// 52px so the expanded card keeps room for all of its content.
const HEADER_HEIGHT = `var(--stack-header, ${PROJECT_HEADER_HEIGHT}px)`;

const PROJECT_ICONS = {
  seo: Search,
  ppc: Target,
  "web-dev": Code2,
  ecommerce: ShoppingCart,
  smo: ShieldCheck,
  content: FileText,
};

/**
 * Card surfaces run from the pale mist of the intro (top) into deep navy
 * (bottom): two pale-blue cards, a mid sea-blue, brand blue, then navy.
 * Each card's own gradient moves toward the next card's tone.
 */
const CARD_SURFACES = [
  { from: "#EEF5F9", to: "#DFECF3", light: true },
  { from: "#D3E5EE", to: "#BFD9E6", light: true },
  { from: "#A6C9DA", to: "#8EBACF", light: true },
  { from: "#0075A2", to: "#00668D", light: false },
  { from: "#004D66", to: "#003B50", light: false },
  { from: "#032C3C", to: "#001720", light: false },
];

const LIGHT = {
  number: "text-[#0075A2]",
  title: "text-[#001720]",
  muted: "text-[#001720]/45",
  border: "border-[#001720]/12",
  hover: "hover:bg-[#001720]/[0.04]",
  label: "text-[#005A7D]",
  iconBox: "border-[#001720]/15 bg-white/60",
  icon: "text-[#0075A2]",
  body: "text-[#001720]",
  item: "text-[#0C2A36]",
  index: "text-[#0075A2]",
  divider: "divide-[#001720]/12 border-[#001720]/12",
  caption: "text-[#233C47]",
  panel: "border-[#001720]/12 bg-white/55",
  link: "text-[#001720] hover:text-[#0075A2]",
  linkIcon: "text-[#0075A2]",
  tag: "border-[#001720]/20 text-[#233C47]",
  secondary: "text-[#001720] hover:text-[#0075A2]",
};

const DARK = {
  number: "text-[#FAAE39]",
  title: "text-white",
  muted: "text-white/40",
  border: "border-white/12",
  hover: "hover:bg-white/[0.05]",
  label: "text-[#7FDDF0]",
  iconBox: "border-white/15 bg-white/[0.06]",
  icon: "text-[#22D3EE]",
  body: "text-white",
  item: "text-white/90",
  index: "text-[#FAAE39]",
  divider: "divide-white/12 border-white/12",
  caption: "text-white/65",
  panel: "border-white/12 bg-white/[0.06]",
  link: "text-white hover:text-[#FAAE39]",
  linkIcon: "text-[#FAAE39]",
  tag: "border-white/20 text-white/80",
  secondary: "text-white/90 hover:text-[#FAAE39]",
};

/**
 * Service-specific content. Descriptions, capabilities and links come from the
 * verified service inventory in xntrova-data; deliverables and tags restate the
 * existing site copy for each discipline. No metrics or results are claimed.
 */
const SERVICE_DETAILS = {
  seo: {
    category: "Organic Growth",
    deliverables: [
      "Technical SEO audits, crawlability & schema architecture",
      "High-intent keyword mapping & search-intent clusters",
      "Authoritative link acquisition & digital PR",
    ],
    tags: ["Technical SEO", "Local SEO", "Schema", "Link Building"],
  },
  ppc: {
    category: "Paid Acquisition",
    deliverables: [
      "Google Search & Performance Max campaign architecture",
      "Meta & LinkedIn funnels for B2B decision-makers",
      "GA4 / GTM conversion tracking & server-side telemetry",
    ],
    tags: ["Google Ads", "Performance Max", "Meta Ads", "LinkedIn Ads"],
  },
  "web-dev": {
    category: "Web Engineering",
    deliverables: [
      "Responsive, SEO-ready B2B websites",
      "Core Web Vitals speed tuning & conversion-rate optimisation",
      "Custom web & app engineering with API integrations",
    ],
    tags: ["Next.js / React", "Core Web Vitals", "CRO", "API Integrations"],
  },
  ecommerce: {
    category: "Commerce",
    deliverables: [
      "Storefront checkout UX & conversion-rate optimisation",
      "Amazon sponsored ads & marketplace scaling",
      "Google Shopping feeds & dynamic remarketing",
    ],
    tags: ["Amazon Ads", "Shopify / WooCommerce", "Google Shopping", "Remarketing"],
  },
  smo: {
    category: "Brand & Reputation",
    deliverables: [
      "Brand storytelling & multi-channel social distribution",
      "Influencer collaborations & community growth",
      "Review governance & proactive reputation management",
    ],
    tags: ["Social Media", "Influencers", "ORM", "Brand Trust"],
  },
  content: {
    category: "Content & Retention",
    deliverables: [
      "SEO editorial, copywriting & topic clusters",
      "Video campaigns & visual design",
      "Automated lifecycle email journeys",
    ],
    tags: ["Content Marketing", "Video", "Email Automation", "Graphic Design"],
  },
};

const SERVICES = RAW_CORE_SERVICES.map((service, index) => {
  const surface = CARD_SURFACES[index];
  return {
    ...service,
    ...SERVICE_DETAILS[service.id],
    Icon: PROJECT_ICONS[service.id],
    surface,
    tone: surface.light ? LIGHT : DARK,
  };
});

const TOTAL = SERVICES.length;
const SEGMENT = 1 / TOTAL;
// Portion of each segment boundary used to hand over from one card to the next.
const HANDOFF = SEGMENT * 0.4;

/**
 * Scroll-progress → flexGrow mapping. Card i owns segment [i/n, (i+1)/n].
 * At each boundary the outgoing card contracts while the incoming card grows,
 * so the summed flexGrow is always 1 and the stack never shows empty space.
 */
function getFlexGrowRange(index) {
  const start = index * SEGMENT;
  const end = (index + 1) * SEGMENT;
  if (index === 0) {
    return { input: [0, end - HANDOFF / 2, end + HANDOFF / 2, 1], output: [1, 1, 0, 0] };
  }
  if (index === TOTAL - 1) {
    return { input: [0, start - HANDOFF / 2, start + HANDOFF / 2, 1], output: [0, 0, 1, 1] };
  }
  return {
    input: [0, start - HANDOFF / 2, start + HANDOFF / 2, end - HANDOFF / 2, end + HANDOFF / 2, 1],
    output: [0, 0, 1, 1, 0, 0],
  };
}

function surfaceStyle(service) {
  return {
    backgroundImage: `linear-gradient(180deg, ${service.surface.from} 0%, ${service.surface.to} 100%)`,
  };
}

function SectionIntro({ headingId, compact }) {
  return (
    <div
      className={`border-b border-[#001720]/10 bg-[linear-gradient(180deg,#F4F8FA_0%,#EEF5F9_100%)] px-5 sm:px-8 lg:px-12 ${
        compact
          ? "shrink-0 pt-5 pb-4 [@media(min-height:900px)]:pt-7 [@media(min-height:900px)]:pb-5"
          : "pt-14 pb-8 sm:pt-16"
      }`}
    >
      <div className="grid grid-cols-1 items-end gap-x-10 gap-y-3 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2">
            <span className="size-2 bg-[#0075A2]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0075A2] sm:text-xs">
              Core Capabilities
            </span>
          </div>
          <h2
            id={headingId}
            className={`mt-2 font-display font-medium leading-[1.05] tracking-[-0.035em] text-[#001720] ${
              compact
                ? "text-[1.75rem] sm:text-[2rem] lg:text-[clamp(1.35rem,2.05vw,2.6rem)]"
                : "text-3xl sm:text-4xl"
            }`}
          >
            Six Integrated Disciplines for Commercial Scale.
          </h2>
        </div>
        <p
          className={`max-w-sm leading-relaxed text-[#233C47] lg:col-span-4 lg:justify-self-end ${
            compact ? "text-[13px] xl:text-sm" : "text-sm"
          }`}
        >
          Search, paid media, web, commerce, reputation and content — run as
          one measurable growth engine.
        </p>
      </div>
    </div>
  );
}

function ProjectHeader({ service, onActivate }) {
  const t = service.tone;
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-4 sm:gap-6">
        <span className={`xn-tabular font-mono text-sm font-semibold tracking-wider ${t.number}`}>
          {service.number}
        </span>
        <span
          className={`font-display text-[15px] leading-tight font-medium tracking-[-0.02em] sm:text-lg lg:text-xl ${t.title}`}
        >
          {service.title}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`xn-tabular hidden shrink-0 font-mono text-xs tracking-[0.2em] sm:inline ${t.muted}`}
      >
        {service.number} / {String(TOTAL).padStart(2, "0")}
      </span>
    </>
  );

  const className = `flex w-full shrink-0 items-center justify-between gap-4 border-t px-5 text-left sm:px-8 lg:px-12 ${t.border}`;

  if (!onActivate) {
    return (
      <h3 style={{ height: HEADER_HEIGHT }} className={className}>
        {content}
      </h3>
    );
  }

  return (
    <h3 className="m-0">
      <button
        type="button"
        onClick={onActivate}
        style={{ height: HEADER_HEIGHT }}
        className={`${className} cursor-pointer transition-colors ${t.hover}`}
      >
        {content}
      </button>
    </h3>
  );
}

/**
 * Expanded body. Spacing and the description size scale with viewport height
 * (vh-based clamps), so a tall stage is filled by the content itself rather
 * than by an empty band between the description and the CTA.
 */
function ProjectBody({ service, onSelectService }) {
  const t = service.tone;
  const Icon = service.Icon;

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-5 px-5 pt-[clamp(0.75rem,1.8vh,1.75rem)] pb-[clamp(1.25rem,2.6vh,2.25rem)] sm:px-8 md:grid-cols-12 lg:px-12 [@media(min-height:1000px)]:lg:pt-10 [@media(min-height:1000px)]:lg:pb-10">
      {/* Category, icon, description and CTA */}
      <div className="flex min-w-0 flex-col md:col-span-12 lg:col-span-5">
        <div className="flex items-center gap-3">
          <span className={`flex size-9 shrink-0 items-center justify-center border ${t.iconBox}`}>
            <Icon className={`size-4 ${t.icon}`} aria-hidden="true" />
          </span>
          <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.24em] ${t.label}`}>
            {"// "}
            {service.category}
          </span>
        </div>

        <p
          className={`mt-[clamp(0.75rem,1.6vh,1.5rem)] max-w-xl font-display text-lg leading-snug tracking-[-0.02em] sm:text-xl lg:text-[clamp(1.05rem,0.55rem+1.25vh,1.6rem)] [@media(min-height:1000px)]:lg:text-[2rem] ${t.body}`}
        >
          {service.summary}
        </p>

        <div className="mt-[clamp(1rem,2vh,1.75rem)] flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={() => onSelectService(service.title)}
            className="xn-press inline-flex min-h-11 items-center gap-2.5 bg-[#FAAE39] px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#001720] transition-colors hover:bg-[#001720] hover:text-white"
          >
            <span>Request Audit</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
          <a
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold transition-colors ${t.secondary}`}
          >
            <span>Explore {service.title}</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Deliverables */}
      <div className="min-w-0 md:col-span-7 lg:col-span-4">
        <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${t.caption}`}>
          What we deliver
        </p>
        <ul className={`mt-2 divide-y border-y ${t.divider}`}>
          {service.deliverables.map((item, idx) => (
            <li
              key={item}
              className={`flex items-baseline gap-3 py-[clamp(0.55rem,1.2vh,0.95rem)] text-sm leading-snug lg:text-[clamp(0.875rem,0.6rem+0.45vh,1rem)] [@media(min-height:1000px)]:lg:py-4 [@media(min-height:1000px)]:lg:text-[1.05rem] ${t.item}`}
            >
              <span className={`xn-tabular font-mono text-[11px] ${t.index}`}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related packages and focus tags */}
      <div className="flex min-w-0 flex-col gap-4 md:col-span-5 lg:col-span-3">
        {service.subServices?.length > 0 && (
          <div className={`border px-4 py-3 ${t.panel}`}>
            <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${t.caption}`}>
              Related services
            </p>
            <ul className="mt-1">
              {service.subServices.map((sub) => (
                <li key={sub.href}>
                  <a
                    href={sub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-8 items-center gap-1 text-[13px] font-semibold transition-colors ${t.link}`}
                  >
                    <span>{sub.name}</span>
                    <ArrowUpRight className={`size-3 ${t.linkIcon}`} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="flex flex-wrap gap-1.5" aria-label={`${service.title} focus areas`}>
          {service.tags.map((tag) => (
            <li key={tag} className={`border px-2.5 py-1 font-mono text-[11px] ${t.tag}`}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectStackCard({ service, index, scrollYProgress, onSelectService, onActivate }) {
  const { input, output } = getFlexGrowRange(index);
  const flexGrow = useTransform(scrollYProgress, input, output);
  const bodyOpacity = useTransform(flexGrow, [0, 0.35, 1], [0, 0, 1]);

  return (
    <motion.article
      aria-label={service.title}
      style={{
        flexGrow,
        flexShrink: 0,
        flexBasis: HEADER_HEIGHT,
        ...surfaceStyle(service),
      }}
      className="relative flex min-h-0 w-full flex-col overflow-hidden"
    >
      <ProjectHeader service={service} onActivate={() => onActivate(index)} />
      <motion.div style={{ opacity: bodyOpacity }} className="min-h-0 flex-1 overflow-hidden">
        <ProjectBody service={service} onSelectService={onSelectService} />
      </motion.div>
    </motion.article>
  );
}

export default function ServicesSection({ onSelectService }) {
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Scroll so the chosen card sits in the middle of its fully expanded range.
  const handleActivate = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const stage = track.firstElementChild;
    const trackTop = window.scrollY + track.getBoundingClientRect().top;
    const scrollable = track.offsetHeight - (stage?.offsetHeight ?? window.innerHeight);
    const progress = index === 0 ? 0 : index === TOTAL - 1 ? 1 : (index + 0.5) * SEGMENT;
    window.scrollTo({ top: trackTop + progress * scrollable, behavior: "smooth" });
  };

  return (
    <section
      id="services"
      aria-label="Core Capabilities"
      className="relative scroll-mt-16 bg-[#001720] sm:scroll-mt-[72px]"
    >
      {/* Scroll track + sticky stage: intro and stack stay together as one frame
          (see .xn-stack-track in globals.css for the viewport rule) */}
      <div ref={trackRef} style={{ height: `${TOTAL * 100}svh` }} className="xn-stack-track relative">
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] w-full flex-col overflow-hidden [--stack-header:64px] sm:top-[72px] sm:h-[calc(100svh-72px)] [@media(max-height:899px)]:[--stack-header:52px] [@media(max-width:1023px)]:[--stack-header:52px]">
          <SectionIntro headingId="services-heading" compact />
          <div className="flex min-h-0 flex-1 flex-col">
            {SERVICES.map((service, index) => (
              <ProjectStackCard
                key={service.id}
                service={service}
                index={index}
                scrollYProgress={scrollYProgress}
                onSelectService={onSelectService}
                onActivate={handleActivate}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Small or short viewports: same intro and cards, fully expanded, edge-to-edge */}
      <div className="xn-stack-static flex-col">
        <SectionIntro headingId="services-heading-static" />
        {SERVICES.map((service) => (
          <article key={service.id} aria-label={service.title} style={surfaceStyle(service)} className="w-full">
            <ProjectHeader service={service} />
            <ProjectBody service={service} onSelectService={onSelectService} />
          </article>
        ))}
      </div>
    </section>
  );
}
