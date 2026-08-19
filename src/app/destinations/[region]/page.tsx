import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllRegions, getDestinationsByRegion, getRegionBySlug } from "@/sanity/queries/destinations";
import CategoryCard from "@/components/CategoryCard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://travelingsage.vercel.app";

export async function generateStaticParams() {
  const regions = await getAllRegions();
  return regions.map((r) => ({ region: r.slug }));
}

interface RegionPageProps {
  params: Promise<{ region: string }>;
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { region } = await params;
  const regionData = await getRegionBySlug(region);

  if (!regionData) return { title: "Region Not Found" };

  const title = `${regionData.name} Destinations — Travel Guides`;
  const description = `Explore the best destinations in ${regionData.name}. Travel stories, guides, and itineraries from Traveling Sage.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/destinations/${region}`,
      siteName: "Traveling Sage",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region } = await params;
  const regionData = await getRegionBySlug(region);

  if (!regionData) {
    return (
      <div className="max-w-360 mx-auto px-8 py-12 text-center">
        <h1 className="font-[family-name:var(--font-moret)] text-[48px] font-bold">
          Region not found
        </h1>
      </div>
    );
  }

  const regionDestinations = await getDestinationsByRegion(region);

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link href="/" className="text-[13px] text-[#1A1A1A] hover:underline">
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
        <span className="text-[13px] text-[#555555]">{regionData.name}</span>
      </div>

      <h1 className="font-[family-name:var(--font-moret)] text-[36px] md:text-[64px] font-bold mb-8 md:mb-12">
        {regionData.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regionDestinations.map((dest) => (
          <CategoryCard
            key={dest.slug}
            category={dest}
            linkPrefix={`/destinations/${region}`}
          />
        ))}
      </div>
    </div>
  );
}
