'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, X, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';
import { formatCurrency } from '@/lib/utils';
import { mockProducts } from '@/lib/mock-data';

export function WishlistPageClient() {
  const router = useRouter();
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);

  useEffect(() => {
    // Get full product details for wishlist items
    const products = items.map(itemId => 
      mockProducts.find(product => product.id === itemId)
    ).filter(Boolean);
    setWishlistProducts(products);
  }, [items]);

  const handleAddToCart = (product: any) => {
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

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeItem(productId, productName);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-blush-pink/20 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-dusty-rose" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-jet-black mb-4">
              Your wishlist is empty
            </h1>
            <p className="text-warm-gray text-lg mb-8">
              Start adding items you love to your wishlist and they'll appear here.
            </p>
            <Button onClick={() => router.push('/category/new-arrivals')}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blush-pink/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-playfair text-4xl font-bold text-jet-black">
                  My Wishlist
                </h1>
                <p className="text-warm-gray text-lg mt-2">
                  {items.length} {items.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearWishlist}
                  className="text-dusty-rose border-dusty-rose hover:bg-dusty-rose hover:text-white"
                >
                  Clear All
                </Button>
              )}
            </div>
          </motion.div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-brand-lg transition-all duration-300">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {product.isNew && <Badge variant="new">New</Badge>}
                      {product.isTrending && <Badge variant="trending">Trending</Badge>}
                      {product.salePrice && (
                        <Badge variant="sale">
                          -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                        </Badge>
                      )}
                    </div>

                    {/* Remove from wishlist */}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-soft-white/90 hover:bg-soft-white"
                      onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    {/* Quick actions on hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-3 right-3 flex flex-col space-y-2"
                    >
                      <Button
                        size="icon"
                        variant="default"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>

                  <CardContent className="p-4">
                    <div 
                      className="cursor-pointer"
                      onClick={() => router.push(`/product/${product.slug}`)}
                    >
                      <h3 className="font-semibold text-jet-black mb-2 line-clamp-2 group-hover:text-champagne-beige transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        {product.salePrice ? (
                          <>
                            <span className="font-bold text-lg text-jet-black">
                              {formatCurrency(product.salePrice)}
                            </span>
                            <span className="text-sm text-warm-gray line-through">
                              {formatCurrency(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold text-lg text-jet-black">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/product/${product.slug}`)}
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Continue Shopping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/category/new-arrivals')}
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
