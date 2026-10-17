import { REVIEW_PLATFORMS, VERIFIED_CLIENT_LOGOS } from "@/data/xntrova-data";

/**
 * Perpetually Auto-Scrolling Partner & Client Strip (Priority 4)
 * - Moves horizontally at a consistent, restrained speed (`xnMarqueeScroll 36s linear infinite`).
 * - Loops seamlessly (`translate3d(0,0,0)` -> `translate3d(-50%,0,0)`) with zero gap or jump.
 * - Pauses smoothly in-place on pointer hover (`.xn-marquee-viewport:hover`) and keyboard focus
 *   (`.xn-marquee-viewport:focus-within`) via `animation-play-state: paused`.
 * - Duplicate loop group is hidden from assistive technology (`aria-hidden="true"`).
 * - Respects `prefers-reduced-motion: reduce` by disabling continuous motion and wrapping cleanly.
 */
export default function TrustStrip() {
  const imagePlatforms = REVIEW_PLATFORMS.filter((p) => p.logoUrl);

  return (
    <section
      aria-label="Verified Clients and Industry Recognition"
      className="border-t border-b border-[#DBE4E8] bg-[#F4F8FA] py-6"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
          {/* Left Static Label & Accredited Directory Marks */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-6 border-b border-[#DBE4E8] pb-4 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0">
            <div className="flex items-center gap-2.5">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#C82318]"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#001720]">
                Trusted Partners
              </span>
            </div>

            <div className="flex items-center gap-5">
              {imagePlatforms.map((platform) => (
                <img
                  key={platform.name}
                  src={platform.logoUrl}
                  alt={`${platform.name} — ${platform.role}`}
                  width={68}
                  height={20}
                  loading="eager"
                  className="max-h-4 w-auto object-contain opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
          </div>

          {/* Right Perpetually Auto-Scrolling Client Logo Marquee */}
          <div className="xn-marquee-viewport min-w-0 flex-1">
            <div className="xn-marquee-track">
              {/* Group 1: Accessible Primary Sequence */}
              <ul
                aria-label="Verified client organizations"
                className="xn-marquee-group gap-12 pr-12"
              >
                {VERIFIED_CLIENT_LOGOS.map((client) => (
                  <li key={client.name} className="shrink-0">
                    <a
                      href="#portfolio"
                      title={`${client.name} — ${client.sector}`}
                      className="group flex items-center gap-3 rounded px-2 py-1 focus:outline-none"
                    >
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        width={96}
                        height={32}
                        loading="eager"
                        className="h-7 w-auto max-w-[112px] object-contain opacity-80 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                      <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-[#5A707A] transition-colors group-hover:text-[#001720] sm:inline-block">
                        {client.sector}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Group 2: Seamless Loop Duplicate (Hidden from Assistive Technology) */}
              <ul
                aria-hidden="true"
                className="xn-marquee-group xn-marquee-group-duplicate gap-12 pr-12"
              >
                {VERIFIED_CLIENT_LOGOS.map((client) => (
                  <li key={`dup-${client.name}`} className="shrink-0">
                    <div className="group flex items-center gap-3 px-2 py-1">
                      <img
                        src={client.logoUrl}
                        alt=""
                        width={96}
                        height={32}
                        loading="eager"
                        className="h-7 w-auto max-w-[112px] object-contain opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                      />
                      <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-[#5A707A] sm:inline-block">
                        {client.sector}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
