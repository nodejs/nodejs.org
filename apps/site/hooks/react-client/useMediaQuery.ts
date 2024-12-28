'use client';

import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean | undefined => {
  const [matches, setMatches] = useState<boolean>();

  useEffect(() => {
    if (typeof window?.matchMedia === 'function') {
      const mq = window.matchMedia(query);
      setMatches(mq.matches);

      const handler = (event: MediaQueryListEvent): void =>
        setMatches(event.matches);

      mq.addEventListener('change', handler);

      return (): void => mq.removeEventListener('change', handler);
    }

    return undefined;
  }, [query]);

  return matches;
};

export default useMediaQuery;
