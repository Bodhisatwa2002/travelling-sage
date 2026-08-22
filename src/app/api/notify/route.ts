import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://travelingsage.vercel.app";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Missing title or slug" }, { status: 400 });
    }

    const { data: subscribers } = await supabase
      .from("subscribers")
      .select("email")
      .eq("active", true);

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers to notify" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const postUrl = `${SITE_URL}/blogs/${slug}`;

    const emails = subscribers.map((sub) => ({
      from: process.env.RESEND_FROM_EMAIL || "Traveling Sage <noreply@travelingsage.vercel.app>",
      to: sub.email,
      subject: `New on Traveling Sage: ${title}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h1 style="font-size: 24px; color: #1A1A1A;">New Story Published</h1>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            We just published a new article: <strong>${title}</strong>
          </p>
          <a href="${postUrl}" style="display: inline-block; background: #1A1A1A; color: white; padding: 12px 24px; text-decoration: none; font-size: 14px; font-weight: bold; letter-spacing: 0.05em; margin-top: 16px;">
            READ NOW
          </a>
          <p style="font-size: 12px; color: #999; margin-top: 32px;">
            You received this because you subscribed to Traveling Sage.
          </p>
        </div>
      `,
    }));

    await resend.batch.send(emails);

    return NextResponse.json({ message: `Notified ${subscribers.length} subscribers` });
  } catch {
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 });
  }
}
