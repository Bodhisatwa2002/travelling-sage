"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Mail, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import type { Region, Destination } from "@/types";
import SearchModal from "@/components/SearchModal";

interface NavbarProps {
  regions: Region[];
  destinations: Destination[];
}

export default function Navbar({ regions, destinations }: NavbarProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function getDestinationsByRegion(regionSlug: string) {
    return destinations.filter((d) => d.region === regionSlug);
  }

  return (
    <header>
      <div className="bg-[#1A1A1A] h-1" />
      <nav className="max-w-360 mx-auto w-full px-4 md:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-anton)] text-2xl font-black tracking-tight"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.label === "DESTINATIONS") {
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="relative flex items-center gap-2 text-[13px] font-medium tracking-wide hover:opacity-70 transition-opacity"
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                    )}
                    {link.label}
                  </Link>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white border border-[#E0E0E0] shadow-lg min-w-[200px]">
                      {/* India header */}
                      <div className="group/india relative">
                        <Link
                          href="/destinations"
                          className="block px-5 py-3 text-[13px] font-semibold tracking-wide text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors border-b border-[#E0E0E0]"
                        >
                          INDIA
                        </Link>

                        {/* Region submenu */}
                        <div className="absolute left-full top-0 pl-1 opacity-0 invisible group-hover/india:opacity-100 group-hover/india:visible transition-all duration-200">
                          <div className="bg-white border border-[#E0E0E0] shadow-lg min-w-[180px]">
                            {regions.map((region) => {
                              const regionDestinations = getDestinationsByRegion(region.slug);
                              return (
                                <div key={region.slug} className="group/region relative">
                                  <Link
                                    href={`/destinations/${region.slug}`}
                                    className="block px-5 py-2.5 text-[12px] font-medium tracking-wide text-[#555555] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                                  >
                                    {region.name}
                                  </Link>

                                  {/* Destination submenu */}
                                  <div className="absolute left-full top-0 pl-1 opacity-0 invisible group-hover/region:opacity-100 group-hover/region:visible transition-all duration-200">
                                    <div className="bg-white border border-[#E0E0E0] shadow-lg min-w-[180px]">
                                      {regionDestinations.map((dest) => (
                                        <Link
                                          key={dest.slug}
                                          href={`/destinations/${region.slug}/${dest.slug}`}
                                          className="block px-5 py-2.5 text-[12px] text-[#555555] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                                        >
                                          {dest.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

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

          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-[#555555] hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <Search size={16} />
            <span className="text-[13px]">Search</span>
            <kbd className="hidden sm:inline text-[10px] text-[#AAAAAA] border border-[#CCCCCC] px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>

          <Link
            href="/blogs"
            className="bg-[#1A1A1A] text-white px-5 py-2 flex items-center gap-2 text-[13px] font-semibold tracking-wide hover:bg-[#333] transition-colors"
          >
            SUBSCRIBE
            <Mail size={14} />
          </Link>
        </div>

        {/* Mobile Nav Icons */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-[#555555] hover:text-[#1A1A1A] transition-colors"
          >
            <Search size={20} />
          </button>
          <Link href="/blogs" className="p-2 text-[#1A1A1A]">
            <Mail size={20} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-[#1A1A1A] text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className="max-w-360 mx-auto px-4 md:px-8 flex items-center gap-3">
        <div className="w-2 h-2 border border-[#1A1A1A] rotate-45" />
        <div className="flex-1 h-px bg-[#1A1A1A]" />
        <div className="w-2 h-2 border border-[#1A1A1A] rotate-45" />
      </div>

      {/* Mobile Menu - overlays content, drops below the line */}
      <div className="relative md:hidden">
        <div
          className={`absolute top-1 left-4 right-4 z-50 bg-white border border-[#E0E0E0] rounded-lg shadow-lg px-5 py-4 space-y-1 transition-all duration-300 ease-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 py-2 text-[15px] font-medium tracking-wide"
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
