'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Categories we support
const CATEGORIES = ['kapoenen', 'wouters', 'jonggivers', 'givers', 'jin'] as const;
export type CategoryValue = typeof CATEGORIES[number] | '__all__';
export const ALL_CATEGORIES: CategoryValue = '__all__';

// Define the shape of our context
interface CategorySelectionContextType {
  selectedCategories: CategoryValue[];
  toggleCategory: (category: CategoryValue) => void;
  isCategorySelected: (category: CategoryValue) => boolean;
  isInitialized: boolean;
}

// Create the context with a default value
const CategorySelectionContext = createContext<CategorySelectionContextType | undefined>(undefined);

// Storage key for localStorage
const STORAGE_KEY = 'categorySelections';

// Provider component
export function CategorySelectionProvider({ children }: { children: ReactNode }) {
  // Initialize with default state to avoid hydration mismatch
  const [selectedCategories, setSelectedCategories] = useState<CategoryValue[]>([ALL_CATEGORIES]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Load from localStorage after initial mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Validate categories
          const validCategories = parsed.filter((cat): cat is CategoryValue => 
            cat === ALL_CATEGORIES || CATEGORIES.includes(cat as any)
          );
          
          if (validCategories.length > 0) {
            setSelectedCategories(validCategories);
          }
        }
      }
      // We're initialized regardless of whether we loaded anything valid
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to load category preferences:', error);
      setIsInitialized(true);
    }
  }, []);
  
  // Save to localStorage when selection changes
  useEffect(() => {
    if (typeof window === 'undefined' || !isInitialized) return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCategories));
    } catch (error) {
      console.error('Failed to save category preferences:', error);
    }
  }, [selectedCategories, isInitialized]);
  
  // Toggle category selection
  const toggleCategory = (category: CategoryValue) => {
    if (category === ALL_CATEGORIES) {
      setSelectedCategories([ALL_CATEGORIES]);
    } else {
      setSelectedCategories(prev => {
        if (prev.includes(category)) {
          // Remove this category if already selected
          const next = prev.filter(c => c !== category);
          // If removing this category leaves nothing selected, select ALL
          return next.length === 0 ? [ALL_CATEGORIES] : next;
        } else {
          // Add this category and remove ALL if present
          return [...prev.filter(c => c !== ALL_CATEGORIES), category];
        }
      });
    }
  };
  
  // Check if a category is currently selected
  const isCategorySelected = (category: CategoryValue): boolean => {
    if (category === ALL_CATEGORIES) {
      return selectedCategories.includes(ALL_CATEGORIES);
    }
    return selectedCategories.includes(category);
  };
  
  // Context value
  const value = {
    selectedCategories,
    toggleCategory,
    isCategorySelected,
    isInitialized,
  };
  
  return (
    <CategorySelectionContext.Provider value={value}>
      {children}
    </CategorySelectionContext.Provider>
  );
}

// Custom hook to use the context
export function useCategorySelection() {
  const context = useContext(CategorySelectionContext);
  if (context === undefined) {
    throw new Error('useCategorySelection must be used within a CategorySelectionProvider');
  }
  return context;
} 