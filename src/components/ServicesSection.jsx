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
 *   1. Normal-flow section introduction (scrolls away naturally).
 *   2. Scroll track whose height is proportional to the number of cards.
 *   3. Sticky full-viewport stack inside the track. Each card's flexGrow is
 *      driven by useScroll/useTransform; headers stay PROJECT_HEADER_HEIGHT tall.
 *   4. Page flow resumes after the track ends.
 */

const PROJECT_HEADER_HEIGHT = 64;
// Short viewports (< 760px tall) tighten collapsed headers to 52px so the
// expanded card still has room for its full content.
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
 * Card surfaces: a continuous sea-blue → deep navy progression. Each card's
 * gradient ends on the next card's starting tone, so the stack reads as one
 * surface with no seams, gaps or margins.
 */
const CARD_TONES = ["#0B6A8C", "#09597A", "#074A66", "#063A52", "#052633", "#001720", "#00111A"];

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

const SERVICES = RAW_CORE_SERVICES.map((service, index) => ({
  ...service,
  ...SERVICE_DETAILS[service.id],
  Icon: PROJECT_ICONS[service.id],
  toneFrom: CARD_TONES[index],
  toneTo: CARD_TONES[index + 1],
}));

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

function ProjectHeader({ service, onActivate }) {
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-4 sm:gap-6">
        <span className="xn-tabular font-mono text-sm font-semibold tracking-wider text-[#FAAE39]">
          {service.number}
        </span>
        <span className="font-display text-[15px] leading-tight font-medium sm:text-lg tracking-[-0.02em] text-white lg:text-xl">
          {service.title}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="xn-tabular hidden shrink-0 font-mono text-xs tracking-[0.2em] text-white/35 sm:inline"
      >
        {service.number} / {String(TOTAL).padStart(2, "0")}
      </span>
    </>
  );

  const className =
    "flex w-full shrink-0 items-center justify-between gap-4 border-t border-white/10 px-5 text-left sm:px-8 lg:px-12";

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
        className={`${className} cursor-pointer transition-colors hover:bg-white/[0.04]`}
      >
        {content}
      </button>
    </h3>
  );
}

function ProjectBody({ service, onSelectService }) {
  const Icon = service.Icon;

  return (
    <div className="grid h-full grid-cols-1 gap-x-10 gap-y-5 px-5 pt-3 pb-6 sm:px-8 md:grid-cols-12 lg:px-12 lg:pt-3 lg:pb-5">
      {/* Category, icon, description and CTA */}
      <div className="flex min-w-0 flex-col md:col-span-12 lg:col-span-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center border border-white/15 bg-white/[0.06]">
            <Icon className="size-4 text-[#22D3EE]" aria-hidden="true" />
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7FDDF0]">
            {"// "}
            {service.category}
          </span>
        </div>

        <p className="mt-4 max-w-xl font-display text-lg leading-snug tracking-[-0.02em] text-white sm:text-xl lg:text-[1.125rem] xl:text-[1.3rem] 2xl:text-[1.45rem]">
          {service.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 lg:mt-auto lg:pt-4">
          <button
            type="button"
            onClick={() => onSelectService(service.title)}
            className="xn-press inline-flex min-h-11 items-center gap-2.5 bg-[#FAAE39] px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#001720] transition-colors hover:bg-white"
          >
            <span>Request Audit</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
          <a
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-white/85 transition-colors hover:text-[#FAAE39]"
          >
            <span>Explore {service.title}</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Deliverables */}
      <div className="min-w-0 md:col-span-7 lg:col-span-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
          What we deliver
        </p>
        <ul className="mt-2 divide-y divide-white/10 border-y border-white/10">
          {service.deliverables.map((item, idx) => (
            <li key={item} className="flex items-baseline gap-3 py-2.5 text-sm leading-snug text-white/90">
              <span className="xn-tabular font-mono text-[11px] text-[#FAAE39]">
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
          <div className="border border-white/12 bg-white/[0.05] px-4 py-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Related services
            </p>
            <ul className="mt-1">
              {service.subServices.map((sub) => (
                <li key={sub.href}>
                  <a
                    href={sub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 items-center gap-1 text-[13px] font-semibold text-white transition-colors hover:text-[#FAAE39]"
                  >
                    <span>{sub.name}</span>
                    <ArrowUpRight className="size-3 text-[#FAAE39]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="flex flex-wrap gap-1.5" aria-label={`${service.title} focus areas`}>
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="border border-white/15 px-2.5 py-1 font-mono text-[11px] text-white/75"
            >
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
        backgroundImage: `linear-gradient(180deg, ${service.toneFrom} 0%, ${service.toneTo} 100%)`,
      }}
      className="relative flex min-h-0 w-full flex-col overflow-hidden"
    >
      <ProjectHeader service={service} onActivate={() => onActivate(index)} />
      <motion.div
        style={{ opacity: bodyOpacity }}
        className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
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
      aria-labelledby="services-heading"
      className="relative scroll-mt-16 bg-[#001720] sm:scroll-mt-[72px]"
    >
      {/* 1. Section introduction — normal document flow, never sticky */}
      <div className="bg-[linear-gradient(180deg,#F4F8FA_0%,#E4EFF4_70%,#CFE2EA_100%)]">
        <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-12 sm:px-8 sm:pt-20 sm:pb-14 lg:px-12 lg:pt-24 lg:pb-16">
          <div className="inline-flex items-center gap-2">
            <span className="size-2 bg-[#0075A2]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0075A2] sm:text-xs">
              Core Capabilities
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-10">
            <h2
              id="services-heading"
              className="font-display text-3xl font-medium leading-[1.06] tracking-[-0.035em] text-[#001720] sm:text-4xl lg:col-span-8 xl:text-[3.25rem]"
            >
              Six Integrated Disciplines for Commercial Scale.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[#233C47] sm:text-base lg:col-span-4 lg:justify-self-end">
              Search, paid media, web engineering, commerce, reputation and
              content — planned and measured as one growth engine.
            </p>
          </div>
        </div>
      </div>

      {/* 2 + 3. Scroll track with sticky full-viewport stack (see .xn-stack-track for the viewport rule) */}
      <div
        ref={trackRef}
        style={{ height: `${TOTAL * 100}svh` }}
        className="xn-stack-track relative"
      >
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] w-full flex-col overflow-hidden [--stack-header:64px] sm:top-[72px] sm:h-[calc(100svh-72px)] [@media(max-height:779px)]:[--stack-header:52px]">
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

      {/* Small or short viewports: same cards, fully expanded, still edge-to-edge */}
      <div className="xn-stack-static flex-col">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            aria-label={service.title}
            style={{
              backgroundImage: `linear-gradient(180deg, ${service.toneFrom} 0%, ${service.toneTo} 100%)`,
            }}
            className="w-full"
          >
            <ProjectHeader service={service} />
            <ProjectBody service={service} onSelectService={onSelectService} />
          </article>
        ))}
      </div>
    </section>
  );
}
