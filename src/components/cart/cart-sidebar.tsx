'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
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

export function CartSidebar() {
  const { 
    items, 
    isOpen, 
    setCartOpen, 
    updateQuantity, 
    removeItem,
    totalItems,
    subtotal
  } = useCartStore();
  
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

  const freeShippingThreshold = 50000;
  const isEligibleForFreeShipping = subtotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setCartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-soft-white z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="font-playfair text-xl font-semibold flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Cart ({totalItems})
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCartOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Content */}
              {items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-6">
                  <div className="text-center">
                    <ShoppingBag className="h-16 w-16 text-warm-gray mx-auto mb-4" />
                    <h3 className="font-medium text-jet-black mb-2">Your cart is empty</h3>
                    <p className="text-warm-gray text-sm mb-6">
                      Add some items to get started
                    </p>
                    <Button asChild onClick={() => setCartOpen(false)}>
                      <Link href="/category/new-arrivals">Start Shopping</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Free Shipping Progress */}
                  {!isEligibleForFreeShipping && (
                    <div className="p-4 bg-dusty-rose/5 border-b">
                      <div className="text-center">
                        <p className="text-sm text-warm-gray mb-2">
                          Add {formatCurrency(amountNeededForFreeShipping)} more for free delivery
                        </p>
                        <div className="w-full bg-warm-gray/20 rounded-full h-2">
                          <div 
                            className="bg-dusty-rose h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                      {cartItemsWithDetails.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex gap-3 p-3 bg-blush-pink/20 rounded-lg"
                        >
                          {/* Product Image */}
                          <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={item.product.images[0]?.url}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-jet-black line-clamp-2 mb-1">
                              {item.product.name}
                            </h4>
                            <div className="text-xs text-warm-gray mb-2">
                              {item.variant.size} • {item.variant.color}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                {item.variant.salePrice ? (
                                  <>
                                    <span className="font-semibold text-dusty-rose text-sm">
                                      {formatCurrency(item.variant.salePrice)}
                                    </span>
                                    <span className="text-xs text-warm-gray line-through">
                                      {formatCurrency(item.variant.price)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-semibold text-jet-black text-sm">
                                    {formatCurrency(item.variant.price)}
                                  </span>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-6 w-6"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                
                                <span className="w-6 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.variant.stock}
                                  className="h-6 w-6"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 text-xs p-0 h-auto mt-1"
                            >
                              Remove
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Footer */}
                  <div className="border-t p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-semibold">{formatCurrency(subtotal)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Button asChild className="w-full" onClick={() => setCartOpen(false)}>
                        <Link href="/checkout">
                          Checkout
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                      
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setCartOpen(false)}
                      >
                        <Link href="/cart">View Cart</Link>
                      </Button>
                    </div>
                    
                    <p className="text-xs text-warm-gray text-center">
                      Shipping and taxes calculated at checkout
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
