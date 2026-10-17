"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ServicesSection from "@/components/ServicesSection";
import AboutWhySection from "@/components/AboutWhySection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * Xntrova Technologies Homepage — Reference-Led Editorial Redesign
 */
export default function HomePage() {
  const [preselectedService, setPreselectedService] = useState(
    "Search Engine Optimization"
  );

  const handleSelectServiceForAudit = (serviceName) => {
    setPreselectedService(serviceName);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-dvh bg-white text-[#001720]">
      <Navbar onSelectService={handleSelectServiceForAudit} />
      <main id="main-content" className="relative flex-1">
        <Hero />
        <TrustStrip />
        <ServicesSection onSelectService={handleSelectServiceForAudit} />
        <AboutWhySection />
        <ProcessSection />
        <PortfolioSection onSelectService={handleSelectServiceForAudit} />
        <ReviewsSection />
        <FaqSection />
        <ContactSection
          preselectedService={preselectedService}
          selectedService={preselectedService}
        />
      </main>
      <Footer />
    </div>
  );
}
