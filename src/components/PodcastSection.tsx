import Image from "next/image";
import { Headphones } from "lucide-react";
import SectionSeparator from "./SectionSeparator";

const podcasts = [
  {
    episodeNumber: "Ep. 005",
    title: "Banaras after dark — ghats, chai, and midnight stories",
    author: "Bodhisatwa",
    duration: "1hr 50min",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&q=80",
  },
  {
    episodeNumber: "Ep. 004",
    title: "Trekking tales — lessons from the Himalayan trails",
    author: "Bodhisatwa",
    duration: "2hr 10min",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&q=80",
  },
];

export default function PodcastSection() {
  return (
    <section className="max-w-360 mx-auto px-4 md:px-10 py-10 md:py-16">
      <h2 className="font-[family-name:var(--font-moret)] font-bold text-[28px] md:text-[48px]">
        Podcast
      </h2>

      <SectionSeparator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {podcasts.map((podcast) => (
          <article
            key={podcast.episodeNumber}
            className="group border border-[#CCCCCC] cursor-pointer"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
                <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
              </div>
              <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA] mx-4" />
              <span className="text-[11px] font-medium tracking-wide">
                [{podcast.episodeNumber}]
              </span>
            </div>

            {/* Content Row */}
            <div className="flex flex-col sm:flex-row gap-5 px-3 pb-3">
              {/* Cover Image */}
              <div className="relative w-full sm:w-[200px] md:w-[280px] h-[200px] sm:h-[200px] md:h-[280px] shrink-0 overflow-hidden">
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  fill
                  className="object-cover group-hover:grayscale transition-all duration-500"
                  sizes="280px"
                />
              </div>

              {/* Text Column */}
              <div className="flex flex-col justify-start gap-3 pt-2">
                <h3 className="font-[family-name:var(--font-moret)] text-[22px] font-bold leading-snug">
                  <span className="group-hover:bg-[#E8D5A3] transition-colors duration-300 box-decoration-clone">
                    {podcast.title}
                  </span>
                </h3>
                <div className="flex items-center gap-2 text-[13px] text-[#555555]">
                  <span>by {podcast.author}</span>
                  <span>|</span>
                  <span>{podcast.duration}</span>
                </div>
                <button className="bg-[#1A1A1A] text-white px-3.5 py-2 text-[11px] font-bold tracking-wider rounded-sm w-fit hover:bg-[#333] transition-colors">
                  PLAY EPISODE
                </button>
              </div>
            </div>

            {/* Listen Row */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-t border-[#EEEEEE]">
              <span className="text-[13px] text-[#555555]">Listen on:</span>
              <div className="flex items-center gap-2">
                <Headphones size={16} className="text-[#555555]" />
                <span className="text-xs text-[#555555]">
                  Spotify &bull; Apple &bull; Google
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
