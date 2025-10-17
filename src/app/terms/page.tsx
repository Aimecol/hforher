import { Metadata } from 'next';
import { TermsPageClient } from '@/components/legal/terms-page-client';

export const metadata: Metadata = {
  title: 'Terms of Service - H for Her',
  description: 'Read the terms and conditions for using H for Her website and services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
