"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  BRAND_INFO,
  CORE_SERVICES,
  PRIMARY_NAV_LINKS,
} from "@/data/xntrova-data";

/**
 * Architectural Editorial Header (Milestone 1 — Section 5)
 * - Uses the transparent light-wordmark Xntrova logo (`/assets/brand/xntrova-logo-light.png`)
 *   directly on the header canvas: zero white rectangular box, zero redundant company name text.
 * - Integrates seamlessly over the opening Hero and transitions to a deep-navy translucent
 *   bar with a single hairline bottom border (`border-white/10`) upon scrolling.
 * - Flush right architectural CTA block inspired by Tresmares Capital.
 */
export default function Navbar({ onSelectService }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const isHome = usePathname() === "/";
  // Section anchors live on the homepage; prefix them when rendered on other routes.
  const toSection = (hash) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQuickAuditSelect = (serviceTitle) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectService) {
      onSelectService(serviceTitle);
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 border-b transition-colors duration-300 ${
        scrolled || mobileMenuOpen
          ? "border-white/10 bg-[#001720]/95 backdrop-blur-md"
          : "border-white/12 bg-gradient-to-b from-[#001720]/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-stretch justify-between pl-4 sm:h-[72px] sm:pl-8 lg:pl-12">
        {/* Cohesive Transparent Brand Logo — Zero White Box, Zero Redundant Label */}
        <div className="flex items-center">
          <a
            href={isHome ? "#top" : "/"}
            className="inline-flex shrink-0 items-center py-2 focus:outline-none"
            aria-label="Xntrova Technologies Home"
          >
            <img
              src="/assets/brand/xntrova-logo-light.png"
              alt="Xntrova Technologies"
              width={156}
              height={35}
              className="h-6 w-auto object-contain sm:h-7"
            />
          </a>
        </div>

        {/* Center Editorial Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {/* Capabilities Dropdown Trigger */}
          <div
            className="relative flex h-full items-center"
            ref={dropdownRef}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesDropdownOpen((prev) => !prev)}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              className="xn-press inline-flex items-center gap-1.5 text-[13px] font-medium tracking-wide text-white/85 hover:text-white"
            >
              <span>Capabilities</span>
              <svg
                className={`size-3 text-[#FAAE39] transition-transform duration-200 ${
                  servicesDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Minimal Editorial Dropdown */}
            {servicesDropdownOpen && (
              <div className="xn-stage-swap absolute top-full left-0 w-[480px] origin-top-left pt-0">
                <div className="border border-white/12 bg-[#001720] p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                      Six Disciplines
                    </span>
                    <a
                      href={toSection("#services")}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-medium text-[#FAAE39] hover:text-white"
                    >
                      Explore Stage →
                    </a>
                  </div>

                  <div className="divide-y divide-white/10">
                    {CORE_SERVICES.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
                      >
                        <a
                          href={toSection("#services")}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="group flex items-baseline gap-3.5 text-left"
                        >
                          <span className="xn-tabular text-[11px] font-medium text-white/45 group-hover:text-[#FAAE39]">
                            {service.number}
                          </span>
                          <span className="text-sm font-medium text-white/90 group-hover:text-white">
                            {service.title}
                          </span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleQuickAuditSelect(service.title)}
                          className="xn-press shrink-0 text-[11px] font-medium text-white/55 hover:text-[#FAAE39]"
                        >
                          Audit →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {PRIMARY_NAV_LINKS.slice(1).map((item) => (
            <a
              key={item.href}
              href={toSection(item.href)}
              className="text-[13px] font-medium tracking-wide text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Architectural Block Actions (Tresmares-style flush hairline partition) */}
        <div className="hidden items-stretch lg:flex">
          <a
            href={BRAND_INFO.phoneHref}
            className="xn-tabular hidden items-center border-l border-white/12 px-6 text-xs font-medium tracking-wide text-white/75 transition-colors hover:text-white xl:flex"
          >
            {BRAND_INFO.phoneDisplay}
          </a>

          <a
            href={toSection("#contact")}
            className="xn-press flex items-center gap-3 border-l border-white/12 bg-white/[0.06] px-8 text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-[#FAAE39] hover:text-[#001720]"
          >
            <span>Request Audit</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-stretch lg:hidden">
          <a
            href={toSection("#contact")}
            className="xn-press flex items-center border-l border-white/12 px-4 text-xs font-medium text-[#FAAE39]"
          >
            Request Audit
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="xn-press flex w-14 items-center justify-center border-l border-white/12 text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? (
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 15h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="xn-stage-swap border-t border-white/10 bg-[#001720] px-6 pt-4 pb-8 lg:hidden"
        >
          <nav aria-label="Mobile Navigation" className="mx-auto max-w-lg">
            <div className="divide-y divide-white/10">
              {PRIMARY_NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={toSection(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 text-lg font-medium text-white hover:text-[#FAAE39]"
                >
                  <span>{item.label}</span>
                  <span className="text-sm text-[#FAAE39]">→</span>
                </a>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                Direct Channel Preselection
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5">
                {CORE_SERVICES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleQuickAuditSelect(service.title)}
                    className="xn-press text-xs font-medium text-white/80 underline-offset-4 hover:text-[#FAAE39] hover:underline"
                  >
                    {service.number} {service.shortTitle}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-xs">
              <a
                href={BRAND_INFO.phoneHref}
                className="xn-tabular font-medium text-white/80 hover:text-white"
              >
                {BRAND_INFO.phoneDisplay}
              </a>
              <a
                href={toSection("#contact")}
                onClick={() => setMobileMenuOpen(false)}
                className="xn-editorial-link font-semibold text-[#FAAE39]"
              >
                <span>Start Growth Audit</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
