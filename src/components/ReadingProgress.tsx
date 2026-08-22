"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  readTime?: string;
}

export default function ReadingProgress({ readTime }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalMinutes = readTime ? parseInt(readTime) : 0;
  const minutesLeft = Math.max(0, Math.ceil(totalMinutes * (1 - progress / 100)));

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-[3px]">
        <div
          className="h-full bg-[#1A1A1A] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {totalMinutes > 0 && progress > 5 && progress < 98 && (
        <div className="absolute right-4 top-[6px] bg-[#1A1A1A] text-white text-[11px] px-2 py-0.5 rounded-sm">
          {minutesLeft} min left
        </div>
      )}
    </div>
  );
}
