import Link from "next/link";
import { posts } from "@/data/posts";
import { categories } from "@/data/categories";

function SvgConnector() {
  return (
    <svg
      viewBox="0 0 22 9"
      fill="none"
      className="w-[22px] h-[9px] text-[#4B515B] shrink-0 transition-colors duration-200"
    >
      <path
        d="M1 0.125V7.42188H22"
        stroke="currentColor"
        strokeWidth={1.5}
        fill="none"
      />
    </svg>
  );
}

function DottedSeparator() {
  return <div className="h-4" />;
}

function FooterLink({
  href,
  children,
  isExternal = false,
}: {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}) {
  const className =
    "group/link flex items-center gap-2.5 py-[3px] text-[#8C9BAB] hover:text-white transition-colors duration-200";

  const content = (
    <>
      <span className="group-hover/link:text-[#298DFF] transition-colors duration-200">
        <SvgConnector />
      </span>
      <span className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-tight">
        {children}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function FooterLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2.5 py-[3px] text-[#8C9BAB]">
      <span className="text-[#4B515B]">
        <SvgConnector />
      </span>
      <span className="font-[family-name:var(--font-jetbrains)] text-[13px] leading-tight">
        {children}
      </span>
    </span>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-[family-name:var(--font-jetbrains)] text-[14px] font-bold tracking-[1.5px] text-white mb-2">
      {children}
    </h4>
  );
}

// Inline social SVGs matching Sui footer style
function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XTwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIcons = [
  { icon: YouTubeIcon, label: "YouTube", href: "#" },
  { icon: DiscordIcon, label: "Discord", href: "#" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "#" },
  { icon: XTwitterIcon, label: "X", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060610] text-white mt-16">
      {/* Logo Area */}
      <div className="max-w-360 mx-auto px-6 pt-6">
        <p className="font-[family-name:var(--font-anton)] text-2xl font-black tracking-wider">
          READZ™
        </p>
      </div>

      {/* Footer Columns */}
      <div className="max-w-360 mx-auto px-6 pt-5 pb-10">
        <div className="grid grid-cols-4 gap-10">
          {/* Destinations Column */}
          <div>
            <FooterHeading>DESTINATIONS/</FooterHeading>
            {posts.map((post) => (
              <FooterLink key={post.slug} href={`/blogs/${post.slug}`}>
                {post.title.split("—")[0].trim()}
              </FooterLink>
            ))}
          </div>

          {/* Categories & Pages Column */}
          <div>
            <FooterHeading>CATEGORIES/</FooterHeading>
            {categories.map((cat) => (
              <FooterLink key={cat.slug} href={`/categories/${cat.slug}`}>
                {cat.name}
              </FooterLink>
            ))}

          </div>

          {/* Pages & Recent Column */}
          <div>
            <FooterHeading>PAGES/</FooterHeading>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/blogs">Blog</FooterLink>
            <FooterLink href="/gallery">Gallery</FooterLink>
            <FooterLink href="/about">About / Contact</FooterLink>

            <DottedSeparator />

            <FooterHeading>RECENT/</FooterHeading>
            {posts.slice(0, 5).map((post) => (
              <FooterLink key={post.slug} href={`/blogs/${post.slug}`}>
                {post.title.split("—")[0].trim()}
              </FooterLink>
            ))}
          </div>

          {/* Resources & About Column */}
          <div>
            <FooterHeading>RESOURCES/</FooterHeading>
            <FooterLink href="/blogs">All articles</FooterLink>
            <FooterLink href="/gallery">Photo gallery</FooterLink>
            <FooterLink href="/categories">Browse categories</FooterLink>
            <FooterLabel>Newsletter</FooterLabel>
            <FooterLabel>RSS feed</FooterLabel>

            <DottedSeparator />

            <FooterHeading>ABOUT/</FooterHeading>
            <FooterLink href="/about">About READZ</FooterLink>
            <FooterLink href="/about#authors">Our authors</FooterLink>
            <FooterLabel>Careers</FooterLabel>
            <FooterLabel>Privacy policy</FooterLabel>
            <FooterLabel>Terms of service</FooterLabel>
          </div>
        </div>
      </div>

      {/* Social Row */}
      <div className="max-w-360 mx-auto px-6 pb-4">
        <div className="flex gap-3">
          {socialIcons.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="w-9 h-9 rounded-lg border border-[#334455] flex items-center justify-center text-[#667788] hover:border-white hover:text-white transition-colors duration-200"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-360 mx-auto px-6 pt-2 pb-6">
        <p className="font-[family-name:var(--font-jetbrains)] text-[12px] text-[#556677]">
          ©2026 READZ™. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
