'use client';

import { motion } from 'framer-motion';
import { FileText, Scale, ShoppingCart, CreditCard, Truck, RotateCcw } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TermsPageClient() {
  return (
    <div className="min-h-screen bg-blush-pink/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-champagne-beige/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="h-8 w-8 text-champagne-beige" />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-jet-black mb-4">
              Terms of Service
            </h1>
            <p className="text-warm-gray text-lg">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-warm-gray text-sm mt-2">
              Last updated: October 15, 2024
            </p>
          </motion.div>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-brand">
                <CardContent className="p-8">
                  <h2 className="font-playfair text-2xl font-bold text-jet-black mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-warm-gray leading-relaxed mb-4">
                    By accessing and using the H for Her website and services, you accept and agree to be bound by the terms 
                    and provision of this agreement. These Terms of Service govern your use of our website, products, and services.
                  </p>
                  <p className="text-warm-gray leading-relaxed">
                    If you do not agree to abide by the above, please do not use this service. We reserve the right to update 
                    these terms at any time without prior notice.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Use of Website */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-10 h-10 bg-champagne-beige/20 rounded-lg flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5 text-champagne-beige" />
                    </div>
                    2. Use of Website
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-champagne-beige rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-warm-gray">You must be at least 18 years old to use our services or have parental consent</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-champagne-beige rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-warm-gray">You are responsible for maintaining the confidentiality of your account information</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-champagne-beige rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-warm-gray">You agree not to use the website for any unlawful or prohibited activities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-champagne-beige rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-warm-gray">We reserve the right to refuse service or terminate accounts at our discretion</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Orders and Payments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-10 h-10 bg-champagne-beige/20 rounded-lg flex items-center justify-center mr-3">
                      <ShoppingCart className="h-5 w-5 text-champagne-beige" />
                    </div>
                    3. Orders and Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-jet-black mb-2">Order Acceptance</h4>
                      <p className="text-warm-gray text-sm">
                        All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order 
                        for any reason, including but not limited to product availability, errors in pricing, or fraud prevention.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-jet-black mb-2">Pricing</h4>
                      <p className="text-warm-gray text-sm">
                        All prices are listed in Rwandan Francs (RWF) and include applicable taxes unless otherwise stated. 
                        Prices are subject to change without notice.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-jet-black mb-2">Payment</h4>
                      <p className="text-warm-gray text-sm">
                        Payment is required at the time of order. We accept major credit cards, mobile money, and other payment 
                        methods as indicated on our website.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Shipping and Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-10 h-10 bg-champagne-beige/20 rounded-lg flex items-center justify-center mr-3">
                      <Truck className="h-5 w-5 text-champagne-beige" />
                    </div>
                    4. Shipping and Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-champagne-beige rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-warm-gray">Delivery times are estimates and not guaranteed</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-champagne-beige rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-warm-gray">Risk of loss and title for items pass to you upon delivery</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-champagne-beige rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-warm-gray">You are responsible for providing accurate delivery information</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-champagne-beige rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-warm-gray">Additional fees may apply for remote locations or special delivery requirements</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Returns and Exchanges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-10 h-10 bg-champagne-beige/20 rounded-lg flex items-center justify-center mr-3">
                      <RotateCcw className="h-5 w-5 text-champagne-beige" />
                    </div>
                    5. Returns and Exchanges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-jet-black mb-2">Return Policy</h4>
                      <p className="text-warm-gray text-sm mb-2">
                        Items may be returned within 30 days of purchase in their original condition with tags attached.
                      </p>
                      <ul className="space-y-1 text-sm text-warm-gray ml-4">
                        <li>• Items must be unworn and unwashed</li>
                        <li>• Original packaging and tags must be included</li>
                        <li>• Return shipping costs are the customer's responsibility</li>
                        <li>• Refunds will be processed within 5-10 business days</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-jet-black mb-2">Non-Returnable Items</h4>
                      <p className="text-warm-gray text-sm">
                        Certain items cannot be returned for hygiene reasons, including undergarments, swimwear, 
                        and personalized or custom-made items.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-0 shadow-brand bg-gradient-primary">
                <CardHeader>
                  <CardTitle className="text-xl text-jet-black">6. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-jet-black/80 text-sm leading-relaxed">
                    H for Her shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                    including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting 
                    from your use of our website or services. Our total liability shall not exceed the amount paid by you for 
                    the specific product or service giving rise to the claim.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="border-2 border-champagne-beige">
                <CardHeader>
                  <CardTitle className="text-xl">Questions About These Terms?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-gray mb-4">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-blush-pink/30 p-4 rounded-lg">
                    <p className="text-jet-black font-semibold">H for Her Customer Service</p>
                    <p className="text-warm-gray">Email: legal@hforher.rw</p>
                    <p className="text-warm-gray">Phone: +250 788 123 456</p>
                    <p className="text-warm-gray">Address: KG 123 Street, Kigali, Rwanda</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
