'use client';

import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia?.(query)?.matches ?? false;
  });

  useEffect(() => {
    const { addEventListener, removeEventListener } = window.matchMedia?.(
      query
    ) ?? {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    };

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    addEventListener('change', handler);

    return () => removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
