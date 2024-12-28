'use client';

import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>();

  useEffect(() => {
    const mq = window.matchMedia(query);

    setMatches(mq.matches);

    const handler = (event: MediaQueryListEvent): void =>
      setMatches(event.matches);

    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
