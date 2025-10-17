import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import { ProductPageClient } from '@/components/product/product-page-client';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = mockProducts.find(p => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const price = product.variants[0]?.salePrice || product.variants[0]?.price || 0;

  return {
    title: `${product.name} - H for Her`,
    description: product.description,
    keywords: [...product.tags, product.vendor, 'fashion', 'Rwanda', 'online shopping'],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: primaryImage.url,
          width: primaryImage.width,
          height: primaryImage.height,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [primaryImage.url],
    },
    other: {
      'product:price:amount': price.toString(),
      'product:price:currency': 'RWF',
      'product:availability': product.variants.some(v => v.stock > 0) ? 'in stock' : 'out of stock',
      'product:condition': 'new',
      'product:brand': product.vendor,
    },
  };
}

// Generate static params for build optimization
export async function generateStaticParams() {
  return mockProducts.slice(0, 50).map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find(p => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }

  // Get related products
  const relatedProducts = mockProducts
    .filter(p => 
      p.id !== product.id && 
      (p.categoryId === product.categoryId || 
       p.tags.some(tag => product.tags.includes(tag)))
    )
    .slice(0, 4);

  return (
    <ProductPageClient 
      product={product} 
      relatedProducts={relatedProducts}
    />
  );
}
