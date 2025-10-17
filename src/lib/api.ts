import axios from 'axios';
import type { 
  Product, 
  Category, 
  User, 
  Order, 
  Review, 
  BlogPost,
  PaginatedResponse,
  ProductFilters,
  SearchQuery,
  ApiResponse
} from '@/types';

// API base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        window.location.href = '/auth/signin';
      }
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsApi = {
  getProducts: async (params?: ProductFilters & { page?: number; limit?: number }) => {
    const response = await api.get<PaginatedResponse<Product>>('/products', { params });
    return response.data;
  },
  
  getProduct: async (slug: string) => {
    const response = await api.get<ApiResponse<Product>>(`/products/${slug}`);
    return response.data;
  },
  
  getProductRecommendations: async (productId: string, limit = 4) => {
    const response = await api.get<ApiResponse<Product[]>>(`/products/${productId}/recommendations`, {
      params: { limit }
    });
    return response.data;
  },
  
  search: async (query: SearchQuery) => {
    const response = await api.post<PaginatedResponse<Product>>('/products/search', query);
    return response.data;
  },
  
  getFeatured: async (limit = 8) => {
    const response = await api.get<ApiResponse<Product[]>>('/products/featured', {
      params: { limit }
    });
    return response.data;
  },
  
  getTrending: async (limit = 8) => {
    const response = await api.get<ApiResponse<Product[]>>('/products/trending', {
      params: { limit }
    });
    return response.data;
  },
};

// Categories API
export const categoriesApi = {
  getCategories: async () => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data;
  },
  
  getCategory: async (slug: string) => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${slug}`);
    return response.data;
  },
  
  getCategoryProducts: async (slug: string, params?: ProductFilters & { page?: number; limit?: number }) => {
    const response = await api.get<PaginatedResponse<Product>>(`/categories/${slug}/products`, { params });
    return response.data;
  },
};

// Reviews API
export const reviewsApi = {
  getProductReviews: async (productId: string, params?: { page?: number; limit?: number }) => {
    const response = await api.get<PaginatedResponse<Review>>(`/products/${productId}/reviews`, { params });
    return response.data;
  },
  
  createReview: async (productId: string, review: Omit<Review, 'id' | 'createdAt' | 'customer'>) => {
    const response = await api.post<ApiResponse<Review>>(`/products/${productId}/reviews`, review);
    return response.data;
  },
  
  updateReview: async (reviewId: string, updates: Partial<Review>) => {
    const response = await api.patch<ApiResponse<Review>>(`/reviews/${reviewId}`, updates);
    return response.data;
  },
};

// User/Account API
export const userApi = {
  getProfile: async () => {
    const response = await api.get<ApiResponse<User>>('/user/profile');
    return response.data;
  },
  
  updateProfile: async (updates: Partial<User>) => {
    const response = await api.patch<ApiResponse<User>>('/user/profile', updates);
    return response.data;
  },
  
  getOrders: async (params?: { page?: number; limit?: number }) => {
    const response = await api.get<PaginatedResponse<Order>>('/user/orders', { params });
    return response.data;
  },
  
  getOrder: async (orderId: string) => {
    const response = await api.get<ApiResponse<Order>>(`/user/orders/${orderId}`);
    return response.data;
  },
  
  getWishlist: async () => {
    const response = await api.get<ApiResponse<Product[]>>('/user/wishlist');
    return response.data;
  },
  
  addToWishlist: async (productId: string) => {
    const response = await api.post<ApiResponse<void>>('/user/wishlist', { productId });
    return response.data;
  },
  
  removeFromWishlist: async (productId: string) => {
    const response = await api.delete<ApiResponse<void>>(`/user/wishlist/${productId}`);
    return response.data;
  },
};

// Orders API
export const ordersApi = {
  createOrder: async (orderData: any) => {
    const response = await api.post<ApiResponse<Order>>('/orders', orderData);
    return response.data;
  },
  
  updateOrder: async (orderId: string, updates: Partial<Order>) => {
    const response = await api.patch<ApiResponse<Order>>(`/orders/${orderId}`, updates);
    return response.data;
  },
  
  trackOrder: async (orderNumber: string) => {
    const response = await api.get<ApiResponse<Order>>(`/orders/track/${orderNumber}`);
    return response.data;
  },
};

// Blog API
export const blogApi = {
  getPosts: async (params?: { page?: number; limit?: number; tag?: string }) => {
    const response = await api.get<PaginatedResponse<BlogPost>>('/blog/posts', { params });
    return response.data;
  },
  
  getPost: async (slug: string) => {
    const response = await api.get<ApiResponse<BlogPost>>(`/blog/posts/${slug}`);
    return response.data;
  },
  
  getFeaturedPosts: async (limit = 3) => {
    const response = await api.get<ApiResponse<BlogPost[]>>('/blog/featured', {
      params: { limit }
    });
    return response.data;
  },
};

// Newsletter API
export const newsletterApi = {
  subscribe: async (email: string, preferences?: any) => {
    const response = await api.post<ApiResponse<void>>('/newsletter/subscribe', {
      email,
      preferences
    });
    return response.data;
  },
  
  unsubscribe: async (email: string) => {
    const response = await api.post<ApiResponse<void>>('/newsletter/unsubscribe', { email });
    return response.data;
  },
};

// Contact API
export const contactApi = {
  submitForm: async (formData: any) => {
    const response = await api.post<ApiResponse<void>>('/contact', formData);
    return response.data;
  },
};

// Analytics API
export const analyticsApi = {
  track: async (event: string, properties?: Record<string, any>) => {
    const response = await api.post<ApiResponse<void>>('/analytics/track', {
      event,
      properties,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  },
};
