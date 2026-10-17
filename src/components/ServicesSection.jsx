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
    eyebrow: "ORGANIC PIPELINE // CHAPTER 01",
    watermark: "INDEX",
    layers: [
      { title: "Technical Crawl Architecture", detail: "Core Web Vitals hygiene, XML/JSON-LD schema, and crawl-budget optimization." },
      { title: "High-Intent B2B Clustering", detail: "Commercial topic authority models that capture buyers actively evaluating solutions." },
      { title: "Delhi NCR Local & National Rank", detail: "Dual-layer search strategy capturing local pack dominance and national visibility." },
    ],
  },
  {
    code: "02",
    label: "Paid Advertising (PPC)",
    eyebrow: "ACQUISITION MEDIA // CHAPTER 02",
    watermark: "INTENT",
    layers: [
      { title: "Precision Search & PMax", detail: "Exact-match intent interception across Google Ads with negative keyword governance." },
      { title: "B2B Decision-Maker Funnels", detail: "Targeted LinkedIn and Meta media campaigns reaching verified executive buyers." },
      { title: "Server-Side Conversion Telemetry", detail: "GA4, Google Tag Manager, and Meta CAPI server-side event tracking." },
    ],
  },
  {
    code: "03",
    label: "Website & App Development",
    eyebrow: "WEB SYSTEMS // CHAPTER 03",
    watermark: "SYSTEM",
    layers: [
      { title: "Sub-Second Next.js Architecture", detail: "Modern React 19 web systems engineered for 95+ Core Web Vitals speed." },
      { title: "Conversion-Engineered UI", detail: "Accessible, high-contrast layouts designed to turn executive visitors into qualified leads." },
      { title: "Enterprise API & CMS Integration", detail: "Robust lead capture endpoints, CRM webhooks, and secure content architecture." },
    ],
  },
  {
    code: "04",
    label: "E-Commerce & Amazon Growth",
    eyebrow: "COMMERCE ENGINE // CHAPTER 04",
    watermark: "SCALE",
    layers: [
      { title: "Merchant Feed Architecture", detail: "Structured product catalogs, variant schema, and rich merchant data integration." },
      { title: "High-ROAS Shopping & Sponsored Ads", detail: "Google Shopping campaigns and Amazon Sponsored Products dialed for profitability." },
      { title: "Frictionless Checkout Optimization", detail: "Cart-to-conversion CRO paths and automated post-purchase repeat buyer flows." },
    ],
  },
  {
    code: "05",
    label: "Social Media & Reputation (ORM)",
    eyebrow: "BRAND DEFENSE // CHAPTER 05",
    watermark: "DEFENSE",
    layers: [
      { title: "Executive Thought Leadership", detail: "Authority-building organic social narratives crafted for industry decision-makers." },
      { title: "24/7 Sentiment & Review Radar", detail: "Multi-channel reputation monitoring across Google Reviews, directories, and social." },
      { title: "SERP Reputation Defense", detail: "Proactive search-result brand defense and online reputation management (ORM)." },
    ],
  },
  {
    code: "06",
    label: "Content, Video & Lifecycle Email",
    eyebrow: "EDITORIAL VOICE // CHAPTER 06",
    watermark: "VOICE",
    layers: [
      { title: "Original Research & B2B Guides", detail: "Comprehensive industry articles and technical guides mapped to buyer queries." },
      { title: "Lifecycle Email Nurture Journeys", detail: "Automated segmentation and high-conversion drip sequences for active pipelines." },
      { title: "Commercial Infographics & Video", detail: "Engaging visual storytelling assets that articulate complex technical solutions." },
    ],
  },
];

/**
 * Bespoke Architectural Vector Artworks for the 6 Disciplines.
 * Designed with layered isometric perspective, volumetric depth, translucent facets,
 * calibrated coordinate hairlines, and authentic brand color harmony.
 */
function ChapterArtwork({ activeIdx }) {
  return (
    <div className="relative w-full h-[360px] xl:h-[400px] flex items-center justify-center select-none">
      {/* 01 SEO — The Algorithmic Horizon & Index Matrix */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 0
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          viewBox="0 0 520 380"
          className="w-full h-full max-w-[500px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Subtle Coordinate Grid in Negative Space */}
          <g opacity="0.18">
            <line x1="60" y1="40" x2="460" y2="40" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="60" y1="120" x2="460" y2="120" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="60" y1="200" x2="460" y2="200" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="60" y1="280" x2="460" y2="280" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="60" y1="340" x2="460" y2="340" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="120" y1="20" x2="120" y2="360" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="260" y1="20" x2="260" y2="360" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="400" y1="20" x2="400" y2="360" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="3 3" />
          </g>

          {/* Integrated Architectural Watermark Lockup */}
          <text
            x="260"
            y="95"
            textAnchor="middle"
            className="font-display font-medium text-[42px] tracking-tight fill-[#001720]/08"
          >
            INDEX MATRIX // 01
          </text>

          {/* Ambient Diffuse Shadow */}
          <polygon
            points="140,290 380,270 410,320 170,340"
            fill="rgba(0, 23, 32, 0.08)"
            filter="blur(16px)"
          />

          {/* Deep Obsidian Foundation Block */}
          <polygon
            points="120,200 270,140 270,290 120,330"
            fill="#001720"
          />

          {/* Ascending Teal Prism Facet (Xntrova Brand Blue) */}
          <polygon
            points="270,140 420,180 420,310 270,290"
            fill="#0075A2"
          />

          {/* Precision Top Face catching Horizon Light */}
          <polygon
            points="120,200 270,140 420,180 270,230"
            fill="#0288BD"
          />

          {/* Frosted Translucent Architectural Shard Overlay */}
          <polygon
            points="160,110 350,60 380,200 190,250"
            fill="rgba(0, 117, 162, 0.15)"
            stroke="#0075A2"
            strokeWidth="1.2"
          />

          {/* Algorithmic Crawl Depth Contour Lines */}
          <path d="M140,220 L270,170 L400,205" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
          <path d="M150,245 L270,195 L390,230" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
          <path d="M160,270 L270,220 L380,255" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />

          {/* Warm Amber Rank Trajectory Beam */}
          <line x1="80" y1="280" x2="450" y2="100" stroke="#FAAE39" strokeWidth="3" strokeLinecap="round" />
          <circle cx="450" cy="100" r="6" fill="#FAAE39" />
          <circle cx="450" cy="100" r="14" stroke="#FAAE39" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />

          {/* Coordinate Technical Labels */}
          <text x="90" y="270" className="font-mono text-[9px] font-semibold fill-[#0075A2] tracking-widest">
            [SYS // CRAWL-INDEX]
          </text>
          <text x="375" y="85" className="font-mono text-[9px] font-semibold fill-[#FAAE39] tracking-widest">
            [POS: TOP 3 ORGANIC]
          </text>
        </svg>
      </div>

      {/* 02 PPC — The Intent Reticle & Kinetic Acquisition Vector */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 1
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          viewBox="0 0 520 380"
          className="w-full h-full max-w-[500px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Concentric Precision Reticle Radar */}
          <g opacity="0.25">
            <circle cx="260" cy="190" r="160" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="260" cy="190" r="110" stroke="#C82318" strokeWidth="0.8" />
            <circle cx="260" cy="190" r="60" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="260" y1="10" x2="260" y2="370" stroke="#0075A2" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="80" y1="190" x2="440" y2="190" stroke="#0075A2" strokeWidth="0.6" strokeDasharray="3 3" />
          </g>

          <text
            x="260"
            y="95"
            textAnchor="middle"
            className="font-display font-medium text-[42px] tracking-tight fill-[#001720]/08"
          >
            INTENT RETICLE // 02
          </text>

          {/* Deep Navy Baseline Anchor */}
          <polygon
            points="140,240 320,130 360,260 180,330"
            fill="#001720"
          />

          {/* Dynamic Cadmium Crimson Wedge (High-Velocity Performance Media) */}
          <polygon
            points="200,90 410,140 370,290 160,220"
            fill="#C82318"
            className="drop-shadow-[0_16px_32px_rgba(200,35,24,0.25)]"
          />

          {/* Intersecting Translucent Cyan Filter Plane */}
          <polygon
            points="180,160 350,110 390,210 220,280"
            fill="rgba(0, 117, 162, 0.35)"
            stroke="#FFFFFF"
            strokeWidth="1"
          />

          {/* Precision Target Crosshair Beam in Warm Amber */}
          <line x1="90" y1="120" x2="430" y2="260" stroke="#FAAE39" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="260" cy="190" r="5" fill="#FAAE39" />
          <circle cx="260" cy="190" r="16" stroke="#FAAE39" strokeWidth="1.2" />

          <text x="110" y="110" className="font-mono text-[9px] font-semibold fill-[#FAAE39] tracking-widest">
            [EXACT-MATCH INTERCEPT]
          </text>
          <text x="330" y="310" className="font-mono text-[9px] font-semibold fill-[#C82318] tracking-widest">
            [TELEMETRY: GA4 + CAPI]
          </text>
        </svg>
      </div>

      {/* 03 Web Dev — The Spatial Monolith & Precision Portals */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 2
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          viewBox="0 0 520 380"
          className="w-full h-full max-w-[500px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Architectural Drafting Scaffolding */}
          <g opacity="0.2">
            <line x1="80" y1="60" x2="440" y2="60" stroke="#001720" strokeWidth="0.8" />
            <line x1="80" y1="180" x2="440" y2="180" stroke="#001720" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="80" y1="300" x2="440" y2="300" stroke="#001720" strokeWidth="0.8" />
            <line x1="160" y1="30" x2="160" y2="350" stroke="#001720" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="260" y1="30" x2="260" y2="350" stroke="#001720" strokeWidth="0.8" />
            <line x1="360" y1="30" x2="360" y2="350" stroke="#001720" strokeWidth="0.8" strokeDasharray="3 3" />
          </g>

          <text
            x="260"
            y="95"
            textAnchor="middle"
            className="font-display font-medium text-[42px] tracking-tight fill-[#001720]/08"
          >
            ARCHITECTURE // 03
          </text>

          {/* Left Obsidian Monolith Pillar */}
          <polygon
            points="140,110 220,90 220,320 140,330"
            fill="#001720"
          />

          {/* Right Foundation Pillar */}
          <polygon
            points="300,90 380,110 380,330 300,320"
            fill="#002533"
          />

          {/* Electric Cyan Floating Portal Aperture */}
          <polygon
            points="190,140 330,140 330,280 190,280"
            fill="rgba(34, 211, 238, 0.15)"
            stroke="#22D3EE"
            strokeWidth="1.5"
            className="drop-shadow-[0_12px_28px_rgba(34,211,238,0.2)]"
          />

          {/* Center Brand Blue Monolith Block */}
          <polygon
            points="230,110 290,110 290,300 230,300"
            fill="#0075A2"
          />

          {/* Horizontal System Baseline Vector in Teal */}
          <line x1="100" y1="210" x2="420" y2="210" stroke="#0075A2" strokeWidth="2.5" />
          <rect x="250" y="200" width="20" height="20" fill="#22D3EE" />

          <text x="130" y="75" className="font-mono text-[9px] font-semibold fill-[#0075A2] tracking-widest">
            [REACT 19 // APP ROUTER]
          </text>
          <text x="310" y="350" className="font-mono text-[9px] font-semibold fill-[#22D3EE] tracking-widest">
            [LATENCY: &lt;1.0s SUB-SECOND]
          </text>
        </svg>
      </div>

      {/* 04 E-Commerce — The Merchant Diamond & Transaction Facets */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 3
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          viewBox="0 0 520 380"
          className="w-full h-full max-w-[500px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Stepped Scale Grid */}
          <g opacity="0.2">
            <polygon points="260,40 440,190 260,340 80,190" stroke="#FAAE39" strokeWidth="0.8" strokeDasharray="3 3" />
            <polygon points="260,90 380,190 260,290 140,190" stroke="#0075A2" strokeWidth="0.8" />
          </g>

          <text
            x="260"
            y="95"
            textAnchor="middle"
            className="font-display font-medium text-[42px] tracking-tight fill-[#001720]/08"
          >
            SCALE DIAMOND // 04
          </text>

          {/* Deep Teal Foundation Facet */}
          <polygon
            points="150,190 260,100 260,290 150,260"
            fill="#0075A2"
          />

          {/* Warm Amber Transaction Facet (Commercial Momentum) */}
          <polygon
            points="260,100 370,190 370,260 260,290"
            fill="#FAAE39"
            className="drop-shadow-[0_16px_32px_rgba(250,174,57,0.22)]"
          />

          {/* Top Diamond Crown in Obsidian Navy */}
          <polygon
            points="260,60 350,140 260,170 170,140"
            fill="#001720"
          />

          {/* Translucent Stepped Catalog Shelf Plane */}
          <polygon
            points="180,220 340,170 360,250 200,290"
            fill="rgba(0, 117, 162, 0.25)"
            stroke="#FAAE39"
            strokeWidth="1.2"
          />

          {/* Cadmium Crimson Purchase Vector */}
          <line x1="90" y1="280" x2="430" y2="120" stroke="#C82318" strokeWidth="3" strokeLinecap="round" />
          <circle cx="430" cy="120" r="5" fill="#C82318" />

          <text x="100" y="305" className="font-mono text-[9px] font-semibold fill-[#FAAE39] tracking-widest">
            [MERCHANT SCHEMA FEED]
          </text>
          <text x="320" y="105" className="font-mono text-[9px] font-semibold fill-[#C82318] tracking-widest">
            [HIGH-ROAS SCALE]
          </text>
        </svg>
      </div>

      {/* 05 SMO / ORM — The Bastion Shield & Sentiment Radar */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 4
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          viewBox="0 0 520 380"
          className="w-full h-full max-w-[500px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Radar Perimeter Telemetry */}
          <g opacity="0.22">
            <circle cx="260" cy="190" r="150" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="260" cy="190" r="90" stroke="#0075A2" strokeWidth="0.8" />
            <line x1="110" y1="190" x2="410" y2="190" stroke="#0075A2" strokeWidth="0.8" strokeDasharray="2 2" />
          </g>

          <text
            x="260"
            y="95"
            textAnchor="middle"
            className="font-display font-medium text-[42px] tracking-tight fill-[#001720]/08"
          >
            BRAND SHIELD // 05
          </text>

          {/* Obsidian Hexagonal Armor Foundation */}
          <polygon
            points="180,100 340,100 380,210 260,320 140,210"
            fill="#001720"
          />

          {/* Crimson Defensive Integrity Plate */}
          <polygon
            points="210,130 310,130 340,210 260,290 180,210"
            fill="#C82318"
            className="drop-shadow-[0_16px_36px_rgba(200,35,24,0.22)]"
          />

          {/* Translucent Brand Blue Core Prism */}
          <polygon
            points="240,160 280,160 300,210 260,260 220,210"
            fill="rgba(0, 117, 162, 0.75)"
            stroke="#22D3EE"
            strokeWidth="1.2"
          />

          {/* Cyan Defensive Radar Sweep Vector */}
          <line x1="80" y1="230" x2="440" y2="170" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="370" cy="180" r="4" fill="#22D3EE" />

          <text x="90" y="255" className="font-mono text-[9px] font-semibold fill-[#0075A2] tracking-widest">
            [24/7 SENTIMENT RADAR]
          </text>
          <text x="310" y="90" className="font-mono text-[9px] font-semibold fill-[#C82318] tracking-widest">
            [ACTIVE ORM DEFENSE]
          </text>
        </svg>
      </div>

      {/* 06 Content — The Editorial Folio & Continuous Narrative Ribbon */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          activeIdx === 5
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          viewBox="0 0 520 380"
          className="w-full h-full max-w-[500px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Editorial Grid Lines */}
          <g opacity="0.2">
            <line x1="70" y1="80" x2="450" y2="80" stroke="#001720" strokeWidth="0.8" />
            <line x1="70" y1="160" x2="450" y2="160" stroke="#001720" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="70" y1="240" x2="450" y2="240" stroke="#001720" strokeWidth="0.8" />
            <line x1="70" y1="310" x2="450" y2="310" stroke="#001720" strokeWidth="0.8" strokeDasharray="3 3" />
          </g>

          <text
            x="260"
            y="95"
            textAnchor="middle"
            className="font-display font-medium text-[42px] tracking-tight fill-[#001720]/08"
          >
            EDITORIAL FOLIO // 06
          </text>

          {/* Deep Obsidian Foundation Folio Spine */}
          <polygon
            points="130,140 280,80 320,280 170,320"
            fill="#001720"
          />

          {/* Warm Amber Open Folio Page Plate */}
          <polygon
            points="230,110 390,140 350,320 200,270"
            fill="#FAAE39"
            className="drop-shadow-[0_16px_36px_rgba(250,174,57,0.22)]"
          />

          {/* Translucent Brand Blue Technical Manuscript Overlay */}
          <polygon
            points="170,160 340,110 370,230 200,290"
            fill="rgba(0, 117, 162, 0.35)"
            stroke="#0075A2"
            strokeWidth="1.2"
          />

          {/* Flowing Narrative Bezier Distribution Ribbon */}
          <path
            d="M80,270 C160,330 260,110 440,160"
            stroke="#C82318"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="440" cy="160" r="5" fill="#C82318" />

          <text x="90" y="250" className="font-mono text-[9px] font-semibold fill-[#FAAE39] tracking-widest">
            [RESEARCH & TOPICAL DEPTH]
          </text>
          <text x="310" y="345" className="font-mono text-[9px] font-semibold fill-[#0075A2] tracking-widest">
            [LIFECYCLE SYNDICATION]
          </text>
        </svg>
      </div>
    </div>
  );
}

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
    const targetScroll = containerTop + (idx / CORE_SERVICES.length) * scrollable + 25;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeService = CORE_SERVICES[activeIdx] || CORE_SERVICES[0];
  const activeChapter = CHAPTER_DELIVERABLES[activeIdx] || CHAPTER_DELIVERABLES[0];
  const activeMetric = SERVICE_METRICS[activeIdx] || SERVICE_METRICS[0];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#F4F8FA] text-[#001720]"
    >
      {/* Editorial Opening Section Header */}
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
          DESKTOP FULL-STAGE TRESMARES EDITORIAL SUITE (lg+)
          Unified architectural installation:
          - Left Column: Persistent selector + Active narrative, deliverables, links & CTA
          - Center Stage: Bespoke volumetric vector artwork with coordinated typography
          - Right Column: Technical benchmarks & specifications
          ============================================================ */}
      <div
        ref={containerRef}
        style={{ minHeight: "480vh" }}
        className="hidden lg:block relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 py-6 lg:px-10 xl:px-14">
          
          {/* Defined Architectural Framing Stage */}
          <div className="relative mx-auto w-full max-w-[1400px] border border-[#DCE5EA] bg-white/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,23,32,0.06)] flex flex-col overflow-hidden">
            
            {/* STAGE HEADER BAR */}
            <div className="flex items-center justify-between border-b border-[#DCE5EA] bg-[#F8FAFC]/90 px-6 py-2.5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#0075A2]" aria-hidden="true" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#001720]">
                  XNTROVA CAPABILITIES SUITE // {activeMetric.category}
                </span>
              </div>

              {/* Progress Tracker */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold text-[#001720]">
                  0{activeIdx + 1} <span className="text-[#94A3B8]">/</span> 06
                </span>
                <div className="h-1.5 w-24 bg-[#E2E8F0] overflow-hidden" aria-hidden="true">
                  <div
                    className="h-full bg-[#0075A2] transition-all duration-300 ease-out"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* THREE-COLUMN INTEGRATED ARCHITECTURAL GRID */}
            <div className="grid grid-cols-12 min-h-[520px] xl:min-h-[560px]">
              
              {/* LEFT COLUMN: Persistent Discipline Selector + Active Narrative & Deliverables */}
              <div className="col-span-4 border-r border-[#DCE5EA] p-6 xl:p-8 flex flex-col justify-between bg-white">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#0075A2] mb-3">
                    Disciplines
                  </p>
                  
                  {/* Persistent Discipline Selector */}
                  <nav aria-label="Core Capabilities Selector" className="space-y-1">
                    {CORE_SERVICES.map((s, idx) => {
                      const isActive = idx === activeIdx;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => scrollToService(idx)}
                          className={`group flex items-center gap-3 text-left w-full py-1.5 px-2 rounded-none transition-all duration-300 cursor-pointer ${
                            isActive
                              ? "bg-[#F8FAFC] text-[#001720] font-semibold translate-x-1"
                              : "text-[#64748B] hover:text-[#001720] hover:bg-[#F8FAFC]/50 font-normal"
                          }`}
                        >
                          <span
                            className={`h-1.5 transition-all duration-300 ${
                              isActive
                                ? "w-4 bg-[#C82318]"
                                : "w-1.5 bg-[#CBD5E1] group-hover:bg-[#94A3B8]"
                            }`}
                            aria-hidden="true"
                          />
                          <span className="font-display text-sm tracking-tight leading-snug">
                            {s.title}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Active Service Narrative, Deliverables & Actions */}
                <div className="border-t border-[#DCE5EA] pt-4 mt-4">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0075A2]">
                    {activeChapter.eyebrow}
                  </p>
                  <h3 className="mt-1 font-display text-xl xl:text-2xl font-medium tracking-tight text-[#001720]">
                    {activeService.title}
                  </h3>
                  <p className="mt-2 text-xs xl:text-sm text-[#4A6270] leading-relaxed">
                    {activeService.summary}
                  </p>

                  {/* Three Verified Deliverables */}
                  <div className="mt-3.5 space-y-2">
                    {activeChapter.layers.map((layer) => (
                      <div
                        key={layer.title}
                        className="border-l-2 border-[#0075A2] pl-2.5 transition-colors duration-500"
                      >
                        <p className="font-display text-xs font-semibold text-[#001720]">
                          {layer.title}
                        </p>
                        <p className="text-[11px] text-[#64748B] leading-tight">
                          {layer.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Sub-Service Tags & CTA Action */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-[#F1F5F9]">
                    {activeService.subServices.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#DCE5EA] bg-white px-2 py-0.5 font-mono text-[10px] font-medium text-[#001720] transition-colors hover:border-[#0075A2] hover:text-[#0075A2]"
                      >
                        {sub.label} ↗
                      </a>
                    ))}

                    <button
                      type="button"
                      onClick={() => onSelectService && onSelectService(activeService.title)}
                      className="inline-flex items-center gap-1.5 bg-[#001720] px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-[#0075A2] transition-colors cursor-pointer"
                    >
                      <span>Request Audit</span>
                      <span className="text-[#FAAE39]" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CENTER STAGE: Bespoke Vector Art Installation */}
              <div className="col-span-5 relative flex flex-col items-center justify-center p-6 xl:p-8 bg-[#FAFCFD] overflow-hidden">
                <ChapterArtwork activeIdx={activeIdx} />
              </div>

              {/* RIGHT COLUMN: Harmonious Technical Benchmarks & Delivery Specifications */}
              <div className="col-span-3 border-l border-[#DCE5EA] p-6 xl:p-8 flex flex-col justify-between bg-[#F8FAFC]/50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#C82318]" aria-hidden="true" />
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#0075A2]">
                      Benchmarks
                    </p>
                  </div>
                  <p className="mt-1 font-display text-sm font-medium text-[#001720]">
                    Verified Specifications
                  </p>
                </div>

                {/* 3 Metric Specification Blocks */}
                <div className="space-y-4 my-auto">
                  {activeMetric.specs.map((spec) => (
                    <div key={spec.label} className="border-t border-[#DCE5EA] pt-2.5">
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#64748B]">
                          {spec.label}
                        </p>
                        <span className="font-mono text-[8px] px-1 py-0.2 rounded-xs bg-[#E2E8F0] text-[#475569]">
                          {spec.tag}
                        </span>
                      </div>
                      <p className="xn-tabular mt-1 font-display text-2xl xl:text-3xl font-medium tracking-tight text-[#001720]">
                        {spec.value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#64748B] leading-tight">
                        {spec.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Architecture Integrity Tag */}
                <div className="border-t border-[#DCE5EA] pt-3">
                  <p className="font-mono text-[9px] text-[#64748B] uppercase tracking-wider">
                    Next.js 15 &amp; React 19 Enterprise Suite
                  </p>
                </div>
              </div>

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
              className="relative overflow-hidden border border-[#DCE5EA] bg-white p-5 sm:p-8 shadow-xs"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[#DCE5EA] pb-3 mb-4">
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

              <p className="mt-2 text-sm leading-relaxed text-[#4A6270]">
                {service.summary}
              </p>

              {/* Mobile Bespoke Artwork Strip */}
              <div className="my-6 border border-[#DCE5EA] bg-[#FAFCFD] p-2 flex items-center justify-center">
                <ChapterArtwork activeIdx={sIdx} />
              </div>

              {/* Deliverables List */}
              <div className="space-y-3 pt-2">
                {chapter.layers.map((layer) => (
                  <div
                    key={layer.title}
                    className="border-l-2 border-[#0075A2] pl-3"
                  >
                    <p className="font-display text-sm font-semibold text-[#001720]">
                      {layer.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#64748B] leading-relaxed">
                      {layer.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile Technical Benchmarks */}
              <div className="my-6 grid grid-cols-3 gap-2 border-y border-[#DCE5EA] py-3 bg-[#F8FAFC] px-3">
                {metric.specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="font-mono text-[8px] uppercase tracking-wider text-[#64748B]">
                      {spec.label}
                    </p>
                    <p className="font-display text-base font-semibold text-[#001720]">
                      {spec.value}
                    </p>
                    <p className="text-[9px] text-[#64748B] leading-tight">
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
