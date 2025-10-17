import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockCategories, mockProducts } from '@/lib/mock-data';
import { CategoryPageClient } from '@/components/category/category-page-client';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = mockCategories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - Fashion Collection`,
    description: category.description,
    openGraph: {
      title: `${category.name} - H for Her`,
      description: category.description,
      images: [category.image],
    },
  };
}

// Generate static params for build optimization
export async function generateStaticParams() {
  return mockCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = mockCategories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  // Get products for this category
  const categoryProducts = mockProducts.filter(product => 
    product.categoryId === category.id || 
    product.tags.includes(category.slug)
  );

  return (
    <CategoryPageClient 
      category={category} 
      products={categoryProducts}
      searchParams={searchParams}
    />
  );
}
