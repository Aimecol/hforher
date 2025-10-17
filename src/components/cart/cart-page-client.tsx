'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  Truck,
  Shield,
  Tag
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/stores/cart-store';
import { mockProducts } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import type { Product, ProductVariant } from '@/types';

interface CartItemWithDetails {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  addedAt: string;
  product: Product;
  variant: ProductVariant;
}

export function CartPageClient() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart,
    subtotal,
    shipping,
    tax,
    total
  } = useCartStore();
  
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<CartItemWithDetails[]>([]);

  // Enrich cart items with product and variant details
  useEffect(() => {
    const enrichedItems = items.map(item => {
      const product = mockProducts.find(p => p.id === item.productId);
      const variant = product?.variants.find(v => v.id === item.variantId);
      
      return {
        ...item,
        product: product!,
        variant: variant!,
      };
    }).filter(item => item.product && item.variant);
    
    setCartItemsWithDetails(enrichedItems);
  }, [items]);

  const handleApplyCoupon = () => {
    // Mock coupon validation
    if (couponCode.toLowerCase() === 'welcome10') {
      setIsCouponApplied(true);
    }
  };

  const freeShippingThreshold = 50000;
  const isEligibleForFreeShipping = subtotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = freeShippingThreshold - subtotal;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-blush-pink/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-warm-gray mx-auto mb-4" />
              <h1 className="font-playfair text-3xl font-bold text-jet-black mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-warm-gray mb-8">
                Looks like you haven't added any items to your cart yet. 
                Start shopping to fill it up!
              </p>
            </div>
            
            <Button asChild size="lg" className="mb-4">
              <Link href="/category/new-arrivals">
                Start Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            
            <div className="text-center">
              <Link href="/" className="text-dusty-rose hover:underline">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blush-pink/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-jet-black mb-2">
            Shopping Cart
          </h1>
          <p className="text-warm-gray">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress */}
            {!isEligibleForFreeShipping && (
              <Card className="border-dusty-rose/20 bg-dusty-rose/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-dusty-rose" />
                      <span className="text-sm font-medium">Free Delivery</span>
                    </div>
                    <span className="text-sm text-warm-gray">
                      Add {formatCurrency(amountNeededForFreeShipping)} more
                    </span>
                  </div>
                  <div className="w-full bg-warm-gray/20 rounded-full h-2">
                    <div 
                      className="bg-dusty-rose h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cart Items List */}
            <AnimatePresence>
              {cartItemsWithDetails.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={item.product.images[0]?.url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-jet-black line-clamp-2">
                                <Link 
                                  href={`/product/${item.product.slug}`}
                                  className="hover:text-dusty-rose transition-colors"
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-warm-gray">
                                <span>Size: {item.variant.size}</span>
                                <span>Color: {item.variant.color}</span>
                                <span>SKU: {item.variant.sku}</span>
                              </div>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-warm-gray hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex justify-between items-end">
                            <div className="flex items-center gap-2">
                              {item.variant.salePrice ? (
                                <>
                                  <span className="font-semibold text-dusty-rose">
                                    {formatCurrency(item.variant.salePrice)}
                                  </span>
                                  <span className="text-sm text-warm-gray line-through">
                                    {formatCurrency(item.variant.price)}
                                  </span>
                                </>
                              ) : (
                                <span className="font-semibold text-jet-black">
                                  {formatCurrency(item.variant.price)}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.variant.stock}
                                className="h-8 w-8"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Stock Warning */}
                          {item.variant.stock <= 5 && (
                            <Badge variant="warning" className="mt-2">
                              Only {item.variant.stock} left in stock
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Coupon Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={isCouponApplied}
                  />
                  <Button 
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || isCouponApplied}
                    variant="outline"
                  >
                    Apply
                  </Button>
                </div>
                {isCouponApplied && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm font-medium">Coupon applied successfully!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {isEligibleForFreeShipping ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax (VAT 18%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                
                {isCouponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (WELCOME10)</span>
                    <span>-{formatCurrency(subtotal * 0.1)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    {formatCurrency(isCouponApplied ? total - (subtotal * 0.1) : total)}
                  </span>
                </div>

                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>

                {/* Security Features */}
                <div className="pt-4 space-y-2 text-sm text-warm-gray">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Free delivery over {formatCurrency(freeShippingThreshold)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <Button asChild variant="outline" className="w-full">
              <Link href="/category/new-arrivals">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
