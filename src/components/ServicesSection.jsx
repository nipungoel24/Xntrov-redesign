"use client";

import { useState, useEffect, useRef } from "react";
import { CORE_SERVICES } from "@/data/xntrova-data";

/**
 * Geometric configurations for the 6 Core Capabilities.
 * Inspired by Tresmares Capital Private Equity full-stage geometric compositions:
 * - Large, monumental geometric planes spanning across the visual stage
 * - Asymmetrical overlapping planes with real geometry transformations (clip-path, scale, position, rotation)
 * - Restrained, authoritative Xntrova palette (#001720, #0075A2, #FAAE39, #C82318, #22D3EE)
 * - Seamless bidirectional vertical scroll driver
 */
const CAPABILITY_GEOMETRIES = [
  {
    id: "seo",
    primaryColor: "#0075A2",
    secondaryColor: "#001720",
    accentColor: "#FAAE39",
    surfaceTint: "rgba(0, 117, 162, 0.08)",
    // Dominant Primary Plane (Large angled polygon spanning right-center stage)
    shape1: {
      clipPath: "polygon(14% 0%, 100% 0%, 86% 100%, 0% 100%)",
      transform: "translate3d(10vw, -4vh, 0) rotate(-4deg)",
      width: "48vw",
      height: "76vh",
      bg: "#0075A2",
      opacity: 0.94,
    },
    // Intersecting Secondary Plane
    shape2: {
      clipPath: "polygon(0% 16%, 100% 0%, 84% 100%, 0% 84%)",
      transform: "translate3d(24vw, 22vh, 0) rotate(4deg)",
      width: "32vw",
      height: "44vh",
      bg: "#001720",
      opacity: 0.90,
    },
    // Architectural Accent Trajectory Beam
    beam: {
      transform: "translate3d(14vw, 12vh, 0) rotate(12deg)",
      width: "28vw",
      height: "3px",
      bg: "#FAAE39",
    },
    layers: [
      { code: "01", title: "Crawl & Indexation", detail: "Core Web Vitals, JSON-LD schema hierarchy, and canonical architecture." },
      { code: "02", title: "Commercial Keywords", detail: "High-intent B2B topic clustering and authoritative link acquisition." },
      { code: "03", title: "Regional Dominance", detail: "Delhi NCR local pack authority paired with national organic pipeline." },
    ],
  },
  {
    id: "ppc",
    primaryColor: "#C82318",
    secondaryColor: "#0075A2",
    accentColor: "#FAAE39",
    surfaceTint: "rgba(200, 35, 24, 0.08)",
    shape1: {
      clipPath: "polygon(0% 0%, 100% 28%, 76% 100%, 14% 82%)",
      transform: "translate3d(12vw, -6vh, 0) rotate(7deg) scale(1.02)",
      width: "48vw",
      height: "78vh",
      bg: "#C82318",
      opacity: 0.92,
    },
    shape2: {
      clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)",
      transform: "translate3d(8vw, 26vh, 0) rotate(-5deg)",
      width: "34vw",
      height: "42vh",
      bg: "#0075A2",
      opacity: 0.88,
    },
    beam: {
      transform: "translate3d(14vw, 18vh, 0) rotate(-14deg)",
      width: "34vw",
      height: "4px",
      bg: "#FAAE39",
    },
    layers: [
      { code: "01", title: "Intent Intercept", detail: "Exact-match search queries and Google Performance Max campaigns." },
      { code: "02", title: "Funnel Qualification", detail: "Message-matched landing page CRO and audience qualification." },
      { code: "03", title: "Attribution Telemetry", detail: "GA4, Google Tag Manager, and verified pipeline cost tracking." },
    ],
  },
  {
    id: "web-dev",
    primaryColor: "#001720",
    secondaryColor: "#0075A2",
    accentColor: "#22D3EE",
    surfaceTint: "rgba(0, 23, 32, 0.08)",
    shape1: {
      clipPath: "polygon(0% 0%, 96% 6%, 100% 100%, 4% 94%)",
      transform: "translate3d(11vw, 2vh, 0) rotate(-3deg) scale(0.98)",
      width: "48vw",
      height: "72vh",
      bg: "#001720",
      opacity: 0.96,
    },
    shape2: {
      clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
      transform: "translate3d(26vw, -6vh, 0) rotate(5deg)",
      width: "28vw",
      height: "48vh",
      bg: "#22D3EE",
      opacity: 0.85,
    },
    beam: {
      transform: "translate3d(14vw, 16vh, 0) rotate(0deg)",
      width: "34vw",
      height: "3px",
      bg: "#0075A2",
    },
    layers: [
      { code: "01", title: "Interface Architecture", detail: "Accessible, sub-second responsive UI engineered for engagement." },
      { code: "02", title: "Performance Engineering", detail: "Semantic markup, code-splitting, and 95+ Core Web Vitals speed." },
      { code: "03", title: "Lead Systems", detail: "Custom CMS integrations, API endpoints, and lead capture routing." },
    ],
  },
  {
    id: "ecommerce",
    primaryColor: "#0075A2",
    secondaryColor: "#FAAE39",
    accentColor: "#C82318",
    surfaceTint: "rgba(250, 174, 57, 0.09)",
    shape1: {
      clipPath: "polygon(0% 14%, 86% 0%, 100% 86%, 14% 100%)",
      transform: "translate3d(11vw, -4vh, 0) rotate(8deg)",
      width: "48vw",
      height: "72vh",
      bg: "#0075A2",
      opacity: 0.90,
    },
    shape2: {
      clipPath: "polygon(16% 0%, 100% 12%, 84% 100%, 0% 88%)",
      transform: "translate3d(22vw, 22vh, 0) rotate(-6deg)",
      width: "32vw",
      height: "44vh",
      bg: "#FAAE39",
      opacity: 0.92,
    },
    beam: {
      transform: "translate3d(10vw, 16vh, 0) rotate(-8deg)",
      width: "30vw",
      height: "4px",
      bg: "#C82318",
    },
    layers: [
      { code: "01", title: "Catalog Schema", detail: "Merchant feed structure, rich product data, and category taxonomy." },
      { code: "02", title: "Performance Shopping", detail: "High-intent Google Shopping, Meta catalog ads, and Amazon PPC." },
      { code: "03", title: "Retention CRO", detail: "Frictionless checkout paths and repeat-buyer lifecycle triggers." },
    ],
  },
  {
    id: "smo",
    primaryColor: "#C82318",
    secondaryColor: "#001720",
    accentColor: "#0075A2",
    surfaceTint: "rgba(200, 35, 24, 0.08)",
    shape1: {
      clipPath: "polygon(0% 0%, 100% 0%, 78% 100%, 22% 100%)",
      transform: "translate3d(12vw, -2vh, 0) rotate(-5deg)",
      width: "48vw",
      height: "78vh",
      bg: "#C82318",
      opacity: 0.92,
    },
    shape2: {
      clipPath: "polygon(12% 0%, 100% 16%, 88% 100%, 0% 84%)",
      transform: "translate3d(20vw, 26vh, 0) rotate(5deg)",
      width: "36vw",
      height: "46vh",
      bg: "#001720",
      opacity: 0.94,
    },
    beam: {
      transform: "translate3d(10vw, 32vh, 0) rotate(6deg)",
      width: "36vw",
      height: "3px",
      bg: "#0075A2",
    },
    layers: [
      { code: "01", title: "Brand Positioning", detail: "Authoritative social narrative tailored to executive decision-makers." },
      { code: "02", title: "Sentiment Radar", detail: "Proactive multi-channel sentiment listening and review monitoring." },
      { code: "03", title: "Reputation Governance", detail: "Crisis containment protocols and search-result brand defense (ORM)." },
    ],
  },
  {
    id: "content",
    primaryColor: "#001720",
    secondaryColor: "#C82318",
    accentColor: "#FAAE39",
    surfaceTint: "rgba(0, 23, 32, 0.08)",
    shape1: {
      clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
      transform: "translate3d(12vw, 4vh, 0) rotate(4deg)",
      width: "48vw",
      height: "70vh",
      bg: "#001720",
      opacity: 0.95,
    },
    shape2: {
      clipPath: "polygon(0% 12%, 88% 0%, 100% 88%, 12% 100%)",
      transform: "translate3d(26vw, -8vh, 0) rotate(-4deg)",
      width: "30vw",
      height: "48vh",
      bg: "#FAAE39",
      opacity: 0.90,
    },
    beam: {
      transform: "translate3d(14vw, 20vh, 0) rotate(-10deg)",
      width: "32vw",
      height: "4px",
      bg: "#C82318",
    },
    layers: [
      { code: "01", title: "Editorial Authority", detail: "Original research, technical guides, and search-aligned articles." },
      { code: "02", title: "Lifecycle Email", detail: "Automated nurture sequences and segmentation for qualified pipeline." },
      { code: "03", title: "Visual Storytelling", detail: "Custom infographics, motion assets, and commercial video creative." },
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

  const activeService = CORE_SERVICES[activeIdx] || CORE_SERVICES[0];
  const activeGeo = CAPABILITY_GEOMETRIES[activeIdx] || CAPABILITY_GEOMETRIES[0];

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
          DESKTOP FULL-STAGE SCROLL-DRIVEN GEOMETRIC EXPERIENCE (lg+)
          Natural vertical scroll drives dramatic shape morphing across all 6 disciplines.
          Completely free of small cards, framed boxes, or decorative counters.
          ============================================================ */}
      <div
        ref={containerRef}
        style={{ minHeight: "360vh" }}
        className="hidden lg:block relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-8 py-10 lg:px-12 xl:px-16">
          {/* FULL-STAGE GEOMETRIC BACKDROP (Large Asymmetric Overlapping Planes) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* Ambient Tonal Wash */}
            <div
              className="absolute inset-0 transition-colors duration-700 ease-out"
              style={{ backgroundColor: activeGeo.surfaceTint }}
            />

            {/* Dominant Primary Angled Geometric Plane */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-700 ease-out drop-shadow-[0_24px_48px_rgba(0,23,32,0.12)]"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
              style={{
                clipPath: activeGeo.shape2.clipPath,
                transform: activeGeo.shape2.transform,
                width: activeGeo.shape2.width,
                height: activeGeo.shape2.height,
                backgroundColor: activeGeo.shape2.bg,
                opacity: activeGeo.shape2.opacity,
              }}
            />

            {/* Architectural Accent Beam / Trajectory Vector */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
              style={{
                transform: activeGeo.beam.transform,
                width: activeGeo.beam.width,
                height: activeGeo.beam.height,
                backgroundColor: activeGeo.beam.bg,
              }}
            />
          </div>

          {/* TOP STAGE BAR: Minimalist Category Tracking Bar */}
          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between border-b border-[#001720]/10 pb-4">
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

            {/* Subtle Progress Bar */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {CORE_SERVICES.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 transition-all duration-500 ${
                    idx === activeIdx
                      ? "w-8 bg-[#001720]"
                      : "w-2 bg-[#001720]/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* MAIN STAGE COMPOSITION: Monumental Typography & Deliverables */}
          <div className="relative z-10 mx-auto my-auto w-full max-w-[1440px] py-6">
            <div className="max-w-2xl xl:max-w-3xl">
              {/* Category Eyebrow */}
              <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#0075A2]">
                {activeService.categoryLabel}
              </p>

              {/* Monumental Service Title */}
              <h3 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.75rem] font-medium leading-[1.0] tracking-[-0.035em] text-[#001720] transition-all duration-500">
                {activeService.title}
              </h3>

              {/* Supporting Editorial Summary */}
              <p className="mt-5 text-base sm:text-lg lg:text-xl leading-relaxed text-[#2B3E48] max-w-xl transition-all duration-500">
                {activeService.summary}
              </p>

              {/* Three Verified Deliverables (Directly in Negative Space with Clear Separation) */}
              <div className="mt-8 border-t border-[#001720]/12 pt-6 max-w-2xl xl:max-w-3xl">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {activeGeo.layers.map((layer) => (
                    <div
                      key={layer.title}
                      className="border-l-2 pl-3.5 transition-colors duration-500"
                      style={{ borderColor: activeGeo.primaryColor }}
                    >
                      <p className="font-display text-sm sm:text-base font-semibold text-[#001720]">
                        {layer.title}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-[#4A6270] leading-relaxed">
                        {layer.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-Specializations & CTA Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  {activeService.subServices.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#001720]/15 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 font-mono text-xs font-medium text-[#001720] transition-colors hover:border-[#0075A2] hover:text-[#0075A2]"
                    >
                      {sub.label} ↗
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService && onSelectService(activeService.title)}
                  className="inline-flex items-center gap-2 bg-[#001720] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#0075A2] transition-colors cursor-pointer"
                >
                  <span>Request Audit</span>
                  <span className="text-[#FAAE39]" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM HORIZON FOOTER */}
          <div className="relative z-10 mx-auto w-full max-w-[1440px] pt-2" />
        </div>
      </div>

      {/* ============================================================
          MOBILE & TABLET SEQUENTIAL CHAPTERS (< lg)
          Natural, accessible, touch-friendly reading flow with expansive geometry
          ============================================================ */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:hidden space-y-16">
        {CORE_SERVICES.map((service, sIdx) => {
          const geo = CAPABILITY_GEOMETRIES[sIdx] || CAPABILITY_GEOMETRIES[0];

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
