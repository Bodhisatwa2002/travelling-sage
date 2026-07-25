import Image from "next/image";

interface GalleryImage {
  number: string;
  caption: string;
  location: string;
  image: string;
  height: string;
}

const galleryImages: GalleryImage[] = [
  {
    number: "01",
    caption: "Sunrise over the ghats",
    location: "Varanasi, Uttar Pradesh",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
    height: "h-[380px]",
  },
  {
    number: "02",
    caption: "French Quarter colors",
    location: "Pondicherry, Tamil Nadu",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    height: "h-[380px]",
  },
  {
    number: "03",
    caption: "Hornbill Festival dancers",
    location: "Kisama, Nagaland",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    height: "h-[280px]",
  },
  {
    number: "04",
    caption: "Rapids on the Ganges",
    location: "Rishikesh, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80",
    height: "h-[280px]",
  },
  {
    number: "05",
    caption: "Jama Masjid at dusk",
    location: "Old Delhi",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    height: "h-[280px]",
  },
  {
    number: "06",
    caption: "Wildflowers in bloom",
    location: "Valley of Flowers, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=800&q=80",
    height: "h-[320px]",
  },
  {
    number: "07",
    caption: "The glacial lake",
    location: "Hemkund Sahib, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    height: "h-[320px]",
  },
  {
    number: "08",
    caption: "Himalayan trail at dawn",
    location: "Govindghat, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80",
    height: "h-[320px]",
  },
  {
    number: "09",
    caption: "Auroville Matrimandir",
    location: "Auroville, Tamil Nadu",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    height: "h-[300px]",
  },
  {
    number: "10",
    caption: "Chandni Chowk lanes",
    location: "Old Delhi",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    height: "h-[300px]",
  },
  {
    number: "11",
    caption: "Lakshman Jhula at sunset",
    location: "Rishikesh, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    height: "h-[300px]",
  },
];

// First row: 2 images, remaining rows: 3 each
function buildRows(images: GalleryImage[]) {
  const rows: GalleryImage[][] = [];
  if (images.length > 0) {
    rows.push(images.slice(0, 2));
  }
  for (let i = 2; i < images.length; i += 3) {
    rows.push(images.slice(i, i + 3));
  }
  return rows;
}

const rows = buildRows(galleryImages);

function GalleryCard({ item }: { item: GalleryImage }) {
  return (
    <div className="group border border-[#CCCCCC] cursor-pointer flex-1">
      {/* Card Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
        </div>
        <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA] mx-4" />
        <span className="text-[11px] font-medium tracking-wide">
          [{item.number}]
        </span>
      </div>

      {/* Image */}
      <div className="px-3">
        <div className={`relative w-full ${item.height} overflow-hidden`}>
          <Image
            src={item.image}
            alt={item.caption}
            fill
            className="object-cover group-hover:grayscale transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </div>

      {/* Caption Row */}
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <span className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[16px] font-semibold">
          <span className="group-hover:bg-[#E8D5A3] transition-colors duration-300 box-decoration-clone">
            {item.caption}
          </span>
        </span>
        <span className="text-[12px] text-[#555555] italic">
          {item.location}
        </span>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="max-w-360 mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 px-10 pt-16 pb-5">
        <h1 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[64px] font-bold">
          Gallery
        </h1>
        <p className="text-[16px] text-[#555555] leading-relaxed text-center max-w-[600px]">
          A curated collection of moments captured across India — from sacred
          ghats and mountain trails to colonial streets and tribal festivals.
        </p>
      </div>

      {/* Separator */}
      <div className="flex items-center gap-3 px-9">
        <div className="w-2 h-2 border-[1.5px] border-[#1A1A1A] rotate-45" />
        <div className="flex-1 h-px bg-[#1A1A1A]" />
        <div className="w-2 h-2 border-[1.5px] border-[#1A1A1A] rotate-45" />
      </div>

      {/* Gallery Grid */}
      <div className="px-5 pt-6 pb-12 space-y-5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-5">
            {row.map((item) => (
              <GalleryCard key={item.number} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
