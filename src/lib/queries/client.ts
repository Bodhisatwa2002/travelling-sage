import { createClient } from "@supabase/supabase-js";

// Read-only client for public content queries.
// Uses the anon/publishable key — no cookies, no auth.
// Safe to call from generateStaticParams, Server Components, etc.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);
