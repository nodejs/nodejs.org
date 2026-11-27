'use client';

import { useCallback, useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

// The storage cannot be read while rendering on the server and hydrating
const getServerSnapshot = () => undefined;

const useLocalStorage = (key: string) => {
  const value = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    getServerSnapshot
  );

  const setValue = useCallback(
    (newValue: string) => {
      localStorage.setItem(key, newValue);
      // The browser only dispatches `storage` events to other documents
      window.dispatchEvent(new StorageEvent('storage', { key }));
    },
    [key]
  );

  return [value, setValue] as const;
};

export default useLocalStorage;
