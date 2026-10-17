"use client";

import { useEffect, useRef, useState } from "react";

const VARIANT_CLASS_MAP = {
  up: "xn-reveal-pending-up",
  left: "xn-reveal-pending-left",
  right: "xn-reveal-pending-right",
  scale: "xn-reveal-pending-scale",
};

/**
 * Multi-Variant Scroll-Reveal Wrapper
 * Supports directional ("up", "left", "right") and "scale" reveals while
 * keeping content accessible for SSR/SEO and respecting `prefers-reduced-motion: reduce`.
 */
export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  variant = "up",
  as: Component = "div",
  ...rest
}) {
  const ref = useRef(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsPending(false);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.18) {
      setIsPending(false);
      return;
    }

    setIsPending(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPending(false);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px 140px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pendingClass = isPending ? VARIANT_CLASS_MAP[variant] || VARIANT_CLASS_MAP.up : "";

  return (
    <Component
      ref={ref}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`xn-reveal ${pendingClass} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
