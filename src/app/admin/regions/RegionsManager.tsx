"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2 } from "lucide-react";

interface Region { id: string; name: string; slug: string }

const inputClass = "w-full px-3 py-2 rounded-lg border border-[#CCCCCC] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#E8D5A3] transition text-sm";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function RegionsManager({ regions }: { regions: Region[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.from("regions").insert({ name, slug: slugify(name) });
    setSaving(false);
    if (err) { setError(err.message); return; }
    setName("");
    setShowForm(false);
    router.refresh();
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete region "${name}"? Destinations in this region will lose their reference.`)) return;
    const supabase = createClient();
    await supabase.from("regions").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-[#CCCCCC] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#EBEBEB] text-left text-[12px] text-[#999] uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium w-16">Delete</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((r) => (
              <tr key={r.id} className="border-b border-[#F5F5F5] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-[#555]">{r.slug}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(r.id, r.name)} className="p-1.5 text-[#999] hover:text-red-600 transition-colors cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {regions.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-[#999]">No regions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm ? (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-[#CCCCCC] p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#333] transition disabled:opacity-50">
              {saving ? "Saving..." : "Add Region"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm border border-[#CCCCCC] hover:bg-[#F5F5F5] transition cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-sm text-[#555] hover:text-[#1A1A1A] transition-colors cursor-pointer">
          <Plus size={16} /> Add Region
        </button>
      )}
    </div>
  );
}
