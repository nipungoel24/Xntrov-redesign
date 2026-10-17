# PRD — Xntrova Technologies Homepage Redesign

## 1. Objective
Redesign and implement the homepage of **Xntrova Technologies** (`https://www.xntrova.com/`) for the *Web Developer – Homepage Redesign Assessment*. Deliver a modern, responsive, accessible, high-converting B2B digital marketing & web development agency homepage that fixes the live site's mobile usability, hierarchy, and conversion defects while strictly preserving verified Xntrova brand facts.

## 2. Target Audience & Core Value Proposition
- **Primary Audience:** B2B Founders, CMOs, Marketing Directors, and Enterprise/Public-Sector Decision Makers in Delhi NCR and globally.
- **Core Value Proposition:** *"India’s premier B2B digital marketing agency, delivering growth-focused solutions for businesses across Delhi and beyond."*

## 3. Priority Requirements (P0 / P1 / P2)
### P0 — Mandatory
1. **Header & Responsive Mobile Navigation:** Sticky navigation with verified Xntrova logo, section anchors, service links, contact info, accessible mobile menu drawer, and primary CTA (`Get a Free Audit`).
2. **All-Viewport Hero Section:** Fixes the live site's `max-md:hidden` mobile bug. Displays `H1` headline, supporting subheadline, primary/secondary CTAs, and verified agency benchmarks (`+250% Organic Traffic`, `120+ Projects Delivered`, `500+ Happy Clients`) on all viewports (`375px` to `1440px+`).
3. **Consistent Xntrova Design System:** Uses verified live CSS tokens (`#0075a2`, `#005a7d`, `#faae39`, `#ffa600`, `#001720`, `#001F2B`, `#0a4257`, `#f2f7f9`, `#e4e9eb`) and `Poppins` typography.
4. **Services Section:** Covers all 6 verified service pillars (SEO, Paid Advertising, Social Media Optimization, E-Commerce Marketing, Content Marketing, Website Development) and their verified sub-services.
5. **About & Why Choose Us Sections:** Features the 4 verified strategic pillars (*Creative Ideas*, *Strategic Planning*, *Data-Driven Decisions*, *Measurable Results*), the 4-stage growth flywheel (*Build Visibility*, *Engage Audience*, *Drive Conversions*, *Measure & Improve*), B2B differentiators, and the 18 verified Martech tools.
6. **Process / How We Work Section:** 4-stage execution methodology with deliverables.
7. **Truthful Client Portfolio & Strategic Capabilities Showcase:** Showcases verified Xntrova clients (e.g., *Umbrella Infocare*, *NITDA*, *Federal Ministry of Communication*, *Chetan Clinic*, *Pitti Jewels & Pearls*, *Fortune Mattresses*, *Amritya Wellness*, *Mahadev Tours*, *Scholar Scribe Solutions*, etc.) paired with documented service capabilities—without fabricating per-client ROI/revenue metrics.
8. **Verified Testimonials & FAQ Section:** 5 verified Google client reviews (*Amit Verma*, *Neha Kapoor*, *Rahul Sharma*, *Ankit Gupta*, *Priya*) + 6 verified review platforms + 5 verified FAQs with accessible single-source markup (fixing the live site's duplicate DOM ID bug).
9. **Dedicated Contact & Lead-Form Section:** Validated B2B audit request form with accessible errors, loading states, and an **honest** backend integration boundary (`/api/lead`) that clearly distinguishes live webhook delivery from assessment/demo mode while providing direct `mailto:info@xntrova.com` and WhatsApp (`+91 868-382-8646`) dispatch actions.
10. **Professional Footer, Responsive QA, Accessibility & SEO Basics:** Complete footer with Dwarka Sector 8 address, phone, email, socials, JSON-LD schema, Open Graph metadata, `robots.ts`, `sitemap.ts`, and production build passing.

### P1 — High-Value Interactive Enhancements
- Interactive service category filtering and **service-to-form preselection** (`Request Audit for This Service` scrolls to form and pre-selects the service).
- Sector/capability filtering and accessible detail modal/drawer in the Client & Capabilities Showcase.
- Interactive 4-step process explorer.
- Subtle motion with `prefers-reduced-motion` support.
