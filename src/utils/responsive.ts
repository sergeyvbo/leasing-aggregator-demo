import { useState, useEffect } from 'react';

/**
 * Utility function to check if the current device is mobile
 * Based on the design document breakpoint: mobile < 768px
 */
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

/**
 * Utility function to check if the current device is tablet
 * Based on the design document breakpoint: tablet 768px - 1024px
 */
export const isTablet = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Utility function to check if the current device is desktop
 * Based on the design document breakpoint: desktop >= 1024px
 */
export const isDesktop = (): boolean => {
  return window.innerWidth >= 1024;
};

/**
 * Custom hook for tracking media query changes
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window is available (for SSR compatibility)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Check if window is available
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

/**
 * Custom hook to check if the current device is mobile
 * Uses the mobile breakpoint from design document (< 768px)
 */
export const useIsMobile = (): boolean => {
  return useMediaQuery('(max-width: 767px)');
};

/**
 * Custom hook to check if the current device is tablet
 * Uses the tablet breakpoint from design document (768px - 1023px)
 */
export const useIsTablet = (): boolean => {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
};

/**
 * Custom hook to check if the current device is desktop
 * Uses the desktop breakpoint from design document (>= 1024px)
 */
export const useIsDesktop = (): boolean => {
  return useMediaQuery('(min-width: 1024px)');
};

/**
 * Custom hook that returns the current breakpoint
 * @returns 'mobile' | 'tablet' | 'desktop'
 */
export const useBreakpoint = (): 'mobile' | 'tablet' | 'desktop' => {
  const isMobileDevice = useIsMobile();
  const isTabletDevice = useIsTablet();
  
  if (isMobileDevice) return 'mobile';
  if (isTabletDevice) return 'tablet';
  return 'desktop';
};