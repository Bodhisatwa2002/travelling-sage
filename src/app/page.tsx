import CategoryBar from "@/components/CategoryBar";
import HeroBanner from "@/components/HeroBanner";
import HeroSection from "@/components/HeroSection";
import RecentBlogsSection from "@/components/RecentBlogsSection";
import EditorChoiceSection from "@/components/EditorChoiceSection";
import WatchSection from "@/components/WatchSection";
import AboutSection from "@/components/AboutSection";
import DiscoverSection from "@/components/DiscoverSection";
import PodcastSection from "@/components/PodcastSection";
import { getAllPosts } from "@/lib/queries/posts";
import { WebSiteJsonLd } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://travelingsage.vercel.app";

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <WebSiteJsonLd
        name="Traveling Sage"
        description="Dive into well-crafted stories, interviews, and guides designed to inform, inspire, and entertain."
        url={SITE_URL}
      />
      {/* Banner */}
      <HeroBanner />

      <CategoryBar />

      {featuredPost && <HeroSection featuredPost={featuredPost} />}

      <RecentBlogsSection posts={recentPosts} />

      <EditorChoiceSection />

      <WatchSection />

      <AboutSection />

      <DiscoverSection />

      <PodcastSection />
    </>
  );
}
