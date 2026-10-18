"use client";

import { useEffect, useRef } from "react";

/**
 * InteractiveMountain Component
 * 
 * Inspired by the mountain visual interaction on Tresmares Capital (https://www.tresmarescapital.com/en/):
 * - Dark, nearly black atmospheric mountain silhouette with sculpted geological ridges and depth contours.
 * - Sits in the negative space of the hero, contrasting against the blue/teal gradient canvas.
 * - Fluid pointer-responsive deformation and multi-layer parallax with smooth spring damping.
 * - Subtle harmonic resting breathing state when pointer stops.
 * - Graceful ease-back to baseline on pointer leave.
 * - Accessible: respects prefers-reduced-motion and simplifies on touch devices.
 */
export default function InteractiveMountain({ className = "" }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const stateRef = useRef({
    pointerX: 0,
    pointerY: 0,
    targetX: 0,
    targetY: 0,
    isHovered: false,
    time: 0,
    isVisible: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;

    const resize = () => {
      const hero = canvas.closest(".hero-stage") || canvas.closest("section") || canvas.parentElement;
      const rect = hero ? hero.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width || window.innerWidth, 320);
      height = Math.max(rect.height || window.innerHeight, 500);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      drawStatic();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const heroEl = canvas.closest(".hero-stage") || canvas.closest("section") || canvas.parentElement;

    const onPointerMove = (e) => {
      if (reducedMotion || window.innerWidth < 768) return;
      const rect = heroEl.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      stateRef.current.targetX = Math.max(-1, Math.min(1, normX));
      stateRef.current.targetY = Math.max(-1, Math.min(1, normY));
      stateRef.current.isHovered = true;
    };

    const onPointerLeave = () => {
      stateRef.current.targetX = 0;
      stateRef.current.targetY = 0;
      stateRef.current.isHovered = false;
    };

    if (heroEl) {
      heroEl.addEventListener("pointermove", onPointerMove, { passive: true });
      heroEl.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }

    // ========================================================
    // LAYER 1: Distant Misty Peaks (Deep Indigo-Black with Cyan Crests)
    // ========================================================
    // ========================================================
    // LAYER 1: Distant Misty Peaks (Deep Indigo-Black with Cyan Crests)
    // ========================================================
    function drawDistantPeaks(px, py, t) {
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const mOffset = isMobile ? height * 0.14 : isTablet ? height * 0.10 : 0;
      const shiftX = px * 14;
      const shiftY = py * 8;
      const breathe = Math.sin(t * 0.001) * 3;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-40 + shiftX, height);

      // Crest points spanning across hero width: broad ascent left, tall peak center-right, steep descent right
      const pts = [
        { x: -0.05, y: height * 0.90 + mOffset * 0.5 },
        { x: 0.16, y: height * 0.85 + shiftY * 0.25 + mOffset * 0.6 },
        { x: 0.34, y: height * 0.78 + shiftY * 0.35 + breathe + mOffset * 0.7 },
        { x: 0.52, y: height * 0.70 + shiftY * 0.4 + mOffset * 0.8 },
        { x: 0.68, y: height * 0.58 + shiftY * 0.4 + mOffset }, // Tall distant crest peak soaring into sky
        { x: 0.80, y: height * 0.67 + shiftY * 0.35 + mOffset * 0.85 },
        { x: 0.90, y: height * 0.80 + shiftY * 0.5 - breathe + mOffset * 0.9 },
        { x: 1.05, y: height * 0.90 + mOffset * 0.6 },
      ];

      ctx.lineTo(pts[0].x * width + shiftX, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const cur = pts[i];
        const midX = ((prev.x + cur.x) / 2) * width + shiftX;
        const midY = (prev.y + cur.y) / 2;
        ctx.quadraticCurveTo(prev.x * width + shiftX, prev.y, midX, midY);
      }
      ctx.lineTo(width + 40 + shiftX, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, height * 0.58 + mOffset, 0, height);
      grad.addColorStop(0, "rgba(2, 22, 32, 0.88)");
      grad.addColorStop(0.45, "rgba(0, 14, 22, 0.96)");
      grad.addColorStop(1, "rgba(0, 8, 14, 0.99)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Atmospheric cyan rim light
      ctx.strokeStyle = "rgba(0, 140, 186, 0.55)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
    }

    // ========================================================
    // LAYER 2: Mid-ground Craggy Ridge with Topographic Striations
    // ========================================================
    function drawMidRidge(px, py, t) {
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const mOffset = isMobile ? height * 0.14 : isTablet ? height * 0.10 : 0;
      const shiftX = px * 24;
      const shiftY = py * 14;
      const sway = Math.cos(t * 0.0012) * 4;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-30 + shiftX, height);

      const pts = [
        { x: -0.05, y: height * 0.92 + mOffset * 0.5 },
        { x: 0.18, y: height * 0.87 + shiftY * 0.3 + mOffset * 0.6 },
        { x: 0.36, y: height * 0.80 + shiftY * 0.5 + sway + mOffset * 0.75 },
        { x: 0.54, y: height * 0.72 + shiftY * 0.4 + mOffset * 0.8 },
        { x: 0.70, y: height * 0.60 + shiftY * 0.6 + mOffset }, // Tall mid peak
        { x: 0.80, y: height * 0.70 + shiftY * 0.5 + mOffset * 0.85 },
        { x: 0.90, y: height * 0.82 + shiftY * 0.6 + sway + mOffset * 0.9 },
        { x: 0.98, y: height * 0.88 + mOffset * 0.7 },
        { x: 1.05, y: height * 0.92 + mOffset * 0.6 },
      ];

      ctx.lineTo(pts[0].x * width + shiftX, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x * width + shiftX, pts[i].y);
      }
      ctx.lineTo(width + 30 + shiftX, height);
      ctx.closePath();

      const midGrad = ctx.createLinearGradient(0, height * 0.60 + mOffset, 0, height);
      midGrad.addColorStop(0, "#01141E");
      midGrad.addColorStop(0.35, "#000B12");
      midGrad.addColorStop(1, "#000508");
      ctx.fillStyle = midGrad;
      ctx.fill();

      // Topographic Contour Curves across Ridge
      for (let rib = 0; rib < 5; rib++) {
        const ribYOffset = rib * 20;
        const ribAlpha = (0.24 - rib * 0.035).toFixed(3);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(14, 148, 184, ${Math.max(0.06, ribAlpha)})`;
        ctx.lineWidth = 1.1;
        const startX = (0.36 + rib * 0.05) * width + shiftX;
        const startY = height * 0.66 + ribYOffset + shiftY * 0.5 + mOffset;
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(
          (0.64 + rib * 0.03) * width + shiftX + px * 12,
          startY + 16 + py * 6,
          (0.88 + rib * 0.02) * width + shiftX,
          startY + 40
        );
        ctx.stroke();
      }

      // Crisp teal crest rim highlight
      ctx.strokeStyle = "rgba(34, 211, 238, 0.60)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();
    }

    // ========================================================
    // LAYER 3: Foreground Sculpted Mountain Mass & Facets (Dominant Spatial Feature)
    // ========================================================
    function drawForegroundMountain(px, py, t) {
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const mOffset = isMobile ? height * 0.14 : isTablet ? height * 0.10 : 0;
      const shiftX = px * 36;
      const shiftY = py * 20;
      const pulse = Math.sin(t * 0.0016) * 3;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-20 + shiftX, height);

      // Desired hand-drawn sketch silhouette (Tall, towering peak at center-right):
      // 1. Low starting point near left edge (0.94)
      // 2. Broad sweeping ascent across hero (0.89 -> 0.82 -> 0.74)
      // 3. Towering majestic peak at center-right (0.62)
      // 4. Steeper descent toward right side (0.72 -> 0.84 -> 0.92)
      const fgPts = [
        { x: -0.05, y: height * 0.94 + mOffset * 0.4 },
        { x: 0.18, y: height * 0.89 + shiftY * 0.4 + mOffset * 0.5 },
        { x: 0.38, y: height * 0.82 + shiftY * 0.55 + mOffset * 0.65 },
        { x: 0.56, y: height * 0.74 + shiftY * 0.65 + pulse + mOffset * 0.8 },
        { x: 0.72, y: height * 0.62 + shiftY * 0.8 + mOffset }, // Center-right tall towering peak
        { x: 0.82, y: height * 0.72 + shiftY * 0.6 + mOffset * 0.85 }, // Steeper descent
        { x: 0.92, y: height * 0.84 + shiftY * 0.7 + pulse + mOffset * 0.9 },
        { x: 1.05, y: height * 0.92 + mOffset * 0.6 },
      ];

      ctx.lineTo(fgPts[0].x * width + shiftX, fgPts[0].y);
      for (let i = 1; i < fgPts.length; i++) {
        ctx.lineTo(fgPts[i].x * width + shiftX, fgPts[i].y);
      }
      ctx.lineTo(width + 20 + shiftX, height);
      ctx.closePath();

      // Deepest black bedrock foundation
      const fgGrad = ctx.createLinearGradient(0, height * 0.62 + mOffset, 0, height);
      fgGrad.addColorStop(0, "#010A0F");
      fgGrad.addColorStop(0.3, "#000407");
      fgGrad.addColorStop(1, "#000203");
      ctx.fillStyle = fgGrad;
      ctx.fill();

      // Large Faceted Chasm / Cleavage Plane under the Peak
      const peakX = 0.72 * width + shiftX;
      const peakY = height * 0.62 + shiftY * 0.8 + mOffset;
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(0.56 * width + shiftX - px * 10, height * 0.84 + mOffset * 0.4);
      ctx.lineTo(0.84 * width + shiftX + px * 12, height * 0.92 + mOffset * 0.2);
      ctx.closePath();

      const facetGrad = ctx.createLinearGradient(peakX, peakY, peakX, height * 0.92);
      facetGrad.addColorStop(0, "rgba(0, 117, 162, 0.45)");
      facetGrad.addColorStop(0.35, "rgba(0, 23, 32, 0.85)");
      facetGrad.addColorStop(1, "rgba(0, 3, 5, 0.98)");
      ctx.fillStyle = facetGrad;
      ctx.fill();

      // Warm Amber Geological Glint on Main Spine Ridge (Harmonizing with headline amber)
      ctx.beginPath();
      ctx.moveTo(peakX, peakY);
      ctx.lineTo(0.56 * width + shiftX - px * 10, height * 0.84 + mOffset * 0.4);
      ctx.strokeStyle = "rgba(250, 174, 57, 0.65)";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Secondary Luminous Topographic Contours on the Face
      for (let i = 0; i < 5; i++) {
        const yPos = height * 0.68 + i * 24 + shiftY * 0.5 + mOffset;
        ctx.beginPath();
        ctx.moveTo(0.44 * width + shiftX + i * 14, yPos);
        ctx.quadraticCurveTo(
          0.68 * width + shiftX + px * 12,
          yPos - 12 + py * 5,
          0.90 * width + shiftX,
          yPos + 24
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.14 - i * 0.022).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Brilliant cyan rim highlight on the leading crag edge
      ctx.beginPath();
      ctx.moveTo(fgPts[0].x * width + shiftX, fgPts[0].y);
      for (let i = 1; i < fgPts.length; i++) {
        ctx.lineTo(fgPts[i].x * width + shiftX, fgPts[i].y);
      }
      ctx.strokeStyle = "rgba(34, 211, 238, 0.82)";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.restore();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      drawDistantPeaks(0, 0, 0);
      drawMidRidge(0, 0, 0);
      drawForegroundMountain(0, 0, 0);
    };

    const loop = (timestamp) => {
      animFrameRef.current = requestAnimationFrame(loop);

      // Skip redrawing if hero is scrolled completely out of view
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }
      }

      stateRef.current.time = timestamp;

      // Spring-damped smooth interpolation
      const ease = 0.045;
      stateRef.current.pointerX +=
        (stateRef.current.targetX - stateRef.current.pointerX) * ease;
      stateRef.current.pointerY +=
        (stateRef.current.targetY - stateRef.current.pointerY) * ease;

      ctx.clearRect(0, 0, width, height);

      drawDistantPeaks(
        stateRef.current.pointerX,
        stateRef.current.pointerY,
        timestamp
      );
      drawMidRidge(
        stateRef.current.pointerX,
        stateRef.current.pointerY,
        timestamp
      );
      drawForegroundMountain(
        stateRef.current.pointerX,
        stateRef.current.pointerY,
        timestamp
      );
    };

    if (!reducedMotion) {
      animFrameRef.current = requestAnimationFrame(loop);
    } else {
      drawStatic();
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (heroEl) {
        heroEl.removeEventListener("pointermove", onPointerMove);
        heroEl.removeEventListener("pointerleave", onPointerLeave);
      }
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
      <canvas
        ref={canvasRef}
        className="block h-full w-full object-cover"
      />
    </div>
  );
}
