'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Clock, X } from 'lucide-react';
import Fuse from 'fuse.js';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCard } from '@/components/products/product-card';
import { ProductFilters } from '@/components/products/product-filters';
import { mockProducts } from '@/lib/mock-data';
import { debounce } from '@/lib/utils';
import type { Product } from '@/types';

interface SearchPageClientProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const trendingSearches = [
  'summer dress',
  'work blazer',
  'casual top',
  'evening gown',
  'accessories',
  'denim',
  'silk scarf',
  'handbag',
];

const recentSearches = [
  'floral dress',
  'professional wear',
  'party outfit',
  'comfortable shoes',
];

export function SearchPageClient({ searchParams }: SearchPageClientProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.q as string || '');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: 'name', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'tags', weight: 0.3 },
        { name: 'vendor', weight: 0.1 },
        { name: 'variants.color', weight: 0.1 },
      ],
      threshold: 0.4,
      includeScore: true,
    };
    return new Fuse(mockProducts, options);
  }, []);

  // Debounced search function
  const performSearch = useMemo(
    () => debounce((query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setShowSuggestions(true);
        return;
      }

      setIsLoading(true);
      setShowSuggestions(false);

      // Simulate API delay
      setTimeout(() => {
        const results = fuse.search(query);
        setSearchResults(results.map(result => result.item));
        setIsLoading(false);
      }, 300);
    }, 300),
    [fuse]
  );

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery, performSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update URL
      const newSearchParams = new URLSearchParams(urlSearchParams.toString());
      newSearchParams.set('q', searchQuery.trim());
      router.push(`/search?${newSearchParams.toString()}`);
      
      // Add to recent searches (in real app, save to localStorage or API)
      performSearch(searchQuery);
    }
  };

  const handleTrendingClick = (term: string) => {
    setSearchQuery(term);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSuggestions(true);
    router.push('/search');
  };

  // Pagination
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = searchResults.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-blush-pink/20">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="font-playfair text-4xl font-bold text-center text-jet-black mb-8">
            Find Your Perfect Style
          </h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-warm-gray" />
              <Input
                type="search"
                placeholder="Search for dresses, tops, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg"
                autoFocus
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Search Suggestions / Results */}
        {showSuggestions ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Trending Searches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-dusty-rose" />
                  Trending Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <Badge
                      key={term}
                      variant="secondary"
                      className="cursor-pointer hover:bg-champagne-beige transition-colors"
                      onClick={() => handleTrendingClick(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Searches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-warm-gray" />
                  Recent Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <Badge
                      key={term}
                      variant="outline"
                      className="cursor-pointer hover:bg-blush-pink transition-colors"
                      onClick={() => handleTrendingClick(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Dresses', count: 67 },
                    { name: 'Work Wear', count: 34 },
                    { name: 'Casual', count: 89 },
                    { name: 'Accessories', count: 52 },
                  ].map((category) => (
                    <Button
                      key={category.name}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center"
                      onClick={() => handleTrendingClick(category.name.toLowerCase())}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-warm-gray">{category.count} items</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <ProductFilters />
            </div>

            {/* Search Results */}
            <div className="flex-1">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-champagne-beige"></div>
                  <p className="mt-4 text-warm-gray">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  {/* Results Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-jet-black">
                      {searchResults.length} results for "{searchQuery}"
                    </h2>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedResults.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(page)}
                          className="w-10 h-10"
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : searchQuery ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold text-jet-black mb-4">
                    No results found for "{searchQuery}"
                  </h2>
                  <p className="text-warm-gray mb-8">
                    Try adjusting your search or browse our categories below.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {['dresses', 'tops', 'bottoms', 'accessories'].map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        onClick={() => handleTrendingClick(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
