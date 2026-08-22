import { requireAdmin } from "@/lib/supabase/admin-guard";
import Link from "next/link";
import { FileText, FolderOpen, MapPin, Globe, Mail } from "lucide-react";

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();

  const [posts, categories, destinations, regions, subscribers] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("destinations").select("id", { count: "exact", head: true }),
    supabase.from("regions").select("id", { count: "exact", head: true }),
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Posts", count: posts.count ?? 0, href: "/admin/posts", icon: FileText },
    { label: "Categories", count: categories.count ?? 0, href: "/admin/categories", icon: FolderOpen },
    { label: "Destinations", count: destinations.count ?? 0, href: "/admin/destinations", icon: MapPin },
    { label: "Regions", count: regions.count ?? 0, href: "/admin/regions", icon: Globe },
    { label: "Subscribers", count: subscribers.count ?? 0, href: "/admin/subscribers", icon: Mail },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(({ label, count, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl p-6 border border-[#CCCCCC] hover:border-[#1A1A1A] transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={20} className="text-[#999] group-hover:text-[#1A1A1A] transition-colors" />
              <span className="font-[family-name:var(--font-moret)] text-3xl font-bold">
                {count}
              </span>
            </div>
            <p className="text-sm font-medium text-[#555]">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
