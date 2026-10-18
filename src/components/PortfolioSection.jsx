"use client";

import { useState, useEffect, useRef } from "react";
import {
  CLIENT_CAPABILITY_SHOWCASE,
  PORTFOLIO_FILTERS,
} from "@/data/xntrova-data";

/**
 * Per-card brand tint and plane shape (Xntrova palette only).
 */
const STAGE_GEOMETRY = [
  { primaryColor: "#0075A2", surfaceTint: "#E6F0F5", clipPolygon: "polygon(0% 0%, 88% 0%, 100% 100%, 12% 100%)" },
  { primaryColor: "#C82318", surfaceTint: "#F5ECEB", clipPolygon: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)" },
  { primaryColor: "#001720", surfaceTint: "#E9EFF2", clipPolygon: "polygon(0% 8%, 100% 0%, 100% 92%, 0% 100%)" },
  { primaryColor: "#0075A2", surfaceTint: "#E6F1F6", clipPolygon: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)" },
  { primaryColor: "#C82318", surfaceTint: "#F4EDEC", clipPolygon: "polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)" },
  { primaryColor: "#001720", surfaceTint: "#EAEFF2", clipPolygon: "polygon(6% 0%, 100% 6%, 94% 100%, 0% 94%)" },
];

/**
 * Visual panel: the client's own logos on a brand-tinted geometric plane.
 */
function ProjectVisual({ item, index, isCurrent, className = "" }) {
  const geo = STAGE_GEOMETRY[index % STAGE_GEOMETRY.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: geo.surfaceTint }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-3/4 w-2/3 bg-white/60 transition-transform duration-700 ease-out"
        style={{
          clipPath: geo.clipPolygon,
          transform: isCurrent ? "scale(1.04)" : "scale(0.96)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full"
        style={{ backgroundColor: geo.primaryColor }}
      />
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 p-8">
        {item.logos.map((logo) => (
          <div
            key={logo.alt}
            className="flex h-20 items-center bg-white px-6 shadow-[0_10px_30px_rgba(0,23,32,0.08)] sm:h-24"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-12 w-auto max-w-[150px] object-contain sm:max-h-14"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Card copy: sector once, client, focus, summary, deliverables, CTA.
 */
function ProjectCopy({ item, index, onSelectService, compact = false }) {
  const geo = STAGE_GEOMETRY[index % STAGE_GEOMETRY.length];

  return (
    <div className="flex min-w-0 flex-col">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4A6270]">
        {item.sector}
      </p>
      <h3
        className={`mt-3 font-display font-medium tracking-[-0.025em] text-[#001720] ${
          compact ? "text-xl" : "text-2xl xl:text-[2rem]"
        }`}
      >
        {item.clientName}
      </h3>
      <p className="mt-2 text-sm font-semibold" style={{ color: geo.primaryColor === "#001720" ? "#0075A2" : geo.primaryColor }}>
        {item.headline}
      </p>
      <p className={`mt-4 leading-relaxed text-[#3B5260] ${compact ? "text-[13px]" : "text-sm xl:text-[15px]"}`}>
        {item.summary}
      </p>
      <p className="mt-5 text-xs font-medium text-[#001720]">
        {item.deliverables.join("  ·  ")}
      </p>
      <div className={compact ? "mt-5" : "mt-auto pt-6"}>
        <button
          type="button"
          onClick={() => onSelectService && onSelectService(item.relatedService)}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 border-b-2 border-[#FAAE39] text-xs font-bold uppercase tracking-[0.16em] text-[#001720] transition-colors hover:text-[#0075A2]"
        >
          <span>Request similar scope</span>
          <span aria-hidden="true">→</span>
        </button>
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
  // Horizontal distance between card starts (card width + gap), measured.
  const [cardStep, setCardStep] = useState(900);
  const railRef = useRef(null);

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

        const first = railRef.current?.firstElementChild;
        if (first) {
          const gap = parseFloat(getComputedStyle(railRef.current).columnGap) || 0;
          setCardStep(first.offsetWidth + gap);
        }

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
          </div>

          {/* Center Horizontal Progressing Geometric Panels */}
          <div className="relative z-10 flex-1 overflow-hidden px-8 xl:px-12 flex items-center">
            <div
              ref={railRef}
              className="flex items-stretch gap-10 transition-transform duration-150 ease-out py-4 will-change-transform"
              style={{
                transform: `translate3d(-${
                  scrollProgress * Math.max(0, (filteredItems.length - 1) * cardStep)
                }px, 0, 0)`,
              }}
            >
              {filteredItems.map((item, idx) => {
                const isCurrent = safeActiveIndex === idx;

                return (
                  <article
                    key={item.id}
                    className={`relative grid min-h-[min(520px,58vh)] w-[860px] shrink-0 grid-cols-12 gap-8 border bg-white p-8 transition-all duration-300 xl:w-[920px] xl:gap-10 xl:p-10 ${
                      isCurrent
                        ? "border-[#001720]/80 shadow-[0_20px_50px_rgba(0,23,32,0.08)]"
                        : "border-[#D5E1E7] opacity-80"
                    }`}
                  >
                    <div className="col-span-7 flex">
                      <ProjectCopy
                        item={item}
                        index={idx}
                        onSelectService={onSelectService}
                      />
                    </div>
                    <ProjectVisual
                      item={item}
                      index={idx}
                      isCurrent={isCurrent}
                      className="col-span-5"
                    />
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
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className="flex w-[88vw] max-w-[400px] shrink-0 snap-center flex-col border border-[#D5E1E7] bg-white"
            >
              <ProjectVisual item={item} index={idx} isCurrent className="h-40" />
              <div className="flex flex-1 p-5">
                <ProjectCopy
                  item={item}
                  index={idx}
                  onSelectService={onSelectService}
                  compact
                />
              </div>
            </article>
          ))}
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
