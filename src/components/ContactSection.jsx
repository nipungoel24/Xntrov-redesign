"use client";

import { useState, useEffect } from "react";
import { BRAND_INFO, CORE_SERVICES } from "@/data/xntrova-data";
import Reveal from "@/components/Reveal";

const INITIAL_FORM_STATE = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: CORE_SERVICES[0].title,
  website: "",
  message: "",
};

function validateClientPayload(values) {
  const errors = {};
  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (at least 2 characters).";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailRegex.test(values.email.trim())) {
    errors.email = "Please enter a valid business or personal email address.";
  }
  const cleanPhone = (values.phone || "").replace(/[^\d+]/g, "");
  if (!cleanPhone || cleanPhone.length < 7) {
    errors.phone = "Please enter a valid phone or WhatsApp number.";
  }
  if (!values.service || values.service.trim().length === 0) {
    errors.service = "Please select a primary digital marketing service.";
  }
  if (!values.message || values.message.trim().length < 15) {
    errors.message =
      "Please share at least 15 characters about your project or growth goals.";
  }
  return errors;
}

/**
 * Contact & Consultation Section — Deliberate Editorial Conclusion (Milestone 5 — Section 13)
 * - Monumental stair-stepped typographic invitation at the top of the section.
 * - Minimal un-nested contact coordinate ledger on the left.
 * - Clean architectural form sheet on the right (zero heavy rounded card wrappers),
 *   preserving `/api/lead` validation, service preselection, inline error states,
 *   and direct email/WhatsApp dispatch fallbacks.
 */
export default function ContactSection({ preselectedService, selectedService }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const incomingService = preselectedService || selectedService;

  useEffect(() => {
    if (incomingService) {
      setFormData((prev) => ({
        ...prev,
        service: incomingService,
      }));
      setErrors((prev) => ({ ...prev, service: undefined }));
    }
  }, [incomingService]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionResult(null);

    const validationErrors = validateClientPayload(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(
          data.errors || {
            form: data.message || "Please check your inputs and try again.",
          }
        );
      } else {
        setSubmissionResult(data);
      }
    } catch {
      setErrors({
        form: "Network error while validating your inquiry. You can also reach us directly via email or phone below.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `Growth Audit Inquiry: ${formData.service} — ${
        formData.company || formData.fullName
      }`
    );
    const body = encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${
        formData.phone
      }\nCompany: ${formData.company || "N/A"}\nWebsite: ${
        formData.website || "N/A"
      }\nPrimary Service: ${formData.service}\n\nProject Goals:\n${
        formData.message
      }`
    );
    return `mailto:${BRAND_INFO.email}?subject=${subject}&body=${body}`;
  };

  const buildWhatsAppHref = () => {
    const text = encodeURIComponent(
      `Hi Xntrova team, I'm ${formData.fullName}${
        formData.company ? ` from ${formData.company}` : ""
      }. I'd like a growth audit for *${formData.service}*. Goals: ${
        formData.message
      }`
    );
    return `https://wa.me/918683828646?text=${text}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-[#001720] py-24 text-white lg:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Monumental Typographic Invitation — Begins directly with "Let's Architect" */}
        <Reveal variant="up">
          <div className="border-b border-white/12 pb-12 lg:pb-16">
            <h2
              id="contact-heading"
              className="font-display text-4xl font-medium leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.5rem]"
            >
              <span className="block">Let&apos;s Architect Your</span>
              <span className="mt-1 block text-[#FAAE39] sm:pl-[8%] lg:pl-[12%]">
                Next Growth Stage.
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Main 12-Column Split: Left Un-nested Coordinates + Right Clean Architectural Form */}
        <div className="mt-14 grid grid-cols-1 items-start gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Minimal Contact Information Arrangement (Cols 1-4) */}
          <Reveal variant="up" className="lg:col-span-4">
            <p className="text-sm leading-relaxed text-white/75 sm:text-base">
              Share your website and commercial priorities. Our New Delhi NCR
              strategists will audit your search footprint, paid media
              efficiency, and conversion architecture.
            </p>

            <dl className="mt-12 divide-y divide-white/12 border-y border-white/12">

              <div className="py-6">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAAE39]">
                  Direct Phone &amp; WhatsApp
                </dt>
                <dd className="mt-2.5 flex flex-wrap items-baseline justify-between gap-4">
                  <a
                    href={BRAND_INFO.phoneHref}
                    className="xn-tabular font-display text-xl font-medium text-white transition-colors hover:text-[#FAAE39]"
                  >
                    {BRAND_INFO.phoneDisplay}
                  </a>
                  <a
                    href={BRAND_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="xn-editorial-link text-xs font-semibold text-emerald-300 hover:text-white"
                  >
                    <span>WhatsApp Desk</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>

              <div className="py-6">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAAE39]">
                  Strategy Desk Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={BRAND_INFO.emailHref}
                    className="font-display text-xl font-medium text-sky-300 transition-colors hover:text-white"
                  >
                    {BRAND_INFO.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Right Column: Clean Architectural Consultation Form Surface (Cols 5-12 — Zero Heavy Rounded Card Bloat) */}
          <Reveal variant="up" delayMs={60} className="lg:col-span-8">
            <div className="border border-white/15 bg-[#041D29] p-6 sm:p-10 lg:p-12">
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-white/12 pb-5">
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.025em] text-white">
                    Request Your Digital Growth Audit
                  </h3>
                  <p className="mt-1 text-xs text-white/60">
                    Direct diagnostic review by our New Delhi SEO, Paid Media
                    &amp; Web Engineering leads
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="uppercase tracking-[0.18em] text-white/50">
                    Scope:
                  </span>
                  <span className="font-semibold text-[#FAAE39]">
                    {formData.service}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {errors.form && (
                  <div
                    role="alert"
                    className="border border-red-400/50 bg-red-950/50 p-4 text-xs font-medium text-red-200"
                  >
                    {errors.form}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-fullName"
                      className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80"
                    >
                      Full Name <span className="text-[#FAAE39]">*</span>
                    </label>
                    <input
                      id="lead-fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Rajesh Mehta"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={
                        errors.fullName ? "error-fullName" : undefined
                      }
                      className="mt-2 w-full border border-white/18 bg-[#001720] px-4 py-3 text-sm text-white placeholder-white/35 transition-colors focus:border-[#FAAE39] focus:outline-none"
                    />
                    {errors.fullName && (
                      <p
                        id="error-fullName"
                        className="mt-1.5 text-xs font-medium text-red-300"
                      >
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80"
                    >
                      Work Email <span className="text-[#FAAE39]">*</span>
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "error-email" : undefined
                      }
                      className="mt-2 w-full border border-white/18 bg-[#001720] px-4 py-3 text-sm text-white placeholder-white/35 transition-colors focus:border-[#FAAE39] focus:outline-none"
                    />
                    {errors.email && (
                      <p
                        id="error-email"
                        className="mt-1.5 text-xs font-medium text-red-300"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80"
                    >
                      Phone / WhatsApp <span className="text-[#FAAE39]">*</span>
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone ? "error-phone" : undefined
                      }
                      className="mt-2 w-full border border-white/18 bg-[#001720] px-4 py-3 text-sm text-white placeholder-white/35 transition-colors focus:border-[#FAAE39] focus:outline-none"
                    />
                    {errors.phone && (
                      <p
                        id="error-phone"
                        className="mt-1.5 text-xs font-medium text-red-300"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-service"
                      className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80"
                    >
                      Primary Capability{" "}
                      <span className="text-[#FAAE39]">*</span>
                    </label>
                    <select
                      id="lead-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.service)}
                      className="mt-2 w-full border border-white/18 bg-[#001720] px-4 py-3 text-sm font-medium text-white transition-colors focus:border-[#FAAE39] focus:outline-none"
                    >
                      {CORE_SERVICES.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                      <option value="Full-Funnel Digital Growth Package">
                        Full-Funnel Digital Growth Package
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-company"
                      className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80"
                    >
                      Company Name
                    </label>
                    <input
                      id="lead-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Organization"
                      className="mt-2 w-full border border-white/18 bg-[#001720] px-4 py-3 text-sm text-white placeholder-white/35 transition-colors focus:border-[#FAAE39] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-website"
                      className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80"
                    >
                      Website URL
                    </label>
                    <input
                      id="lead-website"
                      name="website"
                      type="url"
                      autoComplete="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                      className="mt-2 w-full border border-white/18 bg-[#001720] px-4 py-3 text-sm text-white placeholder-white/35 transition-colors focus:border-[#FAAE39] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lead-message"
                    className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80"
                  >
                    Business Goals &amp; Priorities{" "}
                    <span className="text-[#FAAE39]">*</span>
                  </label>
                  <textarea
                    id="lead-message"
                    name="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your target audience, organic/paid growth goals, or website requirements..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "error-message" : undefined
                    }
                    className="mt-2 w-full border border-white/18 bg-[#001720] px-4 py-3 text-sm text-white placeholder-white/35 transition-colors focus:border-[#FAAE39] focus:outline-none"
                  />
                  {errors.message && (
                    <p
                      id="error-message"
                      className="mt-1.5 text-xs font-medium text-red-300"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start justify-between gap-4 border-t border-white/12 pt-6 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="xn-press inline-flex w-full items-center justify-center gap-4 bg-[#FAAE39] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#001720] transition-colors hover:bg-white disabled:opacity-60 sm:w-auto"
                  >
                    <span>
                      {submitting
                        ? "Validating Inquiry..."
                        : "Validate & Prepare Audit Brief"}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>

                  <p className="max-w-xs text-[11px] leading-relaxed text-white/50">
                    Validates via <code>/api/lead</code> and prepares direct
                    email/WhatsApp dispatch when no live CRM webhook is set.
                  </p>
                </div>

                {submissionResult && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-6 border border-[#FAAE39]/40 bg-[#001720] p-5"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center bg-[#FAAE39] text-xs font-bold text-[#001720]">
                        ✓
                      </span>
                      <div className="flex-1">
                        <h4 className="font-display text-sm font-medium text-white">
                          {submissionResult.delivered
                            ? "Audit Request Delivered"
                            : "Audit Brief Validated & Ready to Send"}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-white/75">
                          {submissionResult.message}
                        </p>
                        {!submissionResult.delivered && (
                          <div className="mt-4 flex flex-wrap gap-4">
                            <a
                              href={buildMailtoHref()}
                              className="xn-editorial-link text-xs font-semibold text-[#FAAE39] hover:text-white"
                            >
                              <span>Send via Email ({BRAND_INFO.email})</span>
                              <span aria-hidden="true">→</span>
                            </a>
                            <a
                              href={buildWhatsAppHref()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="xn-editorial-link text-xs font-semibold text-emerald-300 hover:text-white"
                            >
                              <span>Send via WhatsApp</span>
                              <span aria-hidden="true">→</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
