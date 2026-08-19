"use client";

import { useTocObserver } from "@/hooks/useTocObserver";
import type { TocItem } from "@/hooks/useTocObserver";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const { activeId, setActiveId } = useTocObserver(items);

  if (items.length === 0) return null;

  return (
    <nav className="space-y-1">
      <h3 className="font-[family-name:var(--font-moret)] text-lg font-bold mb-3">
        In this article
      </h3>
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
                }
              }}
              className={`block py-1.5 text-[13px] leading-[1.4] transition-colors duration-200 border-l-2 ${
                item.level === "h3" ? "pl-5" : "pl-3"
              } ${
                activeId === item.id
                  ? "border-[#1A1A1A] text-[#1A1A1A] font-semibold"
                  : "border-transparent text-[#555555] hover:text-[#1A1A1A] hover:border-[#CCCCCC]"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
