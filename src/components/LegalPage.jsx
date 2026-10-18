import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRAND_INFO } from "@/data/xntrova-data";
import { LEGAL_POLICIES, getPolicy } from "@/data/legal-policies";

function ContactCard() {
  return (
    <address className="my-5 border-l-2 border-[#FAAE39] bg-[#F4F8FA] px-5 py-4 text-sm not-italic leading-relaxed text-[#233C47]">
      <strong className="block font-display text-base font-medium text-[#001720]">
        {BRAND_INFO.name}
      </strong>
      <span className="block">{BRAND_INFO.address}, India</span>
      <span className="mt-2 block">
        Phone:{" "}
        <a href={BRAND_INFO.phoneHref} className="xn-tabular font-semibold text-[#0075A2] hover:text-[#001720]">
          {BRAND_INFO.phoneDisplay}
        </a>
      </span>
      <span className="block">
        Email:{" "}
        <a href={BRAND_INFO.emailHref} className="font-semibold text-[#0075A2] hover:text-[#001720]">
          {BRAND_INFO.email}
        </a>
      </span>
      <span className="block">Website: www.xntrova.com</span>
    </address>
  );
}

function Block({ block }) {
  if (block.contact) return <ContactCard />;
  if (block.h3) {
    return (
      <h3 className="mt-6 font-display text-lg font-medium tracking-[-0.02em] text-[#001720]">
        {block.h3}
      </h3>
    );
  }
  if (block.ul) {
    return (
      <ul className="mt-3 space-y-1.5 pl-5 text-[15px] leading-relaxed text-[#233C47] marker:text-[#0075A2] [list-style:square]">
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p className="mt-3 text-[15px] leading-relaxed text-[#233C47]">{block.p}</p>;
}

export default function LegalPage({ slug }) {
  const policy = getPolicy(slug);

  return (
    <div className="relative min-h-dvh bg-white text-[#001720]">
      <Navbar />
      <main id="main-content" className="flex-1">
        <header className="bg-[linear-gradient(160deg,#00131B_0%,#001F2B_45%,#083B52_100%)] text-white">
          <div className="mx-auto max-w-[1440px] px-5 pt-32 pb-14 sm:px-8 sm:pt-36 sm:pb-16 lg:px-12">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-200/90 sm:text-xs">
              Legal &amp; Policies
            </p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              {policy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {policy.description}
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:px-12">
          <nav aria-label="Legal policies" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0075A2]">
                All policies
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-l lg:border-[#DBE4E8]">
                {LEGAL_POLICIES.map((item) => {
                  const current = item.slug === slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/${item.slug}/`}
                        aria-current={current ? "page" : undefined}
                        className={`inline-flex min-h-10 items-center border px-3 text-sm transition-colors lg:-ml-px lg:border-0 lg:border-l-2 lg:px-4 ${
                          current
                            ? "border-[#001720] bg-[#001720] font-semibold text-white lg:border-[#FAAE39] lg:bg-transparent lg:text-[#001720]"
                            : "border-[#DBE4E8] text-[#4A606A] hover:text-[#001720] lg:border-transparent"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <article className="min-w-0 max-w-3xl lg:col-span-9">
            {policy.reviewNote && (
              <p
                role="note"
                className="mb-8 border border-[#FAAE39]/60 bg-[#FFF8EC] px-4 py-3 text-sm leading-relaxed text-[#5C3B00]"
              >
                <strong className="font-semibold">Review pending: </strong>
                {policy.reviewNote}
              </p>
            )}

            {policy.intro.map((text) => (
              <p key={text} className="mt-4 text-base leading-relaxed text-[#233C47] first:mt-0">
                {text}
              </p>
            ))}

            {policy.sections.map((section) => (
              <section key={section.heading} className="mt-10 border-t border-[#E3EBEF] pt-8">
                <h2 className="font-display text-2xl font-medium tracking-[-0.025em] text-[#001720]">
                  {section.heading}
                </h2>
                {section.blocks.map((block, idx) => (
                  <Block key={idx} block={block} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
