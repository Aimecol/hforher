import { Metadata } from 'next';
import { PrivacyPageClient } from '@/components/legal/privacy-page-client';

export const metadata: Metadata = {
  title: 'Privacy Policy - H for Her',
  description: 'Learn how H for Her protects and handles your personal information and data.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
