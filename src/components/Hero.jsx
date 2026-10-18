"use client";

import { useEffect, useRef } from "react";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import InteractiveMountain from "@/components/InteractiveMountain";
import { BRAND_INFO } from "@/data/xntrova-data";

const HEADLINE_LINES = [
  { text: "SEO, Paid Ads & Websites" },
  { text: "Engineered to Win" },
  { text: "Qualified B2B Leads.", accent: true },
];

const PARAGRAPH_WORDS =
  "India's premier B2B digital marketing agency, delivering growth-focused search, paid media, and conversion-engineered web solutions across Delhi and beyond.".split(
    " "
  );

// Pointer range for the headline stair-step, in em around the CSS base step.
const STEP_SWING_EM = 0.12;

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
  const headlineRef = useRef(null);

  // Headline stair-step eases with the pointer on desktop (base step stays in CSS).
  useEffect(() => {
    const headline = headlineRef.current;
    const stage = headline?.closest(".hero-stage");
    if (!headline || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let target = 0;
    let current = 0;
    let rafId = null;

    const tick = () => {
      current += (target - current) * 0.08;
      if (Math.abs(target - current) < 0.0005) current = target;
      headline.style.setProperty(
        "--hero-step",
        `calc(0.35em + ${(current * STEP_SWING_EM).toFixed(4)}em)`
      );
      rafId = current === target ? null : requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (!desktop.matches) return;
      const rect = stage.getBoundingClientRect();
      target = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      start();
    };

    const onLeave = () => {
      target = 0;
      start();
    };

    const onBreakpoint = () => {
      if (!desktop.matches) {
        target = current = 0;
        headline.style.removeProperty("--hero-step");
      }
    };

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave, { passive: true });
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      desktop.removeEventListener("change", onBreakpoint);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

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
      {/* Hero Opening Atmospheric Stage */}
      <div className="hero-stage relative min-h-dvh w-full overflow-hidden">
        {/* Dimensional Multi-Layered Xntrova Atmospheric Gradient Canvas */}
        <div
          ref={glowLayerRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full overflow-hidden"
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

        {/* Interactive mountain covers the hero. It measures every element marked
            data-mountain-avoid and scales its ridge to rise as high as it can while
            staying below that copy, so the peak climbs toward the review badge. */}
        <InteractiveMountain className="z-[6]" />

        {/* Main Viewport Spatial Composition — copy sits in the upper half; the
            reserved bottom padding guarantees room for the mountain to rise into. */}
        <div className="relative z-10 mx-auto flex min-h-dvh max-w-[1440px] flex-col px-4 pt-[clamp(6.5rem,17svh,11rem)] pb-[clamp(11rem,30svh,22rem)] sm:px-8 lg:px-12">
          <div className="grid w-full grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12 lg:gap-y-6 xl:gap-x-14">
            {/* Google review badge — top-right, right-aligned */}
            <div className="flex items-start justify-end self-start lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <a
                data-mountain-avoid="box"
                href="#testimonials"
                style={{ "--d": 760 }}
                aria-label="5.0 Star Google Rating across 500+ Happy Clients — Read client reviews"
                className="xn-hero-fade group inline-flex max-w-full items-center gap-3 rounded-full border border-white/16 bg-[#001720]/75 px-3.5 py-1.5 shadow-md backdrop-blur-md transition-colors hover:border-[#FAAE39]/60 hover:bg-[#001720]/90"
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

            {/* Left: regional positioning line directly above the headline */}
            <div className="min-w-0 lg:col-span-8 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start">
              <p
                data-mountain-avoid
                className="xn-hero-fade font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200/90 sm:text-xs sm:tracking-[0.24em]"
              >
                New Delhi NCR — B2B Digital Growth &amp; Web Engineering
              </p>
              {/* Stair-stepped display lines (after the Tresmares hero): each line
                  steps right by --hero-step, which eases with the pointer. */}
              <h1
                ref={headlineRef}
                id="hero-heading"
                data-mountain-avoid
                data-mountain-slack="0.5"
                className="mt-5 font-display text-[2.15rem] font-medium leading-[1.04] tracking-[-0.035em] text-white drop-shadow-[0_12px_36px_rgba(0,15,24,0.45)] [--hero-step:0em] sm:mt-6 sm:text-[3.3rem] sm:[--hero-step:0.3em] lg:text-[3rem] lg:[--hero-step:0.35em] xl:text-[3.9rem] 2xl:text-[4.6rem]"
              >
                {HEADLINE_LINES.map((line, i) => (
                  <span
                    key={line.text}
                    className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
                    style={{ transform: `translateX(calc(var(--hero-step) * ${i}))` }}
                  >
                    <span
                      className={`xn-hero-rise block ${line.accent ? "text-[#FAAE39]" : ""}`}
                      style={{ "--d": 120 + i * 110 }}
                    >
                      {line.text}
                    </span>
                  </span>
                ))}
              </h1>

              {/* Primary actions directly under the headline */}
              <div
                data-mountain-avoid
                className="xn-hero-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-10"
                style={{ "--d": 880 }}
              >
                <a
                  href="#contact"
                  className="xn-press inline-flex min-h-12 items-center gap-3 bg-[#FAAE39] px-6 text-xs font-bold uppercase tracking-[0.16em] text-[#001720] shadow-[0_12px_32px_rgba(250,174,57,0.18)] transition-colors hover:bg-white"
                >
                  <span>Request Free Growth Audit</span>
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={BRAND_INFO.phoneHref}
                  className="inline-flex min-h-12 items-center gap-2.5 text-sm font-medium text-white/85 transition-colors hover:text-[#FAAE39]"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Call
                  </span>
                  <span className="xn-tabular">{BRAND_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right: supporting paragraph directly beneath the badge */}
            <div className="min-w-0 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:self-start">
              <div className="max-w-md lg:ml-auto">
                <p
                  data-mountain-avoid
                  className="text-sm leading-relaxed text-white/90 sm:text-base lg:text-[15px] xl:text-base"
                >
                  {PARAGRAPH_WORDS.map((word, i) => (
                    <span key={`${word}-${i}`}>
                      <span
                        className="xn-hero-fade inline-block"
                        style={{ "--d": 520 + i * 22 }}
                      >
                        {word}
                      </span>{" "}
                    </span>
                  ))}
                </p>
                <a
                  data-mountain-avoid
                  href="#services"
                  className="xn-hero-fade mt-5 inline-flex items-center gap-2 border-b border-[#FAAE39]/70 pb-1 text-[13px] font-semibold tracking-wide text-white transition-colors hover:border-white hover:text-[#FAAE39]"
                  style={{ "--d": 1000 }}
                >
                  <span>Explore capabilities</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quiet scroll cue, bottom-left (as on the reference hero) */}
          <a
            href="#services"
            className="xn-hero-fade absolute bottom-6 left-4 hidden items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white sm:left-8 md:inline-flex lg:left-12"
            style={{ "--d": 1300 }}
          >
            <span className="xn-scroll-line relative block h-8 w-px overflow-hidden bg-white/20" aria-hidden="true" />
            <span>Scroll</span>
          </a>
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
