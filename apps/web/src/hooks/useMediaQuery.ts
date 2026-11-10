import { useCallback, useSyncExternalStore } from 'react';

/** Subscribes to a CSS media query and returns whether it currently matches. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onChange);
      return () => mediaQueryList.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Tailwind-aligned breakpoints used by the application shell. */
export const BREAKPOINTS = {
  /** Tablet and up (≥ 768px): persistent sidebar rail. */
  md: '(min-width: 768px)',
  /** Desktop and up (≥ 1024px): full expanded sidebar by default. */
  lg: '(min-width: 1024px)',
} as const;
