"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-Linked Progressive Text Reveal (Section 10)
 * - Gradually brings words from muted opacity (0.18) into full contrast (1.0)
 *   tied directly and reversibly to scroll progress through the viewport.
 * - Uses IntersectionObserver to activate the passive rAF scroll listener only
 *   while visible.
 * - Respects `prefers-reduced-motion: reduce` (renders full contrast immediately).
 * - Zero layout shift; accessible as normal text to screen readers and crawlers.
 */
export default function ScrollTextReveal({
  text,
  as: Tag = "p",
  className = "",
  accentWords = [],
  accentClassName = "text-[#0075A2]",
  startViewportRatio = 0.88,
  endViewportRatio = 0.32,
}) {
  const containerRef = useRef(null);
  const wordSpanRefs = useRef([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  const words = String(text || "")
    .trim()
    .split(/\s+/);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    let isIntersecting = false;
    let rafId = null;

    const updateWords = () => {
      rafId = null;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const startY = vh * startViewportRatio;
      const endY = vh * endViewportRatio;
      const totalTravel = Math.max(1, startY - endY + rect.height * 0.45);
      const rawProgress = (startY - rect.top) / totalTravel;
      const progress = Math.min(1, Math.max(0, rawProgress));

      const totalWords = wordSpanRefs.current.length || 1;
      for (let i = 0; i < totalWords; i++) {
        const span = wordSpanRefs.current[i];
        if (!span) continue;
        const wordStart = (i / totalWords) * 0.78;
        const wordEnd = wordStart + 0.22;
        const local = Math.min(
          1,
          Math.max(0, (progress - wordStart) / (wordEnd - wordStart))
        );
        const opacity = 0.18 + local * 0.82;
        span.style.opacity = opacity.toFixed(3);
      }
    };

    const onScroll = () => {
      if (!isIntersecting) return;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateWords);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (entry.isIntersecting) {
            updateWords();
          }
        });
      },
      { rootMargin: "120px 0px 120px 0px", threshold: 0 }
    );

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [startViewportRatio, endViewportRatio, words.length]);

  const normalizedAccents = new Set(
    accentWords.map((w) => w.toLowerCase().replace(/[^a-z0-9+%]/gi, ""))
  );

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, idx) => {
        const clean = word.toLowerCase().replace(/[^a-z0-9+%]/gi, "");
        const isAccent = normalizedAccents.has(clean);
        return (
          <span key={`${word}-${idx}`}>
            <span
              ref={(node) => {
                wordSpanRefs.current[idx] = node;
              }}
              style={reducedMotion ? { opacity: 1 } : undefined}
              className={`inline-block transition-opacity duration-75 ${
                isAccent ? accentClassName : ""
              }`}
            >
              {word}
            </span>
            {idx < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
