import { requireAdmin } from "@/lib/supabase/admin-guard";
import RegionsManager from "./RegionsManager";

export default async function AdminRegionsPage() {
  const { supabase } = await requireAdmin();

  const { data: regions } = await supabase
    .from("regions")
    .select("id, name, slug")
    .order("name");

  return (
    <div>
      <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold mb-6">Regions</h1>
      <RegionsManager regions={regions ?? []} />
    </div>
  );
}
