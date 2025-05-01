import { useState, useEffect } from 'react';

// Categories we support
const CATEGORIES = ['kapoenen', 'wouters', 'jonggivers', 'givers', 'jin'] as const;
export type CategoryValue = typeof CATEGORIES[number] | '__all__';
export const ALL_CATEGORIES: CategoryValue = '__all__';

// Hook for managing category selection with localStorage persistence
export function useCategorySelection() {
  // Initialize with default state to avoid hydration mismatch
  const [selectedCategories, setSelectedCategories] = useState<CategoryValue[]>([ALL_CATEGORIES]);
  
  // Load from localStorage after initial mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem('selectedCategories');
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
    } catch (error) {
      console.error('Failed to load category preferences:', error);
    }
  }, []);
  
  // Save to localStorage when selection changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    } catch (error) {
      console.error('Failed to save category preferences:', error);
    }
  }, [selectedCategories]);
  
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
  
  return {
    selectedCategories,
    toggleCategory,
    isCategorySelected,
  };
} 