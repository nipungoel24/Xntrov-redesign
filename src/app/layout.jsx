import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { XNTROVA_BRAND, VERIFIED_FAQS, CORE_SERVICES } from "@/data/xntrova-data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(XNTROVA_BRAND.domain),
  title: "Best Digital Marketing Company in Delhi NCR - Xntrova",
  description: XNTROVA_BRAND.description,
  alternates: {
    canonical: "https://www.xntrova.com/",
  },
  icons: {
    icon: XNTROVA_BRAND.faviconUrl,
    apple: XNTROVA_BRAND.faviconUrl,
  },
  openGraph: {
    title: "Best Digital Marketing Company in Delhi NCR - Xntrova",
    description: XNTROVA_BRAND.positioning,
    url: "https://www.xntrova.com/",
    siteName: XNTROVA_BRAND.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: XNTROVA_BRAND.ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Xntrova Technologies — Best Digital Marketing Company in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Digital Marketing Company in Delhi NCR - Xntrova",
    description: XNTROVA_BRAND.positioning,
    images: [XNTROVA_BRAND.ogImageUrl],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
        "@id": "https://www.xntrova.com/#organization",
        name: XNTROVA_BRAND.name,
        url: "https://www.xntrova.com/",
        logo: XNTROVA_BRAND.logoUrl,
        image: XNTROVA_BRAND.ogImageUrl,
        description: XNTROVA_BRAND.positioning,
        telephone: "+91-868-382-8646",
        email: XNTROVA_BRAND.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "A107, 2nd Floor, Sector 8, Dwarka",
          addressLocality: "New Delhi",
          postalCode: "110077",
          addressCountry: "IN",
        },
        sameAs: XNTROVA_BRAND.socials.map((s) => s.href),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital Marketing & Web Engineering Services",
          itemListElement: CORE_SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: service.href,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.xntrova.com/#website",
        url: "https://www.xntrova.com/",
        name: XNTROVA_BRAND.name,
        publisher: {
          "@id": "https://www.xntrova.com/#organization",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.xntrova.com/#faq",
        mainEntity: VERIFIED_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      {/* Browser extensions (e.g. Grammarly: data-gr-ext-installed,
          data-new-gr-c-s-check-loaded) add attributes to <body> before
          hydration. This only ignores <body>'s own attributes; mismatches
          in its children are still reported. */}
      <body
        suppressHydrationWarning
        className="min-h-dvh flex flex-col bg-white text-[#001720] antialiased"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#faae39] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#001720] focus:shadow-lg"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
