import Image from "next/image";

const smallVideos = [
  {
    issueNumber: "No. 019",
    category: "Adventure",
    author: "Bodhisatwa",
    readTime: "5 min read",
    title: "Rishikesh — yoga, rapids, and the foothills of the Himalayas",
    image:
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=80",
  },
  {
    issueNumber: "No. 020",
    category: "Adventure",
    author: "Bodhisatwa",
    readTime: "6 min read",
    title: "Nagaland — exploring India's wild northeast frontier",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    issueNumber: "No. 014",
    category: "Adventure",
    author: "Bodhisatwa",
    readTime: "5 min read",
    title: "Rishikesh to Badrinath — the ultimate Uttarakhand road trip",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
  },
];

export default function WatchSection() {
  return (
    <section className="bg-[#111111] text-white">
      <div className="max-w-360 mx-auto px-4 md:px-10 py-10 md:py-16 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <h2 className="font-[family-name:var(--font-moret)] text-[28px] md:text-[48px]">
            Watch
          </h2>
          <button className="border border-white px-5 py-2.5 text-xs font-bold tracking-wider hover:bg-white hover:text-[#111111] transition-colors rounded-sm">
            VIEW ALL VIDEOS
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 border-[1.5px] border-white rotate-45" />
          <div className="flex-1 h-px bg-[#666666]" />
          <div className="w-2 h-2 border-[1.5px] border-white rotate-45" />
        </div>

        {/* Featured Video Card */}
        <div className="group border border-[#444444] cursor-pointer">
          {/* Card Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#888888]" />
              <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#888888]" />
              <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#888888]" />
            </div>
            <div className="flex-1 h-px border-t border-dashed border-[#666666] mx-4" />
            <span className="text-[11px] font-medium tracking-wide">
              [No. 021]
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row h-auto md:h-[420px]">
            <div className="relative w-full md:w-1/2 h-[220px] md:h-full">
              <Image
                src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80"
                alt="Banaras — the eternal city on the Ganges"
                fill
                className="object-cover group-hover:grayscale transition-all duration-500"
                sizes="700px"
              />
            </div>
            <div className="w-full md:w-1/2 flex items-center p-5 md:p-8">
              <h3 className="font-[family-name:var(--font-moret)] text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-tight">
                <span className="group-hover:bg-[#E8D5A3] group-hover:text-[#1A1A1A] transition-colors duration-300 box-decoration-clone">
                  Banaras — the eternal city on the Ganges
                </span>
              </h3>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between px-3.5 py-2.5">
            <span className="text-[13px] font-medium">Heritage</span>
            <span className="text-[13px] text-[#AAAAAA]">
              by Bodhisatwa &nbsp;|&nbsp; 7 min read
            </span>
          </div>
        </div>

        {/* Small Video Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
          {smallVideos.map((video) => (
            <div
              key={video.issueNumber}
              className="group border border-[#444444] cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full border border-[#888888]" />
                  <span className="w-2 h-2 rounded-full border border-[#888888]" />
                  <span className="w-2 h-2 rounded-full border border-[#888888]" />
                </div>
                <div className="flex-1 h-px border-t border-dashed border-[#666666] mx-3" />
                <span className="text-[11px] font-medium tracking-wide">
                  [{video.issueNumber}]
                </span>
              </div>

              {/* Image */}
              <div className="px-2.5">
                <div className="relative w-full h-[220px] overflow-hidden">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:grayscale transition-all duration-500"
                    sizes="440px"
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between px-3 py-1.5">
                <span className="text-xs font-medium">{video.category}</span>
                <span className="text-xs text-[#AAAAAA]">
                  by {video.author} &nbsp;|&nbsp; {video.readTime}
                </span>
              </div>

              {/* Title */}
              <div className="px-3 pb-3">
                <h4 className="font-[family-name:var(--font-moret)] text-lg font-bold leading-snug">
                  <span className="group-hover:bg-[#E8D5A3] group-hover:text-[#1A1A1A] transition-colors duration-300 box-decoration-clone">
                    {video.title}
                  </span>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
