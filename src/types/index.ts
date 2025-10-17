// Core Data Models for H for Her Ecommerce

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  categoryId: string;
  weight: number; // in grams
  vendor: string;
  originCountry: string;
  shippingEligible: boolean;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNew: boolean;
  isTrending: boolean;
  createdAt: string;
  updatedAt: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  salePrice?: number;
  size: string;
  color: string;
  stock: number;
  isAvailable: boolean;
  weight?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
  children?: Category[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  role: 'customer' | 'admin' | 'merchant';
  savedSizes: SavedSize[];
  wishlist: string[]; // product IDs
  preferences: {
    language: 'en' | 'rw';
    currency: 'RWF' | 'USD';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  postalCode?: string;
  phone?: string;
  isDefault: boolean;
}

export interface SavedSize {
  category: string;
  size: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  tracking?: {
    carrier: string;
    trackingNumber: string;
    trackingUrl?: string;
  };
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  total: number;
  product: {
    name: string;
    image: string;
    slug: string;
  };
  variant: {
    size: string;
    color: string;
    sku: string;
  };
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
export type FulfillmentStatus = 'unfulfilled' | 'partial' | 'fulfilled';

export interface PaymentMethod {
  type: 'card' | 'mobile_money' | 'bank_transfer';
  provider: 'stripe' | 'momo' | 'airtel' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  phone?: string;
}

export interface Promotion {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping' | 'buy_x_get_y';
  value: number;
  threshold?: number; // minimum order amount
  maxDiscount?: number;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  startsAt: string;
  endsAt: string;
  applicableProducts?: string[];
  applicableCategories?: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  rating: number;
  title: string;
  content: string;
  isVerified: boolean;
  isApproved: boolean;
  helpful: number;
  images?: string[];
  createdAt: string;
  customer: {
    name: string;
    avatar?: string;
    isVerified: boolean;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Filter and Search Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  brands?: string[];
  isOnSale?: boolean;
  isInStock?: boolean;
  hasFreeShipping?: boolean;
  rating?: number;
}

export interface ProductSort {
  field: 'name' | 'price' | 'rating' | 'createdAt' | 'popularity';
  direction: 'asc' | 'desc';
}

export interface SearchQuery {
  q: string;
  filters?: ProductFilters;
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterSignup {
  email: string;
  firstName?: string;
  preferences?: {
    promotions: boolean;
    newProducts: boolean;
    styleGuides: boolean;
  };
}

// Analytics and Tracking
export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId: string;
}

export interface TikTokVideo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  isActive: boolean;
  productTags?: string[];
}

// Shipping and Delivery
export interface ShippingRate {
  id: string;
  name: string;
  description: string;
  rate: number;
  estimatedDays: {
    min: number;
    max: number;
  };
  isAvailable: boolean;
  isDefault: boolean;
  restrictions?: {
    minOrderValue?: number;
    maxWeight?: number;
    regions?: string[];
  };
}

// Configuration Types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  logo: string;
  favicon: string;
  social: {
    tiktok?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  business: {
    currency: string;
    taxRate: number;
    freeShippingThreshold: number;
    defaultShippingRate: number;
  };
}

// Error Types
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}
