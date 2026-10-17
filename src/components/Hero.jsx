"use client";

import { useEffect, useRef } from "react";
import ScrollTextReveal from "@/components/ScrollTextReveal";

/**
 * Editorial Hero & Atmospheric Opening Sequence (Priority 2 & Priority 3)
 * - Priority 2: Rich, visibly dimensional Xntrova atmospheric gradient environment combining
 *   deep navy (#001720), dark blue (#001F2B), luminous brand cerulean (#0075A2),
 *   restrained cyan/teal highlights (#0E94B8 / #22D3EE), and a subtle warm amber
 *   counter-glow behind the monumental typography. Zero stock photos or floating boxes.
 * - Priority 3: Relocated the verified Google Review & Client credibility indicator
 *   to the upper-right area of the hero content, subordinate to the headline and
 *   responsive across desktop, tablet, and mobile.
 */
export default function Hero() {
  const glowLayerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = null;
    const updateAtmosphere = () => {
      rafId = null;
      const y = window.scrollY || 0;
      if (y > window.innerHeight * 1.5) return;

      if (glowLayerRef.current) {
        const shiftY = y * 0.1;
        glowLayerRef.current.style.transform = `translate3d(0, ${shiftY.toFixed(
          1
        )}px, 0)`;
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateAtmosphere);
      }
    };

    updateAtmosphere();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#001720] text-white"
    >
      {/* Dimensional Multi-Layered Xntrova Atmospheric Gradient Canvas */}
      <div
        ref={glowLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-[112dvh] overflow-hidden"
      >
        {/* Base Diagonal Tonal Foundation (#001720 -> #001F2B -> #073449) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(132deg, #00131B 0%, #001F2B 38%, #083B52 72%, #001720 100%)",
          }}
        />

        {/* Primary Cerulean & Cyan Atmospheric Plume (Upper-Right / Center-Right) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(980px 680px at 76% 30%, rgba(0, 117, 162, 0.68) 0%, rgba(12, 138, 178, 0.36) 36%, rgba(0, 31, 43, 0.08) 68%, transparent 82%)",
          }}
        />

        {/* Secondary Deep Cerulean Halo Behind Headline (Center-Left) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(820px 560px at 24% 46%, rgba(0, 117, 162, 0.42) 0%, rgba(10, 66, 87, 0.28) 44%, transparent 74%)",
          }}
        />

        {/* Restrained Cool Teal Highlight Cone (Top-Center Crest) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(640px 420px at 54% 16%, rgba(34, 211, 238, 0.20) 0%, rgba(0, 117, 162, 0.12) 48%, transparent 76%)",
          }}
        />

        {/* Subtle Solar Amber Warmth Counter-Glow Behind Third Headline Line */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(560px 380px at 62% 64%, rgba(250, 174, 57, 0.15) 0%, rgba(250, 174, 57, 0.04) 50%, transparent 78%)",
          }}
        />

        {/* Fine Architectural Grid Hairlines for Spatial Scale */}
        <div className="mx-auto h-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="h-full w-full border-x border-white/[0.06]" />
        </div>
      </div>

      {/* Main Viewport Spatial Composition */}
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-[1440px] flex-col justify-between px-4 pt-24 pb-12 sm:px-8 sm:pt-28 sm:pb-16 lg:px-12 lg:pt-32">
        {/* Top Row: Left Regional Eyebrow + Top-Right Google Review Indicator */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-sky-200/80">
            New Delhi NCR — B2B Digital Growth &amp; Web Engineering
          </p>

          {/* Compact Top-Right Google Review Indicator (Preserved rating, stars, icon; removed 'Google Verified') */}
          <a
            href="#testimonials"
            aria-label="5.0 Star Google Rating across 500+ Happy Clients — Read client reviews"
            className="group inline-flex items-center gap-3 rounded-full border border-white/16 bg-[#001720]/55 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:border-[#FAAE39]/60 hover:bg-[#001720]/80"
          >
            {/* Google 4-Color G Mark */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                fill="#4285F4"
                d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.11Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
              />
            </svg>

            <span className="xn-tabular text-xs font-semibold tracking-wide text-white">
              5.0
            </span>

            {/* 5 Gold Stars */}
            <span
              className="flex items-center gap-0.5 text-[#FAAE39]"
              aria-hidden="true"
            >
              {[...Array(5)].map((_, idx) => (
                <svg
                  key={idx}
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              ))}
            </span>

            <span className="h-3 w-px bg-white/20" aria-hidden="true" />

            <span className="xn-tabular text-[11px] font-medium tracking-[0.12em] text-white/80 group-hover:text-white">
              500+ Clients
            </span>
          </a>
        </div>

        {/* Main Content Area: Left Headline + Right Supporting Paragraph (No horizontal divider lines) */}
        <div className="my-auto py-12 lg:py-20">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Monumental, Left-Aligned Headline */}
            <div className="lg:col-span-8">
              <h1
                id="hero-heading"
                className="font-display text-5xl font-medium leading-[0.98] tracking-[-0.035em] text-white drop-shadow-[0_12px_36px_rgba(0,15,24,0.45)] sm:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] 2xl:text-[6.75rem]"
              >
                <span className="block">Search Authority,</span>
                <span className="mt-1.5 block text-white/95">
                  Paid Acquisition
                </span>
                <span className="mt-1.5 block text-[#FAAE39]">
                  &amp; Web Systems.
                </span>
              </h1>
            </div>

            {/* Right Column: Upper Positioned Introductory Supporting Paragraph */}
            <div className="lg:col-span-4 lg:pt-6">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/85">
                India&apos;s premier B2B digital marketing agency, delivering
                growth-focused search, paid media, and conversion-engineered web
                solutions across Delhi and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Horizon Bridge: Dimensional Navy/Cerulean Dissolving into Editorial Mist (#F4F8FA) */}
      <div
        aria-hidden="true"
        className="relative z-10 h-24 w-full sm:h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(4, 38, 53, 0) 0%, #062C3E 34%, #C8DCE5 76%, #F4F8FA 100%)",
        }}
      />

      {/* Centered Scroll-Linked Positioning Statement on Light Mist Surface */}
      <div className="relative z-10 bg-[#F4F8FA] pt-8 pb-20 text-[#001720] sm:pt-12 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0075A2]">
            Xntrova Positioning
          </p>

          <ScrollTextReveal
            as="p"
            text="We align technical search architecture, precision paid media, and conversion-focused web engineering into one measurable commercial growth engine."
            accentWords={["search", "architecture,", "measurable", "growth"]}
            accentClassName="text-[#0075A2]"
            className="mt-6 font-display text-2xl font-medium leading-[1.2] tracking-[-0.028em] text-[#001720] sm:text-4xl lg:text-[2.75rem]"
          />
        </div>
      </div>
    </section>
  );
}
