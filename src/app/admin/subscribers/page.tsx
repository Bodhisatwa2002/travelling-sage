import { requireAdmin } from "@/lib/supabase/admin-guard";
import SubscribersManager from "./SubscribersManager";

export default async function AdminSubscribersPage() {
  const { supabase } = await requireAdmin();

  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("id, email, subscribed_at, active")
    .order("subscribed_at", { ascending: false });

  return (
    <div>
      <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold mb-6">Subscribers</h1>
      <SubscribersManager subscribers={subscribers ?? []} />
    </div>
  );
}
