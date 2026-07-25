import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/posts";

interface HeroSectionProps {
  featuredPost: BlogPost;
}

export default function HeroSection({ featuredPost }: HeroSectionProps) {
  return (
    <section className="max-w-360 mx-auto px-8 py-12">
      <div className="grid grid-cols-2 gap-10 items-start">
        {/* Left - Heading box + Newsletter box */}
        <div className="space-y-0">
          {/* Heading with solid border */}
          <div className="border border-[#CCCCCC] p-10 space-y-6">
            <h1 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[64px] leading-[1.05] tracking-tight">
              A travel magazine
              <br />
              for curious explorers
            </h1>
            <p className="text-[15px] text-[#555555] leading-relaxed max-w-md">
              Dive into stories from India&apos;s most captivating destinations
              — from ancient ghats and Himalayan trails to hidden beaches and
              tribal heartlands.
            </p>
          </div>

          {/* Newsletter with dashed border */}
          <div className="border-3 border-dashed border-[#1A1A1A] p-8 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[22px] font-bold">
                  Don&apos;t miss a thing
                </h3>
                <p className="text-sm text-[#555555]">
                  Subscribe to get updates straight to your inbox.
                </p>
              </div>

              {/* Stamp decoration */}
              <div className="border-2 border-[#1A1A1A] p-2 text-center rotate-[-8deg] opacity-50 shrink-0 ml-4">
                <p className="text-[8px] font-bold tracking-wider">DELHI</p>
                <p className="text-[10px] font-semibold leading-tight">
                  15 AUG
                  <br />
                  1947
                </p>
                <p className="text-[8px] font-bold tracking-wider">INDIA</p>
              </div>
            </div>

            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-[#CCCCCC] bg-white px-4 py-3 text-sm placeholder:text-[#AAAAAA] focus:outline-none focus:border-[#1A1A1A]"
              />
              <button className="bg-[#1A1A1A] text-white px-6 py-3 text-xs font-bold tracking-wider hover:bg-[#333] transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Right - Featured Image + Meta inside one border */}
        <Link href={`/blogs/${featuredPost.slug}`} className="group block">
          <div className="border border-[#CCCCCC]">
            {/* Card Header with dots + dashes */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#CCCCCC]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
              </div>
              <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA] mx-2" />
              <span className="text-[11px] font-semibold tracking-wide">
                FEATURED
              </span>
              <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA] mx-2" />
              <span className="text-[11px] font-medium">
                [{featuredPost.issueNumber}]
              </span>
            </div>

            {/* Image */}
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:grayscale transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 700px"
                priority
              />
            </div>

            {/* Meta below image */}
            <div className="px-4 py-4 space-y-2 border-t border-[#CCCCCC]">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium">
                  {featuredPost.category}
                </span>
                <span className="text-[13px] text-[#555555]">
                  by {featuredPost.author} &nbsp;|&nbsp;{" "}
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[30px] font-bold leading-tight">
                <span className="group-hover:bg-[#E8D5A3] transition-colors duration-300 box-decoration-clone">
                  {featuredPost.title}
                </span>
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
