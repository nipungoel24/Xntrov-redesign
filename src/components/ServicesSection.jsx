"use client";

import { useState, useEffect, useRef } from "react";
import { CORE_SERVICES } from "@/data/xntrova-data";

/**
 * Geometric Blueprint configurations for each of the 6 Core Capabilities.
 * Inspired by Tresmares Private Equity minimalist editorial compositions:
 * - Dynamic shifting geometric planes (angled polygons, solid color blocks, architectural grid frames)
 * - Restrained Xntrova brand palette (#001720, #0075A2, #FAAE39, #C82318 on light surface #F4F8FA/white)
 * - Responsive to natural vertical scroll progression
 */
const CAPABILITY_GEOMETRIES = [
  {
    id: "seo",
    code: "SYS // CRAWL-INDEX-01",
    primaryColor: "#0075A2",
    secondaryColor: "#001720",
    accentColor: "#FAAE39",
    surfaceTint: "#EAF2F6",
    polygonClip: "polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)",
    initialPolygonOffset: "translate3d(0, 0, 0)",
    initialBlockOffset: "translate3d(16px, -12px, 0)",
    initialWireOffset: "translate3d(-14px, 18px, 0) rotate(-2deg)",
    layers: [
      { code: "01", title: "Crawl & Indexation", detail: "Core Web Vitals, JSON-LD schema hierarchy, and canonical architecture." },
      { code: "02", title: "Commercial Keywords", detail: "High-intent B2B topic clustering and authoritative link acquisition." },
      { code: "03", title: "Regional Dominance", detail: "Delhi NCR local pack authority paired with national organic pipeline." },
    ],
  },
  {
    id: "ppc",
    code: "SYS // ATTRIB-PPC-02",
    primaryColor: "#C82318",
    secondaryColor: "#0075A2",
    accentColor: "#FAAE39",
    surfaceTint: "#F6ECEB",
    polygonClip: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
    initialPolygonOffset: "translate3d(14px, 6px, 0)",
    initialBlockOffset: "translate3d(-18px, 14px, 0)",
    initialWireOffset: "translate3d(18px, -16px, 0) rotate(3deg)",
    layers: [
      { code: "01", title: "Intent Intercept", detail: "Exact-match search queries and Google Performance Max campaigns." },
      { code: "02", title: "Funnel Qualification", detail: "Message-matched landing page CRO and audience qualification." },
      { code: "03", title: "Attribution Telemetry", detail: "GA4, Google Tag Manager, and verified pipeline cost tracking." },
    ],
  },
  {
    id: "web-dev",
    code: "SYS // WEB-ENG-03",
    primaryColor: "#001720",
    secondaryColor: "#0075A2",
    accentColor: "#22D3EE",
    surfaceTint: "#EBF1F4",
    polygonClip: "polygon(0% 8%, 100% 0%, 94% 94%, 6% 100%)",
    initialPolygonOffset: "translate3d(-10px, -6px, 0)",
    initialBlockOffset: "translate3d(14px, -18px, 0)",
    initialWireOffset: "translate3d(-12px, 14px, 0) rotate(-1deg)",
    layers: [
      { code: "01", title: "Interface Architecture", detail: "Accessible, sub-second responsive UI engineered for engagement." },
      { code: "02", title: "Performance Engineering", detail: "Semantic markup, code-splitting, and 95+ Core Web Vitals speed." },
      { code: "03", title: "Lead Systems", detail: "Custom CMS integrations, API endpoints, and lead capture routing." },
    ],
  },
  {
    id: "ecommerce",
    code: "SYS // COMMERCE-04",
    primaryColor: "#0075A2",
    secondaryColor: "#FAAE39",
    accentColor: "#C82318",
    surfaceTint: "#EEF4F7",
    polygonClip: "polygon(6% 0%, 94% 0%, 100% 92%, 0% 100%)",
    initialPolygonOffset: "translate3d(8px, 12px, 0)",
    initialBlockOffset: "translate3d(-20px, -10px, 0)",
    initialWireOffset: "translate3d(16px, 18px, 0) rotate(2deg)",
    layers: [
      { code: "01", title: "Catalog Schema", detail: "Merchant feed structure, rich product data, and category taxonomy." },
      { code: "02", title: "Performance Shopping", detail: "High-intent Google Shopping, Meta catalog ads, and Amazon PPC." },
      { code: "03", title: "Retention CRO", detail: "Frictionless checkout paths and repeat-buyer lifecycle triggers." },
    ],
  },
  {
    id: "smo",
    code: "SYS // REPUTATION-05",
    primaryColor: "#C82318",
    secondaryColor: "#001720",
    accentColor: "#0075A2",
    surfaceTint: "#F5ECEB",
    polygonClip: "polygon(0% 0%, 100% 10%, 88% 100%, 12% 90%)",
    initialPolygonOffset: "translate3d(-12px, 10px, 0)",
    initialBlockOffset: "translate3d(18px, 16px, 0)",
    initialWireOffset: "translate3d(-18px, -14px, 0) rotate(-3deg)",
    layers: [
      { code: "01", title: "Brand Positioning", detail: "Authoritative social narrative tailored to executive decision-makers." },
      { code: "02", title: "Sentiment Radar", detail: "Proactive multi-channel sentiment listening and review monitoring." },
      { code: "03", title: "Reputation Governance", detail: "Crisis containment protocols and search-result brand defense (ORM)." },
    ],
  },
  {
    id: "content",
    code: "SYS // CONTENT-06",
    primaryColor: "#001720",
    secondaryColor: "#C82318",
    accentColor: "#FAAE39",
    surfaceTint: "#EAF0F3",
    polygonClip: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
    initialPolygonOffset: "translate3d(10px, -8px, 0)",
    initialBlockOffset: "translate3d(-14px, -16px, 0)",
    initialWireOffset: "translate3d(16px, 12px, 0) rotate(1deg)",
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
    const handleScroll = () => {
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
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const jumpToChapter = (targetIdx) => {
    setActiveIdx(targetIdx);
    if (!containerRef.current || window.innerWidth < 1024) return;

    const containerEl = containerRef.current;
    const rect = containerEl.getBoundingClientRect();
    const viewportH = window.innerHeight || 800;
    const scrollable = Math.max(1, rect.height - viewportH);
    const containerTopDoc = window.scrollY + rect.top;
    const targetY =
      containerTopDoc +
      (targetIdx / Math.max(1, CORE_SERVICES.length - 1)) * scrollable +
      16;

    window.scrollTo({
      top: targetY,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const activeService = CORE_SERVICES[activeIdx] || CORE_SERVICES[0];
  const activeGeo = CAPABILITY_GEOMETRIES[activeIdx] || CAPABILITY_GEOMETRIES[0];

  // Within-chapter dynamic delta for continuous geometric transformation
  const chapterProgress = (scrollProgress * CORE_SERVICES.length) % 1;
  const deltaX = Math.round((chapterProgress - 0.5) * 32);
  const deltaY = Math.round((chapterProgress - 0.5) * 20);
  const scaleDelta = (1 + (chapterProgress - 0.5) * 0.08).toFixed(3);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative border-b border-[#DCE5EA] bg-[#F4F8FA] text-[#001720]"
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
          DESKTOP STICKY GEOMETRIC SCROLL STAGE (lg+)
          Natural vertical scroll drives chapter progression & shape morphing
          ============================================================ */}
      <div
        ref={containerRef}
        style={{ minHeight: "320vh" }}
        className="hidden lg:block relative"
      >
        <div className="sticky top-20 flex h-[calc(100vh-5rem)] flex-col justify-between overflow-hidden px-8 py-8 xl:px-12">
          {/* Top Chapter Progress Track (Clean minimalist hair-track, no redundant counters) */}
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between border-b border-[#DCE5EA] pb-3">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#001720]">
                {activeService.title}
              </span>
              <span className="h-3 w-px bg-[#DCE5EA]" aria-hidden="true" />
              <span className="font-mono text-xs text-[#0075A2] uppercase tracking-[0.16em]">
                {activeService.categoryLabel}
              </span>
            </div>

            {/* Interactive Chapter Indicator Ticks */}
            <div
              role="tablist"
              aria-label="Direct discipline selector"
              className="flex items-center gap-2"
            >
              {CORE_SERVICES.map((svc, sIdx) => {
                const isCurrent = activeIdx === sIdx;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Jump to ${svc.title}`}
                    onClick={() => jumpToChapter(sIdx)}
                    className={`h-2 transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? "w-8 bg-[#001720]"
                        : "w-2 bg-[#D0DDE4] hover:bg-[#0075A2]"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Main Stage Grid: Left Narrative + Right Evolving Geometry */}
          <div className="mx-auto my-auto w-full max-w-[1440px] py-4">
            <div className="grid grid-cols-12 gap-12 xl:gap-16 items-center">
              {/* LEFT COLUMN (Cols 1-6): Typographic Narrative & Key Deliverables */}
              <div className="col-span-6 space-y-6">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#0075A2]">
                    {activeGeo.code}
                  </span>
                  <h3 className="mt-2 font-display text-4xl xl:text-5xl font-medium leading-[1.02] tracking-[-0.035em] text-[#001720]">
                    {activeService.title}
                  </h3>
                  <p className="mt-4 text-base xl:text-lg leading-relaxed text-[#3B5260] max-w-xl">
                    {activeService.summary}
                  </p>
                </div>

                {/* Three Real Deliverables with Architectural Line Accents */}
                <div className="border-t border-[#DCE5EA] pt-5">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                    {activeGeo.layers.map((layer) => (
                      <div
                        key={layer.code}
                        className="border-l-2 pl-3 transition-colors duration-300"
                        style={{ borderColor: activeGeo.primaryColor }}
                      >
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A909A]">
                          Layer {layer.code}
                        </span>
                        <p className="mt-1 font-display text-sm font-medium text-[#001720]">
                          {layer.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#5A707A]">
                          {layer.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-Specializations & Action */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#DCE5EA] pt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {activeService.subServices.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#DCE5EA] bg-white px-3 py-1.5 font-mono text-[11px] font-medium text-[#001720] transition-colors hover:border-[#0075A2] hover:text-[#0075A2]"
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

              {/* RIGHT COLUMN (Cols 7-12): Dynamic Morphing Geometric Composition */}
              <div className="col-span-6">
                <div className="relative h-[440px] xl:h-[480px] w-full overflow-hidden border border-[#D5E1E7] bg-white p-8 flex items-center justify-center shadow-xs">
                  {/* Layer 1: Large Angled Architectural Polygon Plane (Transforms with Scroll) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-4 transition-all duration-500 ease-out"
                    style={{
                      backgroundColor: activeGeo.surfaceTint,
                      clipPath: activeGeo.polygonClip,
                      transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleDelta})`,
                    }}
                  />

                  {/* Layer 2: Shifting Solid Color Architectural Block */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute h-36 w-52 sm:h-44 sm:w-64 opacity-90 transition-all duration-500 ease-out"
                    style={{
                      backgroundColor: activeGeo.primaryColor,
                      clipPath: "polygon(14% 0%, 100% 0%, 86% 100%, 0% 100%)",
                      transform: `translate3d(${-deltaX * 1.2}px, ${deltaY * 1.1}px, 0)`,
                    }}
                  />

                  {/* Layer 3: Secondary Accent Geometric Plane */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute h-24 w-36 sm:h-28 sm:w-44 opacity-80 transition-all duration-500 ease-out"
                    style={{
                      backgroundColor: activeGeo.secondaryColor,
                      clipPath: "polygon(0% 0%, 82% 0%, 100% 100%, 18% 100%)",
                      transform: `translate3d(${deltaX * 1.5}px, ${-deltaY * 1.3}px, 0)`,
                    }}
                  />

                  {/* Layer 4: Shifting Wireframe Geometric Frame */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute h-52 w-72 sm:h-60 sm:w-84 border-2 transition-all duration-500 ease-out"
                    style={{
                      borderColor: activeGeo.accentColor,
                      transform: `translate3d(${deltaY}px, ${-deltaX}px, 0) rotate(${(chapterProgress - 0.5) * 6}deg)`,
                    }}
                  />

                  {/* Top-Right Architectural Coordinate Stamp */}
                  <div className="absolute top-5 right-6 z-10 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#5A707A]">
                    {activeGeo.code}
                  </div>

                  {/* Bottom-Left Capability Focus Emblem */}
                  <div className="absolute bottom-5 left-6 z-10 flex items-center gap-2.5">
                    <span
                      className="h-2 w-2 transition-colors duration-300"
                      style={{ backgroundColor: activeGeo.primaryColor }}
                    />
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#001720]">
                      {activeService.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Horizon Strip (Clean negative space, no extra decoration) */}
          <div className="mx-auto w-full max-w-[1440px] pt-2" />
        </div>
      </div>

      {/* ============================================================
          MOBILE & TABLET SEQUENTIAL CHAPTERS (< lg)
          Natural, accessible, touch-friendly reading flow with proportionate geometry
          ============================================================ */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:hidden space-y-10">
        {CORE_SERVICES.map((service, sIdx) => {
          const geo = CAPABILITY_GEOMETRIES[sIdx] || CAPABILITY_GEOMETRIES[0];

          return (
            <article
              key={service.id}
              className="border border-[#D5E1E7] bg-white p-6 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-[#E4ECEF] pb-3 mb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#0075A2]">
                  {geo.code}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A707A]">
                  {service.categoryLabel}
                </span>
              </div>

              <h3 className="font-display text-2xl font-medium text-[#001720]">
                {service.title}
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#3B5260]">
                {service.summary}
              </p>

              {/* Mobile Geometric Visual Frame */}
              <div className="relative my-5 h-44 w-full overflow-hidden border border-[#E2ECF0] bg-[#F8FAFB] flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3"
                  style={{
                    backgroundColor: geo.surfaceTint,
                    clipPath: geo.polygonClip,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-24 w-36 opacity-85"
                  style={{
                    backgroundColor: geo.primaryColor,
                    clipPath: "polygon(14% 0%, 100% 0%, 86% 100%, 0% 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-16 w-24 opacity-80"
                  style={{
                    backgroundColor: geo.secondaryColor,
                    clipPath: "polygon(0% 0%, 82% 0%, 100% 100%, 18% 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-28 w-44 border-2"
                  style={{ borderColor: geo.accentColor }}
                />
              </div>

              {/* Deliverables List */}
              <div className="space-y-2 border-t border-[#E4ECEF] pt-4">
                {geo.layers.map((layer) => (
                  <div key={layer.code} className="flex items-baseline gap-2.5">
                    <span
                      className="font-mono text-[10px] font-bold text-[#C82318]"
                    >
                      {layer.code}.
                    </span>
                    <span className="text-xs font-medium text-[#001720]">
                      {layer.title} —
                    </span>
                    <span className="text-xs text-[#5A707A]">
                      {layer.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="mt-5 pt-4 border-t border-[#E4ECEF] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {service.subServices.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#DCE5EA] bg-[#F8FAFB] px-2 py-1 font-mono text-[10px] text-[#001720]"
                    >
                      {sub.label} ↗
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService && onSelectService(service.title)}
                  className="bg-[#001720] px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-white"
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
