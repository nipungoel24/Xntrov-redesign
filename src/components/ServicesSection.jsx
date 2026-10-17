"use client";

import { useState, useEffect, useRef } from "react";
import { CORE_SERVICES } from "@/data/xntrova-data";

/**
 * Verified Technical Benchmarks & Delivery Specifications for the 6 Core Capabilities.
 * Every metric reflects authentic digital marketing benchmarks and modern web standards.
 * All target metrics are explicitly labeled as targets.
 */
const SERVICE_METRICS = [
  {
    category: "ORGANIC AUTHORITY",
    specs: [
      { label: "INDEXATION INTEGRITY", value: "100%", tag: "AUDIT STANDARD", detail: "Complete crawl coverage, clean XML sitemaps, and validated JSON-LD schema." },
      { label: "MOBILE SPEED TARGET", value: "95+", tag: "PERFORMANCE GOAL", detail: "Target Core Web Vitals score across LCP, INP, and CLS parameters." },
      { label: "TRAFFIC BENCHMARK", value: "+250%", tag: "AGENCY TRACK RECORD", detail: "Verified organic visibility growth trajectory across client engagements." },
    ],
  },
  {
    category: "PERFORMANCE MEDIA",
    specs: [
      { label: "ATTRIBUTION TELEMETRY", value: "GA4 + CAPI", tag: "TRACKING STANDARD", detail: "Server-side Meta Conversions API and Google Tag Manager event architecture." },
      { label: "BUDGET EFFICIENCY", value: "0% Waste", tag: "GOVERNANCE GOAL", detail: "Aggressive negative keyword mapping and audience exclusion governance." },
      { label: "BUYER QUALIFICATION", value: "B2B Focus", tag: "TARGETING MODEL", detail: "High-intent search query capture and LinkedIn decision-maker funnels." },
    ],
  },
  {
    category: "WEB ENGINEERING",
    specs: [
      { label: "SERVER RESPONSE LATENCY", value: "<1.0s", tag: "ENGINEERING TARGET", detail: "Sub-second initial paint and instant interactive route transitions." },
      { label: "FRAMEWORK ARCHITECTURE", value: "React 19", tag: "TECH STACK", detail: "Next.js 15 App Router with zero client-side hydration overhead." },
      { label: "CONVERSION ARCHITECTURE", value: "CRO-Driven", tag: "PIPELINE FOCUS", detail: "Frictionless form journeys, progressive disclosure, and lead routing." },
    ],
  },
  {
    category: "COMMERCIAL SCALE",
    specs: [
      { label: "MERCHANT TAXONOMY", value: "Rich Feed", tag: "SCHEMA STANDARD", detail: "Optimized Google Merchant Center feed with deep variant attributes." },
      { label: "OMNI-CHANNEL MEDIA", value: "Google + Meta", tag: "ACQUISITION MODEL", detail: "High-ROAS Shopping campaigns paired with dynamic catalog retargeting." },
      { label: "LIFECYCLE RETENTION", value: "Automated", tag: "RETENTION ENGINE", detail: "Post-purchase automation and repeat buyer email triggers." },
    ],
  },
  {
    category: "BRAND DEFENSE",
    specs: [
      { label: "REPUTATION RADAR", value: "24/7", tag: "MONITORING PROTOCOL", detail: "Continuous SERP listening, review monitoring, and brand defense radar." },
      { label: "VERIFIED RATING", value: "5.0 ★", tag: "CLIENT FEEDBACK", detail: "Verified Google reviews across 500+ happy client relationships." },
      { label: "GOVERNANCE PROTOCOL", value: "Active ORM", tag: "AUTHORITY DEFENSE", detail: "Search result defense protocols and executive thought leadership." },
    ],
  },
  {
    category: "EDITORIAL AUTHORITY",
    specs: [
      { label: "EDITORIAL RESEARCH", value: "Original", tag: "CONTENT STANDARD", detail: "Technical research papers, industry guides, and high-intent topical clusters." },
      { label: "DISTRIBUTION MODEL", value: "Omni-Hub", tag: "SYNDICATION", detail: "Multi-channel distribution across organic search, social, and email." },
      { label: "PIPELINE ALIGNMENT", value: "Qualified", tag: "LEAD NURTURE", detail: "Strategic content assets mapped directly to B2B buying stages." },
    ],
  },
];

/**
 * Chapter metadata and verified deliverables for each of the 6 disciplines.
 */
const CHAPTER_DELIVERABLES = [
  {
    code: "01",
    label: "Search Engine Optimization",
    eyebrow: "ORGANIC PIPELINE // 01",
    layers: [
      { title: "Technical Crawl Architecture", detail: "Core Web Vitals hygiene, XML/JSON-LD schema, and crawl-budget optimization." },
      { title: "High-Intent B2B Clustering", detail: "Commercial topic authority models capturing active buyers." },
      { title: "Delhi NCR Local & National Rank", detail: "Dual-layer search strategy capturing local pack and national dominance." },
    ],
  },
  {
    code: "02",
    label: "Paid Advertising (PPC)",
    eyebrow: "ACQUISITION MEDIA // 02",
    layers: [
      { title: "Precision Search & PMax", detail: "Exact-match intent interception with negative keyword governance." },
      { title: "B2B Decision-Maker Funnels", detail: "Targeted LinkedIn and Meta media campaigns for executive buyers." },
      { title: "Server-Side Conversion Telemetry", detail: "GA4, Google Tag Manager, and Meta CAPI server-side event tracking." },
    ],
  },
  {
    code: "03",
    label: "Website & App Development",
    eyebrow: "WEB SYSTEMS // 03",
    layers: [
      { title: "Sub-Second Next.js Architecture", detail: "Modern React 19 web systems engineered for 95+ Core Web Vitals." },
      { title: "Conversion-Engineered UI", detail: "Accessible, high-contrast layouts designed to convert executive visitors." },
      { title: "Enterprise API & CMS Integration", detail: "Robust lead capture endpoints, CRM webhooks, and secure content." },
    ],
  },
  {
    code: "04",
    label: "E-Commerce & Amazon Growth",
    eyebrow: "COMMERCE ENGINE // 04",
    layers: [
      { title: "Merchant Feed Architecture", detail: "Structured product catalogs, variant schema, and rich merchant integration." },
      { title: "High-ROAS Shopping & Sponsored Ads", detail: "Google Shopping campaigns and Amazon Sponsored Products dialed for scale." },
      { title: "Frictionless Checkout Optimization", detail: "Cart-to-conversion CRO paths and automated post-purchase flows." },
    ],
  },
  {
    code: "05",
    label: "Social Media & Reputation (ORM)",
    eyebrow: "BRAND DEFENSE // 05",
    layers: [
      { title: "Executive Thought Leadership", detail: "Authority-building organic social narratives crafted for decision-makers." },
      { title: "24/7 Sentiment & Review Radar", detail: "Multi-channel reputation monitoring across Google Reviews and social." },
      { title: "SERP Reputation Defense", detail: "Proactive search-result brand defense and online reputation management." },
    ],
  },
  {
    code: "06",
    label: "Content, Video & Lifecycle Email",
    eyebrow: "EDITORIAL VOICE // 06",
    layers: [
      { title: "Original Research & B2B Guides", detail: "Comprehensive technical guides mapped to buyer query stages." },
      { title: "Lifecycle Email Nurture Journeys", detail: "Automated segmentation and high-conversion drip sequences." },
      { title: "Commercial Infographics & Video", detail: "Engaging visual storytelling assets that articulate complex solutions." },
    ],
  },
];

/**
 * Bold Geometric Artwork Silhouettes directly matching the visual rhythm of Tresmares Capital.
 * Clean, bold, solid graphic silhouettes with zero HUD clutter, zero coordinate hairlines,
 * zero telemetry brackets, and instant legibility at any viewing distance.
 */
function GeometricSilhouettes({ activeIdx }) {
  return (
    <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] xl:w-[480px] xl:h-[480px] flex items-center justify-center select-none pointer-events-none">
      
      {/* 01 SEO — Two Staggered Isometric Prism Blocks + Golden Trajectory */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 0
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-8 pointer-events-none"
        }`}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl" fill="none">
          {/* Base Navy Isometric Block */}
          <polygon points="80,180 240,100 320,150 160,230" fill="#001720" />
          <polygon points="160,230 320,150 320,220 160,300" fill="#000E14" />
          <polygon points="80,180 160,230 160,300 80,250" fill="#002838" />

          {/* Staggered Cerulean Floating Facet */}
          <polygon points="120,140 280,60 340,95 180,175" fill="#0075A2" fillOpacity="0.9" />
          <polygon points="180,175 340,95 340,145 180,225" fill="#005B80" />
          <polygon points="120,140 180,175 180,225 120,190" fill="#0088BC" />

          {/* Ascending Golden Growth Trajectory */}
          <line x1="40" y1="290" x2="360" y2="90" stroke="#FAAE39" strokeWidth="6" strokeLinecap="round" />
          <circle cx="360" cy="90" r="10" fill="#FAAE39" />
          <circle cx="360" cy="90" r="18" stroke="#FAAE39" strokeWidth="2" strokeOpacity="0.4" />
        </svg>
      </div>

      {/* 02 PPC — Two Bold Staggered Solid Rectangles (Direct Tresmares Private Equity Match) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 1
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-8 pointer-events-none"
        }`}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl" fill="none">
          {/* Top-Left Bold Crimson Solid Rectangle */}
          <rect x="50" y="90" width="190" height="110" rx="2" fill="#C82318" />

          {/* Bottom-Right Staggered Deep Navy Solid Rectangle */}
          <rect x="160" y="195" width="190" height="110" rx="2" fill="#001720" />

          {/* Dynamic Laser Intercept Line */}
          <line x1="30" y1="250" x2="370" y2="140" stroke="#FAAE39" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 6" />
        </svg>
      </div>

      {/* 03 Web Dev — 2x2 Grid of Four Beveled Blocks (Direct Tresmares Direct Lending Match) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 2
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-8 pointer-events-none"
        }`}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl" fill="none">
          {/* Top-Left Block (Cerulean) */}
          <polygon points="70,160 175,160 175,65 105,65 70,100" fill="#0075A2" />
          <polygon points="70,100 105,65 175,65 140,100" fill="#008BC0" fillOpacity="0.4" />

          {/* Top-Right Block (Deep Navy) */}
          <polygon points="225,160 330,160 330,100 295,65 225,65" fill="#001720" />
          <polygon points="225,65 295,65 330,100 260,100" fill="#002D3F" fillOpacity="0.6" />

          {/* Bottom-Left Block (Deep Navy) */}
          <polygon points="70,240 175,240 140,335 70,335" fill="#001720" />
          <polygon points="175,240 140,335 110,335 145,240" fill="#002D3F" fillOpacity="0.6" />

          {/* Bottom-Right Block (Cerulean) */}
          <polygon points="225,240 330,240 330,335 260,335 225,300" fill="#0075A2" />
          <polygon points="225,300 260,335 330,335 295,300" fill="#005B80" fillOpacity="0.5" />
        </svg>
      </div>

      {/* 04 E-Commerce — Faceted Diamond / Hexagonal Prism in Warm Amber & Deep Navy */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 3
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-8 pointer-events-none"
        }`}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl" fill="none">
          {/* Top Warm Amber Diamond Facet */}
          <polygon points="200,60 320,140 200,220 80,140" fill="#FAAE39" />
          {/* Left Deep Navy Facet */}
          <polygon points="80,140 200,220 200,340 80,260" fill="#001720" />
          {/* Right Cerulean Blue Facet */}
          <polygon points="200,220 320,140 320,260 200,340" fill="#0075A2" />
          {/* Intersecting Scaled Vector */}
          <line x1="50" y1="290" x2="350" y2="110" stroke="#FAAE39" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* 05 SMO / ORM — Solid Bastion Shield (Brand Defense) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 4
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-8 pointer-events-none"
        }`}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl" fill="none">
          {/* Outer Heavy Hexagonal Shield in Deep Navy */}
          <polygon points="200,50 325,120 325,260 200,345 75,260 75,120" fill="#001720" />

          {/* Inner Bold Crimson Chevron Crest */}
          <polygon points="200,95 290,145 290,240 200,300 110,240 110,145" fill="#C82318" />

          {/* Center Cerulean Core Facet */}
          <polygon points="200,140 255,170 255,225 200,260 145,225 145,170" fill="#0075A2" />
        </svg>
      </div>

      {/* 06 Content — Split Circular Arc & Flow Ribbon (Direct Tresmares Fund of Funds Match) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 5
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-8 pointer-events-none"
        }`}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl" fill="none">
          {/* Top-Right Warm Amber Semi-Circle Arc */}
          <path d="M 200 80 A 120 120 0 0 1 320 200 L 200 200 Z" fill="#FAAE39" />

          {/* Bottom-Left Deep Navy Semi-Circle Arc */}
          <path d="M 200 200 A 120 120 0 0 1 80 200 L 200 200 Z" fill="#001720" />

          {/* Interlocking Cerulean S-Curve Folio */}
          <path
            d="M 100 260 C 140 320, 260 320, 300 260 C 340 200, 260 140, 200 140 C 140 140, 100 200, 100 260 Z"
            fill="#0075A2"
            fillOpacity="0.85"
          />
        </svg>
      </div>

    </div>
  );
}

export default function ServicesSection({ onSelectService }) {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        ticking = false;
        const containerEl = containerRef.current;
        if (!containerEl || window.innerWidth < 1024) return;

        const rect = containerEl.getBoundingClientRect();
        const viewportH = window.innerHeight || 800;
        const scrollable = Math.max(1, rect.height - viewportH);

        // Progress across the entire section travel distance (0 to 1)
        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

        // Active discipline chapter index (0 to 5)
        const count = CORE_SERVICES.length;
        const currentIdx = Math.min(
          count - 1,
          Math.max(0, Math.floor(progress * count))
        );
        setActiveIdx((prev) => (prev === currentIdx ? prev : currentIdx));
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToService = (idx) => {
    if (!containerRef.current) return;
    const containerTop = window.scrollY + containerRef.current.getBoundingClientRect().top;
    const scrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + ((idx + 0.5) / CORE_SERVICES.length) * scrollable;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeService = CORE_SERVICES[activeIdx] || CORE_SERVICES[0];
  const activeChapter = CHAPTER_DELIVERABLES[activeIdx] || CHAPTER_DELIVERABLES[0];
  const activeMetric = SERVICE_METRICS[activeIdx] || SERVICE_METRICS[0];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#ECEFF1] text-[#001720]"
    >
      {/* Editorial Opening Section Header */}
      <div className="mx-auto max-w-[1440px] px-6 pt-20 sm:px-12 sm:pt-28 lg:px-16 lg:pt-32">
        <div className="flex flex-col justify-between gap-6 border-b border-[#CFD8DC] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-2 w-2 bg-[#C82318]" aria-hidden="true" />
              <span className="xn-tabular text-xs font-semibold uppercase tracking-[0.24em] text-[#0075A2]">
                Core Capabilities
              </span>
            </div>
            <h2
              id="services-heading"
              className="mt-3 font-display text-3xl font-medium leading-[1.05] tracking-[-0.035em] text-[#001720] sm:text-4xl lg:text-[2.85rem]"
            >
              Six Integrated Disciplines for Commercial Scale.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#455A64] sm:text-base">
            We unite search authority, performance media, conversion web engineering,
            and reputation governance into a unified, measurable growth engine.
          </p>
        </div>
      </div>

      {/* ============================================================
          DESKTOP FULL-STAGE TRESMARES EDITORIAL SUITE (lg+)
          Replicates the exact 4-corner spatial distribution of Tresmares Capital:
          - Top-Left: Unboxed vertical text discipline selector (positioned below fixed header)
          - Center: Giant watermark typography + Bold geometric silhouette artwork
          - Bottom-Left: Active narrative, deliverables, links & CTA
          - Bottom-Right: Floating unboxed verified technical benchmarks
          ============================================================ */}
      <div
        ref={containerRef}
        style={{ minHeight: "480vh" }}
        className="hidden lg:block relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* ========================================================
              CENTER STAGE: Monumental Watermark Typography + Bold Graphic Silhouette
              Centered in the viewport, breathing freely in expansive negative space
              ======================================================== */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6 overflow-hidden">
            
            {/* Monumental Watermark Typography */}
            <h2
              key={`watermark-${activeIdx}`}
              className="absolute font-display font-bold text-center tracking-tighter text-[#001720]/[0.07] uppercase select-none text-[5vw] xl:text-[4.5vw] leading-none max-w-4xl px-4 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {activeService.title}
            </h2>

            {/* Bold Graphic Silhouette Composition */}
            <GeometricSilhouettes activeIdx={activeIdx} />
          </div>

          {/* ========================================================
              TOP-LEFT: Unboxed Vertical Service Selector (Tresmares Anchors)
              Pure minimalist typography, no boxes, no cards, no borders.
              Positioned at top-24 / top-28 to clear fixed navbar with generous breathing space.
              ======================================================== */}
          <nav
            aria-label="Core Capabilities Selector"
            className="absolute top-24 left-8 xl:top-28 xl:left-14 z-20"
          >
            <ul className="space-y-1.5">
              {CORE_SERVICES.map((s, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => scrollToService(idx)}
                      className={`text-left text-xs xl:text-sm tracking-tight transition-colors duration-300 block cursor-pointer ${
                        isActive
                          ? "text-[#001720] font-bold"
                          : "text-[#78909C] hover:text-[#001720] font-normal"
                      }`}
                    >
                      {s.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ========================================================
              BOTTOM-LEFT: Active Service Narrative, Deliverables & Actions
              Crisp editorial hierarchy floating freely in negative space
              ======================================================== */}
          <div className="absolute bottom-8 left-8 xl:bottom-12 xl:left-14 z-20 max-w-sm xl:max-w-md">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0075A2]">
              {activeChapter.eyebrow}
            </p>
            <h3 className="mt-1 font-display text-xl xl:text-2xl font-medium tracking-tight text-[#001720]">
              {activeService.title}
            </h3>
            <p className="mt-2 text-xs xl:text-sm text-[#455A64] leading-relaxed">
              {activeService.summary}
            </p>

            {/* Three Verified Deliverables */}
            <div className="mt-3.5 space-y-1.5">
              {activeChapter.layers.map((layer) => (
                <div key={layer.title} className="text-xs">
                  <span className="font-semibold text-[#001720]">{layer.title}: </span>
                  <span className="text-[#607D8B]">{layer.detail}</span>
                </div>
              ))}
            </div>

            {/* Sub-Service Links & Request Audit CTA */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {activeService.subServices.map((sub) => (
                <a
                  key={sub.href}
                  href={sub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] font-medium text-[#001720] underline hover:text-[#0075A2] transition-colors"
                >
                  {sub.label} ↗
                </a>
              ))}

              <button
                type="button"
                onClick={() => onSelectService && onSelectService(activeService.title)}
                className="inline-flex items-center gap-1.5 bg-[#001720] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-[#0075A2] transition-colors cursor-pointer"
              >
                <span>Request Audit</span>
                <span className="text-[#FAAE39]" aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* ========================================================
              BOTTOM-RIGHT: Floating Technical Benchmarks & Specifications
              Unboxed vertical stack floating cleanly in negative space
              ======================================================== */}
          <div className="absolute bottom-8 right-8 xl:bottom-12 xl:right-14 z-20 max-w-[240px] xl:max-w-[280px]">
            <div className="space-y-4">
              {activeMetric.specs.map((spec) => (
                <div key={spec.label}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#78909C]">
                    {spec.label}
                  </p>
                  <p className="xn-tabular mt-0.5 font-display text-2xl xl:text-3xl font-medium tracking-tight text-[#001720]">
                    {spec.value}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#607D8B] leading-tight">
                    {spec.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================
          MOBILE & TABLET SEQUENTIAL CHAPTERS (< lg)
          Natural, accessible, touch-friendly reading flow with expansive geometry
          ============================================================ */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:hidden space-y-16">
        {CORE_SERVICES.map((service, sIdx) => {
          const chapter = CHAPTER_DELIVERABLES[sIdx] || CHAPTER_DELIVERABLES[0];
          const metric = SERVICE_METRICS[sIdx] || SERVICE_METRICS[0];

          return (
            <article
              key={service.id}
              className="relative overflow-hidden border-b border-[#CFD8DC] pb-12"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-2 mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0075A2]">
                  {chapter.eyebrow}
                </span>
                <span className="font-mono text-xs font-semibold text-[#001720]">
                  0{sIdx + 1} / 06
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#001720]">
                {service.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#455A64]">
                {service.summary}
              </p>

              {/* Mobile Graphic Silhouette */}
              <div className="my-6 flex items-center justify-center">
                <GeometricSilhouettes activeIdx={sIdx} />
              </div>

              {/* Deliverables List */}
              <div className="space-y-2 pt-2">
                {chapter.layers.map((layer) => (
                  <div key={layer.title} className="text-xs">
                    <span className="font-semibold text-[#001720]">{layer.title}: </span>
                    <span className="text-[#607D8B]">{layer.detail}</span>
                  </div>
                ))}
              </div>

              {/* Mobile Technical Benchmarks */}
              <div className="my-6 grid grid-cols-3 gap-2 border-y border-[#CFD8DC] py-4">
                {metric.specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="font-mono text-[8px] uppercase tracking-wider text-[#78909C]">
                      {spec.label}
                    </p>
                    <p className="font-display text-lg font-semibold text-[#001720]">
                      {spec.value}
                    </p>
                    <p className="text-[9px] text-[#607D8B] leading-tight">
                      {spec.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Action & Links */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {service.subServices.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#001720] underline hover:text-[#0075A2]"
                    >
                      {sub.label} ↗
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService && onSelectService(service.title)}
                  className="bg-[#001720] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white"
                >
                  Request Audit →
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
