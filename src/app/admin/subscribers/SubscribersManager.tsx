"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  active: boolean;
}

export default function SubscribersManager({ subscribers }: { subscribers: Subscriber[] }) {
  const router = useRouter();

  async function toggleActive(id: string, active: boolean) {
    const supabase = createClient();
    await supabase.from("subscribers").update({ active }).eq("id", id);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this subscriber permanently?")) return;
    const supabase = createClient();
    await supabase.from("subscribers").delete().eq("id", id);
    router.refresh();
  }

  const activeCount = subscribers.filter((s) => s.active).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#555]">
        {activeCount} active out of {subscribers.length} total
      </p>

      <div className="bg-white rounded-xl border border-[#CCCCCC] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#EBEBEB] text-left text-[12px] text-[#999] uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Subscribed</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium w-16">Delete</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s.id} className="border-b border-[#F5F5F5] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{s.email}</td>
                <td className="px-4 py-3 text-[#555] hidden md:table-cell">
                  {new Date(s.subscribed_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(s.id, !s.active)}
                    className={`text-[12px] font-medium px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                      s.active
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : "bg-[#F5F5F5] text-[#999] hover:bg-[#EBEBEB]"
                    }`}
                  >
                    {s.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 text-[#999] hover:text-red-600 transition-colors cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-[#999]">No subscribers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
