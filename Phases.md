# Phases — Implementation Roadmap

- **Phase 1: Bootstrap & Foundation (Completed)**
  - Fetched canonical Agent Forge skills (`agent-forge-bootstrap`, `production-website`, `make-this-project`) into `.agents/skills/`.
  - Initialized Git, Next.js 15, React 19, Tailwind CSS v4, and pure JavaScript (`jsconfig.json`) configuration.
- **Phase 2: Design System & Verified Data Layer (Completed)**
  - Configured `Poppins` font, `--xn-*` tokens in `src/app/globals.css`, SEO metadata + JSON-LD in `src/app/layout.jsx`, and verified content in `src/data/xntrova-data.js`.
- **Phase 3: P0 Core Sections & Honest Form Boundary (Completed)**
  - Implemented `Navbar.jsx`, `Hero.jsx`, `TrustStrip.jsx`, `ServicesSection.jsx`, `AboutWhySection.jsx`, `ProcessSection.jsx`, `PortfolioSection.jsx`, `TestimonialsFaq.jsx`, `ContactSection.jsx`, `Footer.jsx`, `not-found.jsx`, and `POST /api/lead` (`src/app/api/lead/route.js`).
- **Phase 4: P1 Interactive Polish (Completed)**
  - Wired service category filtering, service-to-form preselection, portfolio sector filtering, and interactive 4-stage process explorer.
- **Phase 5: Verification & Multi-Viewport Browser QA (Completed)**
  - Verified zero `.ts`/`.tsx` files in application code.
  - Passed `npm run lint` and `npm run build` with zero errors.
  - Verified live production server across `375px`, `768px`, `1024px`, and `1440px` viewports in headless Chrome (`0` console errors, `0` horizontal overflow, `0` duplicate DOM IDs, visible `<h1>` and `#hero-primary-cta` on all viewports).
