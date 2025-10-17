import { Metadata } from 'next';
import { CartPageClient } from '@/components/cart/cart-page-client';

export const metadata: Metadata = {
  title: 'Shopping Cart - H for Her',
  description: 'Review and manage your selected items before checkout.',
};

export default function CartPage() {
  return <CartPageClient />;
}
