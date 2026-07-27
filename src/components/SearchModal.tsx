"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchResult {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  function handleInputChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => handleSearch(value), 300);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (inputRef.current) inputRef.current.focus();
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-start justify-center pt-[10vh]"
      onClick={onClose}
    >
      <div
        className="bg-[#EBEBEB] w-full max-w-[680px] border-2 border-[#1A1A1A] shadow-2xl rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#CCCCCC]">
          <Search size={20} className="text-[#555555] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search stories, destinations, categories..."
            className="flex-1 bg-transparent text-[16px] text-[#1A1A1A] placeholder:text-[#AAAAAA] outline-none font-[family-name:var(--font-inter)]"
          />
          <button
            onClick={onClose}
            className="text-[#555555] hover:text-[#1A1A1A] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="px-6 py-8 text-center text-[13px] text-[#555555]">
              Searching...
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="px-6 py-8 text-center text-[13px] text-[#555555]">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {!loading && results.length > 0 && (
            <div>
              {results.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[#E0E0E0] transition-colors border-b border-[#E0E0E0] last:border-b-0 group"
                >
                  <div className="relative w-[72px] h-[54px] shrink-0 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:grayscale transition-all duration-500"
                      sizes="72px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-[#555555] mb-1">
                      <span className="font-medium">{post.category}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="text-[15px] font-semibold leading-tight truncate font-[family-name:var(--font-moret)]">
                      {post.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && query.trim().length < 2 && (
            <div className="px-6 py-8 text-center text-[13px] text-[#555555]">
              Type at least 2 characters to search
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-6 py-3 border-t border-[#CCCCCC] flex items-center justify-between text-[11px] text-[#AAAAAA]">
          <span>ESC to close</span>
          <span>{results.length > 0 ? `${results.length} result${results.length === 1 ? "" : "s"}` : ""}</span>
        </div>
      </div>
    </div>
  );
}
