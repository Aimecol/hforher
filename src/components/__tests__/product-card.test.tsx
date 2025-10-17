import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/products/product-card';
import { mockProducts } from '@/lib/mock-data';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock Zustand stores
jest.mock('@/stores/cart-store', () => ({
  useCartStore: () => ({
    addItem: jest.fn(),
  }),
}));

jest.mock('@/stores/wishlist-store', () => ({
  useWishlistStore: () => ({
    hasItem: jest.fn(() => false),
    toggleItem: jest.fn(),
  }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ProductCard', () => {
  const mockProduct = mockProducts[0];

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  it('displays sale price when available', () => {
    render(<ProductCard product={mockProduct} />);
    
    if (mockProduct.variants[0].salePrice) {
      expect(screen.getByText(/RWF\s*28,000/)).toBeInTheDocument();
      expect(screen.getByText(/RWF\s*35,000/)).toBeInTheDocument();
    }
  });

  it('shows product badges correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    if (mockProduct.isNew) {
      expect(screen.getByText('New')).toBeInTheDocument();
    }
    
    if (mockProduct.isTrending) {
      expect(screen.getByText('Trending')).toBeInTheDocument();
    }
  });

  it('displays product rating', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(`(${mockProduct.reviewCount})`)).toBeInTheDocument();
  });

  it('shows available sizes', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Check if at least one size is displayed
    const firstSize = mockProduct.variants[0].size;
    expect(screen.getByText(firstSize)).toBeInTheDocument();
  });

  it('renders in list layout correctly', () => {
    render(<ProductCard product={mockProduct} layout="list" />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('handles out of stock products', () => {
    const outOfStockProduct = {
      ...mockProduct,
      variants: [
        {
          ...mockProduct.variants[0],
          stock: 0,
          isAvailable: false,
        },
      ],
    };

    render(<ProductCard product={outOfStockProduct} />);
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
});
