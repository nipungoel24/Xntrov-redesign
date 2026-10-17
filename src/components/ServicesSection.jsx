"use client";

import { useState, useEffect, useRef } from "react";
import { CORE_SERVICES } from "@/data/xntrova-data";

/**
 * Technical benchmarks & verified delivery specifications for the 6 Core Capabilities.
 * Grounded in verified agency metrics and modern web standards.
 */
const SERVICE_METRICS = [
  {
    specs: [
      { label: "INDEXATION", value: "100%", detail: "Crawl coverage & clean JSON-LD" },
      { label: "PERFORMANCE", value: "95+", detail: "Mobile Core Web Vitals target" },
      { label: "GROWTH TARGET", value: "+250%", detail: "Organic visibility trajectory" },
    ],
  },
  {
    specs: [
      { label: "ATTRIBUTION", value: "GA4 + CAPI", detail: "Server-side verified conversion tracking" },
      { label: "EFFICIENCY", value: "0% Waste", detail: "Aggressive negative keyword governance" },
      { label: "INTENT", value: "High-Intent", detail: "Google Search & LinkedIn B2B funnels" },
    ],
  },
  {
    specs: [
      { label: "LATENCY", value: "<1.0s", detail: "Sub-second responsive load speed" },
      { label: "FRAMEWORK", value: "React 19", detail: "Modern Next.js component architecture" },
      { label: "CONVERSION", value: "CRO-Driven", detail: "Engineered high-intent lead paths" },
    ],
  },
  {
    specs: [
      { label: "FEED SCHEMA", value: "Rich Merchant", detail: "Structured product & variant feeds" },
      { label: "CHANNELS", value: "Google + Meta", detail: "High-ROAS shopping & catalog ads" },
      { label: "RETENTION", value: "Automated", detail: "Lifecycle repeat-buyer nurture flows" },
    ],
  },
  {
    specs: [
      { label: "DEFENSE", value: "24/7", detail: "Continuous SERP brand reputation radar" },
      { label: "SENTIMENT", value: "5.0 ★", detail: "Verified multi-channel executive rating" },
      { label: "AUTHORITY", value: "B2B Focus", detail: "Executive thought leadership narratives" },
    ],
  },
  {
    specs: [
      { label: "AUTHORITY", value: "Editorial", detail: "Deep original research & industry guides" },
      { label: "SYNDICATION", value: "Omni-Hub", detail: "Search, social & lifecycle email flows" },
      { label: "ENGAGEMENT", value: "Qualified", detail: "Content mapped to buyer decision stages" },
    ],
  },
];

/**
 * Geometric configurations for the 6 Core Capabilities.
 * Rebuilt strictly around the Tresmares Capital Financial Solutions interaction model:
 * - Center stage expressive geometric composition with morphing shapes
 * - Overlapping architectural polygon planes with dynamic scale, rotation, and palette
 * - Authority color system: #0075A2, #001720, #C82318, #FAAE39, #22D3EE
 */
const CAPABILITY_GEOMETRIES = [
  {
    id: "seo",
    watermark: "SEARCH",
    primaryColor: "#0075A2",
    secondaryColor: "#001720",
    accentColor: "#FAAE39",
    surfaceTint: "rgba(0, 117, 162, 0.06)",
    // Primary Architectural Wedge
    shape1: {
      clipPath: "polygon(14% 0%, 100% 0%, 86% 100%, 0% 100%)",
      transform: "translate3d(0, -12px, 0) rotate(-4deg) scale(1.02)",
      width: "360px",
      height: "360px",
      bg: "#0075A2",
      opacity: 0.94,
    },
    // Secondary Intersecting Slab
    shape2: {
      clipPath: "polygon(0% 16%, 100% 0%, 84% 100%, 0% 84%)",
      transform: "translate3d(60px, 40px, 0) rotate(5deg) scale(0.92)",
      width: "280px",
      height: "280px",
      bg: "#001720",
      opacity: 0.90,
    },
    // Trajectory Accent Beam
    beam: {
      transform: "translate3d(-20px, 20px, 0) rotate(14deg)",
      width: "320px",
      height: "4px",
      bg: "#FAAE39",
    },
    layers: [
      { code: "01", title: "Crawl & Indexation", detail: "Core Web Vitals, JSON-LD schema, canonical hygiene." },
      { code: "02", title: "Commercial Keywords", detail: "High-intent B2B topic clustering and authority links." },
      { code: "03", title: "Regional Dominance", detail: "Delhi NCR local pack authority and national rank." },
    ],
  },
  {
    id: "ppc",
    watermark: "MEDIA",
    primaryColor: "#C82318",
    secondaryColor: "#0075A2",
    accentColor: "#FAAE39",
    surfaceTint: "rgba(200, 35, 24, 0.06)",
    shape1: {
      clipPath: "polygon(0% 0%, 100% 28%, 76% 100%, 14% 82%)",
      transform: "translate3d(10px, -20px, 0) rotate(8deg) scale(1.05)",
      width: "370px",
      height: "370px",
      bg: "#C82318",
      opacity: 0.93,
    },
    shape2: {
      clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)",
      transform: "translate3d(-50px, 50px, 0) rotate(-6deg) scale(0.88)",
      width: "290px",
      height: "290px",
      bg: "#0075A2",
      opacity: 0.88,
    },
    beam: {
      transform: "translate3d(10px, 30px, 0) rotate(-16deg)",
      width: "340px",
      height: "4px",
      bg: "#FAAE39",
    },
    layers: [
      { code: "01", title: "Intent Intercept", detail: "Exact-match search queries and PMax campaign engines." },
      { code: "02", title: "Funnel Qualification", detail: "Message-matched landing page CRO and lead filters." },
      { code: "03", title: "Attribution Telemetry", detail: "GA4, Google Tag Manager, and verified ROAS tracking." },
    ],
  },
  {
    id: "web-dev",
    watermark: "SYSTEM",
    primaryColor: "#001720",
    secondaryColor: "#0075A2",
    accentColor: "#22D3EE",
    surfaceTint: "rgba(0, 23, 32, 0.06)",
    shape1: {
      clipPath: "polygon(0% 0%, 96% 6%, 100% 100%, 4% 94%)",
      transform: "translate3d(-10px, 10px, 0) rotate(-3deg) scale(1.0)",
      width: "360px",
      height: "360px",
      bg: "#001720",
      opacity: 0.96,
    },
    shape2: {
      clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
      transform: "translate3d(50px, -30px, 0) rotate(6deg) scale(0.85)",
      width: "260px",
      height: "260px",
      bg: "#22D3EE",
      opacity: 0.85,
    },
    beam: {
      transform: "translate3d(0, 40px, 0) rotate(0deg)",
      width: "330px",
      height: "4px",
      bg: "#0075A2",
    },
    layers: [
      { code: "01", title: "Interface Architecture", detail: "Accessible, sub-second responsive UI for engagement." },
      { code: "02", title: "Speed Engineering", detail: "Next.js 15, code-splitting, 95+ Core Web Vitals speed." },
      { code: "03", title: "Lead Systems", detail: "Custom CMS integrations, API hooks, and lead routing." },
    ],
  },
  {
    id: "ecommerce",
    watermark: "COMMERCE",
    primaryColor: "#0075A2",
    secondaryColor: "#FAAE39",
    accentColor: "#C82318",
    surfaceTint: "rgba(250, 174, 57, 0.07)",
    shape1: {
      clipPath: "polygon(0% 14%, 86% 0%, 100% 86%, 14% 100%)",
      transform: "translate3d(15px, -15px, 0) rotate(9deg) scale(1.03)",
      width: "360px",
      height: "360px",
      bg: "#0075A2",
      opacity: 0.90,
    },
    shape2: {
      clipPath: "polygon(16% 0%, 100% 12%, 84% 100%, 0% 88%)",
      transform: "translate3d(40px, 45px, 0) rotate(-8deg) scale(0.90)",
      width: "280px",
      height: "280px",
      bg: "#FAAE39",
      opacity: 0.92,
    },
    beam: {
      transform: "translate3d(-20px, 20px, 0) rotate(-10deg)",
      width: "310px",
      height: "4px",
      bg: "#C82318",
    },
    layers: [
      { code: "01", title: "Catalog Schema", detail: "Merchant feed structure, rich product data, and taxonomy." },
      { code: "02", title: "Shopping Ads", detail: "High-intent Google Shopping, Meta ads, and Amazon PPC." },
      { code: "03", title: "Retention CRO", detail: "Frictionless checkout paths and repeat-buyer triggers." },
    ],
  },
  {
    id: "smo",
    watermark: "DEFENSE",
    primaryColor: "#C82318",
    secondaryColor: "#001720",
    accentColor: "#0075A2",
    surfaceTint: "rgba(200, 35, 24, 0.06)",
    shape1: {
      clipPath: "polygon(0% 0%, 100% 0%, 78% 100%, 22% 100%)",
      transform: "translate3d(0, -10px, 0) rotate(-6deg) scale(1.02)",
      width: "370px",
      height: "370px",
      bg: "#C82318",
      opacity: 0.92,
    },
    shape2: {
      clipPath: "polygon(12% 0%, 100% 16%, 88% 100%, 0% 84%)",
      transform: "translate3d(45px, 35px, 0) rotate(6deg) scale(0.92)",
      width: "290px",
      height: "290px",
      bg: "#001720",
      opacity: 0.94,
    },
    beam: {
      transform: "translate3d(-10px, 50px, 0) rotate(8deg)",
      width: "330px",
      height: "4px",
      bg: "#0075A2",
    },
    layers: [
      { code: "01", title: "Brand Positioning", detail: "Authoritative narrative tailored to executive buyers." },
      { code: "02", title: "Sentiment Radar", detail: "Multi-channel sentiment listening and review monitoring." },
      { code: "03", title: "Reputation Governance", detail: "Crisis containment protocols and search brand defense." },
    ],
  },
  {
    id: "content",
    watermark: "CONTENT",
    primaryColor: "#001720",
    secondaryColor: "#C82318",
    accentColor: "#FAAE39",
    surfaceTint: "rgba(0, 23, 32, 0.06)",
    shape1: {
      clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
      transform: "translate3d(10px, 10px, 0) rotate(5deg) scale(0.98)",
      width: "360px",
      height: "360px",
      bg: "#001720",
      opacity: 0.95,
    },
    shape2: {
      clipPath: "polygon(0% 12%, 88% 0%, 100% 88%, 12% 100%)",
      transform: "translate3d(55px, -30px, 0) rotate(-5deg) scale(0.88)",
      width: "280px",
      height: "280px",
      bg: "#FAAE39",
      opacity: 0.90,
    },
    beam: {
      transform: "translate3d(0, 30px, 0) rotate(-12deg)",
      width: "320px",
      height: "4px",
      bg: "#C82318",
    },
    layers: [
      { code: "01", title: "Editorial Authority", detail: "Original research, technical guides, search articles." },
      { code: "02", title: "Lifecycle Email", detail: "Automated nurture sequences and pipeline segmentation." },
      { code: "03", title: "Visual Storytelling", detail: "Custom infographics, motion assets, and commercial copy." },
    ],
  },
];

export default function ServicesSection({ onSelectService }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  // Natural vertical scroll driver for Desktop (lg+)
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
        setScrollProgress(progress);

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
    const targetScroll = containerTop + (idx / CORE_SERVICES.length) * scrollable + 20;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeService = CORE_SERVICES[activeIdx] || CORE_SERVICES[0];
  const activeGeo = CAPABILITY_GEOMETRIES[activeIdx] || CAPABILITY_GEOMETRIES[0];
  const activeMetric = SERVICE_METRICS[activeIdx] || SERVICE_METRICS[0];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#F4F8FA] text-[#001720]"
    >
      {/* Editorial Opening Header */}
      <div className="mx-auto max-w-[1440px] px-4 pt-20 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">
        <div className="flex flex-col justify-between gap-6 border-b border-[#DCE5EA] pb-8 lg:flex-row lg:items-end">
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

          <p className="max-w-md text-sm leading-relaxed text-[#4A6270] sm:text-base">
            We unite search authority, performance media, conversion web engineering,
            and reputation governance into a unified, measurable growth engine.
          </p>
        </div>
      </div>

      {/* ============================================================
          DESKTOP TRESMARES FINANCIAL SOLUTIONS INTERACTION MODEL (lg+)
          - Left Column: Persistent service selector + Active summary, deliverables & CTA
          - Center: Expressive geometric composition morphing across all 6 services
          - Right Column: Restrained technical specs & benchmarks
          ============================================================ */}
      <div
        ref={containerRef}
        style={{ minHeight: "450vh" }}
        className="hidden lg:block relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-8 py-8 lg:px-12 xl:px-16">
          {/* Subtle Stage Background Ambient Wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-colors duration-700 ease-out"
            style={{ backgroundColor: activeGeo.surfaceTint }}
          />

          {/* TOP STAGE STATUS BAR */}
          <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between border-b border-[#001720]/10 pb-3">
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 transition-colors duration-500"
                style={{ backgroundColor: activeGeo.primaryColor }}
                aria-hidden="true"
              />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#001720]">
                {activeService.categoryLabel}
              </span>
            </div>

            {/* Step Counter Indicator */}
            <div className="flex items-center gap-3 font-mono text-xs text-[#001720]">
              <span className="font-bold">0{activeIdx + 1}</span>
              <span className="text-[#001720]/30">/</span>
              <span className="text-[#001720]/50">06</span>
            </div>
          </div>

          {/* MAIN THREE-COLUMN INTERACTION STAGE */}
          <div className="relative z-10 mx-auto my-auto w-full max-w-[1440px] py-4">
            <div className="grid grid-cols-12 gap-8 xl:gap-12 items-center">
              
              {/* LEFT COLUMN: Persistent Service Selector + Active Narrative & Deliverables */}
              <div className="col-span-4 xl:col-span-4 flex flex-col justify-between space-y-6">
                {/* Persistent Service Selector Listing All 6 Capabilities */}
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0075A2] mb-3">
                    Disciplines
                  </p>
                  <nav aria-label="Core Capabilities Selector" className="space-y-1.5">
                    {CORE_SERVICES.map((s, idx) => {
                      const isActive = idx === activeIdx;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => scrollToService(idx)}
                          className={`group flex items-center gap-3 text-left w-full py-1.5 transition-all duration-300 cursor-pointer ${
                            isActive
                              ? "text-[#001720] font-semibold"
                              : "text-[#64748B] hover:text-[#001720] font-normal"
                          }`}
                        >
                          <span
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? "w-5 bg-[#C82318]"
                                : "w-1.5 bg-[#CBD5E1] group-hover:bg-[#94A3B8]"
                            }`}
                            aria-hidden="true"
                          />
                          <span className="font-display text-sm sm:text-base tracking-tight leading-snug">
                            {s.title}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Active Service Narrative, Deliverables & CTA */}
                <div className="border-t border-[#001720]/10 pt-4">
                  <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-[#001720]">
                    {activeService.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#3B5260] leading-relaxed">
                    {activeService.summary}
                  </p>

                  {/* Three Verified Deliverables */}
                  <div className="mt-4 space-y-2">
                    {activeGeo.layers.map((layer) => (
                      <div
                        key={layer.title}
                        className="border-l-2 pl-2.5 transition-colors duration-500"
                        style={{ borderColor: activeGeo.primaryColor }}
                      >
                        <p className="font-display text-xs font-semibold text-[#001720]">
                          {layer.title}
                        </p>
                        <p className="text-[11px] text-[#5A707A] leading-snug">
                          {layer.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Sub-Service Tags & CTA Action */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {activeService.subServices.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#001720]/15 bg-white/80 px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-medium text-[#001720] transition-colors hover:border-[#0075A2] hover:text-[#0075A2]"
                      >
                        {sub.label} ↗
                      </a>
                    ))}

                    <button
                      type="button"
                      onClick={() => onSelectService && onSelectService(activeService.title)}
                      className="inline-flex items-center gap-1.5 bg-[#001720] px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-[#0075A2] transition-colors cursor-pointer"
                    >
                      <span>Request Audit</span>
                      <span className="text-[#FAAE39]" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CENTER STAGE: Expressive Transforming Geometric Composition */}
              <div className="col-span-5 xl:col-span-5 relative flex items-center justify-center min-h-[440px]">
                {/* Background Monumental Watermark Typography */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
                >
                  <span className="font-display text-[6.5rem] xl:text-[8rem] font-medium tracking-tight text-[#001720]/05 leading-none uppercase">
                    {activeGeo.watermark}
                  </span>
                </div>

                {/* Large Expressive Geometric Composition */}
                <div className="relative h-[380px] w-[380px] flex items-center justify-center pointer-events-none">
                  {/* Dominant Primary Angled Geometric Plane */}
                  <div
                    className="absolute transition-all duration-700 ease-out drop-shadow-[0_20px_36px_rgba(0,23,32,0.12)]"
                    style={{
                      clipPath: activeGeo.shape1.clipPath,
                      transform: activeGeo.shape1.transform,
                      width: activeGeo.shape1.width,
                      height: activeGeo.shape1.height,
                      backgroundColor: activeGeo.shape1.bg,
                      opacity: activeGeo.shape1.opacity,
                    }}
                  />

                  {/* Intersecting Secondary Geometric Slab */}
                  <div
                    className="absolute transition-all duration-700 ease-out"
                    style={{
                      clipPath: activeGeo.shape2.clipPath,
                      transform: activeGeo.shape2.transform,
                      width: activeGeo.shape2.width,
                      height: activeGeo.shape2.height,
                      backgroundColor: activeGeo.shape2.bg,
                      opacity: activeGeo.shape2.opacity,
                    }}
                  />

                  {/* Architectural Accent Vector Beam */}
                  <div
                    className="absolute transition-all duration-700 ease-out"
                    style={{
                      transform: activeGeo.beam.transform,
                      width: activeGeo.beam.width,
                      height: activeGeo.beam.height,
                      backgroundColor: activeGeo.beam.bg,
                    }}
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Restrained Technical Deliverables & Key Specs */}
              <div className="col-span-3 xl:col-span-3 pl-4 border-l border-[#001720]/10 flex flex-col justify-center space-y-6">
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0075A2] mb-1">
                    Benchmarks
                  </p>
                  <p className="font-display text-sm font-medium text-[#001720]">
                    Technical Specifications
                  </p>
                </div>

                {/* 3 Metric Benchmark Blocks */}
                <div className="space-y-5">
                  {activeMetric.specs.map((spec) => (
                    <div key={spec.label} className="border-t border-[#001720]/10 pt-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748B]">
                        {spec.label}
                      </p>
                      <p className="xn-tabular mt-1 font-display text-2xl xl:text-3xl font-medium tracking-tight text-[#001720]">
                        {spec.value}
                      </p>
                      <p className="mt-0.5 text-xs text-[#5A707A] leading-snug">
                        {spec.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM HORIZON PROGRESS BAR */}
          <div className="relative z-10 mx-auto w-full max-w-[1440px] pt-2">
            <div className="h-0.5 w-full bg-[#001720]/10 overflow-hidden">
              <div
                className="h-full bg-[#0075A2] transition-all duration-300 ease-out"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
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
          const geo = CAPABILITY_GEOMETRIES[sIdx] || CAPABILITY_GEOMETRIES[0];
          const metric = SERVICE_METRICS[sIdx] || SERVICE_METRICS[0];

          return (
            <article
              key={service.id}
              className="relative overflow-hidden border-b border-[#DCE5EA] pb-12"
            >
              {/* Atmospheric Background Geometry for Mobile */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-8 h-48 w-48 opacity-25"
                style={{
                  clipPath: geo.shape1.clipPath,
                  backgroundColor: geo.primaryColor,
                }}
              />

              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0075A2]">
                {service.categoryLabel}
              </p>

              <h3 className="mt-2 font-display text-3xl font-medium text-[#001720]">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#3B5260]">
                {service.summary}
              </p>

              {/* Mobile Geometric Graphic Strip */}
              <div className="relative my-6 h-36 w-full overflow-hidden border border-[#DCE5EA] bg-white flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2"
                  style={{
                    backgroundColor: geo.surfaceTint,
                    clipPath: geo.shape1.clipPath,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-24 w-40 opacity-90"
                  style={{
                    backgroundColor: geo.primaryColor,
                    clipPath: geo.shape1.clipPath,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-16 w-28 opacity-85"
                  style={{
                    backgroundColor: geo.secondaryColor,
                    clipPath: geo.shape2.clipPath,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-1 w-32"
                  style={{ backgroundColor: geo.accentColor }}
                />
              </div>

              {/* Deliverables List */}
              <div className="space-y-3 pt-2">
                {geo.layers.map((layer) => (
                  <div
                    key={layer.title}
                    className="border-l-2 pl-3"
                    style={{ borderColor: geo.primaryColor }}
                  >
                    <p className="font-display text-sm font-semibold text-[#001720]">
                      {layer.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#5A707A] leading-relaxed">
                      {layer.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile Technical Benchmarks */}
              <div className="my-6 grid grid-cols-3 gap-2 border-y border-[#DCE5EA] py-3 bg-white/50 px-2">
                {metric.specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-[#64748B]">
                      {spec.label}
                    </p>
                    <p className="font-display text-base font-semibold text-[#001720]">
                      {spec.value}
                    </p>
                    <p className="text-[10px] text-[#5A707A] leading-tight">
                      {spec.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Action & Links */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#DCE5EA]">
                <div className="flex flex-wrap items-center gap-1.5">
                  {service.subServices.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#DCE5EA] bg-white px-2.5 py-1 font-mono text-[11px] text-[#001720]"
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
