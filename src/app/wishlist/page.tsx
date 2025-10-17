import { Metadata } from 'next';
import { WishlistPageClient } from '@/components/wishlist/wishlist-page-client';

export const metadata: Metadata = {
  title: 'My Wishlist - H for Her',
  description: 'View and manage your saved items',
  openGraph: {
    title: 'My Wishlist - H for Her',
    description: 'View and manage your saved items',
    type: 'website',
  },
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
