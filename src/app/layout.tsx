import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono,Anton, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterAnimation from "@/components/FooterAnimation";

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

export const metadata: Metadata = {
  title: "READZ\u2122 \u2014 A Modern Magazine for Curious Minds",
  description:
    "Dive into well-crafted stories, interviews, and guides designed to inform, inspire, and entertain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plus_Jakarta_Sans.variable} ${anton.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#EBEBEB] text-[#1A1A1A] font-[family-name:var(--font-inter)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FooterAnimation />
      </body>
    </html>
  );
}
