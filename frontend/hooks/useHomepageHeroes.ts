import { useState, useEffect } from 'react';
import type { PayloadImage } from '@/components/ResponsiveImage';

export interface Hero {
  id: string;
  // 'name' is used for identification in Payload CMS admin interface only, not for display
  name: string;
  presence: number;
  homeHeroImage?: PayloadImage | null;
  title?: string;
  description?: string;
  button?: {
    text?: string;
    link?: string;
  };
  expiryDate?: string;
}

export function useHomepageHeroes() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchHeroes = async () => {
      if (!isMounted) return;

      try {
        setIsLoading(true);

        const now = new Date().toISOString();
        const queryParams = new URLSearchParams({
          sort: '-presence', // Sort by presence descending
          depth: '1',
          'where[presence][greater_than]': '0',
          'where[or][0][expiryDate][greater_than]': now,
          'where[or][1][expiryDate][exists]': 'false',
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ""}/api/homepage-heros?${queryParams.toString()}`,
          { signal: controller.signal, cache: "no-store" }
        );

        if (!isMounted) return;

        if (!res.ok) {
          throw new Error(`Failed to fetch heroes: ${res.status}`);
        }

        const data = await res.json();
        const fetchedHeroes = (data?.docs ?? []) as Hero[];

        if (isMounted) {
          const now = new Date();

          // Data is already filtered and sorted by backend
          const activeHeroes = fetchedHeroes
            // .filter(...) // Removed frontend filtering
            // .sort(...) // Removed frontend sorting as backend does it (sort=-presence)
            .map((hero) => {
              // If title is not set, use name as title
              if (!hero.title) {
                return {
                  ...hero,
                  title: hero.name
                };
              }
              return hero;
            });

          setHeroes(activeHeroes);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted && err.name !== "AbortError") {
          console.error('Error fetching heroes:', err);
          setError(err.message || 'Failed to fetch heroes');
          setIsLoading(false);
        }
      }
    };

    fetchHeroes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return {
    heroes,
    isLoading,
    error,
    // Check if hero has all required fields for info box
    hasCompleteInfo: (hero: Hero) =>
      Boolean(hero.title || hero.name) &&
      Boolean(hero.description) &&
      Boolean(hero.button?.text) &&
      Boolean(hero.button?.link)
  };
} 
