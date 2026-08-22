import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono, Anton, Press_Start_2P } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterAnimation from "@/components/FooterAnimation";
import { getAllRegions, getAllDestinations } from "@/lib/queries/destinations";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  variable: "--font-Plus_Jakarta_Sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

const moret = localFont({
  src: [
    { path: "../../public/fonts/Moret-Regular.otf", weight: "400" },
    { path: "../../public/fonts/Moret-Semibold.otf", weight: "600" },
  ],
  variable: "--font-moret",
  display: "swap",
});

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://travelingsage.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Traveling Sage — India Travel Stories, Guides & Itineraries",
    template: "%s | Traveling Sage",
  },
  description:
    "Discover India's most captivating destinations — from ancient ghats to Himalayan trails. Well-crafted travel stories, guides, and itineraries by travelers who've walked the path.",
  keywords: [
    "India travel blog",
    "travel stories India",
    "Himalayan trails",
    "Indian destinations",
    "travel guide India",
    "backpacking India",
  ],
  authors: [{ name: "Traveling Sage" }],
  creator: "Traveling Sage",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Traveling Sage",
    title: "Traveling Sage — India Travel Stories, Guides & Itineraries",
    description:
      "Discover India's most captivating destinations — from ancient ghats to Himalayan trails. Well-crafted travel stories, guides, and itineraries.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Traveling Sage — India Travel Stories, Guides & Itineraries",
    description:
      "Discover India's most captivating destinations — from ancient ghats to Himalayan trails.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const [regions, destinations, { data: { user } }] = await Promise.all([
    getAllRegions(),
    getAllDestinations(),
    supabase.auth.getUser(),
  ]);

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.role === "admin";
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plus_Jakarta_Sans.variable} ${anton.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} ${moret.variable} antialiased`}
    >
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#EBEBEB] text-[#1A1A1A] font-[family-name:var(--font-inter)]">
        <Navbar regions={regions} destinations={destinations} user={user} isAdmin={isAdmin} />
        <main className="flex-1">{children}</main>
        <Footer />
        <FooterAnimation />
        <Analytics />
      </body>
    </html>
  );
}
