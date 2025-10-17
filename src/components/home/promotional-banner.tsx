'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, Clock, Shield, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const promotions = [
  {
    id: 'free-delivery',
    title: 'Free Delivery in Rwanda',
    description: 'On orders over 50,000 RWF',
    icon: Truck,
    bgColor: 'bg-gradient-primary',
    textColor: 'text-jet-black',
    cta: 'Shop Now',
    href: '/category/new-arrivals',
  },
  {
    id: 'fast-shipping',
    title: 'Fast Shipping',
    description: 'Delivered within 2-3 days in Kigali',
    icon: Clock,
    bgColor: 'bg-gradient-secondary',
    textColor: 'text-soft-white',
    cta: 'Learn More',
    href: '/shipping',
  },
  {
    id: 'quality-guarantee',
    title: 'Quality Guarantee',
    description: '30-day return policy',
    icon: Shield,
    bgColor: 'bg-dusty-rose',
    textColor: 'text-soft-white',
    cta: 'Read Policy',
    href: '/returns',
  },
];

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free delivery in Rwanda on orders over 50,000 RWF',
  },
  {
    icon: Clock,
    title: 'Fast Shipping',
    description: '2-3 days delivery in Kigali, 5-7 days nationwide',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: '30-day return policy and quality guarantee',
  },
  {
    icon: Heart,
    title: 'Customer Love',
    description: 'Join thousands of satisfied customers across Rwanda',
  },
];

export function PromotionalBanner() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Promotional Banner */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className={`${promotions[currentPromo].bgColor} rounded-2xl p-8 relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="relative flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  <div className={`p-4 rounded-full bg-soft-white/20 ${promotions[currentPromo].textColor}`}>
                    {React.createElement(promotions[currentPromo].icon, { className: "h-8 w-8" })}
                  </div>
                  
                  <div>
                    <h2 className={`font-playfair text-3xl font-bold ${promotions[currentPromo].textColor} mb-2`}>
                      {promotions[currentPromo].title}
                    </h2>
                    <p className={`text-lg ${promotions[currentPromo].textColor}/80`}>
                      {promotions[currentPromo].description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    asChild
                    variant={promotions[currentPromo].textColor === 'text-jet-black' ? 'outline' : 'secondary'}
                    size="lg"
                    className="font-semibold"
                  >
                    <Link href={promotions[currentPromo].href}>
                      {promotions[currentPromo].cta}
                    </Link>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsVisible(false)}
                    className={`${promotions[currentPromo].textColor} hover:bg-soft-white/20`}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Promotion Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {promotions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPromo(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentPromo
                        ? 'bg-soft-white scale-125'
                        : 'bg-soft-white/50 hover:bg-soft-white/75'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blush-pink/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-jet-black mb-4">
              Why Choose H for Her?
            </h2>
            <p className="text-warm-gray max-w-2xl mx-auto">
              We're committed to providing you with the best fashion experience, 
              from quality products to exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-0 shadow-md hover:shadow-brand transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                      <feature.icon className="h-8 w-8 text-jet-black" />
                    </div>
                    
                    <h3 className="font-playfair text-xl font-semibold text-jet-black mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-warm-gray leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
