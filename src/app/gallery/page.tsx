import type { Metadata } from "next";
import GalleryView from "@/components/GalleryView";

export const metadata: Metadata = {
  title: "Gallery — India Through Our Lens",
  description:
    "A visual journey through India — sunrises over ghats, Himalayan peaks, coastal towns, and vibrant festivals captured by Traveling Sage.",
  openGraph: {
    title: "Gallery — India Through Our Lens",
    description:
      "A visual journey through India — sunrises over ghats, Himalayan peaks, coastal towns, and vibrant festivals.",
    url: "/gallery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery — India Through Our Lens",
    description:
      "A visual journey through India — sunrises over ghats, Himalayan peaks, coastal towns, and vibrant festivals.",
  },
};

const galleryImages = [
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

export default function GalleryPage() {
  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="font-[family-name:var(--font-moret)] text-[36px] md:text-[64px] font-bold text-center">
          Gallery
        </h1>
        <p className="text-[16px] text-[#555555] leading-relaxed text-center max-w-[600px] mx-auto mt-4">
          A curated collection of moments captured across India — from sacred
          ghats and mountain trails to colonial streets and tribal festivals.
        </p>
      </div>

      <GalleryView images={galleryImages} />
    </div>
  );
}
