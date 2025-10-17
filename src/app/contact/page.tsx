import { Metadata } from 'next';
import { ContactPageClient } from '@/components/contact/contact-page-client';

export const metadata: Metadata = {
  title: 'Contact Us - H for Her',
  description: 'Get in touch with H for Her customer service team. We\'re here to help with your fashion needs.',
  keywords: ['contact', 'customer service', 'support', 'H for Her', 'Rwanda', 'fashion'],
  openGraph: {
    title: 'Contact Us - H for Her',
    description: 'Get in touch with H for Her customer service team',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
