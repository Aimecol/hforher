'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Tag } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function CategoriesPageClient() {
  const router = useRouter();

  const categories = [
    {
      id: 'dresses',
      name: 'Dresses',
      slug: 'dresses',
      description: 'Elegant dresses for every occasion',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
      itemCount: 45,
      featured: true,
    },
    {
      id: 'work-wear',
      name: 'Work Wear',
      slug: 'work-wear',
      description: 'Professional attire for the modern woman',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
      itemCount: 32,
      featured: true,
    },
    {
      id: 'casual',
      name: 'Casual Wear',
      slug: 'casual',
      description: 'Comfortable and stylish everyday outfits',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
      itemCount: 58,
      featured: false,
    },
    {
      id: 'evening',
      name: 'Evening Wear',
      slug: 'evening',
      description: 'Stunning outfits for special occasions',
      image: 'https://images.unsplash.com/photo-1566479179817-0a3a8c9cc6dd?w=400&h=500&fit=crop',
      itemCount: 28,
      featured: true,
    },
    {
      id: 'accessories',
      name: 'Accessories',
      slug: 'accessories',
      description: 'Complete your look with our accessories',
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=500&fit=crop',
      itemCount: 67,
      featured: false,
    },
    {
      id: 'shoes',
      name: 'Shoes',
      slug: 'shoes',
      description: 'Step out in style with our footwear collection',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop',
      itemCount: 39,
      featured: false,
    },
    {
      id: 'bags',
      name: 'Bags',
      slug: 'bags',
      description: 'Handbags and purses for every style',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
      itemCount: 25,
      featured: false,
    },
    {
      id: 'jewelry',
      name: 'Jewelry',
      slug: 'jewelry',
      description: 'Beautiful jewelry to complement any outfit',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
      itemCount: 41,
      featured: false,
    },
    {
      id: 'new-arrivals',
      name: 'New Arrivals',
      slug: 'new-arrivals',
      description: 'Latest fashion pieces just in',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop',
      itemCount: 23,
      featured: true,
    },
  ];

  const featuredCategories = categories.filter(cat => cat.featured);
  const allCategories = categories.filter(cat => !cat.featured);

  return (
    <div className="min-h-screen bg-blush-pink/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-jet-black mb-4">
              Shop by Category
            </h1>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Discover our curated collections designed to celebrate every aspect of your style journey.
            </p>
          </motion.div>

          {/* Featured Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-playfair text-3xl font-bold text-jet-black">
                Featured Collections
              </h2>
              <Badge variant="secondary" className="text-champagne-beige">
                <Tag className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (index * 0.1) }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/category/${category.slug}`)}
                >
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-brand-lg transition-all duration-300">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-jet-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-playfair text-xl font-bold text-soft-white mb-1">
                          {category.name}
                        </h3>
                        <p className="text-soft-white/80 text-sm mb-2">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-soft-white/60 text-xs">
                            {category.itemCount} items
                          </span>
                          <ArrowRight className="h-4 w-4 text-soft-white group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* All Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-playfair text-3xl font-bold text-jet-black mb-8">
              All Categories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.05) }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/category/${category.slug}`)}
                >
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-brand-lg transition-all duration-300">
                    <div className="flex">
                      <div className="w-24 h-24 relative overflow-hidden flex-shrink-0">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-jet-black text-lg mb-1 group-hover:text-champagne-beige transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-warm-gray text-sm mb-2">
                              {category.description}
                            </p>
                            <span className="text-warm-gray/60 text-xs">
                              {category.itemCount} items
                            </span>
                          </div>
                          <ArrowRight className="h-5 w-5 text-warm-gray group-hover:text-champagne-beige group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-primary border-0">
              <CardContent className="py-12">
                <h3 className="font-playfair text-3xl font-bold text-jet-black mb-4">
                  Can't Find What You're Looking For?
                </h3>
                <p className="text-jet-black/80 text-lg mb-8 max-w-2xl mx-auto">
                  Our collection is constantly evolving. Follow us on social media or subscribe 
                  to our newsletter to be the first to know about new arrivals and exclusive collections.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    className="bg-white/20 border-white/30 text-jet-black hover:bg-white/30"
                    onClick={() => router.push('/contact')}
                  >
                    Contact Us
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white/20 border-white/30 text-jet-black hover:bg-white/30"
                  >
                    Subscribe to Newsletter
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
