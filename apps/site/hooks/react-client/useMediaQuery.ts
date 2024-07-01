'use client';

import { useState, useEffect } from 'react';

const mediaQueryChangeSubscribe = (mq: MediaQueryList, handler: () => void) => {
  if (mq.addEventListener) {
    mq.addEventListener('change', handler);
  } else {
    mq.addListener(handler);
  }
};

const mediaQueryChangeUnsubscribe = (
  mq: MediaQueryList,
  handler: () => void
) => {
  if (mq.removeEventListener) {
    mq.removeEventListener('change', handler);
  } else {
    mq.removeListener(handler);
  }
};

const useMediaQuery = (query: string): boolean | undefined => {
  const [matches, setMatches] = useState<boolean>();

  useEffect(() => {
    if (typeof window?.matchMedia === 'function') {
      const mq = window.matchMedia(query);
      setMatches(mq.matches);

      const handler = (): void => setMatches(mq.matches);
      mediaQueryChangeSubscribe(mq, handler);

      return (): void => mediaQueryChangeUnsubscribe(mq, handler);
    }

    return undefined;
  }, [query]);

  return matches;
};

export default useMediaQuery;
