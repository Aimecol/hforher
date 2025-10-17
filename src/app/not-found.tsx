import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '404 - Page Not Found | H for Her',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-blush-pink/20 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-brand-lg border-0">
              <CardContent className="py-16 px-8">
                {/* 404 Illustration */}
                <div className="mb-8">
                  <div className="text-8xl font-playfair font-bold text-champagne-beige mb-4">
                    404
                  </div>
                  <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6"></div>
                </div>

                {/* Error Message */}
                <h1 className="font-playfair text-3xl font-bold text-jet-black mb-4">
                  Oops! Page Not Found
                </h1>
                <p className="text-warm-gray text-lg mb-8 leading-relaxed">
                  The page you're looking for seems to have wandered off into the fashion world. 
                  Don't worry though—we have plenty of other amazing styles waiting for you!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button asChild size="lg">
                    <Link href="/">
                      <Home className="h-4 w-4 mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="lg">
                    <Link href="/search">
                      <Search className="h-4 w-4 mr-2" />
                      Search Products
                    </Link>
                  </Button>
                </div>

                {/* Quick Links */}
                <div className="border-t pt-8">
                  <p className="text-warm-gray mb-4">Or explore these popular sections:</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      href="/category/new-arrivals"
                      className="text-champagne-beige hover:text-dusty-rose transition-colors text-sm font-medium"
                    >
                      New Arrivals
                    </Link>
                    <Link
                      href="/category/dresses"
                      className="text-champagne-beige hover:text-dusty-rose transition-colors text-sm font-medium"
                    >
                      Dresses
                    </Link>
                    <Link
                      href="/category/work-wear"
                      className="text-champagne-beige hover:text-dusty-rose transition-colors text-sm font-medium"
                    >
                      Work Wear
                    </Link>
                    <Link
                      href="/categories"
                      className="text-champagne-beige hover:text-dusty-rose transition-colors text-sm font-medium"
                    >
                      All Categories
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-champagne-beige/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-dusty-rose/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
}
