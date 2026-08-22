import { requireAuth } from "@/lib/supabase/guard";
import type { Metadata } from "next";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Your Profile",
};

export default async function ProfilePage() {
  const { supabase, user } = await requireAuth();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, avatar_url, created_at")
    .eq("id", user.id)
    .single();

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#CCCCCC]">
      <h1 className="font-[family-name:var(--font-moret)] text-3xl font-bold text-center mb-2">
        Your Profile
      </h1>
      <p className="text-center text-gray-500 mb-8 text-sm">{user.email}</p>

      <ProfileForm
        displayName={profile?.display_name ?? ""}
        avatarUrl={profile?.avatar_url ?? ""}
      />

      {profile?.created_at && (
        <p className="text-center text-xs text-gray-400 mt-6">
          Member since{" "}
          {new Date(profile.created_at).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
          })}
        </p>
      )}
    </div>
  );
}
