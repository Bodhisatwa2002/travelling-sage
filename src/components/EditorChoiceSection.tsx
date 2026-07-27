import Image from "next/image";
import SectionSeparator from "./SectionSeparator";

export default function EditorChoiceSection() {
  return (
    <section className="max-w-360 mx-auto px-4 md:px-10 py-10 md:py-16">
      <h2 className="font-[family-name:var(--font-moret)] text-[28px] md:text-[48px]">
        Editor&apos;s choice
      </h2>

      <SectionSeparator />

      {/* Editor Card */}
      <div className="group border border-[#CCCCCC] overflow-hidden cursor-pointer">
        {/* Card Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
            <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
            <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
          </div>
          <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA] mx-4" />
          <span className="text-[11px] font-medium tracking-wide">
            [No. 018]
          </span>
        </div>

        {/* Image with Overlay */}
        <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
          <Image
            src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&q=80"
            alt="Delhi — layers of history beneath a modern capital"
            fill
            className="object-cover group-hover:grayscale transition-all duration-500"
            sizes="1400px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 space-y-2 md:space-y-3 max-w-[85%] md:max-w-[500px]">
            <span className="text-white text-sm font-medium">Heritage</span>
            <h3 className="font-[family-name:var(--font-moret)] text-[22px] md:text-[32px] lg:text-[40px] font-bold text-white leading-tight drop-shadow-lg">
              <span className="group-hover:bg-[#E8D5A3] group-hover:text-[#1A1A1A] transition-colors duration-300 box-decoration-clone">
                Delhi — layers of history
                <br />
                beneath a modern capital
              </span>
            </h3>
            <p className="text-white text-[13px]">
              by Arjun Mehta &nbsp;|&nbsp; 7 min read
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
