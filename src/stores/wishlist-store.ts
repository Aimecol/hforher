'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from '@/hooks/use-toast';

interface WishlistStore {
  items: string[]; // Product IDs
  
  // Actions
  addItem: (productId: string, productName?: string) => void;
  removeItem: (productId: string, productName?: string) => void;
  toggleItem: (productId: string, productName?: string) => void;
  clearWishlist: () => void;
  
  // Computed values
  totalItems: number;
  
  // Utils
  hasItem: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (productId, productName) => {
        const { items } = get();
        if (!items.includes(productId)) {
          set({ items: [...items, productId] });
          
          toast({
            title: 'Added to Wishlist',
            description: productName 
              ? `${productName} has been added to your wishlist`
              : 'Item has been added to your wishlist',
            variant: 'success',
          });
        }
      },
      
      removeItem: (productId, productName) => {
        const { items } = get();
        const updatedItems = items.filter(id => id !== productId);
        set({ items: updatedItems });
        
        toast({
          title: 'Removed from Wishlist',
          description: productName
            ? `${productName} has been removed from your wishlist`
            : 'Item has been removed from your wishlist',
          variant: 'default',
        });
      },
      
      toggleItem: (productId, productName) => {
        const { hasItem, addItem, removeItem } = get();
        if (hasItem(productId)) {
          removeItem(productId, productName);
        } else {
          addItem(productId, productName);
        }
      },
      
      clearWishlist: () => {
        set({ items: [] });
        toast({
          title: 'Wishlist Cleared',
          description: 'All items have been removed from your wishlist',
          variant: 'default',
        });
      },
      
      get totalItems() {
        return get().items.length;
      },
      
      hasItem: (productId) => {
        return get().items.includes(productId);
      },
    }),
    {
      name: 'h-for-her-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
