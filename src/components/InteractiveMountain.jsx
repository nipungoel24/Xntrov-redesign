"use client";

import { useEffect, useRef } from "react";

/**
 * InteractiveMountain
 *
 * Layered, pointer-responsive mountain drawn on a canvas that covers the hero.
 *
 * Text-aware height: the hero marks its copy with `data-mountain-avoid`. On
 * every resize (and once web fonts settle) the component measures those boxes
 * and computes one vertical scale for the terrain — the largest scale at which
 * every ridge stays below the copy above it, with room left for pointer
 * parallax. The mountain therefore rises as far as the layout allows (toward
 * the review badge on desktop) without ever crossing the text.
 *
 * Interaction: smooth eased pointer parallax per layer, gentle resting motion,
 * ease-back on pointer leave, paused while off-screen, static under
 * prefers-reduced-motion, and no pointer response on touch-width screens.
 */

// Ridge shapes as [x, y] fractions of the canvas at full scale (y = 1 is the
// bottom edge). The tallest peaks sit centre-right, under the review badge.
const DISTANT = [
  [-0.05, 0.9], [0.16, 0.82], [0.34, 0.75], [0.52, 0.66], [0.67, 0.36],
  [0.79, 0.46], [0.9, 0.64], [1.05, 0.82],
];
const MID = [
  [-0.05, 0.92], [0.18, 0.86], [0.36, 0.79], [0.54, 0.7], [0.7, 0.42],
  [0.8, 0.54], [0.9, 0.7], [0.98, 0.78], [1.05, 0.84],
];
const FOREGROUND = [
  [-0.05, 0.95], [0.18, 0.9], [0.38, 0.83], [0.56, 0.74], [0.72, 0.46],
  [0.82, 0.58], [0.92, 0.74], [1.05, 0.86],
];

// Maximum per-layer pointer travel (px) — mirrored in the clearance margins.
const MAX_SHIFT_X = 36;
const MAX_SHIFT_Y = 20;

function samplePolyline(points, width) {
  const samples = [];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const steps = Math.max(2, Math.ceil(((x1 - x0) * width) / 6));
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      samples.push([(x0 + (x1 - x0) * t) * width, y0 + (y1 - y0) * t]);
    }
  }
  return samples;
}

export default function InteractiveMountain({ className = "" }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const stateRef = useRef({
    pointerX: 0,
    pointerY: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const sizeEl = canvas.parentElement;
    const heroEl = canvas.closest(".hero-stage") || sizeEl;

    let width = 0;
    let height = 0;
    let scale = 1;

    // Largest terrain scale that keeps every ridge below the measured copy.
    const computeScale = () => {
      const origin = sizeEl.getBoundingClientRect();
      const mobile = width < 768;
      const gap = mobile ? 24 : 36;
      const marginX = MAX_SHIFT_X + 16;
      const obstacles = [...heroEl.querySelectorAll("[data-mountain-avoid]")]
        .map((el) => {
          let rect = el.getBoundingClientRect();
          // Copy: union of the text glyph boxes only (block-level child spans
          // would otherwise report the full column width). Badges: full box.
          if (el.dataset.mountainAvoid !== "box") {
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            const range = document.createRange();
            let left = Infinity;
            let right = -Infinity;
            let bottom = -Infinity;
            for (let node = walker.nextNode(); node; node = walker.nextNode()) {
              range.selectNodeContents(node);
              for (const r of range.getClientRects()) {
                if (r.width === 0) continue;
                left = Math.min(left, r.left);
                right = Math.max(right, r.right);
                bottom = Math.max(bottom, r.bottom);
              }
            }
            if (right > left) rect = { left, right, bottom };
          }
          return {
            left: rect.left - origin.left - marginX,
            right: rect.right - origin.left + marginX,
            bottom: rect.bottom - origin.top + gap + MAX_SHIFT_Y,
          };
        })
        .filter((r) => r.right > r.left);

      let next = 1;
      for (const shape of [DISTANT, MID, FOREGROUND]) {
        for (const [x, fy] of samplePolyline(shape, width)) {
          const rise = height * (1 - fy);
          if (rise <= 0) continue;
          for (const r of obstacles) {
            if (x < r.left || x > r.right) continue;
            const allowed = (height - r.bottom) / rise;
            if (allowed < next) next = allowed;
          }
        }
      }
      scale = Math.max(0.12, Math.min(1, next));
    };

    // Fraction → pixel mapping with the text-aware vertical scale applied.
    const X = (fx, shiftX) => fx * width + shiftX;
    const Y = (fy, shiftY = 0) => height - scale * height * (1 - fy) + shiftY;

    const tracePolyline = (points, shiftX, offsetFor) => {
      ctx.lineTo(X(points[0][0], shiftX), Y(points[0][1], offsetFor(0)));
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(X(points[i][0], shiftX), Y(points[i][1], offsetFor(i)));
      }
    };

    // LAYER 1: distant misty peaks (soft curves, cyan crest)
    function drawDistantPeaks(px, py, t) {
      const shiftX = px * 14;
      const shiftY = py * 8;
      const breathe = Math.sin(t * 0.001) * 3;
      const offsets = [0, 0.25, 0.35, 0.4, 0.4, 0.35, 0.5, 0].map((k) => shiftY * k);
      offsets[2] += breathe;
      offsets[6] -= breathe;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-40 + shiftX, height);
      ctx.lineTo(X(DISTANT[0][0], shiftX), Y(DISTANT[0][1], offsets[0]));
      for (let i = 1; i < DISTANT.length; i++) {
        const [x0, y0] = DISTANT[i - 1];
        const [x1, y1] = DISTANT[i];
        const midX = X((x0 + x1) / 2, shiftX);
        const midY = (Y(y0, offsets[i - 1]) + Y(y1, offsets[i])) / 2;
        ctx.quadraticCurveTo(X(x0, shiftX), Y(y0, offsets[i - 1]), midX, midY);
      }
      ctx.lineTo(width + 40 + shiftX, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, Y(0.36), 0, height);
      grad.addColorStop(0, "rgba(2, 22, 32, 0.86)");
      grad.addColorStop(0.5, "rgba(0, 16, 25, 0.95)");
      grad.addColorStop(1, "rgba(3, 30, 43, 0.98)");
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = "rgba(0, 140, 186, 0.55)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
    }

    // LAYER 2: mid-ground craggy ridge with topographic striations
    function drawMidRidge(px, py, t) {
      const shiftX = px * 24;
      const shiftY = py * 14;
      const sway = Math.cos(t * 0.0012) * 4;
      const k = [0, 0.3, 0.5, 0.4, 0.6, 0.5, 0.6, 0, 0];
      const offsetFor = (i) => shiftY * k[i] + (i === 2 || i === 6 ? sway : 0);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-30 + shiftX, height);
      tracePolyline(MID, shiftX, offsetFor);
      ctx.lineTo(width + 30 + shiftX, height);
      ctx.closePath();

      const midGrad = ctx.createLinearGradient(0, Y(0.42), 0, height);
      midGrad.addColorStop(0, "#01141E");
      midGrad.addColorStop(0.4, "#000B12");
      midGrad.addColorStop(1, "#03202D");
      ctx.fillStyle = midGrad;
      ctx.fill();

      // Contours are clipped to the ridge so they never draw into the sky.
      ctx.save();
      ctx.clip();
      for (let rib = 0; rib < 5; rib++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(14, 148, 184, ${Math.max(0.06, 0.24 - rib * 0.035).toFixed(3)})`;
        ctx.lineWidth = 1.1;
        const startY = Y(0.52 + rib * 0.045, shiftY * 0.5);
        ctx.moveTo(X(0.36 + rib * 0.05, shiftX), startY);
        ctx.quadraticCurveTo(
          X(0.64 + rib * 0.03, shiftX) + px * 12,
          startY + 16 + py * 6,
          X(0.88 + rib * 0.02, shiftX),
          startY + 40
        );
        ctx.stroke();
      }
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(X(MID[0][0], shiftX), Y(MID[0][1], offsetFor(0)));
      tracePolyline(MID, shiftX, offsetFor);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.60)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();
    }

    // LAYER 3: foreground sculpted mass, facet, amber glint and cyan rim
    function drawForegroundMountain(px, py, t) {
      const shiftX = px * MAX_SHIFT_X;
      const shiftY = py * MAX_SHIFT_Y;
      const pulse = Math.sin(t * 0.0016) * 3;
      const k = [0, 0.4, 0.55, 0.65, 0.8, 0.6, 0.7, 0];
      const offsetFor = (i) => shiftY * k[i] + (i === 3 || i === 6 ? pulse : 0);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-20 + shiftX, height);
      tracePolyline(FOREGROUND, shiftX, offsetFor);
      ctx.lineTo(width + 20 + shiftX, height);
      ctx.closePath();

      const fgGrad = ctx.createLinearGradient(0, Y(0.46), 0, height);
      fgGrad.addColorStop(0, "#010A0F");
      fgGrad.addColorStop(0.4, "#00080D");
      // The base lifts toward the horizon navy so the foot of the mountain
      // blends into the section below instead of reading as a black slab.
      fgGrad.addColorStop(1, "#052B3D");
      ctx.fillStyle = fgGrad;
      ctx.fill();

      ctx.save();
      ctx.clip();

      // Faceted cleavage plane under the peak
      const peakX = X(0.72, shiftX);
      const peakY = Y(0.46, offsetFor(4));
      const facetLeft = [X(0.56, shiftX) - px * 10, Y(0.8)];
      const facetRight = [X(0.84, shiftX) + px * 12, Y(0.92)];
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(facetLeft[0], facetLeft[1]);
      ctx.lineTo(facetRight[0], facetRight[1]);
      ctx.closePath();
      const facetGrad = ctx.createLinearGradient(peakX, peakY, peakX, facetRight[1]);
      facetGrad.addColorStop(0, "rgba(0, 117, 162, 0.45)");
      facetGrad.addColorStop(0.35, "rgba(0, 23, 32, 0.85)");
      facetGrad.addColorStop(1, "rgba(0, 3, 5, 0.6)");
      ctx.fillStyle = facetGrad;
      ctx.fill();

      // Warm amber glint along the main spine (echoes the headline amber)
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(facetLeft[0], facetLeft[1]);
      ctx.strokeStyle = "rgba(250, 174, 57, 0.65)";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Luminous topographic contours across the face
      for (let i = 0; i < 5; i++) {
        const yPos = Y(0.58 + i * 0.05, shiftY * 0.5);
        ctx.beginPath();
        ctx.moveTo(X(0.44, shiftX) + i * 14, yPos);
        ctx.quadraticCurveTo(
          X(0.68, shiftX) + px * 12,
          yPos - 12 + py * 5,
          X(0.9, shiftX),
          yPos + 24
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.14 - i * 0.022).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // Cyan rim highlight on the leading crest
      ctx.beginPath();
      ctx.moveTo(X(FOREGROUND[0][0], shiftX), Y(FOREGROUND[0][1], offsetFor(0)));
      tracePolyline(FOREGROUND, shiftX, offsetFor);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.82)";
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.restore();
    }

    function drawFrame(px, py, t) {
      ctx.clearRect(0, 0, width, height);
      drawDistantPeaks(px, py, t);
      drawMidRidge(px, py, t);
      drawForegroundMountain(px, py, t);
    }

    const resize = () => {
      const rect = sizeEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width || window.innerWidth, 320);
      height = Math.max(rect.height || 1, 1);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      computeScale();
      drawFrame(stateRef.current.pointerX, stateRef.current.pointerY, 0);
    };

    const onPointerMove = (e) => {
      if (reducedMotion || window.innerWidth < 768) return;
      const rect = heroEl.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      stateRef.current.targetX = Math.max(-1, Math.min(1, normX));
      stateRef.current.targetY = Math.max(-1, Math.min(1, normY));
    };

    const onPointerLeave = () => {
      stateRef.current.targetX = 0;
      stateRef.current.targetY = 0;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(sizeEl);
    // Re-measure whenever the copy itself reflows (font swap, wrapping changes)
    // even if the hero's own size stays the same.
    heroEl
      .querySelectorAll("[data-mountain-avoid]")
      .forEach((el) => resizeObserver?.observe(el));
    // Copy reflows when the web fonts finish loading; re-measure then.
    document.fonts?.ready.then(resize).catch(() => {});

    heroEl.addEventListener("pointermove", onPointerMove, { passive: true });
    heroEl.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const loop = (timestamp) => {
      animFrameRef.current = requestAnimationFrame(loop);

      // Skip redrawing while the hero is scrolled out of view
      const rect = heroEl.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const state = stateRef.current;
      const ease = 0.045;
      state.pointerX += (state.targetX - state.pointerX) * ease;
      state.pointerY += (state.targetY - state.pointerY) * ease;
      drawFrame(state.pointerX, state.pointerY, timestamp);
    };

    if (!reducedMotion) {
      animFrameRef.current = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      resizeObserver?.disconnect();
      heroEl.removeEventListener("pointermove", onPointerMove);
      heroEl.removeEventListener("pointerleave", onPointerLeave);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
