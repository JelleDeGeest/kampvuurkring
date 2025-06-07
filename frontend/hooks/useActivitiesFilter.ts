import { useState, useEffect, useCallback } from 'react';
import { CategoryValue, ALL_CATEGORIES } from './CategorySelectionContext';
import { useDraftMode } from '@/components/DraftModeProvider';

// Activity interface
export interface Activity {
  id: string;
  originalId?: string; // Keep track of the original database ID
  title: string;
  division: string | string[];
  startDate: string;
  endDate: string;
  description: { root: any };
  bannerImage?: any; // Media object or ID
  button?: {
    text?: string;
    url?: string;
  };
  enrollmentSettings?: {
    enabled?: boolean;
    enrollmentLink?: string;
    formPage?: string | number;
  };
}

// Longer fade durations for smoother transitions
const FADE_OUT_DURATION = 250; // ms
const FADE_IN_DURATION = 300; // ms

export function useActivitiesFilter() {
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const [activeFilters, setActiveFilters] = useState<CategoryValue[]>([]);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [isFirstFilter, setIsFirstFilter] = useState(true);
  const { isDraftMode } = useDraftMode();

  // Filter activities based on selected categories
  // Make this a stable callback with useCallback to avoid dependency issues
  const filterActivities = useCallback((categories: CategoryValue[]) => {
    setActiveFilters(categories);
    
    if (allActivities.length === 0) return;
    
    // Handle initial filtering differently than subsequent filtering
    if (isFirstFilter) {
      // For the first filter operation after loading, don't use fade transition
      // Just apply the filter and update the state immediately
      let filtered = allActivities;
      
      if (!categories.includes(ALL_CATEGORIES)) {
        filtered = allActivities.filter(activity => 
          categories.includes(activity.division as CategoryValue) || 
          (Array.isArray(activity.division) && activity.division.some(div => categories.includes(div as CategoryValue))) || 
          activity.division === 'event'
        );
      }
      
      setFilteredActivities(filtered);
      setIsLoading(false);
      setIsFirstFilter(false);
      
      // Make sure we're in the "in" state for initial display (no animation)
      setFadeState('in');
    } else {
      // For subsequent filters, use the fade transition
      // First fade out completely
      setFadeState('out');
      
      // Wait until the fade-out animation is FULLY complete
      setTimeout(() => {
        // Only apply the filter after content is fully faded out
        let filtered = allActivities;
        
        if (!categories.includes(ALL_CATEGORIES)) {
          filtered = allActivities.filter(activity => 
            categories.includes(activity.division as CategoryValue) || 
            (Array.isArray(activity.division) && activity.division.some(div => categories.includes(div as CategoryValue))) || 
            activity.division === 'event'
          );
        }
        
        // Update filtered activities
        setFilteredActivities(filtered);
        
        // Then fade back in after a brief delay to ensure the DOM has updated
        setTimeout(() => {
          setFadeState('in');
        }, 50);
      }, FADE_OUT_DURATION);
    }
  }, [allActivities, isFirstFilter]);

  // Fetch all activities on first render
  useEffect(() => {
    if (initialFetchDone) return; // Only run this effect once
    
    const controller = new AbortController();
    let isMounted = true;
    
    const fetchActivities = async () => {
      if (!isMounted) return;
      
      try {
        setIsLoading(true);
        
        console.log('Activities fetch - Draft mode:', isDraftMode)
        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ""}/api/activiteiten?sort=startDate${isDraftMode ? '&draft=true' : ''}`,
          { 
            signal: controller.signal, 
            cache: "no-store",
            credentials: 'include' // Include cookies for draft mode
          }
        );
        
        if (!isMounted) return;
        
        const data = await res.json();
        const fetchedActivities = data?.docs ?? [];
        
        if (isMounted) {
          setAllActivities(fetchedActivities);
          setInitialFetchDone(true);
          
          // Important: The loading state will remain true until filterActivities is called
          // This prevents showing unfiltered results briefly
        }
      } catch (err: any) {
        if (isMounted && err.name !== "AbortError") {
          console.error('Error fetching activities:', err);
          setIsLoading(false);
        }
      }
    };
    
    fetchActivities();
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [isDraftMode]);

  return {
    allActivities,
    setAllActivities,
    filteredActivities,
    isLoading,
    fadeState,
    filterActivities,
    initialFetchDone,
    isFirstFilter, // expose this so the component can check it
  };
} 