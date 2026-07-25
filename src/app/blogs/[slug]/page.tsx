import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { posts, getPostBySlug } from "@/data/posts";
import BlogDetailSidebar from "@/components/BlogDetailSidebar";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const recentPosts = posts.filter((p) => p.slug !== slug).slice(0, 2);
  const featuredPost = posts.find(
    (p) => p.slug !== slug && p.featured
  );

  return (
    <div className="max-w-360 mx-auto">
      {/* Article Header - centered */}
      <div className="flex flex-col items-center gap-5 px-[200px] pt-12 pb-5">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[13px] text-[#555555]">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="text-[#555555]" />
          <Link
            href="/blogs"
            className="hover:text-[#1A1A1A] transition-colors"
          >
            All blogs
          </Link>
        </div>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[56px] font-bold leading-[1.15] text-center">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-base text-[#555555] text-center">
            {post.subtitle}
          </p>
        )}

        {/* Author Row */}
        <div className="flex items-center gap-2.5 pt-2.5 text-sm">
          <span className="font-semibold">by {post.author}</span>
          <span className="text-[#555555]">|</span>
          <span className="text-[#555555]">{post.readTime}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex gap-[60px] px-10 pt-5">
        {/* Article Column */}
        <div className="flex-1 min-w-0">
          {/* Hero Image */}
          <div className="relative w-full h-[420px] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1000px"
              priority
            />
          </div>

          {/* Article Body */}
          <article className="pt-10 space-y-5">
            {post.content ? (
              post.content.map((section, i) => (
                <div key={i}>
                  <h2 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[32px] font-bold leading-[1.3] mb-5">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className="text-[15px] leading-[1.7] whitespace-pre-line mb-5"
                    >
                      {p}
                    </p>
                  ))}
                  {section.subSections?.map((sub, k) => (
                    <div key={k}>
                      <div className="h-4" />
                      <h3 className="text-lg font-bold leading-[1.4] mb-5">
                        {sub.heading}
                      </h3>
                      {sub.paragraphs.map((p, l) => (
                        <p
                          key={l}
                          className="text-[15px] leading-[1.7] whitespace-pre-line mb-5"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}
                  {i < post.content!.length - 1 && <div className="h-4" />}
                </div>
              ))
            ) : (
              <div className="space-y-5">
                <p className="text-[15px] leading-[1.7]">
                  This article explores the topic of{" "}
                  <strong>{post.title.toLowerCase()}</strong>. Stay tuned for the
                  full content coming soon.
                </p>
              </div>
            )}
          </article>

          {/* Bottom Separator */}
          <div className="h-px bg-[#CCCCCC] mt-8" />

          {/* Prev / Next Row */}
          <div className="flex items-center gap-6 pt-5 pb-8">
            {prevPost ? (
              <Link
                href={`/blogs/${prevPost.slug}`}
                className="flex items-center gap-3 group border-r border-[#CCCCCC] pr-4 flex-1"
              >
                <div className="relative w-[60px] h-[60px] shrink-0 overflow-hidden">
                  <Image
                    src={prevPost.image}
                    alt={prevPost.title}
                    fill
                    className="object-cover"
                    sizes="60px"
                  />
                </div>
                <span className="text-sm font-semibold group-hover:underline">
                  Previous blog
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextPost ? (
              <Link
                href={`/blogs/${nextPost.slug}`}
                className="flex items-center justify-end gap-3 group border-l border-[#CCCCCC] pl-4 flex-1"
              >
                <span className="text-sm font-semibold group-hover:underline">
                  Next blog
                </span>
                <div className="relative w-[60px] h-[60px] shrink-0 overflow-hidden">
                  <Image
                    src={nextPost.image}
                    alt={nextPost.title}
                    fill
                    className="object-cover"
                    sizes="60px"
                  />
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <BlogDetailSidebar
          post={post}
          featuredPost={featuredPost}
          recentPosts={recentPosts}
        />
      </div>
    </div>
  );
}
