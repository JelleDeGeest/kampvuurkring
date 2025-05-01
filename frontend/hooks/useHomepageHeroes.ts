import { useState, useEffect } from 'react';

export interface Hero {
  id: string;
  // 'name' is used for identification in Payload CMS admin interface only, not for display
  name: string;
  presence: number;
  homeHeroImage: {
    url: string;
    alt?: string;
  };
  title?: string;
  description?: string;
  button?: {
    text?: string;
    link?: string;
  };
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
        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ""}/api/homepage-heros?sort=presence`,
          { signal: controller.signal, cache: "no-store" }
        );
        
        if (!isMounted) return;
        
        if (!res.ok) {
          throw new Error(`Failed to fetch heroes: ${res.status}`);
        }
        
        const data = await res.json();
        const fetchedHeroes = data?.docs ?? [];
        
        if (isMounted) {
          // Filter out heroes with presence = 0 and sort by presence (descending)
          const activeHeroes = fetchedHeroes
            .filter((hero: Hero) => hero.presence > 0)
            .sort((a: Hero, b: Hero) => b.presence - a.presence)
            .map((hero: Hero) => {
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