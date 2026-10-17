# Project Engineering & Design Rules (Pass 4)

1. **JavaScript Only (`.js` / `.jsx`):** Strictly no `.ts` or `.tsx` files, no TypeScript annotations, and no TypeScript dependencies.
2. **Rule 1 — No Nested Containers:** Never place boxes inside boxes inside boxes. Use section backgrounds (`#001720`, `#FFFFFF`, `#F4F8FA`) and crisp 1px hairline dividers (`#E2E8EC` or `rgba(255,255,255,0.10)`) to organize content directly on the surface.
3. **Rule 2 — No Arbitrary Background Canvases or Glass Clutter:** `BackdropCanvas.jsx` is removed. Do not use arbitrary floating 2D/3D coins, heavy multi-layered `backdrop-filter` wrappers, or fake CSS orbs/wireframes.
4. **Rule 5 — Varied Section Layouts:** Alternate deliberately between dark (`#001720`) and light (`#FFFFFF`, `#F4F8FA`) brand surfaces and vary section structures (asymmetric editorial index, hairline-divided architectural ledger, scroll-linked vertical timeline, typographic quote spotlight + hairline FAQ).
5. **Rule 6 — Core Capabilities First:** Redesign and verify `ServicesSection.jsx` in the live browser on desktop (`1440px`) and mobile (`375px`) before propagating the system to the remaining sections.
6. **Rule 7 — Purposeful Scroll-Driven Motion:** Implement reversible scroll-linked progression in `ProcessSection.jsx` and `ServicesSection.jsx` using passive `scroll` + `requestAnimationFrame` updates and CSS transforms (`scaleY`), honoring `prefers-reduced-motion: reduce`.
7. **Rule 8 — Strict No Image Zoom:** Never apply `scale()` or `group-hover:scale-*` to any `<img>` on hover, focus, or state swap.
8. **Content Truthfulness & Preserved Logic:** Use only verified Xntrova data (`+250% Organic Traffic`, `120+ Projects Delivered`, `500+ Happy Clients`, `5.0 ★`), verified local assets in `public/assets/`, and preserve `/api/lead` validation, service-to-form preselection, and SEO metadata.
