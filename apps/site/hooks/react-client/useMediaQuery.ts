'use client';

import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const { matches, addEventListener, removeEventListener } =
      window.matchMedia?.(query) ?? {
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      };

    setMatches(matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    addEventListener('change', handler);

    return () => removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
