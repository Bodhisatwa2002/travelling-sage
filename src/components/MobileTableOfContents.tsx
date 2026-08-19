"use client";

import { useState, useEffect } from "react";
import { ChevronDown, List } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: "h2" | "h3";
}

interface MobileTableOfContentsProps {
  items: TocItem[];
}

export default function MobileTableOfContents({ items }: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(item.id);
          }
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  if (items.length === 0) return null;

  const h2Items = items.filter((item) => item.level === "h2");

  return (
    <div className="border border-[#E5E5E5] rounded-xl bg-[#FAFAFA] overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3.5"
      >
        <div className="flex items-center gap-2.5">
          <List size={18} className="text-[#1A1A1A]" />
          <span className="font-[family-name:var(--font-moret)] text-[17px] font-bold text-[#1A1A1A]">
            In this article
          </span>
          <span className="text-xs text-[#888888] font-medium">
            {h2Items.length} sections
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-[#555555] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable list */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4">
          <div className="h-px bg-[#E5E5E5] mb-3" />
          <ul className="space-y-0.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      setActiveId(item.id);
                      setIsOpen(false);
                    }
                  }}
                  className={`block py-2 text-[14px] leading-[1.4] transition-colors duration-200 border-l-2 ${
                    item.level === "h3" ? "pl-5" : "pl-3"
                  } ${
                    activeId === item.id
                      ? "border-[#1A1A1A] text-[#1A1A1A] font-semibold"
                      : "border-transparent text-[#666666] hover:text-[#1A1A1A]"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
