'use client';

import { useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();
let isListening = false;

const onHashChange = () => {
  listeners.forEach(rerender => rerender());
};

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  if (!isListening && typeof window !== 'undefined') {
    window.addEventListener('hashchange', onHashChange);
    isListening = true;
  }
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('hashchange', onHashChange);
      isListening = false;
    }
  };
};

const getSnapshot = () =>
  typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
const getServerSnapshot = () => '';

const useHash = () => {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setHash = (newHash: string) => {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${newHash}`);
      onHashChange();
    }
  };

  return [hash, setHash] as const;
};

export default useHash;
