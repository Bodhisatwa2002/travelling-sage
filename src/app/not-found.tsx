import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function NotFound() {
  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
      <h1 className="font-[family-name:var(--font-moret)] text-[120px] md:text-[180px] font-bold leading-none text-[#1A1A1A]">
        404
      </h1>

      <p className="mt-4 text-[20px] md:text-[24px] font-[family-name:var(--font-moret)] text-[#1A1A1A]">
        Looks like you&apos;ve wandered off the trail
      </p>

      <p className="mt-2 text-[15px] text-[#555555] max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Let&apos;s get you back on track.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {siteConfig.navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-[#1A1A1A] text-white px-6 py-2.5 text-[13px] font-semibold tracking-wide hover:bg-[#333] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
