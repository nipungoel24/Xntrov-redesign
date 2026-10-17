# Architecture — Xntrova Technologies Homepage Redesign

## 1. Tech Stack
- **Framework:** Next.js 15 (App Router) with React 19 and pure **JavaScript (`.js` / `.jsx`)** (`jsconfig.json`).
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) + native CSS custom properties matching live Xntrova tokens (`--xn-*`).
- **Typography:** `next/font/google` (`Poppins` weights `400`, `500`, `600`, `700`).
- **Icons:** `lucide-react` + verified Cloudinary brand/client/tool logos.

## 2. Directory Structure
```text
c:\Kaam_Dhanda\Projects\Xntrova\
├── .agents/skills/              # Canonical Agent Forge skills & checklists
├── src/
│   ├── app/
│   │   ├── api/lead/route.js    # Honest lead submission endpoint & webhook integration boundary
│   │   ├── globals.css          # Xntrova design tokens, base styles, reduced-motion rules
│   │   ├── layout.jsx           # Root layout, Poppins font, SEO metadata, JSON-LD schema
│   │   ├── not-found.jsx        # Branded 404 page
│   │   ├── page.jsx             # Homepage composition & state orchestration (service preselection)
│   │   ├── robots.js            # SEO robots configuration
│   │   └── sitemap.js           # Canonical sitemap configuration
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky responsive header, desktop dropdown, accessible mobile drawer
│   │   ├── Hero.jsx             # All-viewport hero with headline, CTAs, KPI telemetry & growth preview
│   │   ├── TrustStrip.jsx       # Verified review platforms & client roster grid
│   │   ├── ServicesSection.jsx  # 6 core services + sub-services, P1 category filter & form pre-select
│   │   ├── AboutWhySection.jsx  # About 4 pillars, 4-stage growth flywheel, Why Choose Us & Martech stack
│   │   ├── ProcessSection.jsx   # Interactive 4-stage B2B execution roadmap
│   │   ├── PortfolioSection.jsx # Truthful Client Portfolio & Strategic Capabilities Showcase with filter
│   │   ├── TestimonialsFaq.jsx  # 5 verified Google reviews + accessible single-DOM FAQ accordion
│   │   ├── ContactSection.jsx   # Validated audit form with honest integration boundary & direct actions
│   │   └── Footer.jsx           # Full agency footer with Dwarka address, services, socials & quick links
│   └── data/
│       └── xntrova-data.js      # Verified Xntrova content, URLs, clients, FAQs, reviews
```

## 3. Honest Lead Form Architecture
- Client submits form payload to `POST /api/lead`.
- Server-side validation checks required fields (`fullName`, `email`, `phone`, `service`, `projectGoals`), email/phone format, and honeypot (`honeypot`).
- If `process.env.XNTROVA_LEAD_WEBHOOK_URL` is configured, the API forwards the payload and returns `{ delivered: true, mode: "live_webhook" }` only upon `2xx` confirmation.
- If no external webhook is configured in the assessment environment, the API returns `{ delivered: false, mode: "assessment_boundary" }` and the UI transparently informs the user that the payload was validated in the assessment sandbox, offering one-click dispatch via pre-filled `mailto:info@xntrova.com`, WhatsApp (`+91 868-382-8646`), or clipboard copy.
