import { Metadata } from 'next';
import { CheckoutPageClient } from '@/components/checkout/checkout-page-client';

export const metadata: Metadata = {
  title: 'Checkout - H for Her',
  description: 'Complete your purchase securely with H for Her',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
