'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant } from '@/types';
import { toast } from '@/hooks/use-toast';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  
  // Computed values
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  
  // Utils
  getItemById: (itemId: string) => CartItem | undefined;
  hasItem: (productId: string, variantId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, variant, quantity = 1) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => item.productId === product.id && item.variantId === variant.id
        );
        
        if (existingItemIndex > -1) {
          // Update existing item
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          updatedItems[existingItemIndex].addedAt = new Date().toISOString();
          
          set({ items: updatedItems });
          
          toast({
            title: 'Cart Updated',
            description: `${product.name} quantity updated`,
            variant: 'default',
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}-${Date.now()}`,
            productId: product.id,
            variantId: variant.id,
            quantity,
            addedAt: new Date().toISOString(),
          };
          
          set({ items: [...items, newItem] });
          
          toast({
            title: 'Added to Cart',
            description: `${product.name} has been added to your cart`,
            variant: 'success',
          });
        }
      },
      
      removeItem: (itemId) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== itemId);
        set({ items: updatedItems });
        
        toast({
          title: 'Item Removed',
          description: 'Item has been removed from your cart',
          variant: 'default',
        });
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        
        const { items } = get();
        const updatedItems = items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },
      
      clearCart: () => {
        set({ items: [] });
        toast({
          title: 'Cart Cleared',
          description: 'All items have been removed from your cart',
          variant: 'default',
        });
      },
      
      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },
      
      setCartOpen: (open) => {
        set({ isOpen: open });
      },
      
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      get subtotal() {
        // This would need product data to calculate actual prices
        // For now, return a placeholder
        return get().items.reduce((total, item) => total + (item.quantity * 25000), 0);
      },
      
      get shipping() {
        const { subtotal } = get();
        const FREE_SHIPPING_THRESHOLD = 50000; // 50,000 RWF
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 2000; // 2,000 RWF
      },
      
      get tax() {
        const { subtotal } = get();
        return Math.round(subtotal * 0.18); // 18% VAT in Rwanda
      },
      
      get total() {
        const { subtotal, shipping, tax } = get();
        return subtotal + shipping + tax;
      },
      
      getItemById: (itemId) => {
        return get().items.find(item => item.id === itemId);
      },
      
      hasItem: (productId, variantId) => {
        return get().items.some(
          item => item.productId === productId && item.variantId === variantId
        );
      },
    }),
    {
      name: 'h-for-her-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
