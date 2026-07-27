import Image from "next/image";
import SectionSeparator from "./SectionSeparator";

const leftCards = [
  {
    issueNumber: "No. 014",
    category: "Adventure",
    author: "Bodhisatwa",
    readTime: "5 min read",
    title: "Rishikesh to Badrinath — the ultimate Uttarakhand road trip",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    imageHeight: "h-[200px]",
  },
  {
    issueNumber: "No. 016",
    category: "Trekking",
    author: "Bodhisatwa",
    readTime: "6 min read",
    title: "Hemkund Sahib trek — a sacred pilgrimage above the clouds",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    imageHeight: "h-[200px]",
  },
];

const centerCard = {
  issueNumber: "No. 017",
  category: "Trekking",
  author: "Bodhisatwa",
  readTime: "6 min read",
  title: "Valley of Flowers — a Himalayan paradise in bloom",
  image:
    "https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=800&q=80",
  imageHeight: "h-[500px]",
};

const rightArticles = [
  {
    title: "Hidden gems of Old Delhi — a walking guide",
    author: "Bodhisatwa",
    readTime: "5 min read",
  },
  {
    title: "Planning your first Himalayan trek — a beginner's guide",
    author: "Bodhisatwa",
    readTime: "8 min read",
  },
  {
    title: "Pondicherry — where France meets India by the sea",
    author: "Bodhisatwa",
    readTime: "6 min read",
  },
];

function CardHeader({ issueNumber }: { issueNumber: string }) {
  return (
    <div className="flex items-center justify-between px-3.5 py-2.5">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
        <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
        <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
      </div>
      <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA] mx-4" />
      <span className="text-[11px] font-medium tracking-wide">
        [{issueNumber}]
      </span>
    </div>
  );
}

interface DiscoverCardProps {
  card: {
    issueNumber: string;
    category: string;
    author: string;
    readTime: string;
    title: string;
    image: string;
    imageHeight: string;
  };
}

function DiscoverCard({ card }: DiscoverCardProps) {
  return (
    <article className="group border border-[#CCCCCC] cursor-pointer">
      <CardHeader issueNumber={card.issueNumber} />
      <div className="px-3">
        <div className={`relative w-full ${card.imageHeight} overflow-hidden`}>
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover group-hover:grayscale transition-all duration-500"
            sizes="400px"
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-3.5 pt-2.5">
        <span className="text-[13px] font-medium">{card.category}</span>
        <span className="text-[13px] text-[#555555]">
          by {card.author} &nbsp;|&nbsp; {card.readTime}
        </span>
      </div>
      <div className="px-3.5 pt-1 pb-4">
        <h4 className="font-[family-name:var(--font-moret)] text-[22px] font-bold leading-snug">
          <span className="group-hover:bg-[#E8D5A3] transition-colors duration-300 box-decoration-clone">
            {card.title}
          </span>
        </h4>
      </div>
    </article>
  );
}

export default function DiscoverSection() {
  return (
    <section className="max-w-360 mx-auto px-4 md:px-10 py-10 md:py-16">
      <h2 className="font-[family-name:var(--font-moret)] font-bold text-[28px] md:text-[48px]">
        Discover more stories
      </h2>

      <SectionSeparator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[340px_1fr_340px] gap-6 pt-4">
        {/* Left Column - 2 small cards */}
        <div className="space-y-6">
          {leftCards.map((card) => (
            <DiscoverCard key={card.issueNumber} card={card} />
          ))}
        </div>

        {/* Center Column - 1 tall card */}
        <DiscoverCard card={centerCard} />

        {/* Right Column - Article list + Ad */}
        <div className="space-y-0">
          {rightArticles.map((article, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="py-5 space-y-2">
                <h4 className="font-[family-name:var(--font-moret)] text-[22px] font-bold leading-snug">
                  <span className="group-hover:bg-[#E8D5A3] transition-colors duration-300 box-decoration-clone">
                    {article.title}
                  </span>
                </h4>
                <div className="flex items-center gap-2 text-[13px] text-[#555555]">
                  <span>by {article.author}</span>
                  <span>|</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              {i < rightArticles.length - 1 && (
                <div className="h-px bg-[#CCCCCC]" />
              )}
            </div>
          ))}

          <div className="h-5" />

          {/* Ad Card */}
          <div className="relative h-[257px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80"
              alt="Premium membership"
              fill
              className="object-cover"
              sizes="340px"
            />
            <div className="absolute top-3 right-5 bg-[#1A1A1A] px-2.5 py-1 text-[10px] font-bold text-white tracking-wider">
              SPONSORED
            </div>
            <div className="absolute bottom-8 left-6 space-y-1">
              <p className="text-white text-lg font-bold">
                Explore more trails
              </p>
              <p className="text-white/80 text-xs">
                Subscribe for premium travel guides
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
