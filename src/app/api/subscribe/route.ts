import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, active")
      .eq("email", email)
      .limit(1)
      .single();

    if (existing) {
      if (existing.active) {
        return NextResponse.json({ message: "Already subscribed" });
      }
      // Reactivate
      await supabase
        .from("subscribers")
        .update({ active: true })
        .eq("id", existing.id);
      return NextResponse.json({ message: "Subscription reactivated" });
    }

    await supabase.from("subscribers").insert({
      email,
      subscribed_at: new Date().toISOString(),
      active: true,
    });

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
