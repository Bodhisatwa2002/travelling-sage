"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, LogOut } from "lucide-react";
import { siteConfig } from "@/data/site";
import type { Region, Destination } from "@/types";
import SearchModal from "@/components/SearchModal";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface NavbarProps {
  regions: Region[];
  destinations: Destination[];
  user?: SupabaseUser | null;
  isAdmin?: boolean;
}

export default function Navbar({ regions, destinations, user, isAdmin }: NavbarProps) {
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
      <nav className="max-w-360 mx-auto w-full px-4 md:px-8 py-4 flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto]">
        {/* Logo — left */}
        <Link
          href="/"
          className="font-[family-name:var(--font-anton)] text-2xl font-black tracking-tight"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop Nav — center */}
        <div className="hidden md:flex items-center justify-center gap-8">
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
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white border border-[#E0E0E0] shadow-lg min-w-[200px]">
                      <div className="group/india relative">
                        <Link
                          href="/destinations"
                          className="block px-5 py-3 text-[13px] font-semibold tracking-wide text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors border-b border-[#E0E0E0]"
                        >
                          INDIA
                        </Link>

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
        </div>

        {/* Desktop right — search + auth */}
        <div className="hidden md:flex items-center justify-end gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#CCCCCC] bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#999] hover:text-[#555] transition-colors cursor-pointer min-w-[180px]"
          >
            <Search size={16} />
            <span className="text-[13px] flex-1 text-left">Search...</span>
            <kbd className="text-[10px] text-[#AAAAAA] border border-[#CCCCCC] bg-white px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>

          {user ? (
            <div className="relative group/user">
              <Link
                href="/profile"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1A1A] text-white text-[13px] font-semibold uppercase hover:bg-[#333] transition-colors"
              >
                {(user.user_metadata?.display_name || user.email || "U").charAt(0)}
              </Link>
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-200 z-50">
                <div className="bg-white border border-[#E0E0E0] shadow-lg min-w-[160px] rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#E0E0E0]">
                    <p className="text-[12px] font-medium truncate">
                      {user.user_metadata?.display_name || user.email?.split("@")[0]}
                    </p>
                    <p className="text-[11px] text-[#999] truncate">{user.email}</p>
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-[12px] font-medium hover:bg-[#F5F5F5] transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-[12px] hover:bg-[#F5F5F5] transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={async () => {
                      const supabase = createClient();
                      await supabase.auth.signOut();
                      window.location.href = "/";
                    }}
                    className="w-full text-left px-4 py-2 text-[12px] text-red-600 hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-[#1A1A1A] text-white px-5 py-2 text-[13px] font-semibold tracking-wide hover:bg-[#333] transition-colors"
            >
              LOGIN
            </Link>
          )}
        </div>

        {/* Mobile Nav Icons */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-[#555555] hover:text-[#1A1A1A] transition-colors"
          >
            <Search size={20} />
          </button>
          {user ? (
            <Link
              href="/profile"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1A1A] text-white text-[13px] font-semibold uppercase"
            >
              {(user.user_metadata?.display_name || user.email || "U").charAt(0)}
            </Link>
          ) : (
            <Link
              href="/login"
              className="p-2 text-[13px] font-semibold text-[#1A1A1A]"
            >
              LOGIN
            </Link>
          )}
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
          <div className="border-t border-[#E0E0E0] pt-2 mt-1">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 py-2 text-[15px] font-medium tracking-wide"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1A1A1A] text-white text-[12px] font-semibold uppercase">
                    {(user.user_metadata?.display_name || user.email || "U").charAt(0)}
                  </span>
                  {user.user_metadata?.display_name || user.email?.split("@")[0]}
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 py-2 text-[15px] font-medium tracking-wide"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={async () => {
                    const supabase = createClient();
                    await supabase.auth.signOut();
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-2 py-2 text-[15px] font-medium tracking-wide text-red-600 cursor-pointer"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 py-2 text-[15px] font-semibold tracking-wide"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
