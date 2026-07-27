import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllRegions, getDestinationsByRegion, getRegionBySlug } from "@/sanity/queries/destinations";
import CategoryCard from "@/components/CategoryCard";

export async function generateStaticParams() {
  const regions = await getAllRegions();
  return regions.map((r) => ({ region: r.slug }));
}

interface RegionPageProps {
  params: Promise<{ region: string }>;
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
