"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 8, y: -6 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rawDx = (e.clientX - centerX) / (rect.width / 2);
    const rawDy = (e.clientY - centerY) / (rect.height / 2);

    // Clamp so shadow never moves beyond maxShift regardless of cursor position
    const clamp = (v: number, min: number, max: number) =>
      Math.min(Math.max(v, min), max);
    const dx = clamp(rawDx, -1, 1);
    const dy = clamp(rawDy, -1, 1);

    const maxShift = 12;
    setOffset({
      x: dx * maxShift,
      y: dy * maxShift,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const textClasses =
    "font-[family-name:var(--font-anton)] text-[48px] sm:text-[80px] md:text-[140px] lg:text-[200px] xl:text-[230px] leading-none text-center tracking-tight select-none whitespace-nowrap";

  return (
    <div
      ref={containerRef}
      className="max-w-360 mx-auto px-4 md:px-8 py-4 md:py-6 relative"
    >
      {/* Shadow text — solid gray, no blur, follows cursor */}
      <p
        className={`${textClasses} text-[#C0C0C0] absolute inset-0 flex items-center justify-center pointer-events-none`}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.12s ease-out",
        }}
        aria-hidden="true"
      >
        Traveling Sage
      </p>

      {/* Main text */}
      <p className={`${textClasses} text-[#1A1A1A] relative z-10`}>
        Traveling Sage
      </p>
    </div>
  );
}
