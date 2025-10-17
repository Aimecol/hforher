'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail, ArrowRight, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, generateOrderNumber } from '@/lib/utils';

export function OrderSuccessPageClient() {
  const router = useRouter();

  // Mock order data
  const orderData = {
    orderNumber: generateOrderNumber(),
    total: 45000,
    email: 'customer@email.com',
    estimatedDelivery: '2-3 business days',
    trackingNumber: 'HFH' + Math.random().toString(36).substr(2, 8).toUpperCase(),
  };

  useEffect(() => {
    // Analytics tracking for successful order
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: orderData.orderNumber,
        value: orderData.total,
        currency: 'RWF',
      });
    }
  }, [orderData.orderNumber, orderData.total]);

  const orderSteps = [
    {
      icon: CheckCircle,
      title: 'Order Confirmed',
      description: 'Your order has been successfully placed',
      status: 'completed',
    },
    {
      icon: Package,
      title: 'Processing',
      description: 'We\'re preparing your items for shipment',
      status: 'current',
    },
    {
      icon: Truck,
      title: 'Shipped',
      description: 'Your order is on its way to you',
      status: 'pending',
    },
    {
      icon: CheckCircle,
      title: 'Delivered',
      description: 'Your order has been delivered',
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-blush-pink/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="font-playfair text-4xl font-bold text-jet-black mb-4">
              Order Confirmed!
            </h1>
            <p className="text-warm-gray text-lg mb-2">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <p className="text-champagne-beige font-semibold text-lg">
              Order #{orderData.orderNumber}
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {/* Order Summary */}
            <Card className="shadow-brand">
              <CardContent className="p-6">
                <h2 className="font-playfair text-2xl font-bold text-jet-black mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Order Total:</span>
                    <span className="font-semibold text-jet-black">
                      {formatCurrency(orderData.total)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Confirmation sent to:</span>
                    <span className="text-jet-black">{orderData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Estimated delivery:</span>
                    <span className="text-jet-black">{orderData.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Tracking number:</span>
                    <span className="font-mono text-jet-black">{orderData.trackingNumber}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <Button className="w-full" onClick={() => router.push('/account')}>
                    <Package className="h-4 w-4 mr-2" />
                    Track Your Order
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="shadow-brand">
              <CardContent className="p-6">
                <h2 className="font-playfair text-2xl font-bold text-jet-black mb-4">
                  What's Next?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-jet-black">Email Confirmation</p>
                      <p className="text-sm text-warm-gray">
                        You'll receive an order confirmation email shortly with all the details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-jet-black">Order Processing</p>
                      <p className="text-sm text-warm-gray">
                        We'll start preparing your order for shipment within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Truck className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-jet-black">Shipping Updates</p>
                      <p className="text-sm text-warm-gray">
                        You'll get notifications when your order ships and when it's delivered.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="shadow-brand">
              <CardContent className="p-6">
                <h2 className="font-playfair text-2xl font-bold text-jet-black mb-6">
                  Order Progress
                </h2>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {orderSteps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center text-center flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          step.status === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : step.status === 'current'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <step.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-sm text-jet-black mb-1">
                          {step.title}
                        </h3>
                        <p className="text-xs text-warm-gray text-center">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Progress Line */}
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-10">
                    <div className="h-full bg-green-500 w-1/4"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Continue Shopping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <Card className="bg-gradient-primary border-0">
              <CardContent className="py-8">
                <h3 className="font-playfair text-2xl font-bold text-jet-black mb-4">
                  Discover More Fashion
                </h3>
                <p className="text-jet-black/80 mb-6 max-w-md mx-auto">
                  While you wait, explore our latest collections and find your next favorite pieces.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    className="bg-white/20 border-white/30 text-jet-black hover:bg-white/30"
                    onClick={() => router.push('/category/new-arrivals')}
                  >
                    Shop New Arrivals
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white/20 border-white/30 text-jet-black hover:bg-white/30"
                    onClick={() => router.push('/wishlist')}
                  >
                    View Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
