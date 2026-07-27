import { getAllRegions, getDestinationsByRegion } from "@/sanity/queries/destinations";
import CategoryCard from "@/components/CategoryCard";

export default async function DestinationsPage() {
  const regions = await getAllRegions();

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 py-8 md:py-12">
      <h1 className="font-[family-name:var(--font-moret)] text-[36px] md:text-[64px] font-bold text-center mb-8 md:mb-12">
        Destinations
      </h1>

      {await Promise.all(
        regions.map(async (region) => {
          const regionDestinations = await getDestinationsByRegion(region.slug);
          return (
            <div key={region.slug} className="mb-12">
              <h2 className="font-[family-name:var(--font-moret)] text-[28px] font-bold mb-6">
                {region.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regionDestinations.map((dest) => (
                  <CategoryCard
                    key={dest.slug}
                    category={dest}
                    linkPrefix={`/destinations/${region.slug}`}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
