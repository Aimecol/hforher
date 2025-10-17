'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  ShoppingBag, 
  Star, 
  Truck,
  Shield,
  RotateCcw,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/products/product-card';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCartStore();
  const { hasItem: hasWishlistItem, toggleItem: toggleWishlist } = useWishlistStore();
  
  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const isInWishlist = hasWishlistItem(product.id);
  const discountPercentage = selectedVariant?.salePrice 
    ? calculateDiscountPercentage(selectedVariant.price, selectedVariant.salePrice)
    : 0;

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem(product, selectedVariant, quantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const availableSizes = [...new Set(product.variants.map(v => v.size))];
  const availableColors = [...new Set(product.variants.map(v => v.color))];

  // Generate JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images.map(img => img.url),
    "brand": {
      "@type": "Brand",
      "name": product.vendor
    },
    "offers": {
      "@type": "Offer",
      "price": selectedVariant?.salePrice || selectedVariant?.price || 0,
      "priceCurrency": "RWF",
      "availability": selectedVariant?.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "H for Her"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-blush-pink/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-lg bg-soft-white">
                <Image
                  src={product.images[selectedImageIndex]?.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                
                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-soft-white/80 hover:bg-soft-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-soft-white/80 hover:bg-soft-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && <Badge variant="new">New</Badge>}
                  {product.isTrending && <Badge variant="trending">Trending</Badge>}
                  {discountPercentage > 0 && (
                    <Badge variant="sale">-{discountPercentage}%</Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                        index === selectedImageIndex
                          ? 'border-champagne-beige'
                          : 'border-transparent hover:border-warm-gray'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-playfair text-4xl font-bold text-jet-black mb-4">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-warm-gray'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-warm-gray">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-6">
                  {selectedVariant?.salePrice ? (
                    <>
                      <span className="font-bold text-3xl text-dusty-rose">
                        {formatCurrency(selectedVariant.salePrice)}
                      </span>
                      <span className="text-xl text-warm-gray line-through">
                        {formatCurrency(selectedVariant.price)}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-3xl text-jet-black">
                      {formatCurrency(selectedVariant?.price || 0)}
                    </span>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-medium text-jet-black mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {availableSizes.map(size => {
                    const variant = product.variants.find(v => v.size === size);
                    const isSelected = selectedVariant?.size === size;
                    const isAvailable = variant && variant.stock > 0;
                    
                    return (
                      <Button
                        key={size}
                        variant={isSelected ? 'default' : 'outline'}
                        onClick={() => variant && setSelectedVariantId(variant.id)}
                        disabled={!isAvailable}
                        className="h-12"
                      >
                        {size}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Color Selection */}
              {availableColors.length > 1 && (
                <div>
                  <h3 className="font-medium text-jet-black mb-3">Color</h3>
                  <div className="flex space-x-2">
                    {availableColors.map(color => {
                      const variant = product.variants.find(v => v.color === color);
                      const isSelected = selectedVariant?.color === color;
                      
                      return (
                        <Button
                          key={color}
                          variant={isSelected ? 'default' : 'outline'}
                          onClick={() => variant && setSelectedVariantId(variant.id)}
                          className="capitalize"
                        >
                          {color}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-medium text-jet-black mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(selectedVariant?.stock || 1, quantity + 1))}
                      disabled={quantity >= (selectedVariant?.stock || 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {selectedVariant && selectedVariant.stock <= 5 && (
                    <Badge variant="warning">
                      Only {selectedVariant.stock} left
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.isAvailable}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => toggleWishlist(product.id, product.name)}
                    className="h-12"
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                    {isInWishlist ? 'Saved' : 'Save'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="h-12"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Truck className="h-4 w-4 text-dusty-rose" />
                  <span>Free delivery over 50K RWF</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-dusty-rose" />
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-dusty-rose" />
                  <span>Quality guaranteed</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Ruler className="h-4 w-4 text-dusty-rose" />
                  <span>Size guide available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="sizing">Size Guide</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-warm-gray leading-relaxed mb-4">
                    {product.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Brand:</span> {product.vendor}
                    </div>
                    <div>
                      <span className="font-medium">Origin:</span> {product.originCountry}
                    </div>
                    <div>
                      <span className="font-medium">Weight:</span> {product.weight}g
                    </div>
                    <div>
                      <span className="font-medium">SKU:</span> {selectedVariant?.sku}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sizing" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Size Chart</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Size</th>
                          <th className="text-left p-2">Bust (cm)</th>
                          <th className="text-left p-2">Waist (cm)</th>
                          <th className="text-left p-2">Hips (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">S</td>
                          <td className="p-2">84-88</td>
                          <td className="p-2">64-68</td>
                          <td className="p-2">88-92</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">M</td>
                          <td className="p-2">88-92</td>
                          <td className="p-2">68-72</td>
                          <td className="p-2">92-96</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">L</td>
                          <td className="p-2">92-96</td>
                          <td className="p-2">72-76</td>
                          <td className="p-2">96-100</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-warm-gray">Reviews coming soon!</p>
                    <p className="text-sm text-warm-gray mt-2">
                      Be the first to review this product.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-playfair text-3xl font-bold text-jet-black mb-8 text-center">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={relatedProduct} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
