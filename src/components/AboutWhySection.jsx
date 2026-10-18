"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Verified Xntrova Metrics & Strategic Pillars for the Tresmares-inspired
 * scroll-driven editorial metrics ledger (Priority 5).
 * Every metric and statement below comes strictly from verified Xntrova data.
 */
const VERIFIED_METRIC_PANELS = [
  {
    id: "metric-traffic",
    index: "01",
    metric: "+250%",
    accent: "crimson",
    label: "Organic Traffic Growth",
    pillar: "Creative Ideas & Search Authority",
    detail:
      "Compounding search visibility and distinctive brand narratives engineered for long-term category leadership.",
  },
  {
    id: "metric-projects",
    index: "02",
    metric: "120+",
    accent: "crimson",
    label: "Projects Delivered",
    pillar: "Strategic Planning",
    detail:
      "Custom 90-day roadmaps backed by deep audience, technical, and competitor research across search, paid media, and web.",
  },
  {
    id: "metric-clients",
    index: "03",
    metric: "500+",
    accent: "blue",
    label: "Happy Clients",
    pillar: "Data-Driven Decisions",
    detail:
      "Full-funnel attribution tied to qualified pipeline across enterprise IT, public sector, healthcare, and D2C retail.",
  },
  {
    id: "metric-rating",
    index: "04",
    metric: "5.0 ★",
    accent: "crimson",
    label: "Verified Google Rating",
    pillar: "Measurable Results",
    detail:
      "Transparent reporting and continuous conversion optimization powered by an 18-tool analytics and engineering stack.",
  },
];

/**
 * Why Xntrova — Tresmares-Inspired Scroll-Driven Editorial Metrics Experience (Priority 5)
 * - Left Side: Sticky editorial narrative on desktop ("WHY XNTROVA", concise headline,
 *   single supporting paragraph, underlined text link, and live scroll stage readout).
 * - Right Side: Staggered 2-column tall metric panels with thin architectural borders,
 *   oversized numerical typography accented in restrained warm crimson (#C82318) and
 *   Xntrova brand blue (#0075A2), generous negative space, and reversible scroll-driven progression.
 */
const VERIFIED_TOOLS_LIST = [
  { name: "Ahrefs", logo: "/assets/badges/ahrefs.svg", shortCode: "AH" },
  { name: "Moz", logo: "/assets/badges/moz.png", shortCode: "MZ" },
  { name: "Rank Math", logo: "/assets/badges/rank-math.svg", shortCode: "RM" },
  { name: "Canva", logo: "/assets/badges/canva.png", shortCode: "CV" },
  { name: "Google Analytics 4", logo: null, shortCode: "GA4" },
  { name: "Google Search Console", logo: null, shortCode: "GSC" },
  { name: "Google Ads & P-Max", logo: null, shortCode: "ADS" },
  { name: "Google Tag Manager", logo: null, shortCode: "GTM" },
  { name: "Meta Business & CAPI", logo: null, shortCode: "META" },
  { name: "Semrush", logo: null, shortCode: "SEM" },
  { name: "HubSpot CRM", logo: null, shortCode: "HUB" },
  { name: "Salesforce", logo: null, shortCode: "SF" },
  { name: "Next.js & React", logo: null, shortCode: "NXT" },
  { name: "Shopify & WooCommerce", logo: null, shortCode: "SHOP" },
  { name: "Amazon Marketing", logo: null, shortCode: "AMZ" },
  { name: "AWS Cloud & Drupal", logo: null, shortCode: "AWS" },
];

export default function AboutWhySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0);
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId = null;

    const updateOnScroll = () => {
      rafId = null;
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const totalTravel = Math.max(1, rect.height - vh * 0.4);
      const rawRatio = (vh * 0.45 - rect.top) / totalTravel;
      const clampedRatio = Math.min(1, Math.max(0, rawRatio));

      if (!prefersReducedMotion) {
        setScrollRatio(clampedRatio);
      }

      const triggerY = vh * 0.48;
      let currentIdx = 0;
      panelRefs.current.forEach((panelEl, idx) => {
        if (!panelEl) return;
        const pRect = panelEl.getBoundingClientRect();
        if (pRect.top <= triggerY) {
          currentIdx = idx;
        }
      });
      setActiveIndex((prev) => (prev === currentIdx ? prev : currentIdx));
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateOnScroll);
      }
    };

    updateOnScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const colOffsetPx = Math.round((scrollRatio - 0.5) * -28);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative border-b border-[#DCE5EA] bg-white py-20 text-[#001720] sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Top Peripheral Coordinate Hairline */}
        <div className="flex items-center justify-between border-b border-[#DCE5EA] pb-4">
          <div className="flex items-center gap-2.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#C82318]"
              aria-hidden="true"
            />
            <span className="xn-tabular text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0075A2]">
              Why Xntrova
            </span>
          </div>
        </div>

        {/* Main Tresmares-Style Asymmetric Layout: Sticky Left Narrative + Right Staggered Metric Panels */}
        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* LEFT COLUMN (Cols 1-5): Sticky Narrative Block */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2
              id="about-heading"
              className="font-display text-3xl font-medium leading-[1.06] tracking-[-0.035em] text-[#001720] sm:text-4xl xl:text-[2.85rem]"
            >
              Built on Strategic Clarity,{" "}
              <span className="text-[#0075A2]">
                Not Cookie-Cutter Templates.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-[#3A505A] sm:text-lg">
              Founded to replace fragmented digital tactics with accountable
              engineering, Xntrova unites market research, creative
              storytelling, and full-funnel attribution across search, paid
              media, and web systems.
            </p>
          </div>

          {/* RIGHT COLUMN (Cols 6-12): Tresmares-Style Tall Staggered Metric Panels */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Left Metric Sub-Column (Panels 01 & 03) */}
              <div className="flex flex-col border-t border-l border-r sm:border-r-0 border-[#DCE5EA]">
                {[0, 2].map((panelIdx) => {
                  const item = VERIFIED_METRIC_PANELS[panelIdx];
                  const isActive = activeIndex === panelIdx;
                  const numberColor =
                    item.accent === "crimson"
                      ? "text-[#C82318]"
                      : "text-[#0075A2]";

                  return (
                    <article
                      key={item.id}
                      ref={(el) => {
                        panelRefs.current[panelIdx] = el;
                      }}
                      className={`relative flex min-h-[290px] flex-col justify-between border-b border-[#DCE5EA] p-8 transition-colors duration-300 sm:min-h-[340px] sm:p-10 ${
                        isActive ? "bg-[#F8FAFB]/80" : "bg-white"
                      }`}
                    >
                      {/* Top-LeftActive Accent Line */}
                      <span
                        aria-hidden="true"
                        className={`absolute top-0 left-0 h-[3px] w-16 transition-opacity duration-300 ${
                          isActive ? "opacity-100 bg-[#C82318]" : "opacity-0"
                        }`}
                      />

                      {/* Top: Oversized Metric Typography */}
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="xn-tabular text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A909A]">
                            {item.pillar}
                          </span>
                        </div>
                        <p
                          className={`xn-tabular mt-4 font-display text-6xl font-normal leading-none tracking-[-0.045em] sm:text-7xl xl:text-[5.25rem] ${numberColor}`}
                        >
                          {item.metric}
                        </p>
                      </div>

                      {/* Bottom: Concise Label & Verified Explanation */}
                      <div className="mt-12">
                        <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-[#001720] sm:text-xl">
                          {item.label}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-[#5A707A] sm:text-sm">
                          {item.detail}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Right Metric Sub-Column (Panels 02 & 04 — Staggered Vertically like Tresmares) */}
              <div
                className="flex flex-col border-t border-l border-r border-[#DCE5EA] transition-transform duration-200 ease-out sm:mt-14"
                style={{
                  transform: `translate3d(0, ${colOffsetPx}px, 0)`,
                }}
              >
                {[1, 3].map((panelIdx) => {
                  const item = VERIFIED_METRIC_PANELS[panelIdx];
                  const isActive = activeIndex === panelIdx;
                  const numberColor =
                    item.accent === "crimson"
                      ? "text-[#C82318]"
                      : "text-[#0075A2]";

                  return (
                    <article
                      key={item.id}
                      ref={(el) => {
                        panelRefs.current[panelIdx] = el;
                      }}
                      className={`relative flex min-h-[290px] flex-col justify-between border-b border-[#DCE5EA] p-8 transition-colors duration-300 sm:min-h-[340px] sm:p-10 ${
                        isActive ? "bg-[#F8FAFB]/80" : "bg-white"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute top-0 left-0 h-[3px] w-16 transition-opacity duration-300 ${
                          isActive ? "opacity-100 bg-[#C82318]" : "opacity-0"
                        }`}
                      />

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="xn-tabular text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A909A]">
                            {item.pillar}
                          </span>
                        </div>
                        <p
                          className={`xn-tabular mt-4 font-display text-6xl font-normal leading-none tracking-[-0.045em] sm:text-7xl xl:text-[5.25rem] ${numberColor}`}
                        >
                          {item.metric}
                        </p>
                      </div>

                      <div className="mt-12">
                        <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-[#001720] sm:text-xl">
                          {item.label}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-[#5A707A] sm:text-sm">
                          {item.detail}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Horizontal Tools Marquee (Requirement 5) */}
        <div className="mt-16 border-t border-[#DBE4E8] pt-8 lg:mt-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
            {/* Left Static Category Eyebrow */}
            <div className="flex shrink-0 items-center gap-2.5 border-b border-[#DBE4E8] pb-4 lg:border-b-0 lg:border-r lg:pr-8 lg:pb-0">
              <span
                className="h-2 w-2 rounded-full bg-[#0075A2]"
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#001720]">
                Engineering &amp; Martech Stack
              </span>
            </div>

            {/* Continuous Marquee Track */}
            <div className="xn-marquee-viewport min-w-0 flex-1">
              <div className="xn-marquee-track">
                {/* Group 1: Accessible Primary Sequence */}
                <ul
                  aria-label="Verified search, analytics, commerce, and engineering tools"
                  className="xn-marquee-group gap-6 pr-6"
                >
                  {VERIFIED_TOOLS_LIST.map((tool) => (
                    <li key={tool.name} className="shrink-0">
                      <div className="flex items-center gap-2.5 rounded border border-[#DBE4E8] bg-white px-3.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors duration-150 hover:border-[#0075A2]">
                        {tool.logo ? (
                          <img
                            src={tool.logo}
                            alt=""
                            width={64}
                            height={18}
                            className="h-4 w-auto object-contain opacity-85"
                          />
                        ) : (
                          <span className="flex size-4 items-center justify-center rounded-sm bg-[#0075A2]/10 font-mono text-[9px] font-bold text-[#0075A2]">
                            {tool.shortCode || "●"}
                          </span>
                        )}
                        <span className="font-mono text-xs font-medium text-[#001720]">
                          {tool.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Group 2: Seamless Duplicate Loop (Hidden from Assistive Technology) */}
                <ul
                  aria-hidden="true"
                  className="xn-marquee-group xn-marquee-group-duplicate gap-6 pr-6"
                >
                  {VERIFIED_TOOLS_LIST.map((tool, idx) => (
                    <li key={`dup-${idx}`} className="shrink-0">
                      <div className="flex items-center gap-2.5 rounded border border-[#DBE4E8] bg-white px-3.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                        {tool.logo ? (
                          <img
                            src={tool.logo}
                            alt=""
                            width={64}
                            height={18}
                            className="h-4 w-auto object-contain opacity-85"
                          />
                        ) : (
                          <span className="flex size-4 items-center justify-center rounded-sm bg-[#0075A2]/10 font-mono text-[9px] font-bold text-[#0075A2]">
                            {tool.shortCode || "●"}
                          </span>
                        )}
                        <span className="font-mono text-xs font-medium text-[#001720]">
                          {tool.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
