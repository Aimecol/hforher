import { Metadata } from 'next';
import { CategoriesPageClient } from '@/components/categories/categories-page-client';

export const metadata: Metadata = {
  title: 'Shop by Category - H for Her',
  description: 'Browse all fashion categories at H for Her. Find dresses, work wear, accessories, and more.',
  keywords: ['categories', 'fashion categories', 'shop by category', 'H for Her', 'Rwanda fashion'],
  openGraph: {
    title: 'Shop by Category - H for Her',
    description: 'Browse all fashion categories at H for Her',
    type: 'website',
  },
};

export default function CategoriesPage() {
  return <CategoriesPageClient />;
}
