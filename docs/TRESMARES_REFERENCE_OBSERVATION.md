# Tresmares Reference Observation & Xntrova Capabilities Rebuild Plan

**Reference URL:** `https://www.tresmarescapital.com/en/`  
**Target Section:** `component component--contentscrollcenter` (Financial Solutions)  
**Inspection Method:** Headless Chrome DevTools Protocol (CDP), live DOM traversal, computed CSS properties, multi-scroll screen captures, and exact SVG path extraction.

---

## 1. Reference Observations (Phase 1)

From direct CDP inspection and automated extraction of `https://www.tresmarescapital.com/en/`:

### A. Section Architecture & DOM Structure
- **Overall Container:** `<section class="component component--contentscrollcenter" data-component="contentscrollcenter">`
- **Total Scroll Track:** `height: 3208px` (for 4 services, ~800px natural scroll track per service).
- **Sticky Viewport:** `<div class="sticky">` with `position: sticky; top: 0; width: 100%; height: 100vh; overflow: visible`.
- **Background Atmosphere:** Uniform, expansive neutral light stone/grey canvas (`rgb(213, 213, 213)` / `#E2E2E2` - `#EAEAEA`). There are **no card borders**, **no inner frames**, **no dashboard panels**, and **no dark tech boxes**.

### B. Spatial Layout & Negative Space Hierarchy
The section uses a 4-corner spatial distribution that lets the center artwork breathe in wide negative space:

1. **Top-Left (Discipline Selector):**
   - `<ul class="anchors" data-desktop="">` located at `top: 71px, left: 71px`.
   - Simple, unboxed vertical list of service names.
   - Active service: highlighted in bold, dark charcoal (`rgb(43, 43, 43)` / `#2B2B2B`).
   - Inactive services: subtle muted grey (`#999999` / `#A0A0A0`).
   - **Zero boxes, zero icons, zero background cards, zero pill indicators.**

2. **Center Stage (The Dominant Visual):**
   - Centered horizontally and vertically: `left: 50%, top: 50%, transform: translate(-50%, -50%)`.
   - **Background Layer:** Monumental display typography title (`Private Equity`, `Direct Lending`, `Fund of Funds`, `Fund Financing`) in massive font size (~140px-180px), centered, rendered in semi-transparent grey (`rgba(0,0,0,0.12)`).
   - **Foreground Layer:** Bold, solid geometric silhouette shapes in vivid accent color (`#e41613` red) layered with high-contrast photographic cutouts:
     - Service 1: Two staggered solid rectangular blocks.
     - Service 2: A 2x2 grid of four beveled 3D square blocks.
     - Service 3: A bold circular arc / crescent shape split into halves.
     - Service 4: Two chevron/pentagon roof blocks.
   - **Absolute clarity:** There are **zero coordinate axes, zero dashed lines, zero telemetry tags, and zero interface HUD boxes**. The silhouettes are immediately recognizable from 10 feet away.

3. **Bottom-Left (Service Narrative & Actions):**
   - Located at `left: 71px, bottom: 71px, max-width: 380px`.
   - Narrative paragraph: Crisp, readable editorial text in dark charcoal (`rgb(43, 43, 43)`).
   - Actions: Underlined link (`Know more`).

4. **Bottom-Right (Metrics & Benchmarks):**
   - Located at `right: 71px, bottom: 71px, width: ~200px`.
   - `<div class="details">`: Clean, unboxed vertical stack of metric pairs.
   - Metric Label: Small uppercase tracked typography (e.g. `AUMS`, `EBITDA`, `TICKET`).
   - Metric Value: Large high-contrast values (e.g. `€550m+`, `€1m ⟷ €25m`).
   - Completely unboxed, floating freely against the clean canvas.

### C. Scroll Mechanics & Transition Physics
- As the user scrolls vertically:
  - Each slide (`.content`) uses `clip-path: inset(progress% 0 0)` to create a seamless vertical wipe.
  - The narrative text and metrics translate smoothly upward into view (`translateY: 240px → 0px`).
  - The active anchor in the top-left updates simultaneously.
  - The center geometric shape and watermark title morph and wipe in perfect coordination.
  - Reverse scrolling restores earlier slides seamlessly.
  - At the end of the scroll track, the sticky container releases cleanly as the next section scrolls up over it.

---

## 2. Comparison: Reference vs. Current Implementation (Phase 2)

| Design Characteristic | Reference (Tresmares Capital) | Current Xntrova Implementation | Specific Correction Required |
|---|---|---|---|
| **Overall Composition** | Expansive full-viewport canvas with 4-corner spatial distribution (top-left selector, bottom-left narrative, center stage, bottom-right metrics). Completely unboxed. | Confined inside an artificial 3-column dashboard container (`border border-[#DCE5EA] bg-white/80 rounded-2xl`). | **Remove the outer dashboard container entirely.** Let the section occupy the full viewport with expansive negative space. |
| **Service Navigation** | Unboxed, minimalist vertical text list at top-left. Dark active text, muted inactive text. | Enclosed inside a dashboard card with icons, colored left bars, and boxed buttons. | **Remove all card boxes and icons from selector.** Render a clean, elegant vertical text list at top-left. |
| **Central Visual Style** | Bold, solid geometric silhouettes in vivid accent color, paired with clean typography and imagery. Instantly legible silhouette. | Busy technical architectural drawings with dashed grid lines, coordinate hairlines, circular radar arcs, and HUD telemetry labels (`[POS: TOP 3 ORGANIC]`). | **Strip out all HUD telemetry, coordinate lines, and dashed grids.** Replace with bold, solid geometric silhouette compositions that have clear visual weight and instant legibility. |
| **Metrics / Benchmarks** | Floating unboxed vertical stack in bottom-right corner. Small uppercase label, large bold number. | Framed inside a dedicated "BENCHMARKS" panel with pill tags (`AUDIT STANDARD`, `PERFORMANCE GOAL`). | **Remove the benchmarks panel box and pill tags.** Float clean metric pairs in the bottom-right corner. |
| **Scroll Transition** | Seamless vertical wipe (`clip-path: inset`) and elastic upward rise of narrative text (`translateY`). | Discrete step-based opacity crossfades between 6 complex SVG cards. | **Implement smooth scroll-linked vertical wipe and translateY transitions** matching the coordinated feel of the reference. |

### The Five Biggest Differences:
1. **Unboxed Canvas vs. Dashboard Card:** The reference uses the open viewport with breathing negative space; Xntrova was trapping content inside a framed 3-column card box.
2. **Bold Geometric Silhouette vs. Cluttered Technical HUD:** The reference uses solid, clear graphic silhouettes; Xntrova had coordinate axes, dashed grid lines, and telemetry labels.
3. **Corner Spatial Hierarchy vs. Columnar Dashboard:** The reference places the selector top-left, narrative bottom-left, metrics bottom-right, and artwork center; Xntrova crammed them into three side-by-side columns.
4. **Minimalist Typography vs. Decorative Accents:** The reference relies on pure typography scale and contrast; Xntrova used borders, badges, and status bars (`// XNTROVA CAPABILITIES SUITE`).
5. **Scroll-Driven Continuity vs. Step Crossfade:** The reference coordinates slide wipes and elastic text translation; Xntrova stepped abruptly between SVG illustrations.

---

## 3. Rebuild Architecture for Xntrova (Phase 3)

### A. Color Palette & Atmosphere
- Background: Elegant light neutral tone (`#F4F6F8` or `#F7F9FA`), seamlessly integrated into Xntrova's clean editorial aesthetic.
- Watermark Typography: Giant ghosted display text in center (`rgba(0, 23, 32, 0.07)`).
- Geometric Accent Silhouettes: Signature Xntrova brand colors:
  - Deep Navy: `#001720`
  - Cerulean Blue: `#0077B6`
  - Warm Amber: `#FAAE39`
  - Vivid Crimson: `#C82318`
- Primary Typography: Deep slate `#001720` for high-contrast legibility.

### B. The 6 Bespoke Geometric Silhouettes
Instead of cluttered blueprints, 6 bold, solid geometric silhouettes:
1. **01 Search Engine Optimization:** Bold stepped isometric prism blocks in Cerulean & Deep Navy with an ascending Warm Amber trajectory accent.
2. **02 Paid Advertising (PPC):** Two bold staggered solid rectangular blocks (matching the iconic Tresmares Private Equity composition) in Vivid Crimson and Deep Navy.
3. **03 Website & App Development:** A 2x2 grid of four beveled geometric square blocks (matching Tresmares Direct Lending) in Cerulean Blue and Deep Navy.
4. **04 E-Commerce & Amazon Growth:** Interlocking faceted diamond / prism blocks in Warm Amber and Cerulean Blue.
5. **05 Social Media & Reputation (ORM):** Solid hexagonal shield silhouette in Vivid Crimson and Deep Navy.
6. **06 Content, Video & Lifecycle Email:** Bold split circular arc / crescent silhouette in Warm Amber and Deep Navy.

### C. The 4-Corner Spatial Distribution
- **Top-Left (`top: 10%`, `left: 5%`):** Clean vertical list of all 6 services. Active service is bold `#001720`, inactive services are muted `#94A3B8`. Click-to-scroll enabled.
- **Center (`50% / 50%`):** Giant watermark typography (`SEARCH ENGINE OPTIMIZATION`, `PAID ADVERTISING`, etc.) + Solid Geometric Silhouette Visual.
- **Bottom-Left (`bottom: 10%`, `left: 5%`, `max-width: 420px`):** Active service narrative paragraph, 3 verified deliverables, direct package links, and "Request Audit →" CTA.
- **Bottom-Right (`bottom: 10%`, `right: 5%`, `max-width: 260px`):** Vertical stack of 3 verified metrics (e.g. `INDEXATION: 100%`, `MOBILE SPEED: 95+`, `TRAFFIC BENCHMARK: +250%`), unboxed.
- **Mobile (<1024px):** Clean sequential flow where each service displays the bold geometric artwork, title, narrative, deliverables, and metrics with zero horizontal overflow.
