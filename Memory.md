# Memory — Project Execution Log

## 1. Root-Cause Investigation of Image 404 Failures
- **Root Cause:** In the initial implementation, 50 out of 53 remote Cloudinary URLs in `src/data/xntrova-data.js` used unhashed/guessed filenames and returned HTTP `404`.
- **Resolution:** Downloaded and verified all 31 authentic `200 OK` assets into `public/assets/{brand,editorial,services,clients,badges}/` and updated `src/data/xntrova-data.js` to reference verified local paths exclusively.

## 2. Transparent Light Brand Logo Asset Generation
- **Finding:** `public/assets/brand/xntrova-logo.png` (`384×86` RGBA PNG) already had a transparent background (`alpha: 0`), but its `"NTROVA"` wordmark glyphs were dark navy (`#001720`), which previously forced a white rectangular pill background (`bg-white rounded-lg`) around the logo in the dark header and footer, alongside a redundant `"Xntrova Technologies"` text label.
- **Resolution:** Generated `public/assets/brand/xntrova-logo-light.png` (`384×86` RGBA PNG) preserving the blue/silver `X` swoosh while converting the `"NTROVA"` wordmark glyphs (`x >= 140, y >= 25`) to pure anti-aliased white (`#FFFFFF`). Used directly on `#001720` in `Navbar.jsx` and `Footer.jsx` with zero background box and zero duplicate text label.

## 3. Pass 5 — Editorial Design Overhaul (Milestones 1–6)
- **Typography Fix (`src/app/layout.jsx`):** Loaded `Space_Grotesk` (`--font-space-grotesk`) and `DM_Sans` (`--font-dm-sans`) via `next/font/google` so display headings and body copy render with their intended geometric editorial fonts rather than falling back to system fonts.
- **Milestone 1 (`Navbar.jsx`, `Hero.jsx`, `TrustStrip.jsx`, `ScrollTextReveal.jsx`):** Implemented flush hairline navigation, frameless environmental hero visual with monumental stair-stepped typography, atmospheric horizon dissolve into `#F4F8FA`, and reversible word-by-word scroll-linked text reveal.
- **Milestone 2 (`ServicesSection.jsx`):** Built a viewport-anchored (`lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)]` inside `lg:min-h-[340vh]`) spatial stage on desktop with reversible scroll progression (`01`–`06`), peripheral left index, evolving geometric plane, `scale-[1.08]` static crop aperture (eliminating baked-in source PNG corner artifacts with zero hover zoom), and dedicated compact mobile stage.
- **Milestone 3 (`AboutWhySection.jsx`):** Built an editorial spatial composition with `ScrollTextReveal` statement, asymmetric left narrative + frameless New Delhi strategy visual, and 4 vertically staggered `1px` wireframe benchmark columns (`+250%`, `120+`, `500+`, `5.0 ★`).
- **Milestone 4 (`ProcessSection.jsx`):** Built a central viewport-anchored sticky stage (`lg:min-h-[280vh]`) on `#001720` where the active stage (`01`–`04`) and evolving geometric architectural planes form the centerpiece.
- **Milestone 5 (`PortfolioSection.jsx`, `TestimonialsFaq.jsx`, `ContactSection.jsx`, `Footer.jsx`):** Replaced the 3×2 portfolio card grid with an asymmetric `7/5` editorial gallery; separated Testimonials and FAQ into a calm sequential experience; redesigned Contact & Footer with monumental typography, crisp `1px` architectural form fields, and the transparent light brand mark.
