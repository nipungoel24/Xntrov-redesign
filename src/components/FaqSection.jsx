"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/data/xntrova-data";

/**
 * FaqSection — Milestone 5
 * Restored presentation style of the ORIGINAL XNTROVA WEBSITE:
 * - Standalone section with dedicated hierarchy and light background (#F8FAFB).
 * - Header: "Frequently Asked Questions" + "Resolve your general queries and concerns with our FAQ section below."
 * - Accessible accordion with single-source markup and rotating plus icon.
 * - Active state matches original: `bg-primary/10 text-primary-dark` (bg-[#0075A2]/10 text-[#005a7d]).
 */
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#F8FAFB] py-16 sm:py-20 lg:py-24 border-b border-[#D5E0E6]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#0075A2]" />
            <span className="xn-tabular text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0075A2]">
              Got Questions?
            </span>
          </div>
          <h2
            id="faq-heading"
            className="font-display text-3xl md:text-4xl font-bold text-[#001720] mb-3 tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base font-medium text-[#5A707A]">
            Resolve your general queries and concerns with our FAQ section below.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.id}
                className="rounded-md border border-[#D5E0E6] bg-white overflow-hidden shadow-sm transition-colors"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-sm transition-colors ${
                      isOpen
                        ? "bg-[#0075A2]/10 text-[#005a7d]"
                        : "text-[#001720] hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`lucide lucide-plus shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-45 text-[#0075A2]" : "text-[#5A707A]"
                      }`}
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="px-5 pb-4 pt-1 text-sm text-[#4A606A] leading-relaxed border-t border-[#EDF2F5]"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Prompt */}
        <div className="mt-10 text-center text-xs text-[#5A707A]">
          <span>Have a question not addressed here? </span>
          <a
            href="#contact"
            className="text-[#0075A2] font-semibold underline underline-offset-4 hover:text-[#005a7d]"
          >
            Ask our strategists directly →
          </a>
        </div>
      </div>
    </section>
  );
}
