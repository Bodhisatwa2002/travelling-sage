import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-[calc(100vh-200px)] max-w-360 mx-auto flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
