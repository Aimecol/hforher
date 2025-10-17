'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const { hasItem: hasWishlistItem, toggleItem: toggleWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  
  const isInWishlist = hasWishlistItem(product.id);
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const secondaryImage = product.images[1];
  const primaryVariant = product.variants[0];
  
  const discountPercentage = primaryVariant?.salePrice 
    ? calculateDiscountPercentage(primaryVariant.price, primaryVariant.salePrice)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (primaryVariant) {
      addToCart(product, primaryVariant, 1);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  if (layout === 'list') {
    return (
      <Link href={`/product/${product.slug}`}>
        <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-brand-lg transition-all duration-300">
          <div className="flex">
            {/* Image */}
            <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden">
              <Image
                src={primaryImage.url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="192px"
                onLoad={() => setImageLoading(false)}
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {product.isNew && <Badge variant="new">New</Badge>}
                {product.isTrending && <Badge variant="trending">Trending</Badge>}
                {discountPercentage > 0 && (
                  <Badge variant="sale">-{discountPercentage}%</Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <CardContent className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-jet-black mb-2">
                    {product.name}
                  </h3>
                  <p className="text-warm-gray text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-warm-gray'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-warm-gray">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    {primaryVariant?.salePrice ? (
                      <>
                        <span className="font-semibold text-dusty-rose text-lg">
                          {formatCurrency(primaryVariant.salePrice)}
                        </span>
                        <span className="text-sm text-warm-gray line-through">
                          {formatCurrency(primaryVariant.price)}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold text-jet-black text-lg">
                        {formatCurrency(primaryVariant?.price || 0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleToggleWishlist}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current text-dusty-rose' : ''}`} />
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={handleAddToCart}
                    disabled={!primaryVariant?.isAvailable}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.slug}`}>
      <Card 
        className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-brand-lg transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* Primary Image */}
          <Image
            src={primaryImage.url}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-300 ${
              isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
            } group-hover:scale-105`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoading(false)}
          />
          
          {/* Secondary Image on Hover */}
          {secondaryImage && (
            <Image
              src={secondaryImage.url}
              alt={`${product.name} alternate view`}
              fill
              className={`object-cover transition-all duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-105`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          
          {/* Loading Skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-blush-pink animate-pulse" />
          )}
          
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
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current text-dusty-rose' : ''}`} />
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-soft-white/90 hover:bg-soft-white"
            >
              <Eye className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              variant="default"
              className="h-8 w-8 rounded-full"
              onClick={handleAddToCart}
              disabled={!primaryVariant?.isAvailable}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </motion.div>
          
          {/* Out of Stock Overlay */}
          {!primaryVariant?.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-jet-black mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-warm-gray'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-warm-gray">
              ({product.reviewCount})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center space-x-2">
            {primaryVariant?.salePrice ? (
              <>
                <span className="font-semibold text-dusty-rose">
                  {formatCurrency(primaryVariant.salePrice)}
                </span>
                <span className="text-sm text-warm-gray line-through">
                  {formatCurrency(primaryVariant.price)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-jet-black">
                {formatCurrency(primaryVariant?.price || 0)}
              </span>
            )}
          </div>
          
          {/* Available Sizes */}
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-xs text-warm-gray">Sizes:</span>
            {product.variants.slice(0, 3).map((variant) => (
              <span
                key={variant.id}
                className="text-xs bg-blush-pink text-jet-black px-1 rounded"
              >
                {variant.size}
              </span>
            ))}
            {product.variants.length > 3 && (
              <span className="text-xs text-warm-gray">+{product.variants.length - 3}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
