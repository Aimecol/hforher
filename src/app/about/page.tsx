import { Metadata } from 'next';
import { AboutPageClient } from '@/components/about/about-page-client';

export const metadata: Metadata = {
  title: 'About H for Her - Our Story',
  description: 'Learn about H for Her, Rwanda\'s premier fashion destination. Discover our mission to empower women through style and quality fashion.',
  keywords: ['about', 'H for Her', 'Rwanda fashion', 'women empowerment', 'fashion story'],
  openGraph: {
    title: 'About H for Her - Our Story',
    description: 'Learn about H for Her, Rwanda\'s premier fashion destination',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
