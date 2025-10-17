import { HeroSection } from '@/components/home/hero-section';
import { PromotionalBanner } from '@/components/home/promotional-banner';
import { QuickCategories } from '@/components/home/quick-categories';
import { FeaturedCollections } from '@/components/home/featured-collections';
import { TikTokSection } from '@/components/home/tiktok-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with CTA and promotional banner */}
      <HeroSection />
      
      {/* Promotional Banner - Free delivery notice */}
      <PromotionalBanner />
      
      {/* Quick Categories for easy navigation */}
      <QuickCategories />
      
      {/* Featured Collections with product recommendations */}
      <FeaturedCollections />
      
      {/* TikTok Video Carousel and UGC */}
      <TikTokSection />
    </div>
  );
}
