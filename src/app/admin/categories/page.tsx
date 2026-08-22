import { requireAdmin } from "@/lib/supabase/admin-guard";
import CategoriesManager from "./CategoriesManager";

export default async function AdminCategoriesPage() {
  const { supabase } = await requireAdmin();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, description, image")
    .order("name");

  return (
    <div>
      <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold mb-6">Categories</h1>
      <CategoriesManager categories={categories ?? []} />
    </div>
  );
}
