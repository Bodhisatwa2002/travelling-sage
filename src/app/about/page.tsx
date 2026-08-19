import type { Metadata } from "next";
import Image from "next/image";
import { Globe, Camera, MessageCircle, Briefcase } from "lucide-react";
import { getAllAuthors, getFounder } from "@/sanity/queries/authors";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "About Us — The Story Behind Traveling Sage",
  description:
    "Meet the team behind Traveling Sage. We write travel stories that go beyond the guidebook — by travelers who've walked the paths they describe.",
  openGraph: {
    title: "About Us — The Story Behind Traveling Sage",
    description:
      "Meet the team behind Traveling Sage. Travel stories that go beyond the guidebook.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — The Story Behind Traveling Sage",
    description:
      "Meet the team behind Traveling Sage. Travel stories that go beyond the guidebook.",
  },
};

export default async function AboutPage() {
  const [founder, authors] = await Promise.all([
    getFounder(),
    getAllAuthors(),
  ]);

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Left Column */}
        <div className="space-y-12">
          {/* About Us */}
          <section>
            <h1 className="font-[family-name:var(--font-moret)] text-[36px] md:text-[48px] font-bold mb-6">
              About Us
            </h1>
            <div className="space-y-4 text-[15px] text-[#1A1A1A] leading-relaxed">
              <p>
                Welcome to Travelling Sage, your companion for exploring
                India&apos;s most extraordinary destinations. From the ghats of
                Banaras to the mountain trails of Uttarakhand, we bring you
                stories that go beyond the guidebook — the kind written by
                travelers who have walked the paths they describe.
              </p>
              <p>
                We&apos;re passionate about slow, meaningful travel. Our writers
                live in the places they write about, eat at the stalls locals
                swear by, and trek the trails before recommending them. Every
                story is a firsthand account.
              </p>
            </div>
          </section>

          {/* Founder */}
          {founder && (
            <section>
              <h2 className="font-[family-name:var(--font-moret)] text-[36px] font-bold mb-6">
                Our founder
              </h2>
              <div className="flex flex-col sm:flex-row gap-6">
                {founder.image && (
                  <div className="relative w-48 h-56 shrink-0 overflow-hidden">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <h3 className="font-[family-name:var(--font-moret)] text-[26px] font-bold">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-[#1A1A1A] leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Author */}
          <section id="authors">
            <h2 className="font-[family-name:var(--font-moret)] text-[36px] font-bold mb-6">
              Author
            </h2>
            <p className="text-[13px] font-semibold tracking-wide">
              BODHISATWA CHAKRABORTY
            </p>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {/* Contact Us */}
          <section>
            <h2 className="font-[family-name:var(--font-moret)] text-[36px] md:text-[48px] font-bold mb-6">
              Contact us
            </h2>
            <ContactForm />

            <div className="mt-8 space-y-2 text-sm">
              <p>New Delhi, Hauz Khas Village, 110016</p>
              <p>hello@travellingsage.com</p>
              <p>+91 98765 43210</p>
            </div>

            <div className="flex gap-4 mt-4">
              <Globe size={18} className="text-[#1A1A1A]" />
              <Camera size={18} className="text-[#1A1A1A]" />
              <MessageCircle size={18} className="text-[#1A1A1A]" />
              <Briefcase size={18} className="text-[#1A1A1A]" />
            </div>
          </section>

          {/* Collaborate — commented out for now */}
          {/* <section>
            <h2 className="font-[family-name:var(--font-moret)] text-[36px] font-bold mb-4">
              Collaborate or Partner
            </h2>
            <div className="space-y-3 text-[15px] leading-relaxed">
              <p>
                Interested in joining the Travelling Sage team, exploring
                partnerships, or sharing a travel story? We&apos;d love to connect.
              </p>
              <p>
                We don&apos;t run sponsored travel pieces or banner ads, but
                we&apos;re always open to meaningful collaborations with fellow
                travelers and storytellers. Reach out anytime at
                partnerships@travellingsage.com
              </p>
            </div>
          </section> */}

          {/* Careers — commented out for now */}
          {/* <section>
            <h2 className="font-[family-name:var(--font-moret)] text-[36px] font-bold mb-4">
              Careers
            </h2>
            <p className="text-[15px] leading-relaxed">
              Love writing about travel? Join the Travelling Sage team! Apply
              now at careers@travellingsage.com
            </p>
          </section> */}
        </div>
      </div>
    </div>
  );
}
