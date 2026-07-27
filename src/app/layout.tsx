import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono, Anton, Press_Start_2P } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterAnimation from "@/components/FooterAnimation";
import { getAllRegions, getAllDestinations } from "@/sanity/queries/destinations";

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

export const metadata: Metadata = {
  title: "Traveling Sage - A Modern Magazine Travellers",
  description:
    "Dive into well-crafted stories, interviews, and guides designed to inform, inspire, and entertain.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [regions, destinations] = await Promise.all([
    getAllRegions(),
    getAllDestinations(),
  ]);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plus_Jakarta_Sans.variable} ${anton.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} ${moret.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#EBEBEB] text-[#1A1A1A] font-[family-name:var(--font-inter)]">
        <Navbar regions={regions} destinations={destinations} />
        <main className="flex-1">{children}</main>
        <Footer />
        <FooterAnimation />
        <Analytics />
      </body>
    </html>
  );
}
