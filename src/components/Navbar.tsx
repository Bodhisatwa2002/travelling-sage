"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header>
      <div className="bg-[#1A1A1A] h-1" />
      <nav className="max-w-360 mx-auto w-full px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-anton)] text-2xl font-black tracking-tight"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-8">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center gap-2 text-[13px] font-medium tracking-wide hover:opacity-70 transition-opacity"
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                )}
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-2 text-[#555555]">
            <Search size={16} />
            <span className="text-[13px]">Search</span>
          </div>

          <Link
            href="/blogs"
            className="bg-[#1A1A1A] text-white px-5 py-2 flex items-center gap-2 text-[13px] font-semibold tracking-wide hover:bg-[#333] transition-colors"
          >
            SUBSCRIBE
            <Mail size={14} />
          </Link>
        </div>
      </nav>

      <div className="max-w-360 mx-auto px-8 flex items-center gap-3">
        <div className="w-2 h-2 border border-[#1A1A1A] rotate-45" />
        <div className="flex-1 h-px bg-[#1A1A1A]" />
        <div className="w-2 h-2 border border-[#1A1A1A] rotate-45" />
      </div>
    </header>
  );
}
