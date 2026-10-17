"use client";

import { useState, useEffect, useRef } from "react";
import {
  CLIENT_CAPABILITY_SHOWCASE,
  PORTFOLIO_FILTERS,
} from "@/data/xntrova-data";

/**
 * Geometric configuration per project stage inspired by Tresmares Private Equity
 * (https://www.tresmarescapital.com/en/financial-solutions/private-equity/)
 * Uses only Xntrova palette (#001720, #0075A2, #FAAE39) + restrained crimson (#C82318) on light canvas.
 */
const STAGE_GEOMETRY = [
  {
    primaryColor: "#0075A2",
    secondaryColor: "#C82318",
    surfaceTint: "#EAF2F6",
    clipPolygon: "polygon(0% 0%, 88% 0%, 100% 100%, 12% 100%)",
    planeTransform: "translate3d(0px, 0px, 0) rotate(0deg)",
    accentPosition: "top-6 right-8 w-44 h-44",
    tagAccent: "#0075A2",
    architectureCode: "ARCH // CLOUD-SEO-01",
    layers: [
      { code: "L1", title: "Cloud Taxonomy", detail: "AWS & Azure solution hierarchy" },
      { code: "L2", title: "Enterprise SERP", detail: "High-intent B2B search capture" },
      { code: "L3", title: "Pipeline Attribution", detail: "Technical lead qualification" },
    ],
  },
  {
    primaryColor: "#C82318",
    secondaryColor: "#001720",
    surfaceTint: "#F5ECEB",
    clipPolygon: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
    planeTransform: "translate3d(12px, -8px, 0) rotate(0deg)",
    accentPosition: "bottom-6 right-10 w-52 h-36",
    tagAccent: "#C82318",
    architectureCode: "GOV // PORTAL-STD-02",
    layers: [
      { code: "L1", title: "WCAG 2.1 AA Core", detail: "Accessible civic web standards" },
      { code: "L2", title: "Information Grid", detail: "Structured national policy portals" },
      { code: "L3", title: "Citizen Reach", detail: "Mobile-first public communication" },
    ],
  },
  {
    primaryColor: "#001720",
    secondaryColor: "#FAAE39",
    surfaceTint: "#EBF1F4",
    clipPolygon: "polygon(0% 8%, 100% 0%, 100% 92%, 0% 100%)",
    planeTransform: "translate3d(-10px, 6px, 0) rotate(0deg)",
    accentPosition: "top-8 left-8 w-48 h-40",
    tagAccent: "#0075A2",
    architectureCode: "D2C // COMMERCE-03",
    layers: [
      { code: "L1", title: "Catalog Schema", detail: "Rich product & jewelry taxonomy" },
      { code: "L2", title: "Paid Acquisition", detail: "Google Shopping & Meta dynamic ads" },
      { code: "L3", title: "Marketplace Scale", detail: "Checkout & AOV conversion flow" },
    ],
  },
  {
    primaryColor: "#0075A2",
    secondaryColor: "#001720",
    surfaceTint: "#E9F3F7",
    clipPolygon: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
    planeTransform: "translate3d(8px, 10px, 0) rotate(0deg)",
    accentPosition: "bottom-8 left-10 w-44 h-44",
    tagAccent: "#0075A2",
    architectureCode: "MED // LOCAL-ORM-04",
    layers: [
      { code: "L1", title: "Local Pack Authority", detail: "Delhi NCR clinical radius SEO" },
      { code: "L2", title: "Patient Trust (ORM)", detail: "Verified review & sentiment governance" },
      { code: "L3", title: "Care Content", detail: "Specialist medical authority pages" },
    ],
  },
  {
    primaryColor: "#C82318",
    secondaryColor: "#0075A2",
    surfaceTint: "#F4EDEC",
    clipPolygon: "polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)",
    planeTransform: "translate3d(-8px, -6px, 0) rotate(0deg)",
    accentPosition: "top-6 right-12 w-56 h-36",
    tagAccent: "#C82318",
    architectureCode: "ACQ // DEMAND-GEN-05",
    layers: [
      { code: "L1", title: "Booking Engines", detail: "High-speed inquiry web architecture" },
      { code: "L2", title: "Search Capture", detail: "Commercial intent PPC & organic" },
      { code: "L3", title: "Lead Routing", detail: "Instant callback & CRM automation" },
    ],
  },
  {
    primaryColor: "#001720",
    secondaryColor: "#C82318",
    surfaceTint: "#EAEFF2",
    clipPolygon: "polygon(6% 0%, 100% 6%, 94% 100%, 0% 94%)",
    planeTransform: "translate3d(6px, -8px, 0) rotate(0deg)",
    accentPosition: "bottom-6 right-8 w-48 h-48",
    tagAccent: "#001720",
    architectureCode: "IND // B2B-SPEC-06",
    layers: [
      { code: "L1", title: "Technical Spec SEO", detail: "Industrial catalog indexation" },
      { code: "L2", title: "RFQ Workflows", detail: "Procurement & engineer inquiry paths" },
      { code: "L3", title: "Distributor Reach", detail: "National B2B search authority" },
    ],
  },
];

/**
 * Geometric Architectural Composition for each project stage.
 * Uses overlapping CSS/SVG geometric planes, angular polygons, and verified client marks.
 */
function ProjectGeometricStage({ item, index, isCurrent }) {
  const geo = STAGE_GEOMETRY[index % STAGE_GEOMETRY.length];

  return (
    <div className="relative w-full overflow-hidden border border-[#D2DFE6] bg-white p-6 sm:p-8 lg:p-9">
      {/* Background Evolving Geometric Plane (Angled Polygon) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-64 w-72 transition-all duration-700 ease-out"
        style={{
          backgroundColor: geo.surfaceTint,
          clipPath: geo.clipPolygon,
          transform: isCurrent ? "scale(1.05)" : "scale(0.95)",
        }}
      />

      {/* Solid Geometric Accent Bar (Left Architectural Spine) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-2 transition-colors duration-500"
        style={{ backgroundColor: geo.primaryColor }}
      />

      {/* Overlapping Secondary Geometric Block (Corner Architectural Plane) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-3 sm:right-6 sm:top-5 h-7 w-12 sm:h-11 sm:w-20 opacity-90 transition-all duration-500"
        style={{
          backgroundColor: geo.primaryColor,
          clipPath: "polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-12 top-6 sm:right-20 sm:top-10 h-5 w-8 sm:h-7 sm:w-12 opacity-85 transition-all duration-500"
        style={{
          backgroundColor: geo.secondaryColor,
        }}
      />

      {/* Top Architectural Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-[#E2ECF0] pb-3.5 pr-20 sm:pr-28">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0"
            style={{ backgroundColor: geo.secondaryColor }}
          />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#001720]">
            {geo.architectureCode}
          </span>
        </div>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#536B78]">
          {item.sector}
        </span>
      </div>

      {/* Structural 3-Pillar Mandate Schematic */}
      <div className="relative z-10 my-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {geo.layers.map((layer, lIdx) => (
          <div
            key={layer.code}
            className="relative border border-[#DCE6EC] bg-[#FAFDFE] p-4 transition-colors"
          >
            <div
              className="mb-2 flex items-center justify-between border-b border-[#E6EEF2] pb-2"
            >
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: lIdx === 1 ? geo.secondaryColor : geo.primaryColor }}
              >
                {layer.code} // MANDATE
              </span>
              <span
                className="h-1.5 w-6"
                style={{
                  backgroundColor:
                    lIdx === 0
                      ? geo.primaryColor
                      : lIdx === 1
                      ? geo.secondaryColor
                      : "#001720",
                }}
              />
            </div>
            <p className="font-display text-sm font-semibold text-[#001720]">
              {layer.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#4A6270]">
              {layer.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Verified Client Identity Plinth */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#E2ECF0] pt-4">
        <div className="flex flex-wrap items-center gap-3">
          {item.logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex h-10 items-center border border-[#DCE6EC] bg-white px-3.5 py-1.5 shadow-2xs"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-6 w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2"
            style={{ backgroundColor: geo.primaryColor }}
          />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4A6270]">
            Verified Client Engagement
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * PortfolioSection — Priority 6
 * Tresmares-Inspired Geometric Scroll-Driven Work Showcase:
 * - Strong introductory editorial heading with stair-stepped typography and geometric planes.
 * - Scroll-driven horizontal showcase on desktop where background & foreground geometric planes
 *   shift in position, dimensions, clip-path angle, and brand accent color (#0075A2, #C82318, #001720, #FAAE39)
 *   on a crisp light architectural surface (#F4F8FA / #FFFFFF).
 * - Touch-friendly horizontal snap track on mobile/tablet with keyboard & button controls.
 */
export default function PortfolioSection({ onSelectService }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);

  const trackRef = useRef(null);
  const mobileScrollRef = useRef(null);

  const filteredItems =
    activeFilter === "all"
      ? CLIENT_CAPABILITY_SHOWCASE
      : CLIENT_CAPABILITY_SHOWCASE.filter(
          (item) => item.category === activeFilter
        );

  const safeActiveIndex = Math.min(
    desktopActiveIndex,
    Math.max(0, filteredItems.length - 1)
  );
  const activeGeo = STAGE_GEOMETRY[safeActiveIndex % STAGE_GEOMETRY.length];

  // Desktop vertical-to-horizontal scroll synchronization
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;

        const trackEl = trackRef.current;
        if (!trackEl || window.innerWidth < 1024) return;

        const rect = trackEl.getBoundingClientRect();
        const viewportH = window.innerHeight || 800;
        const scrollable = Math.max(1, rect.height - viewportH);
        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

        setScrollProgress(progress);

        const count = filteredItems.length;
        const idx = Math.min(
          count - 1,
          Math.max(0, Math.floor(progress * count))
        );
        setDesktopActiveIndex(idx);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [filteredItems.length]);

  // Mobile scroll buttons
  const scrollMobile = (direction) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative bg-[#F4F8FA] text-[#001720]"
    >
      {/* ============================================================
          INTRODUCTORY EDITORIAL STATEMENT + GEOMETRIC COMPOSITIONAL HEADER
          Inspired by Tresmares Private Equity stair-stepped typography & shapes
          ============================================================ */}
      <div className="relative overflow-hidden border-b border-[#D5E1E7] bg-white">
        {/* Large Architectural Geometric Planes in Header Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-0 hidden lg:block h-full w-[420px] bg-[#EEF4F7]"
          style={{
            clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-64 top-10 hidden lg:block h-28 w-44 bg-[#0075A2]/10"
          style={{
            clipPath: "polygon(14% 0%, 100% 0%, 86% 100%, 0% 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            {/* Left 7 Cols: Stair-Stepped Editorial Title */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="h-2.5 w-2.5 bg-[#C82318]" aria-hidden="true" />
                <span className="xn-tabular font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#0075A2]">
                  Selected Client Mandates
                </span>
              </div>

              <h2
                id="portfolio-heading"
                className="font-display text-3xl sm:text-5xl lg:text-[3.4rem] font-medium leading-[1.03] tracking-[-0.03em] text-[#001720]"
              >
                <span className="block">Proven Digital</span>
                <span className="block sm:pl-10 lg:pl-14 text-[#0075A2]">
                  Mandates Across
                </span>
                <span className="block">Enterprise &amp; Retail.</span>
              </h2>
            </div>

            {/* Right 5 Cols: Framing Statement & Sector Filters */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <p className="text-sm sm:text-base leading-relaxed text-[#3B5260] max-w-xl">
                Every engagement is engineered around verified technical
                architecture, search authority, and measurable commercial
                delivery across India&apos;s leading enterprise, public-sector,
                and consumer brands.
              </p>

              {/* Sector Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter client mandates by sector"
                className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DCE6EC]"
              >
                {PORTFOLIO_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        setActiveFilter(filter.id);
                        setScrollProgress(0);
                        setDesktopActiveIndex(0);
                      }}
                      className={`px-3.5 py-2 text-xs font-mono uppercase tracking-[0.14em] transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#001720] text-white font-semibold shadow-xs"
                          : "bg-[#F4F8FA] text-[#4A6270] hover:bg-[#E5EFF4] hover:text-[#001720]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          DESKTOP STICKY GEOMETRIC SCROLL STAGE (lg+)
          Vertical scrolling drives horizontal mandate progression & evolving geometry
          ============================================================ */}
      <div
        ref={trackRef}
        style={{ minHeight: "280vh" }}
        className="hidden lg:block relative"
      >
        <div className="lg:sticky lg:top-16 lg:flex lg:h-[calc(100dvh-4rem)] lg:flex-col lg:justify-between lg:overflow-hidden">
          {/* Dynamic Evolving Background Geometric Shapes (Respond to Scroll & Active Stage) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* Large Angled Architectural Polygon Plane */}
            <div
              className="absolute -top-12 h-[115%] w-[46%] transition-all duration-700 ease-out"
              style={{
                left: `${18 + scrollProgress * 32}%`,
                backgroundColor: activeGeo.surfaceTint,
                clipPath: activeGeo.clipPolygon,
              }}
            />

            {/* Shifting Solid Color Geometric Block */}
            <div
              className="absolute top-12 h-24 w-36 opacity-15 transition-all duration-700 ease-out"
              style={{
                left: `${58 - scrollProgress * 28}%`,
                backgroundColor: activeGeo.primaryColor,
                clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
              }}
            />

            {/* Shifting Wireframe Geometric Rectangle */}
            <div
              className="absolute bottom-14 h-48 w-72 border-2 border-[#0075A2]/15 transition-all duration-700 ease-out"
              style={{
                right: `${8 + scrollProgress * 24}%`,
                transform: `translate3d(0, -${scrollProgress * 24}px, 0)`,
              }}
            />
          </div>

          {/* Top Stage Bar: Client & Sector Indicator (No serial counts, progression bars, or decorative labels) */}
          <div className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center border-b border-[#D5E1E7] bg-white/90 backdrop-blur-xs px-8 xl:px-12 py-3.5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#001720]">
                {filteredItems[safeActiveIndex]?.clientName}
              </span>
              <span className="h-3.5 w-px bg-[#D5E1E7]" aria-hidden="true" />
              <span className="text-xs font-medium text-[#4A6270]">
                {filteredItems[safeActiveIndex]?.sector}
              </span>
            </div>
          </div>

          {/* Center Horizontal Progressing Geometric Panels */}
          <div className="relative z-10 flex-1 overflow-hidden px-8 xl:px-12 flex items-center">
            <div
              className="flex items-stretch gap-10 transition-transform duration-150 ease-out py-4 will-change-transform"
              style={{
                transform: `translate3d(-${
                  scrollProgress * Math.max(0, (filteredItems.length - 1) * 900)
                }px, 0, 0)`,
              }}
            >
              {filteredItems.map((item, idx) => {
                const isCurrent = safeActiveIndex === idx;
                const geo = STAGE_GEOMETRY[idx % STAGE_GEOMETRY.length];

                return (
                  <article
                    key={item.id}
                    className={`relative w-[860px] xl:w-[920px] shrink-0 border transition-all duration-300 bg-white p-7 xl:p-9 flex flex-col justify-between ${
                      isCurrent
                        ? "border-[#001720] shadow-[0_20px_50px_rgba(0,23,32,0.08)]"
                        : "border-[#D5E1E7] opacity-85"
                    }`}
                  >
                    {/* Top Editorial Row: Client Headline, Sector & Name (large card serial numbers removed) */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between gap-4 border-b border-[#E2ECF0] pb-3.5 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="h-2 w-2"
                            style={{ backgroundColor: geo.secondaryColor }}
                            aria-hidden="true"
                          />
                          <span
                            className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
                            style={{ color: geo.primaryColor }}
                          >
                            {item.headline}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4A6270]">
                          {item.sector}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl xl:text-3xl font-medium tracking-[-0.02em] text-[#001720]">
                        {item.clientName}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#3B5260]">
                        {item.summary}
                      </p>
                    </div>

                    {/* Middle Geometric Architectural Stage */}
                    <ProjectGeometricStage
                      item={item}
                      index={idx}
                      isCurrent={isCurrent}
                    />

                    {/* Bottom Deliverables & Direct Scope CTA */}
                    <div className="mt-6 pt-5 border-t border-[#E2ECF0] flex items-center justify-between gap-6">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.deliverables.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-2 border border-[#D5E1E7] bg-[#F4F8FA] px-3 py-1.5 font-mono text-[11px] font-medium text-[#001720]"
                          >
                            <span
                              className="h-1.5 w-1.5"
                              style={{ backgroundColor: geo.secondaryColor }}
                            />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onSelectService &&
                          onSelectService(item.relatedService)
                        }
                        className="shrink-0 inline-flex items-center gap-2.5 bg-[#001720] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#0075A2] transition-colors cursor-pointer"
                      >
                        <span>Request Similar Scope</span>
                        <span className="text-[#FAAE39]" aria-hidden="true">
                          →
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================
          MOBILE & TABLET GEOMETRIC SHOWCASE (< lg)
          Touch-friendly horizontal snap-scroll track with full accessibility
          ============================================================ */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:hidden">
        <div
          ref={mobileScrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 pt-1 scrollbar-none"
        >
          {filteredItems.map((item, idx) => {
            const geo = STAGE_GEOMETRY[idx % STAGE_GEOMETRY.length];
            return (
              <article
                key={item.id}
                className="w-[88vw] max-w-[400px] shrink-0 snap-center border border-[#D5E1E7] bg-white p-5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* Mobile Card Header (serial counts removed) */}
                  <div className="flex items-center justify-between border-b border-[#E2ECF0] pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2"
                        style={{ backgroundColor: geo.secondaryColor }}
                        aria-hidden="true"
                      />
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: geo.primaryColor }}
                      >
                        {item.headline}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0075A2] truncate max-w-[150px]">
                      {item.sector}
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-xl font-medium text-[#001720]">
                    {item.clientName}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#3B5260]">
                    {item.summary}
                  </p>

                  <div className="mt-4">
                    <ProjectGeometricStage
                      item={item}
                      index={idx}
                      isCurrent={true}
                    />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E2ECF0] flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] font-semibold text-[#4A6270] truncate">
                    {item.relatedService}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onSelectService && onSelectService(item.relatedService)
                    }
                    className="shrink-0 bg-[#001720] px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-white"
                  >
                    Request Scope →
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Navigation Controls (instruction text removed, accessible buttons preserved) */}
        <div className="mt-2 flex items-center justify-end border-t border-[#D5E1E7] pt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollMobile("prev")}
              className="flex h-9 w-9 items-center justify-center border border-[#D5E1E7] bg-white text-[#001720]"
              aria-label="Previous mandate"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollMobile("next")}
              className="flex h-9 w-9 items-center justify-center border border-[#D5E1E7] bg-white text-[#001720]"
              aria-label="Next mandate"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
