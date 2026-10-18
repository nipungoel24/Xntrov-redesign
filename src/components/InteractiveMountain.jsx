"use client";

import { useEffect, useRef } from "react";

/**
 * InteractiveMountain
 *
 * Atmospheric, pointer-responsive mountain drawn on a canvas covering the hero
 * (after the misty mountain hero on tresmarescapital.com, in Xntrova's navy).
 *
 * Look: aerial perspective (distant ridges lighter and bluer, near ridges
 * darker), drifting mist between layers, a light-catching face under the peak,
 * soft crest lines, and a base that dissolves into cloud instead of ending in
 * a solid slab. On load the range rises gently into place.
 *
 * Text-aware height: copy marked `data-mountain-avoid` is measured (glyph
 * extents horizontally, the element's own box vertically, plus any
 * `data-mountain-slack` in em for copy that moves sideways) and the terrain is
 * scaled to the tallest size that stays clear of it, including pointer
 * parallax. Re-measured on resize, font load, copy reflow and when entrance
 * animations finish.
 *
 * Interaction: eased per-layer pointer parallax, slow resting drift, ease-back
 * on pointer leave, paused off-screen, static under prefers-reduced-motion,
 * and no pointer response on touch-width screens.
 */

// Ridge shapes as [x, y] fractions of the canvas at full scale (y = 1 is the
// bottom edge). The tallest peaks sit centre-right, under the review badge.
// The left foothills climb early so the range meets the headline area rather
// than leaving an empty band beneath it.
const DISTANT = [
  [-0.05, 0.74], [0.16, 0.68], [0.34, 0.64], [0.52, 0.6], [0.67, 0.36],
  [0.79, 0.46], [0.9, 0.64], [1.05, 0.82],
];
const MID = [
  [-0.05, 0.8], [0.18, 0.74], [0.36, 0.7], [0.54, 0.65], [0.7, 0.42],
  [0.8, 0.54], [0.9, 0.7], [0.98, 0.78], [1.05, 0.84],
];
const FOREGROUND = [
  [-0.05, 0.88], [0.18, 0.82], [0.38, 0.77], [0.56, 0.71], [0.72, 0.46],
  [0.82, 0.58], [0.92, 0.74], [1.05, 0.86],
];

// Soft mist banks: centre (fx, fy at full scale), radii (fraction of width),
// opacity, drift amplitude (fraction of width) and phase.
const MIST_BACK = [
  { fx: 0.18, fy: 0.84, rx: 0.34, ry: 0.07, a: 0.16, drift: 0.04, phase: 0 },
  { fx: 0.58, fy: 0.72, rx: 0.3, ry: 0.06, a: 0.12, drift: 0.05, phase: 2.1 },
  { fx: 0.9, fy: 0.76, rx: 0.28, ry: 0.07, a: 0.14, drift: 0.035, phase: 4.2 },
];
const MIST_FRONT = [
  { fx: 0.08, fy: 0.93, rx: 0.36, ry: 0.06, a: 0.14, drift: 0.05, phase: 1.3 },
  { fx: 0.46, fy: 0.9, rx: 0.32, ry: 0.05, a: 0.1, drift: 0.04, phase: 3.4 },
  { fx: 0.86, fy: 0.92, rx: 0.34, ry: 0.06, a: 0.12, drift: 0.045, phase: 5.2 },
];

// Maximum per-layer pointer travel (px) — mirrored in the clearance margins.
const MAX_SHIFT_X = 36;
const MAX_SHIFT_Y = 20;
const INTRO_MS = 1800;

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
    let fitScale = 1;
    let scale = 1;
    let introStart = null;

    // Largest terrain scale that keeps every ridge below the measured copy.
    const computeScale = () => {
      const origin = sizeEl.getBoundingClientRect();
      const mobile = width < 768;
      const gap = mobile ? 24 : 36;
      const marginX = MAX_SHIFT_X + 16;
      const obstacles = [...heroEl.querySelectorAll("[data-mountain-avoid]")]
        .map((el) => {
          const box = el.getBoundingClientRect();
          let left = box.left;
          let right = box.right;
          // Copy: horizontal extent of the glyphs only (block-level child
          // spans would otherwise report the full column width). The element
          // box gives the bottom, so entrance transforms don't skew it.
          if (el.dataset.mountainAvoid !== "box") {
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            const range = document.createRange();
            left = Infinity;
            right = -Infinity;
            for (let node = walker.nextNode(); node; node = walker.nextNode()) {
              range.selectNodeContents(node);
              for (const r of range.getClientRects()) {
                if (r.width === 0) continue;
                left = Math.min(left, r.left);
                right = Math.max(right, r.right);
              }
            }
            if (!(right > left)) return null;
          }
          const slackEm = parseFloat(el.dataset.mountainSlack || "0");
          const slack = slackEm * parseFloat(getComputedStyle(el).fontSize);
          return {
            left: left - origin.left - marginX,
            right: right - origin.left + marginX + slack,
            bottom: box.bottom - origin.top + gap + MAX_SHIFT_Y,
          };
        })
        .filter(Boolean);

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
      fitScale = Math.max(0.12, Math.min(1, next));
      scale = fitScale;
    };

    // Fraction → pixel mapping with the current vertical scale applied.
    const X = (fx, shiftX = 0) => fx * width + shiftX;
    const Y = (fy, shiftY = 0) => height - scale * height * (1 - fy) + shiftY;

    const tracePolyline = (points, shiftX, offsetFor) => {
      ctx.lineTo(X(points[0][0], shiftX), Y(points[0][1], offsetFor(0)));
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(X(points[i][0], shiftX), Y(points[i][1], offsetFor(i)));
      }
    };

    function drawMist(banks, t, shiftX, alpha) {
      for (const m of banks) {
        const cx = X(m.fx, shiftX) + Math.sin(t * 0.00008 + m.phase) * m.drift * width;
        const cy = Y(m.fy);
        const rx = m.rx * width;
        const ry = Math.max(m.ry * height * scale, 24);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, ry / rx);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        g.addColorStop(0, `rgba(150, 210, 228, ${(m.a * alpha).toFixed(3)})`);
        g.addColorStop(0.55, `rgba(110, 180, 205, ${(m.a * alpha * 0.45).toFixed(3)})`);
        g.addColorStop(1, "rgba(90, 160, 190, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(-rx, -rx, rx * 2, rx * 2);
        ctx.restore();
      }
    }

    // Soft light behind the summit, as if the range is backlit by the sky.
    function drawSkyGlow(shiftX) {
      const cx = X(0.69, shiftX * 0.3);
      const cy = Y(0.4);
      const r = Math.max(width, height) * 0.38;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, "rgba(64, 196, 230, 0.16)");
      g.addColorStop(0.45, "rgba(0, 117, 162, 0.07)");
      g.addColorStop(1, "rgba(0, 117, 162, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    }

    // LAYER 1: distant range — lightest, bluest, softest (aerial perspective)
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
      grad.addColorStop(0, "rgba(22, 96, 124, 0.62)");
      grad.addColorStop(0.45, "rgba(10, 62, 84, 0.78)");
      grad.addColorStop(1, "rgba(6, 40, 56, 0.9)");
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = "rgba(150, 220, 240, 0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // LAYER 2: mid-ground ridge with faint topographic striations
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
      midGrad.addColorStop(0, "#0A3A50");
      midGrad.addColorStop(0.5, "#05263A");
      midGrad.addColorStop(1, "#041F2E");
      ctx.fillStyle = midGrad;
      ctx.fill();

      // Contours are clipped to the ridge so they never draw into the sky.
      ctx.save();
      ctx.clip();
      for (let rib = 0; rib < 5; rib++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(120, 200, 225, ${Math.max(0.04, 0.12 - rib * 0.018).toFixed(3)})`;
        ctx.lineWidth = 1;
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
      ctx.strokeStyle = "rgba(34, 211, 238, 0.32)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    }

    // LAYER 3: foreground mass with a lit face, amber spine and soft crest
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
      fgGrad.addColorStop(0, "#03151F");
      fgGrad.addColorStop(0.45, "#021019");
      fgGrad.addColorStop(1, "#052B3D");
      ctx.fillStyle = fgGrad;
      ctx.fill();

      ctx.save();
      ctx.clip();

      const peakX = X(0.72, shiftX);
      const peakY = Y(0.46, offsetFor(4));
      const spineEnd = [X(0.56, shiftX) - px * 10, Y(0.8)];
      const faceEnd = [X(0.84, shiftX) + px * 12, Y(0.92)];

      // Light-catching face under the peak (light from the upper right)
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(spineEnd[0], spineEnd[1]);
      ctx.lineTo(faceEnd[0], faceEnd[1]);
      ctx.lineTo(X(0.82, shiftX), Y(0.58, offsetFor(5)));
      ctx.closePath();
      const lit = ctx.createLinearGradient(peakX, peakY, faceEnd[0], faceEnd[1]);
      lit.addColorStop(0, "rgba(120, 205, 232, 0.34)");
      lit.addColorStop(0.35, "rgba(40, 130, 165, 0.16)");
      lit.addColorStop(1, "rgba(3, 21, 31, 0)");
      ctx.fillStyle = lit;
      ctx.fill();

      // Snow-touched summit highlight
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(peakX - (peakX - spineEnd[0]) * 0.16, peakY + (spineEnd[1] - peakY) * 0.16);
      ctx.lineTo(peakX + (X(0.82, shiftX) - peakX) * 0.22, peakY + (Y(0.58) - peakY) * 0.3);
      ctx.closePath();
      ctx.fillStyle = "rgba(210, 240, 250, 0.16)";
      ctx.fill();

      // Warm amber spine (echoes the headline amber)
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(spineEnd[0], spineEnd[1]);
      const spine = ctx.createLinearGradient(peakX, peakY, spineEnd[0], spineEnd[1]);
      spine.addColorStop(0, "rgba(250, 174, 57, 0.75)");
      spine.addColorStop(1, "rgba(250, 174, 57, 0)");
      ctx.strokeStyle = spine;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Faint topographic contours across the face
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
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.07 - i * 0.011).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // Soft crest line: bright near the summit, fading toward the flanks
      ctx.beginPath();
      ctx.moveTo(X(FOREGROUND[0][0], shiftX), Y(FOREGROUND[0][1], offsetFor(0)));
      tracePolyline(FOREGROUND, shiftX, offsetFor);
      const crest = ctx.createLinearGradient(0, 0, width, 0);
      crest.addColorStop(0, "rgba(34, 211, 238, 0.12)");
      crest.addColorStop(0.62, "rgba(34, 211, 238, 0.55)");
      crest.addColorStop(0.72, "rgba(160, 235, 248, 0.75)");
      crest.addColorStop(0.86, "rgba(34, 211, 238, 0.4)");
      crest.addColorStop(1, "rgba(34, 211, 238, 0.12)");
      ctx.strokeStyle = crest;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();
    }

    // Base cloud: the foot of the range dissolves into mist and the horizon.
    function drawBaseCloud() {
      const top = height - Math.max(height * 0.2, 90);
      const g = ctx.createLinearGradient(0, top, 0, height);
      g.addColorStop(0, "rgba(8, 52, 72, 0)");
      g.addColorStop(0.55, "rgba(14, 70, 92, 0.38)");
      g.addColorStop(1, "rgba(6, 44, 62, 0.92)");
      ctx.fillStyle = g;
      ctx.fillRect(0, top, width, height - top);
    }

    function drawFrame(px, py, t) {
      // Entrance: the range rises into place and the mist fades in.
      let intro = 1;
      if (!reducedMotion) {
        if (introStart === null) introStart = t;
        const p = Math.min(1, (t - introStart) / INTRO_MS);
        intro = 1 - Math.pow(1 - p, 3);
      }
      scale = fitScale * (0.72 + 0.28 * intro);

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.4 + 0.6 * intro;
      drawSkyGlow(px * MAX_SHIFT_X);
      drawDistantPeaks(px, py, t);
      drawMist(MIST_BACK, t, px * 18, intro);
      drawMidRidge(px, py, t);
      drawForegroundMountain(px, py, t);
      drawMist(MIST_FRONT, t, px * 40, intro);
      drawBaseCloud();
      ctx.globalAlpha = 1;
    }

    let lastT = 0;
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
      drawFrame(stateRef.current.pointerX, stateRef.current.pointerY, lastT);
    };

    let pendingMeasure = null;
    const scheduleResize = () => {
      if (pendingMeasure !== null) return;
      pendingMeasure = requestAnimationFrame(() => {
        pendingMeasure = null;
        resize();
      });
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
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleResize) : null;
    resizeObserver?.observe(sizeEl);
    // Re-measure whenever the copy itself reflows (font swap, wrapping changes)
    // even if the hero's own size stays the same.
    heroEl
      .querySelectorAll("[data-mountain-avoid]")
      .forEach((el) => resizeObserver?.observe(el));
    // Copy reflows when the web fonts finish loading; re-measure then.
    document.fonts?.ready.then(scheduleResize).catch(() => {});
    // Entrance animations move copy; re-measure once they settle.
    heroEl.addEventListener("animationend", scheduleResize);

    heroEl.addEventListener("pointermove", onPointerMove, { passive: true });
    heroEl.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const loop = (timestamp) => {
      animFrameRef.current = requestAnimationFrame(loop);
      lastT = timestamp;

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
      heroEl.removeEventListener("animationend", scheduleResize);
      heroEl.removeEventListener("pointermove", onPointerMove);
      heroEl.removeEventListener("pointerleave", onPointerLeave);
      if (pendingMeasure !== null) cancelAnimationFrame(pendingMeasure);
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
