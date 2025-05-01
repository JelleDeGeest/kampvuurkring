import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import KapoenenLogo from "@/public/logos/Kapoenen.svg";
import WoutersLogo from "@/public/logos/Wouters.svg";
import JonggiversLogo from "@/public/logos/Jonggivers.svg";
import GiversLogo from "@/public/logos/Givers.svg";
import JinLogo from "@/public/logos/Jin.svg";
import { CategoryValue, ALL_CATEGORIES, useCategorySelection } from '@/hooks/CategorySelectionContext';

// Define all the category tabs with their metadata
export const categoryTabs = [
  { name: "Alles",      value: ALL_CATEGORIES, icon: Users,          color: "var(--primary-color)", isImage: false },
  { name: "Kapoenen",   value: "kapoenen",   icon: KapoenenLogo,   color: "hsl(var(--kapoenen))",   isImage: true },
  { name: "Wouters",    value: "wouters",    icon: WoutersLogo,    color: "hsl(var(--wouters))",    isImage: true },
  { name: "Jonggivers", value: "jonggivers", icon: JonggiversLogo, color: "hsl(var(--jonggivers))", isImage: true },
  { name: "Givers",     value: "givers",     icon: GiversLogo,     color: "hsl(var(--givers))",     isImage: true },
  { name: "Jin",        value: "jin",        icon: JinLogo,        color: "hsl(var(--jin))",        isImage: true },
] as const;

interface CategoryFilterProps {
  onSelectionChange?: (selectedCategories: CategoryValue[]) => void;
}

export function CategoryFilter({ onSelectionChange }: CategoryFilterProps) {
  const { selectedCategories, toggleCategory, isCategorySelected, isInitialized } = useCategorySelection();
  
  // Track if the component has stabilized after localStorage load
  const [isStable, setIsStable] = useState(false);
  
  // Check if "All" is selected
  const isAllSelected = selectedCategories.includes(ALL_CATEGORIES);

  // After initialization, set the component as stable
  useEffect(() => {
    if (isInitialized && !isStable) {
      // Add a small delay to ensure UI is consistent
      const timer = setTimeout(() => {
        setIsStable(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized, isStable]);

  // Call onSelectionChange when selectedCategories changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedCategories);
    }
  }, [selectedCategories, onSelectionChange]);

  return (
    <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 border-b border-border mb-6">
      {categoryTabs.map(tab => {
        // Only show as active if we're past initial loading
        const isActive = isStable && (
          isCategorySelected(tab.value as CategoryValue) || 
          (isAllSelected && tab.value !== ALL_CATEGORIES)
        );

        return (
          <button
            key={tab.name}
            onClick={() => toggleCategory(tab.value as CategoryValue)}
            className={`flex items-center gap-2 pb-2 px-1 text-sm md:text-base font-medium transition-colors duration-200 ${
              isActive
                ? "border-b-2"
                : "text-muted-foreground hover:text-primary"
            }`}
            style={isActive ? { color: tab.color, borderBottomColor: tab.color } : {}}
          >
            {tab.value === ALL_CATEGORIES ? (
              <tab.icon className="h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <tab.icon 
                className="h-5 w-5" 
                style={{ color: isActive ? tab.color : 'currentColor' }} 
              />
            )}
            {tab.name}
          </button>
        );
      })}
    </div>
  );
} 