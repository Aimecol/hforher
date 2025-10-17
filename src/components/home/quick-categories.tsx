'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const quickCategories = [
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    description: 'Latest trends from China',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',
    href: '/category/new-arrivals',
    color: 'from-pink-100 to-rose-100',
    textColor: 'text-rose-800',
  },
  {
    id: 'dresses',
    name: 'Dresses',
    description: 'For every occasion',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=400&fit=crop',
    href: '/category/dresses',
    color: 'from-purple-100 to-indigo-100',
    textColor: 'text-indigo-800',
  },
  {
    id: 'work-wear',
    name: 'Work Wear',
    description: 'Professional & chic',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
    href: '/category/work-wear',
    color: 'from-blue-100 to-cyan-100',
    textColor: 'text-cyan-800',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Complete your look',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    href: '/category/accessories',
    color: 'from-green-100 to-emerald-100',
    textColor: 'text-emerald-800',
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Comfort meets style',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=400&fit=crop',
    href: '/category/casual',
    color: 'from-yellow-100 to-orange-100',
    textColor: 'text-orange-800',
  },
  {
    id: 'sale',
    name: 'Sale',
    description: 'Up to 50% off',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    href: '/category/sale',
    color: 'from-red-100 to-pink-100',
    textColor: 'text-red-800',
  },
];

export function QuickCategories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-jet-black mb-4">
            Shop by Category
          </h2>
          <p className="text-warm-gray max-w-2xl mx-auto">
            Explore our curated categories and find exactly what you're looking for, 
            from everyday essentials to special occasion pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href}>
                <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-brand-lg transition-all duration-300 h-full">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="font-playfair text-2xl font-bold text-soft-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-soft-white/90 mb-4">
                        {category.description}
                      </p>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        className="self-start bg-soft-white/90 text-jet-black hover:bg-soft-white group-hover:translate-x-1 transition-transform"
                      >
                        Shop Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">
              View All Categories
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
