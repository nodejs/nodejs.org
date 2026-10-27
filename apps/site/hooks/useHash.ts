'use client';

import { useSyncExternalStore, useCallback } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};

const getSnapshot = () => window.location.hash.slice(1);
const getServerSnapshot = () => '';

const useHash = () => {
  // Works in both client and server environments, provides the initial value for the store during server rendering and hydration, avoiding hydration mismatches
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setHash = useCallback((newHash: string) => {
    window.history.replaceState(null, '', `#${newHash}`);
    window.dispatchEvent(new Event('hashchange'));
  }, []);

  return [hash, setHash] as const;
};

export default useHash;
