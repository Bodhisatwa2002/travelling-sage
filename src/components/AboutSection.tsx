import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="max-w-360 mx-auto px-4 md:px-10 lg:px-[200px] py-10 md:py-20">
      <div className="flex flex-col items-center gap-10">
        {/* Image Card */}
        <div className="w-full md:w-[600px] border border-[#CCCCCC]">
          {/* Card Header */}
          <div className="flex items-center justify-center gap-2 px-3.5 py-2">
            <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA]" />
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full border border-[#999999]" />
              <span className="w-2 h-2 rounded-full border border-[#999999]" />
              <span className="w-2 h-2 rounded-full border border-[#999999]" />
            </div>
            <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA]" />
          </div>

          {/* Image */}
          <div className="px-2.5 pb-2.5">
            <div className="relative w-full h-[250px] md:h-[440px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80"
                alt="About READZ"
                fill
                className="object-cover"
                sizes="600px"
              />
            </div>
          </div>
        </div>

        {/* Quote */}
        <p className="font-[family-name:var(--font-moret)] text-[18px] md:text-[22px] italic text-center leading-[1.5] max-w-3xl">
          This magazine was born from a simple love of travel — the kind that
          takes you beyond tourist trails and into the heart of a place. Our
          writers explore India&apos;s hidden corners, ancient cities, and mountain
          paths to bring you stories that inspire your next journey.
        </p>

        {/* Dot Separator */}
        <div className="flex items-center gap-2 w-[300px]">
          <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA]" />
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full border border-[#999999]" />
            <span className="w-2 h-2 rounded-full border border-[#999999]" />
            <span className="w-2 h-2 rounded-full border border-[#999999]" />
          </div>
          <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA]" />
        </div>

        {/* Founder Info */}
        <div className="text-center space-y-1">
          <p className="font-[family-name:var(--font-moret)] text-xl font-semibold">
            Ananya Deshpande
          </p>
          <p className="text-sm text-[#555555]">Founder & Editor-in-Chief</p>
        </div>
      </div>
    </section>
  );
}
