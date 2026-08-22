import { requireAdmin } from "@/lib/supabase/admin-guard";
import DestinationsManager from "./DestinationsManager";

export default async function AdminDestinationsPage() {
  const { supabase } = await requireAdmin();

  const [destsRes, regionsRes] = await Promise.all([
    supabase.from("destinations").select("id, name, slug, description, image, region_id, regions(name)").order("name"),
    supabase.from("regions").select("id, name").order("name"),
  ]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold mb-6">Destinations</h1>
      <DestinationsManager
        destinations={destsRes.data ?? []}
        regions={regionsRes.data ?? []}
      />
    </div>
  );
}
