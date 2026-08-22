"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2 } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  region_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  regions: any;
}

interface Region { id: string; name: string }

const inputClass = "w-full px-3 py-2 rounded-lg border border-[#CCCCCC] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#E8D5A3] transition text-sm";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function DestinationsManager({ destinations, regions }: { destinations: Destination[]; regions: Region[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [regionId, setRegionId] = useState(regions[0]?.id ?? "");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.from("destinations").insert({
      name, slug: slugify(name), description, image, region_id: regionId,
    });
    setSaving(false);
    if (err) { setError(err.message); return; }
    setName(""); setDescription(""); setImage("");
    setShowForm(false);
    router.refresh();
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete destination "${name}"?`)) return;
    const supabase = createClient();
    await supabase.from("destinations").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-[#CCCCCC] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#EBEBEB] text-left text-[12px] text-[#999] uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Region</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Slug</th>
              <th className="px-4 py-3 font-medium w-16">Delete</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((d) => (
              <tr key={d.id} className="border-b border-[#F5F5F5] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3 text-[#555] hidden md:table-cell">{(Array.isArray(d.regions) ? d.regions[0]?.name : d.regions?.name) ?? "—"}</td>
                <td className="px-4 py-3 text-[#555] hidden md:table-cell">{d.slug}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(d.id, d.name)} className="p-1.5 text-[#999] hover:text-red-600 transition-colors cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {destinations.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-[#999]">No destinations yet.</td></tr>
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
          <div>
            <label className="block text-sm font-medium mb-1">Region *</label>
            <select value={regionId} onChange={(e) => setRegionId(e.target.value)} required className={inputClass}>
              {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={2} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL *</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} required className={inputClass} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#333] transition disabled:opacity-50">
              {saving ? "Saving..." : "Add Destination"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm border border-[#CCCCCC] hover:bg-[#F5F5F5] transition cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-sm text-[#555] hover:text-[#1A1A1A] transition-colors cursor-pointer">
          <Plus size={16} /> Add Destination
        </button>
      )}
    </div>
  );
}
