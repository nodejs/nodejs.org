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
    const mediaQueryList = window.matchMedia?.(query);

    if (!mediaQueryList) {
      return;
    }

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', handler);

    return () => mediaQueryList.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
