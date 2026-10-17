import Link from "next/link";
import { ArrowLeft, Compass, PhoneCall } from "lucide-react";
import { XNTROVA_BRAND } from "@/data/xntrova-data";

export default function NotFound() {
  return (
    <main className="min-h-screen xn-dark-grid flex items-center justify-center px-4 py-16 text-white">
      <div className="max-w-xl w-full rounded-2xl border border-white/15 bg-[#001720]/90 p-8 sm:p-10 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0075a2]/30 text-[#faae39]">
          <Compass className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#faae39]">
          Error 404 • Page Not Found
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          This URL isn’t part of our growth roadmap
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#a8c5d1]">
          The page you requested could not be found. Return to the Xntrova Technologies homepage to explore our SEO, Paid Media, E-Commerce, and Website Development services.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#faae39] px-5 py-3 text-sm font-semibold text-[#001720] transition hover:bg-[#ffa600]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Homepage
          </Link>
          <a
            href={XNTROVA_BRAND.phoneHref}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <PhoneCall className="h-4 w-4 text-[#faae39]" aria-hidden="true" />
            {XNTROVA_BRAND.phoneDisplay}
          </a>
        </div>
      </div>
    </main>
  );
}
