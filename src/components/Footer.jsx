import {
  BRAND_INFO,
  CORE_SERVICES,
  SOCIAL_LINKS,
  PRIMARY_NAV_LINKS,
  LEGAL_POLICY_LINKS,
} from "@/data/xntrova-data";

/**
 * Architectural Deep Navy Footer
 * - Uses the transparent light brand logo (`/assets/brand/xntrova-logo-light.png`)
 *   directly on `#001720` with zero white box wrapper.
 * - Clean hairline partitions, minimal editorial typography, and the six verified legal policies.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/12 bg-[#001720] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Mark & Positioning Column (Cols 1-4) */}
          <div className="lg:col-span-4">
            <a
              href="#top"
              aria-label="Xntrova Technologies — Back to top"
              className="inline-flex items-center transition-opacity hover:opacity-85"
            >
              <img
                src="/assets/brand/xntrova-logo-light.png"
                alt="Xntrova Technologies"
                width={154}
                height={35}
                className="h-8 w-auto object-contain"
              />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {BRAND_INFO.shortBio}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-white/12 pt-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Xntrova Technologies on ${social.name}`}
                  className="text-xs font-medium uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-[#FAAE39]"
                >
                  {social.name} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column (Cols 5-6) */}
          <div className="lg:col-span-2 lg:pl-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAAE39]">
              Index
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs">
              {PRIMARY_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-medium text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities Column (Cols 7-9) */}
          <div className="lg:col-span-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAAE39]">
              Core Capabilities
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs">
              {CORE_SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href={service.canonicalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/75 transition-colors hover:text-white"
                  >
                    <span>{service.title}</span>
                    <span className="text-[#FAAE39]" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* New Delhi Office Column (Cols 10-12) */}
          <div className="lg:col-span-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAAE39]">
              New Delhi Headquarters
            </h2>
            <address className="mt-4 space-y-3 text-xs not-italic text-white/75">
              <p className="leading-relaxed">{BRAND_INFO.address}</p>
              <p>
                <a
                  href={BRAND_INFO.phoneHref}
                  className="xn-tabular font-semibold text-white transition-colors hover:text-[#FAAE39]"
                >
                  {BRAND_INFO.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={BRAND_INFO.emailHref}
                  className="font-medium text-sky-300 transition-colors hover:text-white"
                >
                  {BRAND_INFO.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Six Legal Policy Links (Part 5) */}
        <div className="mt-12 border-t border-white/12 pt-6">
          <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2.5 text-xs text-white/60">
            <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FAAE39]">
              Legal &amp; Policies:
            </span>
            {LEGAL_POLICY_LINKS.map((policy) => (
              <a
                key={policy.name}
                href={policy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {policy.name} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Back to Top Row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-white/45 sm:flex-row">
          <p>
            © 2026 {BRAND_INFO.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FAAE39] transition-colors hover:text-white"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
