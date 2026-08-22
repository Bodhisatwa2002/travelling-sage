"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
  displayName: string;
  avatarUrl: string;
}

export default function ProfileForm({ displayName, avatarUrl }: ProfileFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: formData.get("displayName") as string,
        avatar_url: formData.get("avatarUrl") as string || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setSaving(false);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Profile updated!");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium mb-1">
          Display Name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          defaultValue={displayName}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-[#CCCCCC] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#E8D5A3] transition"
        />
      </div>

      <div>
        <label htmlFor="avatarUrl" className="block text-sm font-medium mb-1">
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          name="avatarUrl"
          type="url"
          defaultValue={avatarUrl}
          placeholder="https://..."
          className="w-full px-4 py-2.5 rounded-lg border border-[#CCCCCC] bg-[#EBEBEB] focus:outline-none focus:ring-2 focus:ring-[#E8D5A3] transition"
        />
      </div>

      {message && (
        <p className={`text-sm ${message.includes("updated") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="w-full py-2.5 rounded-lg bg-[#1A1A1A] text-white font-medium hover:bg-[#333] transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
