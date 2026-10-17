"use client";

import { useState, useEffect, useRef } from "react";
import { PROCESS_STEPS } from "@/data/xntrova-data";

/**
 * Process / How We Work — Milestone 3
 * Structured, scroll-driven vertical timeline:
 * - Left column: sticky narrative with active stage readout, quick selector buttons (01-04),
 *   and primary diagnostic CTA.
 * - Right column: scroll-synchronized vertical timeline with a continuous vertical progress
 *   rail (`scaleY`), active node markers (01-04), stage badge, duration, title, description,
 *   and un-boxed deliverables list.
 * - Natural scroll handling: scrolling down advances 01 -> 04, scrolling up reverses 04 -> 01,
 *   smooth transitions, completely non-trapping.
 */
export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [railProgress, setRailProgress] = useState(0);

  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;

        const timelineEl = timelineRef.current;
        if (!timelineEl) return;

        const rect = timelineEl.getBoundingClientRect();
        const viewportH = window.innerHeight || 800;
        const triggerY = viewportH * 0.45; // reading line

        // Calculate continuous rail progress (0 to 1)
        const totalHeight = rect.height;
        const scrolledPast = triggerY - rect.top;
        const clampedProgress = Math.min(1, Math.max(0, scrolledPast / totalHeight));
        setRailProgress(clampedProgress);

        // Find active step based on trigger line
        let currentIdx = 0;
        stepRefs.current.forEach((el, idx) => {
          if (!el) return;
          const stepRect = el.getBoundingClientRect();
          // Step becomes active when its top is above or near the trigger line
          if (stepRect.top <= triggerY + 60) {
            currentIdx = idx;
          }
        });
        setActiveIndex(currentIdx);
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
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      aria-labelledby="process-heading"
      className="relative bg-[#001720] text-white pt-24 sm:pt-32 pb-0 border-t border-white/[0.08]"
    >
      {/* Background Architectural Grid Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px] px-6 sm:px-12 overflow-hidden"
      >
        <div className="relative h-full w-full border-x border-white/[0.05]">
          <div className="absolute inset-y-0 left-1/3 w-px bg-white/[0.03]" />
          <div className="absolute inset-y-0 left-2/3 w-px bg-white/[0.03]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-12">
        <div className="grid grid-cols-1 items-start lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          {/* ============================================================
              LEFT COLUMN: Fixed Narrative (Sticky on Desktop)
              ============================================================ */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32 space-y-6">
            {/* Eyebrow (decorative dot removed) */}
            <div className="inline-flex items-center">
              <span className="xn-tabular text-xs font-semibold uppercase tracking-[0.24em] text-[#FAAE39]">
                How We Work
              </span>
            </div>

              {/* Monumental Headline */}
              <div>
                <h2
                  id="process-heading"
                  className="font-display text-3xl sm:text-4xl xl:text-5xl font-medium leading-[1.08] tracking-[-0.035em] text-white"
                >
                  Four-Stage Execution Built for Predictable Scale.
                </h2>
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/70">
                  We replace speculative marketing with a disciplined engineering
                  sequence. Every engagement moves through audit, architecture,
                  launch, and attribution to deliver measurable, compounding growth.
                </p>
              </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN: Scroll-Synchronized Vertical Timeline
              ============================================================ */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div ref={timelineRef} className="relative">
              {/* Continuous Vertical Rail */}
              <div
                aria-hidden="true"
                className="absolute left-[19px] sm:left-[23px] top-6 bottom-12 w-[2px] bg-white/10"
              >
                {/* Active Progress Fill using scaleY */}
                <div
                  className="w-full h-full bg-gradient-to-b from-[#FAAE39] via-[#0075A2] to-[#22D3EE] origin-top transition-transform duration-100 ease-out"
                  style={{
                    transform: `scaleY(${railProgress})`,
                  }}
                />
              </div>

              {/* Timeline Steps (01 - 04) */}
              <div className="space-y-16 sm:space-y-24">
                {PROCESS_STEPS.map((step, idx) => {
                  const isCurrent = activeIndex === idx;
                  const isPassed = activeIndex > idx;

                  return (
                    <article
                      key={step.step}
                      ref={(el) => (stepRefs.current[idx] = el)}
                      aria-label={`Stage ${step.step}: ${step.title}`}
                      className="relative pl-12 sm:pl-16 transition-opacity duration-300"
                    >
                      {/* Node Marker on the Rail */}
                      <div
                        className={`absolute left-0 top-1.5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isCurrent
                            ? "border-[#FAAE39] bg-[#001720] text-[#FAAE39] ring-4 ring-[#FAAE39]/25 shadow-[0_0_20px_rgba(250,174,57,0.35)] scale-110"
                            : isPassed
                            ? "border-sky-400/80 bg-[#001720] text-sky-400 ring-2 ring-sky-400/20"
                            : "border-white/20 bg-[#001720] text-white/40"
                        }`}
                      >
                        <span className="xn-tabular font-mono text-xs sm:text-sm font-bold">
                          {step.step}
                        </span>
                      </div>

                      {/* Stage Content */}
                      <div
                        className={`transition-all duration-300 ${
                          isCurrent
                            ? "opacity-100 translate-x-0"
                            : isPassed
                            ? "opacity-90"
                            : "opacity-60"
                        }`}
                      >
                        {/* Eyebrow & Cadence */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="xn-tabular text-xs font-semibold uppercase tracking-[0.2em] text-[#FAAE39]">
                            {step.subtitle}
                          </span>
                          <span className="text-white/25" aria-hidden="true">
                            /
                          </span>
                          <span className="xn-tabular text-xs font-mono text-white/50">
                            {step.duration}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-2 font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-medium leading-[1.12] tracking-[-0.03em] text-white">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/75 max-w-2xl">
                          {step.description}
                        </p>

                        {/* Deliverables List: Un-boxed, clean hairline dividers */}
                        <div className="mt-6 border-t border-white/10 pt-5">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 mb-3">
                            Key Deliverables & Milestones
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {step.deliverables.map((item, dIdx) => (
                              <li
                                key={item}
                                className="border-l border-white/15 pl-3 py-0.5"
                              >
                                <span className="xn-tabular block font-mono text-[10px] font-semibold text-[#FAAE39]">
                                  0{dIdx + 1}
                                </span>
                                <span className="mt-0.5 block text-xs font-medium leading-snug text-white/90">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Soft Horizon Transition into #F4F8FA (zero solid dark band) */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-10 h-28 sm:h-36 w-full mt-12 sm:mt-16"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 23, 32, 0) 0%, #062C3E 34%, #C8DCE5 76%, #F4F8FA 100%)",
        }}
      />
    </section>
  );
}
