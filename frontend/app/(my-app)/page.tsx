"use client"

import React, { useEffect, useState, useRef } from "react"
import { format } from "date-fns"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Header from "@/components/header"
import { EventCarousel } from "@/components/event-carousel"
import PayloadRichText from "@/components/PayloadRichText"

// Import our new components and hooks
import { CategoryFilter, categoryTabs } from "@/components/CategoryFilter"
import { useActivitiesFilter, Activity } from "@/hooks/useActivitiesFilter"
import { useCategorySelection, CategoryValue } from "@/hooks/CategorySelectionContext"

// Matching fade duration with the hook
const TRANSITION_DURATION = 200; // ms
const INITIAL_FADE_IN_DURATION = 200; // ms - longer, smoother fade for initial content

export default function Home() {
  // Use our custom hooks
  const { 
    filteredActivities, 
    isLoading: isLoadingActivities, 
    fadeState, 
    filterActivities,
    initialFetchDone,
    isFirstFilter
  } = useActivitiesFilter();
  
  const { selectedCategories, isInitialized: isCategoriesInitialized } = useCategorySelection();
  const [prevSelectedCategories, setPrevSelectedCategories] = useState<CategoryValue[]>([]);
  const isInitialPageLoad = useRef(true);
  
  // Track fade-in for initial content load
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [initialFadeIn, setInitialFadeIn] = useState(false);
  
  // Track if we've checked for empty results
  const [hasCheckedEmpty, setHasCheckedEmpty] = useState(false);

  // Apply filters as soon as activities are fetched and categories are initialized
  useEffect(() => {
    if (initialFetchDone && isCategoriesInitialized) {
      // Apply the filters - this will turn off loading in the hook
      filterActivities(selectedCategories);
      // Save this selection for comparison
      setPrevSelectedCategories([...selectedCategories]);
    }
  }, [initialFetchDone, isCategoriesInitialized, filterActivities, selectedCategories]);

  // Filter activities when categories change
  useEffect(() => {
    // Only handle changes after initial filtering (when isFirstFilter is false)
    if (!isFirstFilter && initialFetchDone && isCategoriesInitialized && prevSelectedCategories.length > 0) {
      // Check if selection actually changed
      const hasChanged = 
        prevSelectedCategories.length !== selectedCategories.length ||
        prevSelectedCategories.some(cat => !selectedCategories.includes(cat));
      
      if (hasChanged) {
        // Apply the filter with transition
        filterActivities(selectedCategories);
        // Update previous selection
        setPrevSelectedCategories([...selectedCategories]);
        // Reset empty check when selection changes
        setHasCheckedEmpty(false);
      }
    }
  }, [selectedCategories, filterActivities, initialFetchDone, isCategoriesInitialized, prevSelectedCategories, isFirstFilter]);

  // Handle initial content fade-in after loading
  useEffect(() => {
    if (!isLoadingActivities && !initialLoadComplete && initialFetchDone) {
      setInitialLoadComplete(true);
      
      // Trigger the fade-in effect after a tiny delay to ensure DOM is ready
      setTimeout(() => {
        setInitialFadeIn(true);
        
        // Mark that we've checked for empty results
        setHasCheckedEmpty(true);
      }, 50);
    }
  }, [isLoadingActivities, initialLoadComplete, initialFetchDone]);

  // Reset initial page load flag after initial fade completes
  useEffect(() => {
    if (initialFadeIn && isInitialPageLoad.current) {
      const timer = setTimeout(() => {
        isInitialPageLoad.current = false;
      }, INITIAL_FADE_IN_DURATION);
      
      return () => clearTimeout(timer);
    }
  }, [initialFadeIn]);

  // Different styling for initial load vs category changes
  const getContentStyle = () => {
    // If we're on initial load
    if (isInitialPageLoad.current) {
      return {
        opacity: initialFadeIn ? 1 : 0,
        transition: `opacity ${INITIAL_FADE_IN_DURATION}ms ease-in-out`,
        willChange: 'opacity',
      };
    }
    
    // For subsequent category changes
    return {
      opacity: fadeState === 'in' ? 1 : 0,
      transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
      willChange: 'opacity',
    };
  };

  // Check if we should show the no activities message
  const showNoActivitiesMessage = initialLoadComplete && 
    filteredActivities.length === 0 && 
    !isLoadingActivities &&
    (hasCheckedEmpty || initialFadeIn);

  // For debugging - remove in production
  const activityCount = filteredActivities.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8">
          <EventCarousel />
        </section>

        <section className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Activities Section - 2/3 width */}
            <div className="w-full lg:w-2/3">
              {/* Category filter component */}
              <CategoryFilter />
              
              {/* Debug info - can be removed in production */}
              {/* <div className="text-xs text-muted-foreground mb-4">
                Selected: {selectedCategories.join(', ')} | Activities: {activityCount} |
                Load Complete: {String(initialLoadComplete)} | Fade In: {String(initialFadeIn)} | 
                Empty Check: {String(hasCheckedEmpty)}
              </div> */}

              <div>
                {/* Always show content container, but it will be empty and invisible while loading */}
                <div style={getContentStyle()}>
                  {showNoActivitiesMessage ? (
                    <div className="py-20 text-center text-muted-foreground">
                      Geen activiteiten gevonden voor de geselecteerde categorieën.
                    </div>
                  ) : (
                    filteredActivities.length > 0 && (() => {
                      // Group activities by date (ignoring time)
                      const dateGroups = filteredActivities.reduce((groups: Record<string, Activity[]>, activity) => {
                        const date = new Date(activity.startDate);
                        const dateStr = format(date, 'yyyy-MM-dd');
                        
                        if (!groups[dateStr]) {
                          groups[dateStr] = [];
                        }
                        
                        groups[dateStr].push(activity);
                        return groups;
                      }, {});
                      
                      // Convert to array and sort by date
                      return Object.entries(dateGroups)
                        .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                        .map(([dateStr, activitiesForDate]) => {
                          const date = new Date(dateStr);
                          
                          return (
                            <div key={dateStr} className="mb-8">
                              <h3 className="text-xl font-bold mb-4 text-primary">
                                {format(date, 'EEEE d MMMM yyyy')}
                              </h3>
                              <div className="space-y-6">
                                {activitiesForDate.map(act => {
                                  const tabMeta = categoryTabs.find(t => t.value === act.division);
                                  if (!tabMeta) return null;

                                  return (
                                    <Card key={act.id} className="border-2">
                                      <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                          <div className="flex items-center gap-3">
                                            <div
                                              className="p-0.5 border rounded flex items-center justify-center"
                                              style={{ backgroundColor: `${tabMeta.color}20`, borderColor: tabMeta.color }}
                                            >
                                              {tabMeta.isImage ? (
                                                <tabMeta.icon 
                                                  className="h-7 w-7" 
                                                  style={{ color: tabMeta.color }} 
                                                />
                                              ) : (
                                                <tabMeta.icon 
                                                  className="h-7 w-7" 
                                                  style={{ color: tabMeta.color }}
                                                />
                                              )}
                                            </div>
                                            
                                            <div className="flex flex-col justify-center">
                                              <span className="text-sm text-muted-foreground leading-tight">
                                                {format(new Date(act.startDate), "HH'u'mm")} tot {format(new Date(act.endDate), "HH'u'mm")}
                                              </span>
                                              <CardTitle className="text-xl font-bold text-foreground leading-tight">
                                                {act.title}
                                              </CardTitle>
                                            </div>
                                          </div>
                                          
                                          <span className="text-sm font-normal text-gray-500">
                                            {tabMeta.name}
                                          </span>
                                        </div>
                                      </CardHeader>
                                      <CardContent className="pt-0 pb-1">
                                        <div className="text-muted-foreground leading-relaxed mb-0">
                                          <PayloadRichText content={act.description} />
                                        </div>
                                      </CardContent>
                                    </Card>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })
                    })()
                  )}
                </div>
              </div>
            </div>

            {/* Important Dates Section - 1/3 width */}
            <div className="w-full lg:w-1/3">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4 text-primary">Belangrijke Data</h2>
                
                {/* Evenementen */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Evenementen</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">24-25 augustus</div>
                      <div className="font-medium">Overgang</div>
                    </div>
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">15 december</div>
                      <div className="font-medium">Kerstfeest</div>
                    </div>
                  </div>
                </div>
                
                {/* Weekends */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Weekends</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">18-20 oktober</div>
                      <div className="font-medium">Herfstweekend</div>
                    </div>
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">7-9 maart</div>
                      <div className="font-medium">Lenteweekend</div>
                    </div>
                  </div>
                </div>
                
                {/* Kampen */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">Kampen</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">10-15 april</div>
                      <div className="font-medium">Paaskamp</div>
                    </div>
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">15-25 juli</div>
                      <div className="font-medium">Groot Kamp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}