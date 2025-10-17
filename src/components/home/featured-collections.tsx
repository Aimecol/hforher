'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';

const collections = [
  {
    id: 'summer-2024',
    name: 'Summer Collection 2024',
    description: 'Light, breezy, and perfect for Rwanda\'s sunny days',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop',
    href: '/collection/summer-2024',
    products: [
      {
        id: '1',
        name: 'Floral Summer Dress',
        price: 35000,
        salePrice: 28000,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
        slug: 'floral-summer-dress',
        isNew: true,
      },
      {
        id: '2',
        name: 'Elegant Evening Gown',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop',
        slug: 'elegant-evening-gown',
        isTrending: true,
      },
      {
        id: '3',
        name: 'Casual Day Dress',
        price: 25000,
        salePrice: 20000,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
        slug: 'casual-day-dress',
      },
    ],
  },
  {
    id: 'office-chic',
    name: 'Office Chic',
    description: 'Professional yet stylish pieces for the modern working woman',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    href: '/collection/office-chic',
    products: [
      {
        id: '4',
        name: 'Professional Blazer',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
        slug: 'professional-blazer',
        isNew: true,
      },
      {
        id: '5',
        name: 'Pencil Skirt',
        price: 30000,
        salePrice: 24000,
        image: 'https://images.unsplash.com/photo-1551336259-57a8f9c6f226?w=400&h=500&fit=crop',
        slug: 'pencil-skirt',
      },
      {
        id: '6',
        name: 'Silk Blouse',
        price: 38000,
        image: 'https://images.unsplash.com/photo-1564257577-5e90ae6da50b?w=400&h=500&fit=crop',
        slug: 'silk-blouse',
        isTrending: true,
      },
    ],
  },
];

function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { toggleItem, hasItem } = useWishlistStore();
  const { addItem } = useCartStore();
  
  const isInWishlist = hasItem(product.id);
  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    // Mock product and variant data for demo
    const mockProduct = {
      ...product,
      images: [{ id: '1', url: product.image, alt: product.name, width: 400, height: 500, isPrimary: true }],
      variants: [{ id: '1', sku: 'demo-sku', price: product.salePrice || product.price, size: 'M', color: 'Default', stock: 10, isAvailable: true }],
      tags: [],
      categoryId: '1',
      weight: 500,
      vendor: 'H for Her',
      originCountry: 'China',
      shippingEligible: true,
      rating: 4.5,
      reviewCount: 12,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const mockVariant = mockProduct.variants[0];
    addItem(mockProduct, mockVariant, 1);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/product/${product.slug}`);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-brand-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.isTrending && <Badge variant="trending">Trending</Badge>}
          {discountPercentage > 0 && (
            <Badge variant="sale">-{discountPercentage}%</Badge>
          )}
        </div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 right-3 flex flex-col space-y-2"
        >
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-soft-white/90 hover:bg-soft-white"
            onClick={(e) => {
              e.preventDefault();
              toggleItem(product.id, product.name);
            }}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current text-dusty-rose' : ''}`} />
          </Button>
          
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-soft-white/90 hover:bg-soft-white"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/product/${product.slug}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          
          <Button
            size="icon"
            variant="default"
            className="h-8 w-8 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-jet-black mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-2">
          {product.salePrice ? (
            <>
              <span className="font-semibold text-dusty-rose">
                {formatCurrency(product.salePrice)}
              </span>
              <span className="text-sm text-warm-gray line-through">
                {formatCurrency(product.price)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-jet-black">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function FeaturedCollections() {
  return (
    <section className="py-16 bg-blush-pink/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-jet-black mb-4">
            Featured Collections
          </h2>
          <p className="text-warm-gray max-w-2xl mx-auto">
            Discover our carefully curated collections, each designed to make you feel 
            confident and beautiful in every moment.
          </p>
        </div>

        <div className="space-y-16">
          {collections.map((collection, index) => (
            <div key={collection.id} className="space-y-8">
              {/* Collection Header */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={`space-y-4 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <h3 className="font-playfair text-3xl font-semibold text-jet-black">
                    {collection.name}
                  </h3>
                  <p className="text-warm-gray text-lg leading-relaxed">
                    {collection.description}
                  </p>
                  <Button asChild variant="outline" size="lg">
                    <Link href={collection.href}>
                      View Full Collection
                    </Link>
                  </Button>
                </div>
                
                <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
