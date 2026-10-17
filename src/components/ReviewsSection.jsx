import { VERIFIED_TESTIMONIALS } from "@/data/xntrova-data";

const AVATAR_COLORS = {
  "amit-verma": "#faae39",
  "neha-kapoor": "#005a7d",
  "rahul-sharma": "#0075a2",
  "ankit-gupta": "#faae39",
  priya: "#005a7d",
};

/**
 * ReviewsSection — Milestone 5
 * Restored presentation style of the ORIGINAL XNTROVA WEBSITE:
 * - Clean white background with subtle hairline dividers.
 * - Header: "Words from Our Valued Clients"
 * - Horizontal snap-scroll track with original card proportions.
 * - Initial circle avatars with exact original colors (#faae39, #005a7d, #0075a2).
 * - Verified Google 4-color icon, 5 gold stars (#FBBC05), and verbatim reviews.
 */
export default function ReviewsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="reviews-heading"
      className="bg-white py-16 sm:py-20 lg:py-24 border-b border-[#D5E0E6]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#FAAE39]" />
            <span className="xn-tabular text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0075A2]">
              Verified Feedback
            </span>
          </div>
          <h2
            id="reviews-heading"
            className="font-display text-3xl md:text-4xl font-bold text-[#001720] mb-3 tracking-tight"
          >
            Words from Our Valued Clients
          </h2>
          <p className="text-sm font-medium text-[#5A707A]">
            Direct reviews from founders, directors, and executives who have grown with Xntrova.
          </p>
        </div>

        {/* Auto-Scrolling Reviews Marquee Viewport */}
        <div
          tabIndex={0}
          aria-label="Client review testimonials track. Auto-scrolling, pauses on hover or focus."
          className="xn-reviews-viewport [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-4 focus:outline-none focus:ring-1 focus:ring-[#0075A2]"
        >
          <div className="xn-reviews-track">
            {/* Primary Track (Accessible to screen readers and keyboard users) */}
            <div className="xn-reviews-group pr-6">
              {VERIFIED_TESTIMONIALS.map((review) => {
                const initial = review.name.charAt(0);
                const avatarBg = AVATAR_COLORS[review.id] || "#0075a2";

                return (
                  <article
                    key={review.id}
                    className="w-[320px] sm:w-[360px] md:w-[380px] shrink-0"
                  >
                    <div className="rounded-md border border-[#D5E0E6] bg-white shadow-[0_1px_2px_rgba(16,24,32,0.04),0_8px_24px_rgba(16,24,32,0.06)] flex h-full flex-col justify-between gap-3 p-5">
                      <div>
                        {/* Top Row: Avatar + Name/Role + Google Logo */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span
                              aria-hidden="true"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold shadow-sm"
                              style={{ backgroundColor: avatarBg }}
                            >
                              {initial}
                            </span>
                            <div>
                              <p className="font-semibold text-[#001720] text-xs leading-tight">
                                {review.name}, {review.role}
                              </p>
                              <span className="text-[10px] text-[#5A707A]">
                                Verified Client
                              </span>
                            </div>
                          </div>

                          {/* Google 4-Color Logo */}
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            aria-label="Google Review"
                            className="shrink-0 mt-0.5"
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
                        </div>

                        {/* 5 Gold Stars */}
                        <div
                          className="flex gap-0.5 text-[#FBBC05] mt-3"
                          aria-label="5 out of 5 stars"
                        >
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              stroke="none"
                              aria-hidden="true"
                            >
                              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="mt-3 text-xs sm:text-[13px] text-[#4A606A] leading-relaxed line-clamp-5">
                          “{review.quote}”
                        </p>
                      </div>

                      {/* Bottom source badge */}
                      <div className="pt-3 border-t border-[#EDF2F5] flex items-center justify-between text-[10px] text-[#7E939E]">
                        <span>Source: Google Verified Review</span>
                        <span className="text-[#0075A2] font-semibold">5.0 / 5.0</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Duplicate Track (for Seamless Infinite Loop, Hidden from Screen Readers) */}
            <div
              aria-hidden="true"
              className="xn-reviews-group xn-reviews-group-duplicate pr-6"
            >
              {VERIFIED_TESTIMONIALS.map((review) => {
                const initial = review.name.charAt(0);
                const avatarBg = AVATAR_COLORS[review.id] || "#0075a2";

                return (
                  <article
                    key={`dup-${review.id}`}
                    tabIndex={-1}
                    className="w-[320px] sm:w-[360px] md:w-[380px] shrink-0 pointer-events-none"
                  >
                    <div className="rounded-md border border-[#D5E0E6] bg-white shadow-[0_1px_2px_rgba(16,24,32,0.04),0_8px_24px_rgba(16,24,32,0.06)] flex h-full flex-col justify-between gap-3 p-5">
                      <div>
                        {/* Top Row: Avatar + Name/Role + Google Logo */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold shadow-sm"
                              style={{ backgroundColor: avatarBg }}
                            >
                              {initial}
                            </span>
                            <div>
                              <p className="font-semibold text-[#001720] text-xs leading-tight">
                                {review.name}, {review.role}
                              </p>
                              <span className="text-[10px] text-[#5A707A]">
                                Verified Client
                              </span>
                            </div>
                          </div>

                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className="shrink-0 mt-0.5"
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
                        </div>

                        {/* 5 Gold Stars */}
                        <div className="flex gap-0.5 text-[#FBBC05] mt-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="mt-3 text-xs sm:text-[13px] text-[#4A606A] leading-relaxed line-clamp-5">
                          “{review.quote}”
                        </p>
                      </div>

                      {/* Bottom source badge */}
                      <div className="pt-3 border-t border-[#EDF2F5] flex items-center justify-between text-[10px] text-[#7E939E]">
                        <span>Source: Google Verified Review</span>
                        <span className="text-[#0075A2] font-semibold">5.0 / 5.0</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Informational Caption */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#5A707A]">
          <span>Continuous verified client feedback • Hover or focus to pause</span>
          <span className="font-mono text-[11px] text-[#0075A2]">5.0 ★ Google Verified</span>
        </div>
      </div>
    </section>
  );
}
