import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllDestinations, getDestinationBySlug, getRegionBySlug } from "@/sanity/queries/destinations";
import { getPostsByDestination } from "@/sanity/queries/posts";
import BlogCard from "@/components/BlogCard";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://travelingsage.vercel.app";

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.map((dest) => ({
    region: dest.region,
    slug: dest.slug,
  }));
}

interface DestinationDetailPageProps {
  params: Promise<{ region: string; slug: string }>;
}

export async function generateMetadata({ params }: DestinationDetailPageProps): Promise<Metadata> {
  const { region, slug } = await params;
  const [regionData, destination] = await Promise.all([
    getRegionBySlug(region),
    getDestinationBySlug(slug),
  ]);

  if (!destination || !regionData) return { title: "Destination Not Found" };

  const title = `${destination.name} - ${regionData.name} | Traveling Sage`;
  const description = destination.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/destinations/${region}/${slug}`,
      images: [{ url: destination.image, width: 1200, height: 630, alt: destination.name }],
      siteName: "Traveling Sage",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [destination.image],
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: DestinationDetailPageProps) {
  const { region, slug } = await params;
  const [regionData, destination] = await Promise.all([
    getRegionBySlug(region),
    getDestinationBySlug(slug),
  ]);

  if (!destination || !regionData) {
    return (
      <div className="max-w-360 mx-auto px-8 py-12 text-center">
        <h1 className="font-[family-name:var(--font-moret)] text-[48px] font-bold">
          Destination not found
        </h1>
      </div>
    );
  }

  const destinationPosts = await getPostsByDestination(slug);

  const rows: (typeof destinationPosts)[] = [];
  for (let i = 0; i < destinationPosts.length; i += 3) {
    rows.push(destinationPosts.slice(i, i + 3));
  }

  return (
    <div className="max-w-360 mx-auto">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: SITE_URL },
          { name: "Destinations", href: `${SITE_URL}/destinations` },
          { name: regionData.name, href: `${SITE_URL}/destinations/${region}` },
          { name: destination.name, href: `${SITE_URL}/destinations/${region}/${slug}` },
        ]}
      />
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-10 pt-8 md:pt-16 pb-8 md:pb-10">
        <div className="flex-1 space-y-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-[13px] text-[#1A1A1A] hover:underline"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-[#555555]" />
            <Link
              href="/destinations"
              className="text-[13px] text-[#1A1A1A] hover:underline"
            >
              Destinations
            </Link>
            <ChevronRight size={14} className="text-[#555555]" />
            <Link
              href={`/destinations/${region}`}
              className="text-[13px] text-[#1A1A1A] hover:underline"
            >
              {regionData.name}
            </Link>
          </div>

          <h1 className="font-[family-name:var(--font-moret)] text-[36px] md:text-[64px] font-bold leading-none">
            {destination.name}
          </h1>

          <p className="text-[15px] text-[#1A1A1A] leading-relaxed">
            {destination.description}
          </p>
        </div>

        <div className="relative w-full md:w-[380px] h-[200px] md:h-[220px] shrink-0 overflow-hidden rounded">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            sizes="380px"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="px-4 md:px-5 pb-12 space-y-5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col sm:flex-row gap-5">
            {row.map((post) => (
              <div key={post.slug} className="flex-1">
                <BlogCard post={post} />
              </div>
            ))}
            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className="hidden sm:block flex-1" />
              ))}
          </div>
        ))}

        {destinationPosts.length === 0 && (
          <p className="text-center text-[#555555] py-12 text-[15px]">
            No posts found for this destination yet.
          </p>
        )}
      </div>
    </div>
  );
}
