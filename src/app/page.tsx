import CategoryBar from "@/components/CategoryBar";
import HeroSection from "@/components/HeroSection";
import RecentBlogsSection from "@/components/RecentBlogsSection";
import EditorChoiceSection from "@/components/EditorChoiceSection";
import WatchSection from "@/components/WatchSection";
import AboutSection from "@/components/AboutSection";
import DiscoverSection from "@/components/DiscoverSection";
import PodcastSection from "@/components/PodcastSection";
import { posts } from "@/data/posts";

export default function Home() {
  const featuredPost = posts.find((p) => p.issueNumber === "No. 005")!;
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      {/* Banner */}
      <div className="max-w-360 mx-auto px-8 py-6">
        <p className="font-[family-name:var(--font-anton)] text-[200px] leading-none text-center tracking-tight text-[#1A1A1A] select-none lg:text-[230px]">
          TRAVELLING SAGE
        </p>
      </div>

      <CategoryBar />

      <HeroSection featuredPost={featuredPost} />

      <RecentBlogsSection posts={recentPosts} />

      <EditorChoiceSection />

      <WatchSection />

      <AboutSection />

      <DiscoverSection />

      <PodcastSection />
    </>
  );
}
