import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getAllPosts, getPostBySlug as fetchPostBySlug } from "@/sanity/queries/posts";
import { getAllAuthors } from "@/sanity/queries/authors";
import BlogDetailSidebar from "@/components/BlogDetailSidebar";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";
import RelatedPosts from "@/components/RelatedPosts";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import TableOfContents from "@/components/TableOfContents";
import type { TocItem } from "@/components/TableOfContents";
import MobileTableOfContents from "@/components/MobileTableOfContents";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://travelingsage.vercel.app";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  const title = post.seoTitle || post.title;
  const description = post.metaDescription || post.subtitle || `Read ${post.title} on Traveling Sage`;
  const image = post.ogImage || post.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blogs/${slug}`,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      siteName: "Traveling Sage",
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const [post, posts, authors] = await Promise.all([
    fetchPostBySlug(slug),
    getAllPosts(),
    getAllAuthors(),
  ]);

  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const recentPosts = posts.filter((p) => p.slug !== slug).slice(0, 2);
  const featuredPost = posts.find(
    (p) => p.slug !== slug && p.featured
  );

  const author = authors.find(
    (a) => a.name.toLowerCase() === post.author.toLowerCase()
  );

  const relatedPosts = posts
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === post.category || p.destination === post.destination)
    )
    .slice(0, 3);

  const tocItems: TocItem[] = [];
  if (post.content) {
    post.content.forEach((section) => {
      tocItems.push({ id: slugify(section.heading), text: section.heading, level: "h2" });
      section.subSections?.forEach((sub) => {
        tocItems.push({ id: slugify(sub.heading), text: sub.heading, level: "h3" });
      });
    });
  }

  return (
    <div className="max-w-360 mx-auto">
      <ReadingProgress />
      <ArticleJsonLd
        title={post.seoTitle || post.title}
        description={post.metaDescription || post.subtitle || `Read ${post.title} on Traveling Sage`}
        url={`${SITE_URL}/blogs/${slug}`}
        image={post.ogImage || post.image}
        author={post.author}
        publishedAt={post.publishedAt}
        category={post.category}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: SITE_URL },
          { name: "Blog", href: `${SITE_URL}/blogs` },
          { name: post.title, href: `${SITE_URL}/blogs/${slug}` },
        ]}
      />
      {/* Article Header - centered */}
      <div className="flex flex-col items-center gap-5 px-4 md:px-10 lg:px-[200px] pt-8 md:pt-12 pb-5">
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
        <h1 className="font-[family-name:var(--font-moret)] text-[28px] md:text-[40px] lg:text-[56px] font-bold leading-[1.15] text-center">
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

        {/* Share Buttons */}
        <ShareButtons title={post.title} slug={post.slug} />
      </div>

      {/* Content Area */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-[60px] px-4 md:px-10 pt-5">
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

          {/* Mobile Table of Contents */}
          {tocItems.length > 0 && (
            <div className="md:hidden pt-5 pb-2">
              <MobileTableOfContents items={tocItems} />
            </div>
          )}

          {/* Article Body */}
          <article className="pt-10 space-y-5">
            {post.content ? (
              post.content.map((section, i) => (
                <div key={i}>
                  <h2
                    id={slugify(section.heading)}
                    className="font-[family-name:var(--font-moret)] text-[32px] font-bold leading-[1.3] mb-5 scroll-mt-20"
                  >
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
                  {section.images?.map((img, m) => (
                    <figure key={`img-${m}`} className="my-6">
                      <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden rounded-lg">
                        <Image
                          src={img.url}
                          alt={img.alt || section.heading}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                      {img.caption && (
                        <figcaption className="text-center text-sm text-[#777777] mt-2 italic">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                  {section.subSections?.map((sub, k) => (
                    <div key={k}>
                      <div className="h-4" />
                      <h3
                        id={slugify(sub.heading)}
                        className="text-lg font-bold leading-[1.4] mb-5 scroll-mt-20"
                      >
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
                      {sub.images?.map((img, m) => (
                        <figure key={`img-${m}`} className="my-6">
                          <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden rounded-lg">
                            <Image
                              src={img.url}
                              alt={img.alt || sub.heading}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 800px"
                            />
                          </div>
                          {img.caption && (
                            <figcaption className="text-center text-sm text-[#777777] mt-2 italic">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
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

          {/* Bottom Share */}
          <div className="pt-8">
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

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

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>

        {/* Sidebar */}
        <BlogDetailSidebar
          post={post}
          featuredPost={featuredPost}
          recentPosts={recentPosts}
          authorImage={author?.image}
          tocItems={tocItems}
        />
      </div>
    </div>
  );
}
