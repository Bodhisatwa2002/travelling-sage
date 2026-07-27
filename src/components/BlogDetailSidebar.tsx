import Image from "next/image";
import Link from "next/link";
import { Globe, Camera, MessageCircle } from "lucide-react";
import { BlogPost } from "@/types";
import TableOfContents from "@/components/TableOfContents";
import type { TocItem } from "@/components/TableOfContents";

interface BlogDetailSidebarProps {
  post: BlogPost;
  featuredPost?: BlogPost;
  recentPosts: BlogPost[];
  authorImage?: string;
  tocItems?: TocItem[];
}

export default function BlogDetailSidebar({
  post,
  featuredPost,
  recentPosts,
  authorImage,
  tocItems = [],
}: BlogDetailSidebarProps) {
  return (
    <aside className="w-full md:w-[320px] shrink-0 md:sticky md:top-8 md:self-start space-y-0">
      {/* Table of Contents */}
      {tocItems.length > 0 && (
        <>
          <TableOfContents items={tocItems} />
          <div className="h-px bg-[#CCCCCC] my-6" />
        </>
      )}

      {/* Author Info Section */}
      <div className="space-y-4">
        <h3 className="font-[family-name:var(--font-moret)] text-2xl font-bold">
          Author info
        </h3>

        <div className="flex items-center gap-3">
          {authorImage && (
            <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-full">
              <Image
                src={authorImage}
                alt={post.author}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
          )}
          <div className="space-y-0.5">
            <p className="text-base font-bold">Bodhisatwa</p>
            <p className="text-[13px] text-[#555555]">Founder & Travel Writer</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Globe size={18} className="text-[#1A1A1A]" />
          <Camera size={18} className="text-[#1A1A1A]" />
          <MessageCircle size={18} className="text-[#1A1A1A]" />
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-[#CCCCCC] my-6" />

      {/* Featured Post Section */}
      {featuredPost && (
        <>
          <div className="space-y-3.5 pt-4">
            <h3 className="font-[family-name:var(--font-moret)] text-2xl font-bold">
              Featured post
            </h3>

            <Link
              href={`/blogs/${featuredPost.slug}`}
              className="flex gap-3 group"
            >
              <div className="relative w-[100px] h-[80px] shrink-0 overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
              <div className="space-y-2">
                <p className="text-[15px] font-bold leading-[1.3] group-hover:underline">
                  {featuredPost.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#555555]">
                  <span>by {featuredPost.author}</span>
                  <span>|</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="h-4" />
          <div className="h-px bg-[#CCCCCC]" />
          <div className="h-4" />
        </>
      )}

      {/* Recent Posts Section */}
      <div className="space-y-3.5 pt-4">
        <h3 className="font-[family-name:var(--font-moret)] text-2xl font-bold">
          Recent post
        </h3>

        {recentPosts.map((rPost, i) => (
          <div key={rPost.slug}>
            <Link
              href={`/blogs/${rPost.slug}`}
              className="block space-y-1.5 pb-4 group"
            >
              <p className="text-[15px] font-semibold leading-[1.3] group-hover:underline">
                {rPost.title}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#555555]">
                <span>by {rPost.author}</span>
                <span>|</span>
                <span>{rPost.readTime}</span>
              </div>
            </Link>
            {i < recentPosts.length - 1 && (
              <div className="h-px bg-[#CCCCCC]" />
            )}
          </div>
        ))}

        <div className="h-px bg-[#CCCCCC]" />
      </div>

      <div className="h-2" />

      {/* Ad Card */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80"
          alt="Premium membership"
          fill
          className="object-cover"
          sizes="320px"
        />
        <div className="absolute top-3 right-3 bg-[#1A1A1A] px-2.5 py-1">
          <span className="text-[9px] font-bold text-white tracking-wider">
            ADVERTISEMENT
          </span>
        </div>
        <div className="absolute bottom-6 left-5">
          <p className="font-[family-name:var(--font-moret)] text-[26px] font-bold text-white leading-[1.2] max-w-[200px]">
            Explore premium travel guides
          </p>
        </div>
      </div>
    </aside>
  );
}
