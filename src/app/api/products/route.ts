import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mock-data';
import type { Product, ProductFilters } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const sizes = searchParams.get('sizes')?.split(',');
    const colors = searchParams.get('colors')?.split(',');
    const brands = searchParams.get('brands')?.split(',');
    const isOnSale = searchParams.get('isOnSale') === 'true';
    const isInStock = searchParams.get('isInStock') === 'true';
    const hasFreeShipping = searchParams.get('hasFreeShipping') === 'true';
    const rating = searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : undefined;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Filter products based on query parameters
    let filteredProducts = [...mockProducts];

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.categoryId === category || product.tags.includes(category)
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.variants[0]?.salePrice || product.variants[0]?.price || 0;
        return price >= minPrice;
      });
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.variants[0]?.salePrice || product.variants[0]?.price || 0;
        return price <= maxPrice;
      });
    }

    if (sizes && sizes.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.variants.some(variant => sizes.includes(variant.size))
      );
    }

    if (colors && colors.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.variants.some(variant => colors.includes(variant.color))
      );
    }

    if (brands && brands.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        brands.includes(product.vendor)
      );
    }

    if (isOnSale) {
      filteredProducts = filteredProducts.filter(product =>
        product.variants.some(variant => variant.salePrice && variant.salePrice < variant.price)
      );
    }

    if (isInStock) {
      filteredProducts = filteredProducts.filter(product =>
        product.variants.some(variant => variant.stock > 0)
      );
    }

    if (hasFreeShipping) {
      filteredProducts = filteredProducts.filter(product => product.shippingEligible);
    }

    if (rating !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.rating >= rating);
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.variants[0]?.salePrice || a.variants[0]?.price || 0;
          bValue = b.variants[0]?.salePrice || b.variants[0]?.price || 0;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'popularity':
          aValue = a.reviewCount;
          bValue = b.reviewCount;
          break;
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: totalProducts,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
