'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

const filterOptions = {
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Black', value: 'black', color: '#000000' },
    { name: 'White', value: 'white', color: '#FFFFFF' },
    { name: 'Red', value: 'red', color: '#EF4444' },
    { name: 'Blue', value: 'blue', color: '#3B82F6' },
    { name: 'Green', value: 'green', color: '#10B981' },
    { name: 'Pink', value: 'pink', color: '#EC4899' },
    { name: 'Yellow', value: 'yellow', color: '#F59E0B' },
    { name: 'Purple', value: 'purple', color: '#8B5CF6' },
  ],
  brands: ['H for Her', 'Fashion House', 'Style Co', 'Trend Setter'],
  categories: ['Dresses', 'Tops', 'Bottoms', 'Accessories', 'Work Wear'],
};

interface ProductFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOnSale, setIsOnSale] = useState(false);
  const [isInStock, setIsInStock] = useState(true);
  const [hasFreeShipping, setHasFreeShipping] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setIsOnSale(false);
    setIsInStock(true);
    setHasFreeShipping(false);
    setMinRating(0);
  };

  const applyFilters = () => {
    const filters = {
      priceRange,
      sizes: selectedSizes,
      colors: selectedColors,
      brands: selectedBrands,
      categories: selectedCategories,
      isOnSale,
      isInStock,
      hasFreeShipping,
      minRating,
    };
    onFiltersChange?.(filters);
  };

  return (
    <div className="space-y-6">
      {/* Applied Filters Summary */}
      {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedBrands.length > 0 || isOnSale || hasFreeShipping) && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedSizes.map(size => (
                <Badge key={size} variant="secondary" className="cursor-pointer" onClick={() => handleSizeToggle(size)}>
                  {size} ×
                </Badge>
              ))}
              {selectedColors.map(color => (
                <Badge key={color} variant="secondary" className="cursor-pointer" onClick={() => handleColorToggle(color)}>
                  {color} ×
                </Badge>
              ))}
              {selectedBrands.map(brand => (
                <Badge key={brand} variant="secondary" className="cursor-pointer" onClick={() => handleBrandToggle(brand)}>
                  {brand} ×
                </Badge>
              ))}
              {isOnSale && (
                <Badge variant="sale" className="cursor-pointer" onClick={() => setIsOnSale(false)}>
                  On Sale ×
                </Badge>
              )}
              {hasFreeShipping && (
                <Badge variant="success" className="cursor-pointer" onClick={() => setHasFreeShipping(false)}>
                  Free Shipping ×
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100000}
              min={0}
              step={1000}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-warm-gray">
              <span>{formatCurrency(priceRange[0])}</span>
              <span>{formatCurrency(priceRange[1])}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {filterOptions.sizes.map(size => (
              <Button
                key={size}
                variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSizeToggle(size)}
                className="h-8"
              >
                {size}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {filterOptions.colors.map(color => (
              <button
                key={color.value}
                onClick={() => handleColorToggle(color.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColors.includes(color.value)
                    ? 'border-jet-black scale-110'
                    : 'border-warm-gray hover:border-jet-black'
                }`}
                style={{ backgroundColor: color.color }}
                title={color.name}
              >
                {color.value === 'white' && (
                  <div className="w-full h-full rounded-full border border-warm-gray/20" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filterOptions.categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories(prev => [...prev, category]);
                    } else {
                      setSelectedCategories(prev => prev.filter(c => c !== category));
                    }
                  }}
                />
                <label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Brand</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filterOptions.brands.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBrands(prev => [...prev, brand]);
                    } else {
                      setSelectedBrands(prev => prev.filter(b => b !== brand));
                    }
                  }}
                />
                <label htmlFor={brand} className="text-sm cursor-pointer">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Special Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={isOnSale}
                onCheckedChange={(checked) => setIsOnSale(checked === true)}
              />
              <label htmlFor="on-sale" className="text-sm cursor-pointer">
                On Sale
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={isInStock}
                onCheckedChange={(checked) => setIsInStock(checked === true)}
              />
              <label htmlFor="in-stock" className="text-sm cursor-pointer">
                In Stock Only
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="free-shipping"
                checked={hasFreeShipping}
                onCheckedChange={(checked) => setHasFreeShipping(checked === true)}
              />
              <label htmlFor="free-shipping" className="text-sm cursor-pointer">
                Free Shipping
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
}
